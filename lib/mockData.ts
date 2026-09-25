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
};

export const initialProspects: Prospect[] = [
  {
    id: "prospect-1",
    company_name: "Atelier Nova Création",
    activity: "Cabinet d'architecture d'intérieur & aménagement",
    city: "Lomé",
    country: "Togo",
    qualification_score: 94,
    qualification_reason: "Forte visibilité sur les réalisations mais aucun suivi automatisé des devis envoyés. Alignement parfait avec votre offre WhatsApp CRM.",
    flaws_identified: "Absence de suivi structuré des demandes entrantes, délais de réponse de 3 jours et zéro relance après remise de devis.",
    recommended_offer: "Tunnel de relance automatisé WhatsApp Business + Mini-CRM de suivi pour récupérer 40% des devis endormis.",
    opportunity: "Proposer un diagnostic gratuit de leur temps de relance et une démo vidéo de 2 minutes de relance WhatsApp.",
    channel: "google_maps",
    collected_at: "2026-09-22",
    email: "contact@novacreation.tg",
    phone: "+228 90 12 34 56",
    website_url: "https://novacreation.tg",
    social_links: {
      instagram: "https://instagram.com/novacreation_tg",
      google_maps: "https://maps.google.com/?q=Atelier+Nova+Creation+Lome",
      linkedin: "https://linkedin.com/company/nova-creation-lome",
    },
    status: "en_discussion",
    estimated_deal_value: 1200,
    last_contact_date: "2026-09-21",
    sent_variant: "A",
    generated_messages: {
      first_contact: "Bonjour ! J'ai remarqué vos superbes réalisations sur Lomé. Beaucoup d'architectes perdent 40% de leurs devis par manque de suivi rapide. J'ai conçu un mini-système WhatsApp qui relance vos prospects sans effort. Seriez-vous ouvert à une courte vidéo de 2 min ?",
      first_contact_variant_b: "Bonjour Marc ! En observant les projets d'Atelier Nova Création sur Lomé, j'ai vu que vous réalisiez de magnifiques chantiers. Nous aidons les cabinets comme le vôtre à relancer chaque devis en 5 secondes sur WhatsApp pour signer 2 clients de plus par mois. Disponible pour un échange rapide de 2 minutes ?",
      value_offer: "💡 Comment utiliser ce message : À envoyer si le prospect réagit positivement à l'accroche ou demande des précisions sur votre fonctionnement. Il apporte une preuve tangible de résultat sans survendre :\n\n« Notre méthode permet de réactiver 1 devis sur 3 qui ne répondait plus, en gardant un contact humain et élégant, sans harceler vos clients. Nous avons par exemple permis à une agence de décoration de récupérer 4 500 € de contrats dès son premier mois. »",
      followup_1: "Bonjour, je me permets un petit suivi suite à mon mot. Je pensais justement à votre atelier : souhaitez-vous que je vous partage les 3 points clés pour doubler vos réponses sur devis ?",
      followup_2: "Petit retour rapide sans vous déranger : si votre planning est chargé, je peux simplement vous glisser la vidéo explicative ici. Toujours intéressé ?",
      followup_final: "Dernier message de ma part pour respecter votre temps ! Si ce n'est pas votre priorité du moment, aucun souci. Au plaisir d'échanger quand le besoin se présentera !",
    },
    private_notes: "Très réceptif sur WhatsApp. Le fondateur s'appelle Marc. A confirmé qu'ils manquent de bras pour relancer.",
    closing_tips: [
      "Mentionnez l'impact sur leur chiffre d'affaires (1 devis sauvé = 1 500 € net).",
      "Proposez de commencer par tester sur les 10 derniers devis sans réponse.",
      "Mettez en avant la simplicité : aucune application lourde à installer pour leurs clients."
    ],
    is_existing: true,
    is_closed: false,
  },
  {
    id: "prospect-2",
    company_name: "Apex Conseil RH",
    activity: "Cabinet de recrutement de cadres & coaching",
    city: "Paris",
    country: "France",
    qualification_score: 88,
    qualification_reason: "Forte présence professionnelle mais prospection commerciale inexistante. Dépendants du bouche-à-oreille.",
    flaws_identified: "Aucune prospection proactive, site vitrine sans qualification de besoin, pas d'offre d'appel claire.",
    recommended_offer: "Mise en place d'une séquence de prise de contact ciblée sur LinkedIn + CRM pour générer 8 à 12 entretiens qualifiés par mois.",
    opportunity: "Approche directe axée sur la détection des postes en tension chez leurs clients cibles.",
    channel: "linkedin",
    collected_at: "2026-09-23",
    email: "direction@apex-conseil-rh.fr",
    phone: "+33 1 42 68 90 00",
    website_url: "https://apex-conseil-rh.fr",
    social_links: {
      linkedin: "https://linkedin.com/company/apex-conseil-rh",
      google: "https://google.com/search?q=Apex+Conseil+RH+Paris",
    },
    status: "non_contacte",
    estimated_deal_value: 2400,
    last_contact_date: undefined,
    generated_messages: {
      first_contact: "Bonjour ! J'ai vu vos récentes publications sur le recrutement cadre à Paris. Remarquez-vous aussi que les DRH répondent de moins en moins aux messages classiques ? Nous avons mis au point un script court qui obtient 34% de réponses. Seriez-vous curieux d'y jeter un œil ?",
      first_contact_variant_b: "Bonjour ! J'ai analysé les recrutements d'Apex Conseil RH à Paris. Saviez-vous qu'une approche conversationnelle en 3 lignes permet de tripler les retours de dirigeants par rapport aux longs messages corporate ? Seriez-vous ouvert à ce que je vous envoie l'exemple de script ?",
      value_offer: "💡 Comment utiliser ce message : À envoyer en étape 2 pour prouver la valeur de votre méthode :\n\n« Nous accompagnons les cabinets RH pour ouvrir des discussions directes avec les dirigeants d'entreprises cibles sans passer pour des démarcheurs agressifs. Cela se traduit par 8 à 12 entretiens d'affaires par mois de façon prédictible. »",
      followup_1: "Bonjour, je reviens vers vous après mon mot de mardi. Seriez-vous ouvert à ce que je vous envoie un aperçu du script en 3 lignes ?",
      followup_2: "Juste pour savoir si la prospection de nouveaux mandats est un sujet pour vous ce trimestre ou si vous êtes complets ?",
      followup_final: "Je clos le sujet pour ne pas encombrer votre messagerie. N'hésitez pas à me faire signe si le besoin se présente !",
    },
    private_notes: "Profil très sérieux. Ne pas utiliser de tutoiement.",
    closing_tips: [
      "Parlez du coût d'un mandat non signé face au coût d'un accompagnement.",
      "Présentez des exemples concrets de taux de réponse obtenus sur des profils similaires.",
      "Offrez un premier script d'accroche personnalisé dès le premier appel."
    ],
    is_existing: true,
    is_closed: false,
  },
  {
    id: "prospect-3",
    company_name: "Studio Karité Beauté",
    activity: "Distribution cosmétique bio & institut premium",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    qualification_score: 82,
    qualification_reason: "Forte communauté sociale (18k abonnés) mais perte de prospects dans les messages privés non traités.",
    flaws_identified: "Plus de 20 messages par jour non répondus à temps, perte de commandes récurrentes et pas de base client structurée.",
    recommended_offer: "Installation d'un système de qualification des demandes connecté à WhatsApp et CRM de fidélisation.",
    opportunity: "Démontrer combien de ventes directes s'évaporent chaque semaine dans les demandes non lues.",
    channel: "instagram",
    collected_at: "2026-09-24",
    email: "contact@studiokarite.ci",
    phone: "+225 07 45 89 12 00",
    website_url: "https://studiokarite.ci",
    social_links: {
      instagram: "https://instagram.com/studio_karite",
      facebook: "https://facebook.com/studiokariteci",
    },
    status: "gagne",
    estimated_deal_value: 950,
    last_contact_date: "2026-09-18",
    sent_variant: "B",
    generated_messages: {
      first_contact: "Bonjour ! Vos produits Karité sont magnifiques. En regardant vos stories, j'ai vu que beaucoup de clientes demandent les prix en commentaires sans suite. Avez-vous déjà pensé à automatiser la réponse WhatsApp pour finaliser les ventes ?",
      first_contact_variant_b: "Bonjour ! Félicitations pour la qualité de vos soins sur Abidjan. Beaucoup d'instituts perdent 30% de commandes parce que les clientes attendent trop longtemps une réponse de prix. Nous avons une formule simple pour répondre instantanément sur WhatsApp. Disponible pour voir un exemple de 1 minute ?",
      value_offer: "💡 Comment utiliser ce message : À envoyer pour montrer concrètement la solution technique sans complexité :\n\n« Notre système redirige chaque demande Instagram en discussion WhatsApp personnalisée en 5 secondes, permettant de conclure les commandes avant que la cliente n'aille voir un concurrent. »",
      followup_1: "Bonjour ! Avez-vous eu 2 minutes pour voir mon message ? Cela pourrait vous faire gagner 1h par jour sur la gestion des commandes.",
      followup_2: "Coucou ! Je voulais juste m'assurer que vous aviez reçu mon idée pour booster les commandes d'Abidjan.",
      followup_final: "Je vous laisse développer votre marque avec succès, à bientôt !",
    },
    private_notes: "Contrat signé ! Mise en place du module WhatsApp prévue vendredi.",
    closing_tips: [
      "Mettez en avant le temps gagné pour la fondatrice.",
      "Insistez sur la facilité de paiement Wave / Orange Money.",
      "Montrez l'augmentation instantanée du panier moyen."
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
