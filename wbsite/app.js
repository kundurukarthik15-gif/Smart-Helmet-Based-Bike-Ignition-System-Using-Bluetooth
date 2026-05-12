document.addEventListener("DOMContentLoaded", () => {

    // ── Particle Canvas ───────────────────────────────────────────────────────
    const canvas = document.getElementById("particle-canvas");
    const ctx    = canvas.getContext("2d");
    let W, H, particles = [], mouse = { x: -999, y: -999 };

    function resizeCanvas() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() { this.reset(true); }
        reset(init = false) {
            this.x  = Math.random() * W;
            this.y  = init ? Math.random() * H : H + 10;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = -(Math.random() * 0.6 + 0.2);
            this.r  = Math.random() * 1.5 + 0.5;
            this.alpha = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.6 ? "#00e5ff" : Math.random() > 0.5 ? "#ff6d00" : "#00ff88";
        }
        update() {
            const dx = this.x - mouse.x, dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                this.vx += dx / dist * 0.3;
                this.vy += dy / dist * 0.3;
            }
            this.vx *= 0.98;
            this.vy *= 0.98;
            this.x += this.vx;
            this.y += this.vy;
            if (this.y < -10 || this.x < -10 || this.x > W + 10) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
        }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    // Draw connecting lines between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (d < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = "#00e5ff";
                    ctx.globalAlpha = (1 - d / 100) * 0.08;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, W, H);
        drawConnections();
        particles.forEach(p => { p.update(); p.draw(); });
        ctx.globalAlpha = 1;
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    // ── Custom Cursor ─────────────────────────────────────────────────────────
    const cursorDot  = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");
    let ringX = 0, ringY = 0, dotX = 0, dotY = 0;

    window.addEventListener("mousemove", e => { dotX = e.clientX; dotY = e.clientY; });

    function animateCursor() {
        ringX += (dotX - ringX) * 0.12;
        ringY += (dotY - ringY) * 0.12;
        cursorDot.style.left  = dotX + "px";
        cursorDot.style.top   = dotY + "px";
        cursorRing.style.left = ringX + "px";
        cursorRing.style.top  = ringY + "px";
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll("a, button, .tech-card, .about-card, .future-card, .contact-box").forEach(el => {
        el.addEventListener("mouseenter", () => cursorRing.classList.add("hovered"));
        el.addEventListener("mouseleave", () => cursorRing.classList.remove("hovered"));
    });

    // ── Navbar scroll effect ──────────────────────────────────────────────────
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
        highlightNavLink();
        animateTimelineOnScroll();
    });

    // ── Active nav link ───────────────────────────────────────────────────────
    const sections   = document.querySelectorAll("section[id], footer[id]");
    const navAnchors = document.querySelectorAll(".nav-links a");

    function highlightNavLink() {
        let current = "";
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
        });
        navAnchors.forEach(a => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + current);
        });
    }
    highlightNavLink();

    // ── Mobile menu ───────────────────────────────────────────────────────────
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const navLinks  = document.querySelector(".nav-links");

    mobileBtn?.addEventListener("click", () => {
        const isOpen = navLinks.style.display === "flex";
        navLinks.style.display = isOpen ? "none" : "flex";
        if (!isOpen) {
            Object.assign(navLinks.style, {
                flexDirection: "column", position: "absolute",
                top: "100%", left: "0", width: "100%",
                background: "rgba(4,8,12,0.97)", padding: "2rem 0",
                alignItems: "center", borderBottom: "1px solid rgba(0,229,255,0.15)"
            });
        }
    });

    // ── Smooth scroll ─────────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault();
            if (window.innerWidth <= 768) navLinks.style.display = "none";
            document.querySelector(a.getAttribute("href"))?.scrollIntoView({ behavior: "smooth" });
        });
    });

    // ── Status flicker ────────────────────────────────────────────────────────
    const statusText = document.querySelector(".status-text");
    const statusDot  = document.querySelector(".status-dot");

    setInterval(() => {
        if (Math.random() > 0.95) {
            statusText.innerText = "SYNCING...";
            statusText.style.color = "#ff6d00";
            statusDot.style.backgroundColor = "#ff6d00";
            statusDot.style.boxShadow = "0 0 10px #ff6d00";
            setTimeout(() => {
                statusText.innerText = "SYSTEM ONLINE";
                statusText.style.color = "#8b949e";
                statusDot.style.backgroundColor = "#00ff88";
                statusDot.style.boxShadow = "0 0 10px #00ff88";
            }, 800);
        }
    }, 5000);

    // ── Scroll Reveal ─────────────────────────────────────────────────────────
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
                revealObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    // ── Glitch effect on hero title ───────────────────────────────────────────
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
        heroTitle.setAttribute("data-text", heroTitle.innerText);
        setInterval(() => {
            heroTitle.classList.add("glitch");
            setTimeout(() => heroTitle.classList.remove("glitch"), 400);
        }, 4000);
    }

    // ── 3D Tilt on cards ─────────────────────────────────────────────────────
    document.querySelectorAll(".tech-card, .about-card, .future-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect   = card.getBoundingClientRect();
            const cx     = rect.left + rect.width  / 2;
            const cy     = rect.top  + rect.height / 2;
            const dx     = (e.clientX - cx) / (rect.width  / 2);
            const dy     = (e.clientY - cy) / (rect.height / 2);
            card.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateY(-6px)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    // ── Ripple on buttons ─────────────────────────────────────────────────────
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const rect   = btn.getBoundingClientRect();
            const ripple = document.createElement("span");
            ripple.style.cssText = `
                position:absolute; border-radius:50%;
                width:10px; height:10px;
                background:rgba(255,255,255,0.4);
                top:${e.clientY - rect.top - 5}px;
                left:${e.clientX - rect.left - 5}px;
                transform:scale(0); pointer-events:none;
                animation:rippleAnim 0.6s ease forwards;
            `;
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Inject ripple keyframe
    const style = document.createElement("style");
    style.textContent = `@keyframes rippleAnim {
        to { transform: scale(30); opacity: 0; }
    }`;
    document.head.appendChild(style);

    // ── Timeline step activation on scroll ───────────────────────────────────
    const timelineSteps = document.querySelectorAll(".timeline-step");

    function animateTimelineOnScroll() {
        timelineSteps.forEach((step, i) => {
            const rect = step.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                setTimeout(() => step.classList.add("active-step"), i * 150);
            }
        });
    }
    animateTimelineOnScroll();

    // ── Typing effect on section tags ─────────────────────────────────────────
    const tagObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el   = e.target;
            const text = el.dataset.text || el.textContent;
            el.dataset.text = text;
            el.textContent  = "";
            let i = 0;
            const timer = setInterval(() => {
                el.textContent += text[i++];
                if (i >= text.length) clearInterval(timer);
            }, 35);
            tagObserver.unobserve(el);
        });
    }, { threshold: 0.8 });

    document.querySelectorAll(".section-tag").forEach(el => tagObserver.observe(el));

    // ── Parallax on hero visual ───────────────────────────────────────────────
    const heroVisual = document.querySelector(".hero-visual");
    window.addEventListener("scroll", () => {
        if (!heroVisual) return;
        const scrolled = window.scrollY;
        heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
    });

    // ── Counter animation for any data-count elements ─────────────────────────
    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el  = e.target;
            const end = +el.dataset.count;
            let cur   = 0;
            const inc = end / 60;
            const t   = setInterval(() => {
                cur += inc;
                el.textContent = Math.min(Math.round(cur), end);
                if (cur >= end) clearInterval(t);
            }, 16);
            countObserver.unobserve(el);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll("[data-count]").forEach(el => countObserver.observe(el));

    // ── Project Video overlay ─────────────────────────────────────────────────
    const videoOverlay = document.getElementById("video-overlay");
    const projectVideo = document.getElementById("project-video");

    if (videoOverlay && projectVideo) {
        videoOverlay.addEventListener("click", () => {
            videoOverlay.classList.add("hidden");
            projectVideo.play();
        });
        projectVideo.addEventListener("pause", () => videoOverlay.classList.remove("hidden"));
        projectVideo.addEventListener("ended", () => videoOverlay.classList.remove("hidden"));
    }

    const vidPlayPause = document.getElementById("vid-play-pause");
    const vidPlayIcon  = document.getElementById("vid-play-icon");
    const vidBackward  = document.getElementById("vid-backward");
    const vidForward   = document.getElementById("vid-forward");

    if (projectVideo && vidPlayPause) {
        vidPlayPause.addEventListener("click", () => {
            if (projectVideo.paused) {
                projectVideo.play();
                videoOverlay.classList.add("hidden");
                vidPlayIcon.className = "fa-solid fa-pause";
            } else {
                projectVideo.pause();
                vidPlayIcon.className = "fa-solid fa-play";
            }
        });
        projectVideo.addEventListener("pause", () => vidPlayIcon.className = "fa-solid fa-play");
        projectVideo.addEventListener("play",  () => vidPlayIcon.className = "fa-solid fa-pause");
        projectVideo.addEventListener("ended", () => vidPlayIcon.className = "fa-solid fa-play");
        vidBackward.addEventListener("click", () => { projectVideo.currentTime = Math.max(0, projectVideo.currentTime - 10); });
        vidForward.addEventListener("click",  () => { projectVideo.currentTime = Math.min(projectVideo.duration, projectVideo.currentTime + 10); });
    }

});
