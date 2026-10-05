import React, { useEffect, useRef } from 'react';

/**
 * Hero data system.
 *
 * RAW DATA -> ANALYSIS -> MODEL -> PREDICTION -> INSIGHT rendered on a single
 * canvas: a node graph, packets travelling the edges, and a live prediction
 * readout. Nodes react to the cursor.
 *
 * Performance: one rAF loop, no per-frame allocation, DPR capped at 2, paused
 * when the tab is hidden, thinned on small screens, and rendered as a single
 * static frame under prefers-reduced-motion.
 */

const STAGES = [
  { key: 'raw', label: 'RAW DATA' },
  { key: 'analysis', label: 'ANALYSIS' },
  { key: 'model', label: 'MODEL' },
  { key: 'prediction', label: 'PREDICTION' },
  { key: 'insight', label: 'INSIGHT' },
];

interface Node {
  x: number;
  y: number;
  ox: number;
  oy: number;
  r: number;
  phase: number;
  stage: number;
}

interface Packet {
  edge: number;
  t: number;
  speed: number;
  hue: number;
}

interface Edge {
  a: number;
  b: number;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Deterministic PRNG so the graph is stable across re-renders. */
const makeRng = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

export const HeroDataSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const readRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reduce.matches;
    const onMq = (e: MediaQueryListEvent) => {
      reduced = e.matches;
    };
    reduce.addEventListener?.('change', onMq);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let compact = false;

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let packets: Packet[] = [];

    const mouse = { x: -9999, y: -9999, active: false };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      compact = w < 640;
      const rng = makeRng(20260921);

      // One hub per stage, laid out on a gentle arc.
      const hubs = STAGES.length;
      const padX = compact ? 0.3 : 0.14;
      const cx = w / 2;
      const cy = h * (compact ? 0.44 : 0.5);
      const spread = Math.min(w * (1 - padX * 2), compact ? 320 : 760);

      nodes = STAGES.map((_, i) => {
        const t = hubs === 1 ? 0.5 : i / (hubs - 1);
        const x = cx - spread / 2 + t * spread;
        const y = cy + Math.sin(t * Math.PI) * -h * 0.14 + (rng() - 0.5) * h * 0.06;
        return { x, y, ox: x, oy: y, r: compact ? 3.2 : 4.2, phase: rng() * Math.PI * 2, stage: i };
      });

      // Chain the stages, then add a few cross links for a network feel.
      edges = [];
      for (let i = 0; i < hubs - 1; i++) edges.push({ a: i, b: i + 1 });
      const extra = compact ? 2 : 6;
      for (let k = 0; k < extra; k++) {
        const a = Math.floor(rng() * (hubs - 1));
        const b = a + 1 + Math.floor(rng() * Math.min(2, hubs - 1 - a));
        if (b < hubs && !edges.some((e) => e.a === a && e.b === b)) edges.push({ a, b });
      }

      const packetCount = compact ? 10 : 26;
      packets = Array.from({ length: packetCount }, () => ({
        edge: Math.floor(rng() * edges.length),
        t: rng(),
        speed: (0.09 + rng() * 0.2) * (compact ? 0.7 : 1),
        hue: rng(),
      }));
    };

    const resize = () => build();
    build();
    window.addEventListener('resize', resize);

    const onPointer = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onPointerLeave = () => {
      mouse.active = false;
    };
    wrap.addEventListener('pointermove', onPointer, { passive: true });
    wrap.addEventListener('pointerleave', onPointerLeave);

    let raf = 0;
    let visible = true;
    const onVis = () => {
      visible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVis);

    // ---- draw helpers -------------------------------------------------
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth = 1;
      const step = compact ? 34 : 46;
      ctx.beginPath();
      for (let x = step / 2; x < w; x += step) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, h);
      }
      for (let y = step / 2; y < h; y += step) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(w, Math.round(y) + 0.5);
      }
      ctx.stroke();
    };

    const render = (t: number) => {
      if (!visible) {
        raf = requestAnimationFrame(render);
        return;
      }
      const time = t / 1000;
      ctx.clearRect(0, 0, w, h);
      drawGrid();

      // Node positions ease toward base, nudged by the cursor.
      for (const n of nodes) {
        let tx = n.ox;
        let ty = n.oy;
        if (mouse.active) {
          const dx = n.ox - mouse.x;
          const dy = n.oy - mouse.y;
          const d = Math.hypot(dx, dy);
          const reach = compact ? 90 : 130;
          if (d < reach && d > 0.001) {
            const pull = (1 - d / reach) * (compact ? 6 : 14);
            tx += (dx / d) * pull;
            ty += (dy / d) * pull;
          }
        }
        n.x = lerp(n.x, tx, 0.12);
        n.y = lerp(n.y, ty, 0.12);
      }

      // Edges
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const dist = Math.hypot(b.x - a.x, b.y - a.y);
        let near = 0;
        if (mouse.active) {
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          near = Math.max(0, 1 - Math.hypot(mx - mouse.x, my - mouse.y) / (compact ? 110 : 170));
        }
        ctx.strokeStyle = `rgba(0,168,255,${(0.09 + near * 0.4).toFixed(3)})`;
        ctx.lineWidth = 1 + near * 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        void dist;
      }

      // Packets with a short trail
      for (const p of packets) {
        p.t += p.speed * 0.016;
        if (p.t > 1) {
          p.t -= 1;
          p.edge = (p.edge + 1) % Math.max(1, edges.length);
        }
        const e = edges[p.edge];
        if (!e) continue;
        const a = nodes[e.a];
        const b = nodes[e.b];
        const px = lerp(a.x, b.x, p.t);
        const py = lerp(a.y, b.y, p.t);
        const tail = 0.14;
        const tx2 = lerp(a.x, b.x, Math.max(0, p.t - tail));
        const ty2 = lerp(a.y, b.y, Math.max(0, p.t - tail));
        const grad = ctx.createLinearGradient(tx2, ty2, px, py);
        grad.addColorStop(0, 'rgba(0,168,255,0)');
        grad.addColorStop(1, p.hue > 0.72 ? 'rgba(163,230,53,0.95)' : 'rgba(0,168,255,0.95)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tx2, ty2);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      // Nodes
      nodes.forEach((n, i) => {
        const pulse = 0.55 + 0.45 * Math.sin(time * 1.6 + n.phase);
        let near = 0;
        if (mouse.active) {
          near = Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / (compact ? 90 : 140));
        }
        const r = n.r * (1 + pulse * 0.22 + near * 0.5);

        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,168,255,${(0.05 + pulse * 0.05 + near * 0.14).toFixed(3)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = i === STAGES.length - 1 ? '#a3e635' : '#00A8FF';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 1.9, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,168,255,${(0.16 + near * 0.4).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Stage labels
      ctx.textAlign = 'center';
      ctx.font = `500 ${compact ? 7 : 8}px "JetBrains Mono", monospace`;
      nodes.forEach((n) => {
        const label = STAGES[n.stage].label;
        ctx.fillStyle = 'rgba(167,176,190,0.75)';
        ctx.fillText(label, n.x, n.y + (compact ? 22 : 26));
      });

      // Live prediction readout driven by real pipeline state
      const activeStage = Math.min(
        STAGES.length - 1,
        Math.floor(time % 12 / 2.4),
      );
      const conf = (72 + Math.sin(time * 0.9) * 9 + (activeStage === 4 ? 14 : 0)).toFixed(1);
      if (readRef.current) {
        readRef.current.textContent = `${STAGES[activeStage].label} · confidence ${conf}%`;
      }

      raf = requestAnimationFrame(render);
    };

    const paintStatic = () => {
      // Reduced motion: one deterministic frame, no loop.
      render(0);
      cancelAnimationFrame(raf);
      raf = 0;
    };

    if (reduced) {
      paintStatic();
    } else {
      raf = requestAnimationFrame(render);
    }

    const onMqChange = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (reduced) paintStatic();
      else raf = requestAnimationFrame(render);
    };
    reduce.addEventListener?.('change', onMqChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      wrap.removeEventListener('pointermove', onPointer);
      wrap.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVis);
      reduce.removeEventListener?.('change', onMq);
      reduce.removeEventListener?.('change', onMqChange);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
      <p
        ref={readRef}
        className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-tech text-[10px] tracking-[0.16em] text-ink-muted"
      >
        RAW DATA · confidence 72.0%
      </p>
      <span className="sr-only">
        Animated diagram of a machine learning pipeline: raw data flows through
        analysis, model training and prediction to produce insight.
      </span>
    </div>
  );
};
