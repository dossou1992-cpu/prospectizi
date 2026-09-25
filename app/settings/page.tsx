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
  AlertTriangle
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

  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'notifications' | 'security'>('profile');

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
            Gérez votre profil, vos alertes de fin d&apos;abonnement, vos préférences de relance et votre facturation.
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
      </div>

      {/* TAB 1: PROFIL */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-dark-900 border border-dark-600 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-dark-700 pb-3">
            <User className="w-4 h-4 text-cyan" />
            <span>Informations Personnelles &amp; Contact Direct</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Nom complet :
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Adresse Email Principale :
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Numéro WhatsApp / Téléphone de contact :
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+228 90 12 34 56"
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
              <span className="text-[11px] text-slate-400">Utilisé pour vous envoyer les alertes de fin d&apos;abonnement par WhatsApp si activé.</span>
            </div>
          </div>

          <div className="pt-3 border-t border-dark-700 flex justify-end">
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

      {/* TAB 2: ABONNEMENT & FACTURATION */}
      {activeTab === 'billing' && (
        <div className="bg-dark-900 border border-dark-600 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cyan" />
                <span>Statut de votre Abonnement</span>
              </h2>
              <p className="text-xs text-slate-400">Consultez l&apos;état de votre formule et vos échéances de paiement</p>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              isSubscriptionExpired 
                ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' 
                : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            }`}>
              {isSubscriptionExpired ? "⚠️ Abonnement Échu" : "✔ Abonnement Actif"}
            </span>
          </div>

          {/* Current plan box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Formule en cours</span>
              <div className="text-xl font-black text-cyan font-mono">Plan {subscription.plan_type}</div>
              <span className="text-[11px] text-slate-300">
                {subscription.plan_type === 'DECOUVERTE' ? "3 prospects (pack test)" : subscription.plan_type === 'PRO' ? "90 prospects / mois" : "450 prospects / mois"}
              </span>
            </div>

            <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date d&apos;échéance / Renouvellement</span>
              <div className="text-sm font-black text-white font-mono flex items-center gap-1.5 mt-1">
                <Calendar className="w-4 h-4 text-cyan" />
                <span>{renewDate}</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Renouvellement automatique mensuel</span>
            </div>

            <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Consommation actuelle</span>
              <div className="text-xl font-black text-white font-mono">
                {subscription.prospects_used} / {subscription.prospects_quota + subscription.bonus_prospects}
              </div>
              <span className="text-[11px] text-emerald-400">Recrédit automatique à chaque renouvellement</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="p-4 bg-dark-800/80 rounded-xl border border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              Vous souhaitez augmenter votre volume de prospects ou modifier votre moyen de paiement ?
            </div>

            <button
              onClick={() => setShowUpgradeModal(true)}
              className="py-2.5 px-5 rounded-xl font-bold text-xs bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center gap-2 shadow-cyan-glow transition-all hover:scale-105 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-dark-950" />
              <span>{isSubscriptionExpired ? "Renouveler mon abonnement" : "Changer d'offre / Recharger"}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATIONS & ALERTES DE FIN D'ABONNEMENT */}
      {activeTab === 'notifications' && (
        <form onSubmit={handleSaveNotifications} className="bg-dark-900 border border-dark-600 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="border-b border-dark-700 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan" />
              <span>Système d&apos;Alertes Préventives de Fin d&apos;Abonnement</span>
            </h2>
            <p className="text-xs text-slate-400">Ne perdez jamais l&apos;accès à vos prospects grâce à des rappels automatiques avant échéance.</p>
          </div>

          <div className="space-y-4">
            {/* Délais d'alerte */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Quand souhaitez-vous recevoir une alerte avant la fin de votre période de 30 jours ?
              </label>
              <select
                value={notifyDays}
                onChange={(e) => setNotifyDays(Number(e.target.value))}
                className="w-full md:w-80 bg-dark-950 border border-dark-600 focus:border-cyan text-xs text-white p-2.5 rounded-xl focus:outline-none"
              >
                <option value={5}>5 jours avant l&apos;échéance (Recommandé)</option>
                <option value={3}>3 jours avant l&apos;échéance</option>
                <option value={2}>2 jours avant l&apos;échéance</option>
                <option value={1}>24 heures avant l&apos;échéance</option>
              </select>
            </div>

            {/* Canal d'alerte */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Canal d&apos;envoi des alertes :
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
    </div>
  );
}
