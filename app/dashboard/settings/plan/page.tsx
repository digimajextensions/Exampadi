import { PricingPreview } from '@/components/marketing/pricing-preview';

export default function PlanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-text-primary">Choose a Plan</h1>
        <p className="text-text-secondary text-sm mt-1">Upgrade to unlock more AI questions, uploads, and features.</p>
      </div>
      <PricingPreview />
    </div>
  );
}
