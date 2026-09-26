import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keyword, location, channel, userId, userEmail, maxItems = 3 } = body;

    if (!keyword || !location) {
      return NextResponse.json({ error: "Secteur d'activité et ville obligatoires" }, { status: 400 });
    }

    const searchId = `search_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // 1. Configuration stricte pour éviter tout timeout ou boucle infinie :
    // - timeoutSecs: 120 max (2 minutes max sur Apify)
    // - maxItems: 3 pour l'offre Découverte (ou selon le plan)
    const apifyActorId = process.env.APIFY_ACTOR_ID || "compass~crawler-google-places";
    const apifyToken = process.env.APIFY_TOKEN || "mock_token";
    const webhookReturnUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/apify`
      : "https://prospectizi.com/api/webhooks/apify";

    console.log(`[Scrape Queue] Démarrage recherche asynchrone: "${keyword}" à "${location}" (${channel}) - Search ID: ${searchId}`);

    // Si les clés Apify réelles sont présentes, on déclenche l'Actor Apify de manière non-bloquante
    if (process.env.APIFY_TOKEN && process.env.APIFY_TOKEN !== "mock_token") {
      const apifyRunUrl = `https://api.apify.com/v2/acts/${apifyActorId}/runs?token=${apifyToken}&timeout=120`;
      
      fetch(apifyRunUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchStringsArray: [`${keyword} ${location}`],
          maxCrawledPlacesPerSearch: maxItems,
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

    // Réponse ultra-rapide à Vercel (< 200ms) pour éviter tout timeout de 10s
    return NextResponse.json({
      success: true,
      status: "PENDING",
      searchId,
      keyword,
      location,
      channel,
      message: "Scraping lancé en tâche de fond. Le webhook mettra à jour le statut en COMPLETED dès la fin de l'extraction."
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
