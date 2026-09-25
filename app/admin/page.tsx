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
  Play
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
    exportProspectsCSV 
  } = useStore();

  const [searchUser, setSearchUser] = useState('');

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

      {/* SECTION 2 : GESTION DES TÉMOIGNAGES LOOM (+3 PROSPECTS) */}
      <div className="bg-dark-900 border border-dark-600 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-dark-700 pb-3">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-cyan" />
            <h2 className="text-base font-bold text-white">File de Modération des Vidéos Loom</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {testimonials.filter(t => t.status === 'pending').length} vidéo(s) en attente
          </span>
        </div>

        <div className="divide-y divide-dark-700/60">
          {testimonials.map((testi) => (
            <div key={testi.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs">{testi.user_name}</span>
                  <span className="text-slate-400 text-xs">({testi.user_email})</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    testi.status === 'approved' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                    testi.status === 'rejected' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' :
                    'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}>
                    {testi.status === 'approved' ? 'Validé (+3 accordé)' : testi.status === 'rejected' ? 'Rejeté' : 'En attente'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <a
                    href={testi.loom_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Regarder la vidéo Loom</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-slate-400">•</span>
                  <span className="text-emerald-400 text-[11px]">
                    {testi.commercial_consent ? "✔ Accord commercial signé" : "❌ Accord manquant"}
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
    </div>
  );
}
