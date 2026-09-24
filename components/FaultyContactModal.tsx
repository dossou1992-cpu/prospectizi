"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { X, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { Prospect } from '@/lib/types';

interface FaultyContactModalProps {
  prospect: Prospect | null;
  onClose: () => void;
}

export default function FaultyContactModal({ prospect, onClose }: FaultyContactModalProps) {
  const { reportFaultyContact } = useStore();
  const [reason, setReason] = useState<'bounce' | 'invalid_phone' | 'wrong_company'>('bounce');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!prospect) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    // Simulate backend verification (Ping SMTP / HLR lookup)
    setTimeout(() => {
      const res = reportFaultyContact(prospect.id, reason);
      setIsVerifying(false);
      setResult(res);
      setTimeout(() => {
        onClose();
        setResult(null);
      }, 1800);
    }, 1200);
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
          <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-bold text-emerald-300">{result.message}</p>
            <p className="text-xs text-slate-400">Votre solde de prospect a été re-crédité avec succès.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-xs text-slate-300">
              Notre garantie anti-gaspillage vous recrédite immédiatement si le contact est avéré inexploitable par notre vérification automatique (Ping SMTP / HLR).
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-800 border border-dark-600 cursor-pointer hover:border-amber-500/40">
                <input
                  type="radio"
                  name="reason"
                  checked={reason === 'bounce'}
                  onChange={() => setReason('bounce')}
                  className="accent-amber-400"
                />
                <span className="text-xs text-slate-200">
                  ❌ Email invalide / Non distribué (Hard Bounce)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-800 border border-dark-600 cursor-pointer hover:border-amber-500/40">
                <input
                  type="radio"
                  name="reason"
                  checked={reason === 'invalid_phone'}
                  onChange={() => setReason('invalid_phone')}
                  className="accent-amber-400"
                />
                <span className="text-xs text-slate-200">
                  ❌ Numéro de téléphone non attribué / Invalide
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-800 border border-dark-600 cursor-pointer hover:border-amber-500/40">
                <input
                  type="radio"
                  name="reason"
                  checked={reason === 'wrong_company'}
                  onChange={() => setReason('wrong_company')}
                  className="accent-amber-400"
                />
                <span className="text-xs text-slate-200">
                  ❌ Coordonnées ne correspondent pas à l&apos;entreprise
                </span>
              </label>
            </div>

            <div className="text-[11px] text-slate-400 italic">
              * Limité à un maximum de 10% de vos prospects totaux pour éviter les abus.
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-2.5 rounded-xl text-xs font-semibold bg-dark-800 hover:bg-dark-700 text-slate-300"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isVerifying}
                className="w-2/3 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-dark-950 flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Vérification SMTP en cours...</span>
                  </>
                ) : (
                  <span>Lancer la vérification & Recrédit</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
