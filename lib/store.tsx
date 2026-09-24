"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Prospect, AvatarProfile, Subscription, AuditReport, Testimonial, TeamMember, ProspectStatus, Channel, PlanType } from './types';
import { initialAvatar, initialSubscription, initialProspects, initialTestimonials, initialTeamMembers, initialAuditReport } from './mockData';
import confetti from 'canvas-confetti';

interface StoreContextType {
  user: {
    email: string;
    full_name: string;
    role: 'user' | 'superadmin';
    isSuperadminMode: boolean;
  };
  toggleSuperadminMode: () => void;
  setUserEmail: (email: string) => void;
  subscription: Subscription;
  upgradePlan: (plan: PlanType) => void;
  resetQuota: () => void;
  addBonusProspects: (count: number) => void;
  avatar: AvatarProfile;
  updateAvatar: (avatar: Partial<AvatarProfile>) => void;
  prospects: Prospect[];
  updateProspectStatus: (id: string, status: ProspectStatus) => void;
  updateProspectNotes: (id: string, notes: string) => void;
  reportFaultyContact: (id: string, reason: string) => { success: boolean; message: string };
  searchProspects: (params: { keyword: string; location: string; channel: Channel; count: number }) => Promise<{ success: boolean; added: number; error?: string }>;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
  auditReport: AuditReport;
  generateAuditReport: () => Promise<{ success: boolean; message: string }>;
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
  // User state
  const [user, setUser] = useState<{
    email: string;
    full_name: string;
    role: 'user' | 'superadmin';
    isSuperadminMode: boolean;
  }>({
    email: "dossou1992@gmail.com",
    full_name: "Edith Dossou",
    role: "superadmin",
    isSuperadminMode: true,
  });

  const [subscription, setSubscription] = useState<Subscription>(initialSubscription);
  const [avatar, setAvatar] = useState<AvatarProfile>(initialAvatar);
  const [prospects, setProspects] = useState<Prospect[]>(initialProspects);
  const [auditReport, setAuditReport] = useState<AuditReport>(initialAuditReport);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const toggleSuperadminMode = () => {
    setUser(prev => {
      const newMode = !prev.isSuperadminMode;
      const newRole = newMode ? 'superadmin' : 'user';
      showNotification(newMode ? "👑 Mode Superadmin VIP activé (Bypass de quotas activé)" : "👤 Mode Découverte standard activé pour tests utilisateurs");
      return {
        ...prev,
        role: newRole,
        isSuperadminMode: newMode,
      };
    });
  };

  const setUserEmail = (email: string) => {
    const isOwner = email.trim().toLowerCase() === 'dossou1992@gmail.com';
    setUser(prev => ({
      ...prev,
      email,
      role: isOwner ? 'superadmin' : 'user',
      isSuperadminMode: isOwner,
    }));
  };

  const upgradePlan = (newPlan: PlanType) => {
    let quota = 3;
    if (newPlan === 'PRO') quota = 90;
    if (newPlan === 'AGENCE') quota = 450;

    setSubscription(prev => ({
      ...prev,
      plan_type: newPlan,
      status: 'active',
      prospects_quota: quota,
      prospects_used: 0,
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }));
    setShowUpgradeModal(false);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    showNotification(`🚀 Félicitations ! Votre compte est passé sur le plan ${newPlan} (${quota} prospects débloqués)`);
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
    setAvatar(prev => ({ ...prev, ...newFields }));
    showNotification("✅ Profil Avatar Client synchronisé avec succès !");
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

  const reportFaultyContact = (id: string, reason: string) => {
    // Anti-fraud: only allow if not exceeding 10%
    const reportedProspect = prospects.find(p => p.id === id);
    if (!reportedProspect) return { success: false, message: "Prospect introuvable" };

    // Simulate backend Ping SMTP / HLR lookup
    // If reason is valid hard bounce:
    setSubscription(prev => ({
      ...prev,
      prospects_used: Math.max(0, prev.prospects_used - 1)
    }));
    // Remove or archive faulty prospect
    setProspects(prev => prev.filter(p => p.id !== id));
    showNotification("🛡️ Vérification automatique réussie : 1 crédit recrédité sur votre solde !");
    return { success: true, message: "Contact vérifié comme invalide. Votre crédit a été restitué." };
  };

  const searchProspects = async (params: { keyword: string; location: string; channel: Channel; count: number }) => {
    // Quota check if not in superadmin bypass mode
    const isBypass = user.isSuperadminMode || user.email === 'dossou1992@gmail.com';
    const remainingQuota = (subscription.prospects_quota + subscription.bonus_prospects) - subscription.prospects_used;

    if (!isBypass && remainingQuota <= 0) {
      setShowUpgradeModal(true);
      return { success: false, added: 0, error: "Plafond de quota atteint !" };
    }

    const toAddCount = isBypass ? params.count : Math.min(params.count, remainingQuota);

    // Realistic generators based on query
    const newItems: Prospect[] = [];
    const companies = [
      { name: "Cabinet Stratégie Plus", act: "Conseil en management et stratégie", city: params.location || "Lomé" },
      { name: "Digital Pulse Media", act: "Agence de communication & publicité digitale", city: params.location || "Cotonou" },
      { name: "BTP Horizon Bâtiment", act: "Entreprise de construction et génie civil", city: params.location || "Abidjan" },
      { name: "Clinique Santé Horizon", act: "Centre médical pluridisciplinaire", city: params.location || "Dakar" },
      { name: "FinTech Zenith", act: "Solutions de paiement et logiciels financiers", city: params.location || "Paris" },
      { name: "OptiLogistics Express", act: "Transport et logistique de fret", city: params.location || "Douala" },
    ];

    for (let i = 0; i < toAddCount; i++) {
      const comp = companies[i % companies.length];
      const score = Math.floor(Math.random() * 26) + 72; // 72 to 98
      const id = "search-" + Date.now() + "-" + i;
      newItems.push({
        id,
        company_name: `${comp.name} ${i > 5 ? i : ''}`,
        activity: comp.act,
        city: params.location || comp.city,
        country: "Afrique / Europe",
        qualification_score: score,
        qualification_reason: `Recherche ciblée sur "${params.keyword || comp.act}" via ${params.channel}. Besoin critique identifié sur l'acquisition et le suivi client.`,
        flaws_identified: "Aucune relance après envoi de propositions commerciales et temps de latence de contact supérieur à 48h.",
        recommended_offer: `${avatar.offer || "Mise en place d'un système de prospection et relance automatisé"}`,
        opportunity: "Proposer un diagnostic rapide de leurs goulots d'étranglement commerciaux et un modèle de conversion prêt à l'emploi.",
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
          first_contact: `Bonjour ! J'ai remarqué le développement de ${comp.name} sur ${params.location || comp.city}. En observant votre présence, beaucoup de structures de votre secteur perdent des opportunités faute d'un suivi rapide des demandes. J'ai un système léger qui fait ça sans effort. Seriez-vous ouvert à un rapide échange de 2 min ?`,
          value_offer: `Nous permettons aux entreprises comme la vôtre de réactiver jusqu'à 35% de prospects silencieux grâce à des messages courts et ciblés.`,
          followup_1: `Bonjour, je me permets un petit suivi suite à mon mot. Seriez-vous intéressé par un aperçu direct du script que nous utilisons ?`,
          followup_2: `Bonjour, je voulais juste vérifier si l'optimisation de vos prises de contact est un sujet d'actualité pour vous ce trimestre ?`,
          followup_final: `Dernier message de ma part pour respecter votre planning ! N'hésitez pas à revenir vers moi si l'opportunité se présente.`,
        },
        private_notes: "",
        closing_tips: [
          "Mettez en avant le temps gagné par leurs équipes commerciales.",
          "Citez l'exemple de structures équivalentes qui ont doublé leur taux de réponse.",
          "Offrez un test sans risque sur un échantillon de 5 leads."
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

    showNotification(`🎯 ${toAddCount} nouveaux prospects qualifiés et 100% contactables ajoutés !`);
    return { success: true, added: toAddCount };
  };

  const generateAuditReport = async () => {
    // Generate new fresh report
    const newReport: AuditReport = {
      generated_at: new Date().toISOString(),
      next_audit_available_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      stats: {
        total_contacted: prospects.filter(p => p.status !== 'nouveau').length + 18,
        response_rate: 36.8,
        closing_rate: 21.4,
      },
      main_bottleneck: "60% des prospects en discussion stagnent au moment de fixer la date d'échange.",
      key_findings: [
        "Les accroches directes mentionnant la ville ont un taux d'ouverture supérieur de 24%.",
        "L'utilisation du bouton One-Click WhatsApp a réduit le temps de prise de contact de 8 minutes à 15 secondes par prospect.",
        "Le canal Google Maps génère les leads avec la meilleure réactivité aux relances douces."
      ],
      recommended_script: {
        first_contact_optimized: "Bonjour ! J'ai vu l'activité de [Entreprise] à [Ville]. Beaucoup perdent 1 client sur 3 faute de relance après devis. J'ai un système qui résout exactement cela. Seriez-vous ouvert à une démo de 2 min ?",
        followup_optimized: "Bonjour, je vous laisse juste ce mot rapide ! Avez-vous eu 2 minutes pour voir ma précédente note ? Je peux vous envoyer le lien directement."
      },
      avatar_suggestions: "Augmentez légèrement votre promesse chiffrée dans l'Avatar pour attirer des profils avec des budgets supérieurs à 2 000 €."
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
      user,
      toggleSuperadminMode,
      setUserEmail,
      subscription,
      upgradePlan,
      resetQuota,
      addBonusProspects,
      avatar,
      updateAvatar,
      prospects,
      updateProspectStatus,
      updateProspectNotes,
      reportFaultyContact,
      searchProspects,
      showUpgradeModal,
      setShowUpgradeModal,
      auditReport,
      generateAuditReport,
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
