/**
 * CRTOverlay Component
 * Simulates a retro cathode ray tube (CRT) computer monitor with:
 * - Chromatic RGB aberration (via SVG filter #crt-chroma)
 * - Horizontal phosphor scanlines
 * - Glass curvature vignette
 * - Diagonal ambient glare reflection
 * - Dynamic animated analog grain
 * - Double inset bezel shadow
 */

export function renderCRTOverlay() {
  const container = document.createElement('div');
  container.className = 'crt-overlay-wrapper';
  container.innerHTML = `
    <!-- SVG Chromatic Aberration Filter Definition -->
    <svg class="crt-svg-defs" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="crt-chroma" x="0%" y="0%" width="100%" height="100%">
          <feOffset in="SourceGraphic" dx="-0.8" dy="0" result="r"/>
          <feColorMatrix in="r" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="rOnly"/>
          <feOffset in="SourceGraphic" dx="0.8" dy="0" result="b"/>
          <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="bOnly"/>
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="gOnly"/>
          <feBlend in="rOnly" in2="gOnly" mode="screen" result="rg"/>
          <feBlend in="rg" in2="bOnly" mode="screen"/>
        </filter>
      </defs>
    </svg>

    <!-- CRT Filter Layer Elements -->
    <div class="crt-grain" aria-hidden="true"></div>
    <div class="crt-scanlines" aria-hidden="true"></div>
    <div class="crt-glare" aria-hidden="true"></div>
    <div class="crt-vignette" aria-hidden="true"></div>
    <div class="crt-bezel" aria-hidden="true"></div>
  `;
  return container;
}

export function initCRTOverlay(enabled = true) {
  document.documentElement.setAttribute('data-crt', enabled ? 'true' : 'false');
  if (!document.querySelector('.crt-svg-defs')) {
    document.body.appendChild(renderCRTOverlay());
  }
}
