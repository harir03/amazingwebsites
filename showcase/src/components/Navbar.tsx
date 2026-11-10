import { motion } from "framer-motion";
import { Menu, Moon, Search, Sun, Sparkles } from "lucide-react";
import { useState } from "react";
import { COMPONENT_BY_ID, CATALOG, STATS } from "../data/catalog";
import { CATEGORIES } from "../data/themes";
import { useTheme } from "../hooks/useTheme";
import { MOD_KEY, MOD_KEY_ARIA } from "../lib/platform";
import { paths, type Route } from "../lib/router";
import { Link } from "./Link";

/** V7 Labs style Mark: Bold modern monogram with sharp geometric badge */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to={paths.home} className="group flex shrink-0 items-center gap-2.5" aria-label="Frontend Copied, home">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-page font-mono text-[14px] font-black tracking-tighter transition-all duration-300 group-hover:scale-105 shadow-sm">
        FC
      </span>
      <div className="flex items-center gap-2">
        <span className={`text-[16px] tracking-tight font-bold text-ink ${compact ? "hidden sm:inline" : ""}`}>
          Frontend Copied
        </span>
        <span className="hidden items-center gap-1 rounded-full border border-rule bg-tray px-2 py-0.5 text-[11px] font-medium text-muted md:inline-flex">
          <Sparkles className="h-3 w-3 text-orange-500" />
          {STATS.components} bits
        </span>
      </div>
    </Link>
  );
}

interface Crumb {
  label: string;
  to?: string;
}

function crumbsFor(route: Route): Crumb[] {
  switch (route.name) {
    case "component": {
      const c = COMPONENT_BY_ID.get(route.id);
      if (!c) return [{ label: "Not found" }];
      const cat = CATEGORIES.find((x) => x.id === c.category);
      return [{ label: cat?.label ?? "Components", to: `${paths.home}?cat=${c.category}` }, { label: c.name }];
    }
    case "site": {
      const s = CATALOG.find((x) => x.id === route.id);
      return [{ label: "Archetypes", to: `${paths.home}?view=sites` }, { label: s?.title ?? "Not found" }];
    }
    case "curves":
      return [{ label: "Easing curves" }];
    case "prompt":
      return [{ label: "AI Prompt standard" }];
    case "notfound":
      return [{ label: "Not found" }];
    default:
      return [];
  }
}

export function Header({ route, onSearch, onMenu }: { route: Route; onSearch: () => void; onMenu: () => void }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const crumbs = crumbsFor(route);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navLinks = [
    { label: "Components", to: `${paths.home}?view=components`, active: route.name === "home" },
    { label: "Archetypes", to: `${paths.home}?view=sites`, active: route.name === "site" },
    { label: "Curves", to: paths.curves, active: route.name === "curves" },
    { label: "AI Prompts", to: paths.prompt, active: route.name === "prompt" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200">
      {/* V7 Labs Signature Top Announcement Bar */}
      <div className="bg-[#0b0c0e] text-white py-1.5 px-4 text-center text-[12px] font-medium tracking-wide border-b border-white/10 hidden sm:block">
        <span className="text-white/80">Forensic UI for Creative Engineers:</span>{" "}
        <span className="text-white font-semibold">Inside {STATS.sites} Reconstructed Production Stacks</span>{" "}
        <Link to={`${paths.home}?view=sites`} className="ml-2 text-orange-400 hover:text-orange-300 inline-flex items-center gap-1 transition-colors">
          <span>Explore Showcase</span>
          <span>&rarr;</span>
        </Link>
      </div>

      <div className="border-b border-rule bg-page/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onMenu}
              className="grid h-9 w-9 place-items-center rounded-xl text-ink hover:bg-tray lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <Logo compact={crumbs.length > 0} />

          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="ml-2 hidden min-w-0 sm:block">
              <ol className="flex min-w-0 items-center text-[14px]">
                {crumbs.map((c, i) => {
                  const last = i === crumbs.length - 1;
                  return (
                    <li key={c.label} className="flex min-w-0 items-center">
                      <span aria-hidden="true" className="mx-2 text-rule-strong">
                        /
                      </span>
                      {c.to && !last ? (
                        <Link to={c.to} className="whitespace-nowrap text-muted hover:text-ink transition-colors">
                          {c.label}
                        </Link>
                      ) : (
                        <span aria-current={last ? "page" : undefined} className="truncate font-medium text-ink">
                          {c.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}
        </div>

        {/* Center Nav Links with React Bits sliding pill hover */}
        {crumbs.length === 0 && (
          <nav aria-label="Main navigation" className="relative hidden items-center gap-1 rounded-full border border-rule/60 bg-tray/60 p-1 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
                  item.active ? "text-ink font-semibold" : "text-muted hover:text-ink"
                }`}
              >
                {hoveredNav === item.label && (
                  <motion.span
                    layoutId="navbar-hover-pill"
                    className="absolute inset-0 rounded-full bg-surface shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* Right Action Icons: Search, Light/Dark Toggle, Explore CTA, GitHub */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSearch}
            className="flex h-9 items-center gap-2 rounded-xl border border-rule bg-tray/70 px-3 text-[13px] text-muted transition-colors hover:border-rule-strong hover:bg-tray hover:text-ink sm:w-52"
            aria-label="Search components and sites"
            aria-keyshortcuts={MOD_KEY_ARIA}
          >
            <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="hidden whitespace-nowrap sm:inline">Search components...</span>
            <span className="sm:hidden">Search</span>
            <kbd className="ml-auto hidden rounded-md border border-rule bg-page px-1.5 py-0.5 font-mono text-[11px] font-medium text-muted sm:inline">
              {MOD_KEY}K
            </kbd>
          </button>

          {/* Theme Toggle Button (Light / Dark) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative grid h-9 w-9 place-items-center rounded-xl border border-rule bg-tray/70 text-ink transition-colors hover:border-rule-strong hover:bg-tray focus:outline-none"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-orange-500" />}
            </motion.div>
          </button>

          {/* V7 Labs signature high-contrast pill CTA button */}
          <Link
            to={`${paths.home}?view=components`}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-page shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <span>Explore {STATS.components} Bits</span>
          </Link>

          {/* GitHub Icon Link */}
          <a
            href="https://github.com/harir03/frontend_copied"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center gap-1.5 rounded-xl border border-rule bg-tray/70 px-2.5 text-[13px] font-medium text-ink transition-colors hover:border-rule-strong hover:bg-tray md:inline-flex"
            aria-label="GitHub Repository"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
      </div>
    </header>
  );
}
