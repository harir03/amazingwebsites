import { motion } from "framer-motion";
import { Sparkles, Activity, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";
import { Link } from "./Link";
import { paths } from "../lib/router";

export function FeatureBento() {
  return (
    <section id="why-us" className="relative my-20 sm:my-32 scroll-mt-24">
      {/* Centered Heading Pill & Title (Velocity inspo) */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold text-orange-400 mb-3 shadow-[0_0_12px_rgba(255,107,0,0.15)]">
          <Sparkles className="h-3 w-3" />
          <span>Why Frontend Copied</span>
        </div>
        <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
          Why Developers Choose These Bits
        </h2>
        <p className="mt-3 text-[15px] sm:text-[16px] text-muted max-w-lg leading-relaxed">
          We combine forensic fidelity, zero external lock-in, and agent-ready prompt architecture to deliver drop-in components that actually convert.
        </p>
      </div>

      {/* 4-Card Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Card 1: Implementation & Pure Source */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
          className="group relative overflow-hidden rounded-3xl border border-orange-500/15 bg-surface/90 p-7 sm:p-8 backdrop-blur-md hover:border-orange-500/40 hover:shadow-[0_16px_40px_-10px_rgba(255,107,0,0.2)] transition-all flex flex-col justify-between min-h-[340px]"
        >
          {/* Subtle Ambient Radial Glow Inside Card */}
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl group-hover:bg-orange-500/20 transition-colors" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-mono font-medium text-orange-400 uppercase tracking-wider">
                01 · Implementation &amp; Source
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400">
                <Cpu className="h-4.5 w-4.5" />
              </div>
            </div>
            <h3 className="type-display text-2xl font-bold text-ink mt-3">
              Dual Drop-in Code
            </h3>
            <p className="mt-2 text-[14px] text-muted leading-relaxed max-w-sm">
              Every component comes in both pure React + Tailwind TypeScript and standalone Vanilla HTML. Zero external component library lock-in.
            </p>
          </div>

          {/* Glowing Graphic Container */}
          <div className="relative mt-8 flex items-center justify-center rounded-2xl border border-orange-500/20 bg-tray/60 py-7 overflow-hidden">
            {/* Concentric Amber Energy Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-28 w-44 rounded-full border border-orange-500/20 opacity-50 blur-[1px]" />
              <div className="absolute h-18 w-28 rounded-full border border-orange-500/30 opacity-70 blur-xs" />
            </div>

            {/* Glowing Emblem Core */}
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/60 bg-[#120d0a] shadow-[0_0_24px_rgba(255,107,0,0.5)]">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-orange-400 fill-current" aria-hidden="true">
                <path d="M12 3L2 21h20L12 3zm0 4.5L18 19H6L12 7.5z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Card 2: High-converting Motion Physics */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
          className="group relative overflow-hidden rounded-3xl border border-orange-500/15 bg-surface/90 p-7 sm:p-8 backdrop-blur-md hover:border-orange-500/40 hover:shadow-[0_16px_40px_-10px_rgba(255,107,0,0.2)] transition-all flex flex-col justify-between min-h-[340px]"
        >
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl group-hover:bg-orange-500/20 transition-colors" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-mono font-medium text-orange-400 uppercase tracking-wider">
                02 · Physics Fidelity
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400">
                <Activity className="h-4.5 w-4.5" />
              </div>
            </div>
            <h3 className="type-display text-2xl font-bold text-ink mt-3">
              Forensic Bezier Curves
            </h3>
            <p className="mt-2 text-[14px] text-muted leading-relaxed max-w-sm">
              Exact cubic-bezier timing and spring physics measured millisecond-by-millisecond from live production sites. No generic linear animations.
            </p>
          </div>

          {/* Graphic: Connected Energy Nodes */}
          <div className="relative mt-8 flex items-center justify-center gap-6 rounded-2xl border border-orange-500/20 bg-tray/60 py-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/40 bg-[#16100c] shadow-[0_0_16px_rgba(255,107,0,0.35)]">
              <span className="font-mono text-xs font-bold text-orange-400">0.16</span>
            </div>
            
            {/* Pulsing Connector Line */}
            <div className="relative w-16 h-[2px] bg-gradient-to-r from-orange-500 via-amber-300 to-orange-500 shadow-[0_0_8px_rgba(255,140,40,0.8)]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_6px_#fff]" />
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/40 bg-[#16100c] shadow-[0_0_16px_rgba(255,107,0,0.35)]">
              <span className="font-mono text-xs font-bold text-orange-400">1.0</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Maximum ROI / 100% Clean Code */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
          className="group relative overflow-hidden rounded-3xl border border-orange-500/15 bg-surface/90 p-7 sm:p-8 backdrop-blur-md hover:border-orange-500/40 hover:shadow-[0_16px_40px_-10px_rgba(255,107,0,0.2)] transition-all flex flex-col justify-between min-h-[340px]"
        >
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl group-hover:bg-orange-500/20 transition-colors" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-mono font-medium text-orange-400 uppercase tracking-wider">
                03 · Production Ready
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
            </div>
            <h3 className="type-display text-2xl font-bold text-ink mt-3">
              100% Zero Lock-In
            </h3>
            <p className="mt-2 text-[14px] text-muted leading-relaxed max-w-sm">
              Copy just the component code you need. No hidden NPM packages, no bloat, and no telemetry. Clean, readable, and fully auditable.
            </p>
          </div>

          {/* Metric Bar Card */}
          <div className="relative mt-8 rounded-2xl border border-orange-500/20 bg-tray/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted font-medium">Developer Velocity</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                <ArrowUpRight className="h-3 w-3" />
                +140% faster
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-ink">0 sec</span>
              <span className="text-xs text-muted">setup time to first drop-in render</span>
            </div>
          </div>
        </motion.div>

        {/* Card 4: AI Agent Standard */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
          className="group relative overflow-hidden rounded-3xl border border-orange-500/15 bg-surface/90 p-7 sm:p-8 backdrop-blur-md hover:border-orange-500/40 hover:shadow-[0_16px_40px_-10px_rgba(255,107,0,0.2)] transition-all flex flex-col justify-between min-h-[340px]"
        >
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl group-hover:bg-orange-500/20 transition-colors" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-mono font-medium text-orange-400 uppercase tracking-wider">
                04 · Next-Gen Tooling
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
            </div>
            <h3 className="type-display text-2xl font-bold text-ink mt-3">
              Standardized AI Prompts
            </h3>
            <p className="mt-2 text-[14px] text-muted leading-relaxed max-w-sm">
              Pre-crafted, 5-point prompts engineered for Cursor, Claude, Antigravity, and v0 to recreate each bit in your existing design system.
            </p>
          </div>

          {/* Stepped Pedestal Illustration */}
          <div className="relative mt-8 flex flex-col items-center justify-center rounded-2xl border border-orange-500/20 bg-tray/60 py-5">
            <div className="flex flex-col items-center gap-1.5 w-full px-8">
              <div className="h-2 w-16 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(255,140,40,0.9)]" />
              <div className="h-2.5 w-28 rounded-full bg-orange-500/60" />
              <div className="h-3 w-40 rounded-full bg-orange-500/30" />
            </div>
            <Link
              to={paths.prompt}
              className="mt-4 text-[12px] font-semibold text-orange-400 hover:text-orange-300 transition-colors"
            >
              Read Prompt Specification &rarr;
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
