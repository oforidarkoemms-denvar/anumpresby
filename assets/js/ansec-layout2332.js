/**
 * ansec-layout.js
 * ──────────────────────────────────────────────────────────────
 * Loads the shared ANSEC topbar, navbar, and footer into every
 * page, then initialises all navigation behaviour.
 *
 * USAGE — add ONE script tag at the very end of <body>:
 *
 *   <script src="/assets/js/ansec-layout.js" defer></script>
 *
 * The script auto-detects the current page path and highlights
 * the matching nav item as active.
 *
 * FILE STRUCTURE ASSUMED:
 *   /index.html
 *   /pages/ansec-*.html
 *   /assets/js/ansec-layout.js        ← this file
 *   /assets/css/ansec-layout.css      ← header + footer styles
 *   /assets/components/ansec-header-component.html
 *   /assets/components/ansec-footer-component.html
 *
 * If you prefer not to use separate component HTML files, set
 *   ANSEC.useInlineComponents = true
 * at the top of this file and the script will use the inline
 * HTML strings defined in the INLINE_HEADER / INLINE_FOOTER
 * constants below instead of fetching external files.
 * ──────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     CONFIGURATION
     Edit these paths to match your folder structure.
  ═══════════════════════════════════════════════════════════ */
  const CONFIG = {
    /* Set to true to embed HTML inline (no fetch needed) */
    useInlineComponents: false,

    /* Paths to the component HTML files (relative to site root) */
    headerPath: '/assets/components/ansec-header-component.html',
    footerPath: '/assets/components/ansec-footer-component.html',

    /* Path to the shared CSS file */
    cssPath: '/assets/css/ansec-layout.css',

    /* IDs of the mount points in your page HTML.
       Add <div id="ansec-header"></div> and
           <div id="ansec-footer"></div>
       to every page, OR leave these as null to have the script
       auto-prepend/append to <body>. */
    headerMountId: 'ansec-header',
    footerMountId: 'ansec-footer',
  };


  /* ═══════════════════════════════════════════════════════════
     ACTIVE-PAGE MAP
     Maps URL path fragments → data-section attribute values on
     the <li> elements in the navbar so the right group is
     highlighted.
  ═══════════════════════════════════════════════════════════ */
  const ACTIVE_MAP = {
    '/pages/ansec-history.html':               'our-school',
    '/pages/ansec-mission-vision-values.html': 'our-school',
    '/pages/ansec-admin-staff.html':           'our-school',
    '/pages/ansec-campus-facilities.html':     'our-school',
    '/pages/ansec-anthem-motto.html':          'our-school',
    '/pages/ansec-programmes.html':            'academic-life',
    '/pages/ansec-departments.html':           'academic-life',
    '/pages/ansec-academic-calendar.html':     'academic-life',
    '/pages/ansec-chaplaincy.html':            'student-life',
    '/pages/ansec-clubs.html':                 'student-life',
    '/pages/ansec-sports.html':                'student-life',
    '/pages/ansec-boarding.html':              'student-life',
  };


  /* ═══════════════════════════════════════════════════════════
     INLINE HTML (used when useInlineComponents = true)
     These are exact copies of the component files — edit in
     one place only; the component files are the source of truth.
  ═══════════════════════════════════════════════════════════ */
  const INLINE_HEADER = `
<!-- ── TOPBAR ── -->
<div class="topbar" id="topbar" role="banner">
  <div class="topbar-inner">
    <a href="/index.html" class="school-brand" aria-label="Anum Presbyterian SHS home">
    <img src="/assets/images/anseclogo.jpg" alt="anseclogo" class="school-logo" loading="lazy" fetchpriority="low"/>
      <span class="school-name">
        Anum Presby SHS
        <span class="sub-name">Est. 1937 · Anum, Ghana</span>
      </span>
    </a>
    <div class="topbar-actions">
      <a href="../pages/ansec-alumni.html" class="alumni-link" aria-label="Alumni Portal">
        <i class="ri-user-star-line" aria-hidden="true"></i>
        <span class="tb-text">Alumni</span>
      </a>
      <a href="/pages/donate.html" class="donate-btn" aria-label="Make a donation to ANSEC">
        <i class="ri-heart-3-fill" aria-hidden="true"></i>
        <span class="tb-text">Donate</span>
      </a>
    </div>
  </div>
</div>

<!-- ── NAVBAR ── -->
<nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
  <div class="navbar-inner">
    <a href="/ansec-index.html" class="nav-logo" aria-label="ANSEC home">ANSEC</a>
    <button class="navbar-toggle" id="navToggle"
            aria-label="Open navigation menu" aria-expanded="false" aria-controls="navMenu">
      <span class="hb" aria-hidden="true"><span></span><span></span><span></span></span>
    </button>
    <div class="navbar-menu" id="navMenu" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div class="mobile-menu-header">
        <span class="mobile-menu-label">Navigation</span>
        <button class="mobile-close-btn" id="navClose" aria-label="Close navigation menu">
          <i class="ri-close-line" aria-hidden="true"></i>
        </button>
      </div>
      <ul class="navbar-nav" role="menubar">
        <li class="nav-item has-dropdown" role="none" data-section="our-school">
          <button class="nav-link dropdown-toggle" aria-expanded="false" aria-haspopup="true" role="menuitem">
            <i class="ri-information-line" aria-hidden="true"></i><span>Our School</span>
            <i class="ri-arrow-down-s-line dropdown-caret" aria-hidden="true"></i>
          </button>
          <ul class="dropdown-menu" role="menu">
            <li><a href="/pages/ansec-history.html" class="dropdown-item" role="menuitem"><i class="ri-time-line"></i><span>Our History</span></a></li>
            <li><a href="/pages/ansec-mission-vision-values.html" class="dropdown-item" role="menuitem"><i class="ri-eye-line"></i><span>Mission, Vision &amp; Values</span></a></li>
            <li><a href="/pages/ansec-admin-staff.html" class="dropdown-item" role="menuitem"><i class="ri-user-star-line"></i><span>Administration &amp; Staff</span></a></li>
            <li><a href="/pages/ansec-campus-facilities.html" class="dropdown-item" role="menuitem"><i class="ri-school-line"></i><span>Campus &amp; Facilities</span></a></li>
            <li><a href="/pages/ansec-anthem-motto.html" class="dropdown-item" role="menuitem"><i class="ri-music-2-line"></i><span>School Anthem &amp; Motto</span></a></li>
          </ul>
        </li>
        <li class="nav-item has-dropdown" role="none" data-section="academic-life">
          <button class="nav-link dropdown-toggle" aria-expanded="false" aria-haspopup="true" role="menuitem">
            <i class="ri-book-open-line" aria-hidden="true"></i><span>Academic Life</span>
            <i class="ri-arrow-down-s-line dropdown-caret" aria-hidden="true"></i>
          </button>
          <ul class="dropdown-menu" role="menu">
            <li><a href="/pages/ansec-programmes.html" class="dropdown-item" role="menuitem"><i class="ri-graduation-cap-line"></i><span>Programmes Offered</span></a></li>
            <li><a href="/pages/ansec-departments.html" class="dropdown-item" role="menuitem"><i class="ri-building-4-line"></i><span>Academic Departments</span></a></li>
            <li><a href="/pages/ansec-academic-calendar.html" class="dropdown-item" role="menuitem"><i class="ri-calendar-2-line"></i><span>Academic Calendar</span></a></li>
          </ul>
        </li>
        <li class="nav-item has-dropdown" role="none" data-section="student-life">
          <button class="nav-link dropdown-toggle" aria-expanded="false" aria-haspopup="true" role="menuitem">
            <i class="ri-user-smile-line" aria-hidden="true"></i><span>Faith &amp; Student Life</span>
            <i class="ri-arrow-down-s-line dropdown-caret" aria-hidden="true"></i>
          </button>
          <ul class="dropdown-menu" role="menu">
            <li><a href="/pages/ansec-chaplaincy.html" class="dropdown-item" role="menuitem"><i class="ri-cross-line"></i><span>Chaplaincy &amp; Worship</span></a></li>
            <li><a href="/pages/ansec-clubs.html" class="dropdown-item" role="menuitem"><i class="ri-group-line"></i><span>Clubs &amp; Activities</span></a></li>
            <li><a href="/pages/ansec-sports.html" class="dropdown-item" role="menuitem"><i class="ri-football-line"></i><span>Sports &amp; Athletics</span></a></li>
           <li><a href="/pages/ansec-events.html" class="dropdown-item" role="menuitem"><i class="ri-calendar-2-line"></i><span>Events</span></a></li>
            <li><a href="/pages/ansec-boarding.html" class="dropdown-item" role="menuitem"><i class="ri-home-heart-line"></i><span>Boarding &amp; Pastoral Care</span></a></li>
          </ul>
        </li>
        <li class="nav-item" role="none">
          <a href="/pages/ansec-gallery.html" class="nav-link" role="menuitem">
            <i class="ri-camera-line" aria-hidden="true"></i><span>Gallery</span>
          </a>
        </li>
        <li class="nav-item" role="none">
          <a href="../pages/ansec-contact.html#contact" class="nav-link" role="menuitem">
            <i class="ri-map-pin-line" aria-hidden="true"></i><span>Contact &amp; Location</span>
          </a>
        </li>
      </ul>
      <div class="mobile-footer">
        <a href="/pages/donate.html" class="donate-btn"><i class="ri-heart-3-fill"></i><span>Donate to ANSEC</span></a>
        <a href="/pages/alumni.html" class="alumni-link"><i class="ri-user-star-line"></i><span>Alumni Portal</span></a>
      </div>
    </div>
  </div>
</nav>
<div class="mobile-overlay" id="navOverlay" aria-hidden="true"></div>
`;

  const INLINE_FOOTER = `
<footer id="contact" class="contact-strip" aria-label="Site footer">
  <div class="wrap">
    <div class="cs-grid">
      <div class="cs-col">
        <div class="cs-col-h"><i class="ri-map-pin-line" aria-hidden="true"></i> Location</div>
        <div class="cs-col-v">Anum, Eastern Region</div>
        <div class="cs-col-s">Ghana, West Africa</div>
        <div class="cs-col-s" style="margin-top:.4rem">Accessible via Accra-Kumasi Highway,<br/>exit at Anum Junction</div>
      </div>
      <div class="cs-col">
        <div class="cs-col-h"><i class="ri-phone-line" aria-hidden="true"></i> Contact</div>
        <div class="cs-col-v">+233 (0) XXX XXX XXXX</div>
        <div class="cs-col-s">admissions@ansec.edu.gh</div>
        <div class="cs-col-s">info@ansec.edu.gh</div>
        <div class="cs-col-v" style="margin-top:.65rem;font-size:.78rem">Mon – Fri · 7:30 am – 4:30 pm</div>
      </div>
      <div class="cs-col">
        <div class="cs-col-h"><i class="ri-links-line" aria-hidden="true"></i> Connect</div>
        <div style="display:flex;gap:.7rem;flex-wrap:wrap;margin-top:.2rem">
          <a href="#" class="cs-link" aria-label="Facebook"><i class="ri-facebook-circle-line" style="font-size:1.2rem;color:rgba(0,180,255,.55)"></i></a>
          <a href="#" class="cs-link" aria-label="Twitter / X"><i class="ri-twitter-x-line" style="font-size:1.2rem;color:rgba(0,180,255,.55)"></i></a>
          <a href="#" class="cs-link" aria-label="YouTube"><i class="ri-youtube-line" style="font-size:1.2rem;color:rgba(0,180,255,.55)"></i></a>
          <a href="#" class="cs-link" aria-label="Instagram"><i class="ri-instagram-line" style="font-size:1.2rem;color:rgba(0,180,255,.55)"></i></a>
        </div>
        <a href="/pages/ansec-mission-vision-values.html" class="cs-link" style="margin-top:1rem;display:inline-flex;align-items:center;gap:.4rem">Mission &amp; Values <i class="ri-arrow-right-line" style="font-size:.8rem"></i></a><br/>
        <a href="/pages/ansec-history.html" class="cs-link" style="display:inline-flex;align-items:center;gap:.4rem;margin-top:.4rem">Our History <i class="ri-arrow-right-line" style="font-size:.8rem"></i></a>
      </div>
    </div>
    <div class="cs-divider"></div>
    <div class="cs-footer-row">
      <div class="cs-copy">&copy; <span id="ansec-year">2025</span> Anum Presbyterian Senior High School. All rights reserved.</div>
      <div class="cs-links">
        <a href="#" class="cs-link">Privacy Policy</a>
        <a href="#" class="cs-link">Terms of Use</a>
        <a href="#" class="cs-link">Accessibility</a>
        <a href="#" class="cs-link">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
`;


  /* ═══════════════════════════════════════════════════════════
     INJECT CSS
     Adds the shared stylesheet to <head> if not already present.
  ═══════════════════════════════════════════════════════════ */
  function injectCSS() {
    if (document.querySelector(`link[href="${CONFIG.cssPath}"]`)) return;
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = CONFIG.cssPath;
    document.head.appendChild(link);
  }


  /* ═══════════════════════════════════════════════════════════
     MOUNT HELPERS
  ═══════════════════════════════════════════════════════════ */
  function mountHeader(html) {
    const mount = document.getElementById(CONFIG.headerMountId);
    if (mount) {
      mount.innerHTML = html;
    } else {
      // Fallback: prepend to body
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      document.body.insertBefore(tmp, document.body.firstChild);
    }
  }

  function mountFooter(html) {
    const mount = document.getElementById(CONFIG.footerMountId);
    if (mount) {
      mount.innerHTML = html;
    } else {
      // Fallback: append to body
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      document.body.appendChild(tmp);
    }
  }


  /* ═══════════════════════════════════════════════════════════
     ACTIVE NAV STATE
     Marks the nav item that matches the current page path.
  ═══════════════════════════════════════════════════════════ */
  function setActiveNav() {
    const path = window.location.pathname;

    // Exact path match
    const section = ACTIVE_MAP[path];
    if (section) {
      const li = document.querySelector(`.nav-item[data-section="${section}"]`);
      if (li) li.classList.add('is-active');
      return;
    }

    // Partial match for hash-based or query-string URLs
    for (const [key, val] of Object.entries(ACTIVE_MAP)) {
      if (path.includes(key.replace('/pages/', '').replace('.html', ''))) {
        const li = document.querySelector(`.nav-item[data-section="${val}"]`);
        if (li) li.classList.add('is-active');
        return;
      }
    }

    // Homepage
    if (path === '/' || path === '/index.html') {
      // No nav item highlighted — that's correct for the homepage
    }
  }


  /* ═══════════════════════════════════════════════════════════
     AUTO YEAR in footer copyright
  ═══════════════════════════════════════════════════════════ */
  function setYear() {
    const el = document.getElementById('ansec-year');
    if (el) el.textContent = new Date().getFullYear();
  }


  /* ═══════════════════════════════════════════════════════════
     NAVIGATION BEHAVIOUR
     Dropdowns, mobile menu, scroll effect, keyboard nav.
  ═══════════════════════════════════════════════════════════ */
  function initNav() {
    const sel   = (s, ctx = document) => ctx.querySelector(s);
    const selAll = (s, ctx = document) => [...ctx.querySelectorAll(s)];
    const mobile = () => window.innerWidth <= 992;

    // Touch detection — CSS :hover dropdowns only for non-touch
    if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0) {
      document.body.classList.add('no-touch');
    }

    const navbar   = sel('#navbar');
    const toggle   = sel('#navToggle');
    const menu     = sel('#navMenu');
    const closeBtn = sel('#navClose');
    const overlay  = sel('#navOverlay');

    if (!navbar) return; // safety guard if header failed to load

    let menuOpen = false;
    let scrolled = false;

    /* ── Mobile menu open / close ─────────────────────────── */
    function openMenu() {
      menuOpen = true;
      menu.classList.add('open');
      overlay.classList.add('visible');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
      document.body.classList.add('menu-open');
      setTimeout(() => { closeBtn && closeBtn.focus(); }, 80);
    }

    function closeMenu() {
      if (!menuOpen) return;
      menuOpen = false;
      menu.classList.remove('open');
      overlay.classList.remove('visible');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      document.body.classList.remove('menu-open');
      toggle.focus();
    }

    toggle  && toggle.addEventListener('click', e => {
      e.stopPropagation();
      menuOpen ? closeMenu() : openMenu();
    });
    closeBtn && closeBtn.addEventListener('click', closeMenu);
    overlay  && overlay.addEventListener('click', closeMenu);

    /* ── Dropdowns ────────────────────────────────────────── */
    function closeAllDropdowns(except = null) {
      selAll('.nav-item.has-dropdown.open').forEach(item => {
        if (item === except) return;
        item.classList.remove('open');
        const t = sel('.dropdown-toggle', item);
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }

    function closeAllSubmenus(except = null) {
      selAll('.has-sub.open').forEach(item => {
        if (item === except) return;
        item.classList.remove('open');
        const t = sel('.submenu-toggle', item);
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }

    selAll('.dropdown-toggle').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const item   = btn.closest('.nav-item');
        const isOpen = item.classList.contains('open');

        if (mobile()) {
          closeAllDropdowns(isOpen ? null : item);
          closeAllSubmenus();
        } else {
          closeAllDropdowns(item);
        }

        if (isOpen) {
          item.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    selAll('.submenu-toggle').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const item   = btn.closest('.has-sub');
        const isOpen = item.classList.contains('open');
        closeAllSubmenus(isOpen ? null : item);

        if (isOpen) {
          item.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        closeAllDropdowns();
        closeAllSubmenus();
        if (mobile()) closeMenu();
      }
    });

    /* ── Navbar scroll effect ─────────────────────────────── */
    function handleScroll() {
      const y = window.scrollY;
      if (y > 40 && !scrolled) {
        navbar.classList.add('scrolled');
        scrolled = true;
      } else if (y <= 40 && scrolled) {
        navbar.classList.remove('scrolled');
        scrolled = false;
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ── Resize ───────────────────────────────────────────── */
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        if (!mobile()) {
          closeMenu();
          closeAllDropdowns();
          closeAllSubmenus();
        }
      }, 200);
    });

    /* ── Keyboard navigation ──────────────────────────────── */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (menuOpen) { closeMenu(); return; }
        closeAllDropdowns();
        closeAllSubmenus();
      }
    });

    selAll('.dropdown-menu, .submenu').forEach(m => {
      const items = selAll('.dropdown-item, .submenu-item, .submenu-toggle', m);
      items.forEach((item, i) => {
        item.addEventListener('keydown', e => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            items[(i + 1) % items.length].focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            items[(i - 1 + items.length) % items.length].focus();
          }
        });
      });
    });

    selAll('.dropdown-toggle').forEach(btn => {
      btn.addEventListener('keydown', e => {
        if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
          const item = btn.closest('.nav-item');
          if (!item.classList.contains('open')) {
            e.preventDefault();
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            setTimeout(() => {
              const first = sel('.dropdown-item, .submenu-toggle', item);
              if (first) first.focus();
            }, 50);
          }
        }
      });
    });

    // Focus trap inside mobile menu
    menu && menu.addEventListener('keydown', e => {
      if (e.key !== 'Tab' || !menuOpen) return;
      const focusable = selAll('a[href], button:not([disabled])', menu)
        .filter(el => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }


  /* ═══════════════════════════════════════════════════════════
     MAIN BOOTSTRAP
  ═══════════════════════════════════════════════════════════ */
  async function init() {
    injectCSS();

    if (CONFIG.useInlineComponents) {
      /* ── Use inline HTML strings ── */
      mountHeader(INLINE_HEADER);
      mountFooter(INLINE_FOOTER);
      setActiveNav();
      setYear();
      initNav();
    } else {
      /* ── Fetch component HTML files ── */
      try {
        const [headerRes, footerRes] = await Promise.all([
          fetch(CONFIG.headerPath),
          fetch(CONFIG.footerPath),
        ]);

        if (!headerRes.ok) throw new Error(`Header fetch failed: ${headerRes.status}`);
        if (!footerRes.ok) throw new Error(`Footer fetch failed: ${footerRes.status}`);

        const [headerHTML, footerHTML] = await Promise.all([
          headerRes.text(),
          footerRes.text(),
        ]);

        mountHeader(headerHTML);
        mountFooter(footerHTML);
        setActiveNav();
        setYear();
        initNav();

      } catch (err) {
        console.warn('[ANSEC Layout] Falling back to inline components:', err.message);
        /* Graceful fallback to inline if fetch fails (e.g. file:// protocol) */
        mountHeader(INLINE_HEADER);
        mountFooter(INLINE_FOOTER);
        setActiveNav();
        setYear();
        initNav();
      }
    }
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
