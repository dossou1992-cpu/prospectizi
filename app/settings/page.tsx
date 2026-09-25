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
  Lock
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
    exportProspectsCSV
  } = useStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'notifications' | 'security' | 'resources'>('profile');

  // Local form states
  const [name, setName] = useState(user.full_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(userSettings.phone_number || "+228 90 12 34 56");

  // Notifications states
  const [notifyDays, setNotifyDays] = useState(userSettings.notify_days_before);
  const [notifyChannel, setNotifyChannel] = useState(userSettings.notify_channel);
  const [emailNotifs, setEmailNotifs] = useState(userSettings.email_notifications);
  const [whatsappNotifs, setWhatsappNotifs] = useState(userSettings.whatsapp_notifications);

  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMessage, setPassMessage] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ full_name: name, email });
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

        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'resources'
              ? 'bg-cyan text-dark-950 font-black shadow-cyan-border'
              : 'text-cyan hover:text-white bg-dark-900 border border-cyan/40'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Ressources Créateur (VIP)</span>
        </button>
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
                  <h2 className="text-2xl font-black text-white">{subscription.plan_name}</h2>
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
                <p className="text-xl font-bold text-white">{subscription.prospects_limit} prospects</p>
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

      {/* TAB 5: RESSOURCES CRÉATEUR & TÉLÉCHARGEMENTS PRIVÉS */}
      {activeTab === 'resources' && (
        <div className="bg-dark-900 border-2 border-cyan/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-cyan-glow">
          <div className="border-b border-dark-700 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan/15 text-cyan text-[11px] font-bold uppercase tracking-wider mb-1 border border-cyan/30">
                <Lock className="w-3 h-3" />
                Accès Privé Créateur / Équipe
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-cyan" />
                <span>Ressources Médias &amp; Documents Officiels</span>
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Réservé à l&apos;administrateur et aux utilisateurs connectés
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Conformément à vos consignes de sécurité, la vidéo démo et le script ne sont pas téléchargeables par les simples visiteurs sur la page d&apos;accueil publique. Vous pouvez les télécharger directement ici en haute définition :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vidéo Démo */}
            <div className="p-5 bg-dark-800 rounded-xl border border-cyan/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-white">Vidéo Démo Produit (HD 1080p)</h3>
                <p className="text-xs text-slate-400">
                  Fichier vidéo MP4 (30 secondes) présentant les 6 écrans clés du SaaS avec musique tech ambiante.
                </p>
                <div className="text-[11px] text-cyan font-mono">Format: .MP4 • Taille: ~1.27 Mo</div>
              </div>

              <a
                href="/prospectizi_demo_video.mp4"
                download="PROSPECTIZI_Demo_Video_HD.mp4"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-2 shadow-cyan-glow transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger la Vidéo (.MP4)</span>
              </a>
            </div>

            {/* Script & Storyboard DOCX */}
            <div className="p-5 bg-dark-800 rounded-xl border border-cyan/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-white">Script &amp; Storyboard Landing Page</h3>
                <p className="text-xs text-slate-400">
                  Document Word officiel détaillant le pitch, le timing scène par scène et le texte des sous-titres.
                </p>
                <div className="text-[11px] text-blue-400 font-mono">Format: .DOCX • Taille: ~40 Ko</div>
              </div>

              <a
                href="/PROSPECTIZI_Script_Video_Demo_Landing_Page.docx"
                download="PROSPECTIZI_Script_Video_Demo_Landing_Page.docx"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Script (.DOCX)</span>
              </a>
            </div>

            {/* Présentation Pitch PPTX */}
            <div className="p-5 bg-dark-800 rounded-xl border border-amber-500/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-white">Présentation Stratégique MVP</h3>
                <p className="text-xs text-slate-400">
                  Support de présentation PowerPoint (11 slides complètes) de la vision B2B et de la monétisation.
                </p>
                <div className="text-[11px] text-amber-400 font-mono">Format: .PPTX • Taille: ~52 Ko</div>
              </div>

              <a
                href="/PROSPECTIZI_Presentation_MVP.pptx"
                download="PROSPECTIZI_Presentation_MVP.pptx"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-dark-950 flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger la Présentation (.PPTX)</span>
              </a>
            </div>

            {/* Dossier Cahier des Charges DOCX */}
            <div className="p-5 bg-dark-800 rounded-xl border border-emerald-500/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-white">Dossier Cahier des Charges MVP</h3>
                <p className="text-xs text-slate-400">
                  Document Word complet de synthèse technique, scoring IA et modèles de données du SaaS.
                </p>
                <div className="text-[11px] text-emerald-400 font-mono">Format: .DOCX • Taille: ~40 Ko</div>
              </div>

              <a
                href="/PROSPECTIZI_Dossier_Cahier_des_Charges.docx"
                download="PROSPECTIZI_Dossier_Cahier_des_Charges.docx"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-dark-950 flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Cahier des Charges (.DOCX)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
