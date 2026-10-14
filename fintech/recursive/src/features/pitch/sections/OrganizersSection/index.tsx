import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/features/pitch/components/SectionHeader";
import { ArrowUpRight, ShieldCheck, Landmark, Cpu, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const OrganizersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".org-anim-card", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 74%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="organizers"
      ref={sectionRef}
      aria-label="Protocol Architects and Research Consortium"
      className="box-border caret-transparent relative w-full pt-16 pb-20 px-5 text-neutral-900 scroll-mt-20 md:pt-24 md:pb-28 md:px-16"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center">
        <SectionHeader variant="artifactOnly" title="" />

        <div className="mb-3">
          <span className="text-xs uppercase font-semibold font-geist_mono tracking-widest text-lime-700">
            PROTOCOL ARCHITECTS &amp; RESEARCH CONSORTIUM
          </span>
        </div>

        <h2 className="text-3xl md:text-6xl font-medium font-headingNow text-neutral-900 tracking-tight">
          The Minds Behind Lorem Ipsum
        </h2>

        {/* Host chapter card */}
        <div className="org-anim-card w-full max-w-xl mt-10 p-6 md:p-8 rounded-2xl bg-white/80 border border-stone-200/90 shadow-sm flex flex-col items-center">
          <span className="text-xs font-semibold font-geist_mono tracking-wider text-stone-500 uppercase mb-3">
            RESEARCH &amp; PROTOCOL DEVELOPMENT
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-headingNow text-neutral-900 mb-3">
            Lorem Ipsum Research Labs
          </h3>
          <p className="text-sm font-dm_sans text-stone-600 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <a
            href="#about"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold font-geist_mono text-lime-800 hover:text-lime-950 uppercase tracking-wider"
          >
            <span>Review Protocol Architecture</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Story Text */}
        <div className="org-anim-card max-w-2xl mt-10 space-y-4 font-dm_sans text-stone-700 text-base md:text-lg leading-relaxed">
          <p>
            Developed in close collaboration with econometricians, rural cooperative banks, and agricultural mandi federations across Eastern and Western India.
          </p>
          <p className="text-sm md:text-base text-stone-600">
            Our mission is simple and unwavering: bridge the 400-million credit gap across Bharat with mathematical precision, verifiable dignity, and absolute zero compromise on borrower privacy.
          </p>
        </div>

        {/* Institutional Accreditation Marks */}
        <div className="org-anim-card w-full mt-12 pt-8 border-t border-stone-200/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-4 bg-white/60 border border-stone-200/80 rounded-xl shadow-xs">
              <ShieldCheck className="h-8 w-8 text-emerald-700 mb-2" />
              <span className="text-xs font-bold text-stone-900">DPDP Act 2023</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">Audited Data Residency</span>
            </div>

            <div className="flex flex-col items-center p-4 bg-white/60 border border-stone-200/80 rounded-xl shadow-xs">
              <Landmark className="h-8 w-8 text-lime-800 mb-2" />
              <span className="text-xs font-bold text-stone-900">RBI Digital Lending</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">Regulatory Guardrails</span>
            </div>

            <div className="flex flex-col items-center p-4 bg-white/60 border border-stone-200/80 rounded-xl shadow-xs">
              <Cpu className="h-8 w-8 text-amber-700 mb-2" />
              <span className="text-xs font-bold text-stone-900">OCEN 4.0</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">Open Credit Protocol</span>
            </div>

            <div className="flex flex-col items-center p-4 bg-white/60 border border-stone-200/80 rounded-xl shadow-xs">
              <Database className="h-8 w-8 text-blue-700 mb-2" />
              <span className="text-xs font-bold text-stone-900">Account Aggregator</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">Consent-Driven Rails</span>
            </div>
          </div>
        </div>

        {/* Fact strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-mono text-stone-600 bg-stone-200/60 px-6 py-2.5 rounded-full border border-stone-300/80">
          <span>Zero Bureau History Required</span>
          <span>·</span>
          <span>14 Indian Languages</span>
          <span>·</span>
          <span>Sub-300ms Scoring Latency</span>
          <span>·</span>
          <span>Zero Data Leakage</span>
        </div>
      </div>
    </section>
  );
};
