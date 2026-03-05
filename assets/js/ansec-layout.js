/**
 * ansec-layout.js
 * ──────────────────────────────────────────────────────────────
 * Injects the shared ANSEC header and footer, then wires all
 * navigation behaviour.
 *
 * All injected HTML uses  al-  prefixed classes so they never
 * clash with styles on individual pages.
 *
 * USAGE — add to every page:
 *
 *   <div id="ansec-header"></div>        ← top of <body>
 *   ...page content...
 *   <div id="ansec-footer"></div>        ← bottom of <body>
 *   <script src="/assets/js/ansec-layout.js" defer></script>
 *
 * FILE STRUCTURE:
 *   /assets/js/ansec-layout.js
 *   /assets/css/ansec-layout.css
 *   /assets/components/ansec-header-component.html
 *   /assets/components/ansec-footer-component.html
 * ──────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';


  /* ═══════════════════════════════════════════════════════════
     CONFIGURATION
  ═══════════════════════════════════════════════════════════ */
  const CONFIG = {
    useInlineComponents: false,          // false = fetch files; true = use inline strings
    headerPath: '/assets/components/ansec-header-component.html',
    footerPath: '/assets/components/ansec-footer-component.html',
    cssPath:    '/assets/css/ansec-layout.css',
    headerMountId: 'ansec-header',
    footerMountId: 'ansec-footer',
  };


  /* ═══════════════════════════════════════════════════════════
     ACTIVE-PAGE MAP
     Maps URL path → data-section value on the matching al-ni.
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
    '/pages/ansec-events.html':                'events',
    '/pages/ansec-gallery.html':               'gallery',
    '/pages/ansec-contact.html':               'contact',
  };


  /* ═══════════════════════════════════════════════════════════
     INLINE HEADER
     Keep in sync with: /assets/components/ansec-header-component.html
  ═══════════════════════════════════════════════════════════ */
  const INLINE_HEADER = `
<div class="al-topbar" id="al-topbar" role="banner">
  <div class="al-topbar-inner">
    <a href="/index.html" class="al-brand" aria-label="Anum Presbyterian SHS home">
      <img src="/assets/images/anseclogo.jpg" alt="ANSEC Logo" class="al-logo"
           width="40" height="40" loading="eager" onerror="this.style.display='none'"/>
      <span class="al-school-name">Anum Presby SHS<span class="al-sub">Est. 1937 &middot; Anum, Ghana</span></span>
    </a>
    <div class="al-topbar-actions">
      <a href="/pages/ansec-alumni.html" class="al-alumni" aria-label="Alumni Portal">
        <i class="ri-user-star-line" aria-hidden="true"></i><span class="al-tb-text">Alumni</span>
      </a>
      <span class="al-sep" aria-hidden="true"></span>
      <a href="/pages/ansec-donate.html" class="al-donate" aria-label="Make a donation to ANSEC">
        <i class="ri-heart-3-fill" aria-hidden="true"></i><span class="al-tb-text">Donate</span>
      </a>
    </div>
  </div>
</div>
<nav class="al-navbar" id="al-navbar" role="navigation" aria-label="Main navigation">
  <div class="al-navbar-inner">
    <a href="/pages/ansec-index.html" class="al-wordmark" aria-label="ANSEC home">AN<em>SEC</em></a>
    <button class="al-burger" id="al-burger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="al-menu">
      <span class="al-hb" aria-hidden="true"><span></span><span></span><span></span></span>
    </button>
    <ul class="al-nav-list" role="menubar">
      <li class="al-ni" role="none" data-section="our-school" data-drop>
        <button class="al-nl" aria-haspopup="true" aria-expanded="false" role="menuitem">
          <i class="ri-information-line" aria-hidden="true"></i><span>Our School</span><i class="ri-arrow-down-s-line al-caret" aria-hidden="true"></i>
        </button>
        <ul class="al-drop" role="menu">
          <li role="none"><a href="/pages/ansec-history.html" class="al-di" role="menuitem"><i class="ri-time-line"></i><span>Our History</span></a></li>
          <li role="none"><a href="/pages/ansec-mission-vision-values.html" class="al-di" role="menuitem"><i class="ri-eye-line"></i><span>Mission, Vision &amp; Values</span></a></li>
          <li role="none"><a href="/pages/ansec-admin-staff.html" class="al-di" role="menuitem"><i class="ri-user-star-line"></i><span>Administration &amp; Staff</span></a></li>
          <li role="none"><a href="/pages/ansec-campus-facilities.html" class="al-di" role="menuitem"><i class="ri-school-line"></i><span>Campus &amp; Facilities</span></a></li>
          <li role="none"><a href="/pages/ansec-anthem-motto.html" class="al-di" role="menuitem"><i class="ri-music-2-line"></i><span>School Anthem &amp; Motto</span></a></li>
        </ul>
      </li>
      <li class="al-ni" role="none" data-section="academic-life" data-drop>
        <button class="al-nl" aria-haspopup="true" aria-expanded="false" role="menuitem">
          <i class="ri-book-open-line" aria-hidden="true"></i><span>Academic Life</span><i class="ri-arrow-down-s-line al-caret" aria-hidden="true"></i>
        </button>
        <ul class="al-drop" role="menu">
          <li role="none"><a href="/pages/ansec-programmes.html" class="al-di" role="menuitem"><i class="ri-graduation-cap-line"></i><span>Programmes Offered</span></a></li>
          <li role="none"><a href="/pages/ansec-departments.html" class="al-di" role="menuitem"><i class="ri-building-4-line"></i><span>Academic Departments</span></a></li>
          <li role="none"><a href="/pages/ansec-academic-calendar.html" class="al-di" role="menuitem"><i class="ri-calendar-2-line"></i><span>Academic Calendar</span></a></li>
        </ul>
      </li>
      <li class="al-ni" role="none" data-section="student-life" data-drop>
        <button class="al-nl" aria-haspopup="true" aria-expanded="false" role="menuitem">
          <i class="ri-user-smile-line" aria-hidden="true"></i><span>Faith &amp; Student Life</span><i class="ri-arrow-down-s-line al-caret" aria-hidden="true"></i>
        </button>
        <ul class="al-drop" role="menu">
          <li role="none"><a href="/pages/ansec-chaplaincy.html" class="al-di" role="menuitem"><i class="ri-cross-line"></i><span>Chaplaincy &amp; Worship</span></a></li>
          <li role="none"><a href="/pages/ansec-clubs.html" class="al-di" role="menuitem"><i class="ri-group-line"></i><span>Clubs &amp; Activities</span></a></li>
          <li role="none"><a href="/pages/ansec-sports.html" class="al-di" role="menuitem"><i class="ri-football-line"></i><span>Sports &amp; Athletics</span></a></li>
          <li role="none"><a href="/pages/ansec-boarding.html" class="al-di" role="menuitem"><i class="ri-home-heart-line"></i><span>Boarding &amp; Pastoral Care</span></a></li>
        </ul>
      </li>
      <li class="al-ni" role="none" data-section="events">
        <a href="/pages/ansec-events.html" class="al-nl" role="menuitem"><i class="ri-calendar-event-line" aria-hidden="true"></i><span>Events</span></a>
      </li>
      <li class="al-ni" role="none" data-section="gallery">
        <a href="/pages/ansec-gallery.html" class="al-nl" role="menuitem"><i class="ri-camera-line" aria-hidden="true"></i><span>Gallery</span></a>
      </li>
      <li class="al-ni" role="none" data-section="contact">
        <a href="/pages/ansec-contact.html" class="al-nl" role="menuitem"><i class="ri-map-pin-line" aria-hidden="true"></i><span>Contact &amp; Location</span></a>
      </li>
    </ul>
    <div class="al-menu" id="al-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div class="al-panel-head">
        <span class="al-panel-label">Navigation</span>
        <button class="al-panel-close" id="al-close" aria-label="Close navigation menu"><i class="ri-close-line" aria-hidden="true"></i></button>
      </div>
      <ul class="al-mob-nav" role="menubar">
        <li class="al-ni" role="none" data-section="our-school" data-drop>
          <button class="al-nl" aria-haspopup="true" aria-expanded="false" role="menuitem"><i class="ri-information-line" aria-hidden="true"></i><span>Our School</span><i class="ri-arrow-down-s-line al-caret" aria-hidden="true"></i></button>
          <ul class="al-mob-drop" role="menu">
            <li><a href="/pages/ansec-history.html" class="al-mob-di"><i class="ri-time-line"></i>Our History</a></li>
            <li><a href="/pages/ansec-mission-vision-values.html" class="al-mob-di"><i class="ri-eye-line"></i>Mission, Vision &amp; Values</a></li>
            <li><a href="/pages/ansec-admin-staff.html" class="al-mob-di"><i class="ri-user-star-line"></i>Administration &amp; Staff</a></li>
            <li><a href="/pages/ansec-campus-facilities.html" class="al-mob-di"><i class="ri-school-line"></i>Campus &amp; Facilities</a></li>
            <li><a href="/pages/ansec-anthem-motto.html" class="al-mob-di"><i class="ri-music-2-line"></i>School Anthem &amp; Motto</a></li>
          </ul>
        </li>
        <li class="al-ni" role="none" data-section="academic-life" data-drop>
          <button class="al-nl" aria-haspopup="true" aria-expanded="false" role="menuitem"><i class="ri-book-open-line" aria-hidden="true"></i><span>Academic Life</span><i class="ri-arrow-down-s-line al-caret" aria-hidden="true"></i></button>
          <ul class="al-mob-drop" role="menu">
            <li><a href="/pages/ansec-programmes.html" class="al-mob-di"><i class="ri-graduation-cap-line"></i>Programmes Offered</a></li>
            <li><a href="/pages/ansec-departments.html" class="al-mob-di"><i class="ri-building-4-line"></i>Academic Departments</a></li>
            <li><a href="/pages/ansec-academic-calendar.html" class="al-mob-di"><i class="ri-calendar-2-line"></i>Academic Calendar</a></li>
          </ul>
        </li>
        <li class="al-ni" role="none" data-section="student-life" data-drop>
          <button class="al-nl" aria-haspopup="true" aria-expanded="false" role="menuitem"><i class="ri-user-smile-line" aria-hidden="true"></i><span>Faith &amp; Student Life</span><i class="ri-arrow-down-s-line al-caret" aria-hidden="true"></i></button>
          <ul class="al-mob-drop" role="menu">
            <li><a href="/pages/ansec-chaplaincy.html" class="al-mob-di"><i class="ri-cross-line"></i>Chaplaincy &amp; Worship</a></li>
            <li><a href="/pages/ansec-clubs.html" class="al-mob-di"><i class="ri-group-line"></i>Clubs &amp; Activities</a></li>
            <li><a href="/pages/ansec-sports.html" class="al-mob-di"><i class="ri-football-line"></i>Sports &amp; Athletics</a></li>
            <li><a href="/pages/ansec-boarding.html" class="al-mob-di"><i class="ri-home-heart-line"></i>Boarding &amp; Pastoral Care</a></li>
          </ul>
        </li>
        <li class="al-ni" role="none" data-section="events"><a href="/pages/ansec-events.html" class="al-nl"><i class="ri-calendar-event-line"></i><span>Events</span></a></li>
        <li class="al-ni" role="none" data-section="gallery"><a href="/pages/ansec-gallery.html" class="al-nl"><i class="ri-camera-line"></i><span>Gallery</span></a></li>
        <li class="al-ni" role="none" data-section="contact"><a href="/pages/ansec-contact.html" class="al-nl"><i class="ri-map-pin-line"></i><span>Contact &amp; Location</span></a></li>
      </ul>
      <div class="al-panel-foot">
        <a href="/pages/ansec-donate.html" class="al-pf-donate"><i class="ri-heart-3-fill" aria-hidden="true"></i>Donate to ANSEC</a>
        <a href="/pages/ansec-alumni.html" class="al-pf-alumni"><i class="ri-user-star-line" aria-hidden="true"></i>Alumni Portal</a>
      </div>
    </div>
  </div>
</nav>
<div class="al-overlay" id="al-overlay" aria-hidden="true"></div>
`;


  /* ═══════════════════════════════════════════════════════════
     INLINE FOOTER
     Keep in sync with: /assets/components/ansec-footer-component.html
  ═══════════════════════════════════════════════════════════ */
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
        <div class="cs-col-v" style="margin-top:.65rem;font-size:.78rem">Mon &ndash; Fri &middot; 7:30 am &ndash; 4:30 pm</div>
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
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      document.body.appendChild(tmp);
    }
  }


  /* ═══════════════════════════════════════════════════════════
     ACTIVE NAV STATE
  ═══════════════════════════════════════════════════════════ */
  function setActiveNav() {
    const path = window.location.pathname;
    const section = ACTIVE_MAP[path];
    if (section) {
      document.querySelectorAll(`.al-ni[data-section="${section}"]`)
        .forEach(li => li.classList.add('al-active'));
      return;
    }
    for (const [key, val] of Object.entries(ACTIVE_MAP)) {
      if (path.includes(key.replace('/pages/', '').replace('.html', ''))) {
        document.querySelectorAll(`.al-ni[data-section="${val}"]`)
          .forEach(li => li.classList.add('al-active'));
        return;
      }
    }
  }


  /* ═══════════════════════════════════════════════════════════
     AUTO YEAR
  ═══════════════════════════════════════════════════════════ */
  function setYear() {
    const el = document.getElementById('ansec-year');
    if (el) el.textContent = new Date().getFullYear();
  }


  /* ═══════════════════════════════════════════════════════════
     FIX PAGE-LEVEL NAV BARS
     Removes constraining wrapper divs from the programmes and
     departments sticky nav bars so they scroll horizontally on
     mobile without being clipped by a max-width container.
  ═══════════════════════════════════════════════════════════ */
  function fixPageNavBars() {
    /* Programmes page: .prog-nav-wrap > .wrap > nav.prog-nav
       The inner .wrap clips overflow. Hoist nav out of it.     */
    const progWrap = document.querySelector('.prog-nav-wrap');
    if (progWrap) {
      const inner = progWrap.querySelector('.wrap');
      const nav   = progWrap.querySelector('.prog-nav');
      if (inner && nav) {
        progWrap.appendChild(nav);   // move nav directly into prog-nav-wrap
        inner.remove();              // kill the constraining wrapper
      }
      /* Ensure the nav itself is the scroller */
      progWrap.style.overflowX = 'auto';
      progWrap.style.webkitOverflowScrolling = 'touch';
      if (nav) {
        nav.style.minWidth     = 'max-content';
        nav.style.paddingInline = '1.5rem';
      }
    }

    /* Departments page: nav.dept-nav-bar > div.section > div.dept-nav-inner
       The .section wrapper clips overflow. Hoist inner out.   */
    const deptBar = document.querySelector('.dept-nav-bar');
    if (deptBar) {
      const section = deptBar.querySelector('.section');
      const inner   = deptBar.querySelector('.dept-nav-inner');
      if (section && inner) {
        deptBar.appendChild(inner);  // hoist inner out of .section
        section.remove();            // kill the constraining wrapper
      }
      /* The inner scroller already has overflow-x:auto on it   */
      if (inner) {
        inner.style.paddingInline = '1.5rem';
      }
    }
  }


  /* ═══════════════════════════════════════════════════════════
     NAVIGATION BEHAVIOUR
  ═══════════════════════════════════════════════════════════ */
  function initNav() {
    const sel    = (s, ctx = document) => ctx.querySelector(s);
    const selAll = (s, ctx = document) => [...ctx.querySelectorAll(s)];
    const mobile = () => window.innerWidth <= 992;

    /* non-touch flag for CSS :hover dropdowns */
    if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0) {
      document.documentElement.classList.add('al-no-touch');
    }

    const navbar   = sel('#al-navbar');
    const burger   = sel('#al-burger');
    const menu     = sel('#al-menu');
    const closeBtn = sel('#al-close');
    const overlay  = sel('#al-overlay');

    if (!navbar) return;

    let menuOpen = false;
    let scrolled = false;

    /* ── Mobile menu ── */
    function openMenu() {
      menuOpen = true;
      menu.classList.add('al-open');
      overlay && overlay.classList.add('al-vis');
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('al-locked');
      setTimeout(() => { closeBtn && closeBtn.focus(); }, 80);
    }

    function closeMenu() {
      if (!menuOpen) return;
      menuOpen = false;
      menu.classList.remove('al-open');
      overlay && overlay.classList.remove('al-vis');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('al-locked');
      burger.focus();
    }

    burger   && burger.addEventListener('click', e => { e.stopPropagation(); menuOpen ? closeMenu() : openMenu(); });
    closeBtn && closeBtn.addEventListener('click', closeMenu);
    overlay  && overlay.addEventListener('click', closeMenu);

    /* ── Dropdowns ── */
    function closeAllDrops(except = null) {
      selAll('.al-ni[data-drop].al-open').forEach(item => {
        if (item === except) return;
        item.classList.remove('al-open');
        const b = sel('.al-nl', item);
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }

    selAll('.al-ni[data-drop]').forEach(item => {
      const btn = sel('.al-nl', item);
      if (!btn) return;
      btn.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();
        const isOpen = item.classList.contains('al-open');
        closeAllDrops(isOpen ? null : item);
        if (isOpen) {
          item.classList.remove('al-open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('al-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', e => {
      if (!navbar.contains(e.target) && !(menu && menu.contains(e.target))) {
        closeAllDrops();
        if (mobile()) closeMenu();
      }
    });

    /* ── Scroll shadow ── */
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 40 && !scrolled)  { navbar.classList.add('al-scrolled');    scrolled = true;  }
      if (y <= 40 && scrolled)  { navbar.classList.remove('al-scrolled'); scrolled = false; }
    }, { passive: true });

    /* ── Resize ── */
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { if (!mobile()) { closeMenu(); closeAllDrops(); } }, 200);
    });

    /* ── Keyboard ── */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { if (menuOpen) closeMenu(); else closeAllDrops(); }
    });

    /* Arrow keys inside open dropdown */
    selAll('.al-drop, .al-mob-drop').forEach(dm => {
      const items = selAll('.al-di, .al-mob-di', dm);
      items.forEach((item, i) => {
        item.addEventListener('keydown', e => {
          if (e.key === 'ArrowDown') { e.preventDefault(); items[(i+1) % items.length].focus(); }
          if (e.key === 'ArrowUp')   { e.preventDefault(); items[(i-1+items.length) % items.length].focus(); }
        });
      });
    });

    /* Focus trap in mobile menu */
    menu && menu.addEventListener('keydown', e => {
      if (e.key !== 'Tab' || !menuOpen) return;
      const focusable = selAll('a[href],button:not([disabled])', menu).filter(el => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey  && document.activeElement === first) { e.preventDefault(); last.focus(); }
      if (!e.shiftKey && document.activeElement === last)  { e.preventDefault(); first.focus(); }
    });

    /* Body offset — push page content below fixed header */
    document.body.classList.add('al-offset');
  }


  /* ═══════════════════════════════════════════════════════════
     MAIN BOOTSTRAP
  ═══════════════════════════════════════════════════════════ */
  async function init() {
    injectCSS();

    if (CONFIG.useInlineComponents) {
      mountHeader(INLINE_HEADER);
      mountFooter(INLINE_FOOTER);
    } else {
      try {
        const [hr, fr] = await Promise.all([
          fetch(CONFIG.headerPath),
          fetch(CONFIG.footerPath),
        ]);
        if (!hr.ok) throw new Error(`Header: ${hr.status}`);
        if (!fr.ok) throw new Error(`Footer: ${fr.status}`);
        const [hHTML, fHTML] = await Promise.all([hr.text(), fr.text()]);
        mountHeader(hHTML);
        mountFooter(fHTML);
      } catch (err) {
        console.warn('[ANSEC Layout] Falling back to inline:', err.message);
        mountHeader(INLINE_HEADER);
        mountFooter(INLINE_FOOTER);
      }
    }

    setActiveNav();
    setYear();
    fixPageNavBars();
    initNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
