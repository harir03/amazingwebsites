import { HeroSection } from "@/features/pitch/sections/HeroSection";
import { ChairStorySection } from "@/features/pitch/sections/ChairStorySection";
import { CountdownSection } from "@/features/pitch/sections/CountdownSection";
import { TracksSection } from "@/features/pitch/sections/TracksSection";
import { MentorsJudgesSection } from "@/features/pitch/sections/MentorsJudgesSection";
import { SponsorsSection } from "@/features/pitch/sections/SponsorsSection";
import { VenueSection } from "@/features/pitch/sections/VenueSection";
import { FaqSection } from "@/features/pitch/sections/FaqSection";
import { OrganizersSection } from "@/features/pitch/sections/OrganizersSection";

export const Main = () => {
  return (
    <main className="box-border caret-transparent outline-[3px] no-underline">
      <HeroSection />
      <ChairStorySection />
      <CountdownSection />

      <div className="bg-black box-border caret-transparent text-lime-50 isolate outline-[3px] relative no-underline -mt-0.5 before:accent-auto before:bg-[radial-gradient(120%_46%_at_50%_0px,rgba(52,88,38,0.36)_0%,rgba(52,88,38,0)_62%),radial-gradient(80%_40%_at_84%_62%,rgba(28,62,44,0.2)_0%,rgba(28,62,44,0)_70%)] before:bg-[position:0%_0%,0%_0%] before:bg-size-[auto,auto] before:box-border before:caret-transparent before:text-lime-50 before:block before:text-[15px] before:not-italic before:normal-nums before:font-normal before:tracking-[-0.075px] before:leading-[23.25px] before:list-outside before:list-disc before:[mask-image:linear-gradient(rgba(0,0,0,0)_0px,rgb(0,0,0)_180px)] before:outline-[3px] before:pointer-events-none before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:z-[-1] before:border-separate before:inset-0 before:font-dm_sans before:md:[mask-image:linear-gradient(rgba(0,0,0,0)_0px,rgb(0,0,0)_307.2px)]">
        <TracksSection />
        <MentorsJudgesSection />
      </div>

      <SponsorsSection />
      <VenueSection />
      <FaqSection />
      <OrganizersSection />
    </main>
  );
};