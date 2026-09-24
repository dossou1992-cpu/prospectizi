"use client";

import React from 'react';
import { useStore } from '@/lib/store';
import { Zap, Crown, User, Plus, Sparkles, Video } from 'lucide-react';
import Link from 'next/link';

interface TopbarProps {
  onOpenLoomModal: () => void;
}

export default function Topbar({ onOpenLoomModal }: TopbarProps) {
  const { user, subscription, toggleSuperadminMode, setShowUpgradeModal } = useStore();

  const isBypass = user.isSuperadminMode || user.email === 'dossou1992@gmail.com';
  const totalAllowed = subscription.prospects_quota + subscription.bonus_prospects;
  const remaining = Math.max(0, totalAllowed - subscription.prospects_used);
  const percentage = Math.min(100, Math.round((subscription.prospects_used / totalAllowed) * 100));

  return (
    <header className="h-20 bg-dark-900/90 backdrop-blur-md border-b border-dark-600/60 sticky top-0 z-20 flex items-center justify-between px-8">
      {/* Salutation */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-white">
            Bonjour <span className="text-cyan">{user.full_name}</span> 👋
          </h1>
          {user.isSuperadminMode && (
            <span className="text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Crown className="w-3 h-3" />
              SUPERADMIN VIP
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400">Voici vos priorités et vos prospects chauds du jour.</p>
      </div>

      {/* Quota & Quick Actions */}
      <div className="flex items-center gap-4">
        {/* Loom Bonus Trigger */}
        <button
          onClick={onOpenLoomModal}
          className="hidden md:flex items-center gap-2 text-xs font-semibold py-1.5 px-3 rounded-lg bg-cyan/10 hover:bg-cyan/20 text-cyan border border-cyan/30 transition-all shadow-cyan-border"
        >
          <Video className="w-3.5 h-3.5" />
          <span>+3 Prospects Bonus (Loom)</span>
        </button>

        {/* Quota Status Box */}
        <div 
          onClick={() => { if (!isBypass) setShowUpgradeModal(true); }}
          className="bg-dark-800 border border-dark-600 hover:border-cyan/40 px-3.5 py-1.5 rounded-xl flex items-center gap-3 cursor-pointer transition-colors"
          title="Cliquez pour voir les offres et recharger"
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-3 text-[11px]">
              <span className="text-slate-400 font-medium">Plan {subscription.plan_type} :</span>
              <span className="text-cyan font-bold font-mono">
                {isBypass ? "ILLIMITÉ (Bypass)" : `${subscription.prospects_used} / ${totalAllowed} utilisés`}
              </span>
            </div>
            {!isBypass && (
              <div className="w-36 h-1.5 bg-dark-600 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    percentage >= 100 ? "bg-rose-500 shadow-md shadow-rose-500/50" : "bg-gradient-to-r from-cyan-intense to-cyan shadow-cyan-border"
                  }`} 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan/15 text-cyan px-2 py-1 rounded-md border border-cyan/30">
            {isBypass ? "VIP" : `${remaining} restants`}
          </span>
        </div>

        {/* Superadmin Mode Switcher Pill */}
        <button
          onClick={toggleSuperadminMode}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all border ${
            user.isSuperadminMode
              ? "bg-dark-800 text-amber-400 border-amber-500/40 hover:bg-dark-700 shadow-sm"
              : "bg-dark-800 text-slate-400 border-dark-600 hover:text-white"
          }`}
          title="Basculez entre le mode Superadmin (sans limites de quota) et le mode Découverte (test utilisateur standard)"
        >
          {user.isSuperadminMode ? (
            <>
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Bypass Quota : ON</span>
            </>
          ) : (
            <>
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Test Utilisateur</span>
            </>
          )}
        </button>

        {/* Primary Action Button */}
        <Link
          href="/prospects"
          className="flex items-center gap-2 bg-cyan hover:bg-cyan-intense text-dark-950 font-bold px-4 py-2 rounded-xl text-xs shadow-cyan-glow transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Nouvelle Recherche</span>
        </Link>
      </div>
    </header>
  );
}
