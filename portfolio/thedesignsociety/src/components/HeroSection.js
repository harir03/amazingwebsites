/**
 * Hero Section (mwg020) Component
 * Features:
 * - Giant pixel art Eye illustration
 * - Floating draggable cards with custom pixel handle corners
 * - Mouse cursor image trail effect
 */

export function renderHeroSection() {
  const section = document.createElement('section');
  section.className = 'mwg020';
  section.id = 'hero';

  section.innerHTML = `
    <!-- Left Floating Draggable Card -->
    <div data-sticker="item" class="floating-hero-card card-left is-green">
      <div class="hero-card-header">
        <span class="hero-card-tag">[ DOCUMENT TOP SECRET ]</span>
        <span class="hero-card-status">#69001</span>
      </div>
      <div class="hero-card-body">
        Une société secrète si mal gardée qu'on a fait un site public.
      </div>
      <div class="badge-row">
        <span class="pixel-badge green">MEMBRES SEULEMENT</span>
        <span class="pixel-badge blue">LYON 2025</span>
      </div>
    </div>

    <!-- Right Floating Draggable Card -->
    <div data-sticker="item" class="floating-hero-card card-right is-blue">
      <div class="hero-card-header">
        <span class="hero-card-tag">[ PROCHAIN RENDEZ-VOUS ]</span>
        <span class="hero-card-status">● LIVE</span>
      </div>
      <div class="hero-card-body">
        Talks inspirants & apéros informels entre créatifs lyonnais.
      </div>
      <div class="badge-row">
        <span class="pixel-badge blue">TALK #1</span>
        <span class="pixel-badge green">INSCRIPTION OUVERTE</span>
      </div>
    </div>

    <div class="mwg020-medias">
      <!-- Upper Banner -->
      <div class="caption-hero">
        <span>[ CRITÈRE D'ACCÈS : SAVOIR RESPIRER ]</span>
        <span>01 // PROLOGUE</span>
      </div>

      <!-- Upper Half of Pixel Eye -->
      <div class="eye-hero-cropped">
        <svg class="eye-hero" viewBox="0 0 774 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M351.114 214.014C358.495 213.589 367.794 213.824 375.358 213.823L417.161 213.896C417.387 217.314 417.448 217.963 417.418 221.387C426.928 221.795 436.124 221.446 445.521 221.766L445.561 231.079C450.783 230.973 456.984 231.087 462.156 231.315L462.48 241.169C467.971 240.956 474.664 240.825 480.092 241.177C480.39 245.18 480.704 248.258 480.205 252.253C485.529 251.979 490.866 252.022 496.184 252.381C496.13 256.093 496.111 259.805 496.118 263.517C500.943 263.341 506.418 263.717 511.498 263.593C511.964 267.767 512.163 271.099 512.083 275.273C517.034 275.446 522.157 275.426 527.123 275.469C527.364 278.155 527.261 281.979 527.269 284.751C532.154 284.975 537.239 285.303 542.109 285.087C542.048 288.754 542.009 292.407 541.814 296.069C536.141 298.61 536.776 299.261 536.172 305.24C531.649 305.533 527.409 305.938 522.895 305.456C522.765 308.308 522.932 312.796 521.419 315.052C519.351 316.553 510.256 315.785 507.067 315.677C506.827 318.783 507.297 323.401 505.439 325.764C503.146 327.383 494.475 326.128 491.458 325.672L491.294 336.27C486.109 336.364 480.753 336.543 475.587 336.303C475.737 339.125 475.674 342.732 475.694 345.601C470.75 345.785 459.511 346.122 454.967 345.567C454.997 348.295 455.289 353.72 454.339 356.087C452.051 357.108 432.769 356.987 429.486 356.855C429.334 359.524 429.197 362.193 429.074 364.865L423.613 364.991H357.85C351.66 365.01 345.253 364.739 339.224 364.8C339.297 362.266 339.223 359.694 339.18 357.155C331.029 356.911 323.05 357.208 314.866 356.688L314.744 347.271C311.495 346.947 300.369 346.339 297.382 346.527C297.198 343.725 297.221 340.061 297.16 337.193C291.791 336.29 284.254 336.341 278.764 336.421C278.937 332.118 278.895 329.972 277.926 325.795C272.627 325.583 265.985 325.529 260.713 325.736C260.416 322.527 260.499 319.171 260.506 315.939C255.318 315.532 250.941 315.215 245.732 315.149C245.854 311.854 245.85 308.845 245.812 305.549C241.188 305.644 235.922 305.222 231.656 305.464C231.286 298.738 231.235 291.997 231.503 285.265C234.872 285.029 238.99 285.065 242.423 285.016C242.531 281.319 242.672 279.406 243.167 275.791C247.574 275.427 251.57 275.391 255.999 275.34C256.357 271.487 256.68 267.63 256.967 263.77C261.622 263.672 266.277 263.544 270.931 263.386C271.6 248.267 273.509 252.259 287.96 252.318L288.155 241.33C293.891 241.059 299.629 240.847 305.369 240.696C305.611 227.308 309.47 231.561 321.618 231.098C321.687 228.008 321.859 224.921 322.136 221.842C330.853 221.447 340.873 221.718 349.691 221.769C349.807 218.808 349.497 216.134 351.114 214.014Z" fill="#350AFF"/>
            <path d="M51.3135 285.932H87.8486V300.721H51.3135V337.256H36.5244V300.721H0V285.932H36.5244V249.408H51.3135V285.932Z" fill="#BCF015"/>
            <path d="M737.002 285.343H773.536V300.132H737.002V336.667H722.213V300.132H685.688V285.343H722.213V248.818H737.002V285.343Z" fill="#BCF015"/>
          </g>
        </svg>
      </div>

      <!-- Main Headline -->
      <div class="content-hero-container">
        <h1 class="hero-title">The Design Society</h1>
        <p class="hero-subtitle">
          L'association qui réunit les designers de Lyon autour de talks et d'apéros. Une société secrète si mal gardée qu'on a fait un site.
        </p>
      </div>

      <!-- Lower Half of Pixel Eye -->
      <div class="eye-hero-cropped bottom">
        <svg class="eye-hero" viewBox="0 0 774 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M351.114 214.014C358.495 213.589 367.794 213.824 375.358 213.823L417.161 213.896C417.387 217.314 417.448 217.963 417.418 221.387C426.928 221.795 436.124 221.446 445.521 221.766L445.561 231.079C450.783 230.973 456.984 231.087 462.156 231.315L462.48 241.169C467.971 240.956 474.664 240.825 480.092 241.177C480.39 245.18 480.704 248.258 480.205 252.253C485.529 251.979 490.866 252.022 496.184 252.381C496.13 256.093 496.111 259.805 496.118 263.517C500.943 263.341 506.418 263.717 511.498 263.593C511.964 267.767 512.163 271.099 512.083 275.273C517.034 275.446 522.157 275.426 527.123 275.469C527.364 278.155 527.261 281.979 527.269 284.751C532.154 284.975 537.239 285.303 542.109 285.087C542.048 288.754 542.009 292.407 541.814 296.069C536.141 298.61 536.776 299.261 536.172 305.24C531.649 305.533 527.409 305.938 522.895 305.456C522.765 308.308 522.932 312.796 521.419 315.052C519.351 316.553 510.256 315.785 507.067 315.677C506.827 318.783 507.297 323.401 505.439 325.764C503.146 327.383 494.475 326.128 491.458 325.672L491.294 336.27C486.109 336.364 480.753 336.543 475.587 336.303C475.737 339.125 475.674 342.732 475.694 345.601C470.75 345.785 459.511 346.122 454.967 345.567C454.997 348.295 455.289 353.72 454.339 356.087C452.051 357.108 432.769 356.987 429.486 356.855C429.334 359.524 429.197 362.193 429.074 364.865L423.613 364.991H357.85C351.66 365.01 345.253 364.739 339.224 364.8C339.297 362.266 339.223 359.694 339.18 357.155C331.029 356.911 323.05 357.208 314.866 356.688L314.744 347.271C311.495 346.947 300.369 346.339 297.382 346.527C297.198 343.725 297.221 340.061 297.16 337.193C291.791 336.29 284.254 336.341 278.764 336.421C278.937 332.118 278.895 329.972 277.926 325.795C272.627 325.583 265.985 325.529 260.713 325.736C260.416 322.527 260.499 319.171 260.506 315.939C255.318 315.532 250.941 315.215 245.732 315.149C245.854 311.854 245.85 308.845 245.812 305.549C241.188 305.644 235.922 305.222 231.656 305.464C231.286 298.738 231.235 291.997 231.503 285.265C234.872 285.029 238.99 285.065 242.423 285.016C242.531 281.319 242.672 279.406 243.167 275.791C247.574 275.427 251.57 275.391 255.999 275.34C256.357 271.487 256.68 267.63 256.967 263.77C261.622 263.672 266.277 263.544 270.931 263.386C271.6 248.267 273.509 252.259 287.96 252.318L288.155 241.33C293.891 241.059 299.629 240.847 305.369 240.696C305.611 227.308 309.47 231.561 321.618 231.098C321.687 228.008 321.859 224.921 322.136 221.842C330.853 221.447 340.873 221.718 349.691 221.769C349.807 218.808 349.497 216.134 351.114 214.014Z" fill="#350AFF"/>
            <path d="M51.3135 285.932H87.8486V300.721H51.3135V337.256H36.5244V300.721H0V285.932H36.5244V249.408H51.3135V285.932Z" fill="#BCF015"/>
            <path d="M737.002 285.343H773.536V300.132H737.002V336.667H722.213V300.132H685.688V285.343H722.213V248.818H737.002V285.343Z" fill="#BCF015"/>
          </g>
        </svg>
      </div>

      <!-- Lower Banner -->
      <div class="caption-hero padding-bottom">
        <span>[ FORMATION SUR PLACE POSSIBLE ]</span>
        <span>02 // ÉVÈNEMENTS & APÉROS</span>
      </div>
    </div>
  `;

  return section;
}

export function initHeroInteractions() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  // 1. Draggable Stickers Logic
  const stickers = hero.querySelectorAll('[data-sticker="item"]');
  stickers.forEach(sticker => {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialX = 0, initialY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const transform = window.getComputedStyle(sticker).transform;
      if (transform && transform !== 'none') {
        const matrix = new DOMMatrix(transform);
        initialX = matrix.m41;
        initialY = matrix.m42;
      } else {
        initialX = 0;
        initialY = 0;
      }
      sticker.style.zIndex = '30';
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      sticker.style.transform = `translate(${initialX + dx}px, ${initialY + dy}px)`;
    };

    const onMouseUp = () => {
      isDragging = false;
      sticker.style.zIndex = '10';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    sticker.addEventListener('mousedown', onMouseDown);
  });

  // 2. Mouse Cursor Image Trail Burst
  const trailImages = [
    '/images/sticker-trail-eye.png',
    '/images/sticker-trail-beer.png',
    '/images/sticker-trail-taco.png'
  ];

  let lastX = 0;
  let lastY = 0;
  let imgIndex = 0;
  const threshold = 65; // pixels traveled between drops

  hero.addEventListener('mousemove', (e) => {
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (dist < threshold) return;

    lastX = e.clientX;
    lastY = e.clientY;

    const img = document.createElement('img');
    img.src = trailImages[imgIndex % trailImages.length];
    imgIndex++;
    img.className = 'created-img';
    img.alt = '';

    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = `translate(-50%, -50%) rotate(${(Math.random() - 0.5) * 30}deg) scale(0.6)`;
    img.style.opacity = '1';
    img.style.transition = 'transform 0.8s cubic-bezier(0.625, 0.05, 0, 1), opacity 0.8s ease';

    hero.appendChild(img);

    requestAnimationFrame(() => {
      img.style.transform = `translate(-50%, -50%) rotate(${(Math.random() - 0.5) * 45}deg) scale(1)`;
    });

    setTimeout(() => {
      img.style.opacity = '0';
      img.style.transform = `translate(-50%, -50%) scale(0.4) rotate(${(Math.random() - 0.5) * 60}deg)`;
      setTimeout(() => img.remove(), 800);
    }, 1000);
  });
}
