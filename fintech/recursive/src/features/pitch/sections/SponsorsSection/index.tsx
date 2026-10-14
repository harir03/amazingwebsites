import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./sxp.css";

gsap.registerPlugin(ScrollTrigger);

export const SponsorsSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const intro = introRef.current;
    const outro = outroRef.current;
    const body = bodyRef.current;

    if (!track || !stage || !intro || !outro || !body) return;

    const frame = stage.querySelector<HTMLElement>(".sxp-frame");
    const keyline = stage.querySelector<HTMLElement>(".sxp-keyline");
    const night = stage.querySelector<HTMLElement>(".sxp-night");
    const plate = stage.querySelector<HTMLElement>(".sxp-plate");
    const preview = stage.querySelector<HTMLElement>(".sxp-frame-preview");

    const setP = (v: number) => stage.style.setProperty("--sxp-p", v.toFixed(4));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      gsap.set([intro, outro], { opacity: 0 });
      if (preview) gsap.set(preview, { opacity: 0 });
      gsap.set(body, { opacity: 1, y: 0 });
      return;
    }

    setP(0);

    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 860;

    const ctx = gsap.context(() => {
      const clamp = (e: number) => (e < 0 ? 0 : e > 1 ? 1 : e);
      const sineOut = gsap.parseEase("sine.out");
      const p1Out = gsap.parseEase("power1.out");

      let O = 0,
        A = 0,
        W = 0,
        H = 0;

      const measure = () => {
        const dummy = document.createElement("div");
        dummy.style.cssText =
          "position:absolute;left:0;top:0;visibility:hidden;pointer-events:none;width:var(--sxp-win-w);height:var(--sxp-win-h);";
        stage.appendChild(dummy);
        const b1 = dummy.getBoundingClientRect();
        O = b1.width;
        A = b1.height;
        dummy.remove();
        const b2 = stage.getBoundingClientRect();
        W = b2.width;
        H = b2.height;
      };

      measure();

      const updateFrame = (prog: number) => {
        setP(prog);
        // Expansion curve calibrated to smoothly open from prog 0.10 to 0.65
        const p = sineOut(clamp((prog - 0.10) / 0.55));
        const r = 1 - p;
        const iy = Math.max(0, (H - A) / 2) * r;
        const ix = Math.max(0, (W - O) / 2) * r;
        const cr = 28 * r;
        const iyStr = iy < 0.2 ? "0px" : iy.toFixed(1) + "px";
        const ixStr = ix < 0.2 ? "0px" : ix.toFixed(1) + "px";
        const crStr = cr < 0.2 ? "0px" : cr.toFixed(1) + "px";

        if (frame) {
          frame.style.clipPath = `inset(${iyStr} ${ixStr} ${iyStr} ${ixStr} round ${crStr})`;
        }
        if (keyline) {
          keyline.style.inset = `${iyStr} ${ixStr}`;
          keyline.style.borderRadius = crStr;
          keyline.style.opacity = Math.max(0, (r - 0.06) / 0.94).toFixed(3);
        }

        // Night background fades as the window expands to fill viewport
        const nightOpacity = Math.max(0, Math.min(1, (1 - p) * 1.8)).toFixed(3);
        if (night) night.style.opacity = nightOpacity;
        if (plate) plate.style.opacity = nightOpacity;

        // Preview title "OUR SPONSORS" smoothly dissolves as expansion progresses
        if (preview) {
          const previewP = p1Out(clamp((prog - 0.10) / 0.22));
          gsap.set(preview, {
            opacity: 1 - previewP,
            scale: 1 + 0.08 * previewP,
          });
        }

        // Intro labels fade out as expansion starts
        const introP = p1Out(clamp((prog - 0.06) / 0.22));
        gsap.set(intro, { opacity: 1 - introP, y: -24 * introP });
        gsap.set(outro, { opacity: 1 - introP, y: 24 * introP });

        // Body content fades in cleanly and stays visible through dwell time (0.65 to 1.0)
        const bodyP = p1Out(clamp((prog - 0.28) / 0.36));
        gsap.set(body, { opacity: bodyP, y: 24 * (1 - bodyP) });
        body.style.pointerEvents = bodyP > 0.4 ? "auto" : "none";
      };

      updateFrame(0);

      const animObj = { prog: 0 };
      const tween = gsap.to(animObj, {
        prog: 1,
        ease: "none",
        paused: true,
        onUpdate: () => updateFrame(animObj.prog),
      });

      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        pinSpacing: false,
        animation: tween,
        scrub: isTouch ? 0.12 : 0.2,
        fastScrollEnd: false,
        preventOverlaps: true,
        invalidateOnRefresh: true,
        onRefresh: () => {
          measure();
          updateFrame(animObj.prog);
        },
      });
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sponsors" className="sxp" aria-label="Ecosystem and Capital Partners">
      <div ref={trackRef} className="sxp-track">
        <div ref={stageRef} className="sxp-stage">
          <div className="sxp-night" aria-hidden="true" />

          {/* Intro Labels */}
          <div ref={introRef} className="sxp-label sxp-intro">
            <span className="sxp-intro-eyebrow">Capital & Ecosystem Architecture</span>
            <p className="sxp-intro-line">Sovereign infrastructure for Bharat's credit rails.</p>
          </div>

          <div ref={outroRef} className="sxp-label sxp-outro">
            <p className="sxp-intro-sub">
              Secured on AWS Mumbai, powered by NPCI and Account Aggregators, backed by leading NBFCs.
            </p>
            <span className="sxp-intro-hint">Keep scrolling</span>
          </div>

          {/* Staged Frame */}
          <div className="sxp-frame">
            <div className="sxp-plate" aria-hidden="true" />
            
            <div className="sxp-frame-preview" aria-hidden="true">
              <h2 className="sxp-preview-title">ECOSYSTEM & CAPITAL</h2>
            </div>

            <div ref={bodyRef} className="sxp-body">
              <div className="sxp-stage-layout">
                {/* Left Wing Artifacts */}
                <div className="sxp-artifacts-wing sxp-wing-left" aria-hidden="true">
                  {/* Polaroid 1 */}
                  <div className="sxp-polaroid-frame sxp-polaroid-aws" title="Lorem Ipsum Dolor">
                    <div className="sxp-polaroid-tape" />
                    <img
                      src="/images/ecosystem/aws_datacenter.jpg"
                      alt="Lorem Ipsum"
                      className="sxp-polaroid-photo"
                      width={400}
                      height={300}
                      loading="lazy"
                    />
                    <div className="sxp-polaroid-meta">
                      <span className="sxp-polaroid-title">Lorem Ipsum</span>
                      <span className="sxp-polaroid-subtitle">Dolor Sit Amet · Consectetur</span>
                    </div>
                  </div>

                  {/* Polaroid 2 */}
                  <div className="sxp-polaroid-frame sxp-polaroid-kirana" title="Sed Do Eiusmod">
                    <div className="sxp-polaroid-tape" />
                    <img
                      src="/images/ecosystem/bharat_kirana.jpg"
                      alt="Lorem Ipsum"
                      className="sxp-polaroid-photo"
                      width={400}
                      height={300}
                      loading="lazy"
                    />
                    <div className="sxp-polaroid-meta">
                      <span className="sxp-polaroid-title">Sed Do Eiusmod</span>
                      <span className="sxp-polaroid-subtitle">Tempor Incididunt · Labore</span>
                    </div>
                  </div>
                </div>

                {/* Inner Content */}
                <div className="sxp-inner">
                  <div className="sxp-ornament-wrap">
                    <img
                      src="/images/assets/artifact.png"
                      alt=""
                      aria-hidden="true"
                      draggable="false"
                      className="orn orn-light sxp-crown block w-[clamp(114px,56.87px+15.87vw,260px)] h-auto max-w-full object-contain select-none pointer-events-none opacity-[0.88]"
                    />
                  </div>

                  <span className="sxp-eyebrow">Capital & Infrastructure Partners</span>
                  <h2 className="sxp-heading">Ecosystem Partners</h2>

                  {/* Top Tier Row */}
                  <div className="sxp-top-tier-row">
                    {/* AWS Cloud */}
                    <div className="sxp-top-card-col">
                      <span className="sxp-tier-badge">CLOUD & INFERENCE EDGE</span>
                      <div className="sxp-primary-card-wrap">
                        <img
                          src="/images/assets/rays.png"
                          alt=""
                          className="sxp-rays sxp-rays-left"
                          aria-hidden="true"
                          width={48}
                          height={48}
                        />
                        <div
                          className="sxp-partner-card sxp-float-card sxp-primary-card cursor-pointer"
                          title="Amazon Web Services"
                        >
                          <div className="sxp-primary-content flex items-center gap-3">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#FF9900] flex-shrink-0" fill="currentColor">
                              <path d="M18.74 18.06c-1.39.9-3.23 1.39-5.18 1.39-3.23 0-5.83-1.3-7.55-3.32-.24-.28-.02-.6.28-.42 2.37 1.42 5.07 2.19 7.82 2.19 1.77 0 3.7-.42 5.43-1.3.39-.2.72.24.42.46zM20.25 15.65c-.17-.22-.84-.1-1.64.07-.81.16-1.57.4-1.74.19-.17-.22.42-.87.89-1.4.47-.53.94-.99 1.37-.88.43.11.83.74.88 1.15.06.4-.33.87-.76.87zM8.5 7.27c0-1.84.97-2.73 2.65-2.73 1.63 0 2.58.91 2.58 2.73v4.61c0 .48.16.66.5.66.3 0 .49-.15.82-.44l.43.43c-.43.51-.9.84-1.57.84-.79 0-1.28-.48-1.28-1.37v-.5c-.65.75-1.5 1.14-2.45 1.14-1.46 0-2.32-.98-2.32-2.58 0-1.84 1.14-2.82 3.39-2.9l1.3-.05v-.86c0-1.12-.55-1.63-1.63-1.63-.98 0-1.52.42-1.72 1.37l-1.07-.17z" />
                            </svg>
                            <div className="flex flex-col text-left whitespace-nowrap">
                              <span className="text-[#122214] font-bold text-sm tracking-wide whitespace-nowrap">AWS Cloud</span>
                              <span className="text-[#3b6033] text-[10px] font-geist_mono font-medium whitespace-nowrap">Mumbai Region</span>
                            </div>
                            <div className="sxp-primary-divider" aria-hidden="true" />
                            <div className="sxp-primary-tagline">
                              <span>SOVEREIGN</span>
                              <span>FINANCIAL</span>
                              <span>EDGE</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* NPCI & UPI */}
                    <div className="sxp-top-card-col">
                      <span className="sxp-tier-badge">PAYMENT LEDGERS</span>
                      <div className="sxp-osen-card-wrap">
                        <div
                          className="sxp-partner-card sxp-float-card-alt sxp-osen-card flex items-center justify-center gap-2"
                          title="NPCI Unified Payments Interface"
                          role="img"
                          aria-label="NPCI and UPI"
                        >
                          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1E6B2F]" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                          </svg>
                          <span className="font-bold text-[#122214] text-xs tracking-wider font-geist_mono">
                            NPCI · UPI
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* IndiaStack */}
                    <div className="sxp-top-card-col">
                      <span className="sxp-tier-badge">PUBLIC IDENTITY</span>
                      <div className="sxp-xyz-card-wrap">
                        <div
                          className="sxp-partner-card sxp-float-card sxp-xyz-card flex items-center justify-center gap-2"
                          title="DigiLocker and IndiaStack"
                          aria-label="DigiLocker and IndiaStack"
                        >
                          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1A6E40]" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                          <span className="font-bold text-[#122214] text-xs font-geist_mono">
                            IndiaStack
                          </span>
                        </div>
                        <img
                          src="/images/assets/rays.png"
                          alt=""
                          className="sxp-rays sxp-rays-right"
                          aria-hidden="true"
                          width={48}
                          height={48}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Open Financial Protocols Tier */}
                  <div className="sxp-partner-tier sxp-community-tier">
                    <span className="sxp-tier-badge">OPEN FINANCIAL PROTOCOLS</span>
                    <div className="sxp-community-grid">
                      <div className="sxp-community-col">
                        <div
                          className="sxp-partner-card sxp-float-card sxp-react-kolkata-card flex items-center justify-center gap-2 px-3"
                          title="Account Aggregator Ecosystem"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#1A824A] animate-pulse" />
                          <span className="text-xs font-bold text-[#122214] font-geist_mono">Account Aggregator (AA)</span>
                        </div>
                        <div
                          className="sxp-partner-card sxp-float-card-alt sxp-innofusion-card flex items-center justify-center gap-2 px-3"
                          title="Open Credit Enablement Network"
                        >
                          <span className="text-xs font-bold text-[#122214] font-geist_mono">OCEN Protocol 4.0</span>
                        </div>
                      </div>

                      <div className="sxp-community-col sxp-community-center">
                        <div
                          className="sxp-partner-card sxp-float-card sxp-stuamb-card flex items-center justify-center gap-2.5 px-3"
                          title="Reserve Bank Innovation Hub"
                        >
                          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1B4E28] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3l9 7H3l9-7z" />
                          </svg>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-[#122214] font-geist_mono">RBIH Sandbox</span>
                            <span className="text-[9px] text-[#3B6033] uppercase font-geist_mono font-semibold">Governance</span>
                          </div>
                        </div>
                        <div
                          className="sxp-partner-card sxp-float-card-alt sxp-gdg-card flex items-center justify-center gap-2 px-3"
                          title="Open Network for Digital Commerce"
                        >
                          <span className="text-xs font-bold text-[#122214] font-geist_mono">ONDC Financial Services</span>
                        </div>
                      </div>

                      <div className="sxp-community-col">
                        <div
                          className="sxp-partner-card sxp-float-card sxp-mandis-card flex items-center justify-center gap-2 px-3"
                          title="Agricultural APMC Mandis"
                        >
                          <span className="text-xs font-bold text-[#8A5B00] font-geist_mono">18 District Mandis</span>
                        </div>
                        <div
                          className="sxp-partner-card sxp-float-card-alt sxp-nbfc-card flex items-center justify-center gap-2 px-3"
                          title="4 Tier-1 NBFC Lending Partners"
                        >
                          <span className="text-xs font-bold text-[#1E6B2F] font-geist_mono">4 Partner NBFCs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Regulatory & Governance Tier */}
                  <div className="sxp-partner-tier sxp-media-tier">
                    <span className="sxp-tier-badge">REGULATORY & PRIVACY OVERSIGHT</span>
                    <div className="sxp-media-grid">
                      <div
                        className="sxp-partner-card sxp-float-card sxp-lnc-card flex items-center justify-center gap-2 px-4"
                        title="Digital Personal Data Protection Compliance"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#136B5E]" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-bold text-[#122214] font-geist_mono">DPDP Act 2023 Guardrails</span>
                      </div>
                      <div
                        className="sxp-partner-card sxp-float-card-alt sxp-eventopia-card flex items-center justify-center gap-2 px-4"
                        title="Anti-Predatory Fair Lending Protocol"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#176E3B]" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-bold text-[#122214] font-geist_mono">Fair Lending Standard</span>
                      </div>
                    </div>
                  </div>

                  <span className="sxp-unrevealed-note">
                    All protocol integrations adhere strictly to DPDP Act 2023 and RBI Digital Lending directives.
                  </span>

                  {/* Partner CTA Button */}
                  <div className="sxp-cta-wrap mt-8">
                    <a
                      href="#about"
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#111A11] text-[#F4F8F0] font-bold text-sm shadow-lg hover:bg-[#1A261A] hover:scale-105 active:scale-95 transition-all duration-200 border border-lime-900/30"
                    >
                      <span>Inquire for NBFC Co-Lending Integration</span>
                      <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Right Wing Artifacts */}
                <div className="sxp-artifacts-wing sxp-wing-right" aria-hidden="true">
                  {/* Polaroid 3 */}
                  <div className="sxp-polaroid-frame sxp-polaroid-bangalore" title="Consectetur Adipiscing">
                    <div className="sxp-polaroid-tape" />
                    <img
                      src="/images/ecosystem/bangalore_tech_hub.jpg"
                      alt="Lorem Ipsum"
                      className="sxp-polaroid-photo"
                      width={400}
                      height={300}
                      loading="lazy"
                    />
                    <div className="sxp-polaroid-meta">
                      <span className="sxp-polaroid-title">Consectetur Adipiscing</span>
                      <span className="sxp-polaroid-subtitle">Elit Sed Do Eiusmod</span>
                    </div>
                  </div>

                  {/* Tech Corridor Badge */}
                  <div className="sxp-badge-bangalore" title="Fintech Corridor">
                    <div className="flex items-center gap-2 mb-1.5">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-700 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      <span className="text-[11px] font-bold text-stone-900 font-geist_mono tracking-wider">
                        BENGALURU HUB
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-700 leading-snug font-dm_sans font-medium m-0">
                      Underwriting neural models engineered in Bangalore, deployed across 28 Indian states.
                    </p>
                    <div className="mt-2 pt-1.5 border-t border-dashed border-stone-300 flex items-center justify-between text-[9px] font-geist_mono text-emerald-800 font-semibold">
                      <span>12.9716° N, 77.5946° E</span>
                      <span className="inline-flex items-center gap-1 text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <span className="sxp-keyline" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
