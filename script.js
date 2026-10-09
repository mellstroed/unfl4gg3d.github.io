document.addEventListener('DOMContentLoaded', () => {
    // Burger Menu
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const spans = burger.querySelectorAll('span');
            if (navLinks.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close burger on click nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    const spans = burger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-q');
        const ans = item.querySelector('.faq-a');
        if (!btn || !ans) return;

        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(other => {
                other.classList.remove('active');
                const otherAns = other.querySelector('.faq-a');
                if (otherAns) otherAns.style.maxHeight = null;
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                ans.style.maxHeight = ans.scrollHeight + 'px';
            }
        });
    });

    // Copy Command to Clipboard
    const toast = document.getElementById('toast');
    let toastTimeout;

    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg || 'Команда скопирована!';
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetElem = document.getElementById(targetId);
            if (!targetElem) return;

            const textToCopy = targetElem.innerText.trim();
            navigator.clipboard.writeText(textToCopy).then(() => {
                const btnText = btn.querySelector('.btn-text') || btn.querySelector('span');
                const originalText = btnText ? btnText.textContent : '';
                if (btnText) btnText.textContent = 'Скопировано!';
                btn.style.background = 'var(--green)';
                btn.style.color = '#05070b';

                showToast('Команда скопирована в буфер обмена!');

                setTimeout(() => {
                    if (btnText) btnText.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Clipboard copy failed:', err);
                showToast('Не удалось скопировать команду');
            });
        });
    });

    // Navbar Scroll Tint
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (!nav) return;
        if (window.scrollY > 40) {
            nav.style.background = 'rgba(7, 9, 14, 0.95)';
            nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(7, 9, 14, 0.85)';
            nav.style.boxShadow = 'none';
        }
    });
});
