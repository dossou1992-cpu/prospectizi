"use client";

import React, { useState } from 'react';
import { X, Shield, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  const [tab, setTab] = useState<'mentions' | 'cgv' | 'rgpd'>('cgv');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-dark-900 border border-dark-600 rounded-2xl max-w-3xl w-full p-6 md:p-8 relative shadow-2xl max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-dark-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Cadre Légal & Conformité Prospectizi</h2>
            <p className="text-xs text-slate-400">Conditions Générales, Droit de rétractation et RGPD B2B</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-dark-700 mb-5 gap-4">
          <button
            onClick={() => setTab('cgv')}
            className={`pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              tab === 'cgv' ? 'border-cyan text-cyan' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            CGU / CGV & Rétractation
          </button>
          <button
            onClick={() => setTab('rgpd')}
            className={`pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              tab === 'rgpd' ? 'border-cyan text-cyan' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            RGPD & Données Publiques
          </button>
          <button
            onClick={() => setTab('mentions')}
            className={`pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              tab === 'mentions' ? 'border-cyan text-cyan' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Mentions Légales
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto pr-2 text-xs text-slate-300 space-y-4 flex-1">
          {tab === 'cgv' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-cyan/10 border border-cyan/30 rounded-xl">
                <h4 className="font-bold text-cyan text-sm mb-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Offre Découverte à 1 € & Droit de Rétractation
                </h4>
                <p className="text-slate-200 leading-relaxed">
                  L&apos;offre Découverte à 1 € donne un accès immédiat à un quota fixe non récurrent de 3 prospects ultra-qualifiés. Conformément aux dispositions légales sur la fourniture de contenus et services numériques à exécution immédiate, en validant son achat et en générant ses fiches, l&apos;utilisateur renonce expressément à son droit de rétractation.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">Abonnements PRO & AGENCE</h4>
                <p className="leading-relaxed">
                  Les abonnements PRO (29 € / mois) et AGENCE (59 € / mois) sont souscrits sans engagement de durée minimale et renouvelés tacitement à chaque échéance mensuelle. L&apos;utilisateur peut annuler à tout moment en un clic depuis ses paramètres. Tout mois entamé reste dû et l&apos;accès demeure actif jusqu&apos;à la fin du cycle en cours.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">Règles des Bonus Loom</h4>
                <p className="leading-relaxed">
                  L&apos;attribution des 3 prospects bonus gratuits est conditionnée par l&apos;envoi d&apos;une vidéo Loom de retour authentique et l&apos;acceptation sans réserve de son utilisation à des fins promotionnelles par Prospectizi.
                </p>
              </div>
            </div>
          )}

          {tab === 'rgpd' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Origine des Données (100% Publiques)</h4>
                <p className="leading-relaxed">
                  Prospectizi extrait et qualifie exclusivement des informations professionnelles rendues publiques par les entreprises elles-mêmes sur leurs fiches Google Maps, profils LinkedIn d&apos;entreprise, annuaires publics et sites web officiels.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Usage Strictement B2B</h4>
                <p className="leading-relaxed">
                  L&apos;utilisation des données générées par le service est strictement réservée à la prospection commerciale inter-entreprises (B2B). Toute utilisation à des fins de spam ou de démarchage de particuliers non professionnels est prohibée.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Sécurité & Cloisonnement RLS</h4>
                <p className="leading-relaxed">
                  Toutes les données de recherche, listes de prospects et messages personnalisés sont cloisonnées au niveau de la base de données via la technologie PostgreSQL Row Level Security (RLS) : aucun utilisateur ne peut accéder aux prospects ou avatars d&apos;un autre client.
                </p>
              </div>
            </div>
          )}

          {tab === 'mentions' && (
            <div className="space-y-3">
              <p><strong>Éditeur du service :</strong> Prospectizi SaaS</p>
              <p><strong>Contact support :</strong> dossou1992@gmail.com / WhatsApp Support</p>
              <p><strong>Hébergement Frontend :</strong> Vercel Inc. (San Francisco, CA, USA)</p>
              <p><strong>Base de Données Cloud :</strong> Supabase Inc.</p>
              <p><strong>Passerelles de paiement :</strong> Flutterwave Inc. & Lemon Squeezy</p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-dark-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-dark-700 hover:bg-dark-600 text-white transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
