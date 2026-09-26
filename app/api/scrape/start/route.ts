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

    // 3. Configuration stricte pour éviter tout timeout ou surconsommation de crédits
    const apifyActorId = process.env.APIFY_ACTOR_ID || "compass~crawler-google-places";
    const apifyToken = process.env.APIFY_TOKEN || "mock_token";
    const webhookReturnUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/apify`
      : "https://prospectizi.com/api/webhooks/apify";

    console.log(`[Scrape Secure] Démarrage recherche: "${cleanKeyword}" à "${cleanLocation}" (${channel}) - IP: ${clientIp}`);

    if (process.env.APIFY_TOKEN && process.env.APIFY_TOKEN !== "mock_token") {
      const apifyRunUrl = `https://api.apify.com/v2/acts/${apifyActorId}/runs?token=${apifyToken}&timeout=120`;
      
      fetch(apifyRunUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchStringsArray: [`${cleanKeyword} ${cleanLocation}`],
          maxCrawledPlacesPerSearch: Math.min(Number(maxItems) || 3, 10),
          language: "fr",
          webhooks: [
            {
              eventTypes: ["ACTOR.RUN.SUCCEEDED", "ACTOR.RUN.FAILED"],
              requestUrl: webhookReturnUrl,
              payloadTemplate: JSON.stringify({
                searchId,
                userId,
                status: "{{status}}",
                datasetId: "{{defaultDatasetId}}"
              })
            }
          ]
        })
      }).catch(err => console.error("[Apify Trigger Error]", err));
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
