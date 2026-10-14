import { useEffect } from "react";
import { BackgroundLayer } from "@/features/pitch/components/BackgroundLayer";
import { Navbar } from "@/features/pitch/sections/Navbar";
import { Main } from "@/features/pitch/sections/Main";
import { Footer } from "@/features/pitch/sections/Footer";
import { IntroOverlay } from "@/features/pitch/components/IntroOverlay";
import { initSmoothScroll, destroySmoothScroll } from "@/features/pitch/utils/smoothScroll";
import "@/features/pitch/styles/chair-theme.css";

export const PitchDeckPage = () => {
  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  return (
    <div className="accent-auto box-border caret-transparent text-zinc-900 block text-[15px] not-italic normal-nums font-normal tracking-[-0.075px] leading-[23.23px] list-outside list-disc min-h-screen overflow-x-clip pointer-events-auto relative text-start no-underline indent-[0px] normal-case visible border-separate font-dm_sans before:accent-auto before:bg-stone-100 before:bg-[url('/images/assets/cloud.jpg')] before:bg-top before:bg-no-repeat before:bg-cover before:box-border before:caret-transparent before:text-zinc-900 before:block before:text-[15px] before:not-italic before:normal-nums before:font-normal before:tracking-[-0.075px] before:leading-[23.25px] before:list-outside before:list-disc before:pointer-events-none before:fixed before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:z-[-1] before:border-separate before:inset-0 before:font-dm_sans">
      <IntroOverlay />
      <BackgroundLayer
        variant="default"
        layerClassName="hidden"
        imageSrc=""
        imageAlt=""
        iframeSrc=""
        iframeTitle=""
      />
      <BackgroundLayer
        variant="default"
        layerClassName="bg-stone-100 bg-[url('/images/assets/cloud.jpg')] bg-top bg-no-repeat bg-cover content-[''] pointer-events-none fixed z-[-1] inset-0"
        imageSrc=""
        imageAlt=""
        iframeSrc=""
        iframeTitle=""
      />
      <Navbar />
      <BackgroundLayer
        variant="image"
        layerClassName=""
        imageSrc="/images/assets/icon-1.svg"
        imageAlt="Icon"
        iframeSrc=""
        iframeTitle=""
      />
      <Main />
      <Footer />
      <BackgroundLayer
        variant=""
        layerClassName=""
        imageSrc=""
        imageAlt=""
        iframeSrc=""
        iframeTitle=""
      />
      <BackgroundLayer
        variant="default"
        layerClassName="block absolute"
        imageSrc=""
        imageAlt=""
        iframeSrc=""
        iframeTitle=""
      />
    </div>
  );
};

export default PitchDeckPage;
