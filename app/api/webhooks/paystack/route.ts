import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/paystack';
import { insforge } from '@/lib/insforge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-paystack-signature') || '';

    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);

    switch (event.event) {
      case 'subscription.create': {
        const { customer, plan, subscription_code } = event.data;
        const planTier = getPlanTierFromCode(plan.plan_code);

        await insforge.db.execute(
          `UPDATE students SET plan = $1, subscription_code = $2, subscription_status = 'active',
           trial_ends_at = NOW() + INTERVAL '3 days'
           WHERE email = $3`,
          [planTier, subscription_code, customer.email]
        );
        break;
      }

      case 'invoice.payment_failed': {
        const { customer } = event.data;
        await insforge.db.execute(
          `UPDATE students SET subscription_status = 'past_due' WHERE email = $1`,
          [customer.email]
        );
        break;
      }

      case 'subscription.disable': {
        const { customer } = event.data;
        await insforge.db.execute(
          `UPDATE students SET plan = 'free', subscription_status = 'cancelled' WHERE email = $1`,
          [customer.email]
        );
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

function getPlanTierFromCode(planCode: string): string {
  const starterCode = process.env.PAYSTACK_STARTER_PLAN_CODE;
  const scholarCode = process.env.PAYSTACK_SCHOLAR_PLAN_CODE;
  const scholarProCode = process.env.PAYSTACK_SCHOLAR_PRO_PLAN_CODE;

  if (planCode === starterCode) return 'starter';
  if (planCode === scholarCode) return 'scholar';
  if (planCode === scholarProCode) return 'scholar_pro';
  return 'free';
}
