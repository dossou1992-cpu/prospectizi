"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { X, ShieldAlert, CheckCircle2, Loader2, Clock } from 'lucide-react';
import { Prospect } from '@/lib/types';

interface FaultyContactModalProps {
  prospect: Prospect | null;
  onClose: () => void;
}

export default function FaultyContactModal({ prospect, onClose }: FaultyContactModalProps) {
  const { submitFaultyReport } = useStore();
  const [reason, setReason] = useState<'bounce' | 'invalid_phone' | 'wrong_company'>('bounce');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!prospect) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const res = submitFaultyReport(prospect.id, reason, details);
      setIsSubmitting(false);
      setResult(res);
      setTimeout(() => {
        onClose();
        setResult(null);
      }, 2500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-dark-900 border border-amber-500/40 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-dark-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Signaler un Contact Erroné</h3>
            <p className="text-xs text-slate-400">{prospect.company_name}</p>
          </div>
        </div>

        {result ? (
          <div className="p-5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-center space-y-2.5">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-bold text-white">Signalement transmis pour analyse</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.message}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-medium border border-amber-500/30">
              <Clock className="w-3 h-3" /> Traitement et validation sous 24h
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 rounded-xl bg-dark-800/80 border border-dark-700 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-amber-300">Procédure de contrôle qualité :</span> Afin de garantir la fiabilité du réseau et prévenir les abus, chaque signalement fait l&apos;objet d&apos;une vérification technique manuelle ou automatisée approfondie avant le recrédit effectif de votre compte.
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-800 border border-dark-600 cursor-pointer hover:border-amber-500/40 transition">
                <input
                  type="radio"
                  name="reason"
                  checked={reason === 'bounce'}
                  onChange={() => setReason('bounce')}
                  className="accent-amber-400"
                />
                <span className="text-xs text-slate-200">
                  ❌ Email introuvable ou non distribué (Hard Bounce)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-800 border border-dark-600 cursor-pointer hover:border-amber-500/40 transition">
                <input
                  type="radio"
                  name="reason"
                  checked={reason === 'invalid_phone'}
                  onChange={() => setReason('invalid_phone')}
                  className="accent-amber-400"
                />
                <span className="text-xs text-slate-200">
                  ❌ Numéro de téléphone non attribué / Inexistant
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-800 border border-dark-600 cursor-pointer hover:border-amber-500/40 transition">
                <input
                  type="radio"
                  name="reason"
                  checked={reason === 'wrong_company'}
                  onChange={() => setReason('wrong_company')}
                  className="accent-amber-400"
                />
                <span className="text-xs text-slate-200">
                  ❌ Coordonnées erronées ou mauvaise entreprise
                </span>
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Détails complémentaires (facultatif)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Ex : Réponse du serveur mail 550 User unknown, ou sonnerie occupée en continu..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="text-[11px] text-slate-400 italic">
              * Dès que notre audit confirme l&apos;erreur technique, 1 crédit de prospect vous est immédiatement restitué.
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-2.5 rounded-xl text-xs font-semibold bg-dark-800 hover:bg-dark-700 text-slate-300 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-dark-950 flex items-center justify-center gap-2 transition"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Enregistrement du ticket...</span>
                  </>
                ) : (
                  <span>Transmettre pour analyse</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
