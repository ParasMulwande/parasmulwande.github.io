/**
 * Global pointer interaction layer.
 *
 * One rAF-throttled pointer listener drives every pointer-reactive effect so
 * we never attach per-element listeners across the tree:
 *
 *   .cursor-aura        soft glow that trails the cursor
 *   [data-magnetic]     buttons drift toward the cursor
 *   [data-proximity]    cards brighten as the cursor approaches
 *
 * Everything is disabled for coarse pointers and reduced-motion users, and
 * the loop parks itself when the pointer leaves the window.
 */

import { onDomSettled } from "./dom";

const AURA = ".cursor-aura";
const MAGNETIC = "[data-magnetic]";
const PROXIMITY = "[data-proximity]";

export function initPointer(): () => void {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  let aura: HTMLElement | null = document.querySelector<HTMLElement>(AURA);
  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  let raf = 0;
  let running = false;
  let active = false;

  const magnets = () => document.querySelectorAll<HTMLElement>(MAGNETIC);
  const proximities = () => document.querySelectorAll<HTMLElement>(PROXIMITY);

  const enabled = () => fine.matches && !reduce.matches;

  const loop = () => {
    // Ease the aura toward the pointer for a trailing feel.
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    if (aura) aura.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;

    if (Math.abs(tx - cx) < 0.4 && Math.abs(ty - cy) < 0.4) {
      running = false;
      raf = 0;
      return;
    }
    raf = requestAnimationFrame(loop);
  };

  const kick = () => {
    if (!running) {
      running = true;
      raf = requestAnimationFrame(loop);
    }
  };

  const onMove = (e: PointerEvent) => {
    if (!enabled()) return;
    tx = e.clientX;
    ty = e.clientY;
    if (aura) aura.classList.add("is-on");
    kick();

    // Magnetic drift
    magnets().forEach((el) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const inside = Math.abs(dx) < r.width / 2 + 60 && Math.abs(dy) < r.height / 2 + 60;
      el.style.transform = inside
        ? `translate3d(${(dx * 0.14).toFixed(2)}px, ${(dy * 0.2).toFixed(2)}px, 0)`
        : "translate3d(0,0,0)";
    });

    // Proximity brighten
    proximities().forEach((el) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(r.width, r.height) * 0.85;
      const near = Math.max(0, 1 - dist / reach);
      el.style.setProperty("--prox", near.toFixed(3));
    });
  };

  const onLeave = () => {
    active = false;
    aura?.classList.remove("is-on");
    magnets().forEach((el) => {
      el.style.transform = "translate3d(0,0,0)";
    });
    proximities().forEach((el) => el.style.setProperty("--prox", "0"));
  };

  const onEnter = () => {
    active = true;
  };

  const attach = () => {
    // The app renders after this module runs, so resolve the aura lazily.
    if (!aura) aura = document.querySelector<HTMLElement>(AURA);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
  };

  attach();
  const stopDomWatch = onDomSettled(() => {
    if (!aura) aura = document.querySelector<HTMLElement>(AURA);
  });

  return () => {
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("pointerenter", onEnter);
    if (raf) cancelAnimationFrame(raf);
    stopDomWatch();
  };
}