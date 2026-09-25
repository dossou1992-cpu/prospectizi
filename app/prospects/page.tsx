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
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Channel, Prospect } from '@/lib/types';
import Link from 'next/link';

export default function ProspectsPage() {
  const { 
    prospects, 
    subscription, 
    user, 
    searchProspects, 
    exportProspectsCSV, 
    setShowUpgradeModal 
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
      {/* Top Banner & Search Bar */}
      <div className="bg-dark-900 border border-dark-600 rounded-2xl p-6 shadow-xl space-y-6">
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
              Chaque prospect extrait fait l&apos;objet d&apos;une vérification stricte : failles détectées, contact direct actif et message rédigé sur-mesure.
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

        {/* Search Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
          {/* Mot-clé / Secteur */}
          <div className="lg:col-span-4">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-cyan" />
              Secteur ou Métier ciblé
            </label>
            <input
              type="text"
              required
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Ex: Agence immobilière, Clinique, Architecte..."
              className="w-full bg-dark-950 border border-dark-600 focus:border-cyan text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none transition-colors"
            />
          </div>

          {/* Ville / Pays */}
          <div className="lg:col-span-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan" />
              Ville ou Pays
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Lomé, Paris, Abidjan..."
              className="w-full bg-dark-950 border border-dark-600 focus:border-cyan text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none transition-colors"
            />
          </div>

          {/* Canal */}
          <div className="lg:col-span-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan" />
              Canal de Détection
            </label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as any)}
              className="w-full bg-dark-950 border border-dark-600 focus:border-cyan text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none transition-colors"
            >
              <option value="google_maps">Google Maps (Commerces &amp; Bureaux)</option>
              <option value="linkedin">LinkedIn (B2B, Cadres &amp; Agences)</option>
              <option value="facebook">Facebook (Pages &amp; Groupes professionnels)</option>
              <option value="instagram">Instagram (Créateurs &amp; Marques)</option>
              <option value="google">Google Recherche (Sites web &amp; Annuaires)</option>
            </select>
          </div>

          {/* CTA Submit Button */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-2.5 px-4 rounded-xl font-extrabold text-xs bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-2 shadow-cyan-glow transition-all hover:scale-105 disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Recherche...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-dark-950" />
                  <span>Rechercher</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Filter Bar & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-dark-900/60 border border-dark-700/80 p-4 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan" />
            Filtrer par :
          </span>

          {/* Statut filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-dark-800 border border-dark-600 rounded-lg text-xs text-slate-200 px-2.5 py-1.5 focus:outline-none"
          >
            <option value="all">Tous les statuts CRM</option>
            <option value="nouveau">Nouveau</option>
            <option value="non_contacte">Non contacté</option>
            <option value="en_discussion">En discussion</option>
            <option value="gagne">Gagné</option>
            <option value="perdu">Perdu</option>
          </select>

          {/* Canal filter */}
          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="bg-dark-800 border border-dark-600 rounded-lg text-xs text-slate-200 px-2.5 py-1.5 focus:outline-none"
          >
            <option value="all">Tous les canaux</option>
            <option value="google_maps">Google Maps</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="google">Google</option>
          </select>

          {/* Only Hot checkbox pill */}
          <button
            onClick={() => setOnlyHot(!onlyHot)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              onlyHot
                ? "bg-cyan/20 border-cyan text-cyan shadow-cyan-border"
                : "bg-dark-800 border-dark-600 text-slate-400 hover:text-white"
            }`}
          >
            🔥 Chauds (Score ≥ 80)
          </button>
        </div>

        {/* Export CSV / Excel Button */}
        <button
          onClick={exportProspectsCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-dark-800 hover:bg-dark-700 text-cyan border border-cyan/30 shadow-sm transition-all"
        >
          <FileSpreadsheet className="w-4 h-4 text-cyan" />
          <span>Exporter CSV / Excel (1 Clic)</span>
        </button>
      </div>

      {/* Prospects Cards List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{filteredProspects.length} prospect(s) qualifié(s) affiché(s)</span>
          <span className="text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Garantie Anti-Gaspillage : Seuls les prospects contactables sont comptabilisés
          </span>
        </div>

        {filteredProspects.length === 0 ? (
          <div className="p-12 text-center bg-dark-900 border border-dark-700 rounded-2xl space-y-3">
            <AlertCircle className="w-8 h-8 text-cyan mx-auto opacity-70" />
            <h3 className="text-base font-bold text-white">Aucun prospect correspondant aux filtres</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
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

      {/* Zone Basse : Widget Audit Mensuel IA */}
      <div className="bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-cyan/40 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan">Diagnostic Commercial IA</span>
          </div>
          <h3 className="text-lg font-bold text-white">Prêt pour votre Audit Mensuel de Conversion ?</h3>
          <p className="text-xs text-slate-400 max-w-xl">
            L&apos;IA analyse vos messages, le taux de réponse et les statuts gagnés pour reformuler vos scripts et optimiser votre taux de signature.
          </p>
        </div>

        <Link
          href="/audit"
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-2 shadow-cyan-glow transition-all shrink-0"
        >
          <span>Accéder au Rapport d&apos;Audit</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Faulty Contact Anti-fraud Modal */}
      {faultyProspect && (
        <FaultyContactModal 
          prospect={faultyProspect} 
          onClose={() => setFaultyProspect(null)} 
        />
      )}
    </div>
  );
}
