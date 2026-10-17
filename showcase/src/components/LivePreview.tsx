import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { getLibraryComponent } from "../library/registry";

interface FrameProps {
  /** Width the content is laid out at before being scaled to fit. */
  designWidth: number;
  /** Fixed design height; defaults to whatever fills the box after scaling. */
  designHeight?: number;
  /** Never scale above 1 (mobile frames in a wide stage stay at real size). */
  maxScale?: number;
  className?: string;
  children: (size: { width: number; height: number; scale: number }) => ReactNode;
}

/**
 * Lays content out at a "device" width and scales it down to fit its box, the way
 * a device preview would. Children get the final design size so iframes and React
 * previews see a realistic viewport.
 */
export function ScaledFrame({ designWidth, designHeight, maxScale = 1, className = "", children }: FrameProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = box.w ? Math.min(maxScale, box.w / designWidth, designHeight ? box.h / designHeight : Infinity) : 0;
  const width = designWidth;
  const height = designHeight ?? (scale ? box.h / scale : 0);
  const offsetX = Math.max(0, (box.w - width * scale) / 2);

  return (
    <div ref={boxRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      {scale > 0 && (
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{ width, height, transform: `translate3d(${offsetX}px,0,0) scale(${scale})` }}
        >
          {children({ width, height, scale })}
        </div>
      )}
    </div>
  );
}

interface LivePreviewProps {
  componentId: string;
  designWidth?: number;
  loop?: boolean;
  muted?: boolean;
  /** Gallery cards: no focus or pointer events inside the preview. */
  inert?: boolean;
  /** Unmount when scrolled away so off-screen canvases stop burning CPU. */
  lazy?: boolean;
  className?: string;
}

/** Renders a library component live, scaled into its card. */
export function LivePreview({ componentId, designWidth = 960, loop = true, muted = true, inert = true, lazy = true, className = "" }: LivePreviewProps) {
  const [ref, inView] = useInView<HTMLDivElement>("150px");
  const Component = getLibraryComponent(componentId);
  const show = !lazy || inView;

  useEffect(() => {
    if (ref.current) ref.current.inert = inert;
  }, [inert, ref]);

  return (
    <div ref={ref} className={`h-full w-full ${className}`} aria-hidden={inert || undefined}>
      {show && Component ? <ScaledFrame designWidth={designWidth}>{() => <Component loop={loop} muted={muted} />}</ScaledFrame> : <div className="h-full w-full bg-stage" />}
    </div>
  );
}
