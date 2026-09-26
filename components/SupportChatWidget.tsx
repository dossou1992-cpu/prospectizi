"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  ExternalLink, 
  HelpCircle, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Video,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isEscalation?: boolean;
  whatsappUrl?: string;
}

export default function SupportChatWidget() {
  const { knowledgeBase } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: "Bonjour ! Je suis l'assistant support IA de Prospectizi. Comment puis-je vous aider aujourd'hui ? (Questions sur vos crédits, vos paiements, ou vos messages de prospection ?)",
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = knowledgeBase.whatsappContactNumber || "22890123456";

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Base de connaissances Notion dynamique (Le "Cerveau" IA)
  const answerFromKnowledgeBase = (query: string): { text: string; isEscalation?: boolean; whatsappUrl?: string } => {
    const q = query.toLowerCase();

    // RÈGLE D'ESCALATION 80/20 : Problème de paiement, débit, remboursement, bug critique
    if (
      q.includes('remboursement') || 
      q.includes('débité') || 
      q.includes('double débit') || 
      q.includes('bloqué') || 
      q.includes('paiement échoué') || 
      q.includes('non activé') || 
      q.includes('bug') || 
      q.includes('erreur technique')
    ) {
      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Bonjour, j'ai besoin d'aide urgente sur Prospectizi concernant : ${query}`)}`;
      return {
        text: "Pour traiter votre demande (paiement, activation ou bug technique) en toute sécurité, notre support humain prend immédiatement le relais sur WhatsApp. Vous pouvez également enregistrer une courte vidéo d'écran de 30 secondes via Loom pour nous montrer le problème.",
        isEscalation: true,
        whatsappUrl: waUrl
      };
    }

    // 1. Qu'est-ce que Prospectizi & Quotas
    if (q.includes('prospectizi') || q.includes('quota') || q.includes('crédit') || q.includes('combien')) {
      return {
        text: knowledgeBase.faqSummary || "Prospectizi est un SaaS B2B conçu pour trouver des entreprises ciblées, identifier leurs failles réelles et rédiger des messages de vente personnalisés. Quotas : 3 prospects sur Découverte (1 €), 90/mois sur PRO (29 €), et 450/mois sur AGENCE (59 €)."
      };
    }

    // 2. Moyens de paiement (Lemon Squeezy & Flutterwave)
    if (q.includes('payer') || q.includes('carte') || q.includes('mobile money') || q.includes('wave') || q.includes('t-money') || q.includes('moov') || q.includes('mtn') || q.includes('orange')) {
      return {
        text: knowledgeBase.paymentProcedures || "Deux modes de paiement sécurisés : Carte Bancaire internationale via Lemon Squeezy (MoR, factures) et Mobile Money (T-Money, Moov, Orange, MTN, Wave) via Flutterwave sans carte requise."
      };
    }

    // 3. Scraping & Transparence
    if (q.includes('scraping') || q.includes('apify') || q.includes('données') || q.includes('source') || q.includes('google maps')) {
      return {
        text: knowledgeBase.apifyTransparency || "Les données proviennent de sources professionnelles et publiques (Google Maps, registres légaux). Garantie Anti-Gaspillage : remboursement automatique de crédit en cas de contact inexploitable."
      };
    }

    // 4. Tutoriels & Avatar
    if (q.includes('avatar') || q.includes('métier') || q.includes('recherche') || q.includes('relance')) {
      return {
        text: knowledgeBase.tutorialsSummary || "Renseignez votre Avatar Client pour que l'IA calibre les failles et le ton des messages. Lancez une recherche par ville et secteur, puis utilisez les séquences de relance WhatsApp en 1 clic."
      };
    }

    // 5. Tarifs & Annulation
    if (q.includes('tarif') || q.includes('prix') || q.includes('abonnement') || q.includes('annuler') || q.includes('résilier')) {
      return {
        text: knowledgeBase.pricingRules || "Offres sans engagement, résiliables en 1 clic. Découverte 1 €, PRO 29 €/mois, AGENCE 59 €/mois. Verrouillage temporaire après 30 jours jusqu'au renouvellement pour préserver vos données."
      };
    }

    // Réponse par défaut avec proposition de contact WhatsApp
    const defaultWaUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Bonjour, j'ai une question sur Prospectizi : ${query}`)}`;
    return {
      text: "Je n'ai pas la réponse exacte dans ma base de connaissances actuelle pour cette question. Notre équipe est disponible immédiatement sur WhatsApp pour vous répondre personnellement !",
      isEscalation: true,
      whatsappUrl: defaultWaUrl
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = answerFromKnowledgeBase(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        isEscalation: response.isEscalation,
        whatsappUrl: response.whatsappUrl
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Bouton Flottant Déclencheur en bas à droite */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 p-3.5 rounded-full bg-gradient-to-r from-cyan to-cyan-intense text-dark-950 shadow-cyan-glow hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group"
          title="Assistance & Chatbot IA"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 fill-dark-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="hidden sm:inline font-black text-xs uppercase tracking-wider pr-1">
            Besoin d&apos;aide ?
          </span>
        </button>
      )}

      {/* Fenêtre de Chat Flottante */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[380px] h-[520px] bg-dark-950 border-2 border-cyan/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header du Chat */}
          <div className="p-3.5 bg-gradient-to-r from-dark-900 to-dark-850 border-b border-dark-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan">
                <Sparkles className="w-4 h-4 text-cyan" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-white">Assistant IA Prospectizi</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">En ligne</span>
                </div>
                <p className="text-[10px] text-slate-400">Base Notion &amp; Relais WhatsApp 24/7</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick chips FAQ */}
          <div className="p-2 bg-dark-900 border-b border-dark-800 flex items-center gap-1.5 overflow-x-auto text-[10px] select-none">
            <button
              onClick={() => handleSendMessage("Comment fonctionnent les crédits ?")}
              className="px-2 py-1 rounded-md bg-dark-800 text-slate-300 hover:text-cyan border border-dark-700 whitespace-nowrap transition-colors"
            >
              📊 Quotas &amp; Crédits
            </button>
            <button
              onClick={() => handleSendMessage("Comment payer par Mobile Money ?")}
              className="px-2 py-1 rounded-md bg-dark-800 text-slate-300 hover:text-cyan border border-dark-700 whitespace-nowrap transition-colors"
            >
              📱 Mobile Money
            </button>
            <button
              onClick={() => handleSendMessage("D'où viennent les données de scraping ?")}
              className="px-2 py-1 rounded-md bg-dark-800 text-slate-300 hover:text-cyan border border-dark-700 whitespace-nowrap transition-colors"
            >
              🔍 Origine des données
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-cyan text-dark-950 font-medium rounded-tr-none'
                      : 'bg-dark-850 text-slate-200 border border-dark-700 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Bouton de transfert WhatsApp pour les 20% de cas complexes */}
                {msg.isEscalation && msg.whatsappUrl && (
                  <div className="mt-2 w-[85%]">
                    <a
                      href={msg.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <span>Prendre le relais sur WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-dark-850 rounded-xl w-16 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Footer */}
          <div className="p-2.5 bg-dark-900 border-t border-dark-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Posez votre question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-dark-950 border border-dark-700 focus:border-cyan rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-cyan hover:bg-cyan-intense disabled:opacity-40 text-dark-950 shadow-cyan-glow transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
