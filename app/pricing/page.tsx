"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { 
  CreditCard, 
  Check, 
  Zap, 
  Crown, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Smartphone, 
  Video,
  Gift
} from 'lucide-react';
import { PlanType } from '@/lib/types';

export default function PricingPage() {
  const { subscription, upgradePlan, user } = useStore();
  const [gateway, setGateway] = useState<'flutterwave' | 'lemonsqueezy'>('flutterwave');
  const [loadingPlan, setLoadingPlan] = useState<PlanType | null>(null);

  const handleSelectPlan = (plan: PlanType) => {
    setLoadingPlan(plan);
    setTimeout(() => {
      upgradePlan(plan);
      setLoadingPlan(null);
    }, 700);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 text-cyan text-xs font-bold uppercase tracking-wider border border-cyan/30">
          <CreditCard className="w-3.5 h-3.5" />
          Tarifs Transparents & Sans Engagement
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          Des offres conçues pour votre retour sur investissement
        </h1>
        <p className="text-slate-400 text-xs md:text-sm">
          Choisissez la formule adaptée à votre rythme de prospection. Annulable à tout moment en 1 clic.
        </p>

        {/* Smart Routing Geo selector */}
        <div className="inline-flex p-1 bg-dark-900 border border-dark-600 rounded-xl text-xs mt-3">
          <button
            onClick={() => setGateway('flutterwave')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              gateway === 'flutterwave'
                ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Afrique (Mobile Money & Cartes via Flutterwave)</span>
          </button>
          <button
            onClick={() => setGateway('lemonsqueezy')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              gateway === 'lemonsqueezy'
                ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>International (Apple Pay / Cartes via Lemon Squeezy)</span>
          </button>
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-4">
        
        {/* CARTE 1 : DÉCOUVERTE (1 €) */}
        <div className={`bg-dark-900 border rounded-2xl p-6 flex flex-col justify-between transition-all ${
          subscription.plan_type === 'DECOUVERTE' ? 'border-slate-500 shadow-md' : 'border-dark-700 hover:border-slate-500'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-dark-800 px-2.5 py-0.5 rounded-full border border-dark-600">
                Test & Prise en main
              </span>
              {subscription.plan_type === 'DECOUVERTE' && (
                <span className="text-[10px] font-bold text-cyan bg-cyan/15 px-2 py-0.5 rounded-full">Actif</span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white">DÉCOUVERTE</h3>
            <div className="my-4">
              <span className="text-3xl font-black text-white">1 €</span>
              <span className="text-xs text-slate-400 block mt-0.5">Paiement unique, sans récurrence</span>
            </div>

            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Idéal pour générer vos 3 premiers prospects ultra-qualifiés et tester l&apos;efficacité de nos messages personnalisés.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan shrink-0" />
                <span><strong>3 Prospects Qualifiés</strong> (Fiche complète)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan shrink-0" />
                <span>Messages IA personnalisés complets</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan shrink-0" />
                <span>Accès à 1 canal au choix (Google Maps)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan shrink-0" />
                <span>Gestion CRM de base des fiches</span>
              </li>
              <li className="flex items-center gap-2 text-cyan">
                <Gift className="w-4 h-4 shrink-0" />
                <span>Bonus +3 prospects offerts (avis Loom)</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <span className="w-4 h-4 text-center">✕</span>
                <span>Pas d&apos;export CSV ni d&apos;Audit Mensuel</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('DECOUVERTE')}
            disabled={subscription.plan_type === 'DECOUVERTE'}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-600 disabled:opacity-50 transition-all"
          >
            {subscription.plan_type === 'DECOUVERTE' ? "Plan Actif" : "Choisir l'offre Découverte (1 €)"}
          </button>
        </div>

        {/* CARTE 2 : PRO (29 € / mois) */}
        <div className="bg-dark-900 border-2 border-cyan rounded-2xl p-6 relative flex flex-col justify-between shadow-cyan-border hover:shadow-cyan-glow transition-all">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cyan text-dark-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-cyan-glow">
            ★ PLUS POPULAIRE / RECOMMANDÉ ★
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan bg-cyan/15 px-2.5 py-0.5 rounded-full border border-cyan/40">
                Indépendants & Freelances
              </span>
              {subscription.plan_type === 'PRO' && (
                <span className="text-[10px] font-bold text-cyan bg-cyan/15 px-2 py-0.5 rounded-full">Actif</span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white">PRO</h3>
            <div className="my-4">
              <span className="text-3xl font-black text-cyan">29 €</span>
              <span className="text-xs text-slate-400 block mt-0.5">/ mois sans engagement</span>
            </div>

            <div className="bg-dark-800 rounded-lg p-2.5 mb-4 text-[11px] text-cyan font-mono flex items-center justify-between border border-cyan/20">
              <span>Coût par prospect :</span>
              <strong>0,32 € / prospect</strong>
            </div>

            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              Signez 1 à 3 nouveaux clients par mois grâce à un flux régulier et automatique de prospects sans y passer vos journées.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan shrink-0" />
                <span><strong>90 Prospects Qualifiés / mois</strong> (3 / jour)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan shrink-0" />
                <span>Recherche Multi-Canaux illimitée (5 canaux)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan shrink-0" />
                <span>IA Avatar Avancée & messages sur-mesure</span>
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
                <span>Support direct WhatsApp prioritaire</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('PRO')}
            disabled={loadingPlan !== null}
            className="w-full py-3 px-4 rounded-xl text-xs font-black bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-2 shadow-cyan-glow transition-all hover:scale-105 active:scale-95"
          >
            {loadingPlan === 'PRO' ? (
              <span>Activation en cours...</span>
            ) : subscription.plan_type === 'PRO' ? (
              <span>Votre Plan Actuel</span>
            ) : (
              <>
                <span>Souscrire au plan PRO (29 €)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* CARTE 3 : AGENCE (59 € / mois) */}
        <div className="bg-dark-900 border border-amber-500/40 hover:border-amber-500 rounded-2xl p-6 relative flex flex-col justify-between transition-all">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-dark-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
            ⚡ RENDEMENT & VOLUME MAXIMUM
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                Agences & Multi-Projets
              </span>
              {subscription.plan_type === 'AGENCE' && (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full">Actif</span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white">AGENCE</h3>
            <div className="my-4">
              <span className="text-3xl font-black text-white">59 €</span>
              <span className="text-xs text-slate-400 block mt-0.5">/ mois sans engagement</span>
            </div>

            <div className="bg-dark-800 rounded-lg p-2.5 mb-4 text-[11px] text-amber-400 font-mono flex items-center justify-between border border-amber-500/20">
              <span>Coût record :</span>
              <strong>0,13 € / prospect (5x plus)</strong>
            </div>

            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              Pour seulement 30 € de plus que le plan PRO, obtenez 5 fois plus de volume et partagez les accès avec votre équipe.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>450 Prospects Qualifiés / mois</strong> (15 / jour)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Gestion <strong>Multi-Avatars</strong> (jusqu&apos;à 5 cibles)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Accès <strong>Équipe (5 sous-comptes)</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Moteur Apify prioritaire Haute Vitesse</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Audit Mensuel IA & exports CSV illimités</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Support dédié + Onboarding personnalisé</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('AGENCE')}
            disabled={loadingPlan !== null}
            className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-dark-950 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            {loadingPlan === 'AGENCE' ? (
              <span>Activation en cours...</span>
            ) : subscription.plan_type === 'AGENCE' ? (
              <span>Votre Plan Actuel</span>
            ) : (
              <>
                <span>Passer sur AGENCE (59 €)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* Loom Bonus Callout Card */}
      <div className="bg-gradient-to-r from-dark-900 to-dark-850 border border-cyan/30 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan/15 text-cyan flex items-center justify-center shrink-0">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Envie de prospects gratuits ?</h4>
            <p className="text-xs text-slate-400">
              Enregistrez un rapide avis vidéo Loom de 60 secondes et débloquez automatiquement <strong>+3 prospects offerts</strong> sur votre compte !
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const btn = document.querySelector('header button');
            if (btn) (btn as HTMLButtonElement).click();
          }}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-dark-800 hover:bg-dark-700 text-cyan border border-cyan/30 shrink-0 transition-colors"
        >
          Envoyer mon avis Loom
        </button>
      </div>

      {/* Security & CGV mention */}
      <div className="text-center text-xs text-slate-400 border-t border-dark-800 pt-6 space-y-1">
        <p className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-cyan" />
          Paiement 100% sécurisé via {gateway === 'flutterwave' ? 'Flutterwave (Mobile Money / Cartes)' : 'Lemon Squeezy (Stripe / Cartes / Apple Pay)'}.
        </p>
        <p className="text-[11px] text-slate-400">
          En validant votre souscription, vous acceptez nos CGV. Les abonnements mensuels sont renouvelés automatiquement sauf annulation de votre part avant l&apos;échéance.
        </p>
      </div>
    </div>
  );
}
