import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/features/pitch/utils/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

interface TrackData {
  id: string;
  num: string;
  name: string;
  seat: string;
  tagline: string;
  summary: string;
  prompts: string[];
  themeColor: string;
  glowColor: string;
}

const tracks: TrackData[] = [
  {
    id: "upi",
    num: "01",
    name: "UPI Cashflow Engine",
    seat: "SEAT 01",
    tagline: "Hack the velocity of money. Code capital that moves at the speed of light.",
    summary:
      "Re-engineer how billions flow. Ingest high-frequency QR transaction streams, separating genuine retail velocity from circular peer-to-peer spikes to construct an accurate, verified liquidity baseline for Bharat.",
    prompts: [
      "Real-time UPI merchant QR inflow velocity and counterparty dispersion",
      "Seasonal peak calibration across agricultural harvest and festival cycles",
      "Algorithmic anomaly filtering against artificial churn and circular loops",
    ],
    themeColor: "#70F35D",
    glowColor: "rgba(112, 243, 93, 0.45)",
  },
  {
    id: "utility",
    num: "02",
    name: "Utility & GST Cadence",
    seat: "SEAT 02",
    tagline: "Continuous operational proof through electricity, rent, telecom, and tax ledgers.",
    summary:
      "A functioning shop never cuts its electricity or lets inventory filings lapse. We synthesize municipal electricity meter consistency, wholesale mandi invoice payments, and telecom top-ups into tamper-proof reliability proof.",
    prompts: [
      "State discom electricity payment consistency and industrial load stability",
      "Quarterly GST filing cadence and B2B vendor purchase order cross-verification",
      "Telecom recharge regularity and operational geographic persistence",
    ],
    themeColor: "#E5B83B",
    glowColor: "rgba(229, 184, 59, 0.45)",
  },
  {
    id: "privacy",
    num: "03",
    name: "Edge Zero-Knowledge",
    seat: "SEAT 03",
    tagline: "Credit underwriting without exposing raw personal bank account statements.",
    summary:
      "Full compliance with the Digital Personal Data Protection Act. Sensitive transaction logs are computed locally on user devices or ephemeral secure enclaves, generating mathematical zero-knowledge proofs of solvency.",
    prompts: [
      "Zero-knowledge cryptographic solvency proofs for lending NBFC partners",
      "On-device feature vector extraction with zero raw statement persistence",
      "Granular time-bounded consent revocation under RBI and DPDP directives",
    ],
    themeColor: "#2DD4BF",
    glowColor: "rgba(45, 212, 191, 0.45)",
  },
  {
    id: "mitra",
    num: "04",
    name: "Vernacular Voice: Mitra",
    seat: "SEAT 04",
    tagline: "Natural conversational underwriting in Hindi, Tamil, Telugu, Bengali, and Gujarati.",
    summary:
      "Complex multi-page PDF loan agreements alienate Bharat. Mitra conducts audio interviews in the borrower's mother tongue, recording crop yields, vendor payment terms, and family balance sheets with dignity and clarity.",
    prompts: [
      "Audio-native vernacular dialogue engines across 14 Indian languages",
      "Acoustic stress and sentiment calibration without invasive profiling",
      "Transparent spoken terms, EMI repayment schedules, and interest breakdowns",
    ],
    themeColor: "#60A5FA",
    glowColor: "rgba(96, 165, 250, 0.45)",
  },
  {
    id: "restructure",
    num: "05",
    name: "Dynamic Restructuring",
    seat: "SEAT 05",
    tagline: "Proactive repayment adjustment before defaults happen, not punitive recovery.",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    prompts: [
      "Micro-climate rainfall and mandi yield correlation against farm cashflow",
      "Automated tenure extension and flexible weekly micro-EMI recalculation",
      "Cooperative non-punitive dispute resolution between borrowers and lenders",
    ],
    themeColor: "#C084FC",
    glowColor: "rgba(192, 132, 252, 0.45)",
  },
  {
    id: "fairness",
    num: "06",
    name: "Anti-Bias SHAP Audit",
    seat: "SEAT 06",
    tagline: "Explainable credit recommendations with mathematically verified neutrality.",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit.",
    prompts: [
      "Exact feature attribution scoring ensuring zero demographic bias",
      "Counterfactual improvement roadmaps for declined micro-merchants",
      "Audit-ready explainability dossiers formatted for NBFC and RBI compliance",
    ],
    themeColor: "#FB923C",
    glowColor: "rgba(251, 146, 60, 0.45)",
  },
];

// Track Visual Plate Icons
const TrackVisualIcon = ({ id, color }: { id: string; color: string }) => {
  if (id === "upi") {
    return (
      <svg viewBox="0 0 160 160" className="w-24 h-24 md:w-28 md:h-28 transition-transform duration-500" style={{ filter: `drop-shadow(0 0 24px ${color})` }}>
        {/* Rising growth chart curve and arrow */}
        <path
          d="M28 108C48 92 72 70 102 48L110 54M102 48H122V68"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 3 Bar chart columns */}
        <rect x="28" y="118" width="16" height="24" rx="4" fill={color} />
        <rect x="52" y="96" width="16" height="46" rx="4" fill={color} />
        <rect x="76" y="76" width="16" height="66" rx="4" fill={color} />
        {/* Coin Stack on right */}
        <ellipse cx="118" cy="98" rx="18" ry="7" fill="none" stroke={color} strokeWidth="3.5" />
        <ellipse cx="118" cy="110" rx="18" ry="7" fill="none" stroke={color} strokeWidth="3.5" />
        <ellipse cx="118" cy="122" rx="18" ry="7" fill="none" stroke={color} strokeWidth="3.5" />
        <ellipse cx="118" cy="134" rx="18" ry="7" fill="none" stroke={color} strokeWidth="3.5" />
        <path d="M100 98V134M136 98V134" stroke={color} strokeWidth="3.5" />
      </svg>
    );
  }

  if (id === "utility") {
    return (
      <svg viewBox="0 0 160 160" className="w-24 h-24 md:w-28 md:h-28 transition-transform duration-500" style={{ filter: `drop-shadow(0 0 24px ${color})` }}>
        {/* Lightbulb and energy grid */}
        <path
          d="M80 30C58 30 40 48 40 70C40 82 48 94 58 102V114C58 117 61 120 64 120H96C99 120 102 117 102 114V102C112 94 120 82 120 70C120 48 102 30 80 30Z"
          fill="none"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M66 78L74 62H86L94 78" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M64 126H96M68 132H92M74 138H86" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M80 14V20M26 70H32M128 70H134M42 38L48 44M118 38L112 44" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "privacy") {
    return (
      <svg viewBox="0 0 160 160" className="w-24 h-24 md:w-28 md:h-28 transition-transform duration-500" style={{ filter: `drop-shadow(0 0 24px ${color})` }}>
        {/* Shield */}
        <path
          d="M80 24L124 42V82C124 114 104 138 80 146C56 138 36 114 36 82V42L80 24Z"
          fill="none"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Padlock */}
        <rect x="64" y="78" width="32" height="28" rx="5" fill="none" stroke={color} strokeWidth="4" />
        <path d="M70 78V66C70 60 74 56 80 56C86 56 90 60 90 66V78" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <circle cx="80" cy="90" r="3" fill={color} />
        <path d="M80 93V97" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "mitra") {
    return (
      <svg viewBox="0 0 160 160" className="w-24 h-24 md:w-28 md:h-28 transition-transform duration-500" style={{ filter: `drop-shadow(0 0 24px ${color})` }}>
        {/* Head profile silhouette */}
        <path
          d="M68 28C92 28 112 48 112 72C112 84 107 95 99 102V116C99 122 94 126 88 126H78V134H58V126H54C42 126 32 116 32 104V88C32 82 36 78 40 78C42 78 44 79 45 80C46 51 56 28 68 28Z"
          fill="none"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Sound wave inside */}
        <path d="M68 66V82M75 58V90M82 52V96M89 58V90M96 66V82" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "restructure") {
    return (
      <svg viewBox="0 0 160 160" className="w-24 h-24 md:w-28 md:h-28 transition-transform duration-500" style={{ filter: `drop-shadow(0 0 24px ${color})` }}>
        {/* Dynamic heart and cycle curve */}
        <path
          d="M80 134C80 134 30 102 30 64C30 46 44 32 62 32C72 32 80 38 80 38C80 38 88 32 98 32C116 32 130 46 130 64C130 102 80 134 80 134Z"
          fill="none"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Pulse line inside */}
        <path
          d="M40 76H58L66 54L76 96L84 66L92 84L98 76H120"
          fill="none"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Anti-Bias SHAP Audit
  return (
    <svg viewBox="0 0 160 160" className="w-24 h-24 md:w-28 md:h-28 transition-transform duration-500" style={{ filter: `drop-shadow(0 0 24px ${color})` }}>
      {/* Central Isometric Cube */}
      <path d="M80 34L114 54V94L80 114L46 94V54L80 34Z" fill="none" stroke={color} strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M80 34V114M114 54L80 74L46 54" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      {/* Satellite nodes */}
      <circle cx="28" cy="46" r="6" fill={color} />
      <circle cx="132" cy="46" r="6" fill={color} />
      <circle cx="80" cy="136" r="6" fill={color} />
      <path d="M46 54L28 46M114 54L132 46M80 114L80 136" stroke={color} strokeWidth="2.5" strokeDasharray="4 4" />
    </svg>
  );
};

export const TracksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [dwellKey, setDwellKey] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Drag-to-morph state
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  const currentTrack = tracks[activeIdx];

  // Pause progression when off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const handleAdvance = useCallback(() => {
    setDirection("next");
    if (activeIdx < tracks.length - 1) {
      setActiveIdx((prev) => prev + 1);
      setDwellKey((k) => k + 1);
    } else {
      // Transition to next section
      const nextSec = document.getElementById("judges");
      if (nextSec) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(nextSec, { offset: -20, duration: 1.4 });
        } else {
          nextSec.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setActiveIdx(0);
      setDwellKey((k) => k + 1);
    }
  }, [activeIdx]);

  const handlePrev = useCallback(() => {
    setDirection("prev");
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
    setDwellKey((k) => k + 1);
  }, []);

  // 6-Second Auto progression
  useEffect(() => {
    if (!isIntersecting || isDragging) return;

    const timer = setTimeout(() => {
      handleAdvance();
    }, 6000);

    return () => clearTimeout(timer);
  }, [activeIdx, dwellKey, isIntersecting, isDragging, handleAdvance]);

  // Entrance animation for section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".th-stage-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".th-rail-reveal", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const handleSelectTrack = (idx: number) => {
    if (idx === activeIdx) return;
    setDirection(idx > activeIdx ? "next" : "prev");
    setActiveIdx(idx);
    setDwellKey((k) => k + 1);
  };

  // Pointer drag gestures for 3D Drag to Morph
  const handlePointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startXRef.current;
    setDragX(dx);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }

    if (dragX < -40) {
      handleAdvance();
    } else if (dragX > 40) {
      handlePrev();
    }
    setDragX(0);
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragX(0);
  };

  return (
    <section
      id="themes"
      ref={sectionRef}
      aria-label="The six alternate credit intelligence pillars"
      className="th box-border caret-transparent relative w-full pt-10 pb-12 px-4 text-center text-lime-50 scroll-mt-20 md:pt-14 md:pb-14 md:px-8"
    >
      <div id="tracks" className="relative -top-20 h-0 pointer-events-none" aria-hidden="true" />

      {/* Tightly contained container matching reference proportions */}
      <div className="th-inner">
        {/* Header matching reference screenshot */}
        <div className="text-center space-y-1.5 mb-6 md:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono tracking-[0.22em] text-[#70F35D] uppercase bg-[#70F35D]/10 border border-[#70F35D]/25">
            THE SIX PILLARS
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[2.4rem] font-bold text-white tracking-tight leading-[1.12]">
            Six directions <br className="hidden sm:inline" />
            <span className="text-white/95">to underwrite in.</span>
          </h2>

          <p className="text-xs sm:text-[13px] text-neutral-400 max-w-[560px] mx-auto leading-relaxed pt-0.5">
            One seat at the table for each. Pick the one you cannot stop thinking about — every pillar is evaluated on real-world honesty.
          </p>
        </div>

        {/* The Stage: Left Plate & Right Brief */}
        <div className="th-stage-reveal w-full">
          <div className="th-stage">
            {/* Left: Morphing Visual Plate (Compact, Proportional, Balanced) */}
            <div
              className="th-plate cursor-grab active:cursor-grabbing group select-none"
              onClick={handleAdvance}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              style={{
                transform: isDragging
                  ? `translate3d(${dragX * 0.35}px, 0, 0) rotateY(${dragX * 0.08}deg) scale(0.98)`
                  : "none",
                transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              title="Click or drag to morph"
              role="button"
              tabIndex={0}
            >
              {/* Dynamic Animated Card Content keyed by track ID */}
              <div
                key={currentTrack.id}
                className={`th-plate-inner ${direction === "next" ? "animate-card-in-next" : "animate-card-in-prev"}`}
              >
                {/* Outlined Track Number in Top-Left */}
                <span className="th-plate-index" aria-hidden="true">
                  {currentTrack.num}
                </span>

                {/* Concentric Radar Rings & Glowing Graphic */}
                <div className="th-plate-content relative w-full h-full flex items-center justify-center overflow-hidden">
                  {/* Atmospheric Smoky Nebula Background */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-all duration-700"
                    style={{
                      background: `
                        radial-gradient(ellipse 75% 65% at 28% 48%, ${currentTrack.glowColor} 0%, rgba(6, 11, 5, 0.6) 65%, rgba(6, 11, 5, 0) 100%),
                        radial-gradient(circle at 75% 60%, ${currentTrack.themeColor}22 0%, rgba(6, 11, 5, 0) 65%)
                      `,
                    }}
                  />

                  {/* Velvety Film Texture Overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14] mix-blend-overlay" aria-hidden="true">
                    <filter id={`th-noise-${currentTrack.id}`}>
                      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter={`url(#th-noise-${currentTrack.id})`} />
                  </svg>

                  {/* Sonar / Radar Rings positioned towards center-right like reference */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 480 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <g transform="translate(270, 155)" opacity="0.34">
                      <circle r="36" fill="none" stroke={currentTrack.themeColor} strokeWidth="1" strokeDasharray="3 3" />
                      <circle r="72" fill="none" stroke={currentTrack.themeColor} strokeWidth="1" opacity="0.75" />
                      <circle r="115" fill="none" stroke={currentTrack.themeColor} strokeWidth="1" strokeDasharray="4 6" opacity="0.45" />
                      <circle r="160" fill="none" stroke={currentTrack.themeColor} strokeWidth="0.75" opacity="0.3" />
                      <circle r="210" fill="none" stroke={currentTrack.themeColor} strokeWidth="0.75" strokeDasharray="2 4" opacity="0.2" />
                      {/* Crosshairs */}
                      <line x1="-270" y1="0" x2="210" y2="0" stroke={currentTrack.themeColor} strokeWidth="0.5" opacity="0.2" />
                      <line x1="0" y1="-155" x2="0" y2="165" stroke={currentTrack.themeColor} strokeWidth="0.5" opacity="0.2" />
                      {/* 45 deg diagonals */}
                      <line x1="-100" y1="-100" x2="100" y2="100" stroke={currentTrack.themeColor} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.12" />
                      <line x1="100" y1="-100" x2="-100" y2="100" stroke={currentTrack.themeColor} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.12" />
                    </g>
                  </svg>

                  {/* Center Glowing Icon with Spring Pop Animation */}
                  <div className="relative z-10 th-plate-icon">
                    <TrackVisualIcon id={currentTrack.id} color={currentTrack.themeColor} />
                  </div>
                </div>

                {/* Bottom-Right "DRAG TO MORPH" */}
                <span className="th-plate-hint flex items-center gap-1">
                  <span>DRAG TO MORPH</span>
                  <svg className="w-2.5 h-2.5 opacity-60" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Right: The Brief */}
            <div className="th-brief">
              <span className="th-brief-seat" key={`seat-${currentTrack.id}`}>{currentTrack.seat}</span>

              {/* Title with Masked Slide-Up */}
              <h3 className="th-brief-title" key={`title-${currentTrack.id}`}>
                <span className="th-mask-line">
                  <span className="th-mask-inner">{currentTrack.name}</span>
                </span>
              </h3>

              <span className="th-brief-rule" aria-hidden="true">
                <i key={`rule-${currentTrack.id}`} />
              </span>

              {/* Tagline */}
              <p className="th-brief-line" key={`tagline-${currentTrack.id}`}>
                {currentTrack.tagline}
              </p>

              {/* Summary */}
              <p className="th-brief-summary" key={`summary-${currentTrack.id}`}>
                {currentTrack.summary}
              </p>

              {/* Prompts Checklist with Clean Glowing Checkmarks */}
              <ul className="th-prompts" key={`prompts-${currentTrack.id}`}>
                {currentTrack.prompts.map((prompt, i) => (
                  <li key={`${currentTrack.id}-${i}`} className="th-prompt-item" style={{ animationDelay: `${i * 0.06}s` }}>
                    <svg viewBox="0 0 16 16" className="th-check-svg" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: currentTrack.themeColor }}>
                      <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                    </svg>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Rail with 6 Horizontal Dwell Tabs */}
        <div className="th-rail-reveal w-full mt-7 md:mt-9">
          <div className="th-rail" role="tablist" aria-label="Tracks">
            {tracks.map((track, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectTrack(idx)}
                  className={`th-tab ${isActive ? "is-active" : ""}`}
                >
                  <span className="th-tab-num">{track.num}</span>
                  <span className="th-tab-name">{track.name}</span>
                  <span className="th-tab-bar" aria-hidden="true">
                    {isActive && <i key={`${track.id}-${dwellKey}`} />}
                    {idx < activeIdx && <i className="is-completed" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .th {
          position: relative;
          width: 100%;
          background: transparent;
          color: #EEF5E6;
          overflow: hidden;
          z-index: 10;
        }

        .th-inner {
          position: relative;
          max-width: 1040px;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        .th-stage-reveal {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* ── Two-Column Grid: Proportional & Tightly Contained ── */
        .th-stage {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
          gap: clamp(1.5rem, 3.5vw, 2.75rem);
          align-items: center;
          width: 100%;
          text-align: left;
        }

        /* ── Left: The Morphing Plate (Fixed compact proportional ratio) ── */
        .th-plate {
          position: relative;
          width: 100%;
          max-width: 480px;
          height: clamp(285px, 30vw, 325px);
          aspect-ratio: 16 / 11;
          border-radius: 20px;
          overflow: hidden;
          background: #060B05;
          box-shadow:
            0 30px 70px -34px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(190, 224, 168, 0.1);
          perspective: 1000px;
        }

        .th-plate-inner {
          position: relative;
          width: 100%;
          height: 100%;
        }

        /* ── Card Entrance 3D Transition Animations ── */
        @keyframes cardEnterNext {
          0% {
            transform: perspective(1000px) translate3d(42px, 0, 0) scale(0.92) rotateY(-7deg);
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            transform: perspective(1000px) translate3d(0, 0, 0) scale(1) rotateY(0deg);
            opacity: 1;
            filter: blur(0px);
          }
        }

        @keyframes cardEnterPrev {
          0% {
            transform: perspective(1000px) translate3d(-42px, 0, 0) scale(0.92) rotateY(7deg);
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            transform: perspective(1000px) translate3d(0, 0, 0) scale(1) rotateY(0deg);
            opacity: 1;
            filter: blur(0px);
          }
        }

        .animate-card-in-next {
          animation: cardEnterNext 0.52s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-card-in-prev {
          animation: cardEnterPrev 0.52s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Center Icon Spring Pop Entrance */
        @keyframes iconSpring {
          0% {
            transform: scale(0.62) translateY(12px);
            opacity: 0;
          }
          65% {
            transform: scale(1.05) translateY(-2px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .th-plate-icon {
          animation: iconSpring 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Outlined Index Number in Top-Left */
        .th-plate-index {
          position: absolute;
          left: clamp(1rem, 2vw, 1.5rem);
          top: clamp(0.5rem, 1.2vw, 0.9rem);
          z-index: 4;
          font-family: var(--font-headingNow), var(--font-dm_sans), sans-serif;
          font-size: clamp(3.2rem, 6.5vw, 4.8rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: 0.02em;
          color: transparent;
          -webkit-text-stroke: 1.4px rgba(240, 250, 230, 0.38);
          pointer-events: none;
          animation: indexDrop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes indexDrop {
          0% {
            transform: translateY(-16px) scale(0.9);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        .th-plate-hint {
          position: absolute;
          right: clamp(1rem, 2vw, 1.4rem);
          bottom: clamp(0.8rem, 1.6vw, 1.2rem);
          z-index: 4;
          font-family: var(--font-geist_mono), monospace;
          font-size: 0.66rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240, 250, 230, 0.42);
          pointer-events: none;
        }

        /* ── Right: The Brief ── */
        .th-brief {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .th-brief-seat {
          font-family: var(--font-geist_mono), monospace;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #70F35D;
          animation: textFadeUp 0.35s ease-out forwards;
        }

        .th-brief-title {
          margin: 0.55rem 0 0;
          font-family: var(--font-headingNow), var(--font-dm_sans), sans-serif;
          font-size: clamp(1.45rem, 13px + 1.8vw, 2.25rem);
          font-weight: 700;
          line-height: 1.14;
          letter-spacing: -0.028em;
          color: #F1F7E9;
          text-wrap: balance;
        }

        .th-mask-line {
          display: block;
          overflow: hidden;
          padding-bottom: 0.08em;
          margin-bottom: -0.08em;
        }

        .th-mask-inner {
          display: block;
          animation: titleSlideUp 0.46s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes titleSlideUp {
          0% {
            transform: translateY(105%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .th-brief-rule {
          display: block;
          width: 100%;
          height: 1px;
          margin-block: clamp(0.75rem, 1.5vw, 1.15rem);
        }

        .th-brief-rule i {
          display: block;
          width: 100%;
          height: 100%;
          background: rgba(143, 196, 90, 0.34);
          transform-origin: left center;
          animation: ruleWipe 0.48s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes ruleWipe {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .th-brief-line {
          font-family: var(--font-headingNow), var(--font-dm_sans), sans-serif;
          font-size: clamp(0.98rem, 1.4vw, 1.15rem);
          font-weight: 600;
          line-height: 1.42;
          letter-spacing: -0.016em;
          color: rgba(233, 244, 224, 0.94);
          text-wrap: pretty;
          animation: textFadeUp 0.42s ease-out forwards;
        }

        .th-brief-summary {
          margin-top: 0.65rem;
          font-family: var(--font-dm_sans), sans-serif;
          font-size: clamp(0.82rem, 1.05vw, 0.92rem);
          line-height: 1.62;
          color: rgba(214, 230, 203, 0.60);
          text-wrap: pretty;
          animation: textFadeUp 0.46s ease-out 0.04s forwards;
        }

        @keyframes textFadeUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        .th-prompts {
          list-style: none;
          margin: clamp(0.85rem, 1.8vw, 1.3rem) 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .th-prompt-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-family: var(--font-dm_sans), sans-serif;
          font-size: clamp(0.8rem, 1.02vw, 0.89rem);
          line-height: 1.44;
          color: rgba(226, 240, 216, 0.82);
          animation: promptSlideIn 0.42s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes promptSlideIn {
          0% {
            opacity: 0;
            transform: translateX(16px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .th-check-svg {
          flex: none;
          width: 0.85rem;
          height: 0.85rem;
          margin-top: 0.22em;
          filter: drop-shadow(0 0 4px currentColor);
        }

        /* ── Bottom Tabs Rail ── */
        .th-rail-reveal {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .th-rail {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: clamp(0.5rem, 1.2vw, 1rem);
          width: 100%;
          border-top: 1px solid rgba(190, 224, 168, 0.13);
          padding-top: clamp(0.9rem, 1.8vw, 1.4rem);
        }

        .th-tab {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.35rem;
          padding: 0.35rem 0 0.85rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: opacity 220ms ease;
        }

        .th-tab-num {
          font-family: var(--font-geist_mono), monospace;
          font-size: 0.66rem;
          letter-spacing: 0.18em;
          color: rgba(190, 224, 168, 0.45);
          transition: color 200ms ease;
        }

        .th-tab-name {
          font-family: var(--font-dm_sans), sans-serif;
          font-size: clamp(0.76rem, 0.98vw, 0.88rem);
          font-weight: 500;
          letter-spacing: -0.012em;
          line-height: 1.24;
          color: rgba(226, 240, 216, 0.48);
          transition: color 200ms ease;
          text-wrap: balance;
        }

        .th-tab:hover .th-tab-name {
          color: rgba(226, 240, 216, 0.88);
        }

        .th-tab.is-active .th-tab-num {
          color: #70F35D;
          font-weight: 700;
        }
        .th-tab.is-active .th-tab-name {
          color: #FFFFFF;
          font-weight: 700;
        }

        .th-tab-bar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          border-radius: 2px;
          background: rgba(190, 224, 168, 0.12);
          overflow: hidden;
        }

        /* Timed progress dwell bar over 6s */
        .th-tab-bar i {
          display: block;
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, #5C8C3A, #70F35D);
          box-shadow: 0 0 10px rgba(112, 243, 93, 0.7);
          transform-origin: left center;
          animation: th-dwell 6s linear forwards;
        }

        .th-tab-bar i.is-completed {
          display: block;
          height: 100%;
          width: 100%;
          background: rgba(112, 243, 93, 0.35);
          box-shadow: none;
          animation: none;
          transform: scaleX(1);
        }

        .th-plate:hover .th-plate-hint {
          color: rgba(240, 250, 230, 0.85);
        }

        @keyframes th-dwell {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .th-tab:focus-visible {
          outline: 2px solid #70F35D;
          outline-offset: 4px;
          border-radius: 4px;
        }

        @media (max-width: 960px) {
          .th-stage {
            grid-template-columns: minmax(0, 1fr);
            gap: 2rem;
            justify-items: center;
          }
          .th-plate {
            max-width: 460px;
            height: clamp(270px, 48vw, 310px);
          }
          .th-brief {
            max-width: 480px;
          }
          .th-rail {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            row-gap: 1rem;
          }
        }

        @media (max-width: 600px) {
          .th-rail {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-card-in-next,
          .animate-card-in-prev,
          .th-plate-icon,
          .th-plate-index,
          .th-mask-inner,
          .th-brief-line,
          .th-brief-summary,
          .th-prompt-item {
            animation: none !important;
            transform: none !important;
            filter: none !important;
          }
          .th-tab-bar i {
            animation: none;
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
};
