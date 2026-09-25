"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { 
  UserCheck, 
  Sparkles, 
  Save, 
  Wand2, 
  MessageCircle, 
  Target, 
  Clock, 
  Briefcase, 
  Award, 
  ShieldCheck
} from 'lucide-react';
import { AvatarProfile } from '@/lib/types';

export default function AvatarPage() {
  const { avatar, updateAvatar } = useStore();
  const [formData, setFormData] = useState<AvatarProfile>(avatar);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(avatar);
  }, [avatar]);

  // Presets pour tous les métiers du digital
  const presets = [
    {
      title: "🤖 IA Engineer / Auto",
      profession: "IA Engineer & Spécialiste Automatisation / Chatbots",
      offer: "Intégration d'agents d'IA intelligents, qualification automatique des leads 24/7 et automatisation des processus internes.",
      target_audience: "PME, cabinets de conseil, startups, plateformes e-commerce et agences.",
      major_benefit: "Économiser 15h de travail manuel par semaine et traiter 100% des prospects en moins de 60 secondes.",
      tone: "direct" as const,
    },
    {
      title: "💻 Développeur Web",
      profession: "Développeur Web & Créateur de Sites / SaaS",
      offer: "Refonte de sites web ultra-rapides, responsives et intégration de tunnels de devis automatisés.",
      target_audience: "PME locales, cliniques privées, architectes, agences immobilières et commerces.",
      major_benefit: "Doubler les prises de contact directes et éliminer les pertes de clients sur mobile.",
      tone: "direct" as const,
    },
    {
      title: "📱 Community Manager",
      profession: "Community Manager & Social Media Manager",
      offer: "Gestion complète des réseaux sociaux, création de 12 Reels/TikToks par mois et acquisition d'abonnés engagés.",
      target_audience: "Marques e-commerce, restaurants, instituts de beauté et prestataires de services locaux.",
      major_benefit: "Générer +10 000 vues qualifiées par mois et transformer l'audience en clients fidèles.",
      tone: "chaleureux" as const,
    },
    {
      title: "🎯 Expert Ads / Média Buyer",
      profession: "Expert Publicité Meta & Google Ads",
      offer: "Lancement et optimisation de campagnes publicitaires à fort retour sur investissement (ROAS).",
      target_audience: "Entreprises de services, écoles privées, promoteurs et boutiques en ligne.",
      major_benefit: "Acquérir des leads qualifiés à moins de 5 € et garantir un retour sur investissement mesurable.",
      tone: "persuasif" as const,
    },
    {
      title: "✍️ Copywriter / Rédacteur",
      profession: "Copywriter & Rédacteur Web SEO",
      offer: "Réécriture persuasive de pages de vente, séquences email de closing et articles de blog positionnés sur Google.",
      target_audience: "Créateurs de formations, cabinets d'avocats, éditeurs de logiciels et coachs.",
      major_benefit: "Augmenter le taux de conversion des visiteurs de +35% sans dépenser 1 centime en publicité.",
      tone: "persuasif" as const,
    },
    {
      title: "🎨 Graphiste / Designer UI/UX",
      profession: "Graphiste & Designer UI/UX / Identité de Marque",
      offer: "Création d'identités visuelles mémorables (Logo, charte graphique, maquettes UI et plaquettes haut de gamme).",
      target_audience: "Startups, cabinets médicaux, marques de cosmétiques et entreprises en repositionnement.",
      major_benefit: "Augmenter la valeur perçue de vos services pour justifier des tarifs 30% plus élevés.",
      tone: "professionnel" as const,
    },
    {
      title: "🤝 Closer High-Ticket",
      profession: "Closer & Stratège Commercial Indépendant",
      offer: "Prise en charge des appels de vente et relance des devis endormis pour maximiser le taux de closing.",
      target_audience: "Agences de marketing, consultants et organismes de formation professionnelle.",
      major_benefit: "Signer 1 contrat sur 3 supplémentaires sur les leads qui ne répondaient plus.",
      tone: "chaleureux" as const,
    }
  ];

  const handleFieldChange = (field: keyof AvatarProfile, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    updateAvatar(updated);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    const updated = {
      ...formData,
      profession: preset.profession,
      offer: preset.offer,
      target_audience: preset.target_audience,
      major_benefit: preset.major_benefit,
      tone: preset.tone,
    };
    setFormData(updated);
    updateAvatar(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateAvatar(formData);
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 text-cyan text-xs font-bold uppercase tracking-wider mb-2 border border-cyan/30">
            <UserCheck className="w-3.5 h-3.5" />
            Paramétrage IA Avatar Client
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Définissez votre Métier Digital &amp; Client Idéal
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Que vous soyez développeur, community manager, graphiste ou copywriter, l&apos;IA calibre automatiquement vos fiches prospects et vos messages.
          </p>
        </div>

        {/* Quick Presets Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Sélection rapide par métier :</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-cyan border border-dark-600 hover:border-cyan/40 transition-colors"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form Left (7/12) vs AI Preview Right (5/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FORMULAIRE GAUCHE */}
        <div className="lg:col-span-7 bg-dark-900 border border-dark-600/90 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          {/* Reassurance note */}
          <div className="p-3 bg-cyan/10 border border-cyan/30 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">Liberté totale de saisie :</strong> Les boutons de sélection rapide ci-dessus ne sont que des exemples pour vous faire gagner du temps. Vous pouvez taper n&apos;importe quel métier (ex: <em>IA Engineering, Prompt Engineering, Consultant Cybersécurité, Data Analyst, Monteur Vidéo, Growth Hacker...</em>) : l&apos;IA calibrera automatiquement les failles et rédigera les messages adaptés aux besoins réels de vos prospects.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Métier / Activité */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-cyan" />
                Votre Métier Digital / Activité principale
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Développeur Web, Community Manager, Expert Ads, Graphiste, Copywriter..."
                value={formData.profession}
                onChange={(e) => handleFieldChange('profession', e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Offre principale irrésistible */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-cyan" />
                Votre Offre Principale (Ce que vous apportez à vos clients)
              </label>
              <textarea
                required
                rows={3}
                placeholder="Ex: Refonte de sites web modernes, création de vidéos courtes TikTok/Reels, gestion de campagnes publicitaires..."
                value={formData.offer}
                onChange={(e) => handleFieldChange('offer', e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Cible visée (ICP) */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-cyan" />
                Client Cible Visé (Secteur, taille d&apos;entreprise, localisation)
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Cabinets d'avocats, cliniques, agences immobilières, restaurants, commerces..."
                value={formData.target_audience}
                onChange={(e) => handleFieldChange('target_audience', e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Bénéfice majeur garanti */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan" />
                Bénéfice Majeur Garanti (La promesse concrète)
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Générer 2x plus de rendez-vous, capter 10 000 vues qualifiées par mois..."
                value={formData.major_benefit}
                onChange={(e) => handleFieldChange('major_benefit', e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Sélecteur de Ton & Fréquence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-cyan" />
                  Ton Rédactionnel
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => handleFieldChange('tone', e.target.value)}
                  className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="chaleureux">Chaleureux &amp; Conversationnel (Recommandé)</option>
                  <option value="professionnel">Professionnel &amp; Corporate</option>
                  <option value="direct">Direct &amp; Efficace (&lt; 50 mots)</option>
                  <option value="persuasif">Persuasif &amp; Axé Résultats</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cyan" />
                  Fréquence des Relances
                </label>
                <select
                  value={formData.followup_frequency}
                  onChange={(e) => handleFieldChange('followup_frequency', e.target.value)}
                  className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="J+3">J+3 (Recommandé pour WhatsApp / Direct)</option>
                  <option value="J+5">J+5 (Standard B2B)</option>
                  <option value="J+10">J+10 (Rythme espacé)</option>
                </select>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-dark-700/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan" />
                Sauvegarde permanente sur votre compte
              </span>

              <button
                type="submit"
                disabled={isSaving}
                className="py-3 px-6 rounded-xl font-extrabold text-xs md:text-sm bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center gap-2 shadow-cyan-glow transition-all hover:scale-105"
              >
                <Save className="w-4 h-4 text-dark-950" />
                <span>{isSaving ? "Sauvegarde en cours..." : "Sauvegarder & Synchroniser l'IA"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* APERÇU IA TEMPS RÉEL (DROITE) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-b from-dark-900 to-dark-950 border-2 border-cyan/40 rounded-2xl p-6 relative shadow-cyan-glow space-y-5">
            <div className="flex items-center justify-between border-b border-dark-700 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan animate-ping" />
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  Ce que l&apos;IA a compris
                </h3>
              </div>
              <span className="text-[10px] font-bold text-cyan bg-cyan/15 px-2 py-0.5 rounded-full border border-cyan/30">
                Temps Réel
              </span>
            </div>

            {/* Dynamic IA Card */}
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-dark-800/80 rounded-xl border border-dark-700 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Métier &amp; Expertise :</span>
                <p className="text-white font-medium">
                  Spécialiste en tant que <strong className="text-cyan">{formData.profession || "[Votre Métier Digital]"}</strong>.
                </p>
              </div>

              <div className="p-3 bg-dark-800/80 rounded-xl border border-dark-700 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cible visée retenue :</span>
                <p className="text-slate-200">
                  {formData.target_audience || "[Définissez votre cible]"}
                </p>
              </div>

              <div className="p-3 bg-dark-800/80 rounded-xl border border-dark-700 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Proposition de valeur irrésistible :</span>
                <p className="text-cyan font-semibold">
                  {formData.major_benefit || "[Définissez votre promesse]"}
                </p>
              </div>

              <div className="p-3 bg-dark-800/80 rounded-xl border border-dark-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ton &amp; Style de rédaction :</span>
                  <span className="text-white font-bold capitalize">{formData.tone} (Moins de 75 mots, ton &quot;Je&quot;)</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cadence :</span>
                  <span className="text-cyan font-mono font-bold">{formData.followup_frequency}</span>
                </div>
              </div>
            </div>

            {/* Magic Setup Banner */}
            <div className="p-3.5 bg-cyan/10 border border-cyan/30 rounded-xl text-xs space-y-1.5">
              <div className="font-bold text-cyan flex items-center gap-1.5">
                <Wand2 className="w-4 h-4" />
                <span>Expérience Magic Setup</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Dès que votre Avatar est enregistré, Prospectizi calibre l&apos;IA pour détecter les failles spécifiques à votre métier (vitesse de site, réseaux inactifs, absence de publicité) et rédiger les messages sur-mesure.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
