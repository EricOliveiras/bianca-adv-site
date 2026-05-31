document.addEventListener('DOMContentLoaded', () => {
    // Reveal on scroll
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        },
        { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));

    // Header scroll state
    const hdr = document.querySelector('.hdr');
    const onScroll = () => {
        if (window.scrollY > 28) {
            hdr.classList.add('scrolled');
        } else {
            hdr.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu
    const burgerOpens = document.querySelectorAll('.burger-open');
    const closeMenu = document.querySelector('.burger-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.m-link, .mobile-menu .btn');

    const setMenuOpen = (open) => {
        if (open) {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    };

    burgerOpens.forEach(b => b.addEventListener('click', () => setMenuOpen(true)));
    if (closeMenu) closeMenu.addEventListener('click', () => setMenuOpen(false));
    menuLinks.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

    // Testimonials Carousel
    const dots = document.querySelectorAll('.dot');
    const tCards = document.querySelectorAll('.testi-card');
    const prevBtn = document.querySelector('.tnav-btn.prev');
    const nextBtn = document.querySelector('.tnav-btn.next');
    let currentTesti = 0;
    const numTesti = tCards.length;
    let tInterval;

    const showTesti = (index) => {
        tCards.forEach((card, i) => {
            if (i === index) card.classList.add('active');
            else card.classList.remove('active');
        });
        dots.forEach((dot, i) => {
            if (i === index) dot.classList.add('on');
            else dot.classList.remove('on');
        });
        currentTesti = index;
    };

    const nextTesti = () => showTesti((currentTesti + 1) % numTesti);
    const prevTesti = () => showTesti((currentTesti - 1 + numTesti) % numTesti);

    if (numTesti > 0) {
        showTesti(0);
        if (prevBtn) prevBtn.addEventListener('click', () => { prevTesti(); resetInterval(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextTesti(); resetInterval(); });
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => { showTesti(i); resetInterval(); });
        });

        const resetInterval = () => {
            clearInterval(tInterval);
            tInterval = setInterval(nextTesti, 6500);
        };
        resetInterval();
    }

    // Fab
    const fabs = document.querySelectorAll('.fab, .fab-label');
    const onScrollFab = () => {
        const show = window.scrollY > 500;
        fabs.forEach(el => {
            if (show) el.classList.add('show');
            else el.classList.remove('show');
        });
    };
    window.addEventListener('scroll', onScrollFab, { passive: true });
    onScrollFab();

    // Form
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = form.querySelector('#nome');
            const email = form.querySelector('#email');
            const msg = form.querySelector('#msg');
            const formOk = document.querySelector('.form-ok');
            
            let hasError = false;
            
            const setError = (input, isError) => {
                const parent = input.parentElement;
                if (isError) {
                    parent.classList.add('err');
                    hasError = true;
                } else {
                    parent.classList.remove('err');
                }
            };
            
            setError(nome, !nome.value.trim());
            setError(email, !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
            setError(msg, !msg.value.trim());

            if (!hasError) {
                form.classList.add('hide');
                formOk.classList.add('show');
                const txt = encodeURIComponent(`Olá, Dra. Bianca! Meu nome é ${nome.value.trim()}.\n${msg.value.trim()}\n\nContato: ${email.value.trim()}`);
                window.open(`https://wa.me/5500000000000?text=${txt}`, "_blank", "noopener");
            }
        });
        
        const resetBtn = document.querySelector('#btn-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                const formOk = document.querySelector('.form-ok');
                formOk.classList.remove('show');
                form.classList.remove('hide');
                form.reset();
            });
        }
    }
});
