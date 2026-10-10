import { Prospect, AvatarProfile, Subscription, AuditReport, Testimonial, TeamMember } from './types';

export const initialAvatar: AvatarProfile = {
  full_name: "Edith Dossou",
  email: "dossou1992@gmail.com",
  profession: "Consultante en Acquisition Digitale & Systèmes CRM",
  company_name: "Growthizi Agency",
  offer: "Mise en place d'un système de relance automatique WhatsApp et CRM pour doubler le closing des devis sans y passer du temps.",
  target_audience: "Agences de services, cabinets de conseil, architectes et PME en Afrique et en Europe.",
  major_benefit: "Générer +35% de rendez-vous qualifiés et transformer 2x plus de devis en contrats signés sous 30 jours.",
  tone: "chaleureux",
  followup_frequency: "J+3",
  auto_reminders: true,
};

export const initialSubscription: Subscription = {
  plan_type: 'DECOUVERTE',
  status: 'active',
  prospects_quota: 3,
  prospects_used: 2,
  bonus_prospects: 0,
  current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  auto_renew: true,
};

export const initialProspects: Prospect[] = [
  {
    id: "prospect-1",
    company_name: "Cabinet Talents Plus Conseils",
    activity: "Cabinet de conseil en ressources humaines, recrutement & audit",
    city: "Cotonou",
    country: "Bénin",
    qualification_score: 94,
    qualification_reason: "Acteur de référence en conseil RH et recrutement à Cotonou avec site web actif mais absence de tunnel automatisé de prise de contact directe sur mobile.",
    flaws_identified: "Absence de qualification automatisée des candidats et des entreprises clientes, gestion manuelle des demandes de devis et délais de relance.",
    recommended_offer: "Tunnel de qualification automatisé WhatsApp Business + Mini-CRM de suivi pour traiter 100% des demandes de mandats sans friction.",
    opportunity: "Proposer un diagnostic gratuit de leur temps de relance et une démo vidéo de 2 minutes de relance WhatsApp adaptée à leurs recrutements.",
    channel: "google_maps",
    collected_at: "2026-10-07",
    email: "contact@talents-plus.com",
    phone: "+229 97 64 03 93",
    website_url: "http://www.talents-plus.com/",
    social_links: {
      google_maps: "https://www.google.com/maps/search/?api=1&query=Cabinet+Talents+Plus+Conseils+Cotonou&query_place_id=ChIJQRofLwpVIxARYzIwdYW2RYw",
    },
    status: "en_discussion",
    estimated_deal_value: 1800,
    last_contact_date: "2026-10-06",
    sent_variant: "A",
    generated_messages: {
      first_contact: "Bonjour ! En analysant le positionnement de Cabinet Talents Plus Conseils à Cotonou, vos mandats sont prestigieux. Beaucoup de structures RH perdent 40% de leurs prospects par manque de réactivité instantanée sur mobile. J'ai conçu un mini-système WhatsApp qui automatise le tri sans effort. Seriez-vous ouvert à une courte vidéo de 2 min ?",
      first_contact_variant_b: "Bonjour ! Les cabinets de conseil sur Cotonou qui intègrent la qualification automatique traitent 3x plus de sollicitations sans recruter. J'ai modélisé un cas d'usage sur-mesure pour Talents Plus Conseils. Disponible pour un rapide échange de 2 minutes ?",
      value_offer: "💡 Message de Valeur :\n\n« Pré-qualifier automatiquement les demandes permet de récupérer 1 prospect sur 3 qui ne répondait plus, en gardant un contact humain et élégant, sans harceler vos clients. »",
      followup_1: "Bonjour, je me permets un petit suivi suite à mon mot. Je pensais justement à vos projets : souhaitez-vous que je vous partage les 3 points clés pour doubler vos réponses sur devis ?",
      followup_2: "Petit retour rapide sans vous déranger : si votre planning est chargé, je peux simplement vous glisser la vidéo explicative ici. Toujours intéressé ?",
      followup_final: "Dernier message de ma part pour respecter votre temps ! Si ce n'est pas votre priorité du moment, aucun souci. Au plaisir d'échanger quand le besoin se présentera !",
    },
    private_notes: "Cabinet très réputé au Bénin (Cotonou). Approche soignée et professionnelle recommandée.",
    closing_tips: [
      "Mentionnez l'impact sur leur chiffre d'affaires (1 mandat sauvé = 1 500 € net).",
      "Proposez de commencer par tester sur les 10 dernières demandes.",
      "Mettez en avant la simplicité : aucune application lourde à installer pour leurs clients."
    ],
    is_existing: true,
    is_closed: false,
  },
  {
    id: "prospect-2",
    company_name: "Cabinet JURIS PRESTIGE CONSEILS",
    activity: "Cabinet de conseil juridique, fiscal & audit d'entreprises",
    city: "Cotonou",
    country: "Bénin",
    qualification_score: 91,
    qualification_reason: "Cabinet juridique établi à Cotonou mais absence totale de site internet vitrine officiel et de présence web structurée.",
    flaws_identified: "Aucun site vitrine officiel répertorié. Dépendance totale au bouche-à-oreille local et perte de tous les clients recherchant un cabinet d'affaires sur internet.",
    recommended_offer: "Création d'un site web vitrine d'autorité haut de gamme avec bouton de consultation WhatsApp directe et module de prise de rendez-vous.",
    opportunity: "Leur démontrer qu'un cabinet juridique doté d'un site moderne capte en moyenne 8 à 12 nouveaux dossiers d'affaires par mois à Cotonou.",
    channel: "google_maps",
    collected_at: "2026-10-07",
    email: "",
    phone: "+229 96 06 28 19",
    website_url: "",
    social_links: {
      google_maps: "https://www.google.com/maps/search/?api=1&query=Cabinet+JURIS+PRESTIGE+CONSEILS+Cotonou&query_place_id=ChIJM-3nU3xXIxAR8lfphxt2suI",
    },
    status: "non_contacte",
    estimated_deal_value: 2200,
    last_contact_date: undefined,
    generated_messages: {
      first_contact: "Bonjour Maître ! J'ai repéré la réputation de JURIS PRESTIGE CONSEILS sur Cotonou. En recherchant vos compétences en ligne, vous n'avez pas de site vitrine pour présenter vos domaines d'intervention, ce qui oriente des dirigeants vers d'autres cabinets. Seriez-vous ouvert à une démo de 2 min d'un site d'autorité sobre ?",
      first_contact_variant_b: "Bonjour ! 82% des chefs d'entreprise à Cotonou vérifient la crédibilité d'un cabinet juridique sur smartphone avant de confier un dossier. Un site vitrine épuré renforce immédiatement votre autorité. Disponible pour voir un aperçu en 2 min ?",
      value_offer: "💡 Message de Valeur :\n\n« Présenter ses expertises sur un site web professionnel permet d'augmenter ses honoraires perçus de 30% et de filtrer les dossiers à forte valeur ajoutée. »",
      followup_1: "Bonjour, je reviens vers vous suite à mon message. Souhaitez-vous découvrir la maquette conçue pour votre cabinet à Cotonou ?",
      followup_2: "Juste pour savoir si la digitalisation de votre image de marque fait partie des projets de votre cabinet ce trimestre ?",
      followup_final: "Je clos le sujet pour respecter votre messagerie. Restant à votre disposition si le besoin se présente !",
    },
    private_notes: "Adresse : 01 BP Cotonou, Bénin. Numéro de téléphone vérifié.",
    closing_tips: [
      "Parlez du prestige et de l'autorité du cabinet.",
      "Présentez la conformité déontologique et la discrétion de l'outil.",
      "Proposez une maquette personnalisée sans engagement."
    ],
    is_existing: true,
    is_closed: false,
  },
  {
    id: "prospect-3",
    company_name: "Khelly Bio Cosmétiques",
    activity: "Boutique en ligne & soins cosmétiques naturels bio",
    city: "Cotonou",
    country: "Bénin",
    qualification_score: 88,
    qualification_reason: "Compte Instagram actif avec communauté engagée à Cotonou mais perte de ventes directes dans les commentaires et messages privés non traités.",
    flaws_identified: "Bio Instagram sous-optimisée, absence de lien de commande direct WhatsApp et délais de réponse aux demandes de prix sur les publications.",
    recommended_offer: "Mise en place d'un tunnel de commande direct WhatsApp automatisé relié aux stories Instagram pour doubler les ventes quotidiennes.",
    opportunity: "Démontrer combien de clientes renoncent à leur panier chaque semaine à cause d'une réponse de prix tardive.",
    channel: "instagram",
    collected_at: "2026-10-07",
    email: "",
    phone: "+229 97 12 34 56",
    website_url: "",
    social_links: {
      instagram: "https://instagram.com",
    },
    status: "nouveau",
    estimated_deal_value: 950,
    last_contact_date: undefined,
    generated_messages: {
      first_contact: "Bonjour ! Vos produits cosmétiques bio sur Cotonou sont superbes. En regardant vos publications Instagram, j'ai vu que beaucoup de clientes demandent les prix en commentaires sans réponse instantanée. Avez-vous déjà testé un bouton WhatsApp direct pour finaliser les ventes ?",
      first_contact_variant_b: "Bonjour ! Félicitations pour la qualité de vos soins sur Cotonou. Beaucoup de marques perdent 30% de commandes parce que les clientes n'ont pas de lien direct pour commander. Nous avons une formule simple pour commander en 1 clic. Disponible pour un aperçu de 1 min ?",
      value_offer: "💡 Message de Valeur :\n\n« Rediriger chaque demande Instagram vers une discussion WhatsApp instantanée permet de conclure la vente avant que la cliente n'aille voir une autre marque. »",
      followup_1: "Bonjour ! Avez-vous eu 2 minutes pour voir mon message ? Cela pourrait vous faire gagner 1h par jour sur la gestion des commandes.",
      followup_2: "Un petit mot rapide pour savoir si booster les commandes de votre boutique à Cotonou est une priorité ce mois-ci ?",
      followup_final: "Dernier message pour ne pas insister inutilement. Plein de succès à votre marque bio !",
    },
    private_notes: "Acteur dynamique à Cotonou. Forte traction sur Instagram.",
    closing_tips: [
      "Montrez la facilité de paiement Mobile Money (MTN / Moov Bénin).",
      "Proposez un test direct sur 3 publications.",
      "Insistez sur la conversion immédiate des abonnées en clientes payantes."
    ],
    is_existing: true,
    is_closed: false,
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "testi-1",
    user_email: "cedric.k@startup.com",
    user_name: "Cédric Kouassi",
    loom_url: "https://www.loom.com/share/9b10c9e782d45a9871f30",
    commercial_consent: true,
    status: "pending",
    created_at: "2026-09-24 10:15",
  },
  {
    id: "testi-2",
    user_email: "sarah.m@agenceclic.fr",
    user_name: "Sarah Martin",
    loom_url: "https://www.loom.com/share/a14e9f3b56c827d0124",
    commercial_consent: true,
    status: "approved",
    created_at: "2026-09-23 15:40",
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: "team-1",
    email: "assistant.eva@growthizi.com",
    role: "editor",
    status: "active",
    created_at: "2026-09-20",
  },
  {
    id: "team-2",
    email: "closer.thomas@growthizi.com",
    role: "editor",
    status: "invited",
    created_at: "2026-09-23",
  }
];

export const initialAuditReport: AuditReport = {
  generated_at: "2026-09-20T14:30:00Z",
  next_audit_available_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
  stats: {
    total_contacted: 32,
    response_rate: 34.4,
    closing_rate: 18.7,
  },
  main_bottleneck: "Perte de 45% des prospects au moment de la relance J+5 (manque d'accroche douce alternative).",
  key_findings: [
    "Les messages envoyés sur WhatsApp et LinkedIn obtiennent 2,8x plus de réponses que l'email froid.",
    "Les prospects ayant un score ≥ 85 convertissent à plus de 40% lorsque l'accroche mentionne explicitement le gain de temps et un échange de 2 minutes.",
    "7 prospects ont été abandonnés sans relance : potentiel de réactivation immédiat de 3 nouveaux contrats."
  ],
  recommended_script: {
    first_contact_optimized: "Bonjour [Prénom] ! J'ai vu le développement de [Entreprise] sur [Ville]. Votre positionnement est solide, mais j'ai remarqué que le suivi de vos demandes entrantes vous prenait un temps précieux. J'ai un système léger qui fait ça pour vous en direct. Seriez-vous ouvert à une démo de 2 min ?",
    followup_optimized: "Bonjour [Prénom], je fais juste un petit suivi sans vous déranger ! Si votre semaine est chargée, voulez-vous que je vous laisse un aperçu vidéo ici ? Aucun engagement bien sûr."
  },
  avatar_suggestions: "Affinez votre cible en priorisant les agences et cabinets entre 3 et 15 collaborateurs : leur sensibilité au gain de temps est 2x plus élevée.",
  ab_test_active: true,
  ab_test_stats: {
    variant_a_sent: 18,
    variant_b_sent: 14,
    variant_a_replies: 6, // 33%
    variant_b_replies: 7, // 50% -> Winner!
  }
};
