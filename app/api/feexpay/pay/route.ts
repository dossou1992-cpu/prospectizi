import { NextResponse } from 'next/server';
import { FEEXPAY_CONFIG, PLAN_PRICING } from '@/lib/feexpay';
import { PlanType } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan, operator, phoneNumber, customerName, customerEmail, amount } = body;

    if (!plan || !PLAN_PRICING[plan as PlanType]) {
      return NextResponse.json({ success: false, error: 'Formule invalide' }, { status: 400 });
    }

    const planData = PLAN_PRICING[plan as PlanType];
    const isSandbox = FEEXPAY_CONFIG.mode === 'SANDBOX';

    // 1. Mode Sandbox (Développement / Tests)
    if (isSandbox) {
      const mockRef = `FPX-SBX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      return NextResponse.json({
        success: true,
        mode: 'SANDBOX',
        reference: mockRef,
        message: 'Transaction de test approuvée avec succès',
        plan,
        quota: planData.prospects,
      });
    }

    // 2. Mode Live (Passerelle réelle FeexPay)
    const cleanPhone = (phoneNumber || '').replace(/\D/g, '');
    const togoPhone = cleanPhone.startsWith('228') ? cleanPhone : `228${cleanPhone}`;

    const feexPayNetwork = operator === 'tmoney' 
      ? 'tmoney' 
      : operator === 'moov_tg' 
        ? 'moov' 
        : 'tmoney';

    const feexResponse = await fetch(`${FEEXPAY_CONFIG.baseUrl}/api/transactions/public/requesttopay/${feexPayNetwork}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FEEXPAY_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop: FEEXPAY_CONFIG.shopId,
        amount: planData.fcfa,
        phoneNumber: Number(togoPhone),
        first_name: customerName || 'Client',
        last_name: 'Prospectizi',
        description: `Abonnement ${planData.title}`,
        callback_info: customerEmail || '',
      }),
    });

    const data = await feexResponse.json();

    if (!feexResponse.ok) {
      return NextResponse.json({
        success: false,
        error: data.message || 'Erreur lors de l’initiation FeexPay',
      }, { status: feexResponse.status });
    }

    return NextResponse.json({
      success: true,
      reference: data.reference || data.id,
      status: data.status,
      message: 'Demande USSD envoyée au client',
    });

  } catch (error: any) {
    console.error('[FeexPay API Error]:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Erreur interne du serveur',
    }, { status: 500 });
  }
}
