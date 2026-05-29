/* =====================================================
   CHINCHILLA RABBIT LANDING — SCRIPT
   ===================================================== */

'use strict';

/* ---- NAV: Scroll shadow + Mobile burger ---- */
(function initNav() {
    const nav = document.querySelector('.nav');
    const burger = document.getElementById('burger');
    const links = document.querySelector('.nav__links');

    if (!nav || !burger || !links) return;

    // Shadow on scroll
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Burger toggle
    burger.addEventListener('click', () => {
        const open = burger.classList.toggle('open');
        links.classList.toggle('nav--mobile-open', open);
        burger.setAttribute('aria-expanded', String(open));
    });

    // Close mobile nav on link click
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            burger.classList.remove('open');
            links.classList.remove('nav--mobile-open');
            burger.setAttribute('aria-expanded', 'false');
        });
    });
})();

/* ---- ACTIVE NAV LINK on scroll ---- */
(function initActiveLinks() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(a => {
                        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { rootMargin: '-50% 0px -49% 0px' }
    );

    sections.forEach(s => observer.observe(s));
})();

/* ---- SCROLL REVEAL ---- */
(function initReveal() {
    // Add class to all section children we want to animate
    const revealTargets = document.querySelectorAll(
        '.two-col, .cards-row, .appearance-grid, .fur-content, ' +
        '.productivity-grid, .feeding-wrap, .housing-grid, ' +
        '.breeding-content, .health-grid, .vaccination-table-wrap, ' +
        '.pros-cons-grid, .faq-item, .stat-item, .timeline__item, ' +
        '.variety-card, .housing-block, .breed-stat, .disease-item'
    );

    revealTargets.forEach((el, i) => {
        el.classList.add('reveal');
        // Stagger children of the same parent
        el.style.transitionDelay = `${(i % 5) * 80}ms`;
    });

    const io = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealTargets.forEach(el => io.observe(el));
})();

/* ---- FEED TABS ---- */
(function initFeedTabs() {
    const tabs = document.querySelectorAll('.feed-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('feed-tab--active'));
            tab.classList.add('feed-tab--active');

            // Hide all panels
            document.querySelectorAll('.feed-panel').forEach(p => {
                p.classList.remove('feed-panel--active');
            });

            // Show target panel
            const panel = document.getElementById(`tab-${target}`);
            if (panel) panel.classList.add('feed-panel--active');
        });
    });
})();

/* ---- FAQ ACCORDION ---- */
(function initFaq() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach((item, idx) => {
        const btn = item.querySelector('.faq-item__question');
        const answer = item.querySelector('.faq-item__answer');
        if (!btn || !answer) return;

        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', `faq-answer-${idx}`);
        answer.setAttribute('id', `faq-answer-${idx}`);

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all
            items.forEach(i => {
                i.classList.remove('open');
                const q = i.querySelector('.faq-item__question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });

            // Open clicked (unless it was already open)
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
})();

/* ---- SMOOTH SCROLL for #links ---- */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').slice(1);
            const el = id ? document.getElementById(id) : null;
            if (!el) return;

            e.preventDefault();
            const navH = document.querySelector('.nav')?.offsetHeight || 60;
            const top = el.getBoundingClientRect().top + window.scrollY - navH - 8;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();

/* ---- HERO IMAGE fallback ---- */
(function initImgFallbacks() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            // Replace broken image with a styled placeholder
            const wrap = this.closest('[class*="wrap"], [class*="section"], .hero__img-wrap');
            this.style.background = '#e4ddd3';
            this.style.objectFit = 'none';
            this.removeAttribute('src');
        });
    });
})();