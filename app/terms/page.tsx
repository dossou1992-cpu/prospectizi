import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Scale, CheckCircle2, RotateCcw } from 'lucide-react';

export default function TermsPage() {
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
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Conditions Générales d&apos;Utilisation (CGU / CGV)</h1>
            <p className="text-xs text-slate-400">Dernière mise à jour : Octobre 2026 — Prospectizi</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          
          {/* Encadré Synthèse Clés & Remboursement */}
          <section className="bg-cyan/10 border border-cyan/30 p-5 rounded-2xl space-y-2">
            <h2 className="text-cyan font-bold text-sm uppercase tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Politique de Remboursement &amp; Droit de Rétractation
            </h2>
            <p className="text-xs leading-relaxed text-slate-200">
              Conformément à la réglementation pour les services numériques, le client bénéficie d&apos;un droit de rétractation de <strong>14 jours</strong> si les services n&apos;ont pas été consommés.
              <strong> Garantie contact inexploitable :</strong> si une coordonnée s&apos;avère erronée, elle est automatiquement recréditée sous 72h. Tout abonnement mensuel est résiliable en 1 clic sans préavis.
            </p>
          </section>

          {/* 1. Objet */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <h2 className="text-base font-bold text-white">1. Objet du Service</h2>
            <p className="text-xs leading-relaxed text-slate-300">
              Prospectizi est une plateforme logicielle SaaS d&apos;aide à la prospection commerciale B2B. Elle permet d&apos;identifier des établissements professionnels publics, d&apos;analyser leurs opportunités d&apos;amélioration et de générer des séquences de contact commercial personnalisées adaptées au profil métier de l&apos;utilisateur.
            </p>
          </section>

          {/* 2. Tarifs et Formules */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <h2 className="text-base font-bold text-white">2. Tarifs, Formules &amp; Modalités de Paiement</h2>
            <ul className="list-disc list-inside space-y-2 pl-2 text-xs text-slate-300">
              <li><strong>Formule Découverte (1 € / 650 FCFA) :</strong> Paiement unique d&apos;essai donnant accès à 3 prospects qualifiés complets, sans aucun renouvellement automatique. Strictement limitée à un seul essai par utilisateur.</li>
              <li><strong>Formule PRO (29 € / 19 000 FCFA par mois) :</strong> Accès mensuel à 90 prospects qualifiés, audit IA 30 jours, séquences multicanales complètes. Sans engagement de durée.</li>
              <li><strong>Formule AGENCE (59 € / 39 000 FCFA par mois) :</strong> Accès mensuel à 450 prospects qualifiés, gestion d&apos;équipe multi-utilisateurs (jusqu&apos;à 5 comptes), exports CSV &amp; CRM. Sans engagement de durée.</li>
            </ul>
            <p className="text-xs text-slate-400">Les paiements sont traités de façon sécurisée via nos partenaires agréés de paiement Mobile Money (T-Money, Moov Money, MTN, Orange, Wave) et Cartes Bancaires (Visa, Mastercard).</p>
          </section>

          {/* 3. Modalités de Résiliation en 1 Clic */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <RotateCcw className="w-5 h-5 text-cyan" />
              <h2>3. Modalités de Résiliation de l&apos;Abonnement (En 1 Clic)</h2>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              L&apos;utilisateur peut interrompre ou résilier son abonnement mensuel à tout moment et sans motif :
            </p>
            <div className="p-3.5 bg-dark-950 rounded-xl border border-dark-700 text-xs text-slate-200 space-y-2">
              <p>• <strong>Depuis l&apos;interface :</strong> En se rendant directement dans la rubrique <em>Paramètres</em> de son espace client et en cliquant sur &quot;Désactiver le renouvellement automatique&quot;.</p>
              <p>• <strong>Par e-mail :</strong> En adressant un simple message à <span className="text-cyan font-mono">contact@prospectizi.com</span>.</p>
              <p>• <strong>Effet immédiat :</strong> Aucun prélèvement ultérieur ne sera effectué. L&apos;accès reste disponible jusqu&apos;à la fin de la période de 30 jours déjà réglée.</p>
            </div>
          </section>

          {/* 4. Responsabilité B2B */}
          <section className="bg-dark-900 border border-dark-700 p-6 rounded-2xl space-y-3">
            <h2 className="text-base font-bold text-white">4. Utilisation Conforme &amp; Responsabilité Commerciale</h2>
            <p className="text-xs leading-relaxed text-slate-300">
              L&apos;utilisateur s&apos;engage à utiliser les coordonnées professionnelles collectées dans le cadre strict des sollicitations interentreprises (B2B). Toute communication doit offrir une option simple de désinscription et respecter la vie privée des destinataires.
            </p>
          </section>

          {/* 5. Contact & Litiges */}
          <section className="bg-cyan/10 border border-cyan/30 p-5 rounded-2xl space-y-2">
            <h2 className="text-white font-bold text-sm">5. Contact Support &amp; Droit Applicable</h2>
            <p className="text-xs text-slate-200">
              Les présentes CGU sont soumises au droit des affaires applicable (Traité OHADA). Pour toute assistance, écrivez à :
              <span className="text-cyan font-mono block mt-1">support@prospectizi.com</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
