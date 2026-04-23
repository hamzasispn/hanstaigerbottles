import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// expose globals so inline liquid scripts can use bundled GSAP (no CDN needed)
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

function splitWords(el) {
  const text = el.textContent.trim();
  const words = text.split(/\s+/).filter(w => w.length > 0);
  el.innerHTML = words
    .map(w => `<span class="gsap-word" style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="gsap-word-inner" style="display:inline-block;">${w}</span></span>`)
    .join(' ');
  return el.querySelectorAll('.gsap-word-inner');
}

function initHeroAnimation() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  const tl = gsap.timeline({ delay: 0.15 });

  // background overlay fade
  tl.from(hero, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0);

  // title words slide up
  const titleEl = hero.querySelector('[data-hero="title"]');
  if (titleEl) {
    const words = splitWords(titleEl);
    tl.from(words, { opacity: 0, y: '110%', duration: 0.7, stagger: 0.07, ease: 'power3.out' }, 0.2);
  }

  // buttons stagger up
  const buttonsEl = hero.querySelector('[data-hero="buttons"]');
  if (buttonsEl) {
    tl.from(Array.from(buttonsEl.children), { opacity: 0, y: 24, duration: 0.55, stagger: 0.1, ease: 'power3.out' }, 0.55);
  }

  // hero card slides in from right
  const cardEl = hero.querySelector('[data-hero="card"]');
  if (cardEl) {
    tl.from(cardEl, { opacity: 0, x: 50, duration: 0.75, ease: 'power3.out' }, 0.6);
  }

  // bg title slides up
  const bgTitleEl = hero.querySelector('[data-hero="bgtitle"]');
  if (bgTitleEl) {
    tl.from(bgTitleEl, { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out' }, 0.45);
  }
}

function initScrollAnimations() {
  // fade-up: simple fade + slide up
  gsap.utils.toArray('[data-anim="fade-up"]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
    });
  });

  // fade-in: just opacity
  gsap.utils.toArray('[data-anim="fade-in"]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  });

  // split-words: words slide up one by one
  gsap.utils.toArray('[data-anim="split-words"]').forEach(el => {
    const words = splitWords(el);
    gsap.from(words, {
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      opacity: 0,
      y: '110%',
      duration: 0.65,
      stagger: 0.07,
      ease: 'power3.out',
    });
  });

  // stagger-children: stagger direct children fade-up
  gsap.utils.toArray('[data-anim="stagger-children"]').forEach(el => {
    const children = el.children;
    gsap.from(children, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      opacity: 0,
      y: 50,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
    });
  });

  // slide-left: slide in from left
  gsap.utils.toArray('[data-anim="slide-left"]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      opacity: 0,
      x: -50,
      duration: 0.9,
      ease: 'power3.out',
    });
  });

  // scale-in: scale from small + fade
  gsap.utils.toArray('[data-anim="scale-in"]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      opacity: 0,
      scale: 0.92,
      duration: 1,
      ease: 'power3.out',
    });
  });
}

function initAnimations() {
  initHeroAnimation();
  initScrollAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
