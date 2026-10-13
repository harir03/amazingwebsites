import { useState, useEffect } from "react";

const navItems = [
  { href: "#about", label: "The Thesis" },
  { href: "#countdown", label: "5-Min Scoring" },
  { href: "#themes", label: "Scoring Pillars" },
  { href: "#judges", label: "Future Scope" },
  { href: "#sponsors", label: "Partners" },
  { href: "#venue", label: "Field Hubs" },
  { href: "#faq", label: "FAQ" },
];

export const DesktopNavLinks = () => {
  const [activeHref, setActiveHref] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      let current = "";
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = item.href;
          }
        }
      }
      setActiveHref(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="items-center box-border caret-transparent gap-x-[3px] hidden min-h-0 min-w-0 outline-[3px] gap-y-[1.6px] no-underline px-[4.8px] md:flex md:min-h-[auto] md:min-w-[auto]">
      {navItems.map((item) => {
        const isActive = activeHref === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            className={`box-border caret-transparent inline text-[13.6px] isolate leading-[21.08px] min-h-0 min-w-0 outline-[3px] relative no-underline text-nowrap overflow-hidden px-[13px] py-1.5 rounded-full md:block md:min-h-[auto] md:min-w-[auto] transition-all duration-200 ${
              isActive
                ? "bg-[#8fc45a]/30 text-[#121a12] font-bold shadow-xs scale-[1.02]"
                : "text-neutral-700 hover:text-neutral-950 font-medium hover:bg-black/5"
            }`}
          >
            <span className="items-center box-border caret-transparent inline-flex outline-[3px] relative no-underline text-nowrap">
              <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] no-underline text-nowrap capitalize">
                {item.label}
              </span>
            </span>
          </a>
        );
      })}

      <a
        href="#countdown"
        className="bg-[#2F5527] hover:bg-[#203c1b] text-white box-border caret-transparent inline text-[13px] font-semibold isolate leading-[21px] min-h-0 min-w-0 outline-[3px] relative no-underline text-nowrap overflow-hidden px-[14px] py-1.5 rounded-full md:block md:min-h-[auto] md:min-w-[auto] shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 ml-1.5"
      >
        <span className="items-center box-border caret-transparent inline-flex outline-[3px] relative no-underline text-nowrap">
          <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] no-underline text-nowrap">
            Live Simulation
          </span>
        </span>
      </a>
    </div>
  );
};