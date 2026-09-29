import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan hover:text-cyan-intense transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil Prospectizi
        </Link>

        <div className="flex items-center gap-3 pb-6 border-b border-dark-700">
          <div className="w-12 h-12 rounded-xl bg-cyan/15 text-cyan flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Politique de Remboursement &amp; Rétractation</h1>
            <p className="text-xs text-slate-400">Prospectizi - Logiciel SaaS B2B d&apos;Audit Commercial &amp; IA</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          <section className="bg-dark-900 border border-dark-700 p-5 rounded-2xl space-y-2">
            <h2 className="text-base font-bold text-white">Garantie Diagnostic Conforme &amp; Recrédit</h2>
            <p className="text-xs leading-relaxed text-slate-300">
              Si un audit commercial ou diagnostic technique présente une anomalie manifeste sur l&apos;établissement analysé (site web inaccessible ou établissement définitivement fermé), vous pouvez le signaler depuis votre tableau de bord sous 72h. Un nouveau crédit d&apos;audit complet est automatiquement et gratuitement recrédité sur votre compte.
            </p>
          </section>

          <section className="bg-dark-900 border border-dark-700 p-5 rounded-2xl space-y-2">
            <h2 className="text-base font-bold text-white">Résiliation des Abonnements (PRO et AGENCE)</h2>
            <p className="text-xs leading-relaxed text-slate-300">
              Nos abonnements mensuels sont sans engagement de durée. Vous pouvez annuler votre renouvellement à tout moment en 1 clic depuis votre espace utilisateur (menu Paramètres) ou par simple demande à notre support. L&apos;accès à vos fonctionnalités et à votre historique reste actif jusqu&apos;à la fin de la période mensuelle déjà réglée.
            </p>
          </section>

          <section className="bg-dark-900 border border-dark-700 p-5 rounded-2xl space-y-2">
            <h2 className="text-base font-bold text-white">Contact &amp; Assistance Réclamation</h2>
            <p className="text-xs text-slate-300">
              Pour toute demande de remboursement, d&apos;annulation ou d&apos;assistance commerciale :
              <span className="text-cyan font-mono block mt-1">contact@prospectizi.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
