import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature');
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || 'prospectizi_lemon_secret';

    // Verify Lemon Squeezy HMAC SHA-256 signature if secret configured
    if (signature && secret) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
      const signatureBuffer = Buffer.from(signature, 'utf8');

      if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
        return NextResponse.json({ error: 'Signature Lemon Squeezy invalide' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const data = payload.data?.attributes;

    if (eventName === 'order_created' || eventName === 'subscription_created') {
      const userEmail = data?.user_email;
      const variantName = data?.first_order_item?.variant_name || '';

      let plan = 'PRO';
      let quota = 90;
      if (variantName.toLowerCase().includes('agence')) {
        plan = 'AGENCE';
        quota = 450;
      } else if (variantName.toLowerCase().includes('decouverte')) {
        plan = 'DECOUVERTE';
        quota = 3;
      }

      console.log(`[LemonSqueezy Webhook] Paiement validé pour ${userEmail}: Plan ${plan} (${quota} prospects)`);

      // Synchronisation directe dans la base de données Supabase
      if (supabaseAdmin && userEmail) {
        try {
          const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('email', userEmail)
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
            console.log(`[Supabase] Abonnement Lemon Squeezy activé pour ${userEmail}`);
          }
        } catch (dbErr) {
          console.error("[Supabase Update Error]", dbErr);
        }
      }

      return NextResponse.json({ status: 'success', plan, quota });
    }

    return NextResponse.json({ status: 'received' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
