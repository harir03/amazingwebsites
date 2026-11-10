import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CommandPalette } from "./components/CommandPalette";
import { Header } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { ThemeProvider, useTheme } from "./hooks/useTheme";
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

/** Off-canvas copy of the sidebar for small screens with theme toggle */
function Drawer({ route, onClose }: { route: Route; onClose: () => void }) {
  const { toggleTheme, isDark } = useTheme();

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
    <motion.div
      className="fixed inset-0 z-50 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="absolute inset-y-0 left-0 flex w-[min(320px,86vw)] flex-col border-r border-rule bg-surface shadow-2xl text-ink"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-rule px-4">
          <span className="type-display text-[19px] font-bold tracking-tight">Frontend Copied</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-xl border border-rule bg-tray text-ink"
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-purple" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-xl hover:bg-tray text-ink"
              aria-label="Close navigation"
              autoFocus
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Sidebar route={route} instance="drawer" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function MainLayout() {
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
      <div className="relative min-h-screen bg-page text-ink selection:bg-orange-500 selection:text-white transition-colors duration-200">
        {/* Subtle Ambient Background Grid with Radial Falloff Mask */}
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-75 dark:opacity-85" />
          <div className="absolute inset-0 bg-grid-mask pointer-events-none" />
        </div>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-xl focus:bg-orange-500 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header route={route} onSearch={() => setPaletteOpen(true)} onMenu={() => setMenuOpen(true)} />
        <div className="relative z-10 flex">
          <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-rule bg-page/70 backdrop-blur-md lg:block">
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
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
