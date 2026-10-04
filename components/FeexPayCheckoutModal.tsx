"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { 
  X, Check, Shield, Smartphone, CreditCard, ArrowRight, Loader2, Sparkles, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { PlanType } from '@/lib/types';
import { 
  FEEXPAY_CONFIG, 
  PLAN_PRICING, 
  PAYMENT_OPERATORS, 
  PaymentOperator 
} from '@/lib/feexpay';

interface FeexPayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanType;
}

export default function FeexPayCheckoutModal({
  isOpen,
  onClose,
  selectedPlan,
}: FeexPayCheckoutModalProps) {
  const { upgradePlan, user } = useStore();
  const [operator, setOperator] = useState<PaymentOperator>('tmoney');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState(user?.full_name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [statusMessage, setStatusMessage] = useState('');
  const [txRef, setTxRef] = useState('');

  if (!isOpen) return null;

  const planInfo = PLAN_PRICING[selectedPlan];
  const isSandbox = FEEXPAY_CONFIG.mode === 'SANDBOX';

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (operator !== 'card' && !phoneNumber.trim()) {
      alert("Veuillez renseigner votre numéro de téléphone Mobile Money.");
      return;
    }

    setStep('processing');
    const generatedRef = `FPX-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    setTxRef(generatedRef);

    if (isSandbox) {
      // Simulation interactive en mode Sandbox (Environnement Développeur FeexPay)
      setStatusMessage("Envoi de la requête à la passerelle FeexPay Sandbox...");
      
      setTimeout(() => {
        setStatusMessage(
          operator === 'card'
            ? "Vérification 3D-Secure de la carte de test..."
            : `Notification push USSD envoyée au +228 ${phoneNumber} (${operator === 'tmoney' ? 'T-Money' : 'Moov'})...`
        );
      }, 1200);

      setTimeout(() => {
        setStatusMessage("Paiement approuvé par l'opérateur en mode Test !");
      }, 2600);

      setTimeout(() => {
        setStep('success');
        // Validation définitive du compte dans le store et Supabase
        upgradePlan(selectedPlan);
      }, 3400);

    } else {
      // Mode LIVE (Production FeexPay)
      setStatusMessage("Connexion à l'API FeexPay sécurisée...");
      try {
        const res = await fetch('/api/feexpay/pay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            plan: selectedPlan,
            operator,
            phoneNumber,
            customerName,
            customerEmail,
            amount: planInfo.fcfa,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setStep('success');
          upgradePlan(selectedPlan);
        } else {
          alert(data.error || "Une erreur est survenue lors du paiement.");
          setStep('form');
        }
      } catch (err) {
        alert("Impossible de joindre le serveur de paiement.");
        setStep('form');
      }
    }
  };

  const handleFinish = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-dark-900 border border-cyan/40 rounded-2xl max-w-lg w-full p-5 sm:p-6 relative shadow-cyan-glow-lg max-h-[92vh] overflow-y-auto text-slate-100">
        
        {/* Close Button */}
        {step !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-dark-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 bg-cyan/15 border border-cyan/40 text-cyan">
            <Shield className="w-3.5 h-3.5" />
            <span>Guichet FeexPay Sécurisé</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Finalisez votre accès {planInfo.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Rechargez vos prospects instantanément par Mobile Money ou Carte
          </p>
        </div>

        {/* Plan Summary Badge */}
        <div className="bg-dark-800/80 border border-dark-600 rounded-xl p-3.5 mb-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Formule choisie</span>
            <span className="font-bold text-white text-base">{planInfo.title}</span>
            <span className="text-xs text-cyan block font-semibold">{planInfo.prospects} prospects qualifiés</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-cyan">{planInfo.fcfa.toLocaleString()} FCFA</span>
            <span className="text-[11px] text-slate-400 block">({planInfo.eur} €)</span>
          </div>
        </div>

        {/* Sandbox Indicator */}
        {isSandbox && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 mb-5 flex items-center gap-2 text-xs text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong>Mode Sandbox (Test) actif :</strong> Vous pouvez tester le flux sans débit bancaire réel. Vos prospects seront immédiatement activés.</span>
          </div>
        )}

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <form onSubmit={handleStartPayment} className="space-y-4">
            
            {/* Operator Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Choisissez votre moyen de paiement :
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_OPERATORS.map((op) => {
                  const isSelected = operator === op.id;
                  return (
                    <button
                      type="button"
                      key={op.id}
                      onClick={() => setOperator(op.id)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-cyan/15 border-cyan text-white shadow-cyan-glow-sm'
                          : 'bg-dark-800/50 border-dark-600 hover:border-slate-500 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-lg shrink-0">{op.flag}</span>
                        <div className="truncate">
                          <span className="text-xs font-bold block truncate">{op.name}</span>
                          <span className="text-[10px] text-slate-400 block">{op.country}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-cyan shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Phone Number Input (if Mobile Money) */}
            {operator !== 'card' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Numéro {operator === 'tmoney' ? 'T-Money' : operator === 'moov_tg' ? 'Moov Togo' : 'Mobile Money'} :
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                    +228
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="90 00 00 00"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-dark-800 border border-dark-600 focus:border-cyan focus:ring-1 focus:ring-cyan rounded-xl py-2.5 pl-14 pr-3 text-sm text-white placeholder-slate-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Vous recevrez un message de confirmation sur votre téléphone pour valider.
                </p>
              </div>
            ) : (
              <div className="bg-dark-800/60 border border-dark-600 rounded-xl p-3 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-cyan font-bold">
                  <CreditCard className="w-4 h-4" />
                  <span>Paiement sécurisé par Carte (Visa / Mastercard)</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Le paiement par carte bancaire débitera l&apos;équivalent en FCFA ({planInfo.fcfa.toLocaleString()} FCFA).
                </p>
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                E-mail de confirmation :
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="votre-email@exemple.com"
                className="w-full bg-dark-800 border border-dark-600 focus:border-cyan focus:ring-1 focus:ring-cyan rounded-xl py-2 px-3 text-xs text-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-extrabold text-xs bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center justify-center gap-2 shadow-cyan-glow transition-all hover:scale-[1.01] active:scale-[0.99] mt-3"
            >
              <span>Payer {planInfo.fcfa.toLocaleString()} FCFA ({planInfo.eur} €)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PROCESSING / USSD PUSH */}
        {step === 'processing' && (
          <div className="py-8 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <Loader2 className="w-16 h-16 text-cyan animate-spin" />
              <Smartphone className="w-6 h-6 text-cyan absolute" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Transaction en cours...
              </h3>
              <p className="text-xs text-cyan font-semibold">
                {statusMessage}
              </p>
              <p className="text-[11px] text-slate-400 mt-2">
                Veuillez garder cette fenêtre ouverte pendant la confirmation.
              </p>
            </div>

            <div className="bg-dark-800/60 border border-dark-600 rounded-xl p-3 text-[11px] text-slate-400 font-mono">
              Réf : {txRef}
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 'success' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white mb-1">
                Paiement Validé avec Succès ! 🎉
              </h3>
              <p className="text-xs text-emerald-400 font-semibold">
                Votre compte Prospectizi a été rechargé immédiatement.
              </p>
              <p className="text-xs text-slate-300 mt-2">
                Vous bénéficiez désormais du <strong>{planInfo.title}</strong> avec un quota de <strong>{planInfo.prospects} prospects qualifiés</strong> valables pendant 30 jours.
              </p>
            </div>

            <div className="bg-dark-800 border border-dark-600 rounded-xl p-3 text-[11px] text-slate-300 space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Référence FeexPay :</span>
                <span className="font-mono text-cyan">{txRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Montant :</span>
                <span className="font-bold text-white">{planInfo.fcfa.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Statut :</span>
                <span className="font-bold text-emerald-400">APPROUVÉ / ACTIF</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-2.5 px-4 rounded-xl font-extrabold text-xs bg-cyan hover:bg-cyan-intense text-dark-950 shadow-cyan-glow transition-all"
            >
              Accéder à mes prospects débloqués →
            </button>
          </div>
        )}

        {/* Reassurance Footer */}
        <div className="border-t border-dark-700/80 pt-3 mt-4 text-center text-[10px] text-slate-500">
          Passerelle certifiée FeexPay • Agrégateur agréé zone UEMOA • Chiffrement SSL 256-bit
        </div>

      </div>
    </div>
  );
}
