/**
 * The Design Society Lyon — Official Footer Section
 * Exact 1:1 markup, 3D perspective deformation, infinite CSS marquee & clipboard email snackbar
 */
export function renderFooterSection() {
  return `<footer data-footer-parallax-inner="" class="footer"><div class="div-block-7"><div class="element-wrapper"><div data-sticker="item" class="floating-menu is-green footer-1"><div class="frame-1948754593"><div class="frame-1948754624"><div class="frame-1948754625"><div class="frame-1948754626"><img width="3" height="3" alt="" src="/assets/6990f3e27f07e936d4cc1229_Ellipse-54.svg" loading="lazy" class="ellipse-59"/><img width="3" height="3" alt="" src="/assets/6990f3e27f07e936d4cc1229_Ellipse-54.svg" loading="lazy" class="ellipse-59"/></div></div><div class="frame-1948754625"><div class="frame-1948754626"><img width="3" height="3" alt="" src="/assets/6990f3e27f07e936d4cc1229_Ellipse-54.svg" loading="lazy" class="ellipse-59"/><img width="3" height="3" alt="" src="/assets/6990f3e27f07e936d4cc1229_Ellipse-54.svg" loading="lazy" class="ellipse-59"/></div></div></div></div><div class="header-style-10"><div data-effect="swipe-reveal" class="text-81">website</div><div class="text-81">[+]</div></div><div class="header-style-11"><a data-scramble-hover="link" href="/" aria-current="page" class="link-block w-inline-block w--current"><div data-scramble-hover="target" class="apero">[accueil]</div></a><a data-scramble-hover="link" href="/evenements" class="link-block w-inline-block"><div data-scramble-hover="target" class="apero">[évènements]</div></a><a data-scramble-hover="link" href="/a-propos" class="link-block w-inline-block"><div data-scramble-hover="target" class="apero">[à propos]</div></a><a data-scramble-hover="link" href="/contact" class="link-block w-inline-block"><div data-scramble-hover="target" class="apero">[contact]</div></a></div></div><div data-animation="" class="text-block-3 effet-deformation">The Design <br/>Society</div><div data-sticker="item" class="floating-menu is-blue footer-2"><div class="frame-1948754593"><div class="frame-1948754624"><div class="frame-1948754625"><div class="frame-1948754626"><img width="3" height="3" alt="" src="/assets/6990f3e27f07e936d4cc1229_Ellipse-54.svg" loading="lazy" class="ellipse-59"/><img width="3" height="3" alt="" src="/assets/6990f3e27f07e936d4cc1229_Ellipse-54.svg" loading="lazy" class="ellipse-59"/></div></div><div class="frame-1948754625"><div class="frame-1948754626"><img width="3" height="3" alt="" src="/assets/6990f3e27f07e936d4cc1229_Ellipse-54.svg" loading="lazy" class="ellipse-59"/><img width="3" height="3" alt="" src="/assets/6990f3e27f07e936d4cc1229_Ellipse-54.svg" loading="lazy" class="ellipse-59"/></div></div></div></div><div class="header-style-10"><div data-effect="swipe-reveal" class="text-81">Réseaux</div><div class="text-81">[+]</div></div><div class="header-style-11"><a data-barba-prevent="self" data-scramble-hover="link" href="https://www.instagram.com/thedesignsociety_lyon/" target="_blank" class="link-floating-menu w-inline-block"><div data-scramble-hover="target" class="apero">[instagram]</div></a><a data-barba-prevent="self" data-scramble-hover="link" href="https://www.linkedin.com/company/the-design-society-lyon/posts/?feedView=all" target="_blank" class="link-floating-menu w-inline-block"><div data-scramble-hover="target" class="apero">[linkedin]</div></a><a data-barba-prevent="self" data-scramble-hover="link" href="https://www.eventbrite.fr/o/the-design-society-110792418841" target="_blank" class="link-floating-menu w-inline-block"><div data-scramble-hover="target" class="apero">[eventbrite]</div></a></div></div></div></div><div class="footer-marquee"><div data-css-marquee="" class="marquee-css-2"><div data-css-marquee-list="" class="marquee-css__list"><div class="marquee-css__item-2"><p class="marquee-css__item-p-2">THE DESIGN SOCIETY EST UNE SOCIÉTÉ SECRÈTE QUI COMMUNIQUE SUR LINKEDIN, PERSONNE N&#x27;A ENCORE RELEVÉ L&#x27;INCOHÉRENCE</p><p class="marquee-css__item-p-2 etoile">✦</p></div><div class="marquee-css__item-2"><p class="marquee-css__item-p-2">THE DESIGN SOCIETY EST UNE SOCIÉTÉ SECRÈTE QUI COMMUNIQUE SUR LINKEDIN, PERSONNE N&#x27;A ENCORE RELEVÉ L&#x27;INCOHÉRENCE</p><p class="marquee-css__item-p-2 etoile">✦</p></div><div class="marquee-css__item-2"><p class="marquee-css__item-p-2">THE DESIGN SOCIETY EST UNE SOCIÉTÉ SECRÈTE QUI COMMUNIQUE SUR LINKEDIN, PERSONNE N&#x27;A ENCORE RELEVÉ L&#x27;INCOHÉRENCE</p><p class="marquee-css__item-p-2 etoile">✦</p></div><div class="marquee-css__item-2"><p class="marquee-css__item-p-2">THE DESIGN SOCIETY EST UNE SOCIÉTÉ SECRÈTE QUI COMMUNIQUE SUR LINKEDIN, PERSONNE N&#x27;A ENCORE RELEVÉ L&#x27;INCOHÉRENCE</p><p class="marquee-css__item-p-2 etoile">✦</p></div></div></div></div><div class="footer-cropped"><div class="letter"><div class="text-100">D</div></div><div class="letter"><div class="text-100 _2">S</div></div><div class="letter-3"><div class="text-100 _3">©</div></div></div></footer>`;
}

export function initFooterAnimations() {
  const footerEl = document.querySelector("footer");
  if (!footerEl) return;

  // 1. 3D Perspective mouse deformation on typography
  footerEl.querySelectorAll(".effet-deformation").forEach((el) => {
    if (el.__deformInit) return;
    el.__deformInit = true;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const normX = (relX - rect.width / 2) / (rect.width / 2);
      const normY = (relY - rect.height / 2) / (rect.height / 2);

      el.style.transition = "transform 0.1s ease-out";
      el.style.transform = `perspective(1000px) scale(1.05) rotateX(${-15 * normY}deg) rotateY(${15 * normX}deg) skew(${5 * normX}deg, ${5 * normY}deg)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
      el.style.transform = "perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg) skew(0deg, 0deg)";
    });
  });

  // 2. Infinite CSS Marquee ticker
  const speed = 75;
  const marquees = footerEl.querySelectorAll("[data-css-marquee]");
  marquees.forEach((m) => {
    if (m.__marqueeInit) return;
    m.__marqueeInit = true;
    m.querySelectorAll("[data-css-marquee-list]").forEach((list) => {
      m.appendChild(list.cloneNode(true));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.querySelectorAll("[data-css-marquee-list]").forEach((list) => {
          list.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
        });
      });
    }, { threshold: 0 });

    m.querySelectorAll("[data-css-marquee-list]").forEach((list) => {
      list.style.animationDuration = list.offsetWidth / speed + "s";
      list.style.animationPlayState = "paused";
    });
    observer.observe(m);
  });

  // 3. Email clipboard copy with snackbar notification
  let snackbarEl = null;
  let timerId = null;

  const getSnackbar = () => {
    if (!snackbarEl) {
      snackbarEl = document.createElement("div");
      snackbarEl.className = "copy-snackbar";
      document.body.appendChild(snackbarEl);
    }
    return snackbarEl;
  };

  const showToast = (msg) => {
    const toast = getSnackbar();
    toast.textContent = msg;
    toast.offsetWidth; // force reflow
    toast.classList.add("is-visible");
    clearTimeout(timerId);
    timerId = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-copy-email]");
    if (!btn) return;
    e.preventDefault();
    const email = btn.getAttribute("data-copy-email") || btn.textContent.trim();
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        showToast("Adresse e-mail copiée");
      }).catch(() => showToast("Impossible de copier"));
    } else {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(ta);
        showToast("Adresse e-mail copiée");
      } catch {
        document.body.removeChild(ta);
        showToast("Impossible de copier");
      }
    }
  });

  // 4. Tab title swap on blur/focus ("Bah reviens ?")
  const originalTitle = document.title;
  window.addEventListener("focus", () => { document.title = originalTitle; });
  window.addEventListener("blur", () => { document.title = "Bah reviens ?"; });
}
