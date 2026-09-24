"use client";

import React, { useState } from 'react';
import { X, Play, Video, CheckCircle2, Monitor, ArrowRight, Sparkles } from 'lucide-react';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoTutorialModal({ isOpen, onClose }: VideoTutorialModalProps) {
  const [activeScene, setActiveScene] = useState(0);

  if (!isOpen) return null;

  const scenes = [
    {
      step: "01",
      timing: "0:00 – 0:15",
      title: "Introduction & Accueil",
      visual: "Page d'accueil de Prospectizi (Dashboard) avec vue sur les priorités du jour.",
      script: "« Salut ! Je suis Edith, créatrice de Prospectizi. Dans cette vidéo, je vais te montrer comment trouver tes premiers prospects ultra-qualifiés et les contacter en 2 minutes chrono. C'est parti ! »",
      tips: "Présentation dynamique, webcam dans le coin inférieur droit, sourire et promesse immédiate."
    },
    {
      step: "02",
      timing: "0:15 – 0:45",
      title: "Analyse ICP & Avatar Client",
      visual: "Page Avatar Client (/avatar) avec formulaire 4 questions et panneau 'Ce que l'IA a compris'.",
      script: "« Étape 1 : l'Avatar Client. Clique sur Avatar Client dans le menu. Remplis ton métier, ton offre irrésistible et ta cible idéale. Valide → Prospectizi calibre instantanément l'IA et génère ta première synthèse personnalisée ! »",
      tips: "Montrez la vitesse d'adaptation de l'IA en temps réel."
    },
    {
      step: "03",
      timing: "0:45 – 1:15",
      title: "Recherche de Prospects Multi-Canaux",
      visual: "Page Prospects (/prospects) avec sélection du canal Google Maps / LinkedIn et clic sur Rechercher.",
      script: "« Étape 2 : la recherche. Tape ton secteur et ta ville. Choisis ton canal (Google Maps, LinkedIn, etc.) et clique sur Rechercher. Prospectizi analyse le web et filtre uniquement les entreprises 100% contactables avec de vraies failles détectées ! »",
      tips: "Insistez sur la règle clé : zéro prospect mort, 100% avec email, WhatsApp ou réseau."
    },
    {
      step: "04",
      timing: "1:15 – 1:45",
      title: "One-Click Outreach & WhatsApp",
      visual: "Fiche prospect à 2 colonnes avec clic sur le bouton WhatsApp et bouton Copier.",
      script: "« Étape 3 : le contact. Oublie les copier-coller interminables ! Clique sur 'Ouvrir sur WhatsApp' : l'application s'ouvre avec le message court rédigé par l'IA déjà prêt. Tu n'as plus qu'à cliquer sur envoyer ! »",
      tips: "Montrez à quel point cela élimine la fatigue mentale de la prospection."
    },
    {
      step: "05",
      timing: "1:45 – 2:10",
      title: "Suivi CRM & Focus du Jour",
      visual: "Changement de statut en 'En discussion' ou 'Gagné' et retour sur le Dashboard.",
      script: "« Étape 4 : le suivi. Change le statut de ton prospect en un clic. Chaque matin, ton Dashboard 'Focus du Jour' t'indique exactement qui relancer sans oublier personne. »",
      tips: "Soulignez que le SaaS sert aussi de CRM de pilotage quotidien."
    },
    {
      step: "06",
      timing: "2:10 – 2:30",
      title: "Conclusion & Offre Découverte",
      visual: "Page Tarifs avec mise en valeur de l'offre Découverte à 1 € et Plan PRO.",
      script: "« Tu vois, c'est simple, rapide et orienté résultats. Teste tes 3 premiers prospects pour seulement 1 € dès maintenant et commence à signer tes premiers contrats cette semaine ! »",
      tips: "Call to Action direct invitant à tester immédiatement."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-dark-900 border border-cyan/40 rounded-2xl max-w-3xl w-full p-6 md:p-8 relative shadow-cyan-glow-lg max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-dark-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-cyan/15 border border-cyan/40 flex items-center justify-center text-cyan shadow-cyan-border">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Vidéo Tutorielle Prospectizi (2 min 30)</h2>
              <span className="text-[10px] bg-cyan/20 text-cyan border border-cyan/40 px-2 py-0.5 rounded-full font-bold">
                Script Loom Prêt
              </span>
            </div>
            <p className="text-xs text-slate-400">Guide de tournage scène par scène pour présenter l&apos;outil à vos utilisateurs.</p>
          </div>
        </div>

        {/* Interactive Scenes Stepper */}
        <div className="grid grid-cols-6 gap-2 mb-6">
          {scenes.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveScene(idx)}
              className={`p-2 rounded-xl text-center border transition-all ${
                activeScene === idx
                  ? "bg-cyan/15 border-cyan text-cyan shadow-cyan-border"
                  : "bg-dark-800 border-dark-600 text-slate-400 hover:text-white"
              }`}
            >
              <div className="text-[10px] font-bold">Scène {s.step}</div>
              <div className="text-[9px] truncate">{s.timing.split('–')[0].trim()}</div>
            </button>
          ))}
        </div>

        {/* Current Scene Display Card */}
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5 mb-6 space-y-4">
          <div className="flex justify-between items-center border-b border-dark-700 pb-3">
            <div>
              <span className="text-xs font-bold text-cyan tracking-wider uppercase">Scène {scenes[activeScene].step} / 06</span>
              <h3 className="text-lg font-bold text-white">{scenes[activeScene].title}</h3>
            </div>
            <div className="text-xs font-mono text-cyan bg-cyan/10 px-2.5 py-1 rounded-lg border border-cyan/30">
              ⏱ {scenes[activeScene].timing}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Visuel à afficher à l&apos;écran :</div>
            <div className="bg-dark-900/80 p-3 rounded-xl border border-dark-700 text-xs text-slate-300 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-cyan shrink-0" />
              <span>{scenes[activeScene].visual}</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-cyan uppercase tracking-wider mb-1">Script mot à mot à lire :</div>
            <div className="bg-cyan/5 border border-cyan/20 p-3.5 rounded-xl text-sm text-slate-200 italic font-medium leading-relaxed">
              {scenes[activeScene].script}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Conseil de tournage :</div>
            <div className="text-xs text-slate-400">
              💡 {scenes[activeScene].tips}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <button
            disabled={activeScene === 0}
            onClick={() => setActiveScene(prev => prev - 1)}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-dark-800 text-slate-300 disabled:opacity-40 hover:bg-dark-700"
          >
            ← Scène Précédente
          </button>

          <span className="text-xs text-slate-400">
            Conseil : Utilisez l&apos;extension gratuite Loom pour enregistrer votre écran et votre micro.
          </span>

          <button
            disabled={activeScene === scenes.length - 1}
            onClick={() => setActiveScene(prev => prev + 1)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center gap-1.5 shadow-cyan-border disabled:opacity-40"
          >
            <span>Scène Suivante</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
