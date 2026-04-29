document.querySelectorAll('.links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('data-target');
        if (target === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.getElementById(target).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

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
 
    // Attach base classes once
    targets.forEach(({ sel, cls }) => {
        document.querySelectorAll(sel).forEach(el => {
            el.classList.add('reveal');
            if (cls) el.classList.add(cls);
        });
    });
 
    // Helper: reset then re-trigger an element's animation
    function reAnimate(el) {
        el.classList.remove('visible');
        // force reflow so the browser registers the removal before re-adding
        void el.offsetWidth;
        el.classList.add('visible');
    }
 
    // IntersectionObserver — NO unobserve, so it fires every entry/exit
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    // reset when element scrolls out so it can re-animate next time
                    entry.target.classList.remove('visible');
                }
            });
        },
        { threshold: 0.15 }
    );
 
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
 
    // Nav button clicks — re-animate all reveals inside the target section
    document.querySelectorAll('.links a').forEach(link => {
        link.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            if (!targetId) return;
 
            // small delay so the scroll has started before we fire animations
            setTimeout(() => {
                const section = targetId === 'home'
                    ? document.querySelector('.hero-container')
                    : document.getElementById(targetId);
 
                if (!section) return;
 
                section.querySelectorAll('.reveal').forEach((el, i) => {
                    // stagger each child slightly
                    setTimeout(() => reAnimate(el), i * 80);
                });
            }, 120);
        });
    });
})();