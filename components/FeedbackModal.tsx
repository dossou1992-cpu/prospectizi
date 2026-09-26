"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { 
  MessageSquare, 
  Star, 
  Send, 
  X, 
  CheckCircle2, 
  Share2, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Gift
} from 'lucide-react';

export default function FeedbackModal() {
  const { 
    isFeedbackModalOpen, 
    setFeedbackModalOpen, 
    addBonusProspects, 
    showNotification,
    user 
  } = useStore();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [bestFeature, setBestFeature] = useState('');
  const [missingFeature, setMissingFeature] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<'yes' | 'no'>('yes');
  const [consentPublic, setConsentPublic] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Gratification du bêta-testeur avec 1 crédit bonus offert
    addBonusProspects(1);
    showNotification("🎁 Merci pour votre retour ! +1 prospect bonus a été ajouté à votre solde.");
  };

  const linkedInPostText = `En train de tester l'outil de prospection @Prospectizi pour trouver et contacter des clients qualifiés. Déjà d'excellents résultats sur la détection des failles réelles des entreprises et les messages personnalisés rédigés en 2 minutes ! Une vraie pépite pour accélérer son acquisition B2B. 🚀`;

  const copyLinkedInPost = () => {
    navigator.clipboard.writeText(linkedInPostText);
    setCopiedLinkedIn(true);
    showNotification("📋 Modèle de post LinkedIn copié dans votre presse-papier !");
    setTimeout(() => setCopiedLinkedIn(false), 3000);
  };

  const handleClose = () => {
    setFeedbackModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-dark-900 border border-cyan/40 rounded-2xl p-6 md:p-8 shadow-cyan-glow overflow-y-auto max-h-[92vh]">
        
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 text-cyan text-xs font-bold uppercase tracking-wider mb-2 border border-cyan/30">
                <Gift className="w-3.5 h-3.5" />
                Avis Bêta-Testeur (+1 Prospect Offert)
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                Votre avis compte énormément !
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Moins de 2 minutes pour nous aider à parfaire Prospectizi pendant la phase Découverte.
              </p>
            </div>

            {/* Note globale sur 5 étoiles */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Votre ressenti global sur l&apos;outil :
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
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Ce qui vous a le plus aidé / apprécié ?
              </label>
              <textarea
                required
                rows={2}
                placeholder="Ex: La précision des failles détectées, les messages WhatsApp prêts à l'envoi, le gain de temps..."
                value={bestFeature}
                onChange={(e) => setBestFeature(e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              <span className="text-[10px] text-slate-400">Servira de citation pour nos retours clients.</span>
            </div>

            {/* Ce qui vous a bloqué ou manqué */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Ce qui vous a manqué ou que l&apos;on devrait améliorer ?
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Ajouter plus de villes en Afrique de l'Ouest, intégrer l'export direct vers CRM..."
                value={missingFeature}
                onChange={(e) => setMissingFeature(e.target.value)}
                className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Recommandation */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Recommanderiez-vous Prospectizi à un confrère indépendant ou agence ?
              </label>
              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                  <input
                    type="radio"
                    name="recommend"
                    checked={wouldRecommend === 'yes'}
                    onChange={() => setWouldRecommend('yes')}
                    className="text-cyan focus:ring-cyan"
                  />
                  <span>Oui, sans hésiter ! 🚀</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                  <input
                    type="radio"
                    name="recommend"
                    checked={wouldRecommend === 'no'}
                    onChange={() => setWouldRecommend('no')}
                    className="text-cyan focus:ring-cyan"
                  />
                  <span>Pas encore / À perfectionner</span>
                </label>
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
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                +1 prospect offert dès validation
              </span>

              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl font-bold text-xs bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center gap-2 shadow-cyan-glow transition-all hover:scale-105"
              >
                <Send className="w-3.5 h-3.5 text-dark-950" />
                <span>Envoyer mon avis (+1 crédit)</span>
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation & Partage LinkedIn */
          <div className="space-y-6 text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Un immense merci !</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Votre retour a bien été enregistré et <strong>+1 prospect bonus</strong> a été immédiatement ajouté à votre compte.
              </p>
            </div>

            {/* Carte LinkedIn Viral Share */}
            <div className="p-4 bg-dark-800 rounded-xl border border-blue-500/30 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>Soutenez le lancement sur LinkedIn (Exemple pré-rempli) :</span>
                </div>
                <button
                  type="button"
                  onClick={copyLinkedInPost}
                  className="text-[11px] font-bold text-cyan hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedLinkedIn ? "Copié !" : "Copier"}</span>
                </button>
              </div>

              <div className="p-3 bg-dark-950 rounded-lg text-xs text-slate-300 font-mono italic leading-relaxed border border-dark-700">
                &quot;{linkedInPostText}&quot;
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://prospectizi.com')}&summary=${encodeURIComponent(linkedInPostText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 rounded-xl text-xs font-bold bg-[#0A66C2] hover:bg-[#084e96] text-white flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Publier directement sur LinkedIn</span>
                </a>
              </div>
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
