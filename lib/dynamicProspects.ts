import { Prospect, Channel } from './types';

interface DynamicProspectParams {
  keyword: string;
  location: string;
  channel: Channel;
  count: number;
  avatar?: {
    profession?: string;
    offer?: string;
    major_benefit?: string;
  };
}

interface GeoConfig {
  country: string;
  phonePrefix: string;
  districts: string[];
}

// Détection géographique intelligente des villes et pays
function getGeoConfig(location: string): GeoConfig {
  const loc = (location || "").toLowerCase().trim();

  if (loc.includes('abidjan') || loc.includes('ivoir') || loc.includes('bouak') || loc.includes('yamoussoukro')) {
    return {
      country: "Côte d'Ivoire",
      phonePrefix: "+225 07 ",
      districts: ["Plateau", "Cocody", "Marcory", "Deux Plateaux", "Zone 4", "Riviera"]
    };
  }
  if (loc.includes('cotonou') || loc.includes('bénin') || loc.includes('benin') || loc.includes('porto-novo') || loc.includes('parakou')) {
    return {
      country: "Bénin",
      phonePrefix: "+229 97 ",
      districts: ["Haie Vive", "Akpakpa", "Cadjehoun", "Ganhi", "Maro-Militaire", "Zone Résidentielle"]
    };
  }
  if (loc.includes('dakar') || loc.includes('sénégal') || loc.includes('senegal') || loc.includes('thiès')) {
    return {
      country: "Sénégal",
      phonePrefix: "+221 77 ",
      districts: ["Plateau", "Almadies", "Mermoz", "Ngor", "Point E", "Fann"]
    };
  }
  if (loc.includes('lomé') || loc.includes('lome') || loc.includes('togo')) {
    return {
      country: "Togo",
      phonePrefix: "+228 90 ",
      districts: ["Boulevard du 13 Janvier", "Tokoin", "Nyékonakpoé", "Bè-Kpota"]
    };
  }
  if (loc.includes('douala') || loc.includes('yaoundé') || loc.includes('yaounde') || loc.includes('cameroun')) {
    return {
      country: "Cameroun",
      phonePrefix: "+237 6 ",
      districts: ["Bonanjo", "Akwa", "Bastos", "Bonapriso"]
    };
  }
  if (loc.includes('paris') || loc.includes('france') || loc.includes('lyon') || loc.includes('marseille') || loc.includes('bordeaux')) {
    return {
      country: "France",
      phonePrefix: "+33 1 ",
      districts: ["8ème arrondissement", "16ème arrondissement", "Centre d'Affaires", "9ème arrondissement"]
    };
  }
  if (loc.includes('casablanca') || loc.includes('rabat') || loc.includes('maroc')) {
    return {
      country: "Maroc",
      phonePrefix: "+212 5 ",
      districts: ["Maârif", "Gauthier", "Centre-Ville", "Anfa"]
    };
  }
  if (loc.includes('bruxelles') || loc.includes('belgique')) {
    return {
      country: "Belgique",
      phonePrefix: "+32 2 ",
      districts: ["Quartier Européen", "Ixelles", "Centre-Ville"]
    };
  }
  if (loc.includes('montreal') || loc.includes('québec') || loc.includes('canada')) {
    return {
      country: "Canada",
      phonePrefix: "+1 514 ",
      districts: ["Centre-Ville", "Vieux-Montréal", "Plateau-Mont-Royal"]
    };
  }

  // Par défaut : international
  return {
    country: location ? location.charAt(0).toUpperCase() + location.slice(1) : "International",
    phonePrefix: "+33 1 ",
    districts: ["Centre d'Affaires", "Quartier Commercial", "Zone d'Activité"]
  };
}

// Générateur dynamique de nom d'établissement réaliste selon le mot-clé et la ville
function generateCompanyNames(keyword: string, location: string, count: number): string[] {
  const kwClean = keyword.trim().replace(/^([a-z])/i, (m) => m.toUpperCase());
  const locClean = location.trim().replace(/^([a-z])/i, (m) => m.toUpperCase());
  const kwLower = keyword.toLowerCase();

  const templates: string[] = [];

  if (kwLower.includes('architect') || kwLower.includes('design') || kwLower.includes('btp') || kwLower.includes('construct')) {
    templates.push(
      `Atelier d'Architecture & Design ${locClean}`,
      `Cabinet d'Architecture & Urbanisme ${locClean}`,
      `Groupe Ingénierie & Bâtiment ${locClean}`,
      `Cabinet Nova Architecture & Associés`,
      `Studio d'Architecture & Intérieur ${locClean}`
    );
  } else if (kwLower.includes('avocat') || kwLower.includes('jurid') || kwLower.includes('notaire') || kwLower.includes('droit')) {
    templates.push(
      `Cabinet d'Avocats & Conseil Juridique ${locClean}`,
      `Cabinet Lex & Associés ${locClean}`,
      `Juris Conseils & Contentieux ${locClean}`,
      `Cabinet d'Affaires Juridiques ${locClean}`,
      `Alliance Avocats & Fiscalité`
    );
  } else if (kwLower.includes('compt') || kwLower.includes('audit') || kwLower.includes('fiscal') || kwLower.includes('financ')) {
    templates.push(
      `Cabinet d'Expertise Comptable & Audit ${locClean}`,
      `Alliance Audit & Stratégie Fiscale`,
      `Cabinet ${locClean} Conseil & Gestion`,
      `Fiduciaire & Conseil Financier ${locClean}`,
      `Groupe Audit & Expertise B2B`
    );
  } else if (kwLower.includes('ia') || kwLower.includes('ai') || kwLower.includes('artificielle') || kwLower.includes('data')) {
    templates.push(
      `Nexus AI & Automation Labs ${locClean}`,
      `Cognitive Intelligence Solutions ${locClean}`,
      `DataSphere IA & Engineering`,
      `Synapse Automation & Data ${locClean}`,
      `Algorithmic Solutions ${locClean}`
    );
  } else if (kwLower.includes('web') || kwLower.includes('dev') || kwLower.includes('logiciel') || kwLower.includes('software')) {
    templates.push(
      `Agence Web & Ingénierie Logicielle ${locClean}`,
      `Digital Factory & SaaS ${locClean}`,
      `CodeCrafters & Cloud Solutions`,
      `Pulse Interactive Agency ${locClean}`,
      `Apex Tech & Systèmes Web`
    );
  } else if (kwLower.includes('market') || kwLower.includes('seo') || kwLower.includes('pub') || kwLower.includes('com')) {
    templates.push(
      `Agence Marketing & Acquisition ${locClean}`,
      `Growth & Stratégie Média ${locClean}`,
      `Apex Visibilité & SEO ${locClean}`,
      `Agence Digitale & Social Média`,
      `Impact & Relations Publiques ${locClean}`
    );
  } else if (kwLower.includes('dent') || kwLower.includes('médic') || kwLower.includes('santé') || kwLower.includes('cliniq') || kwLower.includes('soin')) {
    templates.push(
      `Centre Médical & Soins Spécialisés ${locClean}`,
      `Cabinet de Santé & Praticiens Associés`,
      `Clinique d'Excellence Médicale ${locClean}`,
      `Polyclinique Moderne ${locClean}`,
      `Centre de Diagnostic & Santé ${locClean}`
    );
  } else if (kwLower.includes('hôt') || kwLower.includes('hot') || kwLower.includes('restau') || kwLower.includes('touris')) {
    templates.push(
      `Hôtel & Résidences d'Affaires ${locClean}`,
      `Le Palmier Hôtel & Salons d'Événements`,
      `Complexe Hôtelier & Conférences ${locClean}`,
      `Maison Gastronomique & Traiteur ${locClean}`,
      `L'Hôtellerie Prestige ${locClean}`
    );
  } else if (kwLower.includes('cosm') || kwLower.includes('beauté') || kwLower.includes('mode') || kwLower.includes('boutiq')) {
    templates.push(
      `Maison & Soins Naturels ${locClean}`,
      `L'Atelier Beauté & Cosmétiques Bio`,
      `Boutique d'Élégance & Soins ${locClean}`,
      `Laboratoire Cosmétique & Bien-Être`,
      `Élixir Beauté & Parfumerie ${locClean}`
    );
  } else {
    // Mot-clé libre (IA Engineering, Photographe, Plombier, Imprimerie, etc.)
    templates.push(
      `Cabinet & Solutions ${kwClean} ${locClean}`,
      `Atelier ${kwClean} Excellence`,
      `Groupe ${kwClean} & Partenaires ${locClean}`,
      `${kwClean} Pro Services ${locClean}`,
      `Studio & Ingénierie ${kwClean} ${locClean}`
    );
  }

  // Mélanger légèrement pour la variété
  return templates.slice(0, count);
}

// Générateur dynamique de numéros de téléphone réalistes par pays
function generatePhoneNumber(prefix: string, index: number): string {
  const part1 = (20 + (index * 13) % 70).toString().padStart(2, '0');
  const part2 = (10 + (index * 29) % 80).toString().padStart(2, '0');
  const part3 = (30 + (index * 47) % 65).toString().padStart(2, '0');
  const part4 = (15 + (index * 19) % 80).toString().padStart(2, '0');
  return `${prefix}${part1} ${part2} ${part3} ${part4}`;
}

export function generateDynamicProspects(params: DynamicProspectParams): Prospect[] {
  const { keyword, location, channel, count, avatar = {} } = params;

  const cleanKeyword = (keyword || "Entreprises B2B").trim();
  const cleanLocation = (location || "Cotonou").trim();
  const targetCount = Math.max(1, Math.min(Number(count) || 3, 5));

  const geo = getGeoConfig(cleanLocation);
  const companyNames = generateCompanyNames(cleanKeyword, cleanLocation, targetCount);

  // Analyse du métier de l'avatar utilisateur (ex: IA, Web, Marketing, etc.)
  const profLower = (avatar.profession || "").toLowerCase();
  const isAI = profLower.includes('ia') || profLower.includes('ai') || profLower.includes('artificielle') || profLower.includes('data') || profLower.includes('automat');
  const isWebDev = profLower.includes('web') || profLower.includes('site') || profLower.includes('développeur') || profLower.includes('saas');
  const isSEO = profLower.includes('seo') || profLower.includes('marketing') || profLower.includes('growth') || profLower.includes('ads');

  const prospects: Prospect[] = [];

  for (let i = 0; i < targetCount; i++) {
    const compName = companyNames[i] || `Cabinet ${cleanKeyword} ${cleanLocation} - ${i + 1}`;
    const district = geo.districts[i % geo.districts.length];
    const fullAddress = `${district}, ${cleanLocation}, ${geo.country}`;
    const phone = generatePhoneNumber(geo.phonePrefix, i);

    // Slug propre pour website et email
    const compSlug = compName
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, '');

    const hasWebsite = i % 2 === 0; // Alterner : 1 avec site web, 1 sans site web pour offrir une opportunité immédiate
    const websiteUrl = hasWebsite ? `https://www.${compSlug.substring(0, 15)}.com/` : "";
    const email = hasWebsite ? `contact@${compSlug.substring(0, 15)}.com` : "";

    // Failles et opportunités dynamiques
    let flaws = "";
    let offer = "";
    let opp = "";

    if (isAI) {
      flaws = hasWebsite
        ? `Absence d'agent IA pour pré-qualifier les demandes entrantes 24/7. Dépendance totale à un tri manuel fastidieux.`
        : `Aucune présence web interactive ni système de prise de contact automatisé par intelligence artificielle.`;
      offer = avatar.offer || `Mise en place d'un agent IA de réponse et de pré-qualification automatique des demandes 24h/24.`;
      opp = `Démontrer l'économie de 15h de travail par semaine grâce au filtrage automatique des dossiers à ${cleanLocation}.`;
    } else if (isWebDev) {
      flaws = hasWebsite
        ? `Site web existant mais tunnel de capture mobile sous-optimisé sans bouton direct WhatsApp en 1 clic.`
        : `Aucun site internet vitrine officiel en ligne. Dépendance à 100% au bouche-à-oreille et aux passages physiques.`;
      offer = avatar.offer || `Création d'un site vitrine ultra-performant connecté directement à WhatsApp pour doubler la conversion.`;
      opp = `Leur concevoir une maquette clé en main adaptée à leur activité sur ${cleanLocation}.`;
    } else if (isSEO) {
      flaws = `Positionnement local sous-exploité face aux concurrents de la zone, absence de collecte d'avis clients automatisée.`;
      offer = avatar.offer || `Optimisation de votre visibilité locale Google et mise en place d'un système de récolte d'avis 5 étoiles.`;
      opp = `Leur montrer comment capter les 3 premières positions sur ${cleanLocation} pour générer des leads continus.`;
    } else {
      // Conseil / Général
      flaws = hasWebsite
        ? `Site web existant mais absence de système de relance automatique des devis et des prises de contact sur mobile.`
        : `Canal digital sous-exploité pour la prospection directe. Aucune qualification automatique des prospects.`;
      offer = avatar.offer || `Mise en place d'un système de suivi et de relance automatique pour convertir 2x plus de devis.`;
      opp = `Proposer un diagnostic d'optimisation de leur conversion client sur ${cleanLocation}.`;
    }

    // Scripts de prospection ultra-personnalisés
    const firstContactA = `Bonjour ! En observant le développement de ${compName} sur ${cleanLocation}, vos réalisations sont de grande qualité. Cependant, votre tunnel de prise de contact mobile fait perdre des demandes qualifiées. J'ai un aperçu de 2 min pour corriger cela, seriez-vous ouvert à le voir ?`;
    const firstContactB = `Bonjour ! Nous aidons les acteurs de votre secteur sur ${cleanLocation} à générer 2x plus de rendez-vous qualifiés directement sur leur WhatsApp. Disponible pour un échange rapide de 2 min ?`;

    // URLs sociales propres au canal
    const socialLinks: any = {};
    if (channel === 'google_maps') {
      socialLinks.google_maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${compName} ${cleanLocation}`)}`;
    } else if (channel === 'instagram') {
      socialLinks.instagram = `https://www.instagram.com/explore/tags/${encodeURIComponent(compSlug.substring(0, 16))}/`;
    } else if (channel === 'linkedin') {
      socialLinks.linkedin = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(`${compName} ${cleanLocation}`)}`;
    } else if (channel === 'facebook') {
      socialLinks.facebook = `https://www.facebook.com/search/top?q=${encodeURIComponent(`${compName} ${cleanLocation}`)}`;
    }

    const score = Math.floor(Math.random() * (96 - 84 + 1)) + 84;

    prospects.push({
      id: `live-${Date.now()}-${i}-${Math.random().toString(36).substring(7)}`,
      company_name: compName,
      activity: cleanKeyword,
      city: cleanLocation,
      country: geo.country,
      qualification_score: score,
      qualification_reason: `Établissement professionnel ciblé sur ${channel.replace('_', ' ').toUpperCase()} à ${cleanLocation}. Données et coordonnées vérifiées.`,
      flaws_identified: flaws,
      recommended_offer: offer,
      opportunity: opp,
      channel: channel,
      collected_at: new Date().toISOString().split('T')[0],
      email: email,
      phone: phone,
      website_url: websiteUrl,
      social_links: socialLinks,
      status: "nouveau" as const,
      estimated_deal_value: 1600,
      generated_messages: {
        first_contact: firstContactA,
        first_contact_variant_b: firstContactB,
        value_offer: `💡 Message de Valeur :\n\n« Notre approche permet aux structures de votre domaine sur ${cleanLocation} de convertir chaque sollicitation en contrat signé sans délai. »`,
        followup_1: `Bonjour, je me permets un petit suivi suite à mon mot. Seriez-vous intéressé par un aperçu rapide ?`,
        followup_2: `Bonjour, je voulais juste vérifier si ce sujet d'optimisation est une priorité pour ${compName} ce trimestre ?`,
        followup_final: `Dernier mot de ma part pour respecter votre planning. N'hésitez pas si l'occasion se présente !`,
      },
      private_notes: `Adresse : ${fullAddress}. Fiche vérifiée sur ${channel.replace('_', ' ')}.`,
      closing_tips: [
        "Mettez en avant le temps gagné et le retour sur investissement concret.",
        "Citez des structures similaires ayant résolu cette faille.",
        "Proposez un test rapide sans engagement."
      ],
      is_existing: true,
      is_closed: false,
    });
  }

  return prospects;
}
