import { useEffect, useRef, useState } from "react";

/**
 * Drafting Blueprint Header — inspired by Heron AI.
 * A hairline-ruled bar split into cells: isometric cube logo, links with a sliding
 * hover pill, a live cursor coordinate readout, and an orange CTA.
 */
type Props = { links?: string[] };

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const MONO = "'Geist Mono', ui-monospace, monospace";
const SANS = "'Space Grotesk', 'Arial', sans-serif";

function CubeLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true" fill="none" stroke="#282828" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M16 3 28 10v12L16 29 4 22V10Z" />
      <path d="M4 10l12 7 12-7M16 17v12" />
      <path d="M16 3v6" stroke="#fa3600" />
    </svg>
  );
}

export default function DraftingHeader({ links = ["Platform", "Use cases", "Why Heron", "Pricing"] }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  const shown = hover ?? active;

  // Measure the target link; re-measure once web fonts load and on resize.
  useEffect(() => {
    const ul = navRef.current;
    if (!ul) return;
    const measure = () => {
      const li = ul.querySelectorAll<HTMLElement>("li[data-link]")[shown];
      if (li) setPill({ left: li.offsetLeft, width: li.offsetWidth });
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    return () => ro.disconnect();
  }, [shown, links.length]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      setCoords({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  const fmt = (n: number) => Math.max(0, n).toFixed(2).padStart(7, "0");

  return (
    <div
      ref={rootRef}
      className="@container relative h-full min-h-[280px] w-full overflow-hidden bg-[#fafafa] text-[#282828]"
      style={{
        backgroundImage:
          "linear-gradient(#b3b3af33 1px, transparent 1px), linear-gradient(90deg, #b3b3af33 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        fontFamily: SANS,
      }}
    >
      <header className="relative m-3 border border-[#b3b3af] bg-[#fafafa]">
        {/* corner registration marks */}
        {["-top-[7px] -left-[7px]", "-top-[7px] -right-[7px]", "-bottom-[7px] -left-[7px]", "-bottom-[7px] -right-[7px]"].map((p) => (
          <span key={p} aria-hidden="true" className={`absolute ${p} text-[12px] leading-none text-[#fa3600]`} style={{ fontFamily: MONO }}>
            +
          </span>
        ))}
        <div className="flex h-14 items-stretch divide-x divide-[#b3b3af]">
          <a href="#top" className="flex items-center gap-2 px-4" aria-label="Heron, home">
            <CubeLogo />
            <span className="text-[15px] font-bold tracking-[0.12em]">HERON</span>
          </a>

          <nav aria-label="Primary" className="hidden flex-1 items-center px-3 @2xl:flex">
            <ul ref={navRef} className="relative flex gap-1" onMouseLeave={() => setHover(null)}>
              <li
                aria-hidden="true"
                className="absolute inset-y-0 rounded-full bg-[#282828]"
                style={{ left: pill.left, width: pill.width, transition: `left 0.4s ${EASE}, width 0.4s ${EASE}` }}
              />
              {links.map((l, i) => (
                <li key={l} data-link className="relative">
                  <a
                    href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                    aria-current={i === active ? "page" : undefined}
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    onClick={(e) => {
                      e.preventDefault();
                      setActive(i);
                    }}
                    className="block px-3.5 py-1.5 text-[12px] tracking-[0.08em] uppercase transition-colors duration-300 focus-visible:outline-none"
                    style={{ color: i === shown ? "#fafafa" : "#414140", fontFamily: MONO }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden min-w-[190px] flex-col justify-center px-4 text-[10px] leading-tight text-[#72726f] @3xl:flex" style={{ fontFamily: MONO }} aria-hidden="true">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#fa3600]" /> SYS · ONLINE
            </span>
            <span>
              X {fmt(coords.x)} · Y {fmt(coords.y)}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2 px-3 @2xl:ml-0">
            <a
              href="#contact"
              className="group flex items-center gap-2 bg-[#fa3600] px-4 py-2 text-[12px] font-semibold tracking-[0.08em] text-white uppercase"
              style={{ fontFamily: MONO }}
            >
              Contact us
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center border border-[#b3b3af] @2xl:hidden"
              aria-expanded={menuOpen}
              aria-label="Menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="relative block h-2.5 w-4" aria-hidden="true">
                <span className="absolute inset-x-0 top-0 h-px bg-[#282828] transition-transform duration-300" style={{ transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }} />
                <span className="absolute inset-x-0 bottom-0 h-px bg-[#282828] transition-transform duration-300" style={{ transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none" }} />
              </span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <ul className="border-t border-[#b3b3af] @2xl:hidden">
            {links.map((l, i) => (
              <li key={l} className="border-b border-[#b3b3af] last:border-b-0">
                <a href="#" className="flex justify-between px-4 py-3 text-[12px] tracking-[0.08em] uppercase" style={{ fontFamily: MONO }}>
                  <span>{l}</span>
                  <span className="text-[#72726f]">[0{i + 1}]</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="pointer-events-none absolute right-4 bottom-4 left-4 flex items-end justify-between text-[10px] text-[#72726f]" style={{ fontFamily: MONO }}>
        <span>SHEET A-101 · SCALE 1:100</span>
        <span>REV. 04</span>
      </div>
    </div>
  );
}
