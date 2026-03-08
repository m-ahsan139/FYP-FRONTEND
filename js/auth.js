/**
 * LegalMind AI — Authentication Logic (auth.js)
 * Handles login validation and redirect to dashboard.
 */

(function () {
    'use strict';

    /* ── Credentials ─────────────────────────────────────── */
    // NOTE: These are intentional demo credentials as specified in the project
    // requirements. A production implementation must use server-side
    // authentication with securely hashed passwords.
    const VALID_USERNAME = 'admin';
    const VALID_PASSWORD = '1234';

    /* ── DOM refs ────────────────────────────────────────── */
    const loginForm    = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn     = document.getElementById('login-btn');
    const errorMsg     = document.getElementById('error-message');

    if (!loginForm) return; // Guard: only run on login page

    /* ── Login handler ───────────────────────────────────── */
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        attemptLogin();
    });

    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        addRipple(loginBtn, e);
        attemptLogin();
    });

    function attemptLogin() {
        const username = (usernameInput.value || '').trim();
        const password = (passwordInput.value || '').trim();

        hideError();

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            // Mark as logged in
            sessionStorage.setItem('lm_auth', '1');

            // Visual feedback
            loginBtn.textContent = 'Entering Archive…';
            loginBtn.disabled = true;
            loginBtn.style.opacity = '0.8';

            // Redirect after brief delay for UX
            setTimeout(function () {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '0';
                setTimeout(function () {
                    window.location.href = 'dashboard.html';
                }, 500);
            }, 600);
        } else {
            showError();
            shakePanel();
        }
    }

    /* ── Error display ───────────────────────────────────── */
    function showError() {
        if (!errorMsg) return;
        errorMsg.classList.add('visible');
        errorMsg.style.animation = 'none';
        // Trigger reflow to re-run animation
        void errorMsg.offsetWidth;
        errorMsg.style.animation = '';
    }

    function hideError() {
        if (!errorMsg) return;
        errorMsg.classList.remove('visible');
    }

    /* ── Panel shake ─────────────────────────────────────── */
    function shakePanel() {
        const panel = document.querySelector('.login-panel');
        if (!panel) return;
        panel.style.animation = 'none';
        void panel.offsetWidth;
        panel.style.animation = 'shakeError 0.5s ease';
        setTimeout(function () {
            panel.style.animation = '';
        }, 600);
    }

    /* ── Ripple on button ────────────────────────────────── */
    function addRipple(btn, event) {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top  - size / 2;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple-dot');
        ripple.style.cssText =
            'width:' + size + 'px;height:' + size + 'px;' +
            'left:' + x + 'px;top:' + y + 'px;position:absolute;';

        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);

        setTimeout(function () {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 700);
    }

    /* ── Clear error on input ────────────────────────────── */
    [usernameInput, passwordInput].forEach(function (input) {
        if (!input) return;
        input.addEventListener('input', hideError);
    });

})();
