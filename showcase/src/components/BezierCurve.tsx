import { bezierPoint, type Bezier } from "../lib/easing";

interface Props {
  curve: Bezier;
  size?: number;
  color?: string;
  /** Show chart paper, control handles and axis labels (inspector) or just the stroke (cards). */
  detailed?: boolean;
  className?: string;
}

const GRID = "#dfe6e0";
const GRID_MAJOR = "#b9cbbe";
const INK = "#1b2742";

/** Plots a cubic-bezier easing: x = time, y = value. Leaves room for overshoot. */
export function BezierCurve({ curve, size = 220, color = INK, detailed = true, className = "" }: Props) {
  const [x1, y1, x2, y2] = curve;
  const minY = Math.min(0, y1, y2);
  const maxY = Math.max(1, y1, y2);
  const pad = detailed ? 20 : 3;
  const inner = size - pad * 2;
  const span = maxY - minY;
  const sx = (x: number) => pad + x * inner;
  const sy = (y: number) => pad + ((maxY - y) / span) * inner;

  const d = Array.from({ length: 61 }, (_, i) => bezierPoint(curve, i / 60))
    .map(([x, y], i) => `${i ? "L" : "M"}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} role="img" aria-label={`Easing curve cubic-bezier(${curve.join(", ")})`}>
      {detailed && (
        <g>
          {Array.from({ length: 11 }, (_, i) => i / 10).map((g) => (
            <g key={g} stroke={g === 0.5 ? GRID_MAJOR : GRID} strokeWidth={g === 0.5 ? 1 : 0.6}>
              <line x1={sx(g)} y1={pad} x2={sx(g)} y2={pad + inner} />
              <line x1={pad} y1={pad + g * inner} x2={pad + inner} y2={pad + g * inner} />
            </g>
          ))}
          <line x1={pad} y1={sy(0)} x2={pad + inner} y2={sy(0)} stroke={INK} strokeWidth="1" />
          <line x1={pad} y1={pad} x2={pad} y2={pad + inner} stroke={INK} strokeWidth="1" />
          <line x1={pad} y1={sy(1)} x2={pad + inner} y2={sy(1)} stroke={INK} strokeWidth="0.8" strokeDasharray="3 4" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(x1)} y2={sy(y1)} stroke={INK} />
          <line x1={sx(1)} y1={sy(1)} x2={sx(x2)} y2={sy(y2)} stroke={INK} />
          <circle cx={sx(x1)} cy={sy(y1)} r="4.5" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
          <circle cx={sx(x2)} cy={sy(y2)} r="4.5" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
          <text x={pad + inner} y={size - 5} fontSize="10" textAnchor="end" fill="#586174" fontFamily="Archivo, sans-serif">
            time
          </text>
          <text x={pad + 4} y={pad - 7} fontSize="10" fill="#586174" fontFamily="Archivo, sans-serif">
            value
          </text>
        </g>
      )}
      <path d={d} fill="none" stroke={color} strokeWidth={detailed ? 2.5 : 1.8} strokeLinecap="round" />
    </svg>
  );
}
