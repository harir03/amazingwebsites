import { Check, Copy } from "lucide-react";
import type { CatalogComponent } from "../../data/catalog";
import { useCopy } from "../../hooks/toast";
import { isLight, toHsl } from "../../lib/color";
import { googleFontsLink, primaryFamily } from "../../lib/fonts";
import { cssVariables } from "../../lib/source";
import { SectionHeading } from "./MotionSection";

const quiet = "rounded-lg border border-rule bg-surface px-2.5 py-1 text-[13px] font-medium text-ink hover:border-purple/40 hover:text-purple transition-colors shadow-xs";

export function TokensSection({ item }: { item: CatalogComponent }) {
  const { copy, copiedKey } = useCopy();
  const t = item.designTokens;
  const colors = Object.entries(t.colors);
  const families = [...new Set(t.fontFamilies.map(primaryFamily))];

  return (
    <>
      <section aria-labelledby="colours" className="scroll-mt-20">
        <SectionHeading
          id="colours"
          action={
            <button type="button" onClick={() => copy(cssVariables(item), "CSS variables", `vars-${item.id}`)} className={`flex items-center gap-1.5 ${quiet}`}>
              {copiedKey === `vars-${item.id}` ? <Check className="h-3.5 w-3.5 text-ok" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              Copy as CSS variables
            </button>
          }
        >
          Colours
        </SectionHeading>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 2xl:grid-cols-4">
          {colors.map(([name, value]) => {
            const hsl = toHsl(value);
            const key = `c-${item.id}-${name}`;
            return (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => copy(value, `${name} (${value})`, key)}
                  className="group relative flex h-20 w-full items-end rounded-xl p-2.5 text-left shadow-[inset_0_0_0_1px_rgb(27_39_66_/_0.08)]"
                  style={{
                    // Checkerboard under the swatch so translucent colours read correctly.
                    backgroundImage: `linear-gradient(${value}, ${value}), repeating-conic-gradient(#e6e8e3 0 25%, #ffffff 0 50%)`,
                    backgroundSize: "auto, 12px 12px",
                    color: isLight(value) ? "#1b2742" : "#ffffff",
                  }}
                  aria-label={`Copy ${name} ${value}`}
                >
                  <span className="text-[13px] font-medium opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{copiedKey === key ? "Copied" : "Copy"}</span>
                </button>
                <p className="mt-2 text-[14px] font-medium text-ink">{name}</p>
                <p className="font-mono text-[12.5px] text-ink-2">{value}</p>
                {hsl && (
                  <button type="button" onClick={() => copy(hsl, `${name} HSL`, `${key}-hsl`)} className="text-left font-mono text-[12.5px] text-muted hover:text-ink" aria-label={`Copy ${name} as HSL`}>
                    {copiedKey === `${key}-hsl` ? "Copied" : hsl}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="typography" className="scroll-mt-20">
        <SectionHeading
          id="typography"
          action={
            <button type="button" onClick={() => copy(googleFontsLink(families), "Google Fonts link", `gf-${item.id}`)} className={`flex items-center gap-1.5 ${quiet}`}>
              {copiedKey === `gf-${item.id}` ? <Check className="h-3.5 w-3.5 text-ok" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              Copy font &lt;link&gt;
            </button>
          }
        >
          Typography
        </SectionHeading>
        <ul className="divide-y divide-rule border-y border-rule">
          {t.fontFamilies.map((stack, i) => {
            const fam = primaryFamily(stack);
            const key = `f-${item.id}-${i}`;
            return (
              <li key={stack} className="grid gap-x-6 gap-y-2 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <div className="min-w-0">
                  <p className="text-[13px] text-muted">
                    {i === 0 ? "Primary" : "Secondary"}, {fam}
                  </p>
                  <p className="truncate text-[44px] leading-[1.15] text-ink" style={{ fontFamily: stack }}>
                    Aa Gg Rr 0123
                  </p>
                  <code className="mt-1 block truncate font-mono text-[12.5px] text-ink-2">font-family: {stack};</code>
                </div>
                <button type="button" onClick={() => copy(`font-family: ${stack};`, `${fam} stack`, `${key}-s`)} className={`justify-self-start ${quiet}`}>
                  {copiedKey === `${key}-s` ? "Copied" : "Copy stack"}
                </button>
              </li>
            );
          })}
        </ul>
        {t.originalFonts.length > 0 && (
          <p className="mt-4 max-w-[68ch] text-[14px] leading-relaxed text-ink-2">
            The original site uses <span className="text-ink">{t.originalFonts.join(", ")}</span>. These stacks swap in open-source faces with a similar feel and keep the original
            names as fallbacks, so licensed copies are picked up automatically if installed.
          </p>
        )}
      </section>

      <section aria-labelledby="materials" className="scroll-mt-20">
        <SectionHeading id="materials">Materials</SectionHeading>
        <ul className="flex flex-wrap gap-2">
          {t.materials.map((m) => (
            <li key={m} className="rounded-full bg-tray px-3 py-1.5 text-[14px] text-ink">
              {m}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
