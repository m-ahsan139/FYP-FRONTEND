/**
 * LegalMind AI — Particle System (particles.js)
 * Floating golden dust particles on the login page canvas.
 * Uses requestAnimationFrame for smooth 60fps animation.
 */

(function () {
    'use strict';

    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrameId = null;

    /* ── Config ──────────────────────────────────────────── */
    const CONFIG = {
        count:       80,        // number of particles
        minSize:     0.8,       // px
        maxSize:     3.0,       // px
        minSpeed:    0.18,      // px per frame (vertical drift)
        maxSpeed:    0.55,
        minOpacity:  0.08,
        maxOpacity:  0.55,
        driftX:      0.25,      // max horizontal sway amplitude
        colors:      [
            'rgba(212, 175, 55, ',   // antique gold
            'rgba(240, 210, 120, ',  // pale gold
            'rgba(255, 240, 180, ',  // warm white-gold
            'rgba(180, 140, 60, ',   // dark gold
        ],
    };

    /* ── Resize handler ──────────────────────────────────── */
    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    /* ── Particle factory ────────────────────────────────── */
    function createParticle(randomY) {
        const color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
        return {
            x:       Math.random() * canvas.width,
            y:       randomY !== undefined ? randomY : Math.random() * canvas.height,
            size:    CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize),
            speed:   CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed),
            opacity: CONFIG.minOpacity + Math.random() * (CONFIG.maxOpacity - CONFIG.minOpacity),
            opacityTarget: CONFIG.minOpacity + Math.random() * (CONFIG.maxOpacity - CONFIG.minOpacity),
            opacityDir: Math.random() > 0.5 ? 1 : -1,
            driftPhase:  Math.random() * Math.PI * 2,
            driftSpeed:  0.005 + Math.random() * 0.015,
            color:       color,
        };
    }

    /* ── Spawn initial particles ─────────────────────────── */
    function init() {
        particles = [];
        for (let i = 0; i < CONFIG.count; i++) {
            // Spread initial y across full canvas height
            particles.push(createParticle(Math.random() * canvas.height));
        }
    }

    /* ── Per-frame update ────────────────────────────────── */
    function update() {
        for (let i = 0, len = particles.length; i < len; i++) {
            const p = particles[i];

            // Rise upward
            p.y -= p.speed;

            // Horizontal sway using sine
            p.driftPhase += p.driftSpeed;
            p.x += Math.sin(p.driftPhase) * CONFIG.driftX;

            // Twinkle opacity
            p.opacity += 0.003 * p.opacityDir;
            if (p.opacity >= p.opacityTarget || p.opacity <= CONFIG.minOpacity) {
                p.opacityDir *= -1;
                p.opacityTarget = CONFIG.minOpacity + Math.random() * (CONFIG.maxOpacity - CONFIG.minOpacity);
            }

            // Reset if particle floats off top
            if (p.y < -10) {
                particles[i] = createParticle(canvas.height + 10);
            }

            // Wrap horizontally
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;
        }
    }

    /* ── Per-frame draw ──────────────────────────────────── */
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0, len = particles.length; i < len; i++) {
            const p = particles[i];

            // Radial gradient gives each particle a soft glow
            const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
            grd.addColorStop(0,   p.color + p.opacity + ')');
            grd.addColorStop(0.5, p.color + (p.opacity * 0.4) + ')');
            grd.addColorStop(1,   p.color + '0)');

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();

            // Bright core dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = p.color + Math.min(p.opacity * 2, 1) + ')';
            ctx.fill();
        }
    }

    /* ── Animation loop ──────────────────────────────────── */
    function loop() {
        update();
        draw();
        animFrameId = requestAnimationFrame(loop);
    }

    /* ── Start ───────────────────────────────────────────── */
    init();
    loop();

    /* ── Pause when tab is not visible ───────────────────── */
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            if (animFrameId) {
                cancelAnimationFrame(animFrameId);
                animFrameId = null;
            }
        } else {
            if (!animFrameId) loop();
        }
    });

})();
