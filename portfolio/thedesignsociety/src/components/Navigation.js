/**
 * Navigation Component with Animated Eye & Text Scrambler
 */

export function renderNavigation() {
  const nav = document.createElement('nav');
  nav.className = 'twostep-nav';
  nav.setAttribute('data-twostep-nav', '');
  nav.setAttribute('data-nav-status', 'not-active');

  nav.innerHTML = `
    <div data-nav-toggle="close" class="twostep-nav__bg"></div>
    <div class="twostep-nav__wrap">
      <div class="twostep-nav__width">
        <div class="twostep-nav__bar">
          <div class="twostep-nav__top">
            <a href="#" class="twostep-nav__logo" aria-label="The Design Society Lyon">
              <svg viewBox="0 0 5467 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M400 450C372.386 450 350 427.614 350 400C350 372.386 372.386 350 400 350C427.614 350 450 372.386 450 400C450 427.614 427.614 450 400 450ZM450 76V24C450 10.7452 439.255 0 426 0H374C360.745 0 350 10.7452 350 24V76C350 89.2548 360.745 100 374 100H426C439.255 100 450 89.2548 450 76ZM450 776V724C450 710.745 439.255 700 426 700H374C360.745 700 350 710.745 350 724V776C350 789.255 360.745 800 374 800H426C439.255 800 450 789.255 450 776ZM800 426V374C800 360.745 789.255 350 776 350H724C710.745 350 700 360.745 700 374V426C700 439.255 710.745 450 724 450H776C789.255 450 800 439.255 800 426ZM100 426V374C100 360.745 89.2548 350 76 350H24C10.7452 350 0 360.745 0 374V426C0 439.255 10.7452 450 24 450H76C89.2548 450 100 439.255 100 426ZM550 300C550 327.614 572.386 350 600 350H626C639.255 350 650 360.745 650 374V426C650 439.255 639.255 450 626 450H600C572.386 450 550 472.386 550 500C550 527.614 572.386 550 600 550H626C639.255 550 650 560.745 650 574V626C650 639.255 639.255 650 626 650H574C560.745 650 550 639.255 550 626V600C550 572.386 527.614 550 500 550C472.386 550 450 572.386 450 600V626C450 639.255 439.255 650 426 650H374C360.745 650 350 639.255 350 626V600C350 572.386 327.614 550 300 550C272.386 550 250 572.386 250 600V626C250 639.255 239.255 650 226 650H174C160.745 650 150 639.255 150 626V574C150 560.745 160.745 550 174 550H200C227.614 550 250 527.614 250 500C250 472.386 227.614 450 200 450H174C160.745 450 150 439.255 150 426V374C150 360.745 160.745 350 174 350H200C227.614 350 250 327.614 250 300C250 272.386 227.614 250 200 250H174C160.745 250 150 239.255 150 226V174C150 160.745 160.745 150 174 150H226C239.255 150 250 160.745 250 174V200C250 227.614 272.386 250 300 250C327.614 250 350 227.614 350 200V174C350 160.745 360.745 150 374 150H426C439.255 150 450 160.745 450 174V200C450 227.614 472.386 250 500 250C527.614 250 550 227.614 550 200V174C550 160.745 560.745 150 574 150H626C639.255 150 650 160.745 650 174V226C650 239.255 639.255 250 626 250H600C572.386 250 550 272.386 550 300ZM500 450C527.614 450 550 427.614 550 400C550 372.386 527.614 350 500 350H474C460.745 350 450 339.255 450 326V300C450 272.386 427.614 250 400 250C372.386 250 350 272.386 350 300V326C350 339.255 339.255 350 326 350H300C272.386 350 250 372.386 250 400C250 427.614 272.386 450 300 450H326C339.255 450 350 460.745 350 474V500C350 527.614 372.386 550 400 550C427.614 550 450 527.614 450 500V474C450 460.745 460.745 450 474 450H500Z" fill="#350AFF"/>
                <path d="M1170.85 233.347H1112.52C1100.54 233.347 1091.69 242.2 1091.69 254.178V255.22C1091.69 267.719 1084.4 275.01 1071.9 275.01H1069.82C1057.32 275.01 1050.03 267.719 1050.03 255.22V212.515C1050.03 200.016 1058.36 191.684 1070.86 191.684H1354.17C1366.67 191.684 1375 200.016 1375 212.515V255.22C1375 267.719 1367.71 275.01 1355.21 275.01H1353.13C1340.63 275.01 1333.34 267.719 1333.34 255.22V254.178C1333.34 242.2 1324.48 233.347 1312.5 233.347H1254.18C1242.2 233.347 1233.34 242.2 1233.34 254.178V545.821C1233.34 557.799 1242.2 566.653 1254.18 566.653H1296.88C1309.38 566.653 1316.67 573.944 1316.67 586.443V588.526C1316.67 601.025 1309.38 608.316 1296.88 608.316H1128.14C1115.64 608.316 1108.35 601.025 1108.35 588.526V586.443C1108.35 573.944 1115.64 566.653 1128.14 566.653H1170.85C1182.83 566.653 1191.68 557.799 1191.68 545.821V254.178C1191.68 242.2 1182.83 233.347 1170.85 233.347Z" fill="#FFFFFF"/>
                <path d="M1434.95 254.178C1434.95 242.199 1426.1 233.346 1414.12 233.346H1413.08C1400.58 233.346 1393.29 226.055 1393.29 213.556V211.473C1393.29 198.974 1400.58 191.683 1413.08 191.683H1414.12C1426.1 191.683 1434.95 182.829 1434.95 170.851V169.81C1434.95 157.311 1442.25 150.02 1454.74 150.02H1456.83C1469.33 150.02 1476.62 157.311 1476.62 169.81V337.504C1476.62 349.482 1485.47 358.336 1497.45 358.336C1509.43 358.336 1518.28 349.482 1518.28 337.504V336.463C1518.28 323.964 1525.57 316.672 1538.07 316.672H1581.82C1594.32 316.672 1601.61 323.964 1601.61 336.463V337.504C1601.61 349.482 1610.46 358.336 1622.44 358.336H1623.48C1635.98 358.336 1643.27 365.627 1643.27 378.126V546.862C1643.27 560.923 1649 566.652 1663.06 566.652H1665.14C1677.64 566.652 1684.93 573.943 1684.93 586.442V588.525C1684.93 601.024 1677.64 608.315 1665.14 608.315H1579.73C1567.24 608.315 1559.94 601.024 1559.94 588.525V586.442C1559.94 573.943 1567.24 566.652 1579.73 566.652H1581.82C1595.88 566.652 1601.61 560.923 1601.61 546.862V379.167C1601.61 367.189 1592.75 358.336 1580.78 358.336H1539.11C1527.13 358.336 1518.28 367.189 1518.28 379.167V380.209C1518.28 392.708 1510.99 399.999 1498.49 399.999H1497.45C1485.47 399.999 1476.62 408.852 1476.62 420.831V546.862C1476.62 560.923 1482.35 566.652 1496.41 566.652H1498.49C1510.99 566.652 1518.28 573.943 1518.28 586.442V588.525C1518.28 601.024 1510.99 608.315 1498.49 608.315H1413.08C1400.58 608.315 1393.29 601.024 1393.29 588.525V586.442C1393.29 573.943 1400.58 566.652 1413.08 566.652H1415.16C1429.23 566.652 1434.95 560.923 1434.95 546.862V254.178Z" fill="#FFFFFF"/>
                <path d="M1725.02 566.651H1723.98C1711.48 566.651 1704.19 559.36 1704.19 546.861V378.125C1704.19 365.626 1711.48 358.335 1723.98 358.335H1725.02C1737 358.335 1745.86 349.482 1745.86 337.503V336.462C1745.86 323.963 1753.15 316.672 1765.65 316.672H1851.06C1863.55 316.672 1870.85 323.963 1870.85 336.462V337.503C1870.85 349.482 1879.7 358.335 1891.68 358.335H1892.72C1905.22 358.335 1912.51 365.626 1912.51 378.125V420.83C1912.51 433.329 1904.18 441.662 1891.68 441.662H1765.65C1751.58 441.662 1745.86 447.39 1745.86 461.452V545.82C1745.86 557.798 1754.71 566.651 1766.69 566.651H1850.01C1862.51 566.651 1868.76 558.319 1868.76 546.861V544.778C1868.76 532.279 1878.14 522.905 1890.64 522.905H1892.72C1905.22 522.905 1914.59 532.279 1914.59 544.778V546.861C1914.59 559.36 1905.22 568.734 1892.72 568.734H1890.64C1879.18 568.734 1870.85 574.984 1870.85 587.483V588.524C1870.85 601.023 1863.55 608.315 1851.06 608.315H1765.65C1753.15 608.315 1745.86 601.023 1745.86 588.524V587.483C1745.86 575.505 1737 566.651 1725.02 566.651Z" fill="#FFFFFF"/>
              </svg>
            </a>
            <button data-nav-toggle="toggle" class="twostep-nav__toggle" aria-label="Menu Toggle">
              <div class="twostep-nav__toggle-bar"></div>
              <div class="twostep-nav__toggle-bar"></div>
            </button>
            <div class="twostep-nav__top-line"></div>
          </div>
          <div class="twostep-nav__bottom">
            <div class="twostep-nav__bottom-overflow">
              <div class="twostep-nav__bottom-inner">
                <div class="twostep-nav__bottom-row">
                  <div class="twostep-nav__bottom-col">
                    <ul class="twostep-nav__ul">
                      <li data-scramble-hover="link" class="twostep-nav__li">
                        <a href="#hero" class="twostep-nav__link"><span data-scramble-hover="target">[01] Accueil</span></a>
                      </li>
                      <li data-scramble-hover="link" class="twostep-nav__li">
                        <a href="#events" class="twostep-nav__link"><span data-scramble-hover="target">[02] Évènements</span></a>
                      </li>
                      <li data-scramble-hover="link" class="twostep-nav__li">
                        <a href="#about" class="twostep-nav__link"><span data-scramble-hover="target">[03] À propos</span></a>
                      </li>
                      <li data-scramble-hover="link" class="twostep-nav__li">
                        <a href="#team" class="twostep-nav__link"><span data-scramble-hover="target">[04] Les Saints Représentants</span></a>
                      </li>
                      <li data-scramble-hover="link" class="twostep-nav__li">
                        <a href="#contact" class="twostep-nav__link"><span data-scramble-hover="target">[05] Contact</span></a>
                      </li>
                    </ul>
                    <ul class="twostep-nav__ul is--small">
                      <li data-scramble-hover="link">
                        <a href="https://www.instagram.com/thedesignsociety_lyon/" target="_blank" rel="noopener" class="twostep-nav__link">
                          <span class="twostep-nav__link-eyebrow" data-scramble-hover="target">Instagram ↗</span>
                        </a>
                      </li>
                      <li data-scramble-hover="link">
                        <a href="https://www.linkedin.com/company/the-design-society-lyon/" target="_blank" rel="noopener" class="twostep-nav__link">
                          <span class="twostep-nav__link-eyebrow" data-scramble-hover="target">LinkedIn ↗</span>
                        </a>
                      </li>
                      <li data-scramble-hover="link">
                        <a href="https://www.eventbrite.fr/o/the-design-society-110792418841" target="_blank" rel="noopener" class="twostep-nav__link">
                          <span class="twostep-nav__link-eyebrow" data-scramble-hover="target">Eventbrite ↗</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="twostep-nav__bottom-col is--visual">
                    <div class="twostep-nav__visual">
                      <div class="hero-eye-icon">
                        <svg width="100%" height="100%" viewBox="0 0 774 560" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="eye-blink-wrapper" class="eye-blinking">
                            <!-- Animated Iris that tracks cursor -->
                            <g data-move="iris" style="transform: translate(0px, 0px); transition: transform 0.08s ease-out;">
                              <svg x="322" y="230" width="130" height="130" viewBox="0 0 130 130">
                                <path d="M90 50H80V40H90V50Z" fill="#BCF015"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M90 10H100V20H110V30H120V40H130V90H120V100H110V110H100V120H90V130H40V120H30V110H20V100H10V90H0V40H10V30H20V20H30V10H40V0H90V10ZM80 40H70V50H80V60H90V50H100V40H90V30H80V40Z" fill="#350AFF"/>
                              </svg>
                            </g>

                            <!-- Eye Outline Pixel Contours -->
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M351.114 214.014C358.495 213.589 367.794 213.824 375.358 213.823L417.161 213.896C417.387 217.314 417.448 217.963 417.418 221.387C426.928 221.795 436.124 221.446 445.521 221.766L445.561 231.079C450.783 230.973 456.984 231.087 462.156 231.315L462.48 241.169C467.971 240.956 474.664 240.825 480.092 241.177C480.39 245.18 480.704 248.258 480.205 252.253C485.529 251.979 490.866 252.022 496.184 252.381C496.13 256.093 496.111 259.805 496.118 263.517C500.943 263.341 506.418 263.717 511.498 263.593C511.964 267.767 512.163 271.099 512.083 275.273C517.034 275.446 522.157 275.426 527.123 275.469C527.364 278.155 527.261 281.979 527.269 284.751C532.154 284.975 537.239 285.303 542.109 285.087C542.048 288.754 542.009 292.407 541.814 296.069C536.141 298.61 536.776 299.261 536.172 305.24C531.649 305.533 527.409 305.938 522.895 305.456C522.765 308.308 522.932 312.796 521.419 315.052C519.351 316.553 510.256 315.785 507.067 315.677C506.827 318.783 507.297 323.401 505.439 325.764C503.146 327.383 494.475 326.128 491.458 325.672L491.294 336.27C486.109 336.364 480.753 336.543 475.587 336.303C475.737 339.125 475.674 342.732 475.694 345.601C470.75 345.785 459.511 346.122 454.967 345.567C454.997 348.295 455.289 353.72 454.339 356.087C452.051 357.108 432.769 356.987 429.486 356.855C429.334 359.524 429.197 362.193 429.074 364.865L423.613 364.991H357.85C351.66 365.01 345.253 364.739 339.224 364.8C339.297 362.266 339.223 359.694 339.18 357.155C331.029 356.911 323.05 357.208 314.866 356.688L314.744 347.271C311.495 346.947 300.369 346.339 297.382 346.527C297.198 343.725 297.221 340.061 297.16 337.193C291.791 336.29 284.254 336.341 278.764 336.421C278.937 332.118 278.895 329.972 277.926 325.795C272.627 325.583 265.985 325.529 260.713 325.736C260.416 322.527 260.499 319.171 260.506 315.939C255.318 315.532 250.941 315.215 245.732 315.149C245.854 311.854 245.85 308.845 245.812 305.549C241.188 305.644 235.922 305.222 231.656 305.464C231.286 298.738 231.235 291.997 231.503 285.265C234.872 285.029 238.99 285.065 242.423 285.016C242.531 281.319 242.672 279.406 243.167 275.791C247.574 275.427 251.57 275.391 255.999 275.34C256.357 271.487 256.68 267.63 256.967 263.77C261.622 263.672 266.277 263.544 270.931 263.386C271.6 248.267 273.509 252.259 287.96 252.318L288.155 241.33C293.891 241.059 299.629 240.847 305.369 240.696C305.611 227.308 309.47 231.561 321.618 231.098C321.687 228.008 321.859 224.921 322.136 221.842C330.853 221.447 340.873 221.718 349.691 221.769C349.807 218.808 349.497 216.134 351.114 214.014Z" fill="#FBFBFC"/>
                            <path d="M51.3135 285.932H87.8486V300.721H51.3135V337.256H36.5244V300.721H0V285.932H36.5244V249.408H51.3135V285.932Z" fill="#350AFF"/>
                            <path d="M737.002 285.343H773.536V300.132H737.002V336.667H722.213V300.132H685.688V285.343H722.213V248.818H737.002V285.343Z" fill="#350AFF"/>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return nav;
}

export function initNavigation() {
  const nav = document.querySelector('[data-twostep-nav]');
  if (!nav) return;

  const toggleBtn = nav.querySelector('[data-nav-toggle="toggle"]');
  const bgOverlay = nav.querySelector('[data-nav-toggle="close"]');
  const links = nav.querySelectorAll('.twostep-nav__link');

  const toggle = () => {
    const isActive = nav.getAttribute('data-nav-status') === 'active';
    nav.setAttribute('data-nav-status', isActive ? 'not-active' : 'active');
  };

  const close = () => {
    nav.setAttribute('data-nav-status', 'not-active');
  };

  toggleBtn?.addEventListener('click', toggle);
  bgOverlay?.addEventListener('click', close);
  links.forEach(l => l.addEventListener('click', close));

  // --- Interactive Iris Cursor Tracking ---
  const irisGroup = nav.querySelector('[data-move="iris"]');
  if (irisGroup) {
    window.addEventListener('mousemove', (e) => {
      const rect = irisGroup.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      // Clamp eye movement radius
      const maxDistance = 24;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy) * 0.05, maxDistance);
      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      irisGroup.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }

  // --- Scramble Text Hover Decoder Effect ---
  const scrambleLinks = nav.querySelectorAll('[data-scramble-hover="link"]');
  const chars = '0123456789!@#$%^&*()_+{}[]:;<>,.?~=-/\\';

  scrambleLinks.forEach(link => {
    const target = link.querySelector('[data-scramble-hover="target"]') || link;
    const originalText = target.textContent;
    let interval = null;

    link.addEventListener('mouseenter', () => {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        target.textContent = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ' || index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        iteration += 1 / 2;
      }, 30);
    });

    link.addEventListener('mouseleave', () => {
      clearInterval(interval);
      target.textContent = originalText;
    });
  });
}
