const STATS = [
  { value: '2x', label: 'Better retention with Socratic method', sublabel: 'Harvard study, 2019' },
  { value: '40+', label: 'AI questions per day', sublabel: 'Even on Starter plan' },
  { value: '100+', label: 'Nigerian institutions supported', sublabel: 'Universities, polytechnics, COEs' },
  { value: '3 days', label: 'Free trial', sublabel: 'No credit card required' },
];

export function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-extrabold text-4xl md:text-5xl text-green-500 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-text-primary mb-1">{stat.label}</div>
              <div className="text-xs text-text-muted">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
