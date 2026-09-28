import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Scale } from 'lucide-react';

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
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Conditions Générales d&apos;Utilisation &amp; de Vente (CGU / CGV)</h1>
            <p className="text-xs text-slate-400">Dernière mise à jour : 28 Septembre 2026</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          <section className="bg-cyan/10 border border-cyan/30 p-5 rounded-2xl">
            <h2 className="text-cyan font-bold text-sm uppercase tracking-wide flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4" />
              Politique de Remboursement &amp; Rétractation
            </h2>
            <p className="text-xs leading-relaxed text-slate-200">
              Conformément à l&apos;article L. 221-28 13° du Code de la consommation pour les contenus numériques d&apos;accès immédiat, l&apos;accès aux prospects et fonctionnalités démarre dès validation du paiement.
              <strong> Garantie contact inexploitable :</strong> si un prospect comporte un e-mail ou téléphone non fonctionnel, il est recrédité immédiatement sur simple signalement sous 72h. Tout abonnement mensuel (PRO ou AGENCE) peut être résilié à tout moment en 1 clic sans frais ni préavis.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Objet du Service</h2>
            <p>
              Prospectizi est une solution logicielle SaaS d&apos;aide à la prospection commerciale B2B. Elle permet d&apos;identifier des entreprises cibles, de générer des analyses d&apos;opportunités et de personnaliser des messages commerciaux.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Tarifs et Formules</h2>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs">
              <li><strong>Formule Découverte (1 €) :</strong> Paiement unique d&apos;essai donnant accès à 3 prospects qualifiés complets, sans renouvellement automatique.</li>
              <li><strong>Formule PRO (29 € / mois) :</strong> Accès mensuel à 90 prospects qualifiés, scoring 3 piliers, exports CSV &amp; CRM. Sans engagement, résiliable à tout moment.</li>
              <li><strong>Formule AGENCE (59 € / mois) :</strong> Accès mensuel à 450 prospects qualifiés, multi-avatars, accès équipe 5 collaborateurs. Résiliable en 1 clic.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Responsabilité &amp; Utilisation Conforme</h2>
            <p>
              L&apos;utilisateur s&apos;engage à utiliser les coordonnées professionnelles conformément aux règles de sollicitation interentreprises (B2B), en respectant le lien avec l&apos;activité de la personne contactée et en fournissant un moyen clair d&apos;opposition (opt-out).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Contact &amp; Support</h2>
            <p>
              Pour toute question relative aux présentes conditions ou à une commande : 
              <span className="text-cyan font-mono block mt-1">support@prospectizi.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
