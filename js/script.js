/* =============================================================
   Portfolio interactions — Abdoulaye Leye
   Mobile nav · scrolled state · active link · reveal · back-to-top
   ============================================================= */
(function () {
    "use strict";

    const nav = document.getElementById("nav");
    const navMenu = document.getElementById("navMenu");
    const navToggle = document.getElementById("navToggle");
    const navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));

    /* ---- Mobile menu ---- */
    function closeMenu() {
        navMenu.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    }
    if (navToggle) {
        navToggle.addEventListener("click", function () {
            const open = navMenu.classList.toggle("is-open");
            navToggle.classList.toggle("is-open", open);
            navToggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }
    navLinks.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    /* ---- Nav shadow on scroll ---- */
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                nav.classList.toggle("is-scrolled", window.scrollY > 12);
                toggleTopBtn();
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---- Active section link (IntersectionObserver) ---- */
    const sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    if ("IntersectionObserver" in window && sections.length) {
        const spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach(function (l) {
                        l.classList.toggle("is-active", l.getAttribute("href") === "#" + id);
                    });
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
        sections.forEach(function (s) { spy.observe(s); });
    }

    /* ---- Reveal on scroll ---- */
    const reveals = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if ("IntersectionObserver" in window && reveals.length) {
        const ro = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-in");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
        reveals.forEach(function (el) { ro.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add("is-in"); });
    }

    /* ---- Back to top ---- */
    const toTop = document.getElementById("toTop");
    function toggleTopBtn() {
        if (toTop) toTop.classList.toggle("is-shown", window.scrollY > 480);
    }
    if (toTop) {
        toTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ---- Dynamic year ---- */
    const yearEl = document.querySelector("[data-year]");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* ---- Contact form: loading state (Formspree handles submission) ---- */
    const form = document.querySelector(".form");
    if (form) {
        form.addEventListener("submit", function () {
            const btn = form.querySelector("button[type=submit]");
            if (btn) btn.setAttribute("disabled", "disabled");
        });
    }
})();
