// particles
function initParticles() {
    const c = document.getElementById('particles');
    if (!c) return;
    for (let i = 0; i < 22; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 12 + 8) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        const s = (Math.random() * 2 + 1) + 'px';
        p.style.width = p.style.height = s;
        c.appendChild(p);
    }
}

// minecraft particles
function initMcParticles() {
    const c = document.getElementById('mcParticles');
    if (!c) return;
    for (let i = 0; i < 45; i++) {
        const p = document.createElement('div');
        p.className = 'mc-dot';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 18 + 10) + 's';
        p.style.animationDelay = (Math.random() * 12) + 's';
        p.style.setProperty('--tx', (Math.random() - 0.5) * 180 + 'px');
        p.style.setProperty('--ty', (Math.random() - 0.5) * 180 + 'px');
        const s = (Math.random() * 2 + 1) + 'px';
        p.style.width = p.style.height = s;
        c.appendChild(p);
    }
}

// navbar scroll
function initNav() {
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 30
            ? 'rgba(7,7,14,0.97)'
            : 'rgba(7,7,14,0.8)';
    });
}

// burger
function initBurger() {
    const btn = document.getElementById('burger');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        const [a, b, c] = btn.querySelectorAll('span');
        if (open) {
            a.style.transform = 'rotate(45deg) translate(5px,5px)';
            b.style.opacity = '0';
            c.style.transform = 'rotate(-45deg) translate(5px,-5px)';
        } else {
            [a,b,c].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });
}

// faq
function initFaq() {
    document.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const ans = item.querySelector('.faq-a');
            const open = item.classList.contains('open');

            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-a').style.maxHeight = '0';
            });

            if (!open) {
                item.classList.add('open');
                ans.style.maxHeight = ans.scrollHeight + 'px';
            }
        });
    });
}

// scroll animations
function initAnim() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.pop-card, .cheat-tile, .faq-item, .dl-box').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.45s ease ${i * 0.05}s, transform 0.45s ease ${i * 0.05}s`;
        obs.observe(el);
    });
}

// scroll to download
function initScrollDownload() {
    document.querySelectorAll('.scroll-to-download').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// font switcher
function initFonts() {
    const toggle = document.getElementById('fontToggle');
    const dropdown = document.getElementById('fontDropdown');
    const options = document.querySelectorAll('.font-option');
    if (!toggle || !dropdown) return;

    const map = { default: '', pixel: 'font-pixel', slab: 'font-slab', google: 'font-google', moyenage: 'font-moyenage' };

    const saved = localStorage.getItem('unfl_font') || 'default';
    apply(saved);
    document.querySelector(`.font-option[data-font="${saved}"]`)?.classList.add('active');

    toggle.addEventListener('click', e => { e.stopPropagation(); dropdown.classList.toggle('open'); });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
    dropdown.addEventListener('click', e => e.stopPropagation());

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            const f = opt.dataset.font;
            options.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            apply(f);
            localStorage.setItem('unfl_font', f);
            dropdown.classList.remove('open');
        });
    });

    function apply(f) {
        document.body.classList.remove('font-pixel', 'font-slab', 'font-google', 'font-moyenage');
        if (map[f]) document.body.classList.add(map[f]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initMcParticles();
    initNav();
    initBurger();
    initFaq();
    initAnim();
    initScrollDownload();
    initFonts();
});
