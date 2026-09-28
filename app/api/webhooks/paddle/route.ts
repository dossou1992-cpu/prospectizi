import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('paddle-signature');
    const secretKey = process.env.PADDLE_WEBHOOK_SECRET_KEY;

    // Verify Paddle HMAC-SHA256 signature if secret configured
    if (signature && secretKey) {
      try {
        const parts = signature.split(';');
        const tsMatch = parts.find(p => p.startsWith('ts='))?.split('=')[1];
        const h1Match = parts.find(p => p.startsWith('h1='))?.split('=')[1];

        if (tsMatch && h1Match) {
          const signedPayload = `${tsMatch}:${rawBody}`;
          const expectedH1 = crypto.createHmac('sha256', secretKey).update(signedPayload).digest('hex');
          if (expectedH1 !== h1Match) {
            return NextResponse.json({ error: 'Signature Paddle invalide' }, { status: 401 });
          }
        }
      } catch (sigErr) {
        console.warn('[Paddle Webhook] Erreur vérification signature:', sigErr);
      }
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.event_type;
    const data = payload.data;

    // Traitement des transactions validées et nouveaux abonnements
    if (eventType === 'transaction.completed' || eventType === 'subscription.created') {
      const customerEmail = data?.customer?.email || data?.custom_data?.user_email;
      const items = data?.items || [];
      const itemDescription = items.map((i: any) => `${i?.price?.description || ''} ${i?.product?.name || ''}`).join(' ').toLowerCase();
      const customPlan = data?.custom_data?.plan?.toUpperCase();

      const priceIds = items.map((i: any) => i?.price?.id || '').join(' ');
      let plan = 'DECOUVERTE';
      let quota = 3;

      if (priceIds.includes('pri_01m3mc1fbnh16wctb5p219b0q3') || customPlan === 'AGENCE' || itemDescription.includes('agence')) {
        plan = 'AGENCE';
        quota = 450;
      } else if (priceIds.includes('pri_01m3mbxb3m147tmnzzveegmk09') || customPlan === 'PRO' || itemDescription.includes('pro')) {
        plan = 'PRO';
        quota = 90;
      } else if (priceIds.includes('pri_01m3mcbzzpxtn4ebh9n0tny4m') || customPlan === 'DECOUVERTE' || itemDescription.includes('decouverte')) {
        plan = 'DECOUVERTE';
        quota = 3;
      }

      console.log(`[Paddle Webhook] Paiement validé pour ${customerEmail}: Plan ${plan} (${quota} prospects)`);

      // Synchronisation directe dans Supabase
      if (supabaseAdmin && customerEmail) {
        try {
          const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('email', customerEmail)
            .single();

          if (profile?.id) {
            await supabaseAdmin
              .from('subscriptions')
              .update({
                plan_type: plan,
                status: 'active',
                prospects_quota: quota,
                prospects_used: 0,
                current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                auto_renew: true,
                updated_at: new Date().toISOString()
              })
              .eq('user_id', profile.id);
            console.log(`[Supabase] Abonnement Paddle activé avec succès pour ${customerEmail}`);
          }
        } catch (dbErr) {
          console.error('[Supabase Paddle Sync Error]', dbErr);
        }
      }

      return NextResponse.json({ status: 'success', plan, quota });
    }

    return NextResponse.json({ status: 'received' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
