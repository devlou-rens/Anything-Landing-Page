// ============================================================
// SCROLL REVEAL — re-triggers every time element enters view
// ============================================================

(function () {
    const targets = [
        { sel: '.hero-left',        cls: 'slide-left'  },
        { sel: '.hero-image',       cls: 'slide-right' },
        { sel: '.info-header',      cls: ''            },
        { sel: '.card',             cls: ''            },
        { sel: '.cta-collage',      cls: 'slide-left'  },
        { sel: '.cta-copy',         cls: 'slide-right' },
        { sel: '.community-banner', cls: 'scale-in'    },
        { sel: '.contact-title',    cls: ''            },
        { sel: '.contact-icons',    cls: 'scale-in'    },
    ];

    targets.forEach(({ sel, cls }) => {
        document.querySelectorAll(sel).forEach(el => {
            el.classList.add('reveal');
            if (cls) el.classList.add(cls);
        });
    });

    function reAnimate(el) {
        el.classList.remove('visible');
        void el.offsetWidth;
        el.classList.add('visible');
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ============================================================
    // HAMBURGER — slide-in from right drawer
    // ============================================================
    const hamburger = document.querySelector('.hamburger');
    const drawer    = document.querySelector('.nav-drawer');
    const overlay   = document.querySelector('.nav-overlay');

    function openMenu() {
        if (!hamburger) return;
        hamburger.classList.add('open');
        if (drawer)  drawer.classList.add('open');
        if (overlay) overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!hamburger) return;
        hamburger.classList.remove('open');
        if (drawer)  drawer.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.contains('open') ? closeMenu() : openMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Nav link clicks — close drawer then scroll + re-animate
    document.querySelectorAll('.nav-drawer a, .links a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            closeMenu();

            const targetId = this.getAttribute('data-target');
            if (!targetId) return;

            setTimeout(() => {
                if (targetId === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const section = document.getElementById(targetId);
                    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }

                setTimeout(() => {
                    const section = targetId === 'home'
                        ? document.querySelector('.hero-container')
                        : document.getElementById(targetId);
                    if (!section) return;
                    section.querySelectorAll('.reveal').forEach((el, i) => {
                        setTimeout(() => reAnimate(el), i * 80);
                    });
                }, 300);
            }, 80);
        });
    });
})();