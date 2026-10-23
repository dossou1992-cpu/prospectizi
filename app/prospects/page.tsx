"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import ProspectCard from '@/components/ProspectCard';
import FaultyContactModal from '@/components/FaultyContactModal';
import { 
  Search, 
  Filter, 
  Zap, 
  MapPin, 
  Globe, 
  Loader2, 
  AlertCircle,
  FileSpreadsheet,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Trash2,
  Broom,
  Layers,
  SlidersHorizontal
} from 'lucide-react';
import { Channel, Prospect } from '@/lib/types';

const STORAGE_KEY = 'prospectizi_search_form_state';

export default function ProspectsPage() {
  const { 
    prospects, 
    subscription, 
    user, 
    searchProspects, 
    exportProspectsCSV, 
    setShowUpgradeModal,
    isSubscriptionExpired,
    cleanDuplicates,
    clearAllProspects
  } = useStore();

  const [keyword, setKeyword] = useState('Architecte & Décoration');
  const [location, setLocation] = useState('Cotonou');
  const [channel, setChannel] = useState<Channel>('google_maps');
  const [websiteFilter, setWebsiteFilter] = useState<'all' | 'with_website' | 'without_website'>('all');
  const [offerAngle, setOfferAngle] = useState<string>('auto');
  const [searchCount] = useState<number>(3);
  const [isSearching, setIsSearching] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Filters for displaying CRM cards
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterWebsitePresence, setFilterWebsitePresence] = useState<string>('all');
  const [onlyHot, setOnlyHot] = useState<boolean>(false);
  const [crmSearch, setCrmSearch] = useState<string>('');

  // Faulty modal
  const [faultyProspect, setFaultyProspect] = useState<Prospect | null>(null);

  // Persistance de l'état : Chargement initial depuis localStorage ou URL
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.keyword) setKeyword(parsed.keyword);
        if (parsed.location) setLocation(parsed.location);
        if (parsed.channel) setChannel(parsed.channel);
        if (parsed.websiteFilter) setWebsiteFilter(parsed.websiteFilter);
        if (parsed.offerAngle) setOfferAngle(parsed.offerAngle);
        if (parsed.filterChannel) setFilterChannel(parsed.filterChannel);
        if (parsed.filterStatus) setFilterStatus(parsed.filterStatus);
        if (parsed.filterWebsitePresence) setFilterWebsitePresence(parsed.filterWebsitePresence);
        if (typeof parsed.onlyHot === 'boolean') setOnlyHot(parsed.onlyHot);
      }

      // Synchronisation avec les paramètres d'URL s'ils existent
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const q = params.get('q') || params.get('keyword');
        const loc = params.get('loc') || params.get('location');
        const ch = params.get('ch') || params.get('channel');
        if (q) setKeyword(q);
        if (loc) setLocation(loc);
        if (ch && ['google_maps', 'instagram', 'linkedin', 'facebook'].includes(ch)) {
          setChannel(ch as Channel);
        }
      }
    } catch (err) {
      console.warn("[Prospects] Erreur de lecture du localStorage:", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persistance automatique dans localStorage lors des modifications utilisateur
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stateToSave = {
        keyword,
        location,
        channel,
        websiteFilter,
        offerAngle,
        filterChannel,
        filterStatus,
        filterWebsitePresence,
        onlyHot,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      // Ignorer si localStorage désactivé ou plein
    }
  }, [keyword, location, channel, websiteFilter, offerAngle, filterChannel, filterStatus, filterWebsitePresence, onlyHot, isHydrated]);

  const isBypass = user.isSuperadminMode;
  const totalAllowed = subscription.prospects_quota + subscription.bonus_prospects;
  const remaining = Math.max(0, totalAllowed - subscription.prospects_used);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubscriptionExpired && !isBypass) {
      setShowUpgradeModal(true);
      return;
    }

    if (!isBypass && remaining <= 0) {
      setShowUpgradeModal(true);
      return;
    }

    setIsSearching(true);
    await searchProspects({
      keyword,
      location,
      channel,
      count: searchCount,
      websiteFilter,
      offerAngle: offerAngle === 'auto' ? undefined : offerAngle
    });
    setIsSearching(false);
  };

  const handleCleanDuplicates = () => {
    cleanDuplicates();
  };

  const handleClearAll = () => {
    if (confirm("⚠️ Êtes-vous sûr de vouloir vider complètement votre liste de prospects CRM ? Cette action est irréversible.")) {
      clearAllProspects();
    }
  };

  // Filtered prospects
  const filteredProspects = prospects.filter(p => {
    if (crmSearch.trim() !== '') {
      const q = crmSearch.toLowerCase();
      const matchName = (p.company_name || '').toLowerCase().includes(q);
      const matchCity = (p.city || '').toLowerCase().includes(q);
      const matchAct = (p.activity || '').toLowerCase().includes(q);
      if (!matchName && !matchCity && !matchAct) return false;
    }
    if (filterChannel !== 'all' && p.channel !== filterChannel) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (onlyHot && p.qualification_score < 80) return false;
    if (filterWebsitePresence === 'with_website' && (!p.website_url || p.website_url.trim() === '')) return false;
    if (filterWebsitePresence === 'without_website' && (p.website_url && p.website_url.trim() !== '')) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Alerte Expiration Abonnement */}
      {isSubscriptionExpired && !isBypass && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-lg animate-fadeIn">
          <div className="flex items-center gap-3 text-rose-300">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <strong className="text-white block font-bold">Votre abonnement mensuel est arrivé à échéance</strong>
              <span>Le compte est bloqué en attente de renouvellement. Renouvelez votre forfait pour débloquer de nouveaux prospects.</span>
            </div>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="py-2 px-4 rounded-xl font-bold bg-rose-600 hover:bg-rose-500 text-white shrink-0 flex items-center gap-1.5 shadow-md transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Renouveler mon abonnement</span>
          </button>
        </div>
      )}

      {/* Top Banner & Search Bar */}
      <div className="bg-dark-900 border border-dark-600 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 text-cyan text-xs font-bold uppercase tracking-wider mb-2 border border-cyan/30">
              <Zap className="w-3.5 h-3.5" />
              Moteur d&apos;Acquisition B2B &amp; Qualification Sur-Mesure
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Rechercher &amp; Qualifier vos Nouveaux Prospects
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Chaque prospect analysé fait l&apos;objet d&apos;une qualification stricte : failles adaptées à votre offre, contacts directs actifs et séquences rédigées sur-mesure.
            </p>
          </div>

          {/* Quota Indicator */}
          <div className="bg-dark-800 border border-dark-600 rounded-xl p-3.5 text-xs flex flex-col gap-1 min-w-[200px]">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Quota du Plan :</span>
              <span className="text-cyan font-bold font-mono">
                {isBypass ? "Illimité VIP" : `${subscription.prospects_used} / ${totalAllowed}`}
              </span>
            </div>
            <div className="w-full bg-dark-700 h-2 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-cyan h-full rounded-full transition-all duration-300"
                style={{ width: isBypass ? '100%' : `${Math.min(100, (subscription.prospects_used / totalAllowed) * 100)}%` }}
              />
            </div>
            {!isBypass && (
              <span className="text-[10px] text-slate-400 text-right mt-0.5">
                {remaining > 0 ? `${remaining} disponible(s) ce mois-ci` : "Plafond atteint - Passez en PRO"}
              </span>
            )}
          </div>
        </div>

        {/* Formulaire de Recherche Ciblée */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
            {/* Métier / Mot-clé */}
            <div className="md:col-span-4 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Métier ou Secteur cible
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Ex: Architecte, Cabinet de conseil, Dentiste..."
                  className="w-full bg-dark-950 border border-dark-600 focus:border-cyan text-xs text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Ville / Région */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Ville ou Région
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: Abidjan, Cotonou, Dakar, Paris..."
                  className="w-full bg-dark-950 border border-dark-600 focus:border-cyan text-xs text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Canal de détection */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Canal de Détection
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as Channel)}
                  className="w-full bg-dark-950 border border-dark-600 focus:border-cyan text-xs text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none appearance-none"
                >
                  <option value="google_maps">Google Maps (Local &amp; WhatsApp vérifiés)</option>
                  <option value="instagram">Instagram (Profils Pros, Bio &amp; E-mail direct)</option>
                  <option value="linkedin">LinkedIn B2B (Décideurs &amp; Dirigeants)</option>
                  <option value="facebook">Pages Entreprises Facebook</option>
                </select>
              </div>
            </div>

            {/* Bouton Lancer la Recherche */}
            <div className="md:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-black bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-2 shadow-cyan-glow transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-dark-950" />
                    <span>Analyse...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-dark-950" />
                    <span>Rechercher (3)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Filtres de Ciblage Avancé : Présence Web & Angle de l'Offre */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 pt-2 border-t border-dark-700/60">
            {/* Présence de Site Web */}
            <div className="md:col-span-6 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-cyan flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Présence de Site Web des Prospects
              </label>
              <select
                value={websiteFilter}
                onChange={(e) => setWebsiteFilter(e.target.value as any)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan text-xs text-slate-200 px-3 py-2 rounded-xl focus:outline-none"
              >
                <option value="all">🌐 Peu importe (Mixte : entreprises avec et sans site)</option>
                <option value="without_website">🔴 Sans Site Web uniquement (Idéal pour vendre création / digitalisation)</option>
                <option value="with_website">🟢 Avec Site Web actif uniquement (Idéal pour SEO, refonte, pubs ou CRM)</option>
              </select>
            </div>

            {/* Angle d'attaque / Spécialisation */}
            <div className="md:col-span-6 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-cyan flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Angle de votre Offre &amp; Détection des Failles
              </label>
              <select
                value={offerAngle}
                onChange={(e) => setOfferAngle(e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan text-xs text-slate-200 px-3 py-2 rounded-xl focus:outline-none"
              >
                <option value="auto">🤖 Automatique (Calibré sur mon Avatar Client)</option>
                <option value="design">🎨 Design Graphique &amp; Identité Visuelle (Logo, Branding, Charte)</option>
                <option value="social_media">📱 Community Management &amp; Réseaux Sociaux (Reels, Visibilité)</option>
                <option value="ads">🎯 Publicité &amp; Média Buying (Meta &amp; Google Ads)</option>
                <option value="copywriting">✍️ Copywriting &amp; Rédaction Commerciale (Argumentaires, Closing)</option>
                <option value="closing">📞 Closing &amp; Performance Commerciale (Qualification, Appels)</option>
                <option value="ai_automation">🤖 IA &amp; Automatisation des Flux (Agents IA, Chatbots 24/7)</option>
                <option value="web_dev">💻 Création / Refonte de Site Web (Performance, Vitrine Mobile)</option>
                <option value="general_consulting">💼 Conseil &amp; Prestations Stratégiques B2B</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Barre de Filtres & Actions CRM (Dédoublonnage & Nettoyage) */}
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-400 mr-2">
            <Filter className="w-3.5 h-3.5 text-cyan" />
            <span className="font-semibold">Filtres vue :</span>
          </div>

          {/* Recherche rapide dans le CRM */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={crmSearch}
              onChange={(e) => setCrmSearch(e.target.value)}
              placeholder="Filtrer nom ou ville..."
              className="bg-dark-800 border border-dark-600 focus:border-cyan text-xs text-white pl-8 pr-3 py-1.5 rounded-lg focus:outline-none w-40"
            />
          </div>

          {/* Filtre Canal */}
          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="bg-dark-800 border border-dark-600 text-xs text-slate-300 px-2.5 py-1.5 rounded-lg focus:outline-none"
          >
            <option value="all">Tous les canaux</option>
            <option value="google_maps">Google Maps</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
          </select>

          {/* Filtre Présence Web */}
          <select
            value={filterWebsitePresence}
            onChange={(e) => setFilterWebsitePresence(e.target.value)}
            className="bg-dark-800 border border-dark-600 text-xs text-slate-300 px-2.5 py-1.5 rounded-lg focus:outline-none"
          >
            <option value="all">Tous sites web</option>
            <option value="with_website">Avec site web</option>
            <option value="without_website">Sans site web</option>
          </select>

          {/* Filtre Statut */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-dark-800 border border-dark-600 text-xs text-slate-300 px-2.5 py-1.5 rounded-lg focus:outline-none"
          >
            <option value="all">Tous les statuts</option>
            <option value="nouveau">Nouveau</option>
            <option value="non_contacte">Non contacté</option>
            <option value="en_discussion">En discussion</option>
            <option value="gagne">Gagné</option>
            <option value="perdu">Perdu</option>
          </select>

          {/* Checkbox Score >= 80 */}
          <button
            onClick={() => setOnlyHot(!onlyHot)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              onlyHot
                ? "bg-amber-500/20 text-amber-400 border-amber-500/50"
                : "bg-dark-800 text-slate-400 border-dark-600 hover:text-white"
            }`}
          >
            ★ Chauds (≥ 80/100)
          </button>
        </div>

        {/* Compteur & Actions Outils */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-slate-400 mr-1">
            <strong className="text-white font-mono">{filteredProspects.length}</strong> prospect(s) qualifié(s)
          </span>

          {/* Nettoyer Doublons */}
          <button
            onClick={handleCleanDuplicates}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all hover:scale-105"
            title="Supprime automatiquement tous les prospects en double par nom d'entreprise"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nettoyer doublons</span>
          </button>

          {/* Vider Liste CRM */}
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-dark-800 hover:bg-rose-950/40 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-all"
            title="Vider l'ensemble des prospects enregistrés pour repartir de zéro"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Vider ma base</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={exportProspectsCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-cyan border border-cyan/30 text-xs font-semibold transition-colors"
            title="Exporter votre base au format CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Indicateur de Recherche & Analyse en Arrière-plan */}
      {isSearching && (
        <div className="bg-dark-900 border-2 border-cyan/40 rounded-2xl p-6 shadow-cyan-glow space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark-700 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan">
                <Loader2 className="w-5 h-5 animate-spin text-cyan" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-white">Recherche en arrière-plan - Statut : En cours</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan/15 text-cyan border border-cyan/30 font-bold uppercase tracking-wider animate-pulse">
                    En cours
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Moteur de détection multi-canaux actif • Qualification stricte sans doublons
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan bg-dark-800 px-3 py-1.5 rounded-lg border border-dark-600">
              Recherche ciblée (File sécurisée)
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Qualification des fiches et détection des failles sur-mesure...</span>
              <span className="text-cyan font-bold font-mono">En cours...</span>
            </div>
            <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan to-cyan-intense animate-pulse w-3/4 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* Liste des Fiches Prospects */}
      <div className="space-y-6">
        {filteredProspects.length === 0 ? (
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-12 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-cyan mx-auto" />
            <h3 className="text-base font-bold text-white">Aucun prospect correspondant aux filtres</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Votre base est vide ou aucun prospect ne correspond à vos filtres actuels. Lancez une recherche ciblée ci-dessus pour alimenter votre pipeline.
            </p>
          </div>
        ) : (
          filteredProspects.map((prospect) => (
            <ProspectCard
              key={prospect.id}
              prospect={prospect}
              onReportFaulty={(p) => setFaultyProspect(p)}
            />
          ))
        )}
      </div>

      {/* Modale de Signalement de Contact Erroné */}
      <FaultyContactModal
        prospect={faultyProspect}
        onClose={() => setFaultyProspect(null)}
      />
    </div>
  );
}
