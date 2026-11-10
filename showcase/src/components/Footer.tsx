import { ArrowUp, Sparkles } from "lucide-react";
import { Link } from "./Link";
import { paths } from "../lib/router";
import { STATS } from "../data/catalog";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-20 overflow-hidden pt-8 pb-14 border-t border-rule">
      {/* V7 Labs Style Call-to-Action Card */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 mb-20">
        <div className="relative overflow-hidden rounded-3xl border border-rule bg-surface p-8 sm:p-14 text-center shadow-sm">
          {/* V7 Monogram Badge */}
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-page font-mono text-sm font-black shadow-sm">
            FC
          </div>

          <h3 className="type-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink max-w-2xl mx-auto leading-tight">
            Ready to build interfaces with <em className="italic font-serif">zero approximation</em>?
          </h3>
          <p className="mt-4 text-[15px] sm:text-[16px] text-muted max-w-xl mx-auto leading-relaxed">
            Let Frontend Copied give you the forensic drop-in micro-interactions and design systems your project deserves. Clean, strategic, and zero lock-in.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={`${paths.home}?view=components`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14px] font-semibold text-page shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span>Explore All {STATS.components} Bits</span>
            </Link>
            <Link
              to={paths.prompt}
              className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-6 py-3.5 text-[14px] font-medium text-ink hover:border-rule-strong hover:bg-tray active:scale-[0.98] transition-all"
            >
              <span>AI Prompt Standard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-rule">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-page font-mono text-[14px] font-black shadow-sm">
                FC
              </span>
              <span className="text-lg font-bold text-ink">Frontend Copied</span>
            </div>
            <p className="text-[14px] text-muted max-w-sm leading-relaxed">
              Helping developers and AI agents build faster with forensic, drop-in React and HTML components extracted from world-class websites.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-surface px-3.5 py-1.5 text-xs font-medium text-ink hover:border-rule-strong hover:bg-tray transition-colors shadow-2xs"
              >
                <span>Back to top</span>
                <ArrowUp className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div>
            <p className="font-semibold text-ink text-[13px] uppercase tracking-wider mb-3">Explore Archive</p>
            <ul className="space-y-2.5 text-[13.5px] text-muted">
              <li>
                <Link to={`${paths.home}?view=components`} className="hover:text-orange-500 transition-colors">
                  23 Forensic Bits
                </Link>
              </li>
              <li>
                <Link to={`${paths.home}?view=sites`} className="hover:text-orange-500 transition-colors">
                  7 Archetype Stacks
                </Link>
              </li>
              <li>
                <Link to={paths.curves} className="hover:text-orange-500 transition-colors">
                  Measured Bezier Curves
                </Link>
              </li>
              <li>
                <Link to={paths.prompt} className="hover:text-orange-500 transition-colors">
                  AI Prompt Standard
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div>
            <p className="font-semibold text-ink text-[13px] uppercase tracking-wider mb-3">Platform</p>
            <ul className="space-y-2.5 text-[13.5px] text-muted">
              <li>
                <a
                  href="https://github.com/harir03/frontend_copied"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <span className="text-muted/80">Pure TypeScript</span>
              </li>
              <li>
                <span className="text-muted/80">Standalone Vanilla HTML</span>
              </li>
              <li>
                <span className="text-muted/80">Zero NPM Lock-in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} Frontend Copied. Educational forensic recreations. All rights reserved.</p>
          <p className="text-center sm:text-right font-serif">
            Designed with <em className="italic font-serif">precision</em> &amp; V7 Labs editorial aesthetic.
          </p>
        </div>
      </div>
    </footer>
  );
}
