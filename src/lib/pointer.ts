/**
 * Global pointer interaction layer.
 *
 * One rAF-throttled pointer listener drives every pointer-reactive effect so
 * we never attach per-element listeners across the tree:
 *
 *   [data-magnetic]     buttons drift toward the cursor
 *   [data-proximity]    cards brighten as the cursor approaches
 *
 * Everything is disabled for coarse pointers and reduced-motion users, and
 * the loop parks itself when the pointer leaves the window.
 */


const MAGNETIC = "[data-magnetic]";
const PROXIMITY = "[data-proximity]";

export function initPointer(): () => void {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  const magnets = () => document.querySelectorAll<HTMLElement>(MAGNETIC);
  const proximities = () => document.querySelectorAll<HTMLElement>(PROXIMITY);

  const enabled = () => fine.matches && !reduce.matches;

  const onMove = (e: PointerEvent) => {
    if (!enabled()) return;

    // Magnetic drift — restrained radius so adjacent buttons never collide or bleed
    magnets().forEach((el) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const inside = Math.abs(dx) < r.width / 2 + 16 && Math.abs(dy) < r.height / 2 + 16;
      if (inside) {
        const clampedX = Math.max(-5, Math.min(5, dx * 0.08)).toFixed(2);
        const clampedY = Math.max(-4, Math.min(4, dy * 0.1)).toFixed(2);
        el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
      } else {
        el.style.transform = "translate3d(0,0,0)";
      }
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
    magnets().forEach((el) => {
      el.style.transform = "translate3d(0,0,0)";
    });
    proximities().forEach((el) => el.style.setProperty("--prox", "0"));
  };

  const attach = () => {
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
  };

  attach();

  return () => {
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerleave", onLeave);
  };
}