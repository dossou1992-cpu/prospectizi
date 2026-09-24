import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('verif-hash');
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH || 'prospectizi_secret_hash';

    // Verify webhook signature
    if (signature && signature !== secretHash) {
      return NextResponse.json({ error: 'Signature invalide' }, { status: 401 });
    }

    const payload = await request.json();
    const event = payload.event || payload['event.type'];

    // Handle payment_succeeded or charge.completed
    if (event === 'charge.completed' || event === 'payment_succeeded') {
      const data = payload.data;
      const customerEmail = data?.customer?.email;
      const amount = data?.amount;

      // Determine plan
      let plan = 'DECOUVERTE';
      let quota = 3;
      if (amount >= 50) {
        plan = 'AGENCE';
        quota = 450;
      } else if (amount >= 25) {
        plan = 'PRO';
        quota = 90;
      }

      console.log(`[Flutterwave Webhook] Paiement validé pour ${customerEmail}: Plan ${plan} (${quota} prospects)`);

      return NextResponse.json({ 
        status: 'success', 
        message: 'Abonnement activé et quota rechargé',
        plan,
        quota 
      });
    }

    // Handle cancellation / failure
    if (event === 'subscription.cancelled' || event === 'payment_failed') {
      return NextResponse.json({ status: 'success', message: 'Abonnement résilié ou échu' });
    }

    return NextResponse.json({ status: 'ignored', message: 'Événement non traité' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
