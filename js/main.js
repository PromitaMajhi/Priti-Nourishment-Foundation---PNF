/**
 * PNF Main JavaScript - Premium Version
 */

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initScrollEffects();
    initRevealAnimations();
    initImpactCounters();
    setActiveNavLink();
});

// 1. Language Logic (Smart Persistance)
function initLanguage() {
    const savedLang = localStorage.getItem('pnf-lang') || 'en';
    switchLang(savedLang, false);
}

function switchLang(lang, shouldSave = true) {
    document.body.className = `lang-${lang}`;
    if (shouldSave) localStorage.setItem('pnf-lang', lang);

    // UI Update for Toggle Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active',
            (lang === 'en' && btn.innerText.includes('EN')) ||
            (lang === 'bn' && btn.innerText.includes('বাং'))
        );
    });
}

// 2. High-Performance Scroll Effects
function initScrollEffects() {
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
}

// 3. Editorial Reveal Animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Reveal once
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
}

// 4. Impact Counters
function initImpactCounters() {
    const counterElements = document.querySelectorAll('.impact-num');
    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            counterElements.forEach(animateCounter);
            counterObserver.disconnect();
        }
    }, { threshold: 0.5 });

    const observerTarget = document.querySelector('.impact-grid');
    if (observerTarget) counterObserver.observe(observerTarget);
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2500; // 2.5 seconds
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (outQuad)
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentCount = Math.floor(easeProgress * target);

        el.innerText = currentCount + (target === 100 ? '%' : '+');

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            el.innerText = target + (target === 100 ? '%' : '+');
        }
    }

    requestAnimationFrame(updateCounter);
}

// 5. Active Link Underline Logic
function setActiveNavLink() {
    const filename = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === filename) link.classList.add('active');
    });
}

// 6. Form Handling with Premium Feedback (Toast simulation)
const subscribeForm = document.querySelector('.footer-newsletter');
if (subscribeForm) {
    subscribeForm.onsubmit = (e) => {
        e.preventDefault();
        const btn = subscribeForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Thank You! ✨';
        btn.style.background = '#2d8a5a';
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
            subscribeForm.reset();
        }, 3000);
    };
}
