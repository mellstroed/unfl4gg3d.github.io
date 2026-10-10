document.addEventListener('DOMContentLoaded', () => {
    // 1. Splash Intro Screen (Smooth fade out)
    const siteIntro = document.getElementById('siteIntro');
    if (siteIntro) {
        setTimeout(() => {
            siteIntro.classList.add('fade-out');
            setTimeout(() => {
                siteIntro.style.display = 'none';
            }, 800);
        }, 1600);
    }

    // 2. Mobile Burger Menu
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
        navMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => navMenu.classList.remove('open'));
        });
    }

    // 3. GUI Mockup Interactions (1:1 systemdlc replica)
    // Categories
    const catBtns = document.querySelectorAll('.cat-btn');
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Search filter for modules
    const searchInput = document.getElementById('guiModuleSearch');
    const moduleRows = document.querySelectorAll('.module-row');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            moduleRows.forEach(row => {
                const name = row.querySelector('.mod-name')?.textContent.toLowerCase() || '';
                if (name.includes(query)) {
                    row.style.display = 'flex';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Module rows & inspector view switching
    const inspViews = document.querySelectorAll('.insp-view');
    moduleRows.forEach(row => {
        row.addEventListener('click', () => {
            moduleRows.forEach(r => r.classList.remove('active'));
            row.classList.add('active');

            const viewName = row.getAttribute('data-view');
            inspViews.forEach(v => {
                if (v.id === `view-${viewName}`) {
                    v.style.display = 'block';
                } else {
                    v.style.display = 'none';
                }
            });
        });

        // Toggle switch
        const sw = row.querySelector('.mod-switch');
        if (sw) {
            sw.addEventListener('click', (e) => {
                e.stopPropagation();
                sw.classList.toggle('on');
            });
        }
    });

    // Segmented Controls
    document.querySelectorAll('.segmented-control').forEach(ctrl => {
        const btns = ctrl.querySelectorAll('.seg-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });

    // Condition Pills Toggle
    document.querySelectorAll('.cond-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            pill.classList.toggle('active');
            const cleanText = pill.textContent.replace('✓', '').trim();
            if (pill.classList.contains('active')) {
                pill.textContent = '✓ ' + cleanText;
            } else {
                pill.textContent = cleanText;
            }
        });
    });

    // Pre-distance interactive range slider
    const rangeSlider = document.getElementById('rangeSlider');
    const rangeVal = document.getElementById('rangeVal');
    if (rangeSlider && rangeVal) {
        rangeSlider.addEventListener('input', (e) => {
            rangeVal.textContent = `${parseFloat(e.target.value).toFixed(1)} блок(ов)`;
        });
    }

    // WDA stream-proof toggle pill
    const wdaToggle = document.getElementById('wdaToggle');
    if (wdaToggle) {
        wdaToggle.addEventListener('click', () => {
            wdaToggle.classList.toggle('active');
            if (wdaToggle.classList.contains('active')) {
                wdaToggle.textContent = 'ВКЛЮЧЕНО';
            } else {
                wdaToggle.textContent = 'ОТКЛЮЧЕНО';
            }
        });
    }

    // 4. Copy Buttons & Toast
    const toast = document.getElementById('toast');
    let toastTimer;

    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg || 'Скопировано в буфер обмена!';
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2400);
    }

    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetElem = document.getElementById(targetId);
            if (!targetElem) return;

            const text = targetElem.innerText.trim();
            navigator.clipboard.writeText(text).then(() => {
                const label = btn.querySelector('span');
                const orig = label ? label.textContent : '';
                if (label) label.textContent = 'Готово!';
                btn.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                btn.style.color = '#ffffff';

                showToast('Команда скопирована в буфер обмена!');

                setTimeout(() => {
                    if (label) label.textContent = orig;
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2000);
            }).catch(() => {
                showToast('Ошибка при копировании');
            });
        });
    });

    // 5. FAQ Accordion
    const faqRows = document.querySelectorAll('.faq-row');
    faqRows.forEach(row => {
        const trigger = row.querySelector('.faq-trigger');
        const collapse = row.querySelector('.faq-collapse');
        if (!trigger || !collapse) return;

        trigger.addEventListener('click', () => {
            const isOpen = row.classList.contains('active');

            // Close others
            faqRows.forEach(other => {
                other.classList.remove('active');
                const c = other.querySelector('.faq-collapse');
                if (c) c.style.maxHeight = null;
            });

            if (!isOpen) {
                row.classList.add('active');
                collapse.style.maxHeight = collapse.scrollHeight + 'px';
            }
        });
    });
});
