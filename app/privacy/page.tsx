import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
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
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Politique de Confidentialité &amp; RGPD B2B</h1>
            <p className="text-xs text-slate-400">Dernière mise à jour : 28 Septembre 2026</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Données collectées</h2>
            <p>
              Prospectizi collecte uniquement des informations publiques professionnelles relatives aux entreprises : dénomination, site web, numéro de téléphone professionnel, adresse postale d&apos;établissement et contacts publics d&apos;entreprise.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Base légale du traitement</h2>
            <p>
              Les traitements sont fondés sur l&apos;Intérêt Légitime (Article 6.1.f du RGPD) pour la facilitation des relations interentreprises (B2B) et l&apos;exécution du contrat de service souscrit par l&apos;utilisateur.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Droit d&apos;opposition et suppression (Droit à l&apos;oubli)</h2>
            <p>
              Toute personne ou entreprise souhaitant rectifier ou supprimer ses coordonnées de nos index peut en faire la demande immédiate et sans frais à :
              <span className="text-cyan font-mono block mt-1">privacy@prospectizi.com</span>
              Toute demande est exécutée sous 48 heures ouvrées.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
