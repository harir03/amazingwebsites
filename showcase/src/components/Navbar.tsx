import { Menu, Search } from "lucide-react";
import { COMPONENT_BY_ID, CATALOG } from "../data/catalog";
import { CATEGORIES } from "../data/themes";
import { MOD_KEY, MOD_KEY_ARIA } from "../lib/platform";
import { paths, type Route } from "../lib/router";
import { Link } from "./Link";

/** Mark: an ease-out curve on an ink tile, with a soft ink glow that brightens on hover. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to={paths.home} className="group flex shrink-0 items-center gap-2.5" aria-label="Frontend Copied Hub, home">
      <span className="relative grid h-7 w-7 place-items-center">
        <span aria-hidden="true" className="absolute -inset-1 rounded-xl bg-ink/25 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#1b2742" />
          <path d="M7 25C9.9 7 12.4 7 25 7" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="7" cy="25" r="2.2" fill="#b9cbbe" />
        </svg>
      </span>
      <span className={`type-display text-[20px] leading-none ${compact ? "hidden sm:inline" : ""}`}>Frontend Copied</span>
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
      return [{ label: "Sites", to: `${paths.home}?view=sites` }, { label: s?.title ?? "Not found" }];
    }
    case "curves":
      return [{ label: "Easing curves" }];
    case "prompt":
      return [{ label: "Prompt standard" }];
    case "notfound":
      return [{ label: "Not found" }];
    default:
      return [];
  }
}

export function Header({ route, onSearch, onMenu }: { route: Route; onSearch: () => void; onMenu: () => void }) {
  const crumbs = crumbsFor(route);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-white/90 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-3 sm:px-4 lg:px-5">
        <button type="button" onClick={onMenu} className="grid h-9 w-9 place-items-center rounded-lg text-ink hover:bg-tray lg:hidden" aria-label="Open navigation">
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <Logo compact={crumbs.length > 0} />

        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex min-w-0 items-center text-[16px]">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={c.label} className={`flex min-w-0 items-center ${last ? "" : "hidden md:flex"}`}>
                    <span aria-hidden="true" className="mx-2.5 text-rule-strong">
                      /
                    </span>
                    {c.to && !last ? (
                      <Link to={c.to} className="whitespace-nowrap text-ink-2 hover:text-ink">
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

        <button
          type="button"
          onClick={onSearch}
          className="ml-auto flex h-9 shrink-0 items-center gap-2 rounded-lg px-2.5 text-[14px] text-muted transition-colors hover:bg-tray hover:text-ink sm:border sm:border-rule sm:pr-1.5 sm:pl-3 md:w-64"
          aria-label="Search components and sites"
          aria-keyshortcuts={MOD_KEY_ARIA}
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="hidden whitespace-nowrap md:inline">Search</span>
          <kbd className="ml-auto hidden shrink-0 rounded-md border border-rule bg-tray px-1.5 py-0.5 font-sans text-[12px] whitespace-nowrap text-ink-2 sm:inline">
            {MOD_KEY} K
          </kbd>
        </button>
      </div>
    </header>
  );
}
