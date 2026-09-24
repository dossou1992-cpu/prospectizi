"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { X, Check, Zap, Crown, ArrowRight, Shield, Globe, Smartphone, CreditCard } from 'lucide-react';
import { PlanType } from '@/lib/types';

export default function UpgradeModal() {
  const { showUpgradeModal, setShowUpgradeModal, upgradePlan, subscription } = useStore();
  const [gateway, setGateway] = useState<'flutterwave' | 'lemonsqueezy'>('flutterwave');
  const [loadingPlan, setLoadingPlan] = useState<PlanType | null>(null);

  if (!showUpgradeModal) return null;

  const handleCheckout = (plan: PlanType) => {
    setLoadingPlan(plan);
    setTimeout(() => {
      upgradePlan(plan);
      setLoadingPlan(null);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-dark-900 border border-cyan/40 rounded-2xl max-w-4xl w-full p-6 md:p-8 relative shadow-cyan-glow-lg max-h-[92vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => setShowUpgradeModal(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-dark-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 border border-cyan/40 text-cyan text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            Plafond de démonstration atteint
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            Vos futurs clients n&apos;attendent pas !
          </h2>
          <p className="text-slate-400 text-sm">
            Vous avez généré vos prospects d&apos;essai. Libérez tout le potentiel de Prospectizi pour commencer à signer vos premiers contrats dès cette semaine.
          </p>
        </div>

        {/* Gateway Smart Routing Selector */}
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-3 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Globe className="w-4 h-4 text-cyan" />
            <span className="font-semibold">Moyen de paiement adapté à votre pays :</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGateway('flutterwave')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                gateway === 'flutterwave'
                  ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                  : 'bg-dark-700 text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Money (MTN, Orange, Wave) / Cartes</span>
            </button>
            <button
              onClick={() => setGateway('lemonsqueezy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                gateway === 'lemonsqueezy'
                  ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                  : 'bg-dark-700 text-slate-300 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>International (Apple Pay / Cartes)</span>
            </button>
          </div>
        </div>

        {/* Offer Cards Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Plan PRO */}
          <div className="bg-dark-800/90 border-2 border-cyan rounded-2xl p-6 relative flex flex-col justify-between shadow-cyan-border">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cyan text-dark-950 text-[11px] font-black uppercase px-3 py-0.5 rounded-full shadow-cyan-glow">
              ★ RECOMMANDÉ / PLUS POPULAIRE ★
            </div>

            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Plan PRO</h3>
                  <p className="text-xs text-slate-400">Pour indépendants & freelances</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-cyan">29 €</span>
                  <span className="text-xs text-slate-400 block">/ mois sans engagement</span>
                </div>
              </div>

              <div className="bg-dark-700/60 rounded-xl p-3 my-4 border border-dark-600/60 text-xs text-cyan flex items-center justify-between">
                <span>Coût par prospect qualifié :</span>
                <span className="font-bold font-mono">0,32 € / prospect</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan shrink-0" />
                  <span><strong>90 Prospects Qualifiés / mois</strong> (3 / jour ouvré)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan shrink-0" />
                  <span>Recherche Multi-Canaux (Google Maps, LinkedIn, etc.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan shrink-0" />
                  <span>IA Avatar Avancée & messages personnalisés</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan shrink-0" />
                  <span><strong>Export CSV & Excel</strong> en 1 clic</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan shrink-0" />
                  <span>Module <strong>Audit Mensuel IA</strong> inclus</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan shrink-0" />
                  <span>Support Prioritaire WhatsApp direct</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('PRO')}
              disabled={loadingPlan !== null}
              className="w-full py-3 px-4 rounded-xl font-extrabold text-sm bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-2 shadow-cyan-glow transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loadingPlan === 'PRO' ? (
                <span>Activation instantanée...</span>
              ) : (
                <>
                  <span>Débloquer 90 prospects pour 29 €</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Plan AGENCE */}
          <div className="bg-dark-800/60 border border-dark-600 hover:border-cyan/50 rounded-2xl p-6 relative flex flex-col justify-between transition-colors">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-dark-950 text-[11px] font-black uppercase px-3 py-0.5 rounded-full">
              ⚡ RENDEMENT & VOLUME MAXIMUM
            </div>

            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Plan AGENCE</h3>
                  <p className="text-xs text-slate-400">Pour agences, équipes & multi-projets</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-white">59 €</span>
                  <span className="text-xs text-slate-400 block">/ mois sans engagement</span>
                </div>
              </div>

              <div className="bg-dark-700/60 rounded-xl p-3 my-4 border border-dark-600/60 text-xs text-amber-400 flex items-center justify-between">
                <span>Coût record par prospect :</span>
                <span className="font-bold font-mono">0,13 € / prospect (5x plus de volume)</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>450 Prospects Qualifiés / mois</strong> (15 / jour)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Gestion <strong>Multi-Avatars</strong> (jusqu&apos;à 5 cibles ou activités)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Accès <strong>Équipe & Sous-comptes</strong> (jusqu&apos;à 5 collaborateurs)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Scraping Haute Vitesse Apify prioritaire</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Export CSV / Excel illimité & Audit Mensuel IA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Onboarding VIP + Support dédié</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('AGENCE')}
              disabled={loadingPlan !== null}
              className="w-full py-3 px-4 rounded-xl font-extrabold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-dark-950 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loadingPlan === 'AGENCE' ? (
                <span>Activation instantanée...</span>
              ) : (
                <>
                  <span>Passer sur AGENCE pour 59 €</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Legal & Reassurance Notice */}
        <div className="text-center text-[11px] text-slate-400 border-t border-dark-700/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-cyan" />
            Paiement 100% sécurisé via {gateway === 'flutterwave' ? 'Flutterwave' : 'Lemon Squeezy'}. Résiliable à tout moment en 1 clic.
          </span>
          <span>
            Garantie anti-gaspillage : prospects inexploitables recrédités automatiquement.
          </span>
        </div>
      </div>
    </div>
  );
}
