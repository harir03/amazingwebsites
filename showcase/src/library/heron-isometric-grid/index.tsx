/**
 * Isometric Wireframe Grid — inspired by Heron AI's "problem" section.
 * Four hairline cards with isometric line drawings. On hover/focus the card inverts
 * to ink and the wireframe re-plots itself with a stroke-dashoffset draw.
 */
type Card = { tag: string; title: string; body: string; shape: string[]; accent: string };

const CARDS: Card[] = [
  {
    tag: "01",
    title: "Manual",
    body: "Checks happen by eye, sheet by sheet, long after the model changed.",
    shape: ["M20 72 L60 52 L100 72 L60 92 Z", "M46 32 V84 M74 32 V84", "M46 84 A14 7 0 0 0 74 84"],
    accent: "M46 32 A14 7 0 1 0 74 32 A14 7 0 1 0 46 32",
  },
  {
    tag: "02",
    title: "Disjointed",
    body: "Comments live in PDFs and chats, nowhere near the geometry.",
    shape: ["M40 72 L60 62 L80 72 L80 97 L60 107 L40 97 Z", "M40 72 L60 82 L80 72 M60 82 V107", "M44 44 A16 5 0 0 0 76 44"],
    accent: "M44 44 A16 16 0 1 1 76 44 A16 16 0 1 1 44 44",
  },
  {
    tag: "03",
    title: "Blind",
    body: "Clashes and code issues surface on site, where they cost the most.",
    shape: ["M48 58 L60 52 L72 58 L72 74 L60 80 L48 74 Z", "M48 58 L60 64 L72 58 M60 64 V80"],
    accent: "M16 66 A44 22 0 1 0 104 66 A44 22 0 1 0 16 66",
  },
  {
    tag: "04",
    title: "Slow",
    body: "Every revision restarts the review cycle from zero.",
    shape: ["M20 48 L55 30 L90 48 L55 66 Z", "M30 64 L65 46 L100 64 L65 82 Z"],
    accent: "M40 80 L75 62 L110 80 L75 98 Z",
  },
];

const CSS = `
.hiso-card { --ink:#282828; --paper:#fafafa; --rule:#b3b3af; --brand:#fa3600; transition: background-color .45s cubic-bezier(0.22,1,0.36,1), color .45s; }
.hiso-card .base { stroke: var(--rule); transition: stroke .45s; }
.hiso-card .draw { stroke: var(--paper); stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset .9s cubic-bezier(0.22,1,0.36,1); }
.hiso-card .draw.accent { stroke: var(--brand); transition-delay: .15s; }
.hiso-card:hover, .hiso-card:focus-visible { background: var(--ink); color: var(--paper); }
.hiso-card:hover .base, .hiso-card:focus-visible .base { stroke: #414140; }
.hiso-card:hover .draw, .hiso-card:focus-visible .draw { stroke-dashoffset: 0; }
.hiso-card .accent-rest { stroke: var(--brand); opacity: .55; transition: opacity .3s; }
.hiso-card:hover .accent-rest, .hiso-card:focus-visible .accent-rest { opacity: 0; }
@media (prefers-reduced-motion: reduce) { .hiso-card .draw { transition: none; } }
`;

export default function IsometricGrid({ cards = CARDS }: { cards?: Card[] }) {
  return (
    <section
      className="@container h-full min-h-[320px] w-full overflow-auto bg-[#fafafa] p-4 text-[#282828]"
      style={{ fontFamily: "'Space Grotesk', Arial, sans-serif" }}
    >
      <style>{CSS}</style>
      <div className="mb-4 flex items-end justify-between gap-4 border-b border-[#b3b3af] pb-3">
        <h2 className="text-[clamp(20px,3.6cqw,36px)] leading-none font-bold tracking-[-0.02em] uppercase">Review is broken</h2>
        <span className="text-[10px] tracking-[0.15em] text-[#72726f] uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
          Fig. 02 — Problem
        </span>
      </div>
      <ul className="grid grid-cols-1 border-t border-l border-[#b3b3af] @md:grid-cols-2 @3xl:grid-cols-4">
        {cards.map((c) => (
          <li key={c.tag} className="contents">
            <a href={`#${c.title.toLowerCase()}`} className="hiso-card flex min-h-[220px] flex-col border-r border-b border-[#b3b3af] p-4 focus-visible:outline-none">
              <span className="text-[11px] tracking-[0.12em] uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
                [{c.tag}] {c.title}
              </span>
              <svg viewBox="0 0 120 120" className="mx-auto my-3 w-[70%] max-w-[150px] flex-1" fill="none" strokeWidth="1.2" aria-hidden="true">
                {c.shape.map((d) => (
                  <path key={`b${d}`} className="base" d={d} />
                ))}
                <path className="accent-rest" d={c.accent} />
                {c.shape.map((d) => (
                  <path key={`d${d}`} className="draw" d={d} pathLength={1} />
                ))}
                <path className="draw accent" d={c.accent} pathLength={1} />
              </svg>
              <p className="text-[13px] leading-snug opacity-80">{c.body}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
