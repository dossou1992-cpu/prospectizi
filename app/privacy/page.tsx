import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';

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
            <p className="text-xs text-slate-400">Dernière mise à jour : 29 Septembre 2026</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          <section className="bg-dark-900 border border-dark-700 p-5 rounded-2xl space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan" />
              1. Nature du Service &amp; Données traitées
            </h2>
            <p className="text-xs leading-relaxed text-slate-300">
              Prospectizi est un outil logiciel d&apos;analyse technique et de diagnostic de présence numérique d&apos;entreprises, associé à un assistant de rédaction de propositions commerciales assisté par IA.
              Prospectizi ne commercialise aucune base d&apos;adresses e-mails, ne loue aucun fichier de diffusion marketing et n&apos;envoie aucun message automatisé non sollicité.
            </p>
            <p className="text-xs leading-relaxed text-slate-300">
              Les données traitées dans le cadre des audits techniques sont limitées aux informations professionnelles publiques d&apos;établissements (dénomination sociale, site internet public, note d&apos;avis publics, coordonnées professionnelles d&apos;accueil d&apos;entreprises).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Base légale du traitement</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Les traitements d&apos;audit technique sont fondés sur l&apos;Intérêt Légitime (Article 6.1.f du RGPD) pour l&apos;évaluation professionnelle et le diagnostic de performance numérique des entreprises (B2B), ainsi que l&apos;exécution du contrat de service souscrit par l&apos;utilisateur.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Droit d&apos;opposition et suppression (Droit à l&apos;oubli)</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Toute entreprise ou professionnel souhaitant rectifier ou demander le retrait de ses informations professionnelles de nos index d&apos;audit technique peut en faire la demande immédiate et sans frais à :
              <span className="text-cyan font-mono block mt-1">contact@prospectizi.com</span>
              Toute demande est traitée sous 48 heures ouvrées conformément aux exigences du RGPD.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
