/**
 * Runs a callback once the DOM has settled after React mounts.
 *
 * The animation initialisers run at module-import time — before the first
 * render — so they would otherwise query an empty document and silently
 * attach nothing. This observes DOM mutations and re-runs the callback
 * (debounced to one frame) whenever new nodes appear.
 */
export function onDomSettled(cb: () => void): () => void {
  let queued = 0;

  const schedule = () => {
    if (queued) return;
    queued = window.requestAnimationFrame(() => {
      queued = 0;
      cb();
    });
  };

  schedule();

  const mo = new MutationObserver(schedule);
  mo.observe(document.body, { childList: true, subtree: true });

  // Belt and braces: fonts settling and late layout shifts.
  document.fonts?.ready.then(schedule).catch(() => {});
  window.addEventListener("load", schedule);
  const settle = window.setTimeout(schedule, 600);

  return () => {
    mo.disconnect();
    window.clearTimeout(settle);
    window.removeEventListener("load", schedule);
    if (queued) window.cancelAnimationFrame(queued);
  };
}