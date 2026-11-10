import { ShieldCheck, Lock, Code2, Cpu, CheckCircle } from "lucide-react";

export function V7SecurityTrust() {
  const BADGES = [
    { label: "Zero Telemetry", icon: Lock },
    { label: "Pure TypeScript", icon: Code2 },
    { label: "Zero NPM Bloat", icon: Cpu },
    { label: "MIT Compatible", icon: ShieldCheck },
    { label: "WCAG Accessible", icon: CheckCircle },
  ];

  return (
    <section className="my-20 sm:my-28 rounded-2xl border border-rule bg-surface p-8 sm:p-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="type-display text-3xl sm:text-4xl font-normal tracking-tight text-ink">
            Enterprise-grade purity.
          </h2>
          <p className="mt-3 text-[15px] text-muted leading-relaxed">
            Your codebase stays clean—always. Zero external UI framework lock-in, zero telemetry, and 100% auditable TypeScript with exact CSS specifications.
          </p>
        </div>

        {/* Verification Badges matching V7 Labs security badges */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.label}
                className="flex flex-col items-center justify-center rounded-xl border border-rule bg-tray/40 p-4 w-28 text-center transition-all hover:border-rule-strong hover:bg-tray"
              >
                <Icon className="h-6 w-6 text-ink/80 mb-2" />
                <span className="font-mono text-[10px] uppercase font-semibold text-muted tracking-wider">
                  {b.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
