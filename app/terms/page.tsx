import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

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
            <p className="text-xs text-slate-400">Dernière mise à jour : 29 Septembre 2026</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          <section className="bg-cyan/10 border border-cyan/30 p-5 rounded-2xl">
            <h2 className="text-cyan font-bold text-sm uppercase tracking-wide flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4" />
              Politique de Remboursement &amp; Rétractation
            </h2>
            <p className="text-xs leading-relaxed text-slate-200">
              Conformément à l&apos;article L. 221-28 13° du Code de la consommation pour les contenus numériques et services logiciels en ligne d&apos;accès immédiat, l&apos;accès aux outils d&apos;audit et fonctionnalités logicielles démarre dès validation du paiement.
              <strong> Garantie satisfaction :</strong> si un diagnostic technique ou audit présente une incohérence manifeste, un crédit d&apos;audit de remplacement est attribué immédiatement sur simple signalement sous 72h. Tout abonnement mensuel (PRO ou AGENCE) peut être résilié à tout moment en 1 clic sans frais ni préavis depuis votre espace client.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Objet du Service &amp; Nature du Logiciel</h2>
            <p>
              Prospectizi est une plateforme logicielle en mode SaaS d&apos;audit technique, de diagnostic commercial et d&apos;assistance rédactionnelle par Intelligence Artificielle pour les professionnels, agences et consultants B2B. Le service permet d&apos;analyser la présence numérique d&apos;entreprises (responsivité mobile, performance, formulaires de conversion, visibilité locale) et de générer des propositions d&apos;amélioration et argumentaires commerciaux sur mesure.
            </p>
          </section>

          <section className="bg-dark-900 border border-dark-700 p-5 rounded-2xl space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-cyan" />
              2. Politique Anti-Spam &amp; Non-Fourniture de Listes Marketing
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Engagement strict :</strong> Prospectizi ne vend, ne loue, n&apos;enrichit, ni ne met à disposition aucune liste de diffusion marketing, base d&apos;adresses e-mails ou fichier de prospection de masse. Prospectizi n&apos;intègre aucun moteur d&apos;envoi automatisé d&apos;e-mails, de publipostage de masse ou de marketing sortant non sollicité (cold spam).
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              L&apos;utilisateur utilise Prospectizi exclusivement comme outil d&apos;analyse technique et d&apos;aide à la rédaction de propositions personnalisées pour ses propres relations d&apos;affaires individuelles. L&apos;utilisateur demeure seul responsable de ses communications et s&apos;engage à respecter scrupuleusement la législation applicable (notamment le RGPD, la directive e-Privacy et les règles relatives aux communications B2B).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Tarifs et Formules d&apos;Abonnement</h2>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs">
              <li><strong>Formule Découverte (1 €) :</strong> Paiement unique d&apos;essai donnant accès à 3 audits commerciaux et diagnostics techniques complets, sans renouvellement automatique.</li>
              <li><strong>Formule PRO (29 € / mois) :</strong> Accès mensuel à 90 audits commerciaux d&apos;entreprises, assistant de rédaction IA et A/B testing d&apos;argumentaires, exports des diagnostics. Sans engagement, résiliable à tout moment.</li>
              <li><strong>Formule AGENCE (59 € / mois) :</strong> Accès mensuel à 450 audits commerciaux, multi-secteurs (jusqu&apos;à 5 avatars métiers), accès équipe multi-utilisateurs (5 comptes). Résiliable en 1 clic.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Traitement des Paiements</h2>
            <p className="text-xs text-slate-300">
              Les transactions financières et abonnements sont traités de manière sécurisée par notre partenaire Merchant of Record agréé (Paddle.com Market Ltd). Vos informations de paiement sont chiffrées selon les normes bancaires PCI-DSS de niveau 1.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Contact &amp; Support</h2>
            <p className="text-xs text-slate-300">
              Pour toute question relative aux présentes conditions, à l&apos;utilisation du logiciel ou à une commande : 
              <span className="text-cyan font-mono block mt-1">contact@prospectizi.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
