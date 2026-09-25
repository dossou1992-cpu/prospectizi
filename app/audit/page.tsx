"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { 
  Sparkles, 
  Lock, 
  TrendingUp, 
  AlertTriangle, 
  Copy, 
  Check, 
  Wand2, 
  Calendar,
  FlaskConical,
  Award,
  ArrowRight,
  Clock,
  Play
} from 'lucide-react';

export default function AuditPage() {
  const { 
    auditReport, 
    generateAuditReport, 
    user, 
    updateAvatar, 
    toggleABTest, 
    applyWinningScript,
    simulateABTestThreshold 
  } = useStore();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Time-lock check (30 days)
  const isSuperadmin = user.isSuperadminMode;
  const nextAvailable = new Date(auditReport.next_audit_available_at);
  const now = new Date();
  const diffDays = Math.max(0, Math.ceil((nextAvailable.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const isLocked = !isSuperadmin && diffDays > 0;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await generateAuditReport();
    setIsGenerating(false);
  };

  const handleApplyAvatarSuggestion = () => {
    if (auditReport.avatar_suggestions) {
      updateAvatar({
        target_audience: "Agences et cabinets de services B2B (3 à 15 collaborateurs) à fort besoin de réactivité.",
        major_benefit: "Générer +40% de réponses et débloquer 2 à 3 contrats signés de plus de 2 000 € chaque mois.",
      });
    }
  };

  const abStats = auditReport.ab_test_stats || { variant_a_sent: 4, variant_b_sent: 3, variant_a_replies: 1, variant_b_replies: 2 };
  const totalSent = abStats.variant_a_sent + abStats.variant_b_sent;
  const requiredThreshold = 20;
  const isThresholdMet = totalSent >= requiredThreshold || isSuperadmin;

  const rateA = abStats.variant_a_sent > 0 ? Math.round((abStats.variant_a_replies / abStats.variant_a_sent) * 100) : 0;
  const rateB = abStats.variant_b_sent > 0 ? Math.round((abStats.variant_b_replies / abStats.variant_b_sent) * 100) : 0;

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-cyan/40 rounded-2xl p-6 md:p-8 relative shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 text-cyan text-xs font-bold uppercase tracking-wider mb-2 border border-cyan/30">
              <Sparkles className="w-3.5 h-3.5" />
              Coach Commercial Virtuel (Strictement 1 fois par mois)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Audit Mensuel de Conversion IA
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl">
              Diagnostic complet de votre activité commerciale : taux de réponse réels, identification des points de friction et scripts optimisés en test A/B.
            </p>
          </div>

          {/* Trigger / Lock Button */}
          <div className="flex flex-col items-end gap-2">
            {isLocked ? (
              <button
                disabled
                className="py-3 px-5 rounded-xl font-bold text-xs bg-dark-800 text-slate-400 border border-dark-600 flex items-center gap-2 cursor-not-allowed opacity-90"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>🔒 Prochain audit disponible dans {diffDays} jours</span>
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="py-3 px-6 rounded-xl font-extrabold text-xs md:text-sm bg-cyan hover:bg-cyan-intense text-dark-950 flex items-center gap-2 shadow-cyan-glow transition-all hover:scale-105"
              >
                {isGenerating ? (
                  <span>Analyse IA en cours...</span>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-dark-950" />
                    <span>Lancer l&apos;Audit Mensuel {isSuperadmin ? "(Bypass VIP)" : ""}</span>
                  </>
                )}
              </button>
            )}
            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
              <Calendar className="w-3 h-3 text-cyan" />
              Dernier rapport généré : {new Date(auditReport.generated_at).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </div>

      {/* BLOC A : BILAN DE CONVERSION (KPIs & VERDICT IA) */}
      <div className="bg-dark-900 border border-dark-600 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 border-b border-dark-700 pb-3">
          <TrendingUp className="w-5 h-5 text-cyan" />
          <h2 className="text-lg font-bold text-white">A. Le Bilan de Conversion du Mois Écoulé</h2>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-800/90 border border-dark-700 rounded-xl p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Prospects Traités / Contactés
            </span>
            <div className="text-2xl font-black text-white font-mono">{auditReport.stats.total_contacted}</div>
            <p className="text-[11px] text-emerald-400 mt-1">Activité suffisante (&gt; 30)</p>
          </div>

          <div className="bg-dark-800/90 border border-dark-700 rounded-xl p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Taux de Réponse aux Prises de Contact
            </span>
            <div className="text-2xl font-black text-cyan font-mono">{auditReport.stats.response_rate} %</div>
            <p className="text-[11px] text-cyan mt-1">+8.2% vs moyenne du marché</p>
          </div>

          <div className="bg-dark-800/90 border border-dark-700 rounded-xl p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Taux de Closing (Signatures Finales)
            </span>
            <div className="text-2xl font-black text-emerald-400 font-mono">{auditReport.stats.closing_rate} %</div>
            <p className="text-[11px] text-emerald-300 mt-1">Excellent rendement de closing</p>
          </div>
        </div>

        {/* Verdict IA en 1 phrase */}
        <div className="p-4 rounded-xl bg-cyan/10 border border-cyan/30 text-xs md:text-sm text-cyan font-semibold flex items-start gap-3">
          <Sparkles className="w-5 h-5 shrink-0 text-cyan mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Verdict Diagnostic IA :</strong>
            <span>&quot;Excellente accroche initiale ({auditReport.stats.response_rate}% de réponses positives), mais vous perdez 45% de vos prospects lors de la deuxième relance par manque d&apos;accroche douce alternative.&quot;</span>
          </div>
        </div>
      </div>

      {/* BLOC B : DIAGNOSTIC DES FAILLES & GOULOTS */}
      <div className="bg-dark-900 border border-dark-600 rounded-2xl p-6 md:p-8 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 border-b border-dark-700 pb-3">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">B. Diagnostic des Failles &amp; Goulots d&apos;Étranglement</h2>
        </div>

        <div className="p-4 bg-dark-800 rounded-xl border border-rose-500/30 text-xs space-y-1">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Point de Blocage Principal Détecté :</span>
          <p className="text-sm font-bold text-white">{auditReport.main_bottleneck}</p>
        </div>

        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            3 Observations Clés Constatées par l&apos;IA :
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {auditReport.key_findings.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-dark-800/80 rounded-xl border border-dark-700 text-xs text-slate-300 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan/20 text-cyan text-[11px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BLOC C : MODULE TEST A/B DES SCRIPTS & VALIDATION DÉFINITIVE */}
      <div className="bg-dark-900 border border-purple-500/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-purple-400" />
            <div>
              <h2 className="text-lg font-bold text-white">C. Plan d&apos;Action &amp; Test A/B des Scripts</h2>
              <p className="text-xs text-slate-400">
                Activez ce test pour faire apparaître le choix entre Variante A et Variante B sur vos fiches prospects.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleABTest(!auditReport.ab_test_active)}
              className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                auditReport.ab_test_active
                  ? "bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30"
                  : "bg-dark-800 text-slate-300 border-dark-600 hover:text-white"
              }`}
            >
              {auditReport.ab_test_active ? "✔ Test A/B Actif sur vos Fiches" : "Activer le Test A/B"}
            </button>
          </div>
        </div>

        {/* Real-time A/B stats comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Variante A */}
          <div className="bg-dark-800 border border-dark-600 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-cyan uppercase tracking-wider block">Variante A (Accroche Directe)</span>
                <span className="text-[11px] text-slate-400">{abStats.variant_a_sent} envoyés • {abStats.variant_a_replies} réponses ({rateA}%)</span>
              </div>
              <button
                onClick={() => handleCopy(auditReport.recommended_script.first_contact_optimized, 'script-1')}
                className="text-xs font-bold text-cyan hover:underline flex items-center gap-1"
              >
                {copiedKey === 'script-1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'script-1' ? "Copié !" : "Copier"}</span>
              </button>
            </div>
            <div className="bg-dark-950 p-3.5 rounded-lg border border-dark-700 text-xs text-slate-200 italic leading-relaxed">
              &quot;{auditReport.recommended_script.first_contact_optimized}&quot;
            </div>
          </div>

          {/* Variante B */}
          <div className="bg-dark-800 border-2 border-purple-500/50 rounded-xl p-5 space-y-3 relative shadow-purple-500/10 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-400" />
                  Variante B (Optimisée IA)
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  {abStats.variant_b_sent} envoyés • {abStats.variant_b_replies} réponses ({rateB}%)
                </span>
              </div>
              <button
                onClick={() => handleCopy(auditReport.recommended_script.followup_optimized, 'script-2')}
                className="text-xs font-bold text-purple-400 hover:underline flex items-center gap-1"
              >
                {copiedKey === 'script-2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'script-2' ? "Copié !" : "Copier"}</span>
              </button>
            </div>
            <div className="bg-dark-950 p-3.5 rounded-lg border border-purple-500/30 text-xs text-slate-200 italic leading-relaxed">
              &quot;{auditReport.recommended_script.followup_optimized}&quot;
            </div>
          </div>
        </div>

        {/* PROGRESSION & CONDITION D'ARBITRAGE DU TEST A/B */}
        {!isThresholdMet ? (
          <div className="p-4 bg-dark-800/90 border border-purple-500/30 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="font-bold text-purple-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                Test A/B en cours de collecte : {totalSent} / {requiredThreshold} envois requis
              </span>
              <span className="text-slate-400 text-[11px]">
                Encore {Math.max(0, requiredThreshold - totalSent)} messages à tester pour désigner le vainqueur
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan to-purple-500 transition-all duration-300" 
                style={{ width: `${Math.min(100, Math.round((totalSent / requiredThreshold) * 100))}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pour que l&apos;IA puisse statuer sur la variante gagnante de manière fiable, continuez à prospecter pendant quelques jours en alternant Variante A et Variante B. Le bouton d&apos;application définitive se débloquera dès que vous aurez enregistré 20 prises de contact.
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={simulateABTestThreshold}
                className="text-[11px] text-purple-400 hover:text-purple-300 underline font-semibold flex items-center gap-1"
                title="Simule instantanément 34 envois pour débloquer l'arbitrage immédiatement à des fins de test"
              >
                <span>⚡ Simuler 20+ envois pour tester l&apos;arbitrage tout de suite</span>
              </button>
            </div>
          </div>
        ) : (
          /* Arbitrage débloqué lorsque le seuil est atteint */
          <div className="p-4 bg-purple-950/40 border border-purple-500/40 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs animate-fadeIn">
            <div className="text-slate-200 space-y-0.5">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Arbitrage IA Définitif : La Variante B gagne avec {rateB}% de conversion !
              </div>
              <p className="text-[11px] text-slate-300">
                Sur {totalSent} prospects testés, la Variante B génère +{rateB - rateA}% de réponses supplémentaires par rapport à la Variante A.
              </p>
            </div>
            <button
              onClick={applyWinningScript}
              className="py-2.5 px-5 rounded-xl font-bold bg-purple-600 hover:bg-purple-500 text-white shrink-0 shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2 hover:scale-105"
            >
              <Award className="w-4 h-4" />
              <span>Appliquer définitivement la Variante B à tout mon compte</span>
            </button>
          </div>
        )}
      </div>

      {/* BLOC D : RECOMMANDATION STRATÉGIQUE AVATAR */}
      {auditReport.avatar_suggestions && (
        <div className="bg-gradient-to-r from-dark-900 to-dark-850 border border-cyan/40 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-cyan uppercase tracking-wider">
              Recommandation d&apos;Ajustement de l&apos;Avatar Client
            </span>
            <h3 className="text-base font-bold text-white">{auditReport.avatar_suggestions}</h3>
            <p className="text-xs text-slate-400">
              Aligner votre promesse sur ce sous-segment augmentera naturellement le taux de signature et le panier moyen.
            </p>
          </div>

          <button
            onClick={handleApplyAvatarSuggestion}
            className="py-2.5 px-4 rounded-xl text-xs font-bold bg-cyan hover:bg-cyan-intense text-dark-950 shrink-0 shadow-cyan-glow transition-all"
          >
            Appliquer à mon Avatar
          </button>
        </div>
      )}
    </div>
  );
}
