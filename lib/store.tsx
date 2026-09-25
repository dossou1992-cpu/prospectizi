"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Prospect, 
  AvatarProfile, 
  Subscription, 
  AuditReport, 
  Testimonial, 
  TeamMember, 
  ProspectStatus, 
  Channel, 
  PlanType, 
  UserSettings 
} from './types';
import { initialAvatar, initialSubscription, initialProspects, initialTestimonials, initialTeamMembers, initialAuditReport } from './mockData';
import confetti from 'canvas-confetti';

interface StoreContextType {
  // Auth state
  isAuthenticated: boolean;
  authModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean }>;
  logout: () => void;

  user: {
    email: string;
    full_name: string;
    role: 'user' | 'superadmin';
    isSuperadminMode: boolean;
  };
  updateUserProfile: (name: string, email: string) => void;
  toggleSuperadminMode: () => void;
  setUserEmail: (email: string) => void;

  // Settings
  userSettings: UserSettings;
  updateUserSettings: (settings: Partial<UserSettings>) => void;

  // Subscription
  subscription: Subscription;
  isSubscriptionExpired: boolean;
  simulateMonthEndExpired: () => void;
  reactivateSubscription: () => void;
  upgradePlan: (plan: PlanType) => void;
  resetQuota: () => void;
  addBonusProspects: (count: number) => void;

  // Avatar
  avatar: AvatarProfile;
  updateAvatar: (avatar: Partial<AvatarProfile>) => void;

  // Prospects & CRM
  prospects: Prospect[];
  updateProspectStatus: (id: string, status: ProspectStatus) => void;
  updateProspectNotes: (id: string, notes: string) => void;
  markFollowupDone: (id: string) => void;
  recordSentVariant: (id: string, variant: 'A' | 'B') => void;
  reportFaultyContact: (id: string, reason: string) => { success: boolean; message: string };
  searchProspects: (params: { keyword: string; location: string; channel: Channel; count: number }) => Promise<{ success: boolean; added: number; error?: string }>;
  
  // Modals & UI
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
  auditReport: AuditReport;
  generateAuditReport: () => Promise<{ success: boolean; message: string }>;
  toggleABTest: (active: boolean) => void;
  applyWinningScript: () => void;
  simulateABTestThreshold: () => void;
  testimonials: Testimonial[];
  submitTestimonial: (loomUrl: string, commercialConsent: boolean) => void;
  updateTestimonialStatus: (id: string, status: 'approved' | 'rejected') => void;
  teamMembers: TeamMember[];
  inviteTeamMember: (email: string, role: 'admin' | 'editor' | 'viewer') => { success: boolean; message: string };
  revokeTeamMember: (id: string) => void;
  exportProspectsCSV: () => void;
  toastMessage: string | null;
  setToast: (msg: string | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function ProspectiziProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const [user, setUser] = useState<{
    email: string;
    full_name: string;
    role: 'user' | 'superadmin';
    isSuperadminMode: boolean;
  }>({
    email: "dossou1992@gmail.com",
    full_name: "Edith Dossou",
    role: "user",
    isSuperadminMode: false,
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    notify_days_before: 3,
    notify_channel: 'both',
    email_notifications: true,
    whatsapp_notifications: true,
    phone_number: "+228 90 12 34 56",
  });

  const [subscription, setSubscription] = useState<Subscription>({
    ...initialSubscription,
    auto_renew: true,
  });
  const [avatar, setAvatar] = useState<AvatarProfile>(initialAvatar);
  const [prospects, setProspects] = useState<Prospect[]>(initialProspects);
  const [auditReport, setAuditReport] = useState<AuditReport>({
    ...initialAuditReport,
    ab_test_active: false,
    ab_test_stats: {
      variant_a_sent: 4,
      variant_b_sent: 3,
      variant_a_replies: 1,
      variant_b_replies: 2,
    }
  });
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check if subscription has expired
  const isSubscriptionExpired = 
    subscription.status === 'expired' || 
    (subscription.plan_type !== 'DECOUVERTE' && new Date() > new Date(subscription.current_period_end));

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('prospectizi_auth');
      if (savedAuth !== null) setIsAuthenticated(JSON.parse(savedAuth));

      const savedUser = localStorage.getItem('prospectizi_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedSettings = localStorage.getItem('prospectizi_settings');
      if (savedSettings) setUserSettings(JSON.parse(savedSettings));

      const savedSub = localStorage.getItem('prospectizi_sub');
      if (savedSub) setSubscription(JSON.parse(savedSub));

      const savedAvatar = localStorage.getItem('prospectizi_avatar');
      if (savedAvatar) setAvatar(JSON.parse(savedAvatar));

      const savedProspects = localStorage.getItem('prospectizi_prospects');
      if (savedProspects) setProspects(JSON.parse(savedProspects));

      const savedAudit = localStorage.getItem('prospectizi_audit');
      if (savedAudit) setAuditReport(JSON.parse(savedAudit));

      const savedTesti = localStorage.getItem('prospectizi_testimonials');
      if (savedTesti) setTestimonials(JSON.parse(savedTesti));

      const savedTeam = localStorage.getItem('prospectizi_team');
      if (savedTeam) setTeamMembers(JSON.parse(savedTeam));
    } catch (e) {
      console.error("LocalStorage load error:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('prospectizi_auth', JSON.stringify(isAuthenticated));
      localStorage.setItem('prospectizi_user', JSON.stringify(user));
      localStorage.setItem('prospectizi_settings', JSON.stringify(userSettings));
      localStorage.setItem('prospectizi_sub', JSON.stringify(subscription));
      localStorage.setItem('prospectizi_avatar', JSON.stringify(avatar));
      localStorage.setItem('prospectizi_prospects', JSON.stringify(prospects));
      localStorage.setItem('prospectizi_audit', JSON.stringify(auditReport));
      localStorage.setItem('prospectizi_testimonials', JSON.stringify(testimonials));
      localStorage.setItem('prospectizi_team', JSON.stringify(teamMembers));
    } catch (e) {
      console.error("LocalStorage save error:", e);
    }
  }, [isAuthenticated, user, userSettings, subscription, avatar, prospects, auditReport, testimonials, teamMembers, isLoaded]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Auth Handlers
  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, message: "Adresse email invalide." };
    }
    const fullName = email.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = fullName.charAt(0).toUpperCase() + fullName.slice(1);
    
    setUser(prev => ({
      ...prev,
      email,
      full_name: formattedName || prev.full_name,
    }));
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    showNotification(`👋 Bienvenue sur Prospectizi, ${formattedName} !`);
    return { success: true };
  };

  const loginWithGoogle = async () => {
    setUser(prev => ({
      ...prev,
      email: "dossou1992@gmail.com",
      full_name: "Edith Dossou",
    }));
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    showNotification("✅ Connecté avec succès via votre compte Google !");
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    showNotification("Vous avez été déconnecté avec succès.");
  };

  const updateUserProfile = (name: string, email: string) => {
    setUser(prev => ({ ...prev, full_name: name, email }));
    showNotification("Profil utilisateur mis à jour !");
  };

  const updateUserSettings = (newSettings: Partial<UserSettings>) => {
    setUserSettings(prev => ({ ...prev, ...newSettings }));
    showNotification("Préférences et notifications sauvegardées !");
  };

  const toggleSuperadminMode = () => {
    setUser(prev => {
      const newMode = !prev.isSuperadminMode;
      const newRole = newMode ? 'superadmin' : 'user';
      showNotification(
        newMode 
          ? "👑 Mode Superadmin VIP activé (Quotas débloqués pour tests)" 
          : "👤 Mode Test Normal activé (Quotas stricts du plan Découverte)"
      );
      return {
        ...prev,
        role: newRole,
        isSuperadminMode: newMode,
      };
    });
  };

  const setUserEmail = (email: string) => {
    setUser(prev => ({ ...prev, email }));
  };

  const upgradePlan = (newPlan: PlanType) => {
    let quota = 3;
    if (newPlan === 'PRO') quota = 90;
    if (newPlan === 'AGENCE') quota = 450;

    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    setSubscription({
      plan_type: newPlan,
      status: 'active',
      prospects_quota: quota,
      prospects_used: 0,
      bonus_prospects: subscription.bonus_prospects,
      current_period_end: nextMonth,
      auto_renew: true,
    });
    setShowUpgradeModal(false);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    showNotification(`🚀 Paiement Validé ! Votre compte passe immédiatement au Plan ${newPlan} (${quota} prospects pour 30 jours)`);
  };

  const simulateMonthEndExpired = () => {
    setSubscription(prev => ({
      ...prev,
      status: 'expired',
      current_period_end: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    }));
    showNotification("⚠️ Simulation : Échéance mensuelle atteinte ! Compte bloqué en attente de renouvellement.");
  };

  const reactivateSubscription = () => {
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    setSubscription(prev => ({
      ...prev,
      status: 'active',
      current_period_end: nextMonth,
      prospects_used: 0,
    }));
    showNotification("✅ Paiement de renouvellement validé ! Votre compte est réactivé pour 30 jours.");
  };

  const resetQuota = () => {
    setSubscription(prev => ({ ...prev, prospects_used: 0 }));
    showNotification("🔄 Quota de consommation réinitialisé à 0 !");
  };

  const addBonusProspects = (count: number) => {
    setSubscription(prev => ({
      ...prev,
      bonus_prospects: prev.bonus_prospects + count,
      prospects_quota: prev.prospects_quota + count,
    }));
    showNotification(`🎁 +${count} prospects bonus ont été ajoutés à votre compte !`);
  };

  const updateAvatar = (newFields: Partial<AvatarProfile>) => {
    setAvatar(prev => {
      const updated = { ...prev, ...newFields };
      showNotification("✅ Profil Avatar Client sauvegardé et synchronisé !");
      return updated;
    });
  };

  const updateProspectStatus = (id: string, status: ProspectStatus) => {
    setProspects(prev => prev.map(p => {
      if (p.id === id) {
        if (status === 'gagne') {
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
          showNotification(`🎉 Bravo ! Le prospect "${p.company_name}" est passé en GAGNÉ !`);
        } else {
          showNotification(`Statut mis à jour : ${status.replace('_', ' ')}`);
        }
        return { ...p, status, last_contact_date: new Date().toISOString().split('T')[0] };
      }
      return p;
    }));
  };

  const updateProspectNotes = (id: string, notes: string) => {
    setProspects(prev => prev.map(p => p.id === id ? { ...p, private_notes: notes } : p));
    showNotification("Notes privées enregistrées.");
  };

  const markFollowupDone = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setProspects(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          last_contact_date: today,
          last_followup_done_date: today,
          status: p.status === 'non_contacte' || p.status === 'nouveau' ? 'en_discussion' : p.status,
        };
      }
      return p;
    }));
    showNotification("✅ Relance enregistrée ! Le prospect a été mis à jour.");
  };

  const recordSentVariant = (id: string, variant: 'A' | 'B') => {
    setProspects(prev => prev.map(p => p.id === id ? { ...p, sent_variant: variant } : p));
    setAuditReport(prev => {
      const stats = prev.ab_test_stats || { variant_a_sent: 0, variant_b_sent: 0, variant_a_replies: 0, variant_b_replies: 0 };
      const newSentA = variant === 'A' ? stats.variant_a_sent + 1 : stats.variant_a_sent;
      const newSentB = variant === 'B' ? stats.variant_b_sent + 1 : stats.variant_b_sent;
      const newRepliesA = variant === 'A' && Math.random() > 0.6 ? stats.variant_a_replies + 1 : stats.variant_a_replies;
      const newRepliesB = variant === 'B' && Math.random() > 0.45 ? stats.variant_b_replies + 1 : stats.variant_b_replies;
      return {
        ...prev,
        ab_test_stats: {
          variant_a_sent: newSentA,
          variant_b_sent: newSentB,
          variant_a_replies: newRepliesA,
          variant_b_replies: newRepliesB,
        }
      };
    });
    showNotification(`📨 Envoi enregistré avec la Variante ${variant} ! Le test A/B mesure vos retours.`);
  };

  const toggleABTest = (active: boolean) => {
    setAuditReport(prev => ({ ...prev, ab_test_active: active }));
    showNotification(
      active 
        ? "🧪 Test A/B activé ! Vos fiches prospects affichent désormais la Variante A et la Variante B." 
        : "Test A/B désactivé."
    );
  };

  const applyWinningScript = () => {
    setProspects(prev => prev.map(p => ({
      ...p,
      generated_messages: {
        ...p.generated_messages,
        first_contact: p.generated_messages.first_contact_variant_b || p.generated_messages.first_contact,
      }
    })));
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    showNotification("🏆 La Variante B a été appliquée définitivement comme script principal sur toutes vos fiches !");
  };

  const simulateABTestThreshold = () => {
    setAuditReport(prev => ({
      ...prev,
      ab_test_active: true,
      ab_test_stats: {
        variant_a_sent: 18,
        variant_b_sent: 16,
        variant_a_replies: 6,
        variant_b_replies: 8,
      }
    }));
    showNotification("⚡ Simulation : 34 envois enregistrés ! L'analyse de la variante gagnante est désormais disponible.");
  };

  const reportFaultyContact = (id: string, reason: string) => {
    setProspects(prev => prev.filter(p => p.id !== id));
    setSubscription(prev => ({
      ...prev,
      prospects_used: Math.max(0, prev.prospects_used - 1),
    }));
    showNotification("✅ Contact vérifié comme erroné. 1 crédit de prospect vous a été recrédité immédiatement !");
    return { success: true, message: "1 crédit remboursé automatiquement" };
  };

  // DYNAMIC INTELLIGENCE ENGINE FOR ALL DIGITAL TRADES:
  // Detects the user's specific digital trade (Web Developer, Community Manager, Ads Expert, Copywriter, Designer, Closer, etc.)
  // and tailors flaws, offers, and messages with precision!
  const searchProspects = async (params: { keyword: string; location: string; channel: Channel; count: number }) => {
    if (isSubscriptionExpired && !user.isSuperadminMode) {
      setShowUpgradeModal(true);
      showNotification("🔒 Votre abonnement est arrivé à échéance. Veuillez le renouveler pour prospecter.");
      return { success: false, added: 0, error: "Abonnement échu" };
    }

    const totalAllowed = subscription.prospects_quota + subscription.bonus_prospects;
    const remaining = totalAllowed - subscription.prospects_used;
    const isBypass = user.isSuperadminMode;

    if (!isBypass && remaining <= 0) {
      setShowUpgradeModal(true);
      showNotification("🔒 Quota de prospects atteint. Passez à la formule PRO ou AGENCE pour continuer.");
      return { success: false, added: 0, error: "Quota atteint" };
    }

    const toAddCount = isBypass ? params.count : Math.min(params.count, remaining);
    if (toAddCount <= 0) {
      setShowUpgradeModal(true);
      return { success: false, added: 0, error: "Quota insuffisant" };
    }

    // Trade profiling
    const profLower = (avatar.profession || "").toLowerCase();
    const isAI = profLower.includes('ia') || profLower.includes('ai') || profLower.includes('artificielle') || profLower.includes('data') || profLower.includes('machine learning') || profLower.includes('prompt') || profLower.includes('automat') || profLower.includes('engineer');
    const isWebDev = profLower.includes('web') || profLower.includes('site') || profLower.includes('développeur') || profLower.includes('saas');
    const isCM = profLower.includes('community') || profLower.includes('social') || profLower.includes('réseaux') || profLower.includes('instagram');
    const isAds = profLower.includes('ads') || profLower.includes('pub') || profLower.includes('media') || profLower.includes('acquisition');
    const isCopywriter = profLower.includes('copy') || profLower.includes('rédact') || profLower.includes('seo') || profLower.includes('contenu');
    const isDesigner = profLower.includes('design') || profLower.includes('graphi') || profLower.includes('logo') || profLower.includes('brand');

    const sampleCompanies = [
      { name: "Cabinet Alpha Consulting", act: "Conseil Juridique & Fiscal", city: "Lomé" },
      { name: "Clinique Santé Plus", act: "Santé & Médecine Spécialisée", city: "Abidjan" },
      { name: "Hôtel Résidence Palace", act: "Hôtellerie & Restauration", city: "Dakar" },
      { name: "Immo Horizon Prestige", act: "Agence Immobilière & Gestion", city: "Cotonou" },
      { name: "Cabinet Dentaire Moderne", act: "Santé Dentaire & Soins", city: "Paris" },
      { name: "BTP Structure & Bâtiment", act: "Architecture & Rénovation", city: "Lomé" },
    ];

    const newItems: Prospect[] = [];
    for (let i = 0; i < toAddCount; i++) {
      const comp = sampleCompanies[i % sampleCompanies.length];
      const score = Math.floor(Math.random() * (98 - 70 + 1)) + 70;
      const id = "search-" + Date.now() + "-" + i;
      const targetLoc = params.location || comp.city;
      const targetAct = params.keyword ? `${params.keyword} (${comp.act})` : comp.act;

      // Dynamic Flaw & Offer based on user's digital profession
      let flaws = "";
      let offer = "";
      let firstContactA = "";
      let firstContactB = "";
      let valueOffer = "";

      if (isAI) {
        flaws = "Processus clients et qualification 100% manuels, aucune automatisation IA pour traiter les demandes entrantes 24/7 et données internes non exploitées.";
        offer = avatar.offer || "Mise en place d'agents d'IA intelligents, de chatbots de qualification automatique et de pipelines d'automatisation de tâches répétitives.";
        firstContactA = `Bonjour ! En analysant le fonctionnement de ${comp.name} sur ${targetLoc}, vos équipes perdent probablement plusieurs heures par jour sur des tâches manuelles répétitives. Nous intégrons des agents IA qui automatisent le tri et la qualification 24h/24. Seriez-vous ouvert à une démo de 2 min ?`;
        firstContactB = `Bonjour ! Les structures de votre secteur sur ${targetLoc} qui intègrent l'IA qualifient 3x plus de prospects sans recruter. J'ai modélisé un cas d'usage IA sur-mesure pour ${comp.name}. Disponible pour un rapide aperçu de 2 min ?`;
        valueOffer = `💡 Message de Valeur (IA Engineering & Automatisation) :\n\n« Déployer un agent d'IA conversationnelle permet de qualifier 100% des leads entrants en moins de 60 secondes, même le week-end. Une entreprise équivalente a réduit ses coûts de traitement de 45% tout en signant 4 nouveaux contrats dès le premier mois. »`;
      } else if (isWebDev) {
        flaws = "Site web obsolète, non adapté au mobile (temps de chargement > 4.2s) et absence de module de réservation/devis instantané.";
        offer = avatar.offer || "Création d'un site web ultra-rapide, responsive et optimisé SEO pour doubler les prises de contact directes.";
        firstContactA = `Bonjour ! J'ai regardé le site de ${comp.name} sur ${targetLoc}. Sur smartphone, la page met plus de 4s à s'afficher, ce qui fait perdre 1 visiteur sur 2. J'ai une solution légère pour corriger ça. Seriez-vous ouvert à une démo de 2 min ?`;
        firstContactB = `Bonjour ! En analysant la présence de ${comp.name} sur ${targetLoc}, j'ai remarqué que vous perdiez des clients faute d'un formulaire de contact réactif sur mobile. Nous aidons les entreprises de votre secteur à générer 2x plus de devis avec un site moderne. Disponible pour en parler 2 min ?`;
        valueOffer = `💡 Message de Valeur (Web Développeur) :\n\n« 53% des visiteurs quittent un site qui met plus de 3 secondes à charger. Pour un établissement équivalent sur ${targetLoc}, optimiser la vitesse et ajouter un bouton WhatsApp direct a débloqué 14 nouveaux rendez-vous dès le premier mois. »`;
      } else if (isCM) {
        flaws = "Comptes Instagram & Facebook inactifs depuis plus de 60 jours, aucun format court (Reels/TikTok) et zéro engagement communautaire.";
        offer = avatar.offer || "Animation complète des réseaux sociaux, création de 12 vidéos courtes par mois et stratégie d'engagement local.";
        firstContactA = `Bonjour ! J'ai vu l'activité de ${comp.name} sur ${targetLoc}. Vos réalisations sont superbes mais vos réseaux sont silencieux depuis 2 mois. J'ai un plan de 3 vidéos courtes qui réactive votre audience sans effort. Seriez-vous ouvert à un aperçu de 2 min ?`;
        firstContactB = `Bonjour ! En observant ${comp.name} sur ${targetLoc}, vos clients adoreraient voir vos coulisses en vidéo courte. Nous aidons les entreprises locales à capter 10 000 vues qualifiées par mois sur Instagram et TikTok. Disponible pour voir nos exemples ?`;
        valueOffer = `💡 Message de Valeur (Community Manager) :\n\n« Les formats courts (Reels & TikTok) génèrent 4x plus de visibilité organique que les posts classiques. Nous avons permis à une structure locale de générer 25 demandes entrantes en 30 jours grâce à 3 vidéos ciblées. »`;
      } else if (isAds) {
        flaws = "Dépendance totale au bouche-à-oreille, absence de pixel publicitaire et zéro campagne d'acquisition automatique active.";
        offer = avatar.offer || "Mise en place de campagnes publicitaires Google Ads & Meta ultra-ciblées avec retour sur investissement garanti.";
        firstContactA = `Bonjour ! Quand on cherche vos prestations sur ${targetLoc}, vos concurrents achètent les premiers résultats sur Google. Nous mettons en place des campagnes qui vous positionnent en n°1 dès demain. Seriez-vous ouvert à un rapide échange ?`;
        firstContactB = `Bonjour ! En analysant le marché de ${comp.name} sur ${targetLoc}, vous avez un potentiel inexploité en publicité ciblée. Nous aidons les structures comme la vôtre à acquérir des prospects qualifiés pour moins de 5 € par lead. Curieux de voir nos chiffres ?`;
        valueOffer = `💡 Message de Valeur (Media Buyer / Ads) :\n\n« Les entreprises qui captent les intentions de recherche chaudes sur Google génèrent 3x plus de contrats que celles qui attendent passivement. Voici un aperçu des mots-clés les plus rentables dans votre ville. »`;
      } else if (isDesigner) {
        flaws = "Identité visuelle vieillissante, logo basse résolution et absence de cohérence entre le site et les supports commerciaux.";
        offer = avatar.offer || "Refonte de votre identité de marque (Branding haut de gamme, charte graphique moderne et supports de vente percutants).";
        firstContactA = `Bonjour ! Vos services chez ${comp.name} à ${targetLoc} sont reconnus, mais vos supports visuels ne reflètent pas votre vrai niveau d'excellence. J'ai conçu une maquette moderne adaptée à votre image. Puis-je vous la montrer en 2 min ?`;
        firstContactB = `Bonjour ! Une identité visuelle soignée permet d'augmenter ses tarifs de 30% perçus comme haut de gamme. Nous avons modernisé la marque d'un cabinet équivalent sur ${targetLoc} avec un grand succès. Seriez-vous curieux de voir le résultat ?`;
        valueOffer = `💡 Message de Valeur (Designer / Graphiste) :\n\n« 75% des clients jugent la crédibilité d'une entreprise sur la qualité visuelle de ses supports. Moderniser votre charte graphique renforce immédiatement la confiance avant même le premier contact. »`;
      } else if (isCopywriter) {
        flaws = "Textes de présentation génériques, aucun bénéfice chiffré et absence de mots-clés stratégiques pour le référencement naturel.";
        offer = avatar.offer || "Rédaction persuasive de pages de vente et articles de blog SEO pour transformer les lecteurs en clients.";
        firstContactA = `Bonjour ! J'ai lu la présentation de ${comp.name} sur ${targetLoc}. Vos offres sont excellentes mais vos textes ne valorisent pas assez vos résultats. J'ai réécrit une accroche percutante pour vous. Seriez-vous ouvert à la lire ?`;
        firstContactB = `Bonjour ! En lisant les supports de ${comp.name}, quelques ajustements de copywriting pourraient doubler vos prises de contact. Nous aidons les professionnels à faire passer leurs lecteurs à l'action sans survendre. Disponible pour un mot de 2 min ?`;
        valueOffer = `💡 Message de Valeur (Copywriter) :\n\n« Un appel à l'action clair et des arguments orientés bénéfices client augmentent le taux de conversion de 40%. Voici 3 phrases types adaptées à vos offres pour déclencher plus de demandes. »`;
      } else {
        // Fallback dynamically personalized to ANY custom profession entered by user (e.g. IA Engineering, etc.)
        flaws = `Absence de modernisation stratégique en ${avatar.profession || "services spécialisés"} et pertes d'opportunités de croissance face aux concurrents de ${targetLoc}.`;
        offer = avatar.offer || `Prestations expertes en ${avatar.profession} pour ${avatar.major_benefit || "booster votre acquisition et vos performances"}.`;
        firstContactA = `Bonjour ! En suivant les activités de ${comp.name} sur ${targetLoc}, j'ai remarqué un potentiel direct sur votre activité. En tant que spécialiste en ${avatar.profession || "digital"}, j'aide les entreprises à ${avatar.major_benefit || "accélérer leurs résultats"}. Seriez-vous ouvert à un rapide échange de 2 min ?`;
        firstContactB = `Bonjour ! Nous accompagnons les structures comme ${comp.name} à ${targetLoc} pour ${avatar.major_benefit || "résoudre leurs blocages et atteindre leurs objectifs"}. Seriez-vous curieux de découvrir notre méthode ?`;
        valueOffer = `💡 Message de Valeur (${avatar.profession || "Expert Métier"}) :\n\n« Notre approche personnalisée en ${avatar.profession} garantit : ${avatar.major_benefit || "une progression rapide et mesurable"}. C'est précisément ce que nous mettons en place pour les acteurs de votre secteur. »`;
      }

      newItems.push({
        id,
        company_name: `${comp.name} ${i > 5 ? i : ''}`,
        activity: targetAct,
        city: targetLoc,
        country: "Afrique / Europe",
        qualification_score: score,
        qualification_reason: `Recherche ciblée sur "${params.keyword || comp.act}". Faille détectée en adéquation parfaite avec votre métier de ${avatar.profession || "spécialiste"}.`,
        flaws_identified: flaws,
        recommended_offer: offer,
        opportunity: `Proposer un diagnostic gratuit de leurs failles actuelles et une solution adaptée à leurs besoins sur ${targetLoc}.`,
        channel: params.channel,
        collected_at: new Date().toISOString().split('T')[0],
        email: `contact@${comp.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        phone: `+228 9${Math.floor(1000000 + Math.random() * 8999999)}`,
        website_url: `https://www.${comp.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        social_links: {
          linkedin: `https://linkedin.com/company/${comp.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          google_maps: `https://maps.google.com/?q=${encodeURIComponent(comp.name)}`,
        },
        status: "nouveau",
        estimated_deal_value: 1500,
        generated_messages: {
          first_contact: firstContactA,
          first_contact_variant_b: firstContactB,
          value_offer: valueOffer,
          followup_1: `Bonjour, je me permets un petit suivi suite à mon mot. Seriez-vous intéressé par un aperçu direct de notre méthode ?`,
          followup_2: `Bonjour, je voulais juste vérifier si ce sujet d'optimisation est une priorité pour ${comp.name} ce trimestre ?`,
          followup_final: `Dernier message de ma part pour respecter votre temps ! N'hésitez pas si l'opportunité se présente plus tard.`,
        },
        private_notes: "",
        closing_tips: [
          "Mettez en avant le temps gagné et le retour sur investissement concret.",
          "Citez l'exemple de structures équivalentes qui ont résolu cette faille.",
          "Proposez un test léger sans engagement pour instaurer la confiance."
        ],
        is_existing: true,
        is_closed: false,
      });
    }

    setProspects(prev => [...newItems, ...prev]);
    if (!isBypass) {
      setSubscription(prev => ({
        ...prev,
        prospects_used: prev.prospects_used + toAddCount,
      }));
    }

    showNotification(`🎯 ${toAddCount} nouveaux prospects qualifiés et adaptés à votre métier ajoutés !`);
    return { success: true, added: toAddCount };
  };

  const generateAuditReport = async () => {
    const isSuperadmin = user.isSuperadminMode;
    const now = new Date();
    const nextAvail = new Date(auditReport.next_audit_available_at);
    
    if (!isSuperadmin && now < nextAvail) {
      showNotification("🔒 Audit verrouillé : disponible une fois tous les 30 jours.");
      return { success: false, message: "Verrouillé 30 jours" };
    }

    const newReport: AuditReport = {
      generated_at: now.toISOString(),
      next_audit_available_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      stats: {
        total_contacted: prospects.filter(p => p.status !== 'nouveau').length + 18,
        response_rate: 36.8,
        closing_rate: 21.4,
      },
      main_bottleneck: "60% des prospects en discussion stagnent au moment de fixer la date d'échange.",
      key_findings: [
        "Les accroches directes mentionnant la ville ont un taux de réponse supérieur de 24%.",
        "L'utilisation du bouton One-Click WhatsApp a réduit le temps de prise de contact de 8 minutes à 15 secondes par prospect.",
        "Le canal Google Maps génère les leads avec la meilleure réactivité aux relances douces."
      ],
      recommended_script: {
        first_contact_optimized: "Bonjour ! J'ai vu l'activité de [Entreprise] à [Ville]. Beaucoup perdent 1 client sur 3 faute de relance après devis. J'ai un système qui résout exactement cela. Seriez-vous ouvert à une démo de 2 min ?",
        followup_optimized: "Bonjour, je vous laisse juste ce mot rapide ! Avez-vous eu 2 minutes pour voir ma précédente note ? Je peux vous envoyer le lien directement."
      },
      avatar_suggestions: "Augmentez légèrement votre promesse chiffrée dans l'Avatar pour attirer des profils avec des budgets supérieurs à 2 000 €.",
      ab_test_active: true,
      ab_test_stats: auditReport.ab_test_stats,
    };
    setAuditReport(newReport);
    showNotification("📊 Votre nouvel Audit Mensuel IA a été généré avec succès !");
    return { success: true, message: "Audit généré" };
  };

  const submitTestimonial = (loomUrl: string, commercialConsent: boolean) => {
    const newTesti: Testimonial = {
      id: "testi-" + Date.now(),
      user_email: user.email,
      user_name: user.full_name,
      loom_url: loomUrl,
      commercial_consent: commercialConsent,
      status: "pending",
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setTestimonials(prev => [newTesti, ...prev]);
    showNotification("🎥 Vidéo Loom envoyée avec succès ! Le Superadmin la validera pour créditer vos +3 prospects bonus.");
  };

  const updateTestimonialStatus = (id: string, status: 'approved' | 'rejected') => {
    setTestimonials(prev => prev.map(t => {
      if (t.id === id) {
        if (status === 'approved') {
          addBonusProspects(3);
          showNotification("👑 Vidéo approuvée ! +3 prospects bonus crédités.");
        } else {
          showNotification("Vidéo rejetée.");
        }
        return { ...t, status };
      }
      return t;
    }));
  };

  const inviteTeamMember = (email: string, role: 'admin' | 'editor' | 'viewer') => {
    if (teamMembers.length >= 4) {
      return { success: false, message: "Limite de 4 sous-comptes atteinte pour ce compte Agence." };
    }
    const newMember: TeamMember = {
      id: "team-" + Date.now(),
      email,
      role,
      status: "invited",
      created_at: new Date().toISOString().split('T')[0],
    };
    setTeamMembers(prev => [...prev, newMember]);
    showNotification(`👥 Invitation envoyée à ${email} !`);
    return { success: true, message: "Membre invité avec succès." };
  };

  const revokeTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
    showNotification("Accès sous-compte révoqué.");
  };

  const exportProspectsCSV = () => {
    if (subscription.plan_type === 'DECOUVERTE' && !user.isSuperadminMode) {
      setShowUpgradeModal(true);
      return;
    }

    const headers = ["Entreprise", "Activité", "Ville", "Pays", "Score", "Email", "Téléphone", "Statut", "Offre Recommandée", "Accroche IA", "Relance IA"];
    const rows = prospects.map(p => [
      `"${p.company_name.replace(/"/g, '""')}"`,
      `"${p.activity.replace(/"/g, '""')}"`,
      `"${p.city}"`,
      `"${p.country}"`,
      p.qualification_score,
      `"${p.email}"`,
      `"${p.phone}"`,
      `"${p.status}"`,
      `"${p.recommended_offer.replace(/"/g, '""')}"`,
      `"${p.generated_messages.first_contact.replace(/"/g, '""')}"`,
      `"${p.generated_messages.followup_1.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `prospectizi_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("📥 Fichier CSV téléchargé avec succès !");
  };

  return (
    <StoreContext.Provider value={{
      isAuthenticated,
      authModalOpen,
      authModalMode,
      openAuthModal,
      closeAuthModal,
      loginWithEmail,
      loginWithGoogle,
      logout,
      user,
      updateUserProfile,
      toggleSuperadminMode,
      setUserEmail,
      userSettings,
      updateUserSettings,
      subscription,
      isSubscriptionExpired,
      simulateMonthEndExpired,
      reactivateSubscription,
      upgradePlan,
      resetQuota,
      addBonusProspects,
      avatar,
      updateAvatar,
      prospects,
      updateProspectStatus,
      updateProspectNotes,
      markFollowupDone,
      recordSentVariant,
      reportFaultyContact,
      searchProspects,
      showUpgradeModal,
      setShowUpgradeModal,
      auditReport,
      generateAuditReport,
      toggleABTest,
      applyWinningScript,
      simulateABTestThreshold,
      testimonials,
      submitTestimonial,
      updateTestimonialStatus,
      teamMembers,
      inviteTeamMember,
      revokeTeamMember,
      exportProspectsCSV,
      toastMessage,
      setToast: setToastMessage,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a ProspectiziProvider");
  }
  return context;
}
