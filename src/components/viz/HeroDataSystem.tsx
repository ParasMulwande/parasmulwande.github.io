import React, { useEffect, useRef } from 'react';

/**
 * High-End Scientific Neural Architecture Visualization.
 *
 * Designed with Apple & scientific precision:
 * - High-contrast, sharp typography for layer headers and architectural annotations.
 * - Symmetrical, perfectly spaced 5-layer directed acyclic graph.
 * - Restrained, slow-moving signal pulses along select synaptic pathways.
 * - Refined node illumination with hairline rings and electric-blue core anchors.
 * - Lightweight Canvas rendering with automatic DPI scaling, resize handling, and reduced motion fallback.
 */

interface ArchitectureLayer {
  id: string;
  label: string;
  nodeCount: number;
}

const LAYERS: ArchitectureLayer[] = [
  { id: 'input', label: 'INPUT TENSOR', nodeCount: 4 },
  { id: 'conv', label: 'CONV EMBEDDING', nodeCount: 6 },
  { id: 'latent', label: 'LATENT SPACE', nodeCount: 5 },
  { id: 'dense', label: 'DENSE HEAD', nodeCount: 4 },
  { id: 'output', label: 'INFERENCE', nodeCount: 2 },
];

interface Node {
  x: number;
  y: number;
  ox: number;
  oy: number;
  r: number;
  layerIdx: number;
  nodeIdx: number;
  phase: number;
}

interface Edge {
  a: number;
  b: number;
  weight: number;
}

interface Pulse {
  edgeIdx: number;
  t: number;
  speed: number;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const HeroDataSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reduce.matches;

    let w = 0;
    let h = 0;
    let dpr = 1;

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];

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

      const compact = w < 540;
      nodes = [];
      edges = [];
      pulses = [];

      const layerCount = LAYERS.length;
      const marginX = compact ? 36 : 56;
      const colWidth = (w - marginX * 2) / (layerCount - 1);
      const topPadding = compact ? 48 : 56;
      const bottomPadding = compact ? 44 : 50;
      const usableHeight = h - topPadding - bottomPadding;

      let globalNodeIdx = 0;
      const layerNodeIndices: number[][] = [];

      // Calculate node positions with optical symmetry
      LAYERS.forEach((layer, lIdx) => {
        const x = marginX + lIdx * colWidth;
        const currentIndices: number[] = [];
        const count = layer.nodeCount;
        const nodeSpacing = usableHeight / (count + 1);

        for (let nIdx = 0; nIdx < count; nIdx++) {
          const y = topPadding + (nIdx + 1) * nodeSpacing;
          const isAnchor = lIdx === 0 || lIdx === layerCount - 1;
          const r = compact ? (isAnchor ? 4 : 3) : (isAnchor ? 4.8 : 3.6);

          nodes.push({
            x,
            y,
            ox: x,
            oy: y,
            r,
            layerIdx: lIdx,
            nodeIdx: nIdx,
            phase: (lIdx * 1.5 + nIdx * 0.8) % (Math.PI * 2),
          });

          currentIndices.push(globalNodeIdx);
          globalNodeIdx++;
        }
        layerNodeIndices.push(currentIndices);
      });

      // Construct selective, elegant synaptic connections
      for (let l = 0; l < layerCount - 1; l++) {
        const fromIndices = layerNodeIndices[l];
        const toIndices = layerNodeIndices[l + 1];

        fromIndices.forEach((fIdx, fi) => {
          toIndices.forEach((tIdx, ti) => {
            const shouldConnect =
              fromIndices.length <= 4 ||
              toIndices.length <= 4 ||
              Math.abs(fi - ti) <= 2;

            if (shouldConnect) {
              const weight = 0.35 + 0.65 * Math.abs(Math.sin(fi * 2.3 + ti * 3.1));
              edges.push({ a: fIdx, b: tIdx, weight });
            }
          });
        });
      }

      // Restrained, slow-moving signal pulses along key connections
      const pulseCount = compact ? 8 : 14;
      for (let p = 0; p < pulseCount; p++) {
        pulses.push({
          edgeIdx: Math.floor((p / pulseCount) * edges.length) % edges.length,
          t: p / pulseCount,
          speed: 0.08 + (p % 3) * 0.03, // Slow and graceful
        });
      }
    };

    build();
    window.addEventListener('resize', build);

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

    // Precise scientific grid background
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 44;

      ctx.beginPath();
      for (let x = 0; x < w; x += step) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, h);
      }
      for (let y = 0; y < h; y += step) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(w, Math.round(y) + 0.5);
      }
      ctx.stroke();
    };

    const render = (timeMs: number) => {
      if (!visible) {
        raf = requestAnimationFrame(render);
        return;
      }

      const t = timeMs / 1000;
      ctx.clearRect(0, 0, w, h);
      drawGrid();

      const compact = w < 540;
      const marginX = compact ? 36 : 56;
      const colWidth = (w - marginX * 2) / (LAYERS.length - 1);

      // Vertical alignment axes & high-contrast column labels
      LAYERS.forEach((layer, idx) => {
        const lx = marginX + idx * colWidth;

        // Subtle structural axis line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.moveTo(Math.round(lx) + 0.5, 24);
        ctx.lineTo(Math.round(lx) + 0.5, h - 26);
        ctx.stroke();
        ctx.setLineDash([]);

        // Crisp, readable layer header
        ctx.fillStyle = idx === 0 || idx === LAYERS.length - 1 ? '#f5f5f7' : '#a1a1a6';
        ctx.font = `600 ${compact ? 9 : 10}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(layer.label, lx, compact ? 22 : 26);
      });

      // Cursor interaction: subtle repulsion
      for (const n of nodes) {
        let tx = n.ox;
        let ty = n.oy;
        if (mouse.active) {
          const dx = n.ox - mouse.x;
          const dy = n.oy - mouse.y;
          const d = Math.hypot(dx, dy);
          const reach = 90;
          if (d < reach && d > 0.001) {
            const pull = (1 - d / reach) * 6;
            tx += (dx / d) * pull;
            ty += (dy / d) * pull;
          }
        }
        n.x = lerp(n.x, tx, 0.12);
        n.y = lerp(n.y, ty, 0.12);
      }

      // Draw synapse edges
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        let proximity = 0;
        if (mouse.active) {
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          proximity = Math.max(0, 1 - Math.hypot(mx - mouse.x, my - mouse.y) / 110);
        }

        const alpha = (0.06 + e.weight * 0.08 + proximity * 0.35).toFixed(3);
        ctx.strokeStyle = `rgba(41, 151, 255, ${alpha})`;
        ctx.lineWidth = 1 + proximity * 0.4;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Draw restrained, slow-moving signal pulses
      if (!reduced) {
        for (const p of pulses) {
          p.t += p.speed * 0.016;
          if (p.t > 1) {
            p.t -= 1;
            p.edgeIdx = (p.edgeIdx + 1) % edges.length;
          }

          const e = edges[p.edgeIdx];
          if (!e) continue;
          const a = nodes[e.a];
          const b = nodes[e.b];

          const px = lerp(a.x, b.x, p.t);
          const py = lerp(a.y, b.y, p.t);
          const tailLen = 0.22;
          const tx = lerp(a.x, b.x, Math.max(0, p.t - tailLen));
          const ty = lerp(a.y, b.y, Math.max(0, p.t - tailLen));

          const grad = ctx.createLinearGradient(tx, ty, px, py);
          grad.addColorStop(0, 'rgba(41, 151, 255, 0)');
          grad.addColorStop(1, 'rgba(41, 151, 255, 0.85)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }

      // Draw nodes with subtle depth and clean electric-blue accents
      nodes.forEach((n) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + n.phase);
        let near = 0;
        if (mouse.active) {
          near = Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / 80);
        }

        const isInput = n.layerIdx === 0;
        const isOutput = n.layerIdx === LAYERS.length - 1;

        // Subtle outer aura
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(41, 151, 255, ${(0.03 + pulse * 0.03 + near * 0.12).toFixed(3)})`;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = isOutput ? '#2997ff' : isInput ? '#f5f5f7' : '#2997ff';
        ctx.fill();

        // Precision hairline boundary ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 1.7, 0, Math.PI * 2);
        ctx.strokeStyle = isOutput || isInput ? 'rgba(255, 255, 255, 0.35)' : 'rgba(41, 151, 255, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // High-contrast, concise footer annotations
      ctx.fillStyle = '#a1a1a6';
      ctx.font = `500 ${compact ? 9 : 10}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('DIRECTED ACYCLIC GRAPH', marginX, h - (compact ? 12 : 14));

      ctx.textAlign = 'right';
      ctx.fillStyle = '#2997ff';
      ctx.fillText('LATENCY: NOMINAL', w - marginX, h - (compact ? 12 : 14));

      if (!reduced) {
        raf = requestAnimationFrame(render);
      }
    };

    if (reduced) {
      render(0);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
      wrap.removeEventListener('pointermove', onPointer);
      wrap.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
      <span className="sr-only">
        Conceptual scientific visualization of a deep neural network architecture: input tensor, convolutional embedding, latent space, dense decision head, and inference output.
      </span>
    </div>
  );
};

