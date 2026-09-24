import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
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

      console.log(`[LemonSqueezy Webhook] Paiement réussi pour ${userEmail}: Plan ${plan}`);
      return NextResponse.json({ status: 'success', plan, quota });
    }

    return NextResponse.json({ status: 'received' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
