'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Copy, Share2, Gift, Users } from 'lucide-react';

const REFERRAL_TIERS = [
  { count: 3, bonus: 'N500 extra airtime' },
  { count: 5, bonus: 'N1,000 extra airtime' },
  { count: 10, bonus: 'N2,500 extra airtime' },
  { count: 20, bonus: 'N5,000 extra airtime + 1 month free' },
];

export default function ReferralPage() {
  const referralCode = 'EXAMPADI2025'; // placeholder
  const referralLink = `https://exampadi.ng/ref/${referralCode}`;
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = `Hey! I have been using ExamPadi to prepare for exams and it is really helping. Use my link to sign up and we both benefit: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-text-primary">Refer & Earn</h1>
        <p className="text-text-secondary text-sm mt-1">Share ExamPadi with coursemates and earn airtime rewards.</p>
      </div>

      {/* Referral link card */}
      <Card className="bg-green-50 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="h-6 w-6 text-green-500" />
          <CardTitle>Your Referral Link</CardTitle>
        </div>
        <div className="flex gap-2">
          <input
            readOnly
            value={referralLink}
            className="flex-1 bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
          />
          <Button variant="outline" onClick={copyLink}>
            <Copy className="h-4 w-4 mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        <div className="flex gap-2 mt-3">
          <Button size="sm" onClick={shareWhatsApp}>
            <Share2 className="h-4 w-4 mr-1" /> Share on WhatsApp
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <Users className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <div className="font-display font-bold text-2xl text-text-primary">0</div>
          <div className="text-xs text-text-muted">Referrals</div>
        </Card>
        <Card className="text-center">
          <Gift className="h-6 w-6 text-gold-500 mx-auto mb-2" />
          <div className="font-display font-bold text-2xl text-text-primary">N0</div>
          <div className="text-xs text-text-muted">Earned</div>
        </Card>
        <Card className="text-center">
          <Gift className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="font-display font-bold text-2xl text-text-primary">N0</div>
          <div className="text-xs text-text-muted">Pending</div>
        </Card>
      </div>

      {/* Tier ladder */}
      <Card>
        <CardTitle>Bonus Tiers</CardTitle>
        <p className="text-sm text-text-secondary mt-1 mb-4">Earn extra rewards as you refer more friends.</p>
        <div className="space-y-3">
          {REFERRAL_TIERS.map((tier) => (
            <div key={tier.count} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
              <span className="w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-sm font-bold text-gold-500">
                {tier.count}
              </span>
              <div className="flex-1">
                <div className="font-medium text-sm text-text-primary">{tier.count} referrals</div>
                <div className="text-xs text-text-muted">{tier.bonus}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* How it works */}
      <Card>
        <CardTitle>How It Works</CardTitle>
        <div className="mt-3 space-y-3 text-sm text-text-secondary">
          <p>1. Share your referral link with coursemates</p>
          <p>2. When they sign up and subscribe, you earn airtime: N200 (Starter), N350 (Scholar), or N500 (Scholar Pro)</p>
          <p>3. Airtime is sent to your phone after 7 days of their active subscription</p>
          <p>4. Hit tier milestones for bonus rewards</p>
        </div>
      </Card>
    </div>
  );
}
