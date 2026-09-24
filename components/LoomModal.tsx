"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { X, Video, Gift, CheckCircle2, ShieldAlert } from 'lucide-react';

interface LoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoomModal({ isOpen, onClose }: LoomModalProps) {
  const { submitTestimonial, user } = useStore();
  const [loomUrl, setLoomUrl] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loomUrl.trim() || !loomUrl.includes('loom.com')) {
      setError("Veuillez renseigner un lien de partage vidéo Loom valide (ex: https://www.loom.com/share/...)");
      return;
    }
    if (!consent) {
      setError("Vous devez obligatoirement autoriser l'utilisation commerciale de votre vidéo pour recevoir le bonus.");
      return;
    }

    submitTestimonial(loomUrl, consent);
    setLoomUrl('');
    setConsent(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-dark-900 border border-cyan/40 rounded-2xl max-w-lg w-full p-6 md:p-7 relative shadow-cyan-glow">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-dark-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan/15 border border-cyan/40 flex items-center justify-center text-cyan">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Débloquer +3 Prospects Bonus Gratuits</h3>
            <p className="text-xs text-slate-400">Enregistrez un court avis vidéo Loom de 60 secondes</p>
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-600 rounded-xl p-3.5 mb-5 text-xs text-slate-300 space-y-1.5">
          <p className="font-semibold text-cyan flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Comment faire ?
          </p>
          <p>1. Allez sur Loom.com (gratuit) et enregistrez votre écran avec votre avis honnête.</p>
          <p>2. Copiez le lien de partage et collez-le ci-dessous.</p>
          <p>3. Dès validation par l&apos;administrateur, votre compte sera immédiatement crédité de +3 prospects supplémentaires.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Lien de votre vidéo Loom :
            </label>
            <input
              type="url"
              required
              placeholder="https://www.loom.com/share/..."
              value={loomUrl}
              onChange={(e) => { setLoomUrl(e.target.value); setError(''); }}
              className="w-full bg-dark-950 border border-dark-600 focus:border-cyan rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
            />
          </div>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-dark-800/80 border border-dark-600/80 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => { setConsent(e.target.checked); setError(''); }}
              className="mt-0.5 accent-cyan w-4 h-4 rounded"
            />
            <span className="text-xs text-slate-300 leading-snug">
              <strong className="text-white">Accord commercial obligatoire :</strong> J&apos;autorise expressément Prospectizi à utiliser mon retour vidéo et mon prénom à des fins promotionnelles et de démonstration commerciale.
            </span>
          </label>

          {error && (
            <div className="p-2.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 px-4 rounded-xl text-xs font-semibold bg-dark-800 hover:bg-dark-700 text-slate-300 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 px-4 rounded-xl text-xs font-bold bg-cyan hover:bg-cyan-intense text-dark-950 shadow-cyan-glow transition-all"
            >
              Soumettre ma vidéo (+3 Prospects)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
