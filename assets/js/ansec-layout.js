/**
 * ansec-layout.js  v2.0
 * ─────────────────────────────────────────────────────────────────────────
 * Injects the shared ANSEC header (topbar + navbar) and footer into every
 * page, then wires up all navigation behaviour.
 *
 * HOW TO USE — one line at the very end of <body>:
 *
 *   <script src="/assets/js/ansec-layout.js"></script>
 *
 * The script:
 *   • Injects its own <style> tag — no external CSS file needed
 *   • Embeds header + footer HTML inline — no fetch(), no server needed
 *   • Works on file://, Live Server, Netlify, GitHub Pages, everywhere
 *   • Auto-detects the current page and highlights the right nav item
 *
 * FOLDER STRUCTURE:
 *   /index.html
 *   /pages/ansec-*.html
 *   /assets/js/ansec-layout.js   ← this file
 *   /assets/images/anseclogo.jpg
 *
 * MOUNT POINTS (optional — auto-prepends/appends to <body> if absent):
 *   <div id="ansec-header"></div>  ← place at top of <body>
 *   <div id="ansec-footer"></div>  ← place at bottom of <body>
 * ─────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     ACTIVE-PAGE MAP
     Maps URL path fragments → data-section values on <li>
  ═══════════════════════════════════════════════════════════ */
  const ACTIVE_MAP = {
    'ansec-history':               'our-school',
    'ansec-mission-vision-values': 'our-school',
    'ansec-admin-staff':           'our-school',
    'ansec-campus-facilities':     'our-school',
    'ansec-anthem-motto':          'our-school',
    'ansec-programmes':            'academic-life',
    'ansec-departments':           'academic-life',
    'ansec-academic-calendar':     'academic-life',
    'ansec-chaplaincy':            'student-life',
    'ansec-clubs':                 'student-life',
    'ansec-sports':                'student-life',
    'ansec-boarding':              'student-life',
    'ansec-events':                'events',
    'ansec-gallery':               'gallery',
    'ansec-contact':               'contact',
    'ansec-donate':                '',
    'ansec-alumni':                '',
  };

  /* ═══════════════════════════════════════════════════════════
     INLINE CSS
     Injected as a <style> tag — no external file, no path issues.
  ═══════════════════════════════════════════════════════════ */
  const LAYOUT_CSS = `
/* ── ANSEC Layout — injected by ansec-layout.js ── */
:root {
  --accent:         #0071e3;
  --accent-soft:    rgba(0,113,227,.08);
  --accent-mid:     rgba(0,113,227,.18);
  --grad-btn:       linear-gradient(to right,#00b4ff,#6a00ff);
  --navy-900:       #0a1929;
  --navy-800:       #0f2744;
  --navy-700:       #1a3a5c;
  --navy-600:       #2d5278;
  --gold-600:       #b8941f;
  --gold-500:       #d4af37;
  --gold-400:       #ddc356;
  --presby-red:     #8b0000;
  --presby-red-h:   #a50000;
  --presby-red-glow:rgba(139,0,0,.28);
  --bg-page:        #f5f7fa;
  --bg-white:       #ffffff;
  --bg-dark:        #060f1e;
  --bg-darkblue:    #071428;
  --text-primary:   #0d1b2a;
  --text-body:      #3a4a5c;
  --text-muted:     #7a8fa6;
  --neutral-50:     #fafafa;
  --neutral-100:    #f5f5f5;
  --neutral-200:    #e5e5e5;
  --neutral-300:    #d4d4d4;
  --neutral-500:    #737373;
  --neutral-700:    #404040;
  --serif:          'Playfair Display',Georgia,serif;
  --lora:           'Lora',Georgia,serif;
  --sans:           'DM Sans',system-ui,sans-serif;
  --topbar-height:  56px;
  --navbar-height:  64px;
  --header-total:   calc(56px + 64px);
  --container-pad:  1.5rem;
  --tr:             .28s cubic-bezier(.22,1,.36,1);
  --tr-slow:        .45s cubic-bezier(.22,1,.36,1);
  --shadow-light:   rgba(10,25,41,.07);
  --shadow-medium:  rgba(10,25,41,.14);
  --shadow-heavy:   rgba(10,25,41,.25);
  --z-topbar:       1000;
  --z-navbar:       999;
  --z-dropdown:     998;
  --z-overlay:      997;
  --z-mobilemenu:   1001;
}

/* ── TOPBAR ── */
.topbar{position:fixed;top:0;left:0;width:100%;height:var(--topbar-height);background:linear-gradient(135deg,var(--navy-800),var(--navy-900));z-index:var(--z-topbar);border-bottom:1px solid rgba(255,255,255,.06)}
.topbar-inner{max-width:1400px;margin-inline:auto;padding-inline:var(--container-pad);height:100%;display:flex;align-items:center;justify-content:space-between}
.school-brand{display:flex;align-items:center;gap:.8rem;text-decoration:none}
.school-logo{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid var(--gold-500);box-shadow:0 0 0 3px rgba(212,175,55,.18);flex-shrink:0}
.school-name{font-family:var(--serif);font-size:1.15rem;font-weight:700;color:#fff;letter-spacing:.03em;line-height:1.2}
.school-name .sub-name{display:block;font-family:var(--sans);font-size:.58rem;font-weight:400;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-top:1px}
.topbar-actions{display:flex;align-items:center;gap:.6rem}
.alumni-link{display:flex;align-items:center;gap:.45rem;color:rgba(220,232,248,.8);font-family:var(--sans);font-size:.875rem;font-weight:500;padding:.44rem .85rem;border-radius:6px;text-decoration:none;transition:color var(--tr),background var(--tr)}
.alumni-link i{font-size:1.05rem}
.alumni-link:hover{color:var(--gold-400);background:rgba(255,255,255,.07)}
.donate-btn{display:inline-flex;align-items:center;gap:.45rem;background:var(--presby-red);color:#fff;font-family:var(--sans);font-size:.875rem;font-weight:600;padding:.52rem 1.15rem;border-radius:6px;box-shadow:0 2px 10px var(--presby-red-glow);text-decoration:none;transition:background var(--tr),transform var(--tr),box-shadow var(--tr);position:relative;overflow:hidden}
.donate-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.10),transparent);border-radius:inherit}
.donate-btn i{font-size:1rem}
.donate-btn:hover{background:var(--presby-red-h);transform:translateY(-1px);box-shadow:0 5px 18px var(--presby-red-glow)}
.donate-btn:active{transform:translateY(0)}
@media(max-width:679px){.tb-text{display:none}}

/* ── NAVBAR ── */
.navbar{position:fixed;top:var(--topbar-height);left:0;width:100%;height:var(--navbar-height);background:var(--bg-white);border-bottom:1px solid rgba(0,0,0,.07);box-shadow:0 1px 4px var(--shadow-light);z-index:var(--z-navbar);transition:box-shadow var(--tr),background var(--tr)}
.navbar.scrolled{background:rgba(255,255,255,.96);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 4px 20px var(--shadow-medium)}
.navbar-inner{max-width:1400px;margin-inline:auto;padding-inline:var(--container-pad);height:100%;display:flex;align-items:center;gap:1rem}
.nav-logo{font-family:var(--serif);font-size:1.55rem;font-weight:700;color:var(--navy-800);letter-spacing:.08em;white-space:nowrap;flex-shrink:0;text-decoration:none;transition:color var(--tr)}
.nav-logo em{font-style:normal;color:var(--presby-red)}
.nav-logo:hover{color:var(--gold-600)}
.navbar-menu{display:flex;align-items:center;margin-left:auto}
.navbar-nav{display:flex;align-items:center;gap:.15rem;list-style:none;padding:0;margin:0}
.nav-item{position:relative}
.nav-link{display:flex;align-items:center;gap:.4rem;padding:.62rem 1rem;border-radius:7px;font-family:var(--sans);font-size:.9rem;font-weight:500;color:var(--text-body);white-space:nowrap;text-decoration:none;background:none;border:none;cursor:pointer;transition:color var(--tr),background var(--tr)}
.nav-link i{font-size:1.05rem;flex-shrink:0}
.nav-link:hover{color:var(--navy-800);background:var(--neutral-100)}
.nav-item.is-active>.nav-link,.nav-item.is-active>.dropdown-toggle{color:var(--accent);background:var(--accent-soft)}
.dropdown-caret{font-size:1.1rem;margin-left:.1rem;transition:transform var(--tr);flex-shrink:0}
.nav-item.open>.dropdown-toggle .dropdown-caret{transform:rotate(180deg)}
.dropdown-menu{position:absolute;top:calc(100% + 6px);left:0;min-width:248px;background:var(--bg-white);border:1px solid rgba(0,0,0,.06);border-radius:10px;padding:.45rem;box-shadow:0 8px 28px var(--shadow-medium),0 2px 8px var(--shadow-light);opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity var(--tr),transform var(--tr),visibility var(--tr);z-index:var(--z-dropdown);pointer-events:none;list-style:none;margin:0}
.nav-item.open .dropdown-menu,.no-touch .nav-item:hover .dropdown-menu{opacity:1;visibility:visible;transform:translateY(0);pointer-events:auto}
.dropdown-item{display:flex;align-items:center;gap:.75rem;padding:.68rem .9rem;border-radius:6px;font-family:var(--sans);font-size:.875rem;font-weight:400;color:var(--text-body);width:100%;text-align:left;text-decoration:none;background:none;border:none;cursor:pointer;transition:color var(--tr),background var(--tr),padding-left var(--tr)}
.dropdown-item i{font-size:1.05rem;color:var(--neutral-500);flex-shrink:0;transition:color var(--tr)}
.dropdown-item:hover{background:var(--neutral-100);color:var(--navy-800);padding-left:1.1rem}
.dropdown-item:hover i{color:var(--accent)}

/* ── HAMBURGER ── */
.navbar-toggle{display:none;width:44px;height:44px;align-items:center;justify-content:center;border-radius:8px;flex-shrink:0;margin-left:auto;background:none;border:none;cursor:pointer;transition:background var(--tr);position:relative;z-index:var(--z-mobilemenu)}
.navbar-toggle:hover{background:var(--neutral-100)}
.hb{width:22px;display:flex;flex-direction:column;gap:5px}
.hb span{display:block;height:2px;border-radius:2px;background:var(--navy-800);transition:transform var(--tr),opacity var(--tr),width var(--tr);transform-origin:center}
.hb span:nth-child(2){width:75%;align-self:flex-end}
.navbar-toggle[aria-expanded="true"] .hb span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.navbar-toggle[aria-expanded="true"] .hb span:nth-child(2){opacity:0;transform:scaleX(0)}
.navbar-toggle[aria-expanded="true"] .hb span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

/* ── MOBILE OVERLAY ── */
.mobile-overlay{display:none;position:fixed;inset:0;background:rgba(6,15,30,.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);z-index:var(--z-overlay);opacity:0;pointer-events:none;transition:opacity var(--tr-slow)}
.mobile-overlay.visible{opacity:1;pointer-events:auto}

/* ── MOBILE MENU PANEL ── */
@media(max-width:992px){
  .navbar-toggle{display:flex}
  .navbar-menu{position:fixed;top:0;right:0;width:min(320px,88vw);height:100dvh;background:var(--bg-white);z-index:var(--z-mobilemenu);display:flex;flex-direction:column;transform:translateX(110%);transition:transform var(--tr-slow);overflow-y:auto;overscroll-behavior:contain;box-shadow:-6px 0 32px var(--shadow-heavy);margin-left:0;padding-top:calc(var(--topbar-height) + .8rem)}
  .navbar-menu.open{transform:translateX(0)}
  .mobile-overlay{display:block;pointer-events:none}
  .navbar-nav{flex-direction:column;align-items:stretch;gap:0;padding:1rem}
  .nav-link{padding:.85rem 1rem;border-radius:8px}
  .dropdown-menu{position:static;opacity:1;visibility:visible;transform:none;box-shadow:none;border:none;background:var(--neutral-50);border-radius:8px;padding:.3rem .3rem .3rem 1.5rem;margin-top:.2rem;display:none;pointer-events:auto}
  .nav-item.open .dropdown-menu{display:block}
  .mobile-menu-header{display:flex;align-items:center;justify-content:space-between;padding:1.2rem 1.5rem;border-bottom:1px solid var(--neutral-200);flex-shrink:0}
  .mobile-menu-label{font-family:var(--serif);font-size:1.1rem;font-weight:700;color:var(--text-primary)}
  .mobile-close-btn{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:6px;background:none;border:none;cursor:pointer;font-size:1.3rem;color:var(--text-body);transition:background var(--tr)}
  .mobile-close-btn:hover{background:var(--neutral-100)}
  .mobile-footer{margin-top:auto;padding:1.5rem;border-top:1px solid var(--neutral-200);display:flex;flex-direction:column;gap:.7rem;flex-shrink:0}
  .mobile-footer .donate-btn,.mobile-footer .alumni-link{justify-content:center;width:100%;padding:.72rem 1rem}
}
@media(min-width:993px){.mobile-menu-header,.mobile-footer{display:none}}

/* ── FOOTER ── */
.contact-strip{background:var(--navy-900);border-top:1px solid rgba(255,255,255,.06);padding-block:3rem}
.contact-strip .wrap{max-width:1400px;padding-inline:var(--container-pad);margin-inline:auto}
.cs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
@media(max-width:700px){.cs-grid{grid-template-columns:1fr}}
.cs-col{display:flex;flex-direction:column;gap:.5rem}
.cs-col-h{display:flex;align-items:center;gap:.5rem;font-family:var(--sans);font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(0,180,255,.6);margin-bottom:.3rem}
.cs-col-h i{font-size:.9rem}
.cs-col-v{font-family:var(--sans);font-size:.88rem;font-weight:500;color:rgba(220,235,255,.75)}
.cs-col-s{font-family:var(--sans);font-size:.77rem;font-weight:300;color:rgba(140,175,220,.45)}
.cs-divider{height:1px;background:rgba(255,255,255,.06);margin-top:2rem}
.cs-footer-row{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;padding-top:1.5rem}
.cs-copy{font-family:var(--sans);font-size:.72rem;color:rgba(140,175,220,.4)}
.cs-links{display:flex;align-items:center;gap:1rem;flex-wrap:wrap}
.cs-link{font-family:var(--sans);font-size:.72rem;color:rgba(140,175,220,.5);text-decoration:none;transition:color var(--tr)}
.cs-link:hover{color:rgba(0,180,255,.75)}

/* ── UTILITY ── */
body.menu-open{overflow:hidden}
`;

  /* ═══════════════════════════════════════════════════════════
     INLINE HEADER HTML
  ═══════════════════════════════════════════════════════════ */
  const INLINE_HEADER = `
<div class="topbar" id="topbar">
  <div class="topbar-inner">
    <a href="/index.html" class="school-brand">
      <img src="/assets/images/anseclogo.jpg" alt="ANSEC Logo" class="school-logo"
           width="40" height="40" onerror="this.style.display='none'"/>
      <span class="school-name">
        Anum Presby SHS
        <span class="sub-name">Est. 1937 &middot; Anum, Ghana</span>
      </span>
    </a>
    <div class="topbar-actions">
      <a href="/pages/ansec-alumni.html" class="alumni-link">
        <i class="ri-user-star-line" aria-hidden="true"></i>
        <span class="tb-text">Alumni</span>
      </a>
      <a href="/pages/ansec-donate.html" class="donate-btn">
        <i class="ri-heart-3-fill" aria-hidden="true"></i>
        <span class="tb-text">Donate</span>
      </a>
    </div>
  </div>
</div>

<nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
  <div class="navbar-inner">
    <a href="/index.html" class="nav-logo" aria-label="ANSEC home">AN<em>SEC</em></a>

    <button class="navbar-toggle" id="navToggle"
            aria-label="Open navigation menu" aria-expanded="false" aria-controls="navMenu">
      <span class="hb" aria-hidden="true"><span></span><span></span><span></span></span>
    </button>

    <div class="navbar-menu" id="navMenu" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div class="mobile-menu-header">
        <span class="mobile-menu-label">Navigation</span>
        <button class="mobile-close-btn" id="navClose" aria-label="Close menu">
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
            <li><a href="/pages/ansec-history.html" class="dropdown-item" role="menuitem"><i class="ri-time-line"></i>Our History</a></li>
            <li><a href="/pages/ansec-mission-vision-values.html" class="dropdown-item" role="menuitem"><i class="ri-eye-line"></i>Mission, Vision &amp; Values</a></li>
            <li><a href="/pages/ansec-admin-staff.html" class="dropdown-item" role="menuitem"><i class="ri-user-star-line"></i>Administration &amp; Staff</a></li>
            <li><a href="/pages/ansec-campus-facilities.html" class="dropdown-item" role="menuitem"><i class="ri-school-line"></i>Campus &amp; Facilities</a></li>
            <li><a href="/pages/ansec-anthem-motto.html" class="dropdown-item" role="menuitem"><i class="ri-music-2-line"></i>School Anthem &amp; Motto</a></li>
          </ul>
        </li>

        <li class="nav-item has-dropdown" role="none" data-section="academic-life">
          <button class="nav-link dropdown-toggle" aria-expanded="false" aria-haspopup="true" role="menuitem">
            <i class="ri-book-open-line" aria-hidden="true"></i><span>Academic Life</span>
            <i class="ri-arrow-down-s-line dropdown-caret" aria-hidden="true"></i>
          </button>
          <ul class="dropdown-menu" role="menu">
            <li><a href="/pages/ansec-programmes.html" class="dropdown-item" role="menuitem"><i class="ri-graduation-cap-line"></i>Programmes Offered</a></li>
            <li><a href="/pages/ansec-departments.html" class="dropdown-item" role="menuitem"><i class="ri-building-4-line"></i>Academic Departments</a></li>
            <li><a href="/pages/ansec-academic-calendar.html" class="dropdown-item" role="menuitem"><i class="ri-calendar-2-line"></i>Academic Calendar</a></li>
          </ul>
        </li>

        <li class="nav-item has-dropdown" role="none" data-section="student-life">
          <button class="nav-link dropdown-toggle" aria-expanded="false" aria-haspopup="true" role="menuitem">
            <i class="ri-user-smile-line" aria-hidden="true"></i><span>Faith &amp; Student Life</span>
            <i class="ri-arrow-down-s-line dropdown-caret" aria-hidden="true"></i>
          </button>
          <ul class="dropdown-menu" role="menu">
            <li><a href="/pages/ansec-chaplaincy.html" class="dropdown-item" role="menuitem"><i class="ri-cross-line"></i>Chaplaincy &amp; Worship</a></li>
            <li><a href="/pages/ansec-clubs.html" class="dropdown-item" role="menuitem"><i class="ri-group-line"></i>Clubs &amp; Activities</a></li>
            <li><a href="/pages/ansec-sports.html" class="dropdown-item" role="menuitem"><i class="ri-football-line"></i>Sports &amp; Athletics</a></li>
            <li><a href="/pages/ansec-boarding.html" class="dropdown-item" role="menuitem"><i class="ri-home-heart-line"></i>Boarding &amp; Pastoral Care</a></li>
          </ul>
        </li>

        <li class="nav-item" role="none" data-section="events">
          <a href="/pages/ansec-events.html" class="nav-link" role="menuitem">
            <i class="ri-calendar-event-line" aria-hidden="true"></i><span>Events</span>
          </a>
        </li>

        <li class="nav-item" role="none" data-section="gallery">
          <a href="/pages/ansec-gallery.html" class="nav-link" role="menuitem">
            <i class="ri-camera-line" aria-hidden="true"></i><span>Gallery</span>
          </a>
        </li>

        <li class="nav-item" role="none" data-section="contact">
          <a href="/pages/ansec-contact.html" class="nav-link" role="menuitem">
            <i class="ri-map-pin-line" aria-hidden="true"></i><span>Contact &amp; Location</span>
          </a>
        </li>

      </ul>

      <div class="mobile-footer">
        <a href="/pages/ansec-donate.html" class="donate-btn"><i class="ri-heart-3-fill"></i><span>Donate to ANSEC</span></a>
        <a href="/pages/ansec-alumni.html" class="alumni-link"><i class="ri-user-star-line"></i><span>Alumni Portal</span></a>
      </div>
    </div>
  </div>
</nav>
<div class="mobile-overlay" id="navOverlay" aria-hidden="true"></div>
`;

  /* ═══════════════════════════════════════════════════════════
     INLINE FOOTER HTML
  ═══════════════════════════════════════════════════════════ */
  const INLINE_FOOTER = `
<footer id="ansec-footer-strip" class="contact-strip" aria-label="Site footer">
  <div class="wrap">
    <div class="cs-grid">
      <div class="cs-col">
        <div class="cs-col-h"><i class="ri-map-pin-line" aria-hidden="true"></i>Location</div>
        <div class="cs-col-v">Anum, Eastern Region</div>
        <div class="cs-col-s">Ghana, West Africa</div>
        <div class="cs-col-s" style="margin-top:.4rem">Accessible via Accra&ndash;Kumasi Highway,<br>exit at Anum Junction</div>
      </div>
      <div class="cs-col">
        <div class="cs-col-h"><i class="ri-phone-line" aria-hidden="true"></i>Contact</div>
        <div class="cs-col-v">+233 (0) XXX XXX XXXX</div>
        <div class="cs-col-s">admissions@ansec.edu.gh</div>
        <div class="cs-col-s">info@ansec.edu.gh</div>
        <div class="cs-col-v" style="margin-top:.65rem;font-size:.78rem">Mon &ndash; Fri &middot; 7:30 am &ndash; 4:30 pm</div>
      </div>
      <div class="cs-col">
        <div class="cs-col-h"><i class="ri-links-line" aria-hidden="true"></i>Connect</div>
        <div style="display:flex;gap:.7rem;flex-wrap:wrap;margin-top:.2rem">
          <a href="#" class="cs-link" aria-label="Facebook"><i class="ri-facebook-circle-line" style="font-size:1.2rem;color:rgba(0,180,255,.55)"></i></a>
          <a href="#" class="cs-link" aria-label="Twitter / X"><i class="ri-twitter-x-line" style="font-size:1.2rem;color:rgba(0,180,255,.55)"></i></a>
          <a href="#" class="cs-link" aria-label="YouTube"><i class="ri-youtube-line" style="font-size:1.2rem;color:rgba(0,180,255,.55)"></i></a>
          <a href="#" class="cs-link" aria-label="Instagram"><i class="ri-instagram-line" style="font-size:1.2rem;color:rgba(0,180,255,.55)"></i></a>
        </div>
        <a href="/pages/ansec-mission-vision-values.html" class="cs-link" style="margin-top:1rem;display:inline-flex;align-items:center;gap:.4rem">Mission &amp; Values <i class="ri-arrow-right-line" style="font-size:.8rem"></i></a><br>
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
     Creates a single <style> tag in <head> — works everywhere.
  ═══════════════════════════════════════════════════════════ */
  function injectCSS() {
    if (document.getElementById('ansec-layout-css')) return;
    const style = document.createElement('style');
    style.id = 'ansec-layout-css';
    style.textContent = LAYOUT_CSS;
    document.head.insertBefore(style, document.head.firstChild);
  }

  /* ═══════════════════════════════════════════════════════════
     MOUNT HEADER + FOOTER
  ═══════════════════════════════════════════════════════════ */
  function mountHeader() {
    // Skip if already present (page has own inline header)
    if (document.getElementById('topbar')) return;

    const mount = document.getElementById('ansec-header');
    const tmp = document.createElement('div');
    tmp.innerHTML = INLINE_HEADER;

    if (mount) {
      mount.replaceWith(...tmp.childNodes);
    } else {
      // Prepend all nodes to body
      while (tmp.firstChild) {
        document.body.insertBefore(tmp.firstChild, document.body.firstChild);
      }
    }
  }

  function mountFooter() {
    // Skip if already present (page has own inline footer)
    if (document.getElementById('ansec-footer-strip') ||
        document.querySelector('.contact-strip')) return;

    const mount = document.getElementById('ansec-footer');
    const tmp = document.createElement('div');
    tmp.innerHTML = INLINE_FOOTER;

    if (mount) {
      mount.replaceWith(...tmp.childNodes);
    } else {
      while (tmp.firstChild) {
        document.body.appendChild(tmp.firstChild);
      }
    }
  }

  /* ═══════════════════════════════════════════════════════════
     ACTIVE NAV STATE
     Reads the current URL and highlights the matching nav item.
  ═══════════════════════════════════════════════════════════ */
  function setActiveNav() {
    const path = window.location.pathname;

    // Match against slug keywords
    let activeSection = null;
    for (const [slug, section] of Object.entries(ACTIVE_MAP)) {
      if (path.includes(slug)) {
        activeSection = section;
        break;
      }
    }

    if (activeSection) {
      const li = document.querySelector(`.nav-item[data-section="${activeSection}"]`);
      if (li) li.classList.add('is-active');
    }
  }

  /* ═══════════════════════════════════════════════════════════
     AUTO YEAR
  ═══════════════════════════════════════════════════════════ */
  function setYear() {
    const el = document.getElementById('ansec-year');
    if (el) el.textContent = new Date().getFullYear();
    // Also update footerYear id used by some pages
    const el2 = document.getElementById('footerYear');
    if (el2) el2.textContent = new Date().getFullYear();
  }

  /* ═══════════════════════════════════════════════════════════
     NAV BEHAVIOUR
     Dropdowns · mobile menu · scroll effect · keyboard nav
  ═══════════════════════════════════════════════════════════ */
  function initNav() {
    const sel    = (s, ctx = document) => ctx.querySelector(s);
    const selAll = (s, ctx = document) => [...ctx.querySelectorAll(s)];
    const mobile = () => window.innerWidth <= 992;

    // Non-touch flag — enables CSS :hover on dropdowns for desktop
    if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0) {
      document.body.classList.add('no-touch');
    }

    const navbar   = sel('#navbar');
    const toggle   = sel('#navToggle');
    const menu     = sel('#navMenu');
    const closeBtn = sel('#navClose');
    const overlay  = sel('#navOverlay');

    if (!navbar || !toggle) return; // guard if header already exists and has own JS

    let menuOpen = false, scrolled = false;

    /* ── Mobile menu ── */
    function openMenu() {
      menuOpen = true;
      menu.classList.add('open');
      overlay && overlay.classList.add('visible');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
      document.body.classList.add('menu-open');
      setTimeout(() => { closeBtn && closeBtn.focus(); }, 80);
    }
    function closeMenu(returnFocus = false) {
      if (!menuOpen) return;
      menuOpen = false;
      menu.classList.remove('open');
      overlay && overlay.classList.remove('visible');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      document.body.classList.remove('menu-open');
      if (returnFocus) toggle.focus();
    }

    toggle   && toggle.addEventListener('click',   e => { e.stopPropagation(); menuOpen ? closeMenu(true) : openMenu(); });
    closeBtn && closeBtn.addEventListener('click',  () => closeMenu(true));
    overlay  && overlay.addEventListener('click',   () => closeMenu(false));

    /* ── Dropdowns ── */
    function closeAllDropdowns() {
      selAll('.nav-item.has-dropdown.open').forEach(item => {
        item.classList.remove('open');
        const t = sel('.dropdown-toggle', item);
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }

    selAll('.dropdown-toggle').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();
        const item   = btn.closest('.nav-item');
        const isOpen = item.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      });
    });

    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        closeAllDropdowns();
        // Only close the mobile menu on outside click — don't steal focus
        if (mobile() && menuOpen) closeMenu();
      }
    });

    /* ── Scroll effect ── */
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 40 && !scrolled)  { navbar.classList.add('scrolled');    scrolled = true;  }
      if (y <= 40 && scrolled)  { navbar.classList.remove('scrolled'); scrolled = false; }
    }, { passive: true });

    /* ── Resize ── */
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { if (!mobile()) { closeMenu(); closeAllDropdowns(); } }, 200);
    });

    /* ── Keyboard ── */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { if (menuOpen) { closeMenu(true); return; } closeAllDropdowns(); }
    });

    // Arrow key navigation inside open dropdowns
    selAll('.dropdown-menu').forEach(dm => {
      const items = selAll('.dropdown-item', dm);
      items.forEach((item, i) => {
        item.addEventListener('keydown', e => {
          if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
          if (e.key === 'ArrowUp')   { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
        });
      });
    });

    // Focus trap inside mobile menu
    menu && menu.addEventListener('keydown', e => {
      if (e.key !== 'Tab' || !menuOpen) return;
      const focusable = selAll('a[href], button:not([disabled])', menu)
        .filter(el => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     SCROLL REVEAL  (for pages that use .rv / .reveal classes)
  ═══════════════════════════════════════════════════════════ */
  function initReveal() {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .rv, .rv-l, .rv-r')
      .forEach(el => io.observe(el));
  }

  /* ═══════════════════════════════════════════════════════════
     BOOTSTRAP
  ═══════════════════════════════════════════════════════════ */
  function init() {
    injectCSS();
    mountHeader();
    mountFooter();
    setActiveNav();
    setYear();
    initNav();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
