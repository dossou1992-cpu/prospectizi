"use client";

import React, { useState } from 'react';
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
  RotateCcw
} from 'lucide-react';
import { Channel, Prospect } from '@/lib/types';

export default function ProspectsPage() {
  const { 
    prospects, 
    subscription, 
    user, 
    searchProspects, 
    exportProspectsCSV, 
    setShowUpgradeModal,
    isSubscriptionExpired 
  } = useStore();

  const [keyword, setKeyword] = useState('Architecte & Décoration');
  const [location, setLocation] = useState('Lomé');
  const [channel, setChannel] = useState<Channel>('google_maps');
  const [searchCount] = useState<number>(3);
  const [isSearching, setIsSearching] = useState(false);

  // Filters
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [onlyHot, setOnlyHot] = useState<boolean>(false);

  // Faulty modal
  const [faultyProspect, setFaultyProspect] = useState<Prospect | null>(null);

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
      count: searchCount
    });
    setIsSearching(false);
  };

  // Filtered prospects
  const filteredProspects = prospects.filter(p => {
    if (filterChannel !== 'all' && p.channel !== filterChannel) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (onlyHot && p.qualification_score < 80) return false;
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
              Moteur d&apos;Acquisition B2B &amp; Filtre 100% Contactable
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Rechercher &amp; Qualifier vos Nouveaux Prospects
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Chaque prospect extrait fait l&apos;objet d&apos;une analyse stricte : failles détectées, contact direct actif et message rédigé sur-mesure.
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
                {remaining > 0 ? `${remaining} disponible(s) ce mois-ci` : "Plafond atteint — Passez en PRO"}
              </span>
            )}
          </div>
        </div>

        {/* Formulaire de Recherche Multi-Sources */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
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
                placeholder="Ex: Agence immobilière, Avocat, Designer..."
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
                placeholder="Ex: Lomé, Paris, Abidjan..."
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
                <option value="linkedin">LinkedIn B2B (Décideurs &amp; Dirigeants)</option>
                <option value="google">Recherche Web Google (Sites officiels)</option>
                <option value="facebook">Pages Entreprises Facebook</option>
                <option value="instagram">Comptes Professionnels Instagram</option>
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
                  <span>Extraire (3)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Barre de Filtres & Export CSV */}
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-400 mr-2">
            <Filter className="w-3.5 h-3.5 text-cyan" />
            <span className="font-semibold">Filtres :</span>
          </div>

          {/* Filtre Canal */}
          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="bg-dark-800 border border-dark-600 text-xs text-slate-300 px-2.5 py-1.5 rounded-lg focus:outline-none"
          >
            <option value="all">Tous les canaux</option>
            <option value="google_maps">Google Maps</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="google">Google</option>
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

        {/* Compteur & Export CSV */}
        <div className="flex items-center gap-3">
          <span className="text-slate-400">
            <strong className="text-white">{filteredProspects.length}</strong> prospect(s) qualifié(s)
          </span>

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

      {/* Liste des Fiches Prospects */}
      <div className="space-y-6">
        {filteredProspects.length === 0 ? (
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-12 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-cyan mx-auto" />
            <h3 className="text-base font-bold text-white">Aucun prospect correspondant aux filtres</h3>
            <p className="text-xs text-slate-400">
              Modifiez vos filtres ou lancez une nouvelle recherche ci-dessus pour alimenter votre liste.
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
