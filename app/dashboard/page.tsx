"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { 
  Trophy, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Copy, 
  Send, 
  X, 
  Flame, 
  CheckCircle2, 
  Award,
  Zap,
  PlayCircle,
  CalendarCheck
} from 'lucide-react';
import { Prospect } from '@/lib/types';
import VideoTutorialModal from '@/components/VideoTutorialModal';

export default function DashboardPage() {
  const { prospects, avatar, markFollowupDone } = useStore();
  const [selectedFocusProspect, setSelectedFocusProspect] = useState<Prospect | null>(null);
  const [copied, setCopied] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // KPIs Calculations
  const gagneProspects = prospects.filter(p => p.status === 'gagne');
  const enDiscussion = prospects.filter(p => p.status === 'en_discussion');
  const totalContacted = prospects.filter(p => p.status !== 'nouveau').length;
  
  const totalWonRevenue = gagneProspects.reduce((acc, curr) => acc + (curr.estimated_deal_value || 1200), 0);
  const conversionRate = totalContacted > 0 ? Math.round((gagneProspects.length / totalContacted) * 100) : 0;

  const todayStr = new Date().toISOString().split('T')[0];

  // Focus du Jour : prospects à relancer ou contacter aujourd'hui qui n'ont pas encore été relancés aujourd'hui
  const focusList = prospects.filter(p => {
    // Si déjà relancé aujourd'hui, on ne l'affiche plus dans les relances urgentes d'aujourd'hui
    if (p.last_followup_done_date === todayStr) return false;
    return p.status === 'en_discussion' || (p.status === 'non_contacte' && p.qualification_score >= 80);
  }).slice(0, 5);

  // Top Prospects Chauds : score >= 80
  const topHotProspects = prospects.filter(p => p.qualification_score >= 80).slice(0, 4);

  const handleCopyFocusMsg = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-cyan/30 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 text-cyan text-xs font-bold uppercase tracking-wider mb-2 border border-cyan/30">
              <Sparkles className="w-3.5 h-3.5" />
              Trouver &amp; contactez mieux
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Prêt(e) à signer vos prochains contrats ?
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl">
              Votre avatar est calibré sur <strong className="text-white">&quot;{avatar.profession}&quot;</strong> avec un ton <strong className="text-cyan">{avatar.tone}</strong>. Voici vos priorités du jour.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Direct Video Tutorial trigger */}
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="bg-cyan/15 hover:bg-cyan/25 text-cyan border border-cyan/40 font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-cyan-border"
            >
              <PlayCircle className="w-4 h-4 text-cyan" />
              <span>Vidéo Tuto (2m30)</span>
            </button>

            <Link
              href="/prospects"
              className="bg-cyan hover:bg-cyan-intense text-dark-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-cyan-glow flex items-center gap-2 transition-all hover:scale-105"
            >
              <Zap className="w-4 h-4 fill-dark-950" />
              <span>Rechercher des Prospects</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 KPIs Clés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 : Prospects Gagnés */}
        <div className="bg-dark-800/80 border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/60 transition-all shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prospects Gagnés</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{gagneProspects.length}</div>
          <div className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <span>Valeur estimée :</span>
            <span className="font-bold font-mono">+{totalWonRevenue.toLocaleString('fr-FR')} €</span>
          </div>
        </div>

        {/* KPI 2 : En Discussion */}
        <div className="bg-dark-800/80 border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden group hover:border-amber-500/60 transition-all shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">En Discussion</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{enDiscussion.length}</div>
          <div className="text-xs text-amber-400 font-semibold mt-1">
            {enDiscussion.length > 0 ? "Conversations actives en cours" : "Lancez de nouveaux contacts"}
          </div>
        </div>

        {/* KPI 3 : Relances à faire */}
        <div className="bg-dark-800/80 border border-cyan/30 rounded-2xl p-5 relative overflow-hidden group hover:border-cyan/60 transition-all shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Relances du Jour</span>
            <div className="w-9 h-9 rounded-xl bg-cyan/15 text-cyan flex items-center justify-center shadow-cyan-border">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{focusList.length}</div>
          <div className="text-xs text-cyan font-semibold mt-1">
            Règle {avatar.followup_frequency} active
          </div>
        </div>

        {/* KPI 4 : Taux de Conversion */}
        <div className="bg-dark-800/80 border border-purple-500/30 rounded-2xl p-5 relative overflow-hidden group hover:border-purple-500/60 transition-all shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Taux de Closing</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{conversionRate} %</div>
          <div className="text-xs text-purple-300 font-semibold mt-1">
            Moyenne du secteur : 12-15%
          </div>
        </div>
      </div>

      {/* 2 Colonnes : Focus du Jour (Gauche) & Top Prospects Chauds (Droite) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BLOC FOCUS DU JOUR (7/12) */}
        <div className="lg:col-span-7 bg-dark-900 border border-cyan/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-dark-700/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan/15 text-cyan flex items-center justify-center">
                <Flame className="w-4 h-4 text-cyan" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Focus du Jour (Fil d&apos;Action)</h3>
                <p className="text-[11px] text-slate-400">Prospects prioritaires à relancer ou contacter aujourd&apos;hui</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase bg-dark-800 text-cyan px-2.5 py-1 rounded-md border border-cyan/30">
              {focusList.length} action(s) restante(s)
            </span>
          </div>

          <div className="space-y-3">
            {focusList.length === 0 ? (
              <div className="p-6 text-center bg-dark-800/60 rounded-xl border border-dark-700 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-white">Toutes vos relances du jour sont terminées !</p>
                <p className="text-[11px] text-slate-400">Bravo pour votre régularité. Lancez une nouvelle recherche pour ajouter de nouveaux prospects.</p>
              </div>
            ) : (
              focusList.map((prospect) => (
                <div 
                  key={prospect.id}
                  className="p-4 bg-dark-800/90 border border-dark-600/80 hover:border-cyan/40 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{prospect.company_name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/30">
                        Score : {prospect.qualification_score}/100
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {prospect.activity} • {prospect.city} ({prospect.channel})
                    </p>
                    <p className="text-[11px] text-rose-400/90 italic">
                      Faille : {prospect.flaws_identified.substring(0, 65)}...
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Bouton pour marquer la relance comme faite */}
                    <button
                      onClick={() => markFollowupDone(prospect.id)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all flex items-center gap-1"
                      title="Marquer comme relancé aujourd'hui"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>Relancé</span>
                    </button>

                    <button
                      onClick={() => setSelectedFocusProspect(prospect)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-dark-700 hover:bg-cyan hover:text-dark-950 text-cyan border border-cyan/30 transition-all flex items-center gap-1.5"
                    >
                      <span>Voir message</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/${(prospect.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(prospect.generated_messages.first_contact)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 transition-all"
                      title="Ouvrir WhatsApp direct"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* BLOC TOP PROSPECTS CHAUDS & GAMIFICATION (5/12) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Top Prospects Chauds (Score >= 80) */}
          <div className="bg-dark-900 border border-dark-600 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-dark-700/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Top Prospects Chauds (≥ 80/100)</h3>
                  <p className="text-[11px] text-slate-400">Leads à plus forte probabilité de closing</p>
                </div>
              </div>
              <Link href="/prospects" className="text-xs text-cyan hover:underline">
                Voir tout →
              </Link>
            </div>

            <div className="space-y-2.5">
              {topHotProspects.map((hp) => (
                <div key={hp.id} className="p-3 bg-dark-800/80 rounded-xl border border-dark-700 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{hp.company_name}</div>
                    <div className="text-[11px] text-slate-400">{hp.city} • {hp.channel}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-cyan font-mono bg-cyan/10 border border-cyan/30 px-2 py-0.5 rounded-md">
                      {hp.qualification_score} pts
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 capitalize">{hp.status.replace('_', ' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gamification & Badges de Progression */}
          <div className="bg-dark-900 border border-dark-600 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-cyan" />
              Vos Badges de Succès Commercial
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-dark-800 border border-cyan/40 text-cyan">
                <CheckCircle2 className="w-4 h-4 mx-auto mb-1 text-cyan" />
                <div className="text-[10px] font-bold">1er Contact</div>
                <div className="text-[9px] text-slate-400">Validé</div>
              </div>
              <div className="p-2.5 rounded-xl bg-dark-800 border border-emerald-500/40 text-emerald-400">
                <Trophy className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                <div className="text-[10px] font-bold">1er Client Gagné</div>
                <div className="text-[9px] text-slate-400">Validé</div>
              </div>
              <div className="p-2.5 rounded-xl bg-dark-800 border border-dark-600 text-slate-400">
                <Flame className="w-4 h-4 mx-auto mb-1 text-slate-500" />
                <div className="text-[10px] font-bold">10 Relances</div>
                <div className="text-[9px] text-slate-500">En cours (6/10)</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modale d'Action Rapide "Voir le Message du Jour" */}
      {selectedFocusProspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-dark-900 border border-cyan/40 rounded-2xl max-w-lg w-full p-6 relative shadow-cyan-glow">
            <button
              onClick={() => setSelectedFocusProspect(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-dark-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase text-cyan tracking-wider">Relance Prioritaire du Jour</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{selectedFocusProspect.company_name}</h3>
            <p className="text-xs text-slate-400 mb-4">{selectedFocusProspect.activity} • {selectedFocusProspect.city}</p>

            <div className="bg-dark-950 p-4 rounded-xl border border-dark-700 text-xs text-slate-200 italic mb-4 leading-relaxed">
              &quot;{selectedFocusProspect.generated_messages.followup_1}&quot;
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  markFollowupDone(selectedFocusProspect.id);
                  setSelectedFocusProspect(null);
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-sm transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Marquer comme relancé aujourd&apos;hui</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyFocusMsg(selectedFocusProspect.generated_messages.followup_1)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center gap-1.5 shadow-cyan-border transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copié !" : "Copier"}</span>
                </button>

                <a
                  href={`https://wa.me/${(selectedFocusProspect.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(selectedFocusProspect.generated_messages.followup_1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Tutorial Modal */}
      <VideoTutorialModal 
        isOpen={isTutorialOpen} 
        onClose={() => setIsTutorialOpen(false)} 
      />
    </div>
  );
}
