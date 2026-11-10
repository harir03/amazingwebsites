import { ArrowUpRight, CheckCircle2, Bot } from "lucide-react";
import { Link } from "../Link";
import { paths } from "../../lib/router";
import { STATS } from "../../data/catalog";

export function V7WorkflowBento() {
  return (
    <section className="my-20 sm:my-28">
      {/* V7 Editorial Serif Title & Subtitle */}
      <div className="max-w-3xl mb-12">
        <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink">
          Build frontend workflows on everything your team knows.
        </h2>
        <p className="mt-4 text-[16px] text-muted leading-relaxed">
          Go beyond standalone snippets with the forensic physics, dual code formats, and AI agent prompts needed to ship world-class UI from start to finish.
        </p>
      </div>

      {/* 4-Panel Bento Layout matching V7 Labs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1: Component Pipeline & Status Table */}
        <div className="flex flex-col justify-between rounded-2xl border border-rule bg-surface p-7 sm:p-8 hover:border-rule-strong transition-all">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-tray px-3 py-1 text-xs font-medium text-muted">
              +{STATS.components} Forensic Bits ready to use
            </span>
            <h3 className="type-serif text-2xl font-normal text-ink mt-3">
              Use bits created from iconic sites or prompt your coding agent
            </h3>
          </div>

          {/* Table simulation matching V7 Labs table */}
          <div className="mt-6 rounded-xl border border-rule bg-tray/40 p-3 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-rule text-muted font-medium">
                  <th className="pb-2 pl-2">Component Bit</th>
                  <th className="pb-2">Source Site</th>
                  <th className="pb-2">Fidelity Status</th>
                  <th className="pb-2 text-right pr-2">Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule/40 font-mono text-[11.5px]">
                <tr>
                  <td className="py-2.5 pl-2 font-sans font-medium text-ink">Botanical Floating Nav</td>
                  <td className="py-2.5 text-muted">Belgrade Arbor</td>
                  <td className="py-2.5">
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="h-3 w-3" /> Automated
                    </span>
                  </td>
                  <td className="py-2.5 text-right pr-2 text-orange-500 font-semibold font-sans">0 sec setup</td>
                </tr>
                <tr>
                  <td className="py-2.5 pl-2 font-sans font-medium text-ink">Tactile Tape Banner</td>
                  <td className="py-2.5 text-muted">SweetTape</td>
                  <td className="py-2.5">
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="h-3 w-3" /> 100% Clean
                    </span>
                  </td>
                  <td className="py-2.5 text-right pr-2 text-orange-500 font-semibold font-sans">Zero lock-in</td>
                </tr>
                <tr>
                  <td className="py-2.5 pl-2 font-sans font-medium text-ink">Frequency Visualizer</td>
                  <td className="py-2.5 text-muted">Overworld Audio</td>
                  <td className="py-2.5">
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  </td>
                  <td className="py-2.5 text-right pr-2 text-orange-500 font-semibold font-sans">Exact physics</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-rule/50">
            <Link
              to={`${paths.home}?view=components`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-orange-500 transition-colors"
            >
              <span>Explore All Components</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Panel 2: Dual Code Formats (React + Vanilla HTML) */}
        <div className="flex flex-col justify-between rounded-2xl border border-rule bg-surface p-7 sm:p-8 hover:border-rule-strong transition-all">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-tray px-3 py-1 text-xs font-medium text-muted">
              Dual drop-in formats
            </span>
            <h3 className="type-serif text-2xl font-normal text-ink mt-3">
              Generate production-ready code — React TSX, Tailwind, HTML — fully editable, no lock-in
            </h3>
          </div>

          {/* Code preview card */}
          <div className="mt-6 rounded-xl border border-rule bg-tray/60 p-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-rule/60 pb-2 mb-3">
              <span className="text-muted">Component.tsx</span>
              <span className="text-emerald-500 text-[11px] font-semibold">Pure TypeScript</span>
            </div>
            <pre className="text-ink/80 overflow-x-auto text-[11px] leading-relaxed">
              <code>{`// 1:1 Forensic Rebuild with Measured Physics
export function LiquidGlassNav({ items }: NavProps) {
  const [active, setActive] = useState(0);
  return (
    <nav className="glass-panel backdrop-blur-2xl rounded-full">
      {items.map((item, idx) => ( ... ))}
    </nav>
  );
}`}</code>
            </pre>
          </div>

          <div className="mt-6 pt-4 border-t border-rule/50">
            <Link
              to={paths.curves}
              className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-orange-500 transition-colors"
            >
              <span>Inspect Motion Curves</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Panel 3: Knowledge Graph Node Network (V7 Labs Signature Visual) */}
        <div className="flex flex-col justify-between rounded-2xl border border-rule bg-surface p-7 sm:p-8 hover:border-rule-strong transition-all">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-tray px-3 py-1 text-xs font-medium text-muted">
              Your codebase's context layer
            </span>
            <h3 className="type-serif text-2xl font-normal text-ink mt-3">
              Every interaction and design token connected and searchable
            </h3>
          </div>

          {/* Interactive Graph Node Graphic matching V7's a16z graph */}
          <div className="relative mt-6 flex h-48 items-center justify-center rounded-xl border border-rule bg-tray/30 overflow-hidden">
            {/* Connecting lines */}
            <svg className="absolute inset-0 h-full w-full stroke-rule-strong/70" fill="none">
              <line x1="50%" y1="50%" x2="25%" y2="28%" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="50%" y1="50%" x2="75%" y2="28%" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="50%" y1="50%" x2="20%" y2="72%" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="50%" y1="50%" x2="80%" y2="72%" strokeWidth="1.2" strokeDasharray="3 3" />
            </svg>

            {/* Central Node */}
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-page font-mono text-xs font-bold shadow-md">
              <span>FC Hub</span>
            </div>

            {/* Satellite Nodes */}
            <div className="absolute top-5 left-10 rounded-full border border-rule bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-xs">
              Kvant WebGL
            </div>
            <div className="absolute top-5 right-10 rounded-full border border-rule bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-xs">
              Alan Menken
            </div>
            <div className="absolute bottom-5 left-8 rounded-full border border-rule bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-xs">
              Paperwork
            </div>
            <div className="absolute bottom-5 right-8 rounded-full border border-rule bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-xs">
              Recursive Glass
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-rule/50">
            <span className="text-xs text-muted">
              7 Production Archetypes · Graph Connected
            </span>
          </div>
        </div>

        {/* Panel 4: MCP & AI Coding Agent Standard */}
        <div className="flex flex-col justify-between rounded-2xl border border-rule bg-surface p-7 sm:p-8 hover:border-rule-strong transition-all">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-tray px-3 py-1 text-xs font-medium text-muted">
              MCP &amp; AI Agent Standard
            </span>
            <h3 className="type-serif text-2xl font-normal text-ink mt-3">
              Cursor, Claude, Antigravity, no manual translation needed
            </h3>
          </div>

          {/* AI Agent Interaction Box */}
          <div className="mt-6 rounded-xl border border-rule bg-tray/60 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-4 w-4 text-orange-500" />
              <span className="text-xs font-semibold text-ink">AI Coding Agent</span>
              <span className="ml-auto flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-2 text-[12px]">
              <div className="flex items-center gap-2 rounded-lg border border-rule bg-surface px-3 py-2 text-ink">
                <span className="text-orange-500">✦</span>
                <span>Extract exact cubic-bezier easing curve (0.16, 1, 0.3, 1)</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-rule bg-surface px-3 py-2 text-ink">
                <span className="text-orange-500">✦</span>
                <span>Inject zero-lock-in React + Tailwind implementation</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-rule/50">
            <Link
              to={paths.prompt}
              className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-orange-500 transition-colors"
            >
              <span>Explore Prompt Standard</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
