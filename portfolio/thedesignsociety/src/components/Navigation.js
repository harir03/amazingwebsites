/**
 * The Design Society Lyon — Official Two-Step Scaling Navigation
 * Exact 1:1 markup & interactive iris eye follow physics
 */
export function renderNavigation() {
  return ``;
}

export function initNavigation() {
  // 1. Two-step Scaling Navigation logic
  const navWrap = document.querySelector("[data-twostep-nav]");
  const navStatus = document.querySelector("[data-nav-status]");
  
  if (navWrap && navStatus && !navWrap.__navInit) {
    navWrap.__navInit = true;
    
    const setStatus = (status) => navStatus.setAttribute("data-nav-status", status);
    const isActive = () => navStatus.getAttribute("data-nav-status") === "active";
    const openNav = () => setStatus("active");
    const closeNav = () => setStatus("not-active");
    const toggleNav = () => (isActive() ? closeNav() : openNav());
    
    document.querySelectorAll('[data-nav-toggle="toggle"]').forEach((el) => {
      el.addEventListener("click", toggleNav);
    });
    
    document.querySelectorAll('[data-nav-toggle="close"]').forEach((el) => {
      el.addEventListener("click", closeNav);
    });
    
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isActive()) closeNav();
    });
  }

  // 2. Eye Iris tracking pointer
  window.addEventListener("mousemove", (e) => {
    document.querySelectorAll('[data-move="iris"]').forEach((iris) => {
      const maxDelta = 30;
      const relX = e.clientX / window.innerWidth - 0.5;
      const relY = e.clientY / window.innerHeight - 0.5;
      iris.style.transform = `translate(${relX * maxDelta}px, ${relY * maxDelta}px)`;
    });
  });

  // 3. Hover scramble on nav links
  if (window.gsap && window.SplitText) {
    document.querySelectorAll('[data-scramble-hover="link"]').forEach((link) => {
      if (link.__scrambleInit) return;
      link.__scrambleInit = true;
      const target = link.querySelector('[data-scramble-hover="target"]') || link;
      const originalText = target.textContent;
      const scrambleText = target.getAttribute("data-scramble-text") || originalText;
      
      link.addEventListener("mouseenter", () => {
        if (window.gsap.plugins?.scrambleText || window.ScrambleTextPlugin) {
          window.gsap.to(target, {
            duration: 1.2,
            scrambleText: { text: scrambleText, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ&@#" }
          });
        }
      });
      
      link.addEventListener("mouseleave", () => {
        if (window.gsap.plugins?.scrambleText || window.ScrambleTextPlugin) {
          window.gsap.to(target, {
            duration: 1,
            scrambleText: { text: originalText, speed: 1, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ&@#" }
          });
        }
      });
    });
  }
}
