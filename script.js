document.addEventListener('DOMContentLoaded', () => {
    // Mobile Burger Menu
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

    // GUI Category Selector
    const catBtns = document.querySelectorAll('.cat-btn');
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // GUI Module Rows
    const moduleRows = document.querySelectorAll('.module-row');
    const inspTitle = document.querySelector('.insp-title');
    const inspBind = document.querySelector('.insp-bind-chip span');

    moduleRows.forEach(row => {
        row.addEventListener('click', () => {
            moduleRows.forEach(r => r.classList.remove('active'));
            row.classList.add('active');

            const name = row.querySelector('.mod-name')?.textContent || 'Module';
            const bind = row.querySelector('.mod-bind')?.textContent || 'None';
            if (inspTitle) inspTitle.textContent = name;
            if (inspBind) inspBind.textContent = bind;
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
            if (pill.classList.contains('active')) {
                if (!pill.textContent.startsWith('✓')) {
                    pill.textContent = '✓ ' + pill.textContent.trim();
                }
            } else {
                pill.textContent = pill.textContent.replace('✓', '').trim();
            }
        });
    });

    // Copy Buttons & Toast
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
                btn.style.borderColor = 'var(--emerald-accent)';
                btn.style.color = 'var(--emerald-accent)';

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

    // FAQ Accordion
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
