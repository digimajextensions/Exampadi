import axios from 'axios';
import crypto from 'crypto';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || '';
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

const paystackApi = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET}`,
    'Content-Type': 'application/json',
  },
});

export const PLAN_CODES = {
  starter: process.env.PAYSTACK_STARTER_PLAN_CODE || '',
  scholar: process.env.PAYSTACK_SCHOLAR_PLAN_CODE || '',
  scholar_pro: process.env.PAYSTACK_SCHOLAR_PRO_PLAN_CODE || '',
} as const;

export type PlanTier = 'free' | 'starter' | 'scholar' | 'scholar_pro';

export async function initializeTransaction(params: {
  email: string;
  amount: number;
  plan: string;
  metadata?: Record<string, unknown>;
  callback_url?: string;
}) {
  const response = await paystackApi.post('/transaction/initialize', {
    email: params.email,
    amount: params.amount * 100, // Paystack uses kobo
    plan: params.plan,
    metadata: params.metadata,
    callback_url: params.callback_url,
  });
  return response.data.data as { authorization_url: string; access_code: string; reference: string };
}

export async function verifyTransaction(reference: string) {
  const response = await paystackApi.get(`/transaction/verify/${reference}`);
  return response.data.data;
}

export async function getSubscription(subscriptionCode: string) {
  const response = await paystackApi.get(`/subscription/${subscriptionCode}`);
  return response.data.data;
}

export async function disableSubscription(params: { code: string; token: string }) {
  const response = await paystackApi.post('/subscription/disable', params);
  return response.data;
}

export async function enableSubscription(params: { code: string; token: string }) {
  const response = await paystackApi.post('/subscription/enable', params);
  return response.data;
}

export function verifyWebhookSignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_WEBHOOK_SECRET || '')
    .update(body)
    .digest('hex');
  return hash === signature;
}
