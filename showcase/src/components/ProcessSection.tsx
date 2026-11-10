import { motion } from "framer-motion";
import { Eye, Code2, Rocket, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Explore Archetypes",
    desc: "Browse 7 distinct design cultures: Brutalist Pixel, CAD Blueprint, Fintech Glass, WebGL Fluidity, Storybook Serif, GPGPU Particles, and Minimalist Monolith.",
    icon: Eye,
  },
  {
    step: "02",
    title: "Inspect Code & Physics",
    desc: "Toggle between pure React + Tailwind TSX and standalone Vanilla HTML. Test measured bezier curves in the live preview stage.",
    icon: Code2,
  },
  {
    step: "03",
    title: "Drop In or Prompt AI",
    desc: "Copy and paste directly into your repo with 0 lock-in, or copy the 5-point prompt to have Cursor or Claude build it into your application.",
    icon: Rocket,
  },
];

export function ProcessSection({ onExplore }: { onExplore?: () => void }) {
  return (
    <section id="process" className="relative my-20 sm:my-32 scroll-mt-24">
      {/* Centered Heading Pill & Title (Velocity inspo) */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold text-orange-400 mb-3 shadow-[0_0_12px_rgba(255,107,0,0.15)]">
          <span>Process</span>
        </div>
        <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
          The Process: Fast, Clear, Done
        </h2>
        <p className="mt-3 text-[15px] sm:text-[16px] text-muted max-w-lg leading-relaxed">
          No endless config. No complex build pipelines. Just forensic, drop-in components that drop cleanly into any stack.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.step}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-orange-500/15 bg-surface/90 p-7 backdrop-blur-md hover:border-orange-500/40 hover:shadow-[0_16px_40px_-10px_rgba(255,107,0,0.2)] transition-all min-h-[300px]"
            >
              <div>
                {/* Step badge & Top Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-semibold text-orange-400 tracking-wider">
                    STEP {s.step}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_0_16px_rgba(255,107,0,0.2)] group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="type-display text-xl font-bold text-ink mb-2">
                  {s.title}
                </h3>
                <p className="text-[14px] text-muted leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Bottom Decorative Amber Line with glowing node */}
              <div className="mt-8 flex items-center justify-between pt-4 border-t border-rule/50">
                <span className="text-xs font-mono text-muted">Phase {idx + 1}</span>
                <button
                  type="button"
                  onClick={onExplore}
                  className="flex items-center gap-1.5 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore now</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
