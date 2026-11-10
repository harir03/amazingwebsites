import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    firm: "Senior Staff Engineer at Vercel ecosystem partner",
    quote: "Anyone can clone HTML and Tailwind classes, but replicating the exact cubic-bezier spring physics is where everyone fails. Frontend Copied solved that.",
  },
  {
    firm: "Design Systems Lead at Fintech Series B",
    quote: "Every serious team will be using AI agents to scaffold production UI. Having exact token sets and measured curves ready to drop in saved us 3 weeks.",
    highlight: true,
  },
  {
    firm: "Founder at WebGL Creative Studio",
    quote: "We're auditing complex canvas interactions every week. Having pure TypeScript and standalone Vanilla HTML side-by-side is the cleanest workflow I've seen.",
  },
];

export function FounderQuotes() {
  return (
    <section className="my-20 sm:my-28">
      {/* V7 Labs Editorial Headline */}
      <div className="mb-12">
        <span className="text-xs font-mono uppercase tracking-wider text-muted">Testimonials</span>
        <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink mt-1">
          What engineers and founders are saying.
        </h2>
      </div>

      {/* Editorial Quote Cards matching V7 Labs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col justify-between rounded-2xl border p-7 sm:p-8 transition-all ${
              t.highlight
                ? "border-rule-strong bg-surface shadow-md"
                : "border-rule bg-surface/70 hover:border-rule-strong"
            }`}
          >
            <div>
              <p className="type-serif text-[20px] sm:text-[22px] font-normal text-ink leading-relaxed mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-rule/50">
              <p className="text-xs font-medium text-muted">{t.firm}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
