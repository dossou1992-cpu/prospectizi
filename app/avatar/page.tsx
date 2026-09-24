"use client";

import React, { useState } from 'react';
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
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { AvatarProfile } from '@/lib/types';

export default function AvatarPage() {
  const { avatar, updateAvatar, searchProspects, prospects } = useStore();
  const [formData, setFormData] = useState<AvatarProfile>(avatar);
  const [isSaving, setIsSaving] = useState(false);

  const presets = [
    {
      title: "Agence Web & Digitale",
      profession: "Agence de Création Web & Automatisation",
      offer: "Refonte de sites web à fort taux de conversion et automatisation du suivi commercial WhatsApp.",
      target_audience: "PME locales, cliniques privées, architectes et commerces à Lomé et Abidjan.",
      major_benefit: "Générer 2x plus de rendez-vous qualifiés et moderniser leur image sous 21 jours.",
      tone: "direct" as const,
    },
    {
      title: "Consultant / Coach Business",
      profession: "Consultant en Stratégie Commerciale B2B",
      offer: "Optimisation du processus de vente et formation des équipes au closing sans forcer.",
      target_audience: "Dirigeants de PME (10 à 50 salariés) et cabinets de conseil.",
      major_benefit: "Augmenter le taux de transformation des propositions de 18% à 35% en 60 jours.",
      tone: "professionnel" as const,
    },
    {
      title: "Architecte & Design d'Intérieur",
      profession: "Architecte & Maître d'œuvre d'Intérieur",
      offer: "Conception 3D haut de gamme et suivi clé en main de projets résidentiels et tertiaires.",
      target_audience: "Propriétaires de villas, promoteurs immobiliers et sièges d'entreprises.",
      major_benefit: "Livrer des espaces d'exception dans le respect strict des budgets et des délais.",
      tone: "chaleureux" as const,
    }
  ];

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setFormData(prev => ({
      ...prev,
      profession: preset.profession,
      offer: preset.offer,
      target_audience: preset.target_audience,
      major_benefit: preset.major_benefit,
      tone: preset.tone,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateAvatar(formData);
      setIsSaving(false);
    }, 600);
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
            Définissez votre Profil Commercial & Client Idéal
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Ces paramètres calibreront l&apos;algorithme de scoring et le copywriting de chaque message généré.
          </p>
        </div>

        {/* Quick Presets Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-medium">Modèles rapides :</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-cyan border border-dark-600 hover:border-cyan/40 transition-colors"
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
          <form onSubmit={handleSave} className="space-y-5">
            {/* Métier / Activité */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-cyan" />
                Votre Métier / Activité principale
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Consultant en Acquisition B2B, Développeur SaaS, Agence Web..."
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Offre principale irrésistible */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-cyan" />
                Votre Offre Principale (Ce que vous vendez)
              </label>
              <textarea
                required
                rows={3}
                placeholder="Ex: Mise en place d'un système de relance automatique WhatsApp et CRM pour doubler le closing..."
                value={formData.offer}
                onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
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
                placeholder="Ex: Cabinets de conseil, agences de services et PME en Afrique et en Europe..."
                value={formData.target_audience}
                onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Bénéfice majeur garanti */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan" />
                Bénéfice Majeur Garanti (La promesse chiffrée)
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Générer +35% de rendez-vous qualifiés et transformer 2x plus de devis..."
                value={formData.major_benefit}
                onChange={(e) => setFormData({ ...formData, major_benefit: e.target.value })}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Sélecteur de Ton & Fréquence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Ton rédactionnel */}
              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-cyan" />
                  Ton Rédactionnel
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                  className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="chaleureux">Chaleureux & Conversationnel (Recommandé)</option>
                  <option value="professionnel">Professionnel & Corporate</option>
                  <option value="direct">Direct & Efficace (&lt; 50 mots)</option>
                  <option value="persuasif">Persuasif & Axé Résultats</option>
                </select>
              </div>

              {/* Fréquence des relances */}
              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cyan" />
                  Fréquence des Relances
                </label>
                <select
                  value={formData.followup_frequency}
                  onChange={(e) => setFormData({ ...formData, followup_frequency: e.target.value as any })}
                  className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="J+3">J+3 (Recommandé pour WhatsApp / SMS)</option>
                  <option value="J+5">J+5 (Standard B2B LinkedIn)</option>
                  <option value="J+10">J+10 (Rythme lent grands comptes)</option>
                </select>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-dark-700/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan" />
                Données synchronisées côté serveur Supabase
              </span>

              <button
                type="submit"
                disabled={isSaving}
                className="py-3 px-6 rounded-xl font-extrabold text-xs md:text-sm bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center gap-2 shadow-cyan-glow transition-all hover:scale-105"
              >
                <Save className="w-4 h-4 text-dark-950" />
                <span>{isSaving ? "Synchronisation..." : "Sauvegarder & Synchroniser l'IA"}</span>
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
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Positionnement commercial :</span>
                <p className="text-white font-medium">
                  Expertise en tant que <strong className="text-cyan">{formData.profession || "[Votre Métier]"}</strong>.
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
                  {formData.major_benefit || "[Définissez votre bénéfice]"}
                </p>
              </div>

              <div className="p-3 bg-dark-800/80 rounded-xl border border-dark-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ton & Style de rédaction :</span>
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
                <span>Expérience Magic Setup (Moins de 2 min)</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Dès que votre Avatar est validé, Prospectizi calibre l&apos;IA pour générer vos premiers prospects qualifiés sans configuration complexe.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
