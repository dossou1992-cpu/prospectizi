/**
 * SCRIPT D'AUDIT ET VALIDATION DES URLS DE PROSPECTS PROSPECTIZI
 * 
 * Vérifie :
 * 1. Zéro URL de recherche générique (/search, query=, explore/tags, accueil racine).
 * 2. Liens directs stricts (Google Maps Place, Instagram profil, LinkedIn entreprise, Facebook page).
 * 3. Exactitude du ciblage par métier (aucun faux match IA pour dentiste/médical).
 */

import { initialProspects } from '../lib/mockData';
import { generateDynamicProspects, sanitizeProspectUrls } from '../lib/dynamicProspects';

let totalErrors = 0;

function checkUrl(context: string, platform: string, url: string | undefined) {
  if (!url) return;

  const isGeneric = 
    url.includes('/search') || 
    url.includes('?query=') || 
    url.includes('?api=1') || 
    url.includes('/explore/tags/') || 
    url === 'https://instagram.com' || 
    url === 'https://www.instagram.com' || 
    url === 'https://www.instagram.com/';

  if (isGeneric) {
    console.error(`❌ [ERREUR GÉNÉRIQUE] ${context} sur ${platform} -> ${url}`);
    totalErrors++;
  } else {
    console.log(`✅ [OK DIRECT] ${context} sur ${platform} -> ${url}`);
  }

  // Vérifications structurelles spécifiques par canal
  if (platform === 'google_maps' && !url.includes('/maps/place/')) {
    console.warn(`⚠️ [ATTENTION] Google Maps ne contient pas '/maps/place/' : ${url}`);
  }
  if (platform === 'instagram' && !url.match(/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/)) {
    console.warn(`⚠️ [ATTENTION] Format Instagram atypique : ${url}`);
  }
}

console.log("\n=======================================================");
console.log("1. AUDIT DES FICHES INITIALES STATIQUES (lib/mockData)");
console.log("=======================================================");

for (const p of initialProspects) {
  console.log(`\n• Entreprise : ${p.company_name} (${p.city}) [${p.channel}]`);
  if (p.website_url) console.log(`  Site : ${p.website_url}`);
  for (const [net, url] of Object.entries(p.social_links)) {
    checkUrl(p.company_name, net, url);
  }
}

console.log("\n=======================================================");
console.log("2. AUDIT DE LA FONCTION D'AUTO-RÉPARATION (sanitizeProspectUrls)");
console.log("=======================================================");

const dirtyLegacyProspect: any = {
  company_name: "Cabinet Test Audit",
  city: "Cotonou",
  channel: "google_maps",
  social_links: {
    google_maps: "https://www.google.com/maps/search/?api=1&query=Cabinet+Test+Cotonou",
    instagram: "https://instagram.com",
    linkedin: "https://www.linkedin.com/search/results/all/?keywords=Cabinet+Test",
    facebook: "https://www.facebook.com/search/top?q=Cabinet+Test",
  }
};

const cleaned = sanitizeProspectUrls(dirtyLegacyProspect);
console.log("Fiche corrompue réparée automatiquement :");
for (const [net, url] of Object.entries(cleaned.social_links)) {
  checkUrl("Legacy Test Réparé", net, url);
}

console.log("\n=======================================================");
console.log("3. AUDIT DU GÉNÉRATEUR DYNAMIQUE MULTI-MÉTIERS ET MULTI-CANAUX");
console.log("=======================================================");

const testMatrix = [
  { kw: "Cabinet dentaire", loc: "Dakar", ch: "google_maps" as const },
  { kw: "Architecte & Décoration", loc: "Abidjan", ch: "instagram" as const },
  { kw: "Expertise Comptable", loc: "Cotonou", ch: "linkedin" as const },
  { kw: "Agence de Communication", loc: "Lomé", ch: "facebook" as const },
  { kw: "Avocat d'affaires", loc: "Paris", ch: "google_maps" as const },
  { kw: "Clinique Médicale", loc: "Douala", ch: "google_maps" as const },
  { kw: "IA & Automatisation", loc: "Casablanca", ch: "linkedin" as const },
];

for (const tm of testMatrix) {
  console.log(`\n--- Test : "${tm.kw}" à ${tm.loc} sur canal ${tm.ch} ---`);
  const results = generateDynamicProspects({
    keyword: tm.kw,
    location: tm.loc,
    channel: tm.ch,
    count: 2
  });

  if (results.length === 0) {
    console.error(`❌ Échec de génération pour ${tm.kw}`);
    totalErrors++;
    continue;
  }

  for (const p of results) {
    console.log(`• ${p.company_name} | Activité: ${p.activity}`);
    
    // Vérification de non-pollution croisée (ex: dentaire ne doit pas produire IA)
    if (tm.kw.includes("dentaire") && p.company_name.includes("AI")) {
      console.error(`❌ [MÉTIER POLLUÉ] "dentaire" a produit un faux match IA : ${p.company_name}`);
      totalErrors++;
    }

    for (const [net, url] of Object.entries(p.social_links)) {
      checkUrl(p.company_name, net, url);
    }
  }
}

console.log("\n=======================================================");
console.log(`RÉSULTAT DE L'AUDIT : ${totalErrors === 0 ? "✅ SUCCÈS TOTAL (0 ERREUR)" : `❌ ${totalErrors} ERREURS DÉTECTÉES`}`);
console.log("=======================================================\n");

if (totalErrors > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
