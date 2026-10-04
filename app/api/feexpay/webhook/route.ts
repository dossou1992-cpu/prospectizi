import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log('[FeexPay Webhook Received]:', payload);

    // FeexPay payload contains status, reference, amount, callback_info
    const status = (payload.status || payload.state || '').toUpperCase();
    const reference = payload.reference || payload.id || '';
    const amount = Number(payload.amount || 0);
    const customerEmail = payload.callback_info || payload.email || payload.customer_email;

    if (status === 'SUCCESSFUL' || status === 'SUCCESS') {
      let plan = 'DECOUVERTE';
      let quota = 3;

      if (amount >= 30000) {
        plan = 'AGENCE';
        quota = 450;
      } else if (amount >= 15000) {
        plan = 'PRO';
        quota = 90;
      }

      console.log(`[FeexPay Webhook] Paiement validé pour ${customerEmail} (Réf: ${reference}) : Plan ${plan} (${quota} prospects)`);

      // Synchronisation directe dans la base de données Supabase si configurée
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
                updated_at: new Date().toISOString(),
              })
              .eq('user_id', profile.id);
            console.log(`[Supabase] Abonnement FeexPay rechargé pour ${customerEmail}`);
          }
        } catch (dbErr) {
          console.error('[Supabase Update Error]', dbErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Abonnement activé avec succès',
        plan,
        quota,
        reference,
      });
    }

    return NextResponse.json({ success: true, message: 'Notification reçue', status });
  } catch (error: any) {
    console.error('[FeexPay Webhook Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
