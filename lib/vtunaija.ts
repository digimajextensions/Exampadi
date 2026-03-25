import { generateRequestId } from './utils';

const VTUNAIJA_API_KEY = process.env.VTUNAIJA_API_KEY || '';

interface NetworkMap {
  [key: string]: number;
}

const NETWORK_IDS: NetworkMap = {
  mtn: 1,
  airtel: 2,
  glo: 3,
  '9mobile': 4,
  etisalat: 4,
};

function getNetworkId(network: string): number {
  return NETWORK_IDS[network.toLowerCase()] || 1;
}

export async function sendAirtime(phone: string, amount: number, network: string) {
  try {
    const response = await fetch('https://vtunaija.com.ng/api/airtime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${VTUNAIJA_API_KEY}`,
      },
      body: JSON.stringify({
        phone,
        network_id: getNetworkId(network),
        amount,
        request_id: generateRequestId(),
      }),
    });

    const data = await response.json();
    return {
      success: data.status === 'success',
      transactionId: data.transaction_id,
      message: data.message,
    };
  } catch (error) {
    console.error('VTU Naija airtime error:', error);
    return { success: false, message: 'Failed to send airtime' };
  }
}

export function detectNetwork(phone: string): string {
  const cleaned = phone.replace(/\D/g, '').replace(/^234/, '0');
  const prefix = cleaned.slice(0, 4);

  const mtnPrefixes = ['0803', '0806', '0703', '0706', '0810', '0813', '0814', '0816', '0903', '0906', '0913', '0916'];
  const airtelPrefixes = ['0802', '0808', '0708', '0812', '0701', '0902', '0907', '0912'];
  const gloPrefixes = ['0805', '0807', '0705', '0815', '0811', '0905', '0915'];
  const nineMobilePrefixes = ['0809', '0818', '0817', '0908', '0909'];

  if (mtnPrefixes.includes(prefix)) return 'mtn';
  if (airtelPrefixes.includes(prefix)) return 'airtel';
  if (gloPrefixes.includes(prefix)) return 'glo';
  if (nineMobilePrefixes.includes(prefix)) return '9mobile';
  return 'mtn'; // default
}
