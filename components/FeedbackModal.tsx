"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { 
  Star, 
  Send, 
  X, 
  CheckCircle2, 
  Share2, 
  Copy, 
  Sparkles, 
  Gift,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function FeedbackModal() {
  const { 
    isFeedbackModalOpen, 
    setFeedbackModalOpen, 
    submitLinkedInFeedback,
    user 
  } = useStore();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [bestFeature, setBestFeature] = useState('');
  const [missingFeature, setMissingFeature] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<'yes' | 'no'>('yes');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [consentPublic, setConsentPublic] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  if (!isFeedbackModalOpen) return null;

  const linkedInPostText = `En train de tester l'outil de prospection @Prospectizi pour trouver et contacter des clients qualifiés. Déjà d'excellents résultats sur la détection des failles réelles des entreprises et les messages personnalisés rédigés en 2 minutes ! Une vraie pépite pour accélérer son acquisition B2B. 🚀`;

  const copyLinkedInPost = () => {
    navigator.clipboard.writeText(linkedInPostText);
    setCopiedLinkedIn(true);
    setTimeout(() => setCopiedLinkedIn(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLinkedInFeedback({
      linkedinUrl: linkedinUrl.trim(),
      reviewText: bestFeature.trim(),
      rating,
      consent: consentPublic
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setFeedbackModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-dark-900 border-2 border-amber-500/40 rounded-2xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
                <Gift className="w-3.5 h-3.5" />
                Avis Utilisateur Réel (+3 Prospects Gratuits)
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                Partagez votre avis &amp; gagnez +3 leads
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Moins de 2 minutes pour nous aider à parfaire Prospectizi : collez le lien de votre post LinkedIn, et après vérification par notre équipe, recevez 3 prospects qualifiés offerts !
              </p>
            </div>

            {/* Note globale sur 5 étoiles */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Votre note sur l&apos;outil :
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-slate-600 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-300 ml-2">
                  {rating === 5 ? "Excellent (5/5) ⭐" : `${rating}/5`}
                </span>
              </div>
            </div>

            {/* Ce qui t'a le plus aidé */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Ce qui vous a le plus aidé / apprécié ?
              </label>
              <textarea
                required
                rows={2}
                placeholder="Ex: La pertinence des failles détectées, les messages WhatsApp rédigés en 2 minutes, le temps gagné..."
                value={bestFeature}
                onChange={(e) => setBestFeature(e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Ce qui vous a bloqué ou manqué */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Ce qui vous a manqué ou que l&apos;on devrait améliorer ?
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Plus de filtres par ville, export direct vers Notion, etc."
                value={missingFeature}
                onChange={(e) => setMissingFeature(e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Étape Post LinkedIn */}
            <div className="p-4 bg-dark-950 rounded-xl border border-blue-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" />
                  <span>Modèle de Post LinkedIn à copier &amp; publier :</span>
                </span>
                <button
                  type="button"
                  onClick={copyLinkedInPost}
                  className="text-[11px] font-bold text-cyan hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedLinkedIn ? "Copié !" : "Copier le texte"}</span>
                </button>
              </div>

              <div className="p-2.5 bg-dark-900 rounded-lg text-xs text-slate-300 italic border border-dark-700 select-all">
                &quot;{linkedInPostText}&quot;
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <a
                  href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(linkedInPostText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-lg text-xs font-bold bg-[#0A66C2] hover:bg-[#084e96] text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>1. Publier sur LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-2">
                <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">
                  2. Collez ici le lien de votre post LinkedIn publié :
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.linkedin.com/posts/..."
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-cyan rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors font-mono"
                />
              </div>
            </div>

            {/* Accord de réutilisation */}
            <div className="p-3 bg-dark-800 rounded-xl border border-dark-700">
              <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-300">
                <input
                  type="checkbox"
                  checked={consentPublic}
                  onChange={(e) => setConsentPublic(e.target.checked)}
                  className="mt-0.5 rounded border-dark-600 text-cyan focus:ring-cyan"
                />
                <span>
                  J&apos;autorise <strong>Prospectizi</strong> à réutiliser mon témoignage et prénom sur son site ou ses supports de démonstration commerciale.
                </span>
              </label>
            </div>

            {/* Bouton de validation */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-amber-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Crédit de +3 leads après validation admin
              </span>

              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-dark-950 flex items-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                <Send className="w-3.5 h-3.5 text-dark-950" />
                <span>Envoyer pour validation (+3 prospects)</span>
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation */
          <div className="space-y-6 text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Merci pour votre retour !</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Votre avis et votre lien de post LinkedIn ont été transmis à l&apos;équipe avec succès. Dès vérification rapide par notre administrateur, <strong>+3 prospects bonus gratuits</strong> seront crédités sur votre compte.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="py-2.5 px-6 rounded-xl font-bold text-xs bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-600 transition-colors"
            >
              Fermer et retourner à mes prospects
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
