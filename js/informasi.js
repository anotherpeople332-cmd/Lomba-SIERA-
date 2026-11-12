(() => {
  'use strict';

  // ----------------------------------------------------
  // 1. STICKY SUB-NAV ACTIVE HIGHLIGHT ON SCROLL
  // ----------------------------------------------------
  const subnavPills = document.querySelectorAll('.info-subnav-pill');
  const sections = Array.from(subnavPills).map(pill => {
    const targetId = pill.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      return document.querySelector(targetId);
    }
    return null;
  }).filter(Boolean);

  const updateActivePill = () => {
    const scrollPos = window.scrollY + 140;
    let currentActiveId = null;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPos) {
        currentActiveId = section.getAttribute('id');
        break;
      }
    }

    subnavPills.forEach(pill => {
      const href = pill.getAttribute('href');
      if (href === `#${currentActiveId}`) {
        pill.classList.add('is-active');
      } else {
        pill.classList.remove('is-active');
      }
    });
  };

  window.addEventListener('scroll', updateActivePill, { passive: true });
  updateActivePill();

  // ----------------------------------------------------
  // 2. INTERACTIVE PACKING CHECKLIST WITH LOCALSTORAGE
  // ----------------------------------------------------
  const STORAGE_KEY = 'jogja_travel_checklist_v1';
  const checkboxes = document.querySelectorAll('.checklist-label input[type="checkbox"]');
  const progressBar = document.querySelector('[data-checklist-progress]');
  const countBadge = document.querySelector('[data-checklist-count]');
  const resetBtn = document.querySelector('[data-checklist-reset]');

  const loadChecklistState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      checkboxes.forEach((cb, idx) => {
        if (saved[idx]) {
          cb.checked = true;
          cb.closest('.checklist-label')?.classList.add('is-checked');
        } else {
          cb.checked = false;
          cb.closest('.checklist-label')?.classList.remove('is-checked');
        }
      });
    } catch {
      // Ignore storage errors in sandboxed contexts
    }
    updateChecklistUI();
  };

  const saveChecklistState = () => {
    const state = {};
    checkboxes.forEach((cb, idx) => {
      state[idx] = cb.checked;
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore
    }
  };

  const updateChecklistUI = () => {
    const total = checkboxes.length;
    let checked = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checked++;
    });

    const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }
    if (countBadge) {
      countBadge.textContent = `${checked} dari ${total} siap (${percent}%)`;
    }
  };

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const parent = cb.closest('.checklist-label');
      if (cb.checked) {
        parent?.classList.add('is-checked');
      } else {
        parent?.classList.remove('is-checked');
      }
      saveChecklistState();
      updateChecklistUI();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      checkboxes.forEach(cb => {
        cb.checked = false;
        cb.closest('.checklist-label')?.classList.remove('is-checked');
      });
      saveChecklistState();
      updateChecklistUI();
    });
  }

  loadChecklistState();

  // ----------------------------------------------------
  // 3. FAQ ACCORDION
  // ----------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      
      // Close other items if desired, or allow multi-expand
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          const btn = other.querySelector('.faq-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ----------------------------------------------------
  // 4. VOCABULARY COPY BUTTONS
  // ----------------------------------------------------
  const copyButtons = document.querySelectorAll('[data-copy-phrase]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const phrase = btn.getAttribute('data-copy-phrase') || '';
      if (!phrase) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(phrase).then(() => {
          showCopied(btn);
        }).catch(() => {
          fallbackCopy(btn, phrase);
        });
      } else {
        fallbackCopy(btn, phrase);
      }
    });
  });

  const fallbackCopy = (btn, text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showCopied(btn);
    } catch {
      // Fail silently
    }
    document.body.removeChild(textArea);
  };

  const showCopied = (btn) => {
    const originalText = btn.textContent;
    btn.textContent = 'Tersalin! ✓';
    btn.style.background = '#b98c4e';
    btn.style.borderColor = '#b98c4e';
    btn.style.color = '#fff';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 1800);
  };

})();
