import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/features/pitch/components/SectionHeader";
import { MapPin, Navigation, Copy, Check, Server, ShieldCheck, Cpu, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const VenueSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const addressText =
    "Lorem Ipsum Hub: 157/F, Nilgunj Road, Panihati, Sodepur, Kolkata, West Bengal 700114";

  const handleCopy = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".venue-anim-item", {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="venue"
      ref={sectionRef}
      aria-label="Deployment Infrastructure and Mandi Hubs"
      className="box-border caret-transparent relative w-full pt-16 pb-24 px-5 text-neutral-900 scroll-mt-20 md:pt-24 md:pb-32 md:px-16"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        <SectionHeader
          variant="venue"
          eyebrow="SOVEREIGN INFRASTRUCTURE & FIELD HUBS"
          titleLineOne="Sovereign Cloud &"
          titleLineTwo="Grassroots Mandi Hubs"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />

        <div className="w-full mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Cloud & Pilot Hub Card */}
            <div className="venue-anim-item p-6 md:p-8 rounded-2xl bg-white/92 border border-[#2F5527]/18 shadow-sm backdrop-blur-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-lime-100 text-lime-900 rounded-xl">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-headingNow text-neutral-900">
                    Primary Sovereign Edge
                  </h3>
                  <p className="text-[#18261A]/90 font-medium text-sm md:text-base leading-relaxed mt-2 font-dm_sans">
                    AWS Asia Pacific (Mumbai) ap-south-1
                    <br />
                    Active failover: AWS Hyderabad ap-south-2
                    <br />
                    Eastern Deployment: Sodepur, Kolkata Hub
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-stone-200/80 flex flex-wrap gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=22.695132695547784,88.37877130486947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900 text-stone-100 text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate to Eastern Hub</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-100 text-stone-900 text-xs font-semibold hover:bg-stone-200 transition-colors border border-stone-300/80"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-lime-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Hub Address"}</span>
                </button>
              </div>
            </div>

            {/* Field Infrastructure Architecture Card */}
            <div className="venue-anim-item p-6 md:p-8 rounded-2xl bg-white/92 border border-[#2F5527]/18 shadow-sm backdrop-blur-xs">
              <h3 className="text-xl font-semibold font-headingNow text-neutral-900 mb-5">
                Field Infrastructure &amp; Security
              </h3>

              <div className="space-y-4 font-dm_sans">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-lime-50 text-lime-800 rounded-lg shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-neutral-900 block">DPDP Act Data Residency</span>
                    <p className="text-xs md:text-sm text-[#18261A]/90 font-medium mt-0.5 leading-relaxed">
                      All financial telemetry is stored and processed strictly within Indian borders with HSM-backed encryption.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-lime-50 text-lime-800 rounded-lg shrink-0 mt-0.5">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-neutral-900 block">Sub-300ms Scoring Latency</span>
                    <p className="text-xs md:text-sm text-[#18261A]/90 font-medium mt-0.5 leading-relaxed">
                      Underwriting neural networks run on high-performance AWS Graviton clusters for rapid Kirana approvals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-lime-50 text-lime-800 rounded-lg shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-neutral-900 block">18 Agricultural APMC Hubs</span>
                    <p className="text-xs md:text-sm text-[#18261A]/90 font-medium mt-0.5 leading-relaxed">
                      On-site connectivity with mandi weighing scales, electronic e-NAM terminals, and wholesale trader associations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps */}
          <div className="venue-anim-item lg:col-span-7 h-full min-h-[420px] rounded-2xl overflow-hidden border border-stone-200/90 shadow-md bg-stone-100 flex flex-col relative">
            <div className="p-3 bg-white/90 border-b border-stone-200 flex items-center justify-between text-xs font-mono text-stone-700">
              <span className="font-semibold text-stone-900">Lorem Ipsum Pilot Hub · 22.6951° N, 88.3788° E</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=22.695132695547784,88.37877130486947"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-lime-800 hover:text-lime-950 font-semibold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex-1 w-full min-h-[380px]">
              <iframe
                title="Lorem Ipsum Pilot Hub Location Map"
                src="https://maps.google.com/maps?q=22.695132695547784,88.37877130486947&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full border-0 min-h-[380px]"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
