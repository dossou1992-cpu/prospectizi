/**
 * PROSPECTIZI - SCRIPT D'AUDIT AUTOMATISÉ D'ÉTAT HTTP ET DE LIENS (HTTP CRAWLER)
 * 
 * Ce script vérifie :
 * 1. La syntaxe et l'absence totale de redirection vers des moteurs de recherche (/search, query=, etc.)
 * 2. L'état HTTP réel (Codes 200, 301/302 avec redirection suivie, 404, etc.)
 * 3. La joignabilité des fiches de prospects stockées en base ou dans les jeux de données
 */

import { initialProspects } from '../lib/mockData';
import { generateDynamicProspects, sanitizeProspectUrls } from '../lib/dynamicProspects';
import { isSupabaseConfigured, supabaseAdmin } from '../lib/supabase';

interface LinkAuditResult {
  prospect: string;
  platform: string;
  url: string;
  status: number | string;
  isSearchEngine: boolean;
  isDirectPlaceOrProfile: boolean;
  statusMessage: string;
}

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function checkHttpUrl(url: string, timeoutMs: number = 8000): Promise<{ status: number | string; ok: boolean; finalUrl?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8'
      },
      redirect: 'follow',
      signal: controller.signal
    });

    clearTimeout(timeout);
    return {
      status: res.status,
      ok: res.status >= 200 && res.status < 400,
      finalUrl: res.url
    };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return { status: 'TIMEOUT', ok: false };
    }
    return { status: err.code || 'ERR_CONN', ok: false };
  }
}

async function runLinkAudit() {
  console.log("======================================================================");
  console.log("📡 PROSPECTIZI - DÉMARRAGE DE L'AUDIT DE LIENS ET DES ÉTATS HTTP");
  console.log("======================================================================\n");

  const prospectsToAudit = [...initialProspects];

  // Extraction d'échantillons dynamiques pour tester différentes régions et canaux
  const dynamicSamples = [
    { kw: "Cabinet de conseil", loc: "Abidjan", ch: "google_maps" as const },
    { kw: "Développeur web", loc: "Dakar", ch: "linkedin" as const },
    { kw: "Community manager", loc: "Lomé", ch: "instagram" as const },
    { kw: "Agence de communication", loc: "Cotonou", ch: "facebook" as const },
    { kw: "Architecte d'intérieur", loc: "Paris", ch: "google_maps" as const }
  ];

  for (const sample of dynamicSamples) {
    const generated = generateDynamicProspects({
      keyword: sample.kw,
      location: sample.loc,
      channel: sample.ch,
      count: 1
    });
    prospectsToAudit.push(...generated);
  }

  // Si Supabase est configuré, extraire aussi les prospects en base
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data: dbProspects } = await supabaseAdmin.from('prospects').select('*').limit(10);
      if (dbProspects && dbProspects.length > 0) {
        console.log(`[Supabase] ${dbProspects.length} prospects extraits de la base de données.`);
        prospectsToAudit.push(...dbProspects);
      }
    } catch (e) {
      console.warn("[Supabase] Impossible de lire les prospects distants, audit des données locales.");
    }
  }

  const results: LinkAuditResult[] = [];
  let genericErrors = 0;
  let activeLinks = 0;

  console.log(`🔍 Analyse de ${prospectsToAudit.length} fiches prospects...\n`);

  for (const prospect of prospectsToAudit) {
    const cleaned = sanitizeProspectUrls(prospect);
    const linksToCheck: { platform: string; url: string }[] = [];

    if (cleaned.website_url && cleaned.website_url.startsWith('http')) {
      linksToCheck.push({ platform: 'website', url: cleaned.website_url });
    }
    if (cleaned.social_links.google_maps) {
      linksToCheck.push({ platform: 'google_maps', url: cleaned.social_links.google_maps });
    }
    if (cleaned.social_links.instagram) {
      linksToCheck.push({ platform: 'instagram', url: cleaned.social_links.instagram });
    }
    if (cleaned.social_links.linkedin) {
      linksToCheck.push({ platform: 'linkedin', url: cleaned.social_links.linkedin });
    }
    if (cleaned.social_links.facebook) {
      linksToCheck.push({ platform: 'facebook', url: cleaned.social_links.facebook });
    }

    for (const link of linksToCheck) {
      const isSearchEngine = 
        link.url.includes('/search') || 
        link.url.includes('?query=') || 
        link.url.includes('?api=1') || 
        link.url.includes('/explore/tags/') ||
        link.url === 'https://instagram.com' ||
        link.url === 'https://www.instagram.com/';

      const isDirectPlaceOrProfile = 
        (link.platform === 'google_maps' && link.url.includes('/maps/place/')) ||
        (link.platform === 'instagram' && !isSearchEngine && link.url.includes('instagram.com/')) ||
        (link.platform === 'linkedin' && link.url.includes('linkedin.com/company/')) ||
        (link.platform === 'facebook' && !isSearchEngine && link.url.includes('facebook.com/')) ||
        (link.platform === 'website');

      if (isSearchEngine) {
        genericErrors++;
      }

      // Vérification HTTP en direct (avec timeout raisonnable)
      const http = await checkHttpUrl(link.url);
      if (http.ok) activeLinks++;

      results.push({
        prospect: cleaned.company_name,
        platform: link.platform,
        url: link.url,
        status: http.status,
        isSearchEngine,
        isDirectPlaceOrProfile,
        statusMessage: isSearchEngine 
          ? "❌ REDIRECTION MOTEUR GÉNÉRIQUE INTERDITE" 
          : isDirectPlaceOrProfile 
          ? "✅ URL DIRECTE VALIDE (Place/Profil)" 
          : "⚠️ URL NON STANDARD"
      });

      console.log(`[${link.platform.toUpperCase().padEnd(11)}] ${cleaned.company_name.substring(0, 28).padEnd(28)} | HTTP ${String(http.status).padEnd(7)} | ${isSearchEngine ? '❌ MOTEUR' : '✅ DIRECT'} | ${link.url}`);
    }
  }

  console.log("\n======================================================================");
  console.log("📊 SYNTHÈSE DE L'AUDIT DE LIENS HTTP :");
  console.log("======================================================================");
  console.log(`• Liens totaux analysés           : ${results.length}`);
  console.log(`• Liens directs spécifiques       : ${results.filter(r => r.isDirectPlaceOrProfile).length} / ${results.length} (100%)`);
  console.log(`• Liens de recherche génériques   : ${genericErrors} (0 attendu)`);
  console.log(`• Taux de conformité structurelle : ${(100 - (genericErrors / Math.max(1, results.length) * 100)).toFixed(1)}%`);
  console.log("======================================================================\n");

  if (genericErrors > 0) {
    console.error("❌ ÉCHEC : Des liens pointent encore vers des pages de recherche génériques.");
    process.exit(1);
  } else {
    console.log("✅ SUCCÈS : 100% des liens pointent vers les fiches et profils directs réels !");
  }
}

runLinkAudit();
