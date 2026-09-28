import { NextResponse } from 'next/server';

// Protection Anti-Piratage & Anti-Abus : Rate Limiting en mémoire par IP / Utilisateur
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function POST(request: Request) {
  try {
    // 1. Contrôle Anti-Brute-Force & Rate Limiting (5 requêtes max par 60 secondes)
    const clientIp = request.headers.get('x-forwarded-for') || 'local_user';
    const now = Date.now();
    const rateLimit = rateLimitMap.get(clientIp);

    if (rateLimit && now < rateLimit.resetTime) {
      if (rateLimit.count >= 5) {
        return NextResponse.json({ 
          error: "Trop de requêtes détectées (Rate Limit). Veuillez patienter 60 secondes avant de relancer une recherche." 
        }, { status: 429 });
      }
      rateLimit.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + 60000 });
    }

    const body = await request.json();
    const { keyword, location, channel, userId, userEmail, maxItems = 3 } = body;

    // 2. Validation & Sanitization strictes (Anti-Injection)
    if (!keyword || !location) {
      return NextResponse.json({ error: "Secteur d'activité et ville obligatoires" }, { status: 400 });
    }

    const cleanKeyword = String(keyword).replace(/[<>{}]/g, '').trim().substring(0, 80);
    const cleanLocation = String(location).replace(/[<>{}]/g, '').trim().substring(0, 80);

    const searchId = `search_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // 3. Routage dynamique selon le canal choisi (5 canaux 100% couverts)
    let actorId = "compass~crawler-google-places";
    let runInput: any = {};

    const targetCount = Math.min(Number(maxItems) || 3, 10);
    const webhookReturnUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/apify`
      : "https://prospectizi.vercel.app/api/webhooks/apify";

    if (channel === 'google_maps') {
      actorId = process.env.APIFY_MAPS_ACTOR_ID || "compass~crawler-google-places";
      runInput = {
        searchStringsArray: [`${cleanKeyword} ${cleanLocation}`],
        maxCrawledPlacesPerSearch: targetCount,
        language: "fr"
      };
    } else if (channel === 'linkedin') {
      actorId = process.env.APIFY_SEARCH_ACTOR_ID || "apify~google-search-scraper";
      runInput = {
        queries: `site:linkedin.com/company "${cleanKeyword}" "${cleanLocation}"`,
        maxPagesPerQuery: 1,
        resultsPerPage: targetCount,
        countryCode: "fr"
      };
    } else if (channel === 'facebook') {
      actorId = process.env.APIFY_SEARCH_ACTOR_ID || "apify~google-search-scraper";
      runInput = {
        queries: `site:facebook.com "${cleanKeyword}" "${cleanLocation}"`,
        maxPagesPerQuery: 1,
        resultsPerPage: targetCount,
        countryCode: "fr"
      };
    } else if (channel === 'instagram') {
      actorId = process.env.APIFY_SEARCH_ACTOR_ID || "apify~google-search-scraper";
      runInput = {
        queries: `site:instagram.com "${cleanKeyword}" "${cleanLocation}"`,
        maxPagesPerQuery: 1,
        resultsPerPage: targetCount,
        countryCode: "fr"
      };
    } else {
      // Canal 'google' standard
      actorId = process.env.APIFY_SEARCH_ACTOR_ID || "apify~google-search-scraper";
      runInput = {
        queries: `"${cleanKeyword}" "${cleanLocation}" email contact telephone`,
        maxPagesPerQuery: 1,
        resultsPerPage: targetCount,
        countryCode: "fr"
      };
    }

    // Ajout du webhook de retour asynchrone
    runInput.webhooks = [
      {
        eventTypes: ["ACTOR.RUN.SUCCEEDED", "ACTOR.RUN.FAILED"],
        requestUrl: webhookReturnUrl,
        payloadTemplate: JSON.stringify({
          searchId,
          userId,
          channel,
          status: "{{status}}",
          datasetId: "{{defaultDatasetId}}"
        })
      }
    ];

    console.log(`[Scrape Multi-Canal] Démarrage recherche: "${cleanKeyword}" à "${cleanLocation}" sur canal: ${channel} (Actor: ${actorId}) - IP: ${clientIp}`);

    const apifyToken = process.env.APIFY_TOKEN || process.env.APIFY_API_TOKEN;

    if (apifyToken && apifyToken !== "mock_token") {
      const apifyRunUrl = `https://api.apify.com/v2/acts/${actorId}/runs?token=${apifyToken}&timeout=120`;
      
      fetch(apifyRunUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(runInput)
      }).catch(err => console.error("[Apify Multi-Channel Trigger Error]", err));
    }

    // Réponse asynchrone instantanée (< 200ms) pour parer au timeout de Vercel
    return NextResponse.json({
      success: true,
      status: "PENDING",
      searchId,
      keyword: cleanKeyword,
      location: cleanLocation,
      channel,
      message: "Extraction asynchrone lancée. Statut initial : PENDING."
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
