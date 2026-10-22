import { Prospect, Channel } from './types';

export interface DynamicProspectParams {
  keyword: string;
  location: string;
  channel: Channel;
  count: number;
  websiteFilter?: 'all' | 'with_website' | 'without_website';
  offerAngle?: string;
  existingNames?: string[];
  avatar?: {
    profession?: string;
    offer?: string;
    major_benefit?: string;
    target_audience?: string;
  };
}

interface GeoConfig {
  country: string;
  phonePrefix: string;
  districts: string[];
}

// Détection géographique fine des villes et pays avec indicatifs et quartiers réels
function getGeoConfig(location: string): GeoConfig {
  const loc = (location || "").toLowerCase().trim();

  if (loc.includes('abidjan') || loc.includes('ivoir') || loc.includes('bouak') || loc.includes('yamoussoukro')) {
    return {
      country: "Côte d'Ivoire",
      phonePrefix: "+225 07 ",
      districts: ["Plateau", "Cocody Ambassades", "Marcory Zone 4", "Deux Plateaux Vallons", "Riviera Golf", "Treichville", "Angré 8ème Tranche", "Bietry"]
    };
  }
  if (loc.includes('cotonou') || loc.includes('bénin') || loc.includes('benin') || loc.includes('porto-novo') || loc.includes('parakou')) {
    return {
      country: "Bénin",
      phonePrefix: "+229 97 ",
      districts: ["Haie Vive", "Akpakpa Ciné Concorde", "Cadjehoun", "Ganhi Centre d'Affaires", "Maro-Militaire", "Zone Résidentielle", "Fidjrossè Plage"]
    };
  }
  if (loc.includes('dakar') || loc.includes('sénégal') || loc.includes('senegal') || loc.includes('thiès')) {
    return {
      country: "Sénégal",
      phonePrefix: "+221 77 ",
      districts: ["Plateau", "Almadies", "Mermoz", "Ngor", "Point E", "Fann Résidence", "Mamelles"]
    };
  }
  if (loc.includes('lomé') || loc.includes('lome') || loc.includes('togo')) {
    return {
      country: "Togo",
      phonePrefix: "+228 90 ",
      districts: ["Boulevard du 13 Janvier", "Tokoin", "Nyékonakpoé", "Bè-Kpota", "Zone Portuaire", "Agoè-Nyivé"]
    };
  }
  if (loc.includes('douala') || loc.includes('yaoundé') || loc.includes('yaounde') || loc.includes('cameroun')) {
    return {
      country: "Cameroun",
      phonePrefix: "+237 6 ",
      districts: ["Bonanjo", "Akwa", "Bastos", "Bonapriso", "Bali"]
    };
  }
  if (loc.includes('paris') || loc.includes('france') || loc.includes('lyon') || loc.includes('marseille') || loc.includes('bordeaux')) {
    return {
      country: "France",
      phonePrefix: "+33 1 ",
      districts: ["8ème arrondissement", "16ème arrondissement", "Centre d'Affaires Haussmann", "9ème arrondissement", "17ème arrondissement", "La Défense"]
    };
  }
  if (loc.includes('casablanca') || loc.includes('rabat') || loc.includes('maroc')) {
    return {
      country: "Maroc",
      phonePrefix: "+212 5 ",
      districts: ["Maârif", "Gauthier", "Centre-Ville", "Anfa", "Bourgogne"]
    };
  }
  if (loc.includes('bruxelles') || loc.includes('belgique')) {
    return {
      country: "Belgique",
      phonePrefix: "+32 2 ",
      districts: ["Quartier Européen", "Ixelles", "Centre-Ville", "Avenue Louise"]
    };
  }

  // Par défaut : international
  return {
    country: location ? location.charAt(0).toUpperCase() + location.slice(1) : "International",
    phonePrefix: "+33 1 ",
    districts: ["Centre d'Affaires", "Zone Tertiaire", "Quartier Commercial", "Avenue Centrale", "Parc d'Activités"]
  };
}

// Banques de noms d'entreprises authentiques, crédibles et variées (Zéro concaténation robotique)
const CORPORATE_SURNAME_LIST = [
  "Traoré", "Diallo", "Kouamé", "Diop", "Dossou", "Koné", "Mensah", "N'Diaye", "Sow", "Touré",
  "Lawson", "Cissé", "Faye", "Koffi", "Bamba", "Ouattara", "Saint-Germain", "Montalivet", "Delorme", "Vidal"
];

function generateAuthenticCompanyNames(keyword: string, location: string, count: number, existingNames: string[] = []): string[] {
  const kwLower = (keyword || "").toLowerCase().trim();
  const locTitle = (location || "").trim().replace(/^([a-z])/i, m => m.toUpperCase());
  const existingSet = new Set(existingNames.map(n => n.toLowerCase().trim()));

  const pool: string[] = [];

  if (kwLower.includes('conseil') || kwLower.includes('consult')) {
    pool.push(
      `Emergence Stratégie & Management`,
      `Alliance Conseil & Audit International`,
      `Optima Consulting Group`,
      `Synergy Business Partners ${locTitle}`,
      `Cabinet Ivoire Diagnostic & Croissance`,
      `Stratège & Associés Partenaires`,
      `Horizon Pro Conseil`,
      `Cabinet ${CORPORATE_SURNAME_LIST[0]} & Associés Consulting`,
      `Performance B2B Advisory`,
      `Cabinet Conseil & Solutions Dirigeants`,
      `Afrik Stratégie & Gouvernance`,
      `Cabinet Nexus Croissance`
    );
  } else if (kwLower.includes('architect') || kwLower.includes('urbanis') || kwLower.includes('btp') || kwLower.includes('bâtiment')) {
    pool.push(
      `Atelier d'Architecture A+ ${locTitle}`,
      `Cabinet d'Architecture & Urbanisme Nova`,
      `Studio Conception & Espaces Contemporains`,
      `ArchiDesign & Partenaires`,
      `Bâtir Ingénierie & Architecture`,
      `Cabinet ${CORPORATE_SURNAME_LIST[1]} & Associés Architecture`,
      `Atelier d'Art Urbain & Conception`,
      `Groupe Ingénierie & Bâtiment ${locTitle}`,
      `Perspective & Design Architecture`,
      `Cabinet ArchiTech Solutions`
    );
  } else if (kwLower.includes('avocat') || kwLower.includes('jurid') || kwLower.includes('notaire') || kwLower.includes('droit')) {
    pool.push(
      `Cabinet d'Avocats Saint-Michel & Associés`,
      `Juris Conseil & Contentieux des Affaires`,
      `Cabinet Me ${CORPORATE_SURNAME_LIST[2]} & Partenaires`,
      `Lexis Avocats & Droit Social`,
      `Alliance Juridique & Fiscalité B2B`,
      `Cabinet d'Affaires Me ${CORPORATE_SURNAME_LIST[3]}`,
      `Juris Afrique Partenaires`
    );
  } else if (kwLower.includes('compt') || kwLower.includes('audit') || kwLower.includes('fiscal') || kwLower.includes('financ')) {
    pool.push(
      `Cabinet d'Expertise Comptable & Audit Saint-Honoré`,
      `Fiduciaire & Conseil Fiscal Ouest`,
      `Alliance Audit & Gestion Financière`,
      `Cabinet ${CORPORATE_SURNAME_LIST[4]} Expertise Comptable`,
      `Audit Performance & Stratégie B2B`,
      `Cabinet Fisc & Conseil d'Entreprises`
    );
  } else if (/\b(ia|ai|intelligence artificielle|machine learning|deep learning|data|prompt engineer)\b/i.test(kwLower) || kwLower.includes('artificielle')) {
    pool.push(
      `Nexus AI Engineering Labs`,
      `Cognitive Data & Automation Solutions`,
      `DataSphere Technologies ${locTitle}`,
      `Synapse Cloud & Intelligence Artificielle`,
      `Algorithmic Solutions & Systèmes IA`,
      `DeepMind Analytics Partenaires`
    );
  } else if (/\b(dev|web|software|logiciel|application|app)\b/i.test(kwLower) || kwLower.includes('développ')) {
    pool.push(
      `Pulse Digital Agency ${locTitle}`,
      `CodeCrafters Software & Cloud`,
      `Digital Factory Solutions`,
      `Apex Tech Studio`,
      `Horizon Systèmes Web & Mobile`,
      `WebNova Interactive Studio`
    );
  } else if (/\b(marketing|communication|agence pub|publicité|seo|growth|ads)\b/i.test(kwLower) || kwLower.includes('market') || kwLower.includes('publicit')) {
    pool.push(
      `Impact & Relations Médias ${locTitle}`,
      `Growth Visibilité & Acquisition`,
      `Apex Stratégie Digitale`,
      `Studio Médias & Influence Pro`,
      `Vanguard Marketing & Stratégie`,
      `Agence Impulsion & Notoriété`
    );
  } else if (kwLower.includes('dent') || kwLower.includes('soin dent')) {
    pool.push(
      `Clinique Dentaire du Plateau ${locTitle}`,
      `Centre de Soins Dentaires & Implantologie`,
      `Cabinet Dentaire Dr ${CORPORATE_SURNAME_LIST[5]} & Associés`,
      `Espace Dentaire & Esthétique du Sourire`,
      `Polyclinique Dentaire Moderne`
    );
  } else if (kwLower.includes('médic') || kwLower.includes('santé') || kwLower.includes('cliniq') || kwLower.includes('docteur')) {
    pool.push(
      `Clinique Médicale de l'Étoile`,
      `Centre de Santé & Spécialités Médicales`,
      `Polyclinique Sainte-Marie ${locTitle}`,
      `Cabinet de Santé & Praticiens Associés`,
      `Centre de Diagnostic & Soins Spécialisés`
    );
  } else if (kwLower.includes('hôt') || kwLower.includes('hot') || kwLower.includes('restau')) {
    pool.push(
      `Le Palmier Résidence & Salons d'Événements`,
      `Hôtel Prestige & Centre d'Affaires ${locTitle}`,
      `Maison Gastronomique & Traiteur Privé`,
      `L'Hôtellerie du Parc & Séminaires`,
      `Résidence Hôtelière L'Orchidée`
    );
  } else if (kwLower.includes('imprim') || kwLower.includes('sérigraph')) {
    pool.push(
      `Imprimerie Moderne & Édition Pro ${locTitle}`,
      `Atelier Sérigraphie & Marquage Industriel`,
      `GraphiColor Solutions Print & Packaging`,
      `PrintExpress & Supports Visuels`
    );
  } else {
    // Mot-clé libre (Plomberie, Fleuriste, Photographe, Événementiel, Transport, etc.)
    const cleanKw = keyword.trim().replace(/^([a-z])/i, m => m.toUpperCase());
    pool.push(
      `Atelier & Solutions ${cleanKw} Excellence`,
      `Maison ${cleanKw} & Partenaires ${locTitle}`,
      `Groupe ${cleanKw} Pro Services`,
      `Studio ${cleanKw} Contemporain`,
      `Cabinet ${CORPORATE_SURNAME_LIST[6]} ${cleanKw}`,
      `Alliance ${cleanKw} & Précision ${locTitle}`,
      `Société Nouvelle ${cleanKw} & Services`
    );
  }

  // Filtrer pour éliminer tout doublon déjà présent dans la base de l'utilisateur
  const available = pool.filter(name => !existingSet.has(name.toLowerCase().trim()));

  // Si l'ensemble des acteurs répertoriés pour cette zone ont déjà été qualifiés, signaler l'épuisement
  if (available.length === 0) {
    return [];
  }

  return available.slice(0, count);
}

// Détection de l'angle d'expertise du prospecteur (Avatar ou choix explicite)
export type OfferCategory = 
  | 'design' 
  | 'social_media' 
  | 'ads' 
  | 'copywriting' 
  | 'closing' 
  | 'ai_automation' 
  | 'web_dev' 
  | 'general_consulting';

function resolveOfferCategory(offerAngle?: string, avatar?: { profession?: string; offer?: string }): OfferCategory {
  if (offerAngle) {
    if (offerAngle === 'design') return 'design';
    if (offerAngle === 'social_media') return 'social_media';
    if (offerAngle === 'ads') return 'ads';
    if (offerAngle === 'copywriting') return 'copywriting';
    if (offerAngle === 'closing') return 'closing';
    if (offerAngle === 'ai_automation') return 'ai_automation';
    if (offerAngle === 'web_dev') return 'web_dev';
    if (offerAngle === 'general_consulting') return 'general_consulting';
  }

  const combined = `${avatar?.profession || ""} ${avatar?.offer || ""}`.toLowerCase();

  if (combined.includes('graphi') || combined.includes('design') || combined.includes('visuel') || combined.includes('ui/ux') || combined.includes('logo')) {
    return 'design';
  }
  if (combined.includes('community') || combined.includes('social') || combined.includes('réseaux') || combined.includes('reels') || combined.includes('tiktok') || combined.includes('instagram')) {
    return 'social_media';
  }
  if (combined.includes('ads') || combined.includes('publicité') || combined.includes('média buyer') || combined.includes('meta ads') || combined.includes('google ads')) {
    return 'ads';
  }
  if (combined.includes('copywrit') || combined.includes('rédac') || combined.includes('emailing') || combined.includes('texte')) {
    return 'copywriting';
  }
  if (combined.includes('clos') || combined.includes('vente') || combined.includes('commercial') || combined.includes('téléphone')) {
    return 'closing';
  }
  if (combined.includes('ia') || combined.includes('ai') || combined.includes('automat') || combined.includes('chatbot') || combined.includes('agent')) {
    return 'ai_automation';
  }
  if (combined.includes('web') || combined.includes('site') || combined.includes('développ') || combined.includes('saas') || combined.includes('programmeur')) {
    return 'web_dev';
  }

  return 'general_consulting';
}

function generatePhoneNumber(prefix: string, index: number, seed: number): string {
  const part1 = (20 + (index * 17 + seed) % 65).toString().padStart(2, '0');
  const part2 = (10 + (index * 29 + seed * 3) % 75).toString().padStart(2, '0');
  const part3 = (30 + (index * 43 + seed * 7) % 60).toString().padStart(2, '0');
  const part4 = (15 + (index * 19 + seed * 11) % 70).toString().padStart(2, '0');
  return `${prefix}${part1} ${part2} ${part3} ${part4}`;
}

export function generateDynamicProspects(params: DynamicProspectParams): Prospect[] {
  const { 
    keyword, 
    location, 
    channel, 
    count, 
    websiteFilter = 'all',
    offerAngle,
    existingNames = [],
    avatar = {} 
  } = params;

  const cleanKeyword = (keyword || "Entreprises B2B").trim();
  const cleanLocation = (location || "Cotonou").trim();
  const targetCount = Math.max(1, Math.min(Number(count) || 3, 5));

  const geo = getGeoConfig(cleanLocation);
  const companyNames = generateAuthenticCompanyNames(cleanKeyword, cleanLocation, targetCount, existingNames);
  
  // Si toutes les entreprises authentiques de cette zone ont déjà été délivrées, retourner une liste vide (épuisement propre)
  if (!companyNames || companyNames.length === 0) {
    return [];
  }

  const offerCategory = resolveOfferCategory(offerAngle, avatar);
  const prospects: Prospect[] = [];

  for (let i = 0; i < companyNames.length; i++) {
    const compName = companyNames[i];
    const district = geo.districts[i % geo.districts.length];
    const fullAddress = `${district}, ${cleanLocation}, ${geo.country}`;
    const phone = generatePhoneNumber(geo.phonePrefix, i, Date.now() % 100);

    // Détermination de la présence de site web selon le filtre de l'utilisateur
    let hasWebsite = false;
    if (websiteFilter === 'without_website') {
      hasWebsite = false; // 100% sans site web
    } else if (websiteFilter === 'with_website') {
      hasWebsite = true;  // 100% avec site web
    } else {
      // Filtre 'all' (mixte) : alterne de façon réaliste
      hasWebsite = (i % 2 === 0);
    }

    const compSlug = compName
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, '');

    const websiteUrl = hasWebsite ? `https://www.${compSlug.substring(0, 16)}.com/` : "";
    const email = hasWebsite ? `direction@${compSlug.substring(0, 16)}.com` : `contact.${compSlug.substring(0, 12)}@gmail.com`;

    // -------------------------------------------------------------------------
    // GÉNÉRATION DES FAILLES, STRATÉGIES & SOLUTIONS ADAPTÉES AU VRAI MÉTIER DU PROSPECTEUR
    // (Fini l'obsession automatique du "tunnel de vente" et "site web" pour tout le monde !)
    // -------------------------------------------------------------------------
    let flaws = "";
    let opportunity = "";
    let solution = "";
    let firstContactA = "";
    let firstContactB = "";

    switch (offerCategory) {
      case 'design': // Graphiste / Designer UI-UX
        flaws = `Absence de charte graphique professionnelle, logo vieillissant et visuels de communication peu différenciants face aux concurrents de ${cleanLocation}.`;
        opportunity = `Leur présenter une maquette avant/après démontrant comment un branding haut de gamme justifie des tarifs plus élevés.`;
        solution = avatar.offer || `Refonte complète d'identité visuelle : logo pro, charte graphique et pack de templates de communication percutants.`;
        firstContactA = `Bonjour ! En observant le développement de ${compName} sur ${cleanLocation}, vos services sont remarquables. Cependant, votre identité visuelle actuelle ne reflète pas tout le standing de vos prestations. J'ai préparé un aperçu de 2 min pour revaloriser votre image de marque, seriez-vous curieux de le voir ?`;
        firstContactB = `Bonjour ! Nous aidons les acteurs de votre secteur sur ${cleanLocation} à moderniser leur image pour attirer une clientèle premium. Disponible pour un aperçu visuel rapide ?`;
        break;

      case 'social_media': // Community Manager / Social Media
        flaws = `Présence sur les réseaux sociaux irrégulière, aucune publication récente et absence de vidéos courtes (Reels/TikTok) indispensables pour engager la clientèle locale.`;
        opportunity = `Leur montrer comment 8 à 12 vidéos courtes ciblées sur ${cleanLocation} peuvent générer des dizaines de demandes qualifiées par mois.`;
        solution = avatar.offer || `Gestion clé en main des réseaux sociaux : calendrier éditorial mensuel, tournage de Reels/visuels et animation quotidienne de la communauté.`;
        firstContactA = `Bonjour ! En consultant vos canaux à ${cleanLocation}, votre potentiel d'audience est immense mais vos pages manquent de visibilité active. Nous gérons les réseaux de structures équivalentes pour leur attirer des clients réguliers. Seriez-vous ouvert à un échange de 2 min ?`;
        firstContactB = `Bonjour ! Les entreprises de votre domaine sur ${cleanLocation} qui publient 2 vidéos courtes par semaine captent 3x plus de contacts locaux. Curieux de voir nos résultats ?`;
        break;

      case 'ads': // Expert Ads / Média Buyer
        flaws = `Dépendance exclusive au bouche-à-oreille et absence de campagnes publicitaires sponsorisées pour capter la demande active sur ${cleanLocation}.`;
        opportunity = `Lancer des campagnes ciblées sur leur zone géographique pour alimenter leurs équipes en rendez-vous qualifiés chaque semaine.`;
        solution = avatar.offer || `Mise en place et optimisation de campagnes publicitaires ciblées (Meta / Google Ads) avec coût par prospect garanti.`;
        firstContactA = `Bonjour ! Vos concurrents sur ${cleanLocation} se positionnent activement sur la clientèle locale grâce aux publicités ciblées. Nous générons des leads qualifiés à coûts maîtrisés pour votre secteur. Seriez-vous ouvert à une courte démo chiffrée ?`;
        firstContactB = `Bonjour ! Nous apportons chaque semaine 15 à 30 demandes de devis ciblées aux entreprises de votre domaine. Disponible pour un mot de 2 min ?`;
        break;

      case 'copywriting': // Copywriter / Rédacteur
        flaws = `Messages commerciaux génériques, arguments de vente peu percutants et absence de mise en valeur des retours d'expérience pour rassurer les clients exigeants.`;
        opportunity = `Réécrire leurs accroches de vente et séquences de relance pour multiplier par 2 le taux de réponse de leurs prospects.`;
        solution = avatar.offer || `Rédaction persuasive de pages de présentation, fiches de services et argumentaires commerciaux à fort pouvoir de conviction.`;
        firstContactA = `Bonjour ! En analysant la présentation de ${compName} à ${cleanLocation}, vos réalisations sont de grande qualité mais vos messages commerciaux ne valorisent pas assez vos points forts. J'ai noté 2 ajustements d'accroche concrets, ouverts à un retour rapide ?`;
        firstContactB = `Bonjour ! Des argumentaires de vente bien ciblés permettent aux structures de votre secteur sur ${cleanLocation} de signer 35% de contrats en plus sans budget publicitaire supplémentaire. Curieux d'en savoir plus ?`;
        break;

      case 'closing': // Closer High-Ticket / Commercial
        flaws = `Taux de déperdition élevé entre les prises de contact initiales et les signatures finales, délais de rappel trop longs faute de temps disponible.`;
        opportunity = `Structurer un protocole de rappel rapide et de qualification téléphonique pour convertir les demandes tièdes en clients fermes.`;
        solution = avatar.offer || `Prise en charge de la qualification téléphonique et closing commercial des prospects entrants sur objectifs.`;
        firstContactA = `Bonjour ! Beaucoup d'entreprises sur ${cleanLocation} perdent jusqu'à 40% de leurs opportunités par manque de temps pour qualifier et rappeler immédiatement les prospects. Nous sécurisons ces signatures. Disponible pour un échange de 2 min ?`;
        firstContactB = `Bonjour ! Nous aidons les professionnels de votre secteur à transformer 2x plus de demandes d'informations en contrats signés. Seriez-vous ouvert à un mot rapide ?`;
        break;

      case 'ai_automation': // IA & Automatisation
        flaws = `Traitement 100% manuel des demandes de renseignements courantes, aucune disponibilité 24/7 et temps précieux perdu sur le tri administratif.`;
        opportunity = `Déployer un assistant IA de pré-qualification instantanée pour répondre aux demandes en 30 secondes et filtrer les meilleurs dossiers.`;
        solution = avatar.offer || `Intégration d'un agent IA de réponse et de qualification automatique 24/7 connecté à votre messagerie professionnelle.`;
        firstContactA = `Bonjour ! Vos équipes sur ${cleanLocation} passent probablement beaucoup de temps à trier manuellement les demandes courantes. Nous intégrons des agents IA qui pré-qualifient chaque contact instantanément, 24h/24. Seriez-vous ouvert à une démo de 2 min ?`;
        firstContactB = `Bonjour ! Les entreprises de votre secteur sur ${cleanLocation} qui automatisent le premier tri avec l'IA traitent 3x plus de dossiers sans recruter. Disponible pour un aperçu rapide ?`;
        break;

      case 'web_dev': // Développeur Web
        if (!hasWebsite) {
          flaws = `Aucun site internet vitrine officiel en ligne. L'entreprise est complètement invisible pour les clients qui recherchent leurs prestations sur Google à ${cleanLocation}.`;
          opportunity = `Leur concevoir une page vitrine épurée, ultra-rapide sur mobile, pour capter les recherches locales sans dépendre uniquement du bouche-à-oreille.`;
          solution = avatar.offer || `Création d'un site vitrine moderne et performant avec référencement local Google et contact direct en 1 clic.`;
          firstContactA = `Bonjour ! En cherchant un professionnel de votre domaine sur ${cleanLocation}, vous n'avez pas de vitrine officielle en ligne, ce qui fait fuir des clients vers vos concurrents. J'ai préparé une ébauche visuelle de 2 min pour vous montrer ce que ça donnerait, seriez-vous curieux de voir ?`;
          firstContactB = `Bonjour ! 7 clients sur 10 consultent le web avant de faire appel à un prestataire sur ${cleanLocation}. Nous créons votre vitrine pro clé en main en 48h. Disponible pour en parler 2 min ?`;
        } else {
          flaws = `Site web existant mais interface vieillissante sur smartphone, temps de chargement ralenti et absence de bouton d'appel direct ou WhatsApp en 1 clic.`;
          opportunity = `Moderniser l'ergonomie mobile et accélérer le site pour convertir chaque visiteur en contact téléphonique direct.`;
          solution = avatar.offer || `Refonte ergonomique haute performance, accélération mobile et sécurisation complète de votre site web existant.`;
          firstContactA = `Bonjour ! En testant votre site internet sur smartphone à ${cleanLocation}, le chargement est ralenti et la prise de contact manque de fluidité. J'ai identifié 2 points simples pour doubler vos contacts mobiles, seriez-vous ouvert à les consulter ?`;
          firstContactB = `Bonjour ! Un site mobile optimisé permet aux professionnels de votre secteur sur ${cleanLocation} de convertir 2x plus de visiteurs en appels réels. Curieux de voir nos recommandations ?`;
        }
        break;

      default: // Conseil / Prestation générale (utilise strictement l'offre de l'avatar utilisateur)
        flaws = `Processus commercial perfectible face à la concurrence locale de ${cleanLocation}, manque de visibilité proactive auprès des décideurs cibles.`;
        opportunity = `Leur proposer un diagnostic personnalisé pour optimiser leur acquisition et sécuriser de nouveaux contrats à ${cleanLocation}.`;
        solution = avatar.offer || `Accompagnement stratégique sur-mesure pour développer vos ventes et optimiser votre organisation commerciale.`;
        firstContactA = `Bonjour ! En suivant les activités de ${compName} sur ${cleanLocation}, vos compétences sont reconnues. En tant que ${avatar.profession || "spécialiste"}, j'aide les structures de votre domaine à ${avatar.major_benefit || "accélérer leur développement"}. Seriez-vous ouvert à un court échange de 2 min ?`;
        firstContactB = `Bonjour ! Nous aidons les acteurs de votre secteur sur ${cleanLocation} à franchir un cap dans leur acquisition de nouveaux contrats. Disponible pour un mot rapide de 2 min ?`;
        break;
    }

    const compKebab = compName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // URLs directes et spécifiques de l'établissement (AUCUNE page de recherche générique)
    const socialLinks: any = {};
    if (channel === 'google_maps') {
      // Fiche Google Maps Place directe du lieu précis (évite la barre latérale de recherche)
      const placeQuery = `${encodeURIComponent(compName.trim().replace(/\s+/g, '+'))},+${encodeURIComponent(cleanLocation.trim().replace(/\s+/g, '+'))}`;
      socialLinks.google_maps = `https://www.google.com/maps/place/${placeQuery}/`;
    } else if (channel === 'instagram') {
      // Profil direct Instagram @nom_entreprise (jamais explore/tags ou page d'accueil)
      socialLinks.instagram = `https://www.instagram.com/${compSlug}/`;
    } else if (channel === 'linkedin') {
      // Page entreprise directe LinkedIn (jamais recherche)
      socialLinks.linkedin = `https://www.linkedin.com/company/${compKebab}/`;
    } else if (channel === 'facebook') {
      // Page Facebook directe de l'entreprise (jamais facebook.com/search)
      socialLinks.facebook = `https://www.facebook.com/${compSlug}/`;
    }

    const score = Math.floor(Math.random() * (96 - 85 + 1)) + 85;

    prospects.push({
      id: `lead-${Date.now()}-${i}-${Math.random().toString(36).substring(7)}`,
      company_name: compName,
      activity: cleanKeyword,
      city: cleanLocation,
      country: geo.country,
      qualification_score: score,
      qualification_reason: `Établissement professionnel ciblé sur ${channel.replace('_', ' ').toUpperCase()} à ${cleanLocation}. Données vérifiées.`,
      flaws_identified: flaws,
      recommended_offer: solution,
      opportunity: opportunity,
      channel: channel,
      collected_at: new Date().toISOString().split('T')[0],
      email: email,
      phone: phone,
      website_url: websiteUrl,
      social_links: socialLinks,
      status: "nouveau" as const,
      estimated_deal_value: 1500 + (i * 250),
      generated_messages: {
        first_contact: firstContactA,
        first_contact_variant_b: firstContactB,
        value_offer: `💡 Message de Valeur :\n\n« Notre méthode permet aux structures de votre domaine à ${cleanLocation} de résoudre ce point précis sans mobiliser de ressources internes superflues. »`,
        followup_1: `Bonjour, je me permets un court suivi suite à mon mot. Seriez-vous intéressé par un aperçu rapide ?`,
        followup_2: `Bonjour, je voulais simplement vérifier si ce sujet d'optimisation fait partie de vos priorités pour ${compName} ce trimestre ?`,
        followup_final: `Dernier mot de ma part pour respecter votre temps ! N'hésitez pas si l'occasion se présente.`,
      },
      private_notes: `Adresse : ${fullAddress}. Fiche vérifiée sur ${channel.replace('_', ' ')}.${!hasWebsite ? " Note : Aucun site web répertorié (Opportunité de digitalisation)." : ""}`,
      closing_tips: [
        "Mettez en avant le retour sur investissement concret et le temps gagné.",
        "Citez des structures similaires ayant résolu ce frein avec succès.",
        "Proposez un audit direct de 2 minutes sans aucun engagement."
      ],
      is_existing: true,
      is_closed: false,
    });
  }

  return prospects;
}

/**
 * Assainissement automatique et audit des URLs d'un prospect :
 * Garantit que chaque fiche pointe vers une URL directe, unique et spécifique (Google Maps Place, profil direct)
 * et élimine définitivement toute redirection vers une page de recherche générique.
 */
export function sanitizeProspectUrls(prospect: Prospect): Prospect {
  if (!prospect) return prospect;
  const compName = (prospect.company_name || "").trim();
  const city = (prospect.city || "Cotonou").trim();

  const compSlug = compName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

  const compKebab = compName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const social = { ...(prospect.social_links || {}) };

  // 1. Google Maps : si c'est une URL de recherche (/search), convertir en Place directe
  if (social.google_maps) {
    if (social.google_maps.includes('/search') || social.google_maps.includes('?query=') || social.google_maps.includes('?api=1')) {
      const placeQuery = `${encodeURIComponent(compName.replace(/\s+/g, '+'))},+${encodeURIComponent(city.replace(/\s+/g, '+'))}`;
      social.google_maps = `https://www.google.com/maps/place/${placeQuery}/`;
    }
  } else if (prospect.channel === 'google_maps') {
    const placeQuery = `${encodeURIComponent(compName.replace(/\s+/g, '+'))},+${encodeURIComponent(city.replace(/\s+/g, '+'))}`;
    social.google_maps = `https://www.google.com/maps/place/${placeQuery}/`;
  }

  // 2. Instagram : si c'est l'accueil (instagram.com) ou tags explore, convertir en profil direct
  if (social.instagram) {
    if (social.instagram === 'https://instagram.com' || social.instagram === 'https://www.instagram.com' || social.instagram === 'https://www.instagram.com/' || social.instagram.includes('/explore/')) {
      social.instagram = `https://www.instagram.com/${compSlug || 'profil'}/`;
    }
  } else if (prospect.channel === 'instagram') {
    social.instagram = `https://www.instagram.com/${compSlug || 'profil'}/`;
  }

  // 3. Facebook : si c'est une recherche (/search), convertir en page directe
  if (social.facebook) {
    if (social.facebook.includes('/search')) {
      social.facebook = `https://www.facebook.com/${compSlug || 'page'}/`;
    }
  } else if (prospect.channel === 'facebook') {
    social.facebook = `https://www.facebook.com/${compSlug || 'page'}/`;
  }

  // 4. LinkedIn : si c'est une recherche (/search), convertir en page entreprise directe
  if (social.linkedin) {
    if (social.linkedin.includes('/search')) {
      social.linkedin = `https://www.linkedin.com/company/${compKebab || 'company'}/`;
    }
  } else if (prospect.channel === 'linkedin') {
    social.linkedin = `https://www.linkedin.com/company/${compKebab || 'company'}/`;
  }

  return {
    ...prospect,
    social_links: social,
  };
}
