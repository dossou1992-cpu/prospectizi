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
  MessageSquare, 
  Sparkles, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle2, 
  Send,
  Flag,
  FileEdit,
  Save,
  HelpCircle,
  FlaskConical
} from 'lucide-react';

interface ProspectCardProps {
  prospect: Prospect;
  onReportFaulty: (prospect: Prospect) => void;
}

export default function ProspectCard({ prospect, onReportFaulty }: ProspectCardProps) {
  const { updateProspectStatus, updateProspectNotes, recordSentVariant, auditReport } = useStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'first_contact' | 'value_offer' | 'followup_1' | 'followup_2' | 'followup_final'>('first_contact');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(prospect.private_notes || "");
  const [customMessages, setCustomMessages] = useState(prospect.generated_messages);
  const [regenerating, setRegenerating] = useState(false);

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

  const currentMsgText = customMessages[activeTab] || "";

  // One-click Outreach URLs
  const cleanPhone = (prospect.phone || '').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(currentMsgText);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
  const mailtoUrl = `mailto:${prospect.email}?subject=${encodeURIComponent(`Idée pour ${prospect.company_name}`)}&body=${encodedMsg}`;

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
    <div className="bg-dark-800 border border-cyan/20 hover:border-cyan/40 rounded-2xl p-5 md:p-6 transition-all duration-300 shadow-xl relative overflow-hidden group">
      {/* Top Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan/10 transition-all" />

      {/* Main 2 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLONNE GAUCHE (7/12) : Informations Clés, Failles, Offre sur-mesure & Messages IA */}
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
                {prospect.sent_variant && (
                  <span className="text-[10px] bg-purple-500/15 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-bold">
                    Test A/B : Envoyé avec Variante {prospect.sent_variant}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan" />
                <span>{prospect.activity}</span>
                <span className="text-slate-500">•</span>
                <MapPin className="w-3.5 h-3.5 text-cyan" />
                <span>{prospect.city}, {prospect.country}</span>
              </p>
            </div>

            {/* Score Badge */}
            <div className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-sm font-black font-mono ${scoreBadgeColor}`}>
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
                Opportunité & Stratégie recommandée
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

          {/* MODULE TEST A/B DES ACCROCHES (Si Test A/B actif) */}
          {auditReport.ab_test_active && (
            <div className="bg-dark-950 border border-purple-500/40 rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <FlaskConical className="w-4 h-4 text-purple-400" />
                  Test A/B Actif sur votre compte
                </span>
                <span className="text-[10px] text-slate-400">
                  Validez la variante envoyée pour alimenter l&apos;audit mensuel
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Variante A */}
                <div className="p-3 bg-dark-900 rounded-lg border border-dark-700 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200">Variante A (Accroche Directe) :</span>
                    <button
                      onClick={() => handleCopy(customMessages.first_contact, 'var-a')}
                      className="text-[11px] text-cyan hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'var-a' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'var-a' ? "Copié !" : "Copier"}</span>
                    </button>
                  </div>
                  <p className="text-slate-300 italic text-[11px]">&quot;{customMessages.first_contact}&quot;</p>
                  <button
                    onClick={() => recordSentVariant(prospect.id, 'A')}
                    className={`w-full py-1 rounded text-[11px] font-bold transition-all ${
                      prospect.sent_variant === 'A'
                        ? 'bg-purple-600 text-white'
                        : 'bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-600'
                    }`}
                  >
                    {prospect.sent_variant === 'A' ? "✔ Variante A envoyée" : "J'ai envoyé la Variante A"}
                  </button>
                </div>

                {/* Variante B */}
                <div className="p-3 bg-dark-900 rounded-lg border border-purple-500/30 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-purple-300">Variante B (Optimisée Audit) :</span>
                    <button
                      onClick={() => handleCopy(customMessages.first_contact_variant_b || customMessages.first_contact, 'var-b')}
                      className="text-[11px] text-purple-400 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'var-b' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'var-b' ? "Copié !" : "Copier"}</span>
                    </button>
                  </div>
                  <p className="text-slate-300 italic text-[11px]">&quot;{customMessages.first_contact_variant_b || customMessages.first_contact}&quot;</p>
                  <button
                    onClick={() => recordSentVariant(prospect.id, 'B')}
                    className={`w-full py-1 rounded text-[11px] font-bold transition-all ${
                      prospect.sent_variant === 'B'
                        ? 'bg-purple-600 text-white'
                        : 'bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-600'
                    }`}
                  >
                    {prospect.sent_variant === 'B' ? "✔ Variante B envoyée" : "J'ai envoyé la Variante B"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bloc Messages IA Personnalisés (< 75 mots) */}
          <div className="bg-dark-900 border border-dark-600 rounded-xl p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dark-700 pb-2.5">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-cyan" />
                Séquence de Messages IA (&lt; 75 mots)
              </span>
              {/* Message tabs selector */}
              <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
                {[
                  { key: 'first_contact', label: '1. Accroche' },
                  { key: 'value_offer', label: '2. Valeur (Preuve)' },
                  { key: 'followup_1', label: 'Relance 1 (J+3)' },
                  { key: 'followup_2', label: 'Relance 2 (J+5)' },
                  { key: 'followup_final', label: 'Finale' },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key as any)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      activeTab === t.key
                        ? 'bg-cyan text-dark-950 font-bold shadow-cyan-border'
                        : 'bg-dark-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Aide pédagogique contextuelle sur le Message de Valeur */}
            {activeTab === 'value_offer' && (
              <div className="p-2.5 bg-cyan/10 border border-cyan/30 rounded-lg text-[11px] text-slate-200 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cyan block">Quand envoyer ce message ?</strong>
                  Ne l&apos;envoyez pas en premier ! Envoyez-le dès que le prospect répond à votre accroche ou demande des précisions sur votre offre. Il démontre une étude de cas ou un chiffre concret qui lève ses doutes sans forcer la vente.
                </div>
              </div>
            )}

            {/* Message Body Display */}
            <div className="bg-dark-950/70 p-3.5 rounded-xl border border-dark-700 text-xs text-slate-200 font-normal leading-relaxed whitespace-pre-line relative">
              {currentMsgText}
            </div>

            {/* Message Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(currentMsgText, `msg-${activeTab}`)}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-cyan hover:bg-cyan-intense text-dark-950 shadow-cyan-border transition-all"
                >
                  {copiedKey === `msg-${activeTab}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-dark-950" />
                      <span>Copié dans le presse-papier !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-dark-950" />
                      <span>Copier le texte</span>
                    </>
                  )}
                </button>

                {/* Regenerate Angles */}
                <div className="flex items-center gap-1 text-[10px]">
                  <span className="text-slate-400">Angle :</span>
                  <button
                    disabled={regenerating}
                    onClick={() => handleRegenerate('direct')}
                    className="px-2 py-1 rounded bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-600"
                  >
                    Direct
                  </button>
                  <button
                    disabled={regenerating}
                    onClick={() => handleRegenerate('question')}
                    className="px-2 py-1 rounded bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-600"
                  >
                    Question
                  </button>
                  <button
                    disabled={regenerating}
                    onClick={() => handleRegenerate('result')}
                    className="px-2 py-1 rounded bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-600"
                  >
                    Chiffré
                  </button>
                </div>
              </div>

              <span className="text-[11px] text-slate-400">
                {currentMsgText.split(' ').length} mots • Rédigé en &quot;Je&quot;
              </span>
            </div>
          </div>

          {/* Bloc Conseils de Closing */}
          {prospect.closing_tips && prospect.closing_tips.length > 0 && (
            <div className="bg-dark-900/60 border border-dark-700/80 rounded-xl p-3.5">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
                💡 3 Conseils Clés de Closing pour ce prospect :
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {prospect.closing_tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bloc Notes Privées */}
          <div className="bg-dark-900/50 border border-dark-700 rounded-xl p-3 space-y-2">
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

        {/* COLONNE DROITE (4/12) : Coordonnées 100% Directes, Statuts CRM & One-Click Outreach */}
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
                    <div className="flex items-center justify-between">
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
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
                    >
                      <Send className="w-3 h-3" />
                      <span>Lancer WhatsApp (wa.me)</span>
                    </a>
                  </div>
                ) : (
                  <div className="text-slate-400 text-xs">Téléphone : Information non trouvée</div>
                )}

                {/* Email direct */}
                {prospect.email ? (
                  <div className="p-2.5 bg-dark-800 rounded-lg border border-dark-600 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
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
                      <Mail className="w-3 h-3" />
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
