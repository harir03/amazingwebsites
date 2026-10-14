/**
 * Footer Section Component
 * Features:
 * - 3D kinetic text distortion on mouse movement
 * - Floating sticker links with scramble hover effects
 * - Continuous infinite horizontal marquee ticker
 * - Interactive email copy to clipboard with toast notification
 */

export function renderFooterSection() {
  const wrap = document.createElement('div');
  wrap.className = 'footer-wrap';
  wrap.id = 'contact';

  const marqueeText = "THE DESIGN SOCIETY EST UNE SOCIÉTÉ SECRÈTE QUI COMMUNIQUE SUR LINKEDIN, PERSONNE N'A ENCORE RELEVÉ L'INCOHÉRENCE";

  wrap.innerHTML = `
    <footer class="footer">
      <div class="footer-top-row">
        <!-- 3D Distorted Title -->
        <div class="effet-deformation" data-distortion>
          The Design <br/>Society
        </div>

        <!-- Floating Sticker Link Menus -->
        <div class="floating-menus-container">
          <div data-sticker="item" class="floating-menu is-green">
            <div class="floating-menu-header">
              <span>Navigation</span>
              <span>[+]</span>
            </div>
            <div class="floating-menu-links">
              <a href="#hero" data-scramble-hover="link"><span data-scramble-hover="target">[accueil]</span></a>
              <a href="#events" data-scramble-hover="link"><span data-scramble-hover="target">[évènements]</span></a>
              <a href="#about" data-scramble-hover="link"><span data-scramble-hover="target">[à propos]</span></a>
              <a href="#team" data-scramble-hover="link"><span data-scramble-hover="target">[l'équipe]</span></a>
            </div>
          </div>

          <div data-sticker="item" class="floating-menu is-blue">
            <div class="floating-menu-header">
              <span>Réseaux</span>
              <span>[+]</span>
            </div>
            <div class="floating-menu-links">
              <a href="https://www.instagram.com/thedesignsociety_lyon/" target="_blank" rel="noopener" data-scramble-hover="link">
                <span data-scramble-hover="target">[instagram]</span>
              </a>
              <a href="https://www.linkedin.com/company/the-design-society-lyon/" target="_blank" rel="noopener" data-scramble-hover="link">
                <span data-scramble-hover="target">[linkedin]</span>
              </a>
              <a href="https://www.eventbrite.fr/o/the-design-society-110792418841" target="_blank" rel="noopener" data-scramble-hover="link">
                <span data-scramble-hover="target">[eventbrite]</span>
              </a>
              <a href="#" data-copy-email="pssst@thedesignsociety.fr" data-scramble-hover="link">
                <span data-scramble-hover="target">[copier e-mail]</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Infinite Marquee Strip -->
      <div class="footer-marquee">
        <div class="marquee-track">
          <div class="marquee-item">${marqueeText} <span class="marquee-star">✦</span></div>
          <div class="marquee-item">${marqueeText} <span class="marquee-star">✦</span></div>
          <div class="marquee-item">${marqueeText} <span class="marquee-star">✦</span></div>
          <div class="marquee-item">${marqueeText} <span class="marquee-star">✦</span></div>
        </div>
      </div>

      <!-- Monograms and Credits Row -->
      <div class="footer-cropped">
        <div class="footer-letter">D</div>
        <div class="footer-letter">S</div>
        <div class="footer-credits">
          <div>© 2025–2026 The Design Society Lyon.</div>
          <div>Recreated with pride by open-source community.</div>
        </div>
        <div class="footer-letter">©</div>
      </div>
    </footer>

    <!-- Copy Toast Snackbar -->
    <div class="copy-snackbar" id="copySnackbar">
      [ E-mail copié dans le presse-papier : pssst@thedesignsociety.fr ]
    </div>
  `;

  return wrap;
}

export function initFooterInteractions() {
  const footerWrap = document.querySelector('.footer-wrap');
  if (!footerWrap) return;

  // 1. 3D Deformation on mouse move
  const distortionText = footerWrap.querySelector('[data-distortion]');
  if (distortionText) {
    footerWrap.addEventListener('mousemove', (e) => {
      const rect = distortionText.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const skewX = x * 8;
      const rotateY = x * 10;
      const rotateX = -y * 8;
      distortionText.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) skewX(${skewX}deg)`;
    });

    footerWrap.addEventListener('mouseleave', () => {
      distortionText.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) skewX(0deg)';
    });
  }

  // 2. Email Copy with Snackbar
  const copyBtn = footerWrap.querySelector('[data-copy-email]');
  const snackbar = document.getElementById('copySnackbar');

  copyBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const email = copyBtn.getAttribute('data-copy-email') || 'pssst@thedesignsociety.fr';
    navigator.clipboard.writeText(email).then(() => {
      if (snackbar) {
        snackbar.classList.add('is-visible');
        setTimeout(() => snackbar.classList.remove('is-visible'), 3000);
      }
    });
  });
}
