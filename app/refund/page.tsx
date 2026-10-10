import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, CheckCircle2, RotateCcw, AlertCircle, Mail } from 'lucide-react';

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
            <p className="text-xs text-slate-400">Dernière mise à jour : Octobre 2026 — Prospectizi SaaS B2B</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          
          {/* Clause 1 : Droit de rétractation 14 jours */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <RotateCcw className="w-5 h-5 text-cyan" />
              <h2>1. Droit de Rétractation &amp; Remboursement sous 14 jours</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Conformément aux standards du commerce électronique et à la protection des consommateurs, vous disposez d&apos;un délai légal de <strong>quatorze (14) jours calendaires</strong> à compter de la date de souscription pour demander le remboursement intégral de votre paiement, <strong>à condition que le service n&apos;ait pas été substantiellement utilisé</strong> (aucun prospect exporté ou utilisé sur votre forfait).
            </p>
            <div className="p-3 bg-cyan/10 border border-cyan/30 rounded-xl text-xs text-cyan space-y-1">
              <strong>Modalité de remboursement :</strong> Le remboursement est effectué sous 5 à 7 jours ouvrés directement sur le moyen de paiement utilisé lors de la commande (Mobile Money ou Carte Bancaire) sans pénalité.
            </div>
          </section>

          {/* Clause 2 : Non-remboursement après consommation */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <h2>2. Conditions de Non-Remboursement après Activation &amp; Utilisation</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              En raison de la nature numérique instantanée des bases de données et des coordonnées professionnelles délivrées, <strong>aucun remboursement partiel ou total ne pourra être exigé une fois les prospects consultés, extraits ou exportés</strong> au cours de la période. Cette règle vise à protéger la propriété intellectuelle et à prévenir la revente abusive de données.
            </p>
          </section>

          {/* Clause 3 : Garantie Anti-Gaspillage (Recrédit immédiat) */}
          <section className="bg-dark-900 border border-emerald-500/30 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2>3. Garantie Anti-Gaspillage (Remplacement de Contact Inexploitable)</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pour vous garantir un service d&apos;une fiabilité irréprochable, tout prospect qui présenterait une coordonnée non fonctionnelle (e-mail en échec de remise permanent ou numéro de téléphone non attribué) est <strong>automatiquement et gratuitement recrédité</strong> sur votre compte sur simple signalement en 1 clic sous 72 heures ouvrées.
            </p>
          </section>

          {/* Clause 4 : Résiliation d'abonnement en 1 clic */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <h2 className="text-base font-bold text-white">4. Résiliation d&apos;Abonnement (PRO et AGENCE)</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nos formules mensuelles sont strictement <strong>sans engagement de durée</strong>. Vous pouvez résilier votre renouvellement à tout moment en 1 clic depuis votre espace utilisateur (menu <em>Paramètres</em>) ou par simple e-mail. L&apos;accès reste actif jusqu&apos;à la fin de la période mensuelle de 30 jours déjà réglée, sans aucun prélèvement ultérieur.
            </p>
          </section>

          {/* Contact Réclamations */}
          <section className="bg-cyan/10 border border-cyan/30 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Mail className="w-4 h-4 text-cyan" />
              <h3>Contact &amp; Demandes de Remboursement</h3>
            </div>
            <p className="text-xs text-slate-200">
              Pour toute demande relative à la facturation ou pour exercer votre droit de rétractation sous 14 jours, écrivez directement avec la référence de votre transaction à :
              <span className="text-cyan font-mono block mt-1">billing@prospectizi.com</span>
              <span className="text-slate-300 font-mono block text-[11px]">dossou1992@gmail.com</span>
              Nous traitons chaque demande dans un délai garanti sous 24h à 48h ouvrées.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
