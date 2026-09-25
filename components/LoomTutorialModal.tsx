"use client";

import React, { useState } from 'react';
import { 
  X, 
  Video, 
  ExternalLink, 
  Gift, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  ArrowRight,
  Clock,
  Send,
  HelpCircle
} from 'lucide-react';

interface LoomTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSubmitLoom: () => void;
}

export default function LoomTutorialModal({ isOpen, onClose, onOpenSubmitLoom }: LoomTutorialModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: "1. Accéder à Loom (Gratuit & Sans Frais)",
      desc: "Rendez-vous sur loom.com ou installez l'extension gratuite Chrome Loom. Aucune carte bancaire requise.",
      tip: "Astuce : Vous n'avez même pas besoin d'installer de logiciel, l'extension navigateur suffit !",
      actionText: "Ouvrir Loom.com",
      actionUrl: "https://www.loom.com",
    },
    {
      step: 2,
      title: "2. Enregistrer 60 secondes de vidéo sincère",
      desc: "Cliquez sur 'Record'. Partagez votre écran avec votre tableau de bord Prospectizi et dites en 1 minute ce que vous appréciez (la précision des données, les messages personnalisés, le gain de temps).",
      tip: "Pas besoin d'être un pro de la vidéo : la spontanéité et la franchise sont ce qui compte le plus !",
      actionText: "Exemple de script d'avis",
      actionUrl: null,
    },
    {
      step: 3,
      title: "3. Coller votre lien et recevoir +3 prospects offerts",
      desc: "Dès que l'enregistrement se termine, cliquez sur 'Copy Link' sur Loom. Revenez ici et collez votre lien. Dès validation, 3 prospects qualifiés sont ajoutés à votre quota !",
      tip: "Nos modérateurs valident votre vidéo sous 24h et vos 3 prospects sont débloqués immédiatement.",
      actionText: "Envoyer mon lien maintenant",
      actionUrl: null,
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-dark-900 border border-cyan/40 rounded-2xl max-w-2xl w-full p-6 md:p-8 relative shadow-cyan-glow-lg max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-dark-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-cyan/15 text-cyan border border-cyan/40 flex items-center justify-center shrink-0">
            <Gift className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan/20 text-cyan text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" />
              Bonus Spécial Utilisateur
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              Comment obtenir +3 prospects offerts grâce à Loom ?
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Partagez votre retour d&apos;expérience en 60 secondes chrono pour recharger votre quota gratuitement.
            </p>
          </div>
        </div>

        {/* Simulated Video Player / Visual Guide */}
        <div className="relative bg-dark-950 border border-cyan/30 rounded-xl overflow-hidden mb-6 aspect-video flex flex-col items-center justify-center p-6 text-center group">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan/10 via-transparent to-purple-500/10 pointer-events-none" />
          
          <div className="relative z-10 max-w-md space-y-3">
            <div className="w-14 h-14 rounded-full bg-cyan text-dark-950 flex items-center justify-center mx-auto shadow-cyan-glow group-hover:scale-110 transition-transform cursor-pointer"
                 onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Clock className="w-7 h-7 animate-spin" /> : <Play className="w-7 h-7 fill-dark-950 translate-x-0.5" />}
            </div>

            <div className="text-sm font-bold text-white">
              {isPlaying ? "Tutoriel interactif Loom en cours..." : "Guide Vidéo Pas-à-Pas (1 minute)"}
            </div>
            <p className="text-xs text-slate-400">
              {isPlaying 
                ? "Étape en cours : Ouvrez loom.com, enregistrez votre écran avec l'interface Prospectizi, puis collez l'URL !"
                : "Cliquez pour lancer le guide animé ou consultez les 3 étapes ci-dessous :"}
            </p>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-400 bg-dark-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-dark-700">
            <span className="flex items-center gap-1.5 text-cyan font-bold">
              <Video className="w-3.5 h-3.5" />
              Durée requise : 60 secondes
            </span>
            <span className="text-emerald-400 font-bold">
              Récompense : +3 Leads Qualifiés
            </span>
          </div>
        </div>

        {/* 3 Step Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                activeStep === s.step
                  ? 'bg-cyan/15 border-cyan text-white shadow-cyan-border'
                  : 'bg-dark-800 border-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider block ${
                activeStep === s.step ? 'text-cyan' : 'text-slate-400'
              }`}>
                Étape {s.step}
              </span>
              <span className="text-xs font-bold truncate block">
                {s.step === 1 ? "1. Aller sur Loom" : s.step === 2 ? "2. 60s d'enregistrement" : "3. Gagner +3 leads"}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Step Detail Card */}
        <div className="bg-dark-800/90 border border-dark-700 rounded-xl p-4 mb-6 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan" />
            {steps[activeStep - 1].title}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {steps[activeStep - 1].desc}
          </p>
          <div className="p-3 bg-dark-900 rounded-lg border border-cyan/20 text-xs text-cyan flex items-start gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{steps[activeStep - 1].tip}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-dark-700">
          <a
            href="https://www.loom.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-bold bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-600 flex items-center justify-center gap-2 transition-colors"
          >
            <span>Ouvrir Loom.com</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan" />
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenSubmitLoom();
            }}
            className="w-full sm:w-auto py-2.5 px-6 rounded-xl text-xs font-extrabold bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-2 shadow-cyan-glow transition-all hover:scale-105"
          >
            <Send className="w-4 h-4 text-dark-950" />
            <span>J&apos;ai mon lien Loom : Envoyer &amp; Réclamer +3 leads</span>
          </button>
        </div>
      </div>
    </div>
  );
}
