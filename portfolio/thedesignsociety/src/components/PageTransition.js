/**
 * The Design Society Lyon — Signature Pixel Dissolve Page Transition
 * Exact 1:1 implementation matching Slater 61833.js
 */

const pixelHorizontalAmount = 12;
const transitionDuration = 1.0;
const pixelFadeDuration = 0.28;

export function renderPageTransition() {
  return `
    <div data-transition-wrap="" class="transition">
      <div data-transition-panel="" class="transition__panel">
        <div data-transition-col="" class="transition__col">
          <div data-transition-pixel="" class="transition__pixel"></div>
        </div>
      </div>
    </div>
  `;
}

export function buildPixelGrid(isPortrait = false) {
  const panel = document.querySelector('[data-transition-panel]');
  if (!panel) return;
  const rect = panel.getBoundingClientRect();
  panel.style.flexDirection = isPortrait ? 'column' : 'row';

  const lineSizePx = isPortrait 
    ? rect.height / pixelHorizontalAmount 
    : rect.width / pixelHorizontalAmount;
  const crossAmount = Math.max(1, Math.ceil((isPortrait ? rect.width : rect.height) / lineSizePx));

  let lines = panel.querySelectorAll('[data-transition-col]');
  let lineTemplate = lines[0] || document.createElement('div');
  lineTemplate.className = 'transition__col';
  lineTemplate.setAttribute('data-transition-col', '');

  let pixelTemplate = lineTemplate.querySelector('[data-transition-pixel]') || document.createElement('div');
  pixelTemplate.className = 'transition__pixel';
  pixelTemplate.setAttribute('data-transition-pixel', '');

  // Ensure exact column count
  if (lines.length !== pixelHorizontalAmount) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < pixelHorizontalAmount; i++) {
      frag.appendChild(lineTemplate.cloneNode(false));
    }
    panel.replaceChildren(frag);
    lines = panel.querySelectorAll('[data-transition-col]');
  }

  // Populate pixels in each column
  lines.forEach((line) => {
    line.style.flexDirection = isPortrait ? 'row' : 'column';
    line.style.flex = '1 1 auto';
    line.style.justifyContent = 'center';
    const diff = crossAmount - line.childElementCount;
    if (diff > 0) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < diff; i++) {
        frag.appendChild(pixelTemplate.cloneNode(true));
      }
      line.appendChild(frag);
    } else if (diff < 0) {
      for (let i = diff; i < 0; i++) {
        line.lastElementChild?.remove();
      }
    }
  });
}

export function playPixelTransition({ onCovered, onComplete }) {
  if (!window.gsap) {
    if (onCovered) onCovered();
    if (onComplete) onComplete();
    return;
  }

  const isPortrait = window.innerHeight > window.innerWidth;
  buildPixelGrid(isPortrait);

  const transitionWrap = document.querySelector('[data-transition-wrap]');
  const transitionPanel = transitionWrap?.querySelector('[data-transition-panel]');
  if (!transitionPanel) {
    if (onCovered) onCovered();
    if (onComplete) onComplete();
    return;
  }

  const cols = Array.from(transitionPanel.querySelectorAll('[data-transition-col]'));
  const allPixels = transitionPanel.querySelectorAll('[data-transition-pixel]');

  const coverDur = transitionDuration * 0.5;
  const uncoverDur = transitionDuration * 0.5;
  const n = Math.max(1, cols.length);
  const colFade = Math.min(pixelFadeDuration, coverDur * 0.6);
  const coverStep = (coverDur - colFade) / n;
  const uncoverStep = (uncoverDur - colFade) / n;
  const shimmer = (px) => ({ each: (colFade / Math.max(1, px)) * 0.6, from: 'random' });

  const tl = window.gsap.timeline();

  // Initial state
  window.gsap.set(transitionPanel, { opacity: 1, willChange: 'opacity' });
  window.gsap.set(allPixels, { opacity: 0, willChange: 'opacity' });

  // Phase 1: Sweep in (fade columns left to right with pixel shimmer)
  cols.forEach((col, i) => {
    const pixels = col.querySelectorAll('[data-transition-pixel]');
    if (!pixels.length) return;
    tl.to(pixels, {
      opacity: 1,
      duration: colFade,
      ease: 'power1.in',
      stagger: shimmer(pixels.length)
    }, i * coverStep);
  });

  // Covered checkpoint: Screen completely opaque
  tl.add('covered', coverDur);
  tl.set(allPixels, { opacity: 1 }, 'covered');
  tl.call(() => {
    if (onCovered) onCovered();
  }, null, 'covered');

  // Phase 2: Sweep out (fade columns back to 0 left to right)
  cols.forEach((col, i) => {
    const pixels = col.querySelectorAll('[data-transition-pixel]');
    if (!pixels.length) return;
    tl.to(pixels, {
      opacity: 0,
      duration: colFade,
      ease: 'power1.out',
      stagger: shimmer(pixels.length)
    }, 'covered+=' + (i * uncoverStep));
  });

  tl.set(allPixels, { clearProps: 'willChange' });
  tl.set(transitionPanel, { clearProps: 'willChange' });
  tl.call(() => {
    if (onComplete) onComplete();
  });

  return tl;
}
