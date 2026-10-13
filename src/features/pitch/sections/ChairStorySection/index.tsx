import { RevealWords } from "@/features/pitch/components/RevealWords";

export const ChairStorySection = () => {
  const storyParagraph =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <section
      id="about"
      aria-label="Lorem Ipsum Section"
      className="ab relative w-full bg-transparent text-[#111a12] pt-[clamp(6rem,13vh,10rem)] pb-[clamp(3.5rem,8vh,6.5rem)] overflow-hidden z-[1]"
    >
      <div className="ab-inner relative max-w-[96rem] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        {/* Top Ornament */}
        <div className="ab-ornament-wrap flex justify-center mb-[clamp(1.2rem,2.2vh,1.8rem)]">
          <img
            src="/images/assets/artifact.png"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="orn orn-light ab-crown block w-[clamp(114px,56.87px+15.87vw,260px)] h-auto max-w-full object-contain select-none pointer-events-none opacity-[0.88]"
          />
        </div>

        {/* Heading */}
        <div className="ab-head-wrap w-full text-center">
          <h2 className="rh ab-heading font-headingNow font-medium text-[clamp(2.6rem,5.8vw,4.6rem)] leading-[1.1] tracking-[-0.035em] text-[#111a12] text-center">
            <span className="rh-line flex justify-center">
              <span className="rh-inner">Lorem Ipsum Dolor Sit Amet</span>
            </span>
          </h2>
        </div>

        {/* Story Text with Word-by-Word Scroll Glow Reveal */}
        <div className="ab-story-wrap mt-[clamp(2.75rem,6vh,4.5rem)] w-full max-w-[88rem]">
          <RevealWords
            paragraphs={[storyParagraph]}
            className="ab-story flex flex-col items-center text-center font-dm_sans text-[clamp(1.0rem,11.93px+1.13vw,1.65rem)] font-normal leading-[1.68] tracking-[-0.012em] text-[#18261A]"
          />
        </div>
      </div>

      <style>{`
        .ab-story .rw-word {
          text-shadow: 0 0 14px rgba(92, 140, 58, 0.45);
        }
        .ab-story .rw-para {
          text-wrap: pretty;
        }
      `}</style>
    </section>
  );
};