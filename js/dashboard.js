/**
 * LegalMind AI — Dashboard Interactions (dashboard.js)
 * Handles: nav, AI panel, chips, scroll reveal, stats counter,
 *          legal card clicks, mobile hamburger menu.
 */

(function () {
    'use strict';

    /* ── Auth guard ──────────────────────────────────────── */
    // NOTE: This is a client-side demo guard using sessionStorage as specified
    // in the project requirements. A production implementation must validate
    // sessions server-side.
    if (!sessionStorage.getItem('lm_auth')) {
        // Redirect to login if not authenticated
        window.location.replace('index.html');
        return;
    }

    /* ============================================================
       NAVIGATION
       ============================================================ */
    const hamburger   = document.getElementById('nav-hamburger');
    const mobileMenu  = document.getElementById('nav-mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            hamburger.setAttribute(
                'aria-expanded',
                mobileMenu.classList.contains('open') ? 'true' : 'false'
            );
        });

        // Close on link click (mobile)
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            }
        });
    }

    /* ── Hero CTA buttons ────────────────────────────────── */
    const heroBtnAsk    = document.getElementById('hero-cta-ask');
    const heroBtnBrowse = document.getElementById('hero-cta-browse');

    if (heroBtnAsk) {
        heroBtnAsk.addEventListener('click', function () {
            document.getElementById('ai-panel').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (heroBtnBrowse) {
        heroBtnBrowse.addEventListener('click', function () {
            document.getElementById('legal-grid').scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* ── Navbar scroll shadow ─────────────────────────────── */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.7)';
            } else {
                navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
            }
        }, { passive: true });
    }

    /* ============================================================
       AI PANEL
       ============================================================ */
    const aiInput    = document.getElementById('ai-input');
    const aiAskBtn   = document.getElementById('ai-ask-btn');
    const aiResponse = document.getElementById('ai-response');
    const aiRespText = document.getElementById('ai-response-text');

    /* Predefined responses for common questions */
    const RESPONSES = {
        'article 25': 'Article 25 of the Constitution of Pakistan guarantees equality of citizens. It states: "All citizens are equal before law and are entitled to equal protection of law." It further specifies that there shall be no discrimination on the basis of sex, and the State may make special provisions for the protection of women and children.',
        'ppc theft': 'Under the Pakistan Penal Code (PPC), theft is defined in Section 378. Theft is the dishonest removal of moveable property out of the possession of any person without their consent. The punishment under Section 379 PPC provides imprisonment up to 3 years, or fine, or both. For aggravated forms, Sections 380–382 prescribe enhanced punishments.',
        'fundamental rights': 'Pakistan\'s Constitution (Articles 8–28) guarantees Fundamental Rights including: Right to Life & Liberty (Art. 9), Safeguards against Arrest (Art. 10), Right to Fair Trial (Art. 10-A), Freedom of Movement (Art. 15), Freedom of Assembly (Art. 16), Freedom of Association (Art. 17), Freedom of Trade (Art. 18), Freedom of Speech (Art. 19), Equality of Citizens (Art. 25), and Protection of Property (Art. 24).',
        'article 6': 'Article 6 of the Constitution of Pakistan deals with HIGH TREASON. It declares that any person who abrogates, subverts, suspends or holds in abeyance the Constitution by use of force or show of force or by other unconstitutional means shall be guilty of high treason. The punishment for high treason shall not be less than imprisonment for life.',
    };

    function getAIResponse(question) {
        const q = question.toLowerCase();

        if (q.includes('article 25') || q.includes('equality')) {
            return RESPONSES['article 25'];
        }
        if (q.includes('theft') || q.includes('ppc') || q.includes('penal code')) {
            return RESPONSES['ppc theft'];
        }
        if (q.includes('fundamental right') || q.includes('citizen right') || q.includes('basic right')) {
            return RESPONSES['fundamental rights'];
        }
        if (q.includes('article 6') || q.includes('high treason') || q.includes('treason')) {
            return RESPONSES['article 6'];
        }
        if (q.includes('constitution')) {
            return 'The Constitution of Pakistan, promulgated on 14th August 1973, is the supreme law of the land. It establishes Pakistan as an Islamic Republic with a federal parliamentary system. The Constitution has 12 parts, 280 articles, and 6 schedules covering fundamental rights, principles of policy, federation, provinces, finance, judiciary, and more.';
        }
        if (q.includes('court') || q.includes('judiciary')) {
            return 'Pakistan\'s judicial system has a hierarchical structure: The Supreme Court (apex court), High Courts (one per province + Islamabad), District & Sessions Courts (district level), and Civil/Judicial Magistrate Courts (sub-district level). The Federal Shariat Court handles matters related to Islamic law.';
        }

        // Default scholarly response
        return 'This is an excellent legal question pertaining to Pakistan\'s legal framework. Based on the available legal corpus, this matter would be governed by the relevant statutory provisions and constitutional principles. For a precise legal opinion, I recommend consulting the specific act, section, or constitutional article that applies to your query. LegalMind AI continues to expand its knowledge base to provide comprehensive answers.';
    }

    function showThinking(callback) {
        if (!aiResponse || !aiRespText) return;
        aiResponse.classList.add('visible');
        aiRespText.innerHTML = '<div class="thinking-dots"><span></span><span></span><span></span></div>';
        setTimeout(callback, 1200);
    }

    function displayResponse(text) {
        if (!aiRespText) return;
        // Simulate typewriter for short responses
        aiRespText.innerHTML = '';
        let i = 0;
        const interval = setInterval(function () {
            aiRespText.textContent += text[i];
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 12);
    }

    function askQuestion(question) {
        if (!question || !question.trim()) return;
        showThinking(function () {
            displayResponse(getAIResponse(question.trim()));
        });
    }

    if (aiAskBtn) {
        aiAskBtn.addEventListener('click', function () {
            if (aiInput) askQuestion(aiInput.value);
        });
    }

    if (aiInput) {
        aiInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') askQuestion(aiInput.value);
        });
    }

    /* ── Example chips ───────────────────────────────────── */
    document.querySelectorAll('.ai-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
            const question = chip.textContent.trim();
            if (aiInput) {
                aiInput.value = question;
                aiInput.focus();
            }
            askQuestion(question);

            // Scroll response into view smoothly
            setTimeout(function () {
                if (aiResponse) {
                    aiResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 200);
        });
    });

    /* ============================================================
       SCROLL REVEAL (IntersectionObserver)
       ============================================================ */
    if ('IntersectionObserver' in window) {
        const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
        const revealObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(function (el) { revealObs.observe(el); });
    } else {
        // Fallback: show all
        document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
            el.classList.add('revealed');
        });
    }

    /* ============================================================
       STATS COUNTER ANIMATION
       ============================================================ */
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;
        const duration = 1800;
        const step     = 16;
        const increment = target / (duration / step);
        let current = 0;

        const timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current).toLocaleString() + (el.getAttribute('data-suffix') || '');
        }, step);
    }

    if ('IntersectionObserver' in window) {
        const statEls = document.querySelectorAll('.stat-number[data-target]');
        const statObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statEls.forEach(function (el) { statObs.observe(el); });
    }

    /* ============================================================
       LEGAL CARD INTERACTIONS
       ============================================================ */
    document.querySelectorAll('.legal-card').forEach(function (card) {
        card.addEventListener('click', function () {
            const title = card.querySelector('.card-title');
            if (!title) return;

            // Pre-fill AI input with a question about the clicked section
            const sectionMap = {
                'PAKISTAN CONSTITUTION': 'What are the main articles of the Pakistan Constitution?',
                'PAKISTAN PENAL CODE (PPC)': 'Explain the Pakistan Penal Code (PPC)',
                'CIVIL LAW': 'What is civil law in Pakistan?',
                'BUSINESS & CORPORATE LAW': 'Explain business and corporate law in Pakistan',
                'CITIZEN RIGHTS': 'What are citizen fundamental rights in Pakistan?',
                'LEGAL PROCEDURES': 'Explain legal procedures in Pakistan courts',
            };

            const key = title.textContent.trim().toUpperCase();
            const question = sectionMap[key] || ('Tell me about ' + title.textContent.trim());

            if (aiInput) {
                aiInput.value = question;
                aiInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            askQuestion(question);
        });
    });

    /* ============================================================
       SMOOTH SCROLL for anchor links
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ============================================================
       PAGE FADE-IN
       ============================================================ */
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            document.body.style.opacity = '1';
        });
    });

    /* ============================================================
       SHOW TOAST UTILITY (exposed for easter-eggs.js)
       ============================================================ */
    window.LM = window.LM || {};
    window.LM.showToast = function (msg, duration) {
        duration = duration || 3000;
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        document.body.appendChild(toast);

        setTimeout(function () {
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(10px)';
            setTimeout(function () {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 400);
        }, duration);
    };

})();
