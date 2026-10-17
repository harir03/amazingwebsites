import type { CSSProperties } from "react";
import type { Bezier } from "../lib/easing";

interface Props {
  curve: Bezier | null;
  color: string;
  size?: number;
  /** Trace the curve with a dot while the surrounding `.group` is hovered or focused. */
  trace?: boolean;
  className?: string;
}

/**
 * The component's easing curve on a tile in its theme's pen colour: the card's "logo".
 * On hover a dot runs along it: linear across (time), the curve's own easing up (value),
 * so you see the timing the component actually uses.
 */
export function CurveTile({ curve, color, size = 36, trace = false, className = "" }: Props) {
  const pad = 7;
  const span = 36 - pad * 2;
  const x = (v: number) => pad + v * span;
  const y = (v: number) => 36 - pad - v * span;
  const d = curve ? `M${x(0)} ${y(0)}C${x(curve[0])} ${y(curve[1])} ${x(curve[2])} ${y(curve[3])} ${x(1)} ${y(1)}` : `M${x(0)} ${y(0)}L${x(1)} ${y(1)}`;
  const ease = curve ? `cubic-bezier(${curve.join(",")})` : "linear";

  return (
    <span className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-[9px] ${className}`} style={{ width: size, height: size, background: color }} aria-hidden="true">
      <svg viewBox="0 0 36 36" width={size} height={size} className="overflow-visible">
        <path d={d} fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="2.2" strokeLinecap="round" />
        {trace && (
          <g
            className="[transition:none] group-hover:[transition:transform_1.1s_linear] group-focus-within:[transition:transform_1.1s_linear] group-hover:[transform:translateX(var(--span))] group-focus-within:[transform:translateX(var(--span))]"
            style={{ "--span": `${span}px` } as CSSProperties}
          >
            <g
              className="[transition:none] group-hover:[transition:transform_1.1s_var(--ease)] group-focus-within:[transition:transform_1.1s_var(--ease)] group-hover:[transform:translateY(calc(var(--span)*-1))] group-focus-within:[transform:translateY(calc(var(--span)*-1))]"
              style={{ "--ease": ease, "--span": `${span}px` } as CSSProperties}
            >
              <circle cx={x(0)} cy={y(0)} r="3.2" fill="#fff" />
            </g>
          </g>
        )}
        {!trace && <circle cx={x(0)} cy={y(0)} r="2.6" fill="#fff" />}
      </svg>
    </span>
  );
}

/** Same tile shape for a site: its measured palette, as bands. */
export function SiteTile({ palette, size = 36 }: { palette: string[]; size?: number }) {
  return (
    <span className="inline-flex shrink-0 overflow-hidden rounded-[9px] outline -outline-offset-1 outline-ink/10" style={{ width: size, height: size }} aria-hidden="true">
      {palette.map((c) => (
        <span key={c} className="h-full flex-1" style={{ background: c }} />
      ))}
    </span>
  );
}
