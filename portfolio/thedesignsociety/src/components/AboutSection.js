/**
 * The Design Society Lyon — Official About / Manifesto Section
 * Exact 1:1 markup & ScrollTrigger pinned kinetic word-by-word scroll
 */
export function renderAboutSection() {
  return `<section class="mwg005"><div class="w-embed"></div><div class="mwg005-pin-height"><div class="mwg005-container"><p class="mwg005-paragraph">Née de l&#x27;envie de 5 designers, The Design Society organise des évènements pour rassembler les designers de Lyon. Entre les talks pour partager le savoir et les apéros pour l&#x27;oublier, on poursuit un but qu&#x27;on garde presque secret : créer les occasions qui manquaient de se voir, et fédérer la profession</p><div class="footer-about"><div class="footer-text"><div class="r">société secrète</div><div class="r-2">Basée à Lyon</div></div><div class="image-about-container"><div class="text-about"><div class="about-text">Since 2025</div><div class="about-text-2">The design society©</div></div><div data-sticker="item" class="slot-image-blue is-green"><img src="/assets/699366ae6dd9cc79926d2f70_09.png" loading="lazy" width="162" height="162" alt="" class="img-about"/></div><div data-sticker="item" class="slot-image-blue is-green"><img src="/assets/699366ae4acad95b19c6c42f_01.webp" loading="lazy" width="162" height="162" alt="Public en audience écoutant un présentateur lors d&#x27;un événement" srcset="/assets/699366ae4acad95b19c6c42f_01-p-500.webp 500w, /assets/699366ae4acad95b19c6c42f_01-p-800.webp 800w, /assets/699366ae4acad95b19c6c42f_01.webp 1080w" sizes="(max-width: 479px) 100vw, 162px" class="img-about"/></div></div></div></div></div></section>`;
}

export function initAboutAnimations() {
  const aboutEl = document.querySelector(".mwg005");
  if (!aboutEl || aboutEl.__aboutInit) return;
  aboutEl.__aboutInit = true;

  const initScroll = () => {
    const pinHeight = aboutEl.querySelector(".mwg005-pin-height");
    const container = aboutEl.querySelector(".mwg005-container");
    const paragraph = aboutEl.querySelector(".mwg005-paragraph");
    if (!pinHeight || !container || !paragraph) return;

    const rawText = paragraph.textContent;
    paragraph.innerHTML = rawText.split(" ").map((w) => `<span class="word">${w}</span>`).join(" ");
    const words = paragraph.querySelectorAll(".word");

    if (window.gsap && window.ScrollTrigger) {
      window.gsap.to(words, {
        x: 0,
        stagger: 0.02,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: pinHeight,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: container,
          pinSpacing: false,
          invalidateOnRefresh: true
        }
      });
    }
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initScroll);
  } else {
    initScroll();
  }
}
