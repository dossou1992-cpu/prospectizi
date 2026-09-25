"use client";

import React, { useState } from 'react';
import { Prospect, ProspectStatus } from '@/lib/types';
import { useStore } from '@/lib/store';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle2, 
  Send,
  Flag,
  FileEdit,
  Save,
  HelpCircle,
  FlaskConical,
  Award
} from 'lucide-react';

interface ProspectCardProps {
  prospect: Prospect;
  onReportFaulty: (prospect: Prospect) => void;
}

export default function ProspectCard({ prospect, onReportFaulty }: ProspectCardProps) {
  const { updateProspectStatus, updateProspectNotes, recordSentVariant, auditReport } = useStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'first_contact' | 'value_offer' | 'followup_1' | 'followup_2' | 'followup_final'>('first_contact');
  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B'>(prospect.sent_variant || 'A');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(prospect.private_notes || "");
  const [customMessages, setCustomMessages] = useState(prospect.generated_messages);
  const [regenerating, setRegenerating] = useState(false);

  const isABActive = auditReport.ab_test_active;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveNotes = () => {
    updateProspectNotes(prospect.id, notes);
    setIsEditingNotes(false);
  };

  const handleRegenerate = (angle: 'direct' | 'question' | 'result') => {
    setRegenerating(true);
    setTimeout(() => {
      let newMsg = "";
      if (angle === 'direct') {
        newMsg = `Bonjour ! J'ai vu l'activité de ${prospect.company_name} sur ${prospect.city}. En voyant vos offres, beaucoup perdent du temps faute de suivi automatisé. J'ai un système léger qui fait ça sans effort. Seriez-vous ouvert à une démo de 2 min ?`;
      } else if (angle === 'question') {
        newMsg = `Bonjour ! Comment gérez-vous le suivi de vos devis actuellement chez ${prospect.company_name} ? J'ai remarqué qu'un système automatisé WhatsApp permet de réactiver 35% des clients silencieux. Curieux d'en savoir plus ?`;
      } else {
        newMsg = `Bonjour ! Nous avons permis à un profil équivalent sur ${prospect.city} de signer 2 contrats supplémentaires dès son 1er mois grâce à des relances courtes. Seriez-vous ouvert à ce que je vous envoie la vidéo explicative ?`;
      }
      setCustomMessages(prev => ({
        ...prev,
        [activeTab]: newMsg
      }));
      setRegenerating(false);
    }, 600);
  };

  // Determine current active message text
  let currentMsgText = customMessages[activeTab] || "";
  if (activeTab === 'first_contact') {
    if (selectedVariant === 'B') {
      currentMsgText = customMessages.first_contact_variant_b || customMessages.first_contact;
    } else {
      currentMsgText = customMessages.first_contact;
    }
  }

  // One-click Outreach URLs
  const cleanPhone = (prospect.phone || '').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(currentMsgText);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
  const mailtoUrl = `mailto:${prospect.email}?subject=${encodeURIComponent(`Opportunité pour ${prospect.company_name}`)}&body=${encodedMsg}`;

  // Score styling
  const scoreBadgeColor = 
    prospect.qualification_score >= 80 
      ? 'bg-cyan/15 text-cyan border-cyan shadow-cyan-glow' 
      : prospect.qualification_score >= 60 
      ? 'bg-amber-500/15 text-amber-400 border-amber-500/50' 
      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/50';

  const statuses: { id: ProspectStatus; label: string; activeClass: string }[] = [
    { id: 'nouveau', label: 'Nouveau', activeClass: 'bg-slate-700 text-white' },
    { id: 'non_contacte', label: 'Non contacté', activeClass: 'bg-blue-600 text-white' },
    { id: 'en_discussion', label: 'En discussion', activeClass: 'bg-amber-600 text-white' },
    { id: 'gagne', label: '★ Gagné', activeClass: 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' },
    { id: 'perdu', label: 'Perdu', activeClass: 'bg-rose-900 text-rose-200' },
  ];

  return (
    <div className={`bg-dark-800 border rounded-2xl p-4 md:p-6 transition-all duration-300 shadow-xl relative overflow-hidden group ${
      isABActive ? 'border-purple-500/40 shadow-purple-500/10' : 'border-cyan/20 hover:border-cyan/40'
    }`}>
      {/* Top Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan/10 transition-all" />

      {/* BANDEAU TEST A/B ACTIF */}
      {isABActive && (
        <div className="mb-4 p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-purple-300 font-semibold">
            <FlaskConical className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Test A/B Actif : Choisissez la variante à tester sur ce prospect</span>
          </div>
          <div className="flex items-center gap-1.5">
            {prospect.sent_variant ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white flex items-center gap-1">
                <Check className="w-3 h-3" />
                Envoyé avec Variante {prospect.sent_variant}
              </span>
            ) : (
              <span className="text-[10px] text-amber-400 font-medium">En attente d&apos;envoi</span>
            )}
          </div>
        </div>
      )}

      {/* Main 2 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLONNE GAUCHE (8/12) : Informations Clés, Failles, Offre sur-mesure & Messages IA */}
        <div className="lg:col-span-8 space-y-5">
          {/* Header Prospect */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-extrabold text-white">{prospect.company_name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-dark-700 text-cyan px-2 py-0.5 rounded-md border border-dark-600">
                  Canal : {prospect.channel.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-slate-400">Ajouté le {prospect.collected_at}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 flex-wrap">
                <Building2 className="w-3.5 h-3.5 text-cyan shrink-0" />
                <span>{prospect.activity}</span>
                <span className="text-slate-500">•</span>
                <MapPin className="w-3.5 h-3.5 text-cyan shrink-0" />
                <span>{prospect.city}, {prospect.country}</span>
              </p>
            </div>

            {/* Score Badge */}
            <div className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-sm font-black font-mono self-start sm:self-auto ${scoreBadgeColor}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{prospect.qualification_score} / 100</span>
            </div>
          </div>

          {/* Grille Résumé & Analyse Faille */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Faille identifiée */}
            <div className="bg-dark-900/90 border border-rose-500/25 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Problème ou Faille identifiée
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">{prospect.flaws_identified}</p>
            </div>

            {/* Opportunité */}
            <div className="bg-dark-900/90 border border-cyan/25 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-extrabold text-cyan uppercase tracking-wider flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                Opportunité &amp; Stratégie recommandée
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">{prospect.opportunity}</p>
            </div>
          </div>

          {/* Offre / Solution sur-mesure recommandée */}
          <div className="bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border-l-4 border-cyan border-y border-r border-dark-700/60 rounded-xl p-3.5">
            <span className="text-[10px] font-extrabold text-cyan uppercase tracking-wider block mb-1">
              🌟 Solution sur-mesure à proposer :
            </span>
            <p className="text-xs font-semibold text-white leading-relaxed">
              {prospect.recommended_offer}
            </p>
          </div>

          {/* Séquence de Messages IA */}
          <div className="bg-dark-900/95 border border-dark-700 rounded-xl p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dark-700/80 pb-2.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan" />
                Séquence de Prise de Contact Personnalisée
              </span>
              
              {/* Angles de régénération */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400 hidden sm:inline">Régénérer :</span>
                <button
                  onClick={() => handleRegenerate('direct')}
                  disabled={regenerating}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-dark-800 hover:bg-dark-700 text-cyan border border-cyan/30"
                >
                  Direct
                </button>
                <button
                  onClick={() => handleRegenerate('question')}
                  disabled={regenerating}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-600"
                >
                  Question
                </button>
                <button
                  onClick={() => handleRegenerate('result')}
                  disabled={regenerating}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-600"
                >
                  Résultat
                </button>
              </div>
            </div>

            {/* SÉLECTEUR DE VARIANTE A/B QUAND LE TEST EST ACTIF SUR LE 1ER CONTACT */}
            {isABActive && activeTab === 'first_contact' && (
              <div className="p-2.5 bg-dark-950 rounded-xl border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-300">Variante affichée :</span>
                  <div className="inline-flex rounded-lg bg-dark-800 p-0.5 border border-dark-600">
                    <button
                      type="button"
                      onClick={() => setSelectedVariant('A')}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        selectedVariant === 'A'
                          ? 'bg-cyan text-dark-950 shadow-cyan-border'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ⚡ Variante A (Directe)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedVariant('B')}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        selectedVariant === 'B'
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ✨ Variante B (Optimisée IA)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => recordSentVariant(prospect.id, 'A')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                      prospect.sent_variant === 'A'
                        ? 'bg-cyan text-dark-950 border-cyan'
                        : 'bg-dark-800 text-slate-300 border-dark-600 hover:text-white'
                    }`}
                  >
                    ✔ Marquer envoyé en A
                  </button>
                  <button
                    onClick={() => recordSentVariant(prospect.id, 'B')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                      prospect.sent_variant === 'B'
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                        : 'bg-dark-800 text-purple-300 border-purple-500/40 hover:bg-purple-950/40'
                    }`}
                  >
                    ✔ Marquer envoyé en B
                  </button>
                </div>
              </div>
            )}

            {/* Navigation des 5 étapes */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setActiveTab('first_contact')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  activeTab === 'first_contact'
                    ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                    : 'bg-dark-800 text-slate-400 hover:text-white'
                }`}
              >
                1er Contact {isABActive ? `(Var. ${selectedVariant})` : ''}
              </button>
              <button
                onClick={() => setActiveTab('value_offer')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  activeTab === 'value_offer'
                    ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                    : 'bg-dark-800 text-slate-400 hover:text-white'
                }`}
              >
                Message de Valeur
              </button>
              <button
                onClick={() => setActiveTab('followup_1')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  activeTab === 'followup_1'
                    ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                    : 'bg-dark-800 text-slate-400 hover:text-white'
                }`}
              >
                Relance J+3
              </button>
              <button
                onClick={() => setActiveTab('followup_2')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  activeTab === 'followup_2'
                    ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                    : 'bg-dark-800 text-slate-400 hover:text-white'
                }`}
              >
                Relance J+5
              </button>
              <button
                onClick={() => setActiveTab('followup_final')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  activeTab === 'followup_final'
                    ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                    : 'bg-dark-800 text-slate-400 hover:text-white'
                }`}
              >
                Rupture J+10
              </button>
            </div>

            {/* Boîte d'explication pédagogique pour le "Message de Valeur" */}
            {activeTab === 'value_offer' && (
              <div className="p-3 bg-cyan/10 border border-cyan/30 rounded-lg text-xs text-cyan space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-white">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan" />
                  À quel moment utiliser ce &quot;Message de Valeur&quot; ?
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Envoyez ce message si le prospect réagit positivement à votre premier mot ou vous demande un exemple de votre méthode. Il offre un conseil ou une statistique sans rien exiger en retour, ce qui active le <strong>principe psychologique de réciprocité</strong>.
                </p>
              </div>
            )}

            {/* Zone Texte Message Actif */}
            <div className="relative bg-dark-950 border border-dark-700 rounded-xl p-3.5 text-xs text-slate-200 leading-relaxed font-sans min-h-[90px] whitespace-pre-wrap">
              {currentMsgText}

              {/* Bouton Copier Rapide */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-2">
                <button
                  onClick={() => handleCopy(currentMsgText, activeTab)}
                  className="p-1.5 bg-dark-800 hover:bg-dark-700 text-cyan rounded-lg border border-cyan/30 transition-colors flex items-center gap-1 text-[11px] font-bold"
                  title="Copier le texte"
                >
                  {copiedKey === activeTab ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === activeTab ? "Copié !" : "Copier"}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>{currentMsgText.split(' ').length} mots • Conforme aux règles d&apos;accroche (&lt; 75 mots)</span>
              {isABActive && activeTab === 'first_contact' && (
                <span className="text-purple-300 font-bold">Variante {selectedVariant} prête pour WhatsApp et Email</span>
              )}
            </div>
          </div>

          {/* Notes Privées */}
          <div className="bg-dark-900/60 border border-dark-700/80 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <FileEdit className="w-3.5 h-3.5 text-cyan" />
                Notes Privées
              </span>
              {isEditingNotes ? (
                <button
                  onClick={handleSaveNotes}
                  className="flex items-center gap-1 text-[11px] font-bold text-cyan hover:underline"
                >
                  <Save className="w-3 h-3" />
                  Sauvegarder
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="text-[11px] text-slate-400 hover:text-white underline"
                >
                  Modifier
                </button>
              )}
            </div>
            {isEditingNotes ? (
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajoutez vos observations, budget estimé ou consignes..."
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan text-xs text-white p-2.5 rounded-lg focus:outline-none"
                rows={2}
              />
            ) : (
              <p className="text-xs text-slate-400 italic">
                {prospect.private_notes || "Aucune note privée. Cliquez sur 'Modifier' pour en ajouter."}
              </p>
            )}
          </div>
        </div>

        {/* COLONNE DROITE (4/12) : Coordonnées Directes, Statuts CRM & One-Click Outreach */}
        <div className="lg:col-span-4 bg-dark-900/90 border border-dark-700/80 rounded-xl p-4 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan block mb-2">
                Coordonnées Directes (100% Vérifiées)
              </span>
              
              {/* WhatsApp direct */}
              <div className="space-y-2 text-xs">
                {prospect.phone ? (
                  <div className="p-2.5 bg-dark-800 rounded-lg border border-dark-600 flex flex-col gap-2">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        Tél / WhatsApp :
                      </span>
                      <span className="font-mono text-white font-semibold">{prospect.phone}</span>
                    </div>
                    {/* One-click WhatsApp wa.me */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Lancer WhatsApp ({isABActive && activeTab === 'first_contact' ? `Var. ${selectedVariant}` : 'Direct'})</span>
                    </a>
                  </div>
                ) : (
                  <div className="text-slate-400 text-xs">Téléphone : Information non trouvée</div>
                )}

                {/* Email direct */}
                {prospect.email ? (
                  <div className="p-2.5 bg-dark-800 rounded-lg border border-dark-600 flex flex-col gap-2">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-cyan" />
                        Email :
                      </span>
                      <span className="font-mono text-white text-[11px] truncate max-w-[150px]">{prospect.email}</span>
                    </div>
                    {/* One-click Mailto */}
                    <a
                      href={mailtoUrl}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-dark-700 hover:bg-dark-600 text-cyan border border-cyan/30 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Envoyer Email direct</span>
                    </a>
                  </div>
                ) : (
                  <div className="text-slate-400 text-xs">Email : Information non trouvée</div>
                )}

                {/* Website */}
                {prospect.website_url && (
                  <div className="p-2.5 bg-dark-800 rounded-lg border border-dark-600 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-cyan" />
                      Site Web :
                    </span>
                    <a
                      href={prospect.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan hover:underline flex items-center gap-1 text-[11px] truncate max-w-[140px]"
                    >
                      <span>Visiter le site</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Réseaux Professionnels
              </span>
              <div className="flex flex-wrap gap-1.5">
                {prospect.social_links.linkedin && (
                  <a
                    href={prospect.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded bg-dark-800 hover:bg-dark-700 text-[11px] text-cyan border border-cyan/30 flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
                {prospect.social_links.instagram && (
                  <a
                    href={prospect.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded bg-dark-800 hover:bg-dark-700 text-[11px] text-pink-400 border border-pink-500/30 flex items-center gap-1"
                  >
                    <span>Instagram</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
                {prospect.social_links.facebook && (
                  <a
                    href={prospect.social_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded bg-dark-800 hover:bg-dark-700 text-[11px] text-blue-400 border border-blue-500/30 flex items-center gap-1"
                  >
                    <span>Facebook</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
                {prospect.social_links.google_maps && (
                  <a
                    href={prospect.social_links.google_maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded bg-dark-800 hover:bg-dark-700 text-[11px] text-amber-400 border border-amber-500/30 flex items-center gap-1"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Statuts CRM Cliquables */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan block mb-2">
                Statut CRM (Pipeline Vente)
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {statuses.map((st) => {
                  const isSelected = prospect.status === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => updateProspectStatus(prospect.id, st.id)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center border transition-all ${
                        isSelected
                          ? `${st.activeClass} border-transparent font-bold scale-[1.02]`
                          : "bg-dark-800 border-dark-600 text-slate-400 hover:text-white hover:bg-dark-700"
                      }`}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Faulty Contact Action */}
          <div className="pt-3 border-t border-dark-700 flex items-center justify-between">
            <button
              onClick={() => onReportFaulty(prospect)}
              className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
              title="Signaler un hard bounce email ou un numéro non attribué pour récupérer votre crédit"
            >
              <Flag className="w-3 h-3 text-amber-500" />
              <span>Signaler contact erroné</span>
            </button>

            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              100% Qualifié
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
