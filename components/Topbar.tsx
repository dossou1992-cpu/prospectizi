"use client";

import React from 'react';
import { useStore } from '@/lib/store';
import { Crown, User, Plus, Video, Gift, Menu, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface TopbarProps {
  onOpenLoomModal: () => void;
  onOpenTutorialModal?: () => void;
  onToggleMobileMenu?: () => void;
}

export default function Topbar({ onOpenLoomModal, onOpenTutorialModal, onToggleMobileMenu }: TopbarProps) {
  const { user, subscription, toggleSuperadminMode, setShowUpgradeModal, isSubscriptionExpired } = useStore();

  const isBypass = user.isSuperadminMode;
  const totalAllowed = subscription.prospects_quota + subscription.bonus_prospects;
  const remaining = Math.max(0, totalAllowed - subscription.prospects_used);
  const percentage = Math.min(100, Math.round((subscription.prospects_used / totalAllowed) * 100));

  const renewDate = subscription.current_period_end 
    ? new Date(subscription.current_period_end).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
    : '';

  return (
    <header className="h-16 bg-dark-900/90 backdrop-blur-md border-b border-dark-600/60 sticky top-0 z-20 flex items-center justify-between px-3 md:px-6">
      {/* Mobile Hamburger & User Greeting */}
      <div className="flex items-center gap-2.5 truncate mr-2">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 rounded-lg bg-dark-800 text-slate-300 hover:text-white"
            title="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-1.5 flex-wrap">
          <h1 className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
            Bonjour <span className="text-cyan">{user.full_name.split(' ')[0]}</span> 👋
          </h1>
          {isBypass ? (
            <span className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0">
              <Crown className="w-2.5 h-2.5" />
              SUPERADMIN VIP
            </span>
          ) : isSubscriptionExpired ? (
            <span className="text-[9px] bg-rose-500/15 text-rose-400 border border-rose-500/30 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0">
              <AlertCircle className="w-2.5 h-2.5" />
              ABONNEMENT ÉCHU
            </span>
          ) : (
            <span className="text-[9px] bg-cyan/15 text-cyan border border-cyan/30 px-1.5 py-0.5 rounded-full font-bold shrink-0">
              PLAN {subscription.plan_type}
            </span>
          )}

          {/* Subscription Renewal Date Indicator */}
          {subscription.plan_type !== 'DECOUVERTE' && !isBypass && (
            <span className="text-[10px] text-slate-400 hidden xl:flex items-center gap-1 font-mono">
              <Calendar className="w-3 h-3 text-cyan" />
              Renouvellement le {renewDate}
            </span>
          )}
        </div>

        {/* Loom Video Tutorial Button in Topbar */}
        {onOpenTutorialModal && (
          <button
            onClick={onOpenTutorialModal}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan/15 hover:bg-cyan/25 text-cyan border border-cyan/40 text-[11px] font-bold shadow-cyan-border transition-all"
            title="Comment enregistrer un avis Loom pour débloquer +3 prospects offerts"
          >
            <Gift className="w-3.5 h-3.5 text-cyan animate-pulse" />
            <span>Guide Loom (+3 leads)</span>
          </button>
        )}
      </div>

      {/* Quota & Quick Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Loom Bonus Trigger */}
        <button
          onClick={onOpenLoomModal}
          className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold py-1 px-2.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 text-cyan border border-cyan/30 transition-all shadow-cyan-border"
          title="Soumettre votre lien vidéo Loom"
        >
          <Video className="w-3 h-3" />
          <span>+3 Bonus Loom</span>
        </button>

        {/* Quota Status Box */}
        <div 
          onClick={() => { if (!isBypass) setShowUpgradeModal(true); }}
          className={`bg-dark-800 border px-2.5 py-1 rounded-xl flex items-center gap-2 cursor-pointer transition-colors ${
            isSubscriptionExpired ? 'border-rose-500/50 bg-rose-950/20' : 'border-dark-600 hover:border-cyan/40'
          }`}
          title={isBypass ? "Mode Superadmin : Quotas illimités" : "Cliquez pour voir les offres et recharger"}
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-1.5 text-[10px]">
              <span className="text-slate-400 font-medium hidden sm:inline">
                {isBypass ? "Quota VIP :" : `Plan ${subscription.plan_type} :`}
              </span>
              <span className={`font-bold font-mono ${isSubscriptionExpired ? 'text-rose-400' : 'text-cyan'}`}>
                {isBypass ? "ILLIMITÉ (VIP)" : isSubscriptionExpired ? "ÉCHU (Renouveler)" : `${subscription.prospects_used} / ${totalAllowed}`}
              </span>
            </div>
            {!isBypass && (
              <div className="w-16 sm:w-24 h-1 bg-dark-600 rounded-full mt-1 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    percentage >= 100 || isSubscriptionExpired ? "bg-rose-500" : "bg-gradient-to-r from-cyan-intense to-cyan"
                  }`} 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            )}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider bg-cyan/15 text-cyan px-1.5 py-0.5 rounded border border-cyan/30 hidden md:inline">
            {isBypass ? "VIP" : isSubscriptionExpired ? "Bloqué" : `${remaining} restants`}
          </span>
        </div>

        {/* Superadmin Mode Switcher Pill */}
        <button
          onClick={toggleSuperadminMode}
          className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl transition-all border ${
            user.isSuperadminMode
              ? "bg-dark-800 text-amber-400 border-amber-500/40 hover:bg-dark-700 shadow-sm"
              : "bg-dark-800 text-slate-300 border-dark-600 hover:text-white"
          }`}
          title="Basculez entre le Mode VIP illimité et le Mode Test Normal"
        >
          {user.isSuperadminMode ? (
            <>
              <Crown className="w-3 h-3 text-amber-400" />
              <span className="hidden md:inline">Mode VIP</span>
            </>
          ) : (
            <>
              <User className="w-3 h-3 text-cyan" />
              <span className="hidden md:inline">Test Normal</span>
            </>
          )}
        </button>

        {/* Primary Action Button */}
        <Link
          href="/prospects"
          className="flex items-center gap-1.5 bg-cyan hover:bg-cyan-intense text-dark-950 font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-xs shadow-cyan-glow transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span className="hidden sm:inline">Chercher</span>
        </Link>
      </div>
    </header>
  );
}
