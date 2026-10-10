"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { X, ShieldCheck, FileText, Lock, Scale, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  const { showLegalModal, setShowLegalModal } = useStore();
  const [activeTab, setActiveTab] = useState<'mentions' | 'cgv' | 'rgpd'>('mentions');

  // Determine if modal is open: prop takes precedence if defined, otherwise store
  const isModalOpen = isOpen !== undefined ? isOpen : showLegalModal;

  if (!isModalOpen) return null;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setShowLegalModal(false);
  };

  return (
    <div 
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-dark-900 border border-cyan/40 rounded-2xl max-w-4xl w-full p-6 md:p-8 relative shadow-cyan-glow-lg max-h-[92vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-dark-700 transition-colors"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-dark-700">
          <div className="w-10 h-10 rounded-xl bg-cyan/15 text-cyan flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Centre Légal &amp; Conformité Réglementaire</h2>
            <p className="text-xs text-slate-400">Prospectizi - Solution B2B d&apos;aide à la prospection commerciale</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-dark-700 pb-3 mb-4 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('mentions')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'mentions'
                ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                : 'text-slate-400 hover:text-white bg-dark-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Mentions Légales</span>
          </button>
          <button
            onClick={() => setActiveTab('cgv')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'cgv'
                ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                : 'text-slate-400 hover:text-white bg-dark-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>CGU &amp; CGV (Renonciation Rétractation)</span>
          </button>
          <button
            onClick={() => setActiveTab('rgpd')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'rgpd'
                ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                : 'text-slate-400 hover:text-white bg-dark-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Politique de Confidentialité &amp; RGPD B2B</span>
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
          
          {/* TAB 1: MENTIONS LÉGALES */}
          {activeTab === 'mentions' && (
            <div className="space-y-4">
              <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
                <h3 className="font-bold text-white text-sm mb-2">1. Éditeur de la Plateforme</h3>
                <p>
                  Le service SaaS <strong>Prospectizi</strong> (accessible via le domaine https://prospectizi.vercel.app et ses sous-domaines) est édité par :
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1.5 text-slate-300">
                  <li><strong>Nom commercial :</strong> Prospectizi</li>
                  <li><strong>Forme juridique :</strong> Entreprise Individuelle / Professionnelle Indépendante (Personne physique)</li>
                  <li><strong>Directrice de la publication &amp; Fondatrice :</strong> Doris DOSSOU (DOSSOU Emmanuella Jaya Adodo Doris)</li>
                  <li><strong>Identifiant Fiscal Unique (IFU) :</strong> 0202667536249</li>
                  <li><strong>Adresse &amp; Siège d&apos;exploitation :</strong> Carré 98, Akpakpa Ciné Concorde, Cotonou, Bénin</li>
                  <li><strong>Contact Support officiel :</strong> <span className="text-cyan font-mono">contact@prospectizi.com</span> • <span className="text-slate-300 font-mono">dossou1992@gmail.com</span></li>
                  <li><strong>Déléguée à la Protection des Données (DPO) :</strong> <span className="text-cyan font-mono">contact@prospectizi.com</span></li>
                  <li><strong>Slogan officiel :</strong> « Trouvez &amp; contactez mieux ! »</li>
                </ul>
              </div>

              <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
                <h3 className="font-bold text-white text-sm mb-2">2. Hébergement de l&apos;Application</h3>
                <p>
                  L&apos;infrastructure logicielle et les bases de données sont hébergées sur des centres de données sécurisés conformes aux normes ISO 27001 et aux réglementations sur la protection des données :
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300">
                  <li><strong>Hébergement Frontend &amp; CDN :</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.</li>
                  <li><strong>Base de Données &amp; Authentification :</strong> Supabase Inc., 970 Toa Payoh North #07-04, Singapour 318992.</li>
                </ul>
              </div>

              <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
                <h3 className="font-bold text-white text-sm mb-2">3. Propriété Intellectuelle</h3>
                <p>
                  L&apos;ensemble des éléments constituant la plateforme Prospectizi (textes, graphismes, interfaces, algorithmes de calcul de pertinence, modèles d&apos;IA de scoring, bases de données) est la propriété exclusive de Doris DOSSOU / Prospectizi. Toute reproduction, extraction substantielle ou représentation intégrale ou partielle sans accord préalable écrit est formellement interdite.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CONDITIONS GÉNÉRALES D'UTILISATION ET DE VENTE (CGU / CGV) */}
          {activeTab === 'cgv' && (
            <div className="space-y-4">
              <div className="bg-cyan/10 border border-cyan/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-cyan font-bold text-xs uppercase mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Clause Essentielle : Renonciation Expresse au Droit de Rétractation
                </div>
                <p className="text-white text-xs">
                  Conformément aux dispositions applicables aux contenus numériques fournis en ligne sans support matériel :
                </p>
                <p className="mt-2 text-slate-300 text-xs italic">
                  En souscrivant à l&apos;un de nos forfaits (DÉCOUVERTE, PRO ou AGENCE) et en activant la génération de données de prospects qualifiés immédiatement accessibles depuis l&apos;interface, l&apos;Utilisateur donne son accord préalable exprès pour l&apos;exécution immédiate du service et <strong>renonce expressément à son droit de rétractation de 14 jours</strong>, les crédits et données générés étant consommés dès leur mise à disposition.
                </p>
              </div>

              <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 space-y-2">
                <h3 className="font-bold text-white text-sm">Article 1 - Objet &amp; Champ d&apos;Application</h3>
                <p>
                  Les présentes Conditions Générales régissent l&apos;ensemble des relations contractuelles entre Prospectizi / Doris DOSSOU et tout professionnel abonné au service. Le service est strictement réservé à une utilisation professionnelle (B2B).
                </p>
              </div>

              <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 space-y-2">
                <h3 className="font-bold text-white text-sm">Article 2 - Modalités d&apos;Abonnement &amp; Facturation</h3>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li><strong>Formule Découverte (1 € / 650 XOF) :</strong> Achat ponctuel donnant accès à 3 prospects qualifiés et aux fonctionnalités de base, sans renouvellement automatique.</li>
                  <li><strong>Formule PRO (29 € / 19 000 XOF par mois) :</strong> Abonnement mensuel à tacite reconduction, fournissant un quota de 90 prospects qualifiés mensuels.</li>
                  <li><strong>Formule AGENCE (59 € / 39 000 XOF par mois) :</strong> Abonnement mensuel fournissant 450 prospects qualifiés mensuels, gestion de sous-comptes et multi-avatars.</li>
                  <li><strong>Résiliation :</strong> Tout abonnement mensuel peut être résilié à tout moment depuis les paramètres de facturation en un clic, sans frais ni préavis. La résiliation prend effet à l&apos;issue de la période mensuelle en cours.</li>
                </ul>
              </div>

              <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 space-y-2">
                <h3 className="font-bold text-white text-sm">Article 3 - Garantie &quot;Contact Inexploitable&quot; (Anti-Gaspillage)</h3>
                <p>
                  Prospectizi intègre un mécanisme automatique de remboursement de quota : si un prospect qualifié comporte un numéro de téléphone invalide ou un contact inexploitable, l&apos;Utilisateur peut le signaler via l&apos;interface sous 72 heures. Après vérification, un nouveau crédit de prospect est recrédité immédiatement sur le compte de l&apos;Utilisateur.
                </p>
              </div>

              <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 space-y-2">
                <h3 className="font-bold text-white text-sm">Article 4 - Responsabilité de l&apos;Utilisateur</h3>
                <p>
                  L&apos;Utilisateur est seul responsable des messages qu&apos;il expédie à ses prospects, de la conformité de ses démarches commerciales avec les règles de prospection B2B de son pays d&apos;établissement, et de l&apos;intégration obligatoire d&apos;un moyen simple de désinscription (opt-out) dans chaque courriel ou message adressé.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: POLITIQUE DE CONFIDENTIALITÉ & RGPD B2B */}
          {activeTab === 'rgpd' && (
            <div className="space-y-4">
              <div className="bg-dark-800 p-4 rounded-xl border border-cyan/30 space-y-2">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan" />
                  Cadre Réglementaire &amp; Protection des Données Personnelles
                </h3>
                <p>
                  Prospectizi opère en conformité avec la loi n° 2017-20 du 20 avril 2018 portant Code du numérique en République du Bénin, la Convention de l&apos;Union Africaine sur la cybersécurité et la protection des données personnelles, ainsi que le Règlement Général sur la Protection des Données (RGPD UE 2016/679) pour ses utilisateurs et partenaires internationaux.
                </p>
                <div className="p-3 bg-dark-900 rounded-lg text-slate-300 space-y-1.5 border border-dark-700">
                  <p><strong>Base Légale :</strong> L&apos;Intérêt Légitime pour la prospection interentreprises (B2B).</p>
                  <p>
                    En prospection B2B, la réglementation permet la prise de contact professionnelle à condition que :
                  </p>
                  <ol className="list-decimal list-inside space-y-1 pl-2 text-slate-400">
                    <li>La sollicitation s&apos;adresse à la personne en sa qualité professionnelle.</li>
                    <li>L&apos;objet présente un lien direct avec l&apos;activité professionnelle ou la fonction ciblée.</li>
                    <li>Le destinataire dispose d&apos;un moyen simple et gratuit de s&apos;opposer à toute future communication (opt-out).</li>
                  </ol>
                </div>
              </div>

              <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 space-y-2">
                <h3 className="font-bold text-white text-sm">1. Nature des Données Traitées</h3>
                <p>Prospectizi traite exclusivement des données à caractère professionnel publiquement accessibles :</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Identité professionnelle : Nom, prénom, civilité, fonction.</li>
                  <li>Coordonnées d&apos;entreprise : Dénomination sociale, adresse, téléphone professionnel, site web officiel, réseaux professionnels.</li>
                  <li><strong>Exclusion formelle :</strong> Aucune donnée sensible (santé, opinions politiques, croyances, données bancaires privées des prospects) n&apos;est collectée ni traitée.</li>
                </ul>
              </div>

              <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 space-y-2">
                <h3 className="font-bold text-white text-sm">2. Origine des Données (Sources Publiques)</h3>
                <p>
                  Les données indexées proviennent exclusivement de registres légaux publics, d&apos;annuaires professionnels publics, des sites web officiels des entreprises concernées et des fiches locales publiques (Google Maps, Instagram, LinkedIn, Facebook).
                </p>
              </div>

              <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 space-y-2">
                <h3 className="font-bold text-white text-sm">3. Durée de Conservation des Données</h3>
                <p>
                  Les données de contact associées à un compte sont conservées pendant toute la durée active de l&apos;abonnement. À compter de la résiliation du compte, elles sont purgées définitivement sous un délai maximal de 90 jours calendaires.
                </p>
              </div>

              <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 space-y-2">
                <h3 className="font-bold text-white text-sm">4. Vos Droits &amp; Droit d&apos;Opposition</h3>
                <p>
                  Toute personne physique dont les coordonnées professionnelles figurent dans nos répertoires dispose d&apos;un droit d&apos;accès, de rectification, d&apos;opposition et d&apos;effacement immédiat.
                </p>
                <div className="p-3 bg-dark-900 rounded-lg border border-dark-700 text-xs">
                  <p className="text-white font-semibold">Pour exercer votre droit de suppression sans délai :</p>
                  <p className="text-cyan font-mono mt-1">E-mail dédié : contact@prospectizi.com</p>
                  <p className="text-slate-400 mt-1">
                    Toute demande motivée par e-mail est traitée dans un délai inférieur à 48 heures ouvrées avec confirmation écrite et inscription en liste d&apos;exclusion définitive.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="border-t border-dark-700 pt-4 mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>Dernière mise à jour légale : Octobre 2026</span>
          <button
            onClick={handleClose}
            className="py-2 px-5 rounded-xl font-bold bg-cyan hover:bg-cyan-intense text-dark-950 transition-all shadow-cyan-glow hover:scale-105"
          >
            J&apos;ai compris et j&apos;accepte
          </button>
        </div>
      </div>
    </div>
  );
}
