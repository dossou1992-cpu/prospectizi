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
    company_name: "GEA&P (Groupement d'Etudes Architectes et Partenaires)",
    activity: "Cabinet d'architecture, urbanisme & ingénierie",
    city: "Lomé",
    country: "Togo",
    qualification_score: 94,
    qualification_reason: "Forte renommée et portefeuille de chantiers prestigieux sur Lomé mais suivi commercial et relance des devis non automatisés.",
    flaws_identified: "Absence de suivi structuré des demandes entrantes sur mobile, délais de réponse longs et zéro relance automatisée après transmission de devis.",
    recommended_offer: "Tunnel de relance automatisé WhatsApp Business + Mini-CRM de suivi pour sécuriser 40% des devis d'architecture en attente.",
    opportunity: "Proposer un diagnostic gratuit de leur temps de relance et une démo vidéo de 2 minutes de relance WhatsApp adaptée à leurs chantiers.",
    channel: "google_maps",
    collected_at: "2026-10-07",
    email: "contact@gearchitectes.com",
    phone: "+228 22 20 44 44",
    website_url: "http://www.gearchitectes.com/",
    social_links: {
      google_maps: "https://www.google.com/maps/search/?api=1&query=GEA%26P+Lome&query_place_id=ChIJHeBxICDhIxARK-h6Pjm1L_Y",
    },
    status: "en_discussion",
    estimated_deal_value: 1800,
    last_contact_date: "2026-10-06",
    sent_variant: "A",
    generated_messages: {
      first_contact: "Bonjour ! En admirant les réalisations architecturales de GEA&P sur Lomé, j'ai remarqué que beaucoup de cabinets perdent 40% de leurs devis par manque de suivi automatisé. J'ai conçu un mini-système WhatsApp qui relance vos prospects sans effort. Seriez-vous ouvert à une courte vidéo de 2 min ?",
      first_contact_variant_b: "Bonjour ! En observant les projets de GEA&P sur Lomé, vos réalisations sont de grande qualité. Nous aidons les cabinets d'architecture à relancer chaque devis en 5 secondes sur WhatsApp pour signer 2 clients de plus par mois. Disponible pour un échange rapide de 2 minutes ?",
      value_offer: "💡 Message de Valeur :\n\n« Notre méthode permet de réactiver 1 devis sur 3 qui ne répondait plus, en gardant un contact humain et élégant, sans harceler vos clients. Nous avons par exemple permis à une agence de décoration de récupérer 4 500 € de contrats dès son premier mois. »",
      followup_1: "Bonjour, je me permets un petit suivi suite à mon mot. Je pensais justement à vos projets : souhaitez-vous que je vous partage les 3 points clés pour doubler vos réponses sur devis ?",
      followup_2: "Petit retour rapide sans vous déranger : si votre planning est chargé, je peux simplement vous glisser la vidéo explicative ici. Toujours intéressé ?",
      followup_final: "Dernier message de ma part pour respecter votre temps ! Si ce n'est pas votre priorité du moment, aucun souci. Au plaisir d'échanger quand le besoin se présentera !",
    },
    private_notes: "Cabinet très réputé au Togo (14 BP 151, Lomé). Approche soignée et professionnelle recommandée.",
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
    company_name: "CABINET M.A AUDIT & CONSEIL",
    activity: "Cabinet d'expertise comptable, audit & fiscalité",
    city: "Lomé",
    country: "Togo",
    qualification_score: 91,
    qualification_reason: "Présence établie à Lomé mais absence d'automatisation dans le filtrage et la qualification des nouvelles demandes d'accompagnement.",
    flaws_identified: "Gestion manuelle des consultations initiales, aucune qualification automatisée des besoins fiscaux en amont des rendez-vous.",
    recommended_offer: "Mise en place d'un chatbot de pré-qualification et d'un système de prise de rendez-vous automatique pour les consultations fiscales.",
    opportunity: "Démontrer le gain de 5 heures par semaine sur le tri des dossiers prospects entrants.",
    channel: "google_maps",
    collected_at: "2026-10-07",
    email: "contact@cabinet-maac.com",
    phone: "+228 97 72 22 51",
    website_url: "https://cabinet-maac.com/",
    social_links: {
      google_maps: "https://www.google.com/maps/search/?api=1&query=CABINET+M.A+AUDIT+%26+CONSEIL+Lom%C3%A9",
    },
    status: "non_contacte",
    estimated_deal_value: 2200,
    last_contact_date: undefined,
    generated_messages: {
      first_contact: "Bonjour ! En analysant le fonctionnement du Cabinet M.A Audit & Conseil à Lomé, vos associés perdent probablement un temps précieux à qualifier manuellement les demandes de consultation. Nous intégrons un système qui pré-qualifie les clients 24h/24. Seriez-vous ouvert à une démo de 2 min ?",
      first_contact_variant_b: "Bonjour ! Les cabinets de conseil et d'audit sur Lomé qui automatisent leur pré-qualification doublent leurs mandats rentables sans surcharger leurs équipes. Disponible pour un aperçu rapide de 2 min ?",
      value_offer: "💡 Message de Valeur :\n\n« Pré-qualifier automatiquement les demandes permet d'éliminer 80% des sollicitations non solvables avant même le premier entretien, libérant ainsi vos experts pour les missions à haute valeur ajoutée. »",
      followup_1: "Bonjour, je reviens vers vous suite à mon message. Souhaitez-vous découvrir la simulation de gain de temps réalisée pour votre cabinet ?",
      followup_2: "Juste pour savoir si l'optimisation du temps de consultation est un sujet prioritaire pour votre cabinet ce trimestre ?",
      followup_final: "Je clos le sujet pour respecter votre messagerie. Restant à votre disposition si le besoin se présente !",
    },
    private_notes: "Adresse : 01 BP 192, Lomé. Équipe très rigoureuse.",
    closing_tips: [
      "Parlez du taux horaire des experts et du temps perdu en qualification.",
      "Présentez la conformité et la discrétion de l'outil.",
      "Proposez un test sur une semaine sans engagement."
    ],
    is_existing: true,
    is_closed: false,
  },
  {
    id: "prospect-3",
    company_name: "Imprimerie La Bonne Semence",
    activity: "Imprimerie commerciale, enseignes & supports de communication",
    city: "Lomé",
    country: "Togo",
    qualification_score: 87,
    qualification_reason: "Atelier bien noté sur Google Maps à Lomé (Quartier For Ever) mais absence totale de site internet ou de canal de commande en ligne.",
    flaws_identified: "Aucun site vitrine officiel ni catalogue en ligne. Dépendance intégrale aux clients de passage et perte de toutes les demandes recherchées sur Google.",
    recommended_offer: "Création d'un site catalogue moderne optimisé pour mobile avec bouton direct WhatsApp pour recevoir les demandes de tirage en 1 clic.",
    opportunity: "Leur montrer que leurs concurrents avec un site captent 100% des entreprises qui cherchent un imprimeur sur Google à Lomé.",
    channel: "google_maps",
    collected_at: "2026-10-07",
    email: "",
    phone: "+228 70 25 36 87",
    website_url: "",
    social_links: {
      google_maps: "https://www.google.com/maps/search/?api=1&query=Imprimerie+La+Bonne+Semence+Lom%C3%A9&query_place_id=ChIJLceRp__jIxARZ68yblyvw4I",
    },
    status: "nouveau",
    estimated_deal_value: 950,
    last_contact_date: undefined,
    generated_messages: {
      first_contact: "Bonjour ! J'ai vu votre excellente réputation sur Google Maps à Lomé (For Ever). En cherchant vos services sur internet, vous n'avez aucun site vitrine pour commander directement, ce qui fait fuir des dizaines de clients vers d'autres ateliers. Seriez-vous ouvert à une démo de 2 min d'un site catalogue léger ?",
      first_contact_variant_b: "Bonjour ! 78% des entreprises à Lomé cherchent leur imprimeur sur smartphone. Votre atelier a de super avis mais pas de site pour transformer ces recherches en commandes fermes sur WhatsApp. Disponible pour voir un exemple de catalogue en 2 min ?",
      value_offer: "💡 Message de Valeur :\n\n« Un site web vitrine avec bouton WhatsApp pour un imprimeur génère en moyenne 12 à 18 devis supplémentaires par mois dès sa mise en ligne. »",
      followup_1: "Bonjour, je me permets un petit suivi suite à mon mot. J'ai préparé une maquette rapide de catalogue pour votre atelier, souhaitez-vous la voir ?",
      followup_2: "Un rapide message pour savoir si capter plus de commandes d'entreprises sur Lomé fait partie de vos objectifs ?",
      followup_final: "Dernier message pour ne pas insister inutilement. Bonne continuation à toute l'équipe de La Bonne Semence !",
    },
    private_notes: "Adresse physique vérifiée : Lomé (For Ever), Togo. Avis Google : 3.8/5.",
    closing_tips: [
      "Montrez la maquette directement sur WhatsApp depuis un smartphone.",
      "Proposez un paiement échelonné accessible pour leur structure.",
      "Insistez sur la facilité pour leurs clients d'envoyer leurs fichiers PDF directement par WhatsApp."
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
