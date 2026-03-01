import { animate, stagger } from "animejs";

// Advanced Geometric Entrance
export const heroEntrance = (container) => {
  if (!container) return;

  animate(container, {
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutSine",
  });

  if (document.querySelector(".hero-title")) {
    animate(".hero-title", {
      translateY: [200, 0],
      rotateX: [45, 0],
      opacity: [0, 1],
      duration: 1500,
      easing: "spring(1, 80, 13, 0)",
      delay: 200,
    });
  }

  if (document.querySelector(".hero-subtitle")) {
    animate(".hero-subtitle", {
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1200,
      easing: "easeOutExpo",
      delay: 500,
    });
  }

  if (document.querySelector(".hero-cta")) {
    animate(".hero-cta", {
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 1000,
      easing: "spring(1, 80, 10, 0)",
      delay: 800,
    });
  }

  // Staggered geometric reveal
  if (document.querySelector(".geo-shape")) {
    animate(".geo-shape", {
      scale: [0, 1],
      rotate: [45, 0],
      opacity: [0, 0.5],
      delay: stagger(100, { start: 400 }),
      duration: 1500,
      easing: "easeOutElastic(1, .8)",
    });
  }
};

// Interactive Background Grid Parallax
export const applyGridParallax = (e, container) => {
  const { clientX, clientY } = e;
  const moveX = (clientX - window.innerWidth / 2) * 0.02;
  const moveY = (clientY - window.innerHeight / 2) * 0.02;

  animate(container, {
    translateX: moveX,
    translateY: moveY,
    duration: 1000,
    easing: "easeOutQuad",
  });
};

// Continuous Floating Effect (Refined)
export const startFloating = (el, offset = 10) => {
  animate(el, {
    translateY: [-offset, offset],
    rotate: [-2, 2],
    duration: 3000 + Math.random() * 1000,
    easing: "easeInOutSine",
    alternate: true,
    loop: true,
  });
};

// Text Stagger reveal (Technical)
export const staggerText = (el) => {
  animate(el, {
    translateX: [-20, 0],
    opacity: [0, 1],
    delay: stagger(30),
    easing: "easeOutQuart",
    duration: 800,
  });
};

// Fade In with controlled delay
export const fadeIn = (el, delay = 0) => {
  animate(el, {
    opacity: [0, 1],
    translateY: [30, 0],
    delay,
    easing: "easeOutQuint",
    duration: 1000,
  });
};

// Scroll reveal for sections (Staggered Children)
export const sectionReveal = (selector) => {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  animate(elements, {
    translateY: [50, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1500,
    delay: stagger(100),
  });
};

// Magnetic hover effect (Sharper)
export const applyMagnetic = (e, el) => {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  animate(el, {
    translateX: x * 0.4,
    translateY: y * 0.4,
    duration: 400,
    easing: "easeOutQuart",
  });
};

export const resetMagnetic = (el) => {
  animate(el, {
    translateX: 0,
    translateY: 0,
    duration: 800,
    easing: "spring(1, 80, 10, 0)",
  });
};
