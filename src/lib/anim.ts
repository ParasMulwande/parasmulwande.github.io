/**
 * Premium Data Lab — scroll animation toolkit.
 *
 * One shared IntersectionObserver drives every declarative animation so
 * we never pay for a library or a per-component observer.
 *
 *   data-reveal                 fade + rise            (index.css)
 *   data-reveal-delay="80"      stagger in ms
 *   data-count="96.4"           count up to value
 *   data-count-suffix="%"       appended after the number
 *   data-count-decimals="1"     decimal places
 *   data-draw                   SVG stroke draw on enter
 *   data-magnetic               subtle magnetic hover
 */

import { onDomSettled } from "./dom";

const REVEAL = "[data-reveal]";
const COUNT = "[data-count]";
const DRAW = "[data-draw]";
const MAGNETIC = "[data-magnetic]";

let io: IntersectionObserver | null = null;
let magneticQuery: MediaQueryList | null = null;

const reduce = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clampDelay = (el: HTMLElement) => {
  const raw = el.dataset.revealDelay;
  if (!raw) return;
  const n = Number.parseInt(raw, 10);
  if (Number.isFinite(n) && n >= 0) {
    el.style.transitionDelay = `${Math.min(n, 800)}ms`;
  }
};

/* ------------------------------------------------------------------ */
/* Counters                                                            */
/* ------------------------------------------------------------------ */

function runCounter(el: HTMLElement) {
  const target = Number.parseFloat(el.dataset.count ?? "0");
  if (!Number.isFinite(target)) return;

  const decimals = Number.parseInt(el.dataset.countDecimals ?? "0", 10);
  const suffix = el.dataset.countSuffix ?? "";
  const prefix = el.dataset.countPrefix ?? "";

  if (reduce()) {
    el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
    return;
  }

  const duration = 1400;
  const start = performance.now();

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    // easeOutExpo
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    el.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ------------------------------------------------------------------ */
/* Magnetic hover (desktop pointers only)                             */
/* ------------------------------------------------------------------ */

function bindMagnetic() {
  magneticQuery?.removeEventListener?.("change", onMagneticChange);
  magneticQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const fine = magneticQuery.matches && !reduce();

  document.querySelectorAll<HTMLElement>(MAGNETIC).forEach((el) => {
    if (el.dataset.magneticBound) return;
    el.dataset.magneticBound = "1";

    const move = (e: MouseEvent) => {
      if (!fine) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${x * 0.16}px, ${y * 0.22}px, 0)`;
    };
    const leave = () => {
      el.style.transform = "translate3d(0, 0, 0)";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
  });
}

function onMagneticChange() {
  bindMagnetic();
}

/* ------------------------------------------------------------------ */
/* SVG draw — set --len from the real path length                     */
/* ------------------------------------------------------------------ */

function prepareDraw() {
  document.querySelectorAll<SVGGeometryElement>("[data-draw]").forEach((p) => {
    if (p.dataset.drawReady) return;
    p.dataset.drawReady = "1";
    try {
      const len = Math.ceil(p.getTotalLength());
      p.style.setProperty("--len", String(len));
    } catch {
      p.style.setProperty("--len", "1000");
    }
  });
}

/* ------------------------------------------------------------------ */
/* Observer                                                            */
/* ------------------------------------------------------------------ */

function teardown() {
  io?.disconnect();
  io = null;
}

function observeAll() {
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>(`${REVEAL}, ${COUNT}, ${DRAW}`),
  ).filter((el) => !el.classList.contains("is-visible"));
  if (targets.length === 0) return;

  teardown();
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add("is-visible");
        if (el.matches(COUNT)) runCounter(el);
        io?.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
  );

  targets.forEach((el) => {
    clampDelay(el);
    io!.observe(el);
  });
}

/** Under reduced motion every target is resolved immediately, no scroll needed. */
function settleAll(): void {
  document
    .querySelectorAll<HTMLElement>(`${REVEAL}, ${COUNT}, ${DRAW}`)
    .forEach((el) => {
      el.classList.add("is-visible");
      if (el.matches(COUNT)) runCounter(el);
    });
  teardown();
}

export function initAnim(): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

  const onChange = (e: MediaQueryListEvent) => {
    if (e.matches) settleAll();
    else observeAll();
  };

  // The DOM is empty at import time; re-scan whenever it settles.
  const stopDomWatch = onDomSettled(() => {
    prepareDraw();
    if (mq.matches) settleAll();
    else observeAll();
    bindMagnetic();
  });

  mq.addEventListener?.("change", onChange);
  magneticQuery?.addEventListener?.("change", onMagneticChange);

  const onResize = () => observeAll();
  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    window.removeEventListener("resize", onResize);
    mq.removeEventListener?.("change", onChange);
    magneticQuery?.removeEventListener?.("change", onMagneticChange);
    stopDomWatch();
    teardown();
  };
}