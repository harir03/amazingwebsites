import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/features/pitch/components/SectionHeader";
import { FaqList } from "@/features/pitch/sections/FaqSection/components/FaqList";

gsap.registerPlugin(ScrollTrigger);

export const FaqSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[role='region'] > div", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="box-border caret-transparent text-neutral-900 flex justify-center mt-[-72px] outline-[3px] relative no-underline w-full z-10 pt-[19.2px] pb-[51.2px] px-[19.2px] scroll-mt-28 md:mt-0 md:px-[51.2px] md:py-[102.4px]"
    >
      <div className="box-border caret-transparent flex flex-col max-w-6xl min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full mx-auto">
        <SectionHeader variant="faq" title="FAQ" />
        <FaqList />
      </div>
    </section>
  );
};