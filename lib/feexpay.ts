/**
 * Configuration & Intégration FeexPay pour Prospectizi
 * Passerelle de paiement Mobile Money (T-Money, Moov Togo, Wave, MTN, Orange) & Cartes Bancaires.
 */

import { PlanType } from './types';

export const FEEXPAY_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FEEXPAY_API_KEY || 'test_Hg7Kjl3ZAM63UuIUpuudD9nKuu3ZAM67Kjl3Uuhn',
  shopId: process.env.NEXT_PUBLIC_FEEXPAY_SHOP_ID || '698dd650a7ffb88696f5id86',
  mode: (process.env.NEXT_PUBLIC_FEEXPAY_MODE || 'SANDBOX') as 'SANDBOX' | 'LIVE',
  baseUrl: process.env.FEEXPAY_BASE_URL || 'https://api-v2.feexpay.me',
};

export interface PlanPricing {
  eur: number;
  fcfa: number;
  prospects: number;
  title: string;
  description: string;
}

export const PLAN_PRICING: Record<PlanType, PlanPricing> = {
  DECOUVERTE: {
    eur: 1,
    fcfa: 650,
    prospects: 3,
    title: 'Offre Découverte',
    description: '3 prospects qualifiés - Essai unique',
  },
  PRO: {
    eur: 29,
    fcfa: 19000,
    prospects: 90,
    title: 'Plan PRO',
    description: '90 prospects qualifiés / mois',
  },
  AGENCE: {
    eur: 59,
    fcfa: 39000,
    prospects: 450,
    title: 'Plan AGENCE',
    description: '450 prospects qualifiés / mois (5 comptes)',
  },
};

export type PaymentOperator = 
  | 'tmoney' 
  | 'moov_tg' 
  | 'card' 
  | 'wave' 
  | 'mtn' 
  | 'orange';

export interface OperatorOption {
  id: PaymentOperator;
  name: string;
  country: string;
  flag: string;
  badge?: string;
}

export const PAYMENT_OPERATORS: OperatorOption[] = [
  { id: 'tmoney', name: 'T-Money (Togocom)', country: 'Togo', flag: '🇹🇬', badge: 'Populaire Togo' },
  { id: 'moov_tg', name: 'Moov Money Togo', country: 'Togo', flag: '🇹🇬' },
  { id: 'card', name: 'Carte Bancaire (Visa / Mastercard)', country: 'International', flag: '💳', badge: 'Monde' },
  { id: 'wave', name: 'Wave Mobile Money', country: 'UEMOA', flag: '🌊' },
  { id: 'mtn', name: 'MTN Mobile Money', country: 'UEMOA', flag: '🟡' },
  { id: 'orange', name: 'Orange Money', country: 'UEMOA', flag: '🟠' },
];
