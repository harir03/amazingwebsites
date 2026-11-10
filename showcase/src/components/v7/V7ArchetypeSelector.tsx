import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ThemeArchetype } from "../../data/types";

interface Props {
  onSelectTheme: (themeId: ThemeArchetype) => void;
}

const ARCHETYPES: Array<{
  id: ThemeArchetype;
  title: string;
  tagline: string;
  tags: string[];
  accent: string;
  linkText: string;
}> = [
  {
    id: "architectural-botanical",
    title: "Botanical Canopy & Forest Editorial",
    tagline: "Turn architectural spaces into organic, living-tree digital experiences.",
    tags: ["Botanical Floating Nav", "Floorplan Inspector", "Canopy Facade", "Awwwards Ribbon"],
    accent: "#2f5c38",
    linkText: "Explore Botanical Canopy",
  },
  {
    id: "tactile-pop-ecommerce",
    title: "Tactile Pop & Kinetic Tape",
    tagline: "Turn physical everyday products into jaunty, peel-reactive e-commerce.",
    tags: ["Tactile Tape Banner", "Roll Spec Selector", "Peel Adhesion", "Everyday Moments"],
    accent: "#d97706",
    linkText: "Explore Pop Tape",
  },
  {
    id: "sonic-interactive",
    title: "Interactive Sonic & Game Audio",
    tagline: "Turn game soundscapes into real-time Web Audio visualizers and stem mixers.",
    tags: ["Frequency Visualizer", "Stem Audio Deck", "DSP Synthesis", "Decibel Meters"],
    accent: "#65a30d",
    linkText: "Explore Sonic Audio",
  },
  {
    id: "brutalist-pixel",
    title: "Brutalist & WebGL Fluidity",
    tagline: "Turn raw creative expression into measured interactive physics.",
    tags: ["Elastic Bezier Menu", "Particle Morph", "Strip Accordion", "Kinetic Manifesto"],
    accent: "#ff5b24",
    linkText: "Explore Brutalist & WebGL",
  },
  {
    id: "technical-cad",
    title: "CAD & Technical Blueprint",
    tagline: "Turn technical applications into precision developer experiences.",
    tags: ["Crosshair Drafting Hero", "Drafting Blueprint Header", "Mechanical Counter", "Grid Matrix"],
    accent: "#2563eb",
    linkText: "Explore CAD Blueprint",
  },
  {
    id: "glassmorphic-fintech",
    title: "Fintech Glass & Monolith",
    tagline: "Turn high-trust financial interfaces into fluid, liquid-glass experiences.",
    tags: ["Liquid Glass Pill Nav", "Wealth HUD & Danger Meter", "Flip Clock", "Glass Panel"],
    accent: "#10b981",
    linkText: "Explore Fintech Glass",
  },
];

export function V7ArchetypeSelector({ onSelectTheme }: Props) {
  return (
    <section className="my-20 sm:my-28">
      {/* Editorial Serif Heading matching V7 Labs */}
      <div className="mb-10 sm:mb-12">
        <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink">
          Pick your archetype. See the components at work.
        </h2>
      </div>

      {/* 3-Column V7 Style Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARCHETYPES.map((arch) => (
          <motion.div
            key={arch.id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-between rounded-2xl border border-rule bg-surface p-7 sm:p-8 hover:border-rule-strong hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: arch.accent }} />
                <h3 className="type-serif text-2xl font-normal text-ink">
                  {arch.title}
                </h3>
              </div>

              <p className="text-[14px] text-muted leading-relaxed mb-6">
                {arch.tagline}
              </p>

              {/* Pill Tags */}
              <div className="flex flex-wrap gap-2">
                {arch.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-lg border border-rule bg-tray/60 px-2.5 py-1 text-[12px] font-medium text-ink transition-colors hover:bg-tray"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Arrow Link (V7 Labs exact style) */}
            <div className="mt-8 pt-5 border-t border-rule/50">
              <button
                type="button"
                onClick={() => onSelectTheme(arch.id)}
                className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink hover:text-orange-500 transition-colors"
              >
                <span>{arch.linkText}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
