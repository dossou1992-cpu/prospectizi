"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { 
  Crown, 
  Gift, 
  RotateCcw, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Video, 
  ExternalLink, 
  UserCheck, 
  Download,
  AlertTriangle,
  Play,
  FileText,
  FileSpreadsheet,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Lock,
  Smartphone
} from 'lucide-react';
import { PlanType } from '@/lib/types';

export default function AdminPage() {
  const { 
    user, 
    testimonials, 
    updateTestimonialStatus, 
    addBonusProspects, 
    resetQuota, 
    upgradePlan,
    subscription,
    isSubscriptionExpired,
    simulateMonthEndExpired,
    reactivateSubscription,
    exportProspectsCSV,
    isFeedbackCollectionActive,
    toggleFeedbackCollection
  } = useStore();

  const [searchUser, setSearchUser] = useState('');
  const [copiedTemplateKey, setCopiedTemplateKey] = useState<string | null>(null);

  const handleCopyTemplate = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplateKey(key);
    setTimeout(() => setCopiedTemplateKey(null), 2000);
  };

  // Simulated platform users list for Superadmin view
  const [platformUsers, setPlatformUsers] = useState([
    {
      id: "usr-1",
      email: "dossou1992@gmail.com",
      name: "Edith Dossou",
      plan: subscription.plan_type,
      quotaUsed: subscription.prospects_used,
      quotaTotal: subscription.prospects_quota + subscription.bonus_prospects,
      date: "2026-09-01",
      role: "Superadmin VIP"
    },
    {
      id: "usr-2",
      email: "cedric.k@startup.com",
      name: "Cédric Kouassi",
      plan: "DECOUVERTE",
      quotaUsed: 3,
      quotaTotal: 3,
      date: "2026-09-22",
      role: "Client"
    },
    {
      id: "usr-3",
      email: "sarah.m@agenceclic.fr",
      name: "Sarah Martin",
      plan: "PRO",
      quotaUsed: 42,
      quotaTotal: 93,
      date: "2026-09-18",
      role: "Client"
    },
    {
      id: "usr-4",
      email: "contact@growthcorp.com",
      name: "Moussa Diop",
      plan: "AGENCE",
      quotaUsed: 128,
      quotaTotal: 450,
      date: "2026-09-10",
      role: "Client"
    }
  ]);

  const filteredUsers = platformUsers.filter(u => 
    u.email.toLowerCase().includes(searchUser.toLowerCase()) || 
    u.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  const handleManualUpgrade = (email: string, plan: PlanType) => {
    setPlatformUsers(prev => prev.map(u => u.email === email ? { ...u, plan, quotaTotal: plan === 'AGENCE' ? 450 : 90 } : u));
    if (email === user.email) {
      upgradePlan(plan);
    }
  };

  const handleResetUserQuota = (email: string) => {
    setPlatformUsers(prev => prev.map(u => u.email === email ? { ...u, quotaUsed: 0 } : u));
    if (email === user.email) {
      resetQuota();
    }
  };

  const handleAddUserBonus = (email: string) => {
    setPlatformUsers(prev => prev.map(u => u.email === email ? { ...u, quotaTotal: u.quotaTotal + 3 } : u));
    if (email === user.email) {
      addBonusProspects(3);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-amber-500/40 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
              <Crown className="w-3.5 h-3.5" />
              Espace Réservé Superadmin (dossou1992@gmail.com)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Console d&apos;Administration Prospectizi
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl">
              Pilotage des abonnements, modération des vidéos Loom, surclassements manuels et statistiques de la plateforme.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Simulation Expiration fin de mois */}
            {isSubscriptionExpired ? (
              <button
                onClick={reactivateSubscription}
                className="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Réactiver l&apos;abonnement</span>
              </button>
            ) : (
              <button
                onClick={simulateMonthEndExpired}
                className="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 flex items-center gap-1.5 transition-all"
                title="Simule la fin du mois pour tester le blocage et la modale de renouvellement"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Simuler fin de mois (Échéance échue)</span>
              </button>
            )}

            <button
              onClick={exportProspectsCSV}
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-600 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-cyan" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1 : GESTION DES UTILISATEURS */}
      <div className="bg-dark-900 border border-dark-600 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-cyan" />
              Gestion des Comptes Utilisateurs (Plateforme Globale)
            </h2>
            <p className="text-xs text-slate-400">Surclassez des partenaires, réinitialisez des quotas ou ajoutez des bonus</p>
          </div>

          {/* User Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par email ou nom..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="bg-dark-950 border border-dark-600 focus:border-cyan text-xs text-white pl-8 pr-4 py-2 rounded-xl focus:outline-none w-64"
            />
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-dark-800/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-dark-700">
              <tr>
                <th className="p-3">Utilisateur</th>
                <th className="p-3">Formule</th>
                <th className="p-3">Quota Utilisé</th>
                <th className="p-3">Date Inscription</th>
                <th className="p-3 text-right">Actions Superadmin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/60">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-dark-800/40 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-slate-400 text-[11px]">{u.email}</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                      u.plan === 'AGENCE' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                      u.plan === 'PRO' ? 'bg-cyan/15 text-cyan border border-cyan/30' :
                      'bg-slate-700 text-slate-300'
                    }`}>
                      {u.plan}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-semibold text-slate-200">
                    {u.quotaUsed} / {u.quotaTotal}
                  </td>
                  <td className="p-3 text-slate-400">{u.date}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleAddUserBonus(u.email)}
                        className="p-1.5 rounded-lg bg-dark-800 hover:bg-cyan/20 text-cyan border border-cyan/30 transition-colors"
                        title="Ajouter +3 prospects bonus"
                      >
                        <Gift className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleManualUpgrade(u.email, u.plan === 'PRO' ? 'AGENCE' : 'PRO')}
                        className="px-2 py-1 rounded-lg bg-dark-800 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-bold transition-colors"
                        title="Surclasser manuellement ce compte"
                      >
                        {u.plan === 'PRO' ? 'Passer AGENCE' : 'Passer PRO'}
                      </button>

                      <button
                        onClick={() => handleResetUserQuota(u.email)}
                        className="p-1.5 rounded-lg bg-dark-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-dark-600 transition-colors"
                        title="Réinitialiser le compteur de consommation"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2 : GESTION DES TÉMOIGNAGES LOOM & POSTS LINKEDIN (+3 PROSPECTS) */}
      <div className="bg-dark-900 border border-dark-600 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark-700 pb-3">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-cyan" />
            <h2 className="text-base font-bold text-white">File de Modération des Avis : Vidéos Loom &amp; Posts LinkedIn</h2>
          </div>
          
          {/* Master Toggle pour la Campagne d'Avis */}
          <div className="flex items-center gap-3 bg-dark-800 border border-dark-700 px-3 py-1.5 rounded-xl">
            <span className="text-xs font-bold text-amber-300">
              ⭐ Avis Utilisateur Réel (+3)⭐ :
            </span>
            <button
              onClick={toggleFeedbackCollection}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                isFeedbackCollectionActive
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
              }`}
              title="Cliquez pour activer ou désactiver la collecte d'avis (+3 crédits) pour l'ensemble des utilisateurs"
            >
              {isFeedbackCollectionActive ? (
                <>
                  <ToggleRight className="w-4 h-4" />
                  <span>ACTIVE (Bouton visible)</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="w-4 h-4" />
                  <span>DÉSACTIVÉE (Bouton masqué)</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Après 2 semaines de lancement, vous pouvez désactiver la collecte d&apos;avis ci-dessus en 1 clic pour masquer le bouton dans l&apos;application pour tous les utilisateurs. Vous pouvez le réactiver à souhait à tout moment.
        </p>

        <div className="divide-y divide-dark-700/60">
          {testimonials.map((testi) => (
            <div key={testi.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    testi.type === 'linkedin' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : 'bg-cyan/15 text-cyan border border-cyan/30'
                  }`}>
                    {testi.type === 'linkedin' ? 'Post LinkedIn' : 'Vidéo Loom'}
                  </span>
                  <span className="font-bold text-white text-xs">{testi.user_name}</span>
                  <span className="text-slate-400 text-xs">({testi.user_email})</span>
                  {testi.rating && (
                    <span className="text-amber-400 text-xs font-bold font-mono">★ {testi.rating}/5</span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    testi.status === 'approved' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                    testi.status === 'rejected' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' :
                    'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}>
                    {testi.status === 'approved' ? 'Validé (+3 accordé)' : testi.status === 'rejected' ? 'Rejeté' : 'En attente'}
                  </span>
                </div>

                {testi.review_text && (
                  <p className="text-xs text-slate-300 italic max-w-xl">
                    &quot;{testi.review_text}&quot;
                  </p>
                )}

                <div className="flex items-center gap-3 text-xs">
                  <a
                    href={testi.loom_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>{testi.type === 'linkedin' ? 'Consulter le post LinkedIn' : 'Regarder la vidéo Loom'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-slate-400">•</span>
                  <span className="text-emerald-400 text-[11px]">
                    {testi.commercial_consent ? "✔ Accord commercial accordé" : "❌ Accord manquant"}
                  </span>
                </div>
              </div>

              {testi.status === 'pending' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateTestimonialStatus(testi.id, 'approved')}
                    className="py-1.5 px-3 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Valider &amp; Créditer (+3)</span>
                  </button>
                  <button
                    onClick={() => updateTestimonialStatus(testi.id, 'rejected')}
                    className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-dark-800 hover:bg-dark-700 text-rose-400 border border-dark-600"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Refuser</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 BIS : SCRIPTS DE RÉPONSES RAPIDES WHATSAPP (SUPPORT CLIENT 20%) */}
      <div className="bg-dark-900 border border-emerald-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="border-b border-dark-700 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Scripts de Réponses Rapides WhatsApp (Support Téléphone &amp; Cas Complexes)</h2>
          </div>
          <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Prêts à copier-coller pour vous
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Ces réponses types ont été rédigées pour <strong>VOUS</strong> (ou votre assistant WhatsApp). Lorsqu&apos;un client vous contacte par téléphone ou WhatsApp pour l&apos;un des cas ci-dessous, cliquez sur <strong>&quot;Copier le message&quot;</strong> et collez-le directement dans votre conversation WhatsApp :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Script 1: Paiement Mobile Money débité */}
          <div className="p-4 bg-dark-800 rounded-xl border border-dark-700 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                1. Paiement Mobile Money Débité
              </span>
              <p className="text-xs text-slate-200 italic bg-dark-900 p-2.5 rounded-lg border border-dark-700">
                &quot;Bonjour ! J&apos;ai bien vérifié votre transaction sur Flutterwave. Votre compte est activé en formule PRO/AGENCE avec vos crédits disponibles. Bienvenue sur Prospectizi !&quot;
              </p>
            </div>
            <button
              onClick={() => handleCopyTemplate("Bonjour ! J'ai bien vérifié votre transaction sur Flutterwave. Votre compte est activé en formule PRO/AGENCE avec vos crédits disponibles. Bienvenue sur Prospectizi !", 'msg1')}
              className="py-1.5 px-3 rounded-lg text-xs font-bold bg-dark-700 hover:bg-dark-600 text-cyan border border-cyan/30 flex items-center justify-center gap-1.5 transition-all self-end"
            >
              {copiedTemplateKey === 'msg1' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier le message</span>
                </>
              )}
            </button>
          </div>

          {/* Script 2: Bug d'extraction */}
          <div className="p-4 bg-dark-800 rounded-xl border border-dark-700 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-cyan uppercase tracking-wider">
                2. Signalement de Bug d&apos;Extraction
              </span>
              <p className="text-xs text-slate-200 italic bg-dark-900 p-2.5 rounded-lg border border-dark-700">
                &quot;Bonjour ! Pouvez-vous m&apos;envoyer un court enregistrement d&apos;écran Loom (loom.com) montrant le souci ? Notre équipe technique règle ça tout de suite.&quot;
              </p>
            </div>
            <button
              onClick={() => handleCopyTemplate("Bonjour ! Pouvez-vous m'envoyer un court enregistrement d'écran Loom (loom.com) montrant le souci ? Notre équipe technique règle ça tout de suite.", 'msg2')}
              className="py-1.5 px-3 rounded-lg text-xs font-bold bg-dark-700 hover:bg-dark-600 text-cyan border border-cyan/30 flex items-center justify-center gap-1.5 transition-all self-end"
            >
              {copiedTemplateKey === 'msg2' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier le message</span>
                </>
              )}
            </button>
          </div>

          {/* Script 3: Demande de remboursement */}
          <div className="p-4 bg-dark-800 rounded-xl border border-dark-700 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                3. Demande de Remboursement
              </span>
              <p className="text-xs text-slate-200 italic bg-dark-900 p-2.5 rounded-lg border border-dark-700">
                &quot;Bonjour ! Votre demande de remboursement de [Montant] a été effectuée sur notre processeur de paiement. Vous recevrez les fonds sous 2 à 5 jours selon votre opérateur.&quot;
              </p>
            </div>
            <button
              onClick={() => handleCopyTemplate("Bonjour ! Votre demande de remboursement a été effectuée sur notre processeur de paiement. Vous recevrez les fonds sous 2 à 5 jours selon votre opérateur.", 'msg3')}
              className="py-1.5 px-3 rounded-lg text-xs font-bold bg-dark-700 hover:bg-dark-600 text-cyan border border-cyan/30 flex items-center justify-center gap-1.5 transition-all self-end"
            >
              {copiedTemplateKey === 'msg3' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier le message</span>
                </>
              )}
            </button>
          </div>

          {/* Script 4: Activation prioritaire sous 15 minutes */}
          <div className="p-4 bg-dark-800 rounded-xl border border-dark-700 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                4. Activation Prioritaire Manuelle (&lt; 15 min)
              </span>
              <p className="text-xs text-slate-200 italic bg-dark-900 p-2.5 rounded-lg border border-dark-700">
                &quot;Bonjour ! Nous avons bien reçu votre justificatif. Votre compte a été mis à niveau en priorité. Vos nouveaux prospects sont prêts dans votre espace !&quot;
              </p>
            </div>
            <button
              onClick={() => handleCopyTemplate("Bonjour ! Nous avons bien reçu votre justificatif. Votre compte a été mis à niveau en priorité. Vos nouveaux prospects sont prêts dans votre espace !", 'msg4')}
              className="py-1.5 px-3 rounded-lg text-xs font-bold bg-dark-700 hover:bg-dark-600 text-cyan border border-cyan/30 flex items-center justify-center gap-1.5 transition-all self-end"
            >
              {copiedTemplateKey === 'msg4' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier le message</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3 : TÉLÉCHARGEMENT DES LIVRABLES & VIDÉO DÉMO (ACCÈS CRÉATEUR) */}
      {user.email === 'dossou1992@gmail.com' && user.isSuperadminMode ? (
        <div className="bg-dark-900 border-2 border-cyan/40 rounded-2xl p-6 space-y-5 shadow-cyan-glow">
          <div className="border-b border-dark-700 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan/15 text-cyan text-[11px] font-bold uppercase tracking-wider mb-1 border border-cyan/30">
                <Crown className="w-3 h-3" />
                Téléchargements Privés Superadmin (dossou1992@gmail.com)
              </div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-cyan" />
                <span>Livrables Officiels du MVP &amp; Vidéo Démo HD</span>
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Accès Propriétaire Exclusif
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Ces téléchargements sont strictement inaccessibles aux simples visiteurs, aux abonnés payants (PRO/AGENCE) et aux membres d&apos;équipe. Seul votre compte Superadmin a le privilège d&apos;accéder aux fichiers sources ci-dessous :
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Vidéo Démo */}
            <div className="p-4 bg-dark-800 rounded-xl border border-cyan/30 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white">Vidéo Démo HD (.MP4)</h3>
                <p className="text-[11px] text-slate-400">
                  Vidéo produit 30s 1080p avec musique tech ambiante.
                </p>
                <div className="text-[10px] text-cyan font-mono">1080p • 1.27 Mo</div>
              </div>
              <a
                href="/prospectizi_demo_video.mp4"
                download="PROSPECTIZI_Demo_Video_HD.mp4"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg text-xs font-bold bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-1.5 shadow-cyan-glow transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger (.MP4)</span>
              </a>
            </div>

            {/* Script Word */}
            <div className="p-4 bg-dark-800 rounded-xl border border-blue-500/30 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white">Script &amp; Storyboard (.DOCX)</h3>
                <p className="text-[11px] text-slate-400">
                  Découpage scène par scène, pitch et voix off.
                </p>
                <div className="text-[10px] text-blue-400 font-mono">DOCX • ~40 Ko</div>
              </div>
              <a
                href="/PROSPECTIZI_Script_Video_Demo_Landing_Page.docx"
                download="PROSPECTIZI_Script_Video_Demo_Landing_Page.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg text-xs font-bold bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center gap-1.5 shadow-md transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger (.DOCX)</span>
              </a>
            </div>

            {/* Présentation PPTX */}
            <div className="p-4 bg-dark-800 rounded-xl border border-amber-500/30 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white">Présentation MVP (.PPTX)</h3>
                <p className="text-[11px] text-slate-400">
                  11 slides détaillées de présentation SaaS.
                </p>
                <div className="text-[10px] text-amber-400 font-mono">PPTX • ~52 Ko</div>
              </div>
              <a
                href="/PROSPECTIZI_Presentation_MVP.pptx"
                download="PROSPECTIZI_Presentation_MVP.pptx"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-dark-950 flex items-center justify-center gap-1.5 shadow-md transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger (.PPTX)</span>
              </a>
            </div>

            {/* Cahier des Charges Word */}
            <div className="p-4 bg-dark-800 rounded-xl border border-emerald-500/30 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white">Cahier des Charges (.DOCX)</h3>
                <p className="text-[11px] text-slate-400">
                  Spécifications fonctionnelles et scoring IA.
                </p>
                <div className="text-[10px] text-emerald-400 font-mono">DOCX • ~48 Ko</div>
              </div>
              <a
                href="/PROSPECTIZI_Dossier_Cahier_des_Charges.docx"
                download="PROSPECTIZI_Dossier_Cahier_des_Charges.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-dark-950 flex items-center justify-center gap-1.5 shadow-md transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger (.DOCX)</span>
              </a>
            </div>

            {/* Base de Connaissances & Prompt Chatbot IA */}
            <div className="p-4 bg-dark-800 rounded-xl border border-purple-500/30 flex flex-col justify-between space-y-3 sm:col-span-2 lg:col-span-2">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white">Base de Connaissances Notion &amp; Prompt Chatbot (.DOCX)</h3>
                <p className="text-[11px] text-slate-400">
                  Prompt Système officiel, FAQ, Tarifs, Procédures de paiement et réponses types WhatsApp.
                </p>
                <div className="text-[10px] text-purple-400 font-mono">DOCX • ~38 Ko</div>
              </div>
              <a
                href="/PROSPECTIZI_Base_de_Connaissances_et_Prompt_Chatbot.docx"
                download="PROSPECTIZI_Base_de_Connaissances_et_Prompt_Chatbot.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-1.5 shadow-md transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger la Base &amp; Prompt (.DOCX)</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-dark-900 border border-rose-500/30 rounded-2xl p-6 text-center space-y-2">
          <Lock className="w-8 h-8 text-rose-400 mx-auto" />
          <h3 className="text-sm font-bold text-white">Accès Réservé au Propriétaire Fondateur</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Les livrables de production et la vidéo originale sont strictement réservés à l&apos;adresse superadmin principale. Les autres comptes utilisateurs et membres d&apos;équipe ne peuvent pas télécharger ces ressources.
          </p>
        </div>
      )}
    </div>
  );
}
