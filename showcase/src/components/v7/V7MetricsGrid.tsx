import { STATS } from "../../data/catalog";

export function V7MetricsGrid() {
  const METRICS = [
    {
      title: "Engineering teams eliminate weeks of animation guesswork",
      stat: `${STATS.components}+`,
      label: "Forensic components rebuilt 1:1 from award-winning sites",
    },
    {
      title: "Precision physics measured down to the exact millisecond timeline",
      stat: "35",
      label: "Measured cubic-bezier curves and spring constants",
    },
    {
      title: "Self-contained architecture with zero external runtime overhead",
      stat: "0 sec",
      label: "Setup time to first render, 100% clean diffs",
    },
  ];

  return (
    <section className="my-20 sm:my-28 border-y border-rule py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-rule">
        {METRICS.map((m, idx) => (
          <div key={idx} className={`${idx !== 0 ? "pt-8 md:pt-0 md:pl-8" : ""} flex flex-col justify-between`}>
            <p className="text-[17px] sm:text-[18px] font-medium text-ink leading-snug mb-8">
              {m.title}
            </p>
            <div>
              <div className="type-serif text-5xl sm:text-6xl font-normal text-ink tracking-tight mb-2">
                {m.stat}
              </div>
              <p className="text-xs text-muted leading-relaxed">
                {m.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
