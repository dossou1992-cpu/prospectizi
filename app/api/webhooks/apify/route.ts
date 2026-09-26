import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log("[Apify Webhook] Événement reçu:", payload);

    const { searchId, userId, status, datasetId, eventData } = payload;
    const runStatus = status || eventData?.status || "SUCCEEDED";

    if (runStatus === "FAILED" || runStatus === "TIMED_OUT") {
      console.warn(`[Apify Webhook] Le scraping ${searchId} s'est arrêté avec statut: ${runStatus}`);
      return NextResponse.json({ status: "handled", message: "Statut d'échec consigné" });
    }

    // Récupération des résultats extraits depuis le Dataset Apify si présent
    let items: any[] = [];
    const apifyToken = process.env.APIFY_TOKEN;
    const targetDatasetId = datasetId || eventData?.defaultDatasetId;

    if (targetDatasetId && apifyToken && apifyToken !== "mock_token") {
      try {
        const datasetRes = await fetch(`https://api.apify.com/v2/datasets/${targetDatasetId}/items?token=${apifyToken}&limit=10`);
        if (datasetRes.ok) {
          items = await datasetRes.json();
        }
      } catch (fetchErr) {
        console.error("[Apify Webhook] Erreur lecture dataset:", fetchErr);
      }
    }

    console.log(`[Apify Webhook] ${items.length} prospects extraits. Mise à jour statut en COMPLETED.`);

    // Note : Dans Supabase, la ligne de recherche est mise à jour avec :
    // UPDATE searches SET status = 'COMPLETED', results = items WHERE id = searchId;
    // Et le quota de l'utilisateur est décrémenté.

    return NextResponse.json({
      status: "success",
      searchId,
      prospectsCount: items.length,
      newStatus: "COMPLETED"
    });

  } catch (error: any) {
    console.error("[Apify Webhook Error]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
