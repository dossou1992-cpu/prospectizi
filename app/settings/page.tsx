"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { 
  Settings, 
  User, 
  Mail, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  Calendar, 
  Smartphone, 
  LogOut, 
  Download,
  CheckCircle2,
  AlertTriangle,
  Video,
  FileText,
  FileSpreadsheet,
  Lock,
  MessageSquare
} from 'lucide-react';

export default function SettingsPage() {
  const { 
    user, 
    updateUserProfile, 
    userSettings, 
    updateUserSettings, 
    subscription, 
    setShowUpgradeModal, 
    isSubscriptionExpired,
    logout,
    exportProspectsCSV,
    knowledgeBase,
    updateKnowledgeBase
  } = useStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'notifications' | 'security' | 'knowledge'>('profile');

  // Local form states
  const [name, setName] = useState(user.full_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(userSettings.phone_number || "+228 90 12 34 56");

  // Notifications states
  const [notifyDays, setNotifyDays] = useState(userSettings.notify_days_before);
  const [notifyChannel, setNotifyChannel] = useState(userSettings.notify_channel);
  const [emailNotifs, setEmailNotifs] = useState(userSettings.email_notifications);
  const [whatsappNotifs, setWhatsappNotifs] = useState(userSettings.whatsapp_notifications);

  // Knowledge base states
  const [kbSystemPrompt, setKbSystemPrompt] = useState(knowledgeBase.systemPrompt);
  const [kbFaq, setKbFaq] = useState(knowledgeBase.faqSummary);
  const [kbTuto, setKbTuto] = useState(knowledgeBase.tutorialsSummary);
  const [kbPricing, setKbPricing] = useState(knowledgeBase.pricingRules);
  const [kbPayment, setKbPayment] = useState(knowledgeBase.paymentProcedures);
  const [kbApify, setKbApify] = useState(knowledgeBase.apifyTransparency);
  const [kbWhatsapp, setKbWhatsapp] = useState(knowledgeBase.whatsappContactNumber);

  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMessage, setPassMessage] = useState<string | null>(null);

  const handleSaveKnowledgeBase = (e: React.FormEvent) => {
    e.preventDefault();
    updateKnowledgeBase({
      systemPrompt: kbSystemPrompt,
      faqSummary: kbFaq,
      tutorialsSummary: kbTuto,
      pricingRules: kbPricing,
      paymentProcedures: kbPayment,
      apifyTransparency: kbApify,
      whatsappContactNumber: kbWhatsapp,
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(name, email);
    updateUserSettings({ phone_number: phone });
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserSettings({
      notify_days_before: Number(notifyDays),
      notify_channel: notifyChannel,
      email_notifications: emailNotifs,
      whatsapp_notifications: whatsappNotifs,
    });
  };

  const renewDate = subscription.current_period_end 
    ? new Date(subscription.current_period_end).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'Dans 30 jours';

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 text-cyan text-xs font-bold uppercase tracking-wider mb-2 border border-cyan/30">
            <Settings className="w-3.5 h-3.5" />
            Espace Compte &amp; Préférences
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Paramètres de votre Compte
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Gérez votre profil, vos alertes de fin d&apos;abonnement, vos préférences de relance et vos ressources créateur.
          </p>
        </div>

        <button
          onClick={logout}
          className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-dark-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-dark-600 hover:border-rose-500/40 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Déconnexion</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-700 pb-3 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-cyan text-dark-950 font-black shadow-cyan-border'
              : 'text-slate-400 hover:text-white bg-dark-900 border border-dark-700'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profil &amp; Coordonnées</span>
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'billing'
              ? 'bg-cyan text-dark-950 font-black shadow-cyan-border'
              : 'text-slate-400 hover:text-white bg-dark-900 border border-dark-700'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Abonnement &amp; Facturation</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'bg-cyan text-dark-950 font-black shadow-cyan-border'
              : 'text-slate-400 hover:text-white bg-dark-900 border border-dark-700'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Alertes Fin d&apos;Abonnement</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-cyan text-dark-950 font-black shadow-cyan-border'
              : 'text-slate-400 hover:text-white bg-dark-900 border border-dark-700'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Sécurité &amp; RGPD</span>
        </button>

        {/* Onglet Superadmin Exclusif : Édition Base Notion & Chatbot */}
        {user.email === 'dossou1992@gmail.com' && user.isSuperadminMode && (
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'knowledge'
                ? 'bg-purple-500 text-white font-black shadow-lg shadow-purple-500/30'
                : 'text-purple-400 hover:text-white bg-dark-900 border border-purple-500/40'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Base Notion &amp; Chatbot IA (Superadmin)</span>
          </button>
        )}
      </div>

      {/* TAB 1: PROFIL */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-dark-900 border border-dark-600 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="border-b border-dark-700 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-cyan" />
              <span>Informations Générales de l&apos;Utilisateur</span>
            </h2>
            <p className="text-xs text-slate-400">Ces informations apparaissent sur vos reçus et dans vos signatures de prospection.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Nom complet ou Société
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
                placeholder="Ex: Edith Dossou"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Adresse Email Principale
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
                placeholder="dossou1992@gmail.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Numéro WhatsApp (Pour alertes &amp; relances)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
                placeholder="+228 90 12 34 56"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Format international recommandé (+228, +229, +33, etc.)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Statut du Compte
              </label>
              <div className="w-full bg-dark-950 border border-dark-700 rounded-xl px-4 py-2.5 text-sm text-slate-300 flex items-center justify-between">
                <span className="font-semibold text-cyan">Compte Actif (Vérifié)</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {user.role === 'superadmin' ? 'SUPERADMIN' : user.role.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-dark-700 flex justify-end">
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl font-bold text-xs bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center gap-2 shadow-cyan-glow transition-all hover:scale-105"
            >
              <Save className="w-4 h-4 text-dark-950" />
              <span>Enregistrer les modifications</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: FACTURATION & ABONNEMENT */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-dark-900 border border-dark-600 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Plan Actuel</span>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-2xl font-black text-white">Formule {subscription.plan_type}</h2>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase border ${
                    isSubscriptionExpired 
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                      : 'bg-cyan/15 text-cyan border-cyan/40'
                  }`}>
                    {isSubscriptionExpired ? "Expiré (30 jours échus)" : subscription.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowUpgradeModal(true)}
                className="py-2.5 px-5 rounded-xl font-extrabold text-xs bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center gap-2 shadow-cyan-glow transition-all self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Changer ou Renouveler mon plan</span>
              </button>
            </div>

            {/* Quotas & Échéance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-dark-800 rounded-xl border border-dark-700">
                <span className="text-xs text-slate-400 block mb-1">Prospects mensuels alloués</span>
                <p className="text-xl font-bold text-white">{subscription.prospects_quota} prospects</p>
                <span className="text-[11px] text-slate-400">Renouvelés chaque mois</span>
              </div>

              <div className="p-4 bg-dark-800 rounded-xl border border-dark-700">
                <span className="text-xs text-slate-400 block mb-1">Date d&apos;échéance du mois</span>
                <p className="text-xl font-bold text-cyan flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{renewDate}</span>
                </p>
                <span className="text-[11px] text-slate-400">Verrouillage automatique après 30 jours</span>
              </div>

              <div className="p-4 bg-dark-800 rounded-xl border border-dark-700">
                <span className="text-xs text-slate-400 block mb-1">Moyen de paiement favori</span>
                <p className="text-sm font-bold text-slate-200 mt-1">Mobile Money / CB Stripe</p>
                <span className="text-[11px] text-emerald-400">Wave, MTN, Orange, Moov, Visa, MC</span>
              </div>
            </div>

            {/* Warning si proche de l'expiration */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-white">Politique de fin de mois (30 jours) :</p>
                <p className="text-slate-300 leading-relaxed">
                  À la fin des 30 jours, votre compte est temporairement verrouillé pour préserver vos données et vos listes de prospects intactes. Il vous suffira de valider votre réabonnement pour continuer à générer de nouveaux leads.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATIONS & ALERTES D'EXPIRATION */}
      {activeTab === 'notifications' && (
        <form onSubmit={handleSaveNotifications} className="bg-dark-900 border border-dark-600 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="border-b border-dark-700 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan" />
              <span>Paramètres des Alertes d&apos;Expiration (Fin de Période)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Configurez le préavis souhaité avant la fin des 30 jours d&apos;abonnement pour ne subir aucune interruption de prospection.
            </p>
          </div>

          <div className="space-y-6">
            {/* Délais d'alerte */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                M&apos;alerter avant l&apos;expiration de mon abonnement :
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[2, 3, 5, 7].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setNotifyDays(days)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      notifyDays === days
                        ? 'bg-cyan/15 border-cyan text-cyan shadow-cyan-border font-bold'
                        : 'bg-dark-800 border-dark-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="text-base font-black block">{days} jours</span>
                    <span className="text-[10px] text-slate-400">avant l&apos;échéance</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Canal de notification */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Canal de notification privilégié :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setNotifyChannel('email')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    notifyChannel === 'email'
                      ? 'bg-cyan/15 border-cyan text-white shadow-cyan-border font-bold'
                      : 'bg-dark-800 border-dark-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-4 h-4 text-cyan mb-1.5" />
                  <span>Email Uniquement</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNotifyChannel('whatsapp')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    notifyChannel === 'whatsapp'
                      ? 'bg-cyan/15 border-cyan text-white shadow-cyan-border font-bold'
                      : 'bg-dark-800 border-dark-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-400 mb-1.5" />
                  <span>WhatsApp Uniquement</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNotifyChannel('both')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    notifyChannel === 'both'
                      ? 'bg-cyan/15 border-cyan text-white shadow-cyan-border font-bold'
                      : 'bg-dark-800 border-dark-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan" />
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span>Les Deux (Email + WhatsApp)</span>
                </button>
              </div>
            </div>

            {/* Checkboxes de rappel quotidien */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="rounded border-dark-600 text-cyan focus:ring-cyan w-4 h-4"
                />
                <span>M&apos;envoyer un récapitulatif par email des relances prioritaires du Focus du Jour chaque matin</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={whatsappNotifs}
                  onChange={(e) => setWhatsappNotifs(e.target.checked)}
                  className="rounded border-dark-600 text-cyan focus:ring-cyan w-4 h-4"
                />
                <span>Recevoir une notification directe WhatsApp lorsqu&apos;un crédit de prospect bonus Loom est validé</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-dark-700 flex justify-end">
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl font-bold text-xs bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center gap-2 shadow-cyan-glow transition-all hover:scale-105"
            >
              <Save className="w-4 h-4 text-dark-950" />
              <span>Enregistrer mes alertes</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: SÉCURITÉ & RGPD */}
      {activeTab === 'security' && (
        <div className="bg-dark-900 border border-dark-600 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="border-b border-dark-700 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan" />
              <span>Sécurité du Compte &amp; Confidentialité RGPD</span>
            </h2>
            <p className="text-xs text-slate-400">Contrôlez l&apos;accès à votre espace et téléchargez l&apos;intégralité de vos données.</p>
          </div>

          {/* Export RGPD */}
          <div className="p-4 bg-dark-800 rounded-xl border border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold text-white">Droit à la Portabilité des Données (Art. 20 RGPD)</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Téléchargez une archive complète de l&apos;ensemble de vos fiches prospects, notes privées et statistiques de conversion.
              </p>
            </div>
            <button
              onClick={exportProspectsCSV}
              className="py-2 px-4 rounded-xl text-xs font-bold bg-dark-700 hover:bg-dark-600 text-cyan border border-cyan/30 flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger mes données (CSV)</span>
            </button>
          </div>

          {/* Session Logout */}
          <div className="p-4 bg-dark-800 rounded-xl border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold text-rose-300">Fermer la session actuelle</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Vous serez déconnecté de l&apos;espace membre et redirigé vers la page d&apos;accueil publique de Prospectizi.
              </p>
            </div>
            <button
              onClick={logout}
              className="py-2 px-4 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Me Déconnecter</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: BASE DE CONNAISSANCES & CHATBOT IA ÉDITABLE (SUPERADMIN UNIQUEMENT) */}
      {user.email === 'dossou1992@gmail.com' && user.isSuperadminMode && activeTab === 'knowledge' && (
        <form onSubmit={handleSaveKnowledgeBase} className="bg-dark-900 border-2 border-purple-500/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-dark-700 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 text-[11px] font-bold uppercase tracking-wider mb-1 border border-purple-500/30">
                <ShieldCheck className="w-3 h-3" />
                Espace Édition Superadmin
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span>Édition de la Base de Connaissances &amp; Chatbot IA</span>
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Modifiez les textes ici : le Chatbot IA se mettra à jour en direct !
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Cet espace vous permet d&apos;ajuster les consignes de l&apos;IA support, d&apos;enrichir la FAQ et de modifier votre numéro WhatsApp de relais pour les 20% de cas complexes (paiements bloqués, bugs vidéo Loom, remboursements).
          </p>

          <div className="space-y-5">
            {/* 1. Prompt Système */}
            <div>
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                <span>1. Prompt Système Officiel (Consignes d&apos;entraînement de l&apos;IA)</span>
              </label>
              <textarea
                rows={4}
                value={kbSystemPrompt}
                onChange={(e) => setKbSystemPrompt(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 focus:border-purple-400 rounded-xl p-3 text-xs text-white placeholder-slate-500 font-mono leading-relaxed focus:outline-none"
              />
            </div>

            {/* 2. FAQ & Quotas */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                2. FAQ &amp; Fonctionnement des Quotas
              </label>
              <textarea
                rows={3}
                value={kbFaq}
                onChange={(e) => setKbFaq(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 focus:border-purple-400 rounded-xl p-3 text-xs text-white focus:outline-none"
              />
            </div>

            {/* 3. Tutoriels & Avatar */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                3. Tutoriels &amp; Avatar Client
              </label>
              <textarea
                rows={2}
                value={kbTuto}
                onChange={(e) => setKbTuto(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 focus:border-purple-400 rounded-xl p-3 text-xs text-white focus:outline-none"
              />
            </div>

            {/* 4. Tarifs & Annulation */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                4. Tarification, 30 jours &amp; Politique d&apos;annulation
              </label>
              <textarea
                rows={2}
                value={kbPricing}
                onChange={(e) => setKbPricing(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 focus:border-purple-400 rounded-xl p-3 text-xs text-white focus:outline-none"
              />
            </div>

            {/* 5. Procédures de Paiement */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                5. Procédures de Paiement (Lemon Squeezy CB &amp; Flutterwave Mobile Money)
              </label>
              <textarea
                rows={2}
                value={kbPayment}
                onChange={(e) => setKbPayment(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 focus:border-purple-400 rounded-xl p-3 text-xs text-white focus:outline-none"
              />
            </div>

            {/* 6. Scraping & Apify */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                6. Explications Scraping &amp; Garantie Anti-Gaspillage
              </label>
              <textarea
                rows={2}
                value={kbApify}
                onChange={(e) => setKbApify(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 focus:border-purple-400 rounded-xl p-3 text-xs text-white focus:outline-none"
              />
            </div>

            {/* 7. Numéro WhatsApp pour les 20% de cas complexes */}
            <div>
              <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                7. Numéro WhatsApp de Relais Support (Pour les 20% de cas complexes)
              </label>
              <input
                type="text"
                placeholder="22890123456"
                value={kbWhatsapp}
                onChange={(e) => setKbWhatsapp(e.target.value)}
                className="w-full sm:w-80 bg-dark-950 border border-dark-700 focus:border-emerald-400 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                Format international sans le signe + (ex: 22890123456)
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-dark-700 flex justify-end">
            <button
              type="submit"
              className="py-3 px-6 rounded-xl font-extrabold text-xs bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer &amp; Mettre à jour le Chatbot IA</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
