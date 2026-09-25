"use client";

import React, { useState, useRef } from 'react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { 
  Zap, 
  Sparkles, 
  Play, 
  Pause,
  Check, 
  ArrowRight, 
  Clock, 
  Download, 
  CreditCard, 
  Video,
  Gift
} from 'lucide-react';
import AuthModal from './AuthModal';
import LegalModal from './LegalModal';

export default function LandingPage() {
  const { openAuthModal } = useStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-cyan selection:text-dark-950">
      {/* 1. PUBLIC NAVBAR */}
      <header className="h-16 md:h-20 border-b border-dark-750 bg-dark-900/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-cyan to-cyan-intense flex items-center justify-center text-dark-950 font-black shadow-cyan-glow">
            <Zap className="w-5 h-5 fill-dark-950" />
          </div>
          <div>
            <span className="text-xl font-black text-white tracking-tight">Prospectizi</span>
            <span className="text-[10px] text-cyan font-semibold block leading-none">Trouver &amp; contactez mieux</span>
          </div>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#demo" className="hover:text-cyan transition-colors">Démo Vidéo</a>
          <a href="#features" className="hover:text-cyan transition-colors">Fonctionnalités</a>
          <a href="#pricing" className="hover:text-cyan transition-colors">Tarifs</a>
          <a href="#bonus" className="hover:text-cyan transition-colors">Bonus Loom</a>
        </nav>

        {/* Auth CTA Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openAuthModal('login')}
            className="py-2 px-3.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-dark-800 hover:bg-dark-700 border border-dark-600 transition-colors"
          >
            Se Connecter
          </button>

          <button
            onClick={() => openAuthModal('register')}
            className="py-2 px-4 rounded-xl text-xs font-black bg-cyan hover:bg-cyan-intense text-dark-950 shadow-cyan-glow transition-all hover:scale-105 active:scale-95"
          >
            Tester pour 1 €
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 md:pt-24 pb-16 md:pb-24 px-4 overflow-hidden text-center">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan/15 border border-cyan/40 text-cyan text-xs font-bold uppercase tracking-wider shadow-cyan-border">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Moteur d&apos;Acquisition B2B &amp; Messages IA Personnalisés</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Trouvez les bons prospects. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-cyan-intense to-white">
              Contactez-les mieux.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Fini les heures perdues à prospecter dans le vide. Prospectizi détecte pour vous des entreprises ciblées, identifie leurs failles réelles et rédige le message parfait pour décrocher une réponse en moins de 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => openAuthModal('register')}
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-black text-sm bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-2 shadow-cyan-glow transition-all hover:scale-105 active:scale-95"
            >
              <span>Tester pour 1 € seulement (3 Leads Complets)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#demo"
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-sm bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-600 flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4 text-cyan fill-cyan" />
              <span>Voir la Démo Vidéo</span>
            </a>
          </div>

          {/* Social proof pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-6">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Contacts directs 100% vérifiés
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Mobile Money &amp; Cartes Locales
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Sans engagement • Résiliable en 1 clic
            </span>
          </div>
        </div>
      </section>

      {/* 3. DÉMO VIDÉO OFFICIELLE EN TEMPS RÉEL (LECTEUR VIDÉO MP4) */}
      <section id="demo" className="py-16 bg-dark-900 border-y border-dark-750 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 text-cyan text-xs font-bold uppercase tracking-wider border border-cyan/30">
              <Video className="w-3.5 h-3.5" />
              Démonstration Vidéo en Direct
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Regardez Prospectizi tourner en temps réel
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Visite guidée complète de la plateforme : de la configuration de l&apos;Avatar à l&apos;envoi WhatsApp direct et l&apos;Audit IA mensuel.
            </p>
          </div>

          {/* Video Player Card */}
          <div className="bg-dark-950 border border-cyan/40 rounded-2xl overflow-hidden shadow-cyan-glow relative">
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src="/prospectizi_demo_video.mp4"
                poster="/scene1_landing.png"
                controls
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Play Button Overlay when paused */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-all group"
                >
                  <div className="w-20 h-20 rounded-full bg-cyan text-dark-950 flex items-center justify-center shadow-cyan-glow group-hover:scale-110 transition-transform">
                    <Play className="w-9 h-9 fill-dark-950 translate-x-0.5" />
                  </div>
                </button>
              )}
            </div>

            {/* Video Controls Footer */}
            <div className="p-4 bg-dark-900 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white">Vidéo Démo Produit (Test Réel de la Plateforme)</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/prospectizi_demo_video.mp4"
                  download="PROSPECTIZI_Demo_Video.mp4"
                  className="text-cyan hover:underline flex items-center gap-1 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger la Vidéo (.MP4)</span>
                </a>

                <span className="text-slate-600">•</span>

                <a
                  href="/PROSPECTIZI_Script_Video_Demo_Landing_Page.docx"
                  download="PROSPECTIZI_Script_Video_Demo_Landing_Page.docx"
                  className="text-cyan hover:underline flex items-center gap-1 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger le Script (.DOCX)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FONCTIONNALITÉS CLÉS (3 ÉTAPES) */}
      <section id="features" className="py-20 px-4 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Une mécanique commerciale en 3 piliers
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Tout a été optimisé pour vous faire passer de la recherche à la prise de contact en moins de 15 secondes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pilier 1 */}
          <div className="bg-dark-900 border border-dark-700 hover:border-cyan/50 rounded-2xl p-6 space-y-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan/15 text-cyan flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Avatar Client &amp; Offre</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Définissez votre cible, votre bénéfice garanti et votre ton. L&apos;IA calibre en temps réel vos angles d&apos;attaque pour toucher directement les points sensibles des décideurs.
            </p>
          </div>

          {/* Pilier 2 */}
          <div className="bg-dark-900 border border-dark-700 hover:border-cyan/50 rounded-2xl p-6 space-y-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan/15 text-cyan flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Moteur d&apos;Acquisition B2B</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Détection multi-sources (Google Maps, Annuaire local, LinkedIn). Chaque prospect est vérifié avec son téléphone actif, son email et une note de pertinence de 60 à 100 points.
            </p>
          </div>

          {/* Pilier 3 */}
          <div className="bg-dark-900 border border-cyan/40 rounded-2xl p-6 space-y-4 shadow-cyan-border">
            <div className="w-12 h-12 rounded-xl bg-cyan text-dark-950 flex items-center justify-center font-black text-lg shadow-cyan-glow">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Messages Courts &amp; WhatsApp Direct</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              5 messages pré-rédigés de moins de 75 mots, sans jargon. Un clic sur le bouton WhatsApp et votre message est prêt à partir. Fini le syndrome de la page blanche !
            </p>
          </div>
        </div>
      </section>

      {/* 5. TARIFS (PRICING) */}
      <section id="pricing" className="py-20 bg-dark-900/60 border-t border-dark-750 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 text-cyan text-xs font-bold uppercase tracking-wider border border-cyan/30">
              <CreditCard className="w-3.5 h-3.5" />
              Tarifs Clairs &amp; Sans Engagement
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Une formule pour chaque niveau d&apos;activité
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Commencez avec l&apos;offre Découverte pour 1 € ou débloquez un flux régulier avec PRO et AGENCE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Découverte 1 € */}
            <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 bg-dark-800 px-2.5 py-0.5 rounded-full">
                  Prise en main
                </span>
                <h3 className="text-xl font-bold text-white mt-3">DÉCOUVERTE</h3>
                <div className="my-4">
                  <span className="text-3xl font-black text-white">1 €</span>
                  <span className="text-xs text-slate-400 block mt-0.5">Paiement unique</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan" />
                    <span><strong>3 Prospects Qualifiés</strong> complets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan" />
                    <span>Messages IA personnalisés complets</span>
                  </li>
                  <li className="flex items-center gap-2 text-cyan">
                    <Gift className="w-4 h-4" />
                    <span>+3 prospects offerts via avis Loom</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openAuthModal('register')}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-600 transition-colors"
              >
                Commencer à 1 €
              </button>
            </div>

            {/* PRO 29 € */}
            <div className="bg-dark-900 border-2 border-cyan rounded-2xl p-6 relative flex flex-col justify-between shadow-cyan-border">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cyan text-dark-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-cyan-glow">
                ★ LE PLUS POPULAIRE ★
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-cyan bg-cyan/15 px-2.5 py-0.5 rounded-full border border-cyan/40">
                  Freelances &amp; Consultants
                </span>
                <h3 className="text-xl font-bold text-white mt-3">PRO</h3>
                <div className="my-4">
                  <span className="text-3xl font-black text-cyan">29 €</span>
                  <span className="text-xs text-slate-400 block mt-0.5">/ mois sans engagement</span>
                </div>
                <div className="bg-dark-800 p-2 rounded-lg text-[11px] text-cyan font-mono mb-4 border border-cyan/20">
                  0,32 € par prospect qualifié
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan" />
                    <span><strong>90 Prospects Qualifiés / mois</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan" />
                    <span>Exports CSV / Excel illimités</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan" />
                    <span>Module <strong>Audit Mensuel IA</strong> inclus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan" />
                    <span>Support direct WhatsApp prioritaire</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openAuthModal('register')}
                className="w-full py-3 rounded-xl text-xs font-black bg-cyan hover:bg-cyan-intense text-dark-950 shadow-cyan-glow transition-all hover:scale-105 active:scale-95"
              >
                Souscrire au plan PRO (29 €)
              </button>
            </div>

            {/* AGENCE 59 € */}
            <div className="bg-dark-900 border border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  Agences &amp; Équipes
                </span>
                <h3 className="text-xl font-bold text-white mt-3">AGENCE</h3>
                <div className="my-4">
                  <span className="text-3xl font-black text-white">59 €</span>
                  <span className="text-xs text-slate-400 block mt-0.5">/ mois sans engagement</span>
                </div>
                <div className="bg-dark-800 p-2 rounded-lg text-[11px] text-amber-400 font-mono mb-4 border border-amber-500/20">
                  0,13 € par prospect (5x plus de volume)
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span><strong>450 Prospects Qualifiés / mois</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Accès <strong>Équipe (5 sous-comptes)</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Multi-Avatars (jusqu&apos;à 5 offres)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Audit Mensuel IA &amp; support VIP</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openAuthModal('register')}
                className="w-full py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-dark-950 transition-colors"
              >
                Passer sur AGENCE (59 €)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BONUS LOOM */}
      <section id="bonus" className="py-16 px-4 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-cyan/40 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan/15 text-cyan border border-cyan/30 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Envie de prospects offerts ?</h3>
              <p className="text-xs text-slate-400 mt-0.5 max-w-md">
                Partagez un rapide retour d&apos;expérience vidéo de 60 secondes sur Loom et débloquez automatiquement <strong>+3 prospects qualifiés gratuits</strong> sur votre compte !
              </p>
            </div>
          </div>

          <button
            onClick={() => openAuthModal('register')}
            className="py-2.5 px-5 rounded-xl text-xs font-bold bg-cyan hover:bg-cyan-intense text-dark-950 shrink-0 shadow-cyan-glow transition-all"
          >
            Créer un compte &amp; Réclamer
          </button>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="mt-auto border-t border-dark-800 bg-dark-950 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Prospectizi</span>
            <span>— Trouver &amp; contactez mieux</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setLegalOpen(true)} className="hover:text-cyan transition-colors underline">
              Mentions Légales &amp; CGU
            </button>
            <button onClick={() => setLegalOpen(true)} className="hover:text-cyan transition-colors underline">
              Politique RGPD B2B
            </button>
          </div>

          <div className="text-slate-500">
            © 2026 Prospectizi SAS. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* Modales */}
      <AuthModal />
      <LegalModal />
    </div>
  );
}
