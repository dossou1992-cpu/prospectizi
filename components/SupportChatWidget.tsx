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

  // Base de connaissances Notion dynamique & Moteur Conversationnel IA
  const answerFromKnowledgeBase = (query: string): { text: string; isEscalation?: boolean; whatsappUrl?: string } => {
    const q = query.toLowerCase().trim();

    // 1. SALUTATIONS & POLITESSE
    if (
      q === 'bonjour' || 
      q === 'bonsoir' || 
      q === 'salut' || 
      q === 'hello' || 
      q === 'coucou' || 
      q === 'hey' || 
      q.startsWith('bonjour') || 
      q.startsWith('bonsoir') || 
      q.startsWith('salut') || 
      q.startsWith('hello') ||
      q.includes('ca va') ||
      q.includes('ça va') ||
      q.includes('comment vas-tu') ||
      q.includes('comment allez-vous')
    ) {
      return {
        text: "Bonjour ! Ravi de vous accueillir sur Prospectizi 👋 Slogan : \"Trouvez & contactez mieux !\".\n\nComment puis-je vous aider aujourd'hui ? Je peux répondre à toutes vos questions sur :\n• Le fonctionnement de la recherche et de l'Avatar Client\n• Vos quotas de prospects (Découverte, PRO, AGENCE)\n• Les moyens de paiement (Carte Bancaire & Mobile Money)\n• Le déblocage de +3 prospects bonus offerts via un avis Loom ou LinkedIn !"
      };
    }

    // 2. PROBLÈMES DE CONNEXION / COMPTE / MOT DE PASSE / ACCÈS
    if (
      q.includes('connexion') || 
      q.includes('connecter') || 
      q.includes('connecte') || 
      q.includes('mot de passe') || 
      q.includes('login') || 
      q.includes('accès') || 
      q.includes('acces') || 
      q.includes('compte') || 
      q.includes('inscription') || 
      q.includes('inscrire') || 
      q.includes('identifiant') || 
      q.includes('reconnecter')
    ) {
      return {
        text: "Pour vous connecter à votre espace Prospectizi :\n1. Cliquez sur le bouton \"Connexion\" en haut à droite de l'écran.\n2. Choisissez votre mode préféré : soit en 1 clic avec votre compte Google, soit avec votre E-mail et votre mot de passe.\n\n💡 Si vous avez oublié votre mot de passe ou si vous rencontrez un blocage sur votre session, vous pouvez cliquer sur \"Mot de passe oublié ?\" ou contacter notre support direct sur WhatsApp avec votre adresse e-mail pour un rétablissement immédiat !",
        whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Bonjour, j'ai un problème de connexion sur Prospectizi avec mon compte : ${query}`)}`,
        isEscalation: false
      };
    }

    // 3. RÈGLE D'ESCALATION 80/20 : PAIEMENT DÉBITÉ, REMBOURSEMENT, BUG TECHNIQUE BLOQUANT
    if (
      q.includes('remboursement') || 
      q.includes('rembourser') || 
      q.includes('débité') || 
      q.includes('debite') || 
      q.includes('double débit') || 
      q.includes('bloqué') || 
      q.includes('bloque') || 
      q.includes('paiement échoué') || 
      q.includes('non activé') || 
      q.includes('pas activé') || 
      q.includes('bug') || 
      q.includes('erreur') || 
      q.includes('panne') || 
      q.includes('urgent')
    ) {
      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Bonjour, j'ai besoin d'une prise en charge prioritaire sur Prospectizi : ${query}`)}`;
      return {
        text: "Pour les demandes prioritaires (compte débité non activé, demande de remboursement ou anomalie technique), notre support humain vous prend en charge directement sur WhatsApp en moins de 15 minutes !\n\nVous pouvez nous envoyer la capture de votre SMS de débit ou un court enregistrement d'écran Loom (loom.com).",
        isEscalation: true,
        whatsappUrl: waUrl
      };
    }

    // 4. COMMENT ÇA MARCHE / DÉMARRAGE RAPIDE
    if (
      q.includes('comment ça marche') || 
      q.includes('comment ca marche') || 
      q.includes('comment marche') || 
      q.includes('démarrer') || 
      q.includes('demarrer') || 
      q.includes('commencer') || 
      q.includes('fonctionne') || 
      q.includes('guide') || 
      q.includes('tuto') || 
      q.includes('aide')
    ) {
      return {
        text: "Prospectizi propulse votre prospection B2B en 3 étapes clés :\n\n1. **Avatar Client (`/avatar`)** : Vous configurez votre offre, votre bénéfice majeur et votre cible pour calibrer l'IA.\n2. **Recherche Ciblée (`/prospects`)** : Vous tapez le métier recherché (ex: Dentiste, Agence Web, IA Engineering) et la ville. L'IA extrait des entreprises réelles et détecte leurs failles concrètes.\n3. **Messages Prêts à l'Envoi** : L'IA rédige une séquence complète de 5 messages ultra-personnalisés (Premier contact, Offre de valeur, 3 relances) à envoyer en 1 clic par WhatsApp, Email ou LinkedIn !"
      };
    }

    // 5. BONUS +3 PROSPECTS / AVIS LOOM / LINKEDIN
    if (
      q.includes('bonus') || 
      q.includes('avis') || 
      q.includes('+3') || 
      q.includes('loom') || 
      q.includes('linkedin') || 
      q.includes('témoignage') || 
      q.includes('temoignage') || 
      q.includes('gratuit') || 
      q.includes('offert')
    ) {
      return {
        text: "⭐ Vous pouvez obtenir **+3 prospects qualifiés bonus gratuits** !\n\nCliquez sur le bouton **\"⭐ Avis Utilisateur Réel (+3)\"** dans la barre supérieure :\n• **Option 1 : Vidéo Loom (60 secondes)** partageant votre expérience sur l'outil.\n• **Option 2 : Post d'avis sur LinkedIn** (copiez notre modèle et collez l'URL de votre publication).\n\nDès validation par notre équipe d'administration, vos 3 crédits bonus sont immédiatement ajoutés à votre compte !"
      };
    }

    // 6. QUOTAS, CRÉDITS & PLANS TARIFAIRES
    if (
      q.includes('quota') || 
      q.includes('crédit') || 
      q.includes('credit') || 
      q.includes('combien') || 
      q.includes('tarif') || 
      q.includes('prix') || 
      q.includes('forfait') || 
      q.includes('abonnement') || 
      q.includes('formule') || 
      q.includes('pro') || 
      q.includes('agence') || 
      q.includes('découverte')
    ) {
      return {
        text: "1 prospect extrait = 1 crédit de prospection.\n\nNos formules disponibles sans engagement :\n• **Formule Découverte (1 €)** : 3 prospects qualifiés complets pour tester l'outil.\n• **Formule PRO (29 € HT/mois)** : 90 prospects qualifiés par mois (3/jour ouvré) + Séquences IA complètes.\n• **Formule AGENCE (59 € HT/mois)** : 450 prospects qualifiés par mois (15/jour ouvré) + Mode Multi-Comptes / Équipe.\n\nVos quotas sont renouvelés chaque mois à la date d'anniversaire."
      };
    }

    // 7. MOYENS DE PAIEMENT (LEMON SQUEEZY & FLUTTERWAVE)
    if (
      q.includes('payer') || 
      q.includes('paiement') || 
      q.includes('carte') || 
      q.includes('cb') || 
      q.includes('visa') || 
      q.includes('mastercard') || 
      q.includes('mobile money') || 
      q.includes('t-money') || 
      q.includes('tmoney') || 
      q.includes('moov') || 
      q.includes('wave') || 
      q.includes('mtn') || 
      q.includes('orange') || 
      q.includes('facture')
    ) {
      return {
        text: "Prospectizi accepte deux moyens de paiement 100% sécurisés :\n\n1. **Carte Bancaire Internationale via Lemon Squeezy** : Visa, Mastercard, factures avec TVA automatique transmise par e-mail.\n2. **Mobile Money Afrique via Flutterwave** : T-Money (Togo), Moov Africa, Wave (Sénégal, Côte d'Ivoire), MTN MoMo, Orange Money, sans aucune carte bancaire requise !\n\nL'activation du forfait est instantanée après confirmation de votre opérateur."
      };
    }

    // 8. AVATAR CLIENT & PERSONNALISATION
    if (
      q.includes('avatar') || 
      q.includes('métier') || 
      q.includes('metier') || 
      q.includes('offre') || 
      q.includes('cible') || 
      q.includes('ton') || 
      q.includes('personnalisation')
    ) {
      return {
        text: "L'Avatar Client (`/avatar`) calibre la pertinence de l'IA :\n• Vous pouvez saisir n'importe quel métier, y compris sur-mesure (ex: \"IA Engineering\", \"Consultant Growth\", \"Agence Vidéo TikTok\").\n• Définissez votre bénéfice majeur et votre ton préféré (professionnel, chaleureux, persuasif, direct).\n• L'IA utilisera ces informations pour identifier les failles spécifiques des entreprises trouvées et formuler l'offre idéale !"
      };
    }

    // 9. EXTRACTION, DONNÉES & SCRAPING (ANTI-GASPILLAGE)
    if (
      q.includes('scraping') || 
      q.includes('données') || 
      q.includes('donnees') || 
      q.includes('source') || 
      q.includes('google maps') || 
      q.includes('apify') || 
      q.includes('garantie') || 
      q.includes('injoignable') || 
      q.includes('faux')
    ) {
      return {
        text: "Nos données de prospection sont 100% professionnelles, publiques et conformes au RGPD B2B (Google Maps et annuaires d'entreprises officiels).\n\n🛡️ **Garantie Anti-Gaspillage** : Si un numéro de téléphone ou un e-mail extrait s'avère non joignable, cliquez sur \"Signaler un contact erroné\" sur la fiche du prospect. Votre crédit vous est automatiquement recrédité sans formalité !"
      };
    }

    // 10. EXPORT CSV & DONNÉES RGPD
    if (
      q.includes('export') || 
      q.includes('csv') || 
      q.includes('excel') || 
      q.includes('télécharger') || 
      q.includes('telecharger')
    ) {
      return {
        text: "Vous pouvez exporter tous vos prospects et messages au format CSV (compatible Excel et Google Sheets) en un clic !\n\nCliquez sur le bouton **\"Exporter en CSV\"** en haut à droite de la page Prospects (`/prospects`) ou dans les Paramètres (`/settings`). L'export est inclus dans tous les forfaits PRO et AGENCE."
      };
    }

    // 11. A/B TESTING & AUDIT
    if (
      q.includes('a/b') || 
      q.includes('ab test') || 
      q.includes('variante') || 
      q.includes('audit') || 
      q.includes('conversion') || 
      q.includes('statistiques')
    ) {
      return {
        text: "Dans la page Audit (`/audit`), activez l'A/B Testing en 1 clic. Vous pourrez choisir d'envoyer la **Variante A** ou la **Variante B** à chaque prospect. Après plusieurs jours de tests réels, l'IA compare les taux de réponses et vous recommande la variante gagnante à appliquer définitivement !"
      };
    }

    // 12. ÉQUIPE & MULTI-COMPTES
    if (
      q.includes('équipe') || 
      q.includes('equipe') || 
      q.includes('collaborateur') || 
      q.includes('inviter') || 
      q.includes('membre')
    ) {
      return {
        text: "La gestion d'équipe est disponible avec la formule **AGENCE (59 €/mois)**. Rendez-vous dans l'onglet Équipe (`/team`) pour inviter vos collaborateurs par e-mail en leur attribuant des rôles (Admin, Éditeur, Lecteur)."
      };
    }

    // 13. QUI ÊTES-VOUS / SLOGAN / IDENTITÉ
    if (
      q.includes('qui es-tu') || 
      q.includes('qui êtes-vous') || 
      q.includes('qui est-ce') || 
      q.includes('slogan') || 
      q.includes('présente-toi')
    ) {
      return {
        text: "Je suis l'assistant support virtuel officiel de **Prospectizi** ! Notre mission : vous aider à prospecter plus intelligemment et signer plus de clients. Slogan officiel : \"Trouvez & contactez mieux !\" 🎯"
      };
    }

    // RÉPONSE ENRICHIE PAR DÉFAUT + RELAIS WHATSAPP SIMPLE
    const defaultWaUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Bonjour, j'ai une question spécifique sur Prospectizi : ${query}`)}`;
    return {
      text: `J'ai bien noté votre message concernant "${query.length > 50 ? query.substring(0, 50) + '...' : query}".\n\nPour vous donner la réponse la plus précise possible, sur quel sujet porte votre besoin ?\n1. 🔍 **Recherche de prospects & Avatar Client**\n2. 💳 **Paiement, factures ou renouvellement**\n3. 🔑 **Problème de connexion ou compte**\n4. ⭐ **Crédits bonus offerts (+3) via avis Loom ou LinkedIn**\n\nSi vous préférez échanger directement avec un conseiller humain, cliquez sur le bouton ci-dessous pour ouvrir une conversation WhatsApp prioritaire !`,
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
              onClick={() => handleSendMessage("Bonjour !")}
              className="px-2 py-1 rounded-md bg-dark-800 text-slate-300 hover:text-cyan border border-dark-700 whitespace-nowrap transition-colors"
            >
              👋 Bonjour
            </button>
            <button
              onClick={() => handleSendMessage("J'ai un problème de connexion")}
              className="px-2 py-1 rounded-md bg-dark-800 text-slate-300 hover:text-cyan border border-dark-700 whitespace-nowrap transition-colors"
            >
              🔑 Connexion
            </button>
            <button
              onClick={() => handleSendMessage("Comment ça marche ?")}
              className="px-2 py-1 rounded-md bg-dark-800 text-slate-300 hover:text-cyan border border-dark-700 whitespace-nowrap transition-colors"
            >
              🚀 Comment ça marche ?
            </button>
            <button
              onClick={() => handleSendMessage("Comment débloquer les +3 prospects bonus offerts ?")}
              className="px-2 py-1 rounded-md bg-dark-800 text-slate-300 hover:text-cyan border border-dark-700 whitespace-nowrap transition-colors"
            >
              ⭐ +3 Bonus offerts
            </button>
            <button
              onClick={() => handleSendMessage("Comment fonctionnent les quotas et crédits ?")}
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
