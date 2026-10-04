"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { X, Check, Zap, ArrowRight, Shield, Globe, Smartphone, RotateCcw } from 'lucide-react';
import { PlanType } from '@/lib/types';
import FeexPayCheckoutModal from './FeexPayCheckoutModal';

export default function UpgradeModal() {
  const { showUpgradeModal, setShowUpgradeModal, isSubscriptionExpired, subscription } = useStore();
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PlanType | null>(null);

  if (!showUpgradeModal) return null;

  const handleOpenFeexPay = (plan: PlanType) => {
    setSelectedPlanForCheckout(plan);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
        <div className="bg-dark-900 border border-cyan/40 rounded-2xl max-w-5xl w-full p-4 sm:p-6 md:p-8 relative shadow-cyan-glow-lg max-h-[92vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={() => setShowUpgradeModal(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-dark-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border ${
              isSubscriptionExpired
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                : 'bg-cyan/15 border-cyan/40 text-cyan'
            }`}>
              {isSubscriptionExpired ? <RotateCcw className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
              <span>{isSubscriptionExpired ? "Échéance Mensuelle Atteinte" : "Plafond d'essai atteint"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              {isSubscriptionExpired 
                ? "Renouvelez votre abonnement mensuel"
                : "Vos futurs clients n'attendent pas !"}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              {isSubscriptionExpired
                ? "Votre période mensuelle de 30 jours est échue. Renouvelez votre formule PRO (90 leads) ou AGENCE (450 leads) pour continuer vos prospections sans interruption."
                : "Vous avez atteint la limite de vos prospects d'essai ! Choisissez l'offre qui vous convient : le plan Découverte à 1 € (offre d'essai unique) ou nos abonnements mensuels sans engagement."}
            </p>
          </div>

          {/* Universal Payment Reassurance Banner */}
          <div className="bg-dark-800/90 border border-cyan/30 rounded-xl p-3 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-cyan font-semibold">
              <Shield className="w-4 h-4" />
              <span>Guichet FeexPay &amp; Paiement Direct :</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center text-slate-300">
              <span className="flex items-center gap-1.5 bg-dark-700 px-2.5 py-1 rounded-lg border border-dark-600">
                <Smartphone className="w-3.5 h-3.5 text-cyan" />
                <span>Mobile Money (T-Money, Moov Togo, Wave, MTN, Orange)</span>
              </span>
              <span className="flex items-center gap-1.5 bg-dark-700 px-2.5 py-1 rounded-lg border border-dark-600">
                <Globe className="w-3.5 h-3.5 text-cyan" />
                <span>Cartes Bancaires (Visa, Mastercard)</span>
              </span>
            </div>
          </div>

          {/* Offer Cards Comparison */}
          <div className={`grid gap-5 mb-6 items-stretch ${
            isSubscriptionExpired ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' : 'grid-cols-1 md:grid-cols-3'
          }`}>
            
            {/* Plan DÉCOUVERTE (1 € / 650 FCFA) */}
            {!isSubscriptionExpired && (
              <div className="bg-dark-800/60 border border-dark-600 hover:border-slate-500 rounded-2xl p-5 flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-dark-700 px-2 py-0.5 rounded-full border border-dark-600">
                        Offre d&apos;essai unique
                      </span>
                      <h3 className="text-lg font-bold text-white mt-2">DÉCOUVERTE</h3>
                      <p className="text-[11px] text-slate-400">Paiement unique - 1 fois seulement</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-white">1 €</span>
                      <span className="text-xs text-cyan font-bold block">650 FCFA</span>
                      <span className="text-[10px] text-slate-400 block font-medium text-amber-400">Non renouvelable</span>
                    </div>
                  </div>

                  <div className="bg-dark-700/50 rounded-xl p-2.5 my-3 border border-dark-600/50 text-[11px] text-slate-300 flex items-center justify-between">
                    <span>Volume inclus :</span>
                    <span className="font-bold font-mono text-cyan">3 prospects qualifiés</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300 mb-5">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan shrink-0" />
                      <span><strong>3 Prospects Qualifiés</strong> complets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan shrink-0" />
                      <span>Messages d&apos;accroche IA sur-mesure</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan shrink-0" />
                      <span>Accès à 1 canal au choix (Google Maps)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan shrink-0" />
                      <span>Gestion CRM de base des 3 fiches</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-500 text-[11px]">
                      <span className="w-3.5 h-3.5 text-center">✕</span>
                      <span>Offre unique, sans reconduction</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleOpenFeexPay('DECOUVERTE')}
                  disabled={subscription.plan_type === 'DECOUVERTE'}
                  className="w-full py-2.5 px-3 rounded-xl font-bold text-xs bg-dark-700 hover:bg-dark-600 text-slate-200 border border-dark-500 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {subscription.plan_type === 'DECOUVERTE' ? (
                    <span>Déjà utilisé</span>
                  ) : (
                    <>
                      <span>Tester Découverte (650 FCFA / 1 €)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Plan PRO (29 € / 19 000 FCFA) */}
            <div className="bg-dark-800/90 border-2 border-cyan rounded-2xl p-5 relative flex flex-col justify-between shadow-cyan-border">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan text-dark-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-cyan-glow">
                ★ PLUS POPULAIRE ★
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan bg-cyan/15 px-2 py-0.5 rounded-full border border-cyan/40">
                      Freelances &amp; Pros
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">Plan PRO</h3>
                    <p className="text-[11px] text-slate-400">Pour indépendants réguliers</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-cyan">29 €</span>
                    <span className="text-xs text-white font-extrabold block">19 000 FCFA</span>
                    <span className="text-[10px] text-slate-400 block">/ mois sans engagement</span>
                  </div>
                </div>

                <div className="bg-dark-700/60 rounded-xl p-2.5 my-3 border border-dark-600/60 text-[11px] text-cyan flex items-center justify-between">
                  <span>Coût unitaire :</span>
                  <span className="font-bold font-mono">211 FCFA / prospect</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 mb-5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span><strong>90 Prospects Qualifiés / mois</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span>Recherche Multi-Canaux complète (5 canaux)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span>IA Avatar Avancée &amp; accroches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span><strong>Export CSV &amp; Excel</strong> en 1 clic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span>Module <strong>Audit Mensuel IA</strong> inclus</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenFeexPay('PRO')}
                className="w-full py-2.5 px-3 rounded-xl font-extrabold text-xs bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-1.5 shadow-cyan-glow transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{isSubscriptionExpired ? "Renouveler PRO (19 000 FCFA)" : "Passer sur PRO (19 000 FCFA)"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Plan AGENCE (59 € / 39 000 FCFA) */}
            <div className="bg-dark-800/60 border border-amber-500/50 hover:border-amber-400 rounded-2xl p-5 relative flex flex-col justify-between transition-colors">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-dark-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
                ⚡ VOLUME MAX
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/40">
                      Agences &amp; Équipes
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">Plan AGENCE</h3>
                    <p className="text-[11px] text-slate-400">Pour agences &amp; multi-cibles</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-white">59 €</span>
                    <span className="text-xs text-amber-400 font-extrabold block">39 000 FCFA</span>
                    <span className="text-[10px] text-slate-400 block">/ mois sans engagement</span>
                  </div>
                </div>

                <div className="bg-dark-700/60 rounded-xl p-2.5 my-3 border border-dark-600/60 text-[11px] text-amber-400 flex items-center justify-between">
                  <span>Coût record :</span>
                  <span className="font-bold font-mono">86 FCFA / prospect (5x plus)</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 mb-5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><strong>450 Prospects Qualifiés / mois</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Multi-Avatars (jusqu&apos;à 5 cibles)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Accès Équipe (5 sous-comptes)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Recherche Haute Vitesse prioritaire</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Audit Mensuel IA &amp; Exports illimités</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenFeexPay('AGENCE')}
                className="w-full py-2.5 px-3 rounded-xl font-extrabold text-xs bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-dark-950 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{isSubscriptionExpired ? "Renouveler AGENCE (39 000 FCFA)" : "Passer sur AGENCE (39 000 FCFA)"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Legal & Reassurance Notice */}
          <div className="text-center text-[11px] text-slate-400 border-t border-dark-700/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-cyan" />
              Passerelle FeexPay certifiée. Résiliable à tout moment en 1 clic.
            </span>
            <span>
              Garantie anti-gaspillage : prospects inexploitables recrédités automatiquement.
            </span>
          </div>
        </div>
      </div>

      {/* FeexPay Checkout Modal Triggered */}
      {selectedPlanForCheckout && (
        <FeexPayCheckoutModal
          isOpen={Boolean(selectedPlanForCheckout)}
          selectedPlan={selectedPlanForCheckout}
          onClose={() => {
            setSelectedPlanForCheckout(null);
            setShowUpgradeModal(false);
          }}
        />
      )}
    </>
  );
}
