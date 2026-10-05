import { onDomSettled } from "./dom";

const NAV_LINKS = "a[data-nav-link]";

export function initNavSpy(): () => void {
  let links: HTMLAnchorElement[] = [];
  let sections: { a: HTMLAnchorElement; el: HTMLElement }[] = [];
  let indicator: HTMLElement | null = null;
  let ticking = false;

  const moveIndicator = (active: HTMLAnchorElement | null) => {
    if (!indicator) return;
    const parent = indicator.parentElement;
    if (!active || !parent) {
      indicator.style.width = "0px";
      return;
    }
    const a = active.getBoundingClientRect();
    const p = parent.getBoundingClientRect();
    indicator.style.width = `${Math.max(0, a.width)}px`;
    indicator.style.transform = `translateX(${a.left - p.left}px)`;
  };

  const setActive = (id: string) => {
    let current: HTMLAnchorElement | null = null;
    links.forEach((a) => {
      const on = a.getAttribute("href") === `#${id}`;
      a.classList.toggle("is-active", on);
      if (on) current = a;
    });
    moveIndicator(current);
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (sections.length === 0) return;
      const probe = window.innerHeight * 0.34;
      let activeId = sections[0].el.id;
      for (const { el } of sections) {
        if (el.getBoundingClientRect().top <= probe) activeId = el.id;
      }
      // At the very bottom, always highlight the last section.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        activeId = sections[sections.length - 1].el.id;
      }
      setActive(activeId);
    });
  };

  /** Re-query the DOM. Safe to call repeatedly. */
  const scan = () => {
    links = Array.from(document.querySelectorAll<HTMLAnchorElement>(NAV_LINKS));
    sections = links
      .map((a) => {
        const id = a.getAttribute("href")?.replace("#", "") ?? "";
        const el = id ? document.getElementById(id) : null;
        return el ? { a, el } : null;
      })
      .filter((x): x is { a: HTMLAnchorElement; el: HTMLElement } => x !== null);

    if (!indicator) indicator = document.querySelector<HTMLElement>(".nav-ink");
    if (links.length > 0) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      onScroll();
    }
  };

  // The nav renders after mount; attach once it exists.
  const stopDomWatch = onDomSettled(scan);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    stopDomWatch();
  };
}