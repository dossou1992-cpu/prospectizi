export const PADDLE_PRICES = {
  DECOUVERTE: process.env.NEXT_PUBLIC_PADDLE_PRICE_DECOUVERTE || 'pri_01m3mcbzzpxtn4ebh9n0tny4m',
  PRO: process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO || 'pri_01m3mbxb3m147tmnzzveegmk09',
  AGENCE: process.env.NEXT_PUBLIC_PADDLE_PRICE_AGENCE || 'pri_01m3mc1fbnh16wctb5p219b0q3',
};

export const PADDLE_CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'live_86f00e5317030f62f548a3d358b';

export function openPaddleCheckout({
  plan,
  userEmail,
  onSuccess,
  onFallback,
}: {
  plan: 'DECOUVERTE' | 'PRO' | 'AGENCE';
  userEmail?: string;
  onSuccess?: () => void;
  onFallback?: () => void;
}) {
  if (typeof window === 'undefined') return false;

  const priceId = PADDLE_PRICES[plan];

  if ((window as any).Paddle && priceId) {
    try {
      (window as any).Paddle.Initialize({
        token: PADDLE_CLIENT_TOKEN,
        eventCallback: function (data: any) {
          if (data?.name === 'checkout.completed') {
            if (onSuccess) onSuccess();
          }
        },
      });

      (window as any).Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: userEmail ? { email: userEmail } : undefined,
        customData: {
          user_email: userEmail || '',
          plan,
        },
        settings: {
          displayMode: 'overlay',
          theme: 'dark',
          locale: 'fr',
          successUrl: `${window.location.origin}/dashboard?payment=success`,
        },
      });
      return true;
    } catch (err) {
      console.warn('[Paddle Checkout Warning]', err);
    }
  }

  // Fallback instantané si Paddle n'est pas encore prêt
  if (onFallback) onFallback();
  return false;
}
