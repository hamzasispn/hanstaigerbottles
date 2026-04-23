import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function splitWords(el) {
  const text = el.innerHTML;
  const words = text.split(' ');
  el.innerHTML = words
    .map(w => `<span class="gsap-word" style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="gsap-word-inner" style="display:inline-block;">${w}</span></span>`)
    .join(' ');
  return el.querySelectorAll('.gsap-word-inner');
}

function initAnimations() {
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
