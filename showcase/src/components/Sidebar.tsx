import { motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { ALL_COMPONENTS, CATALOG, STATS } from "../data/catalog";
import { CATEGORIES, THEME_BY_ID } from "../data/themes";
import { paths, type Route } from "../lib/router";
import { Link } from "./Link";

const GROUPS = CATEGORIES.map((c) => ({ ...c, items: ALL_COMPONENTS.filter((x) => x.category === c.id) })).filter((g) => g.items.length);

function Item({ to, active, children, layoutGroup }: { to: string; active: boolean; children: ReactNode; layoutGroup: string }) {
  return (
    <li className="relative">
      {/* The marker slides to the current page with React Bits purple glow */}
      {active && (
        <motion.span
          layoutId={`nav-active-${layoutGroup}`}
          className="absolute top-1 bottom-1 -left-[1.5px] w-[2.5px] rounded-full bg-purple shadow-[0_0_8px_var(--color-purple)]"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
      <Link
        to={to}
        aria-current={active ? "page" : undefined}
        className={`flex items-center gap-2 rounded-lg py-[6px] pr-2.5 pl-3.5 text-[13.5px] leading-snug transition-colors ${
          active ? "font-semibold text-ink bg-tray/60" : "text-muted hover:text-ink hover:bg-tray/40"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="mb-1.5 px-1 text-[13px] font-semibold text-ink">{children}</h2>;
}

/** Every page in the hub, always one click away. `instance` keeps the desktop and drawer markers apart. */
export function Sidebar({ route, instance }: { route: Route; instance: "desktop" | "drawer" }) {
  const ref = useRef<HTMLElement>(null);
  const routeKey = route.name === "component" || route.name === "site" ? `${route.name}:${route.id}` : route.name;

  // Keep the current page visible in a long list.
  useEffect(() => {
    ref.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: "nearest" });
  }, [routeKey]);

  return (
    <nav ref={ref} aria-label="Hub" className="space-y-7 px-4 pt-6 pb-10">
      <div>
        <ul className="border-l border-rule">
          <Item to={paths.home} active={route.name === "home"} layoutGroup={instance}>
            Overview
          </Item>
          <Item to={paths.curves} active={route.name === "curves"} layoutGroup={instance}>
            Easing curves <span className="ml-auto text-[12px] text-muted tabular-nums">{STATS.curves}</span>
          </Item>
          <Item to={paths.prompt} active={route.name === "prompt"} layoutGroup={instance}>
            Prompt standard
          </Item>
        </ul>
      </div>

      <div>
        <Heading>Sites</Heading>
        <ul className="border-l border-rule">
          {CATALOG.map((s) => (
            <Item key={s.id} to={paths.site(s.id)} active={route.name === "site" && route.id === s.id} layoutGroup={instance}>
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ background: THEME_BY_ID[s.theme].accent }} />
              <span className="truncate">{s.title}</span>
            </Item>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <Heading>Components</Heading>
        {GROUPS.map((g) => (
          <div key={g.id}>
            <h3 className="mb-1 px-1 text-[13px] text-muted">{g.label}</h3>
            <ul className="border-l border-rule">
              {g.items.map((c) => (
                <Item key={c.id} to={paths.component(c.id)} active={route.name === "component" && route.id === c.id} layoutGroup={instance}>
                  <span className="truncate">{c.name}</span>
                </Item>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
