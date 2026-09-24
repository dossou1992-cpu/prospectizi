"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { 
  Users2, 
  UserPlus, 
  Trash2, 
  Shield, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  X,
  Mail,
  Crown
} from 'lucide-react';
import Link from 'next/link';

export default function TeamPage() {
  const { teamMembers, inviteTeamMember, revokeTeamMember, subscription, user } = useStore();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'editor' | 'viewer'>('editor');
  const [errorMsg, setErrorMsg] = useState('');

  const isAgency = subscription.plan_type === 'AGENCE' || user.isSuperadminMode;

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !inviteEmail.includes('@')) {
      setErrorMsg("Veuillez saisir une adresse email valide.");
      return;
    }
    const res = inviteTeamMember(inviteEmail.trim(), inviteRole);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setIsInviteOpen(false);
      setInviteEmail('');
      setErrorMsg('');
    }
  };

  if (!isAgency) {
    return (
      <div className="bg-dark-900 border border-dark-600 rounded-2xl p-10 text-center max-w-xl mx-auto space-y-5 animate-fadeIn">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
          <Users2 className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Module Équipe Réservé au Plan AGENCE</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Déléguez la prospection à vos assistants virtuels (VAs) ou collaborateurs sans partager vos mots de passe personnels.
            Jusqu&apos;à 5 sous-comptes puisant dans le pool global de 450 prospects / mois.
          </p>
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl font-bold text-xs bg-cyan hover:bg-cyan-intense text-dark-950 shadow-cyan-glow transition-all"
        >
          <span>Découvrir le Plan AGENCE (59 €)</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 text-cyan text-xs font-bold uppercase tracking-wider mb-2 border border-cyan/30">
            <Users2 className="w-3.5 h-3.5" />
            Gestion des Sous-Comptes & VAs (Offre Agence)
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Mon Équipe de Prospection
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Gérez vos collaborateurs et assistants virtuels. Chaque membre dispose de son accès sécurisé propre.
          </p>
        </div>

        <button
          onClick={() => setIsInviteOpen(true)}
          disabled={teamMembers.length >= 4}
          className="py-2.5 px-4 rounded-xl font-bold text-xs bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-2 shadow-cyan-glow transition-all disabled:opacity-50"
        >
          <UserPlus className="w-4 h-4 text-dark-950" />
          <span>+ Inviter un Membre ({teamMembers.length + 1}/5)</span>
        </button>
      </div>

      {/* Quota Sharing Info Banner */}
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan/15 text-cyan flex items-center justify-center font-bold">
            ⚡
          </div>
          <span className="text-slate-300">
            Pool de prospects partagé de l&apos;Agence : <strong className="text-cyan">450 prospects / mois</strong>.
            Tous les membres puisent directement dans ce quota commun.
          </span>
        </div>
        <span className="text-slate-400 font-mono">
          {4 - teamMembers.length} invitation(s) restante(s)
        </span>
      </div>

      {/* Team Members Table */}
      <div className="bg-dark-900 border border-dark-600 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-dark-700 font-bold text-xs text-slate-300 uppercase tracking-wider">
          Membres Actifs & Collaborateurs Rattachés
        </div>

        <div className="divide-y divide-dark-700/60 text-xs">
          {/* Owner Row */}
          <div className="p-4 flex items-center justify-between bg-dark-800/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cyan/20 border border-cyan/40 text-cyan flex items-center justify-center font-bold">
                ED
              </div>
              <div>
                <div className="font-bold text-white flex items-center gap-2">
                  <span>{user.full_name}</span>
                  <span className="text-[10px] bg-cyan/15 text-cyan px-2 py-0.5 rounded-full font-bold">
                    Propriétaire Compte
                  </span>
                </div>
                <div className="text-slate-400 text-[11px]">{user.email}</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Accès Maître
              </span>
            </div>
          </div>

          {/* Sub-account rows */}
          {teamMembers.map((member) => (
            <div key={member.id} className="p-4 flex items-center justify-between hover:bg-dark-800/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-dark-700 border border-dark-600 text-slate-300 flex items-center justify-center font-bold">
                  {member.email.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-white">{member.email}</div>
                  <div className="text-slate-400 text-[11px]">
                    Rôle : <span className="capitalize text-slate-300">{member.role}</span> • Ajouté le {member.created_at}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  member.status === 'active' 
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                }`}>
                  {member.status === 'active' ? 'Actif' : 'Invitation en attente'}
                </span>

                <button
                  onClick={() => revokeTeamMember(member.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Révoquer l'accès du sous-compte"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-dark-900 border border-cyan/40 rounded-2xl max-w-md w-full p-6 relative shadow-cyan-glow">
            <button
              onClick={() => setIsInviteOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-dark-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan/15 border border-cyan/40 text-cyan flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Inviter un Collaborateur ou VA</h3>
                <p className="text-xs text-slate-400">Générez un accès sécurisé sous votre compte Agence</p>
              </div>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Adresse Email du membre :
                </label>
                <input
                  type="email"
                  required
                  placeholder="assistant@votreagence.com"
                  value={inviteEmail}
                  onChange={(e) => { setInviteEmail(e.target.value); setErrorMsg(''); }}
                  className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Niveau de permissions (Rôle) :
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="editor">Éditeur (Recherche, messages, statut CRM)</option>
                  <option value="viewer">Lecteur (Consultation des fiches uniquement)</option>
                  <option value="admin">Administrateur Équipe</option>
                </select>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl text-xs font-semibold bg-dark-800 text-slate-300 hover:bg-dark-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl text-xs font-bold bg-cyan hover:bg-cyan-intense text-dark-950 shadow-cyan-glow transition-all"
                >
                  Envoyer l&apos;Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
