/**
 * Scroll reveal — single shared IntersectionObserver.
 *
 * Opt in per element with the `data-reveal` attribute:
 *   <div data-reveal data-reveal-delay="80">…</div>
 *
 * Adds `is-visible` once the element enters the viewport, which pairs with
 * the `[data-reveal]` transition rules defined in index.css.
 *
 * Respects prefers-reduced-motion by revealing everything immediately.
 */

import { onDomSettled } from "./dom";

let observer: IntersectionObserver | null = null;
let reduceMotionQuery: MediaQueryList | null = null;

const SELECTOR = "[data-reveal]";

function applyDelay(el: Element): void {
  const raw = el.getAttribute("data-reveal-delay");
  if (!raw) return;
  const delay = Number.parseInt(raw, 10);
  if (Number.isFinite(delay) && delay >= 0 && el instanceof HTMLElement) {
    el.style.transitionDelay = `${Math.min(delay, 600)}ms`;
  }
}

function revealAll(): void {
  document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("is-visible"));
}

function disconnect(): void {
  observer?.disconnect();
  observer = null;
}

function connect(): void {
  const targets = Array.from(document.querySelectorAll(SELECTOR)).filter(
    (el) => !el.classList.contains("is-visible"),
  );
  if (targets.length === 0) return;

  disconnect();

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    {
      // Reveal slightly before the element is fully on screen so the
      // motion reads as part of scrolling rather than a delayed pop-in.
      root: null,
      rootMargin: "0px 0px -6% 0px",
      threshold: 0.01,
    },
  );

  observer = io;
  targets.forEach((el) => {
    applyDelay(el);
    io.observe(el);
  });
}

export function initReveal(): () => void {
  reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const scan = () => {
    if (reduceMotionQuery?.matches) revealAll();
    else connect();
  };

  // Re-scan whenever the DOM settles after React mounts.
  const stopDomWatch = onDomSettled(scan);

  const onMotionChange = (e: MediaQueryListEvent) => {
    if (e.matches) revealAll();
    else connect();
  };
  reduceMotionQuery.addEventListener?.("change", onMotionChange);

  // Re-scan once layout settles (fonts/images) and again on resize.
  const onResize = () => connect();
  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    window.removeEventListener("resize", onResize);
    reduceMotionQuery?.removeEventListener?.("change", onMotionChange);
    stopDomWatch();
    disconnect();
  };
}