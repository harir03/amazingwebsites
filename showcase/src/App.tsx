import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CommandPalette } from "./components/CommandPalette";
import { Header } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { navigate, paths, useRoute, type Route } from "./lib/router";
import { ComponentPage } from "./pages/ComponentPage";
import { CurvesPage } from "./pages/CurvesPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PromptPage } from "./pages/PromptPage";
import { SitePage } from "./pages/SitePage";

function Page({ route }: { route: Route }) {
  switch (route.name) {
    case "home":
      return <HomePage />;
    case "component":
      return <ComponentPage id={route.id} />;
    case "site":
      return <SitePage id={route.id} />;
    case "curves":
      return <CurvesPage />;
    case "prompt":
      return <PromptPage />;
    default:
      return <NotFoundPage />;
  }
}

/** Off-canvas copy of the sidebar for small screens. */
function Drawer({ route, onClose }: { route: Route; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="absolute inset-0 bg-ink/30" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="absolute inset-y-0 left-0 flex w-[min(300px,86vw)] flex-col bg-white shadow-[0_0_40px_-10px_rgb(27_39_66_/_0.4)]"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-rule px-4">
          <span className="type-display text-[20px]">Frontend Copied</span>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-tray" aria-label="Close navigation" autoFocus>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Sidebar route={route} instance="drawer" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const route = useRoute();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const routeKey = route.name === "component" || route.name === "site" ? `${route.name}:${route.id}` : route.name;

  // Any page change closes the drawer and the palette.
  useEffect(() => {
    setMenuOpen(false);
    setPaletteOpen(false);
  }, [routeKey]);

  // ⌘K / Ctrl+K toggles search; "/" opens it when you're not typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      const t = e.target as HTMLElement;
      if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(t.tagName) && !t.isContentEditable) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Header route={route} onSearch={() => setPaletteOpen(true)} onMenu={() => setMenuOpen(true)} />
      <div className="flex">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-rule lg:block">
          <Sidebar route={route} instance="desktop" />
        </aside>
        <main id="main" className="min-w-0 flex-1">
          <Page route={route} />
        </main>
      </div>

      <AnimatePresence>{menuOpen && <Drawer key="drawer" route={route} onClose={closeMenu} />}</AnimatePresence>
      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            key="palette"
            onClose={() => setPaletteOpen(false)}
            onOpenComponent={(id) => navigate(paths.component(id))}
            onOpenSite={(id) => navigate(paths.site(id))}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
