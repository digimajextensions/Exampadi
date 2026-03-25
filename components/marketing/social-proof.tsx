export function SocialProof() {
  const schools = [
    'UNIBEN', 'UNILAG', 'UI', 'ABU', 'OAU', 'UNN', 'FUTA', 'LASU', 'YABATECH', 'MAPOLY',
  ];

  return (
    <section className="py-12 bg-white border-y border-border">
      <div className="max-w-[1100px] mx-auto px-5 md:px-12">
        <p className="text-center text-sm text-text-muted mb-6">
          Trusted by students from top Nigerian institutions
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {schools.map((school) => (
            <span
              key={school}
              className="font-display font-bold text-lg text-text-muted/40 hover:text-text-muted/70 transition-colors"
            >
              {school}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
