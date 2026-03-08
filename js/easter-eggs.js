/**
 * LegalMind AI — Easter Eggs (easter-eggs.js)
 *
 * Easter Egg 1: Type "Article 6" anywhere → show high-treason modal
 * Easter Egg 2: Type "Justice" anywhere   → golden balance scale animation
 * Easter Egg 3: Click logo 7 times        → Secret Legal Archive Mode
 */

(function () {
    'use strict';

    /* ── Typed buffer ─────────────────────────────────────── */
    let typedBuffer = '';
    const BUFFER_LIMIT = 20;

    /* ── Targets ──────────────────────────────────────────── */
    // "article 6" → spaces stripped → "article6" (see normalization below)
    const TRIGGER_ARTICLE6 = 'article6';
    const TRIGGER_JUSTICE  = 'justice';

    /* ── State ────────────────────────────────────────────── */
    let logoClickCount      = 0;
    let logoClickTimer      = null;
    let secretModeActive    = false;
    let justiceActive       = false;

    /* ── DOM refs ─────────────────────────────────────────── */
    const article6Modal    = document.getElementById('article6-modal');
    const article6ModalClose = document.getElementById('article6-modal-close');
    const justiceOverlay   = document.getElementById('justice-overlay');
    const secretBanner     = document.getElementById('secret-banner');
    const navLogo          = document.getElementById('nav-logo');

    /* ============================================================
       KEYDOWN LISTENER — track typed characters
       ============================================================ */
    document.addEventListener('keydown', function (e) {
        // Ignore modifier keys, function keys, arrows, etc.
        if (e.key.length !== 1) return;

        // Don't capture while user types in an input/textarea
        const tag = document.activeElement && document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        typedBuffer = (typedBuffer + e.key.toLowerCase()).slice(-BUFFER_LIMIT);

        // Normalize buffer (remove spaces for article6 trigger)
        const normalized = typedBuffer.replace(/\s/g, '');

        // Check triggers
        if (normalized.endsWith(TRIGGER_ARTICLE6)) {
            typedBuffer = '';
            triggerArticle6();
            return;
        }

        if (typedBuffer.endsWith(TRIGGER_JUSTICE)) {
            typedBuffer = '';
            triggerJustice();
        }
    });

    /* ============================================================
       EASTER EGG 1 — Article 6 / High Treason
       ============================================================ */
    function triggerArticle6() {
        if (!article6Modal) return;

        article6Modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Add dramatic red flash to overlay
        article6Modal.classList.add('article6-flash');
        setTimeout(function () {
            article6Modal.classList.remove('article6-flash');
        }, 1600);
    }

    if (article6ModalClose) {
        article6ModalClose.addEventListener('click', closeArticle6Modal);
    }

    if (article6Modal) {
        article6Modal.addEventListener('click', function (e) {
            if (e.target === article6Modal) closeArticle6Modal();
        });

        // Keyboard close
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && article6Modal.classList.contains('open')) {
                closeArticle6Modal();
            }
        });
    }

    function closeArticle6Modal() {
        if (!article6Modal) return;
        article6Modal.style.opacity = '0';
        article6Modal.style.transition = 'opacity 0.3s ease';
        setTimeout(function () {
            article6Modal.classList.remove('open');
            article6Modal.style.opacity = '';
            article6Modal.style.transition = '';
            document.body.style.overflow = '';
        }, 300);
    }

    /* ============================================================
       EASTER EGG 2 — Justice Scale Animation
       ============================================================ */
    function triggerJustice() {
        if (justiceActive) return;
        justiceActive = true;

        if (justiceOverlay) {
            justiceOverlay.classList.add('active');
            justiceOverlay.style.pointerEvents = 'none';
        }

        // Show toast
        if (window.LM && window.LM.showToast) {
            window.LM.showToast('⚖️  The Scales of Justice Appear…', 3500);
        }

        // Remove after animation completes
        setTimeout(function () {
            if (justiceOverlay) {
                justiceOverlay.style.transition = 'opacity 0.6s ease';
                justiceOverlay.style.opacity = '0';
                setTimeout(function () {
                    justiceOverlay.classList.remove('active');
                    justiceOverlay.style.opacity = '';
                    justiceOverlay.style.transition = '';
                    justiceActive = false;
                }, 600);
            } else {
                justiceActive = false;
            }
        }, 3500);
    }

    /* ============================================================
       EASTER EGG 3 — Secret Archive Mode (logo × 7)
       ============================================================ */
    if (navLogo) {
        navLogo.addEventListener('click', function () {
            logoClickCount++;

            // Visual feedback per click
            if (window.LM && window.LM.showToast) {
                if (logoClickCount < 7) {
                    window.LM.showToast(
                        'Click ' + logoClickCount + '/7 — Hidden Archive Unlocking…',
                        800
                    );
                }
            }

            // Reset timer
            if (logoClickTimer) clearTimeout(logoClickTimer);
            logoClickTimer = setTimeout(function () {
                if (logoClickCount < 7) logoClickCount = 0;
            }, 3000);

            if (logoClickCount >= 7) {
                logoClickCount = 0;
                clearTimeout(logoClickTimer);
                toggleSecretMode();
            }
        });
    }

    function toggleSecretMode() {
        secretModeActive = !secretModeActive;

        if (secretModeActive) {
            activateSecretMode();
        } else {
            deactivateSecretMode();
        }
    }

    function activateSecretMode() {
        document.body.classList.add('secret-mode');

        // Flash animation
        document.body.classList.add('secret-mode-flash');
        setTimeout(function () {
            document.body.classList.remove('secret-mode-flash');
        }, 1300);

        // Show banner
        if (secretBanner) {
            secretBanner.style.display = 'block';
            secretBanner.style.animation = 'none';
            void secretBanner.offsetWidth;
            secretBanner.style.animation = '';
        }

        // Update nav logo glow
        if (navLogo) {
            navLogo.style.textShadow =
                '0 0 20px rgba(255,215,0,0.9), 0 0 60px rgba(255,215,0,0.5), 0 0 100px rgba(255,215,0,0.2)';
        }

        // Change hero title color
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.transition = 'color 0.8s ease, text-shadow 0.8s ease';
            heroTitle.style.color = '#FFD700';
            heroTitle.style.textShadow = '0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.3)';
        }
    }

    function deactivateSecretMode() {
        document.body.classList.remove('secret-mode');

        if (secretBanner) secretBanner.style.display = 'none';

        if (navLogo) navLogo.style.textShadow = '';

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.color = '';
            heroTitle.style.textShadow = '';
        }

        if (window.LM && window.LM.showToast) {
            window.LM.showToast('Secret Archive Mode Deactivated', 2000);
        }
    }

})();
