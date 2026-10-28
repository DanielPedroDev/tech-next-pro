document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-button');
    const nav = document.querySelector('.nav');

    if (menuButton && nav) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('mobile-open');
            menuButton.setAttribute('aria-expanded', String(isOpen));
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-open');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Barra de progresso de leitura, leve e sem dependências externas.
    const progress = document.createElement('div');
    progress.className = 'tnp-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);

    const header = document.querySelector('.header');
    let ticking = false;
    const updateScrollUi = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        progress.style.width = Math.min(100, Math.max(0, percentage)) + '%';
        if (header) header.classList.toggle('tnp-scrolled', window.scrollY > 24);
        ticking = false;
    };
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollUi);
            ticking = true;
        }
    }, { passive: true });
    updateScrollUi();

    // Revela blocos conforme entram na tela, com fallback para navegadores antigos.
    const revealSelectors = [
        '.section-heading', '.section-title', '.hero-content', '.page-hero',
        '.service-card', '.product-card', '.portfolio-card', '.deliver-card',
        '.why-site-card', '.site-type-card', '.process-step', '.process-item',
        '.about-content', '.contact-card', '.feature-card', '.sites-hero-text',
        '.sites-hero-visual', '.footer-content > *'
    ];
    const revealItems = [...new Set(revealSelectors.flatMap((selector) =>
        Array.from(document.querySelectorAll(selector))
    ))];

    revealItems.forEach((item, index) => {
        if (item.closest('.tnp-no-motion')) return;
        item.classList.add('tnp-reveal');
        item.style.setProperty('--tnp-delay', (index % 4) * 75 + 'ms');
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, instance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('tnp-visible');
                    instance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('tnp-visible'));
    }

    // Movimento decorativo discreto para elementos visuais principais.
    document.querySelectorAll('.hero-visual, .sites-hero-visual, .hero-image, .hero-illustration')
        .forEach((item) => item.classList.add('tnp-hero-float'));
});
