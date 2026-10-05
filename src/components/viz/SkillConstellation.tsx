import React, { useMemo, useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

/**
 * Skill constellation.
 *
 * Category hubs on an inner ring, every skill as a node on an outer arc
 * grouped by its own category. Hovering a hub lights that category's nodes
 * and edges; hovering a node isolates it. Nothing here is a proficiency
 * score — it shows relationships only, and every node comes straight from
 * SKILL_CATEGORIES.
 */

const W = 900;
const H = 560;
const CX = W / 2;
const CY = H / 2;
const R_HUB = 150;
const R_NODE = 248;

export const SkillConstellation: React.FC = () => {
  const [hub, setHub] = useState<number | null>(null);
  const [node, setNode] = useState<string | null>(null);

  /** Lay hubs on a circle and each category's skills on its own outer arc. */
  const graph = useMemo(() => {
    const cats = SKILL_CATEGORIES;
    const hubPt = cats.map((_, i) => {
      const a = -Math.PI / 2 + (i / cats.length) * Math.PI * 2;
      return { x: CX + Math.cos(a) * R_HUB, y: CY + Math.sin(a) * R_HUB };
    });

    const arcSpan = (Math.PI * 2) / cats.length;
    const nodes = cats.flatMap((cat, ci) => {
      const base = -Math.PI / 2 + ci * arcSpan;
      const n = cat.skills.length;
      const spread = arcSpan * 0.82;
      return cat.skills.map((label, si) => {
        const t = n === 1 ? 0.5 : si / (n - 1);
        const a = base - spread / 2 + t * spread;
        const wobble = ((si % 2) - 0.5) * 18;
        return {
          id: `${cat.id}:${label}`,
          label,
          catIndex: ci,
          hub: hubPt[ci],
          x: CX + Math.cos(a) * (R_NODE + wobble),
          y: CY + Math.sin(a) * (R_NODE + wobble),
          a,
        };
      });
    });

    return { hubPt, nodes };
  }, []);

  const dim = hub !== null || node !== null;

  const activeNode = node ? graph.nodes.find((n) => n.id === node) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="card-lab overflow-hidden p-2 sm:p-4" data-proximity>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full touch-manipulation"
            role="img"
            aria-label={`Network of ${SKILL_CATEGORIES.length} skill categories and ${graph.nodes.length} technologies drawn from the portfolio data.`}
            onMouseLeave={() => {
              setNode(null);
            }}
          >
            {/* outer ring guide */}
            <circle
              cx={CX}
              cy={CY}
              r={R_NODE}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />
            <circle
              cx={CX}
              cy={CY}
              r={R_HUB}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={1}
              strokeDasharray="3 7"
            />

            {/* hub-to-hub ring */}
            {SKILL_CATEGORIES.map((c, i) => {
              const a = graph.hubPt[i];
              const b = graph.hubPt[(i + 1) % graph.hubPt.length];
              const on = hub === i || (dim && hub === null && activeNode?.catIndex === i);
              return (
                <line
                  key={`ring-${c.id}`}
                  className="orbit-link"
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="#00A8FF"
                  strokeOpacity={on ? 0.45 : 0.09}
                  strokeWidth={on ? 1.2 : 1}
                />
              );
            })}

            {/* hub-to-node edges */}
            {graph.nodes.map((n) => {
              const on =
                node === n.id || (hub !== null && hub === n.catIndex) ||
                (node !== null && activeNode?.catIndex === n.catIndex && hub === null);
              return (
                <line
                  key={`e-${n.id}`}
                  className="orbit-link"
                  x1={n.hub.x}
                  y1={n.hub.y}
                  x2={n.x}
                  y2={n.y}
                  stroke="#00A8FF"
                  strokeOpacity={on ? 0.5 : 0.07}
                  strokeWidth={on ? 1.1 : 0.8}
                />
              );
            })}

            {/* category hubs */}
            {SKILL_CATEGORIES.map((c, i) => {
              const p = graph.hubPt[i];
              const on = hub === i || (dim && hub === null && activeNode?.catIndex === i);
              return (
                <g
                  key={c.id}
                  className="orbit-node"
                  onMouseEnter={() => setHub(i)}
                  onFocus={() => setHub(i)}
                  onBlur={() => setHub(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${c.title}. ${c.description}`}
                >
                  <circle className="orbit-halo" cx={p.x} cy={p.y} r={on ? 22 : 16} fill="rgba(0,168,255,0.16)" />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={on ? 6 : 4.5}
                    fill="#05070B"
                    stroke="#00A8FF"
                    strokeWidth={1.6}
                    style={{ transition: 'r 320ms var(--ease-out-expo)' }}
                  />
                  <text
                    x={p.x}
                    y={p.y - 14}
                    textAnchor="middle"
                    className="orbit-label"
                    fill={on ? '#F5F7FA' : '#A7B0BE'}
                    style={{ font: '600 10px "Space Grotesk", sans-serif', letterSpacing: '0.02em' }}
                  >
                    {c.title}
                  </text>
                  <text
                    x={p.x}
                    y={p.y + 20}
                    textAnchor="middle"
                    className="orbit-label"
                    fill="#697386"
                    style={{ font: '500 7.5px "JetBrains Mono", monospace' }}
                  >
                    {c.code}
                  </text>
                </g>
              );
            })}

            {/* skill nodes */}
            {graph.nodes.map((n) => {
              const on = node === n.id || (node === null && hub === n.catIndex);
              const r = node === n.id ? 5.5 : on ? 4 : 2.6;
              // flip label inward so text never runs off the viewBox
              const outward = Math.cos(n.a) >= 0;
              return (
                <g
                  key={n.id}
                  className="orbit-node"
                  onMouseEnter={() => setNode(n.id)}
                  onFocus={() => setNode(n.id)}
                  onBlur={() => setNode(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={n.label}
                >
                  <circle cx={n.x} cy={n.y} r={11} fill="transparent" />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={r}
                    fill={on ? '#00A8FF' : '#697386'}
                    style={{ transition: 'r 320ms var(--ease-out-expo), fill 320ms var(--ease-out-expo)' }}
                  />
                  <text
                    x={n.x + (outward ? 11 : -11)}
                    y={n.y + 3}
                    textAnchor={outward ? 'start' : 'end'}
                    className="orbit-label"
                    fill={on ? '#F5F7FA' : 'rgba(105,115,134,0.75)'}
                    opacity={on ? 1 : 0.55}
                    style={{ font: '400 9.5px "JetBrains Mono", monospace' }}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Detail panel — always populated, so the column never looks empty */}
      <aside className="lg:col-span-4">
        <div className="card-lab sweep lg:sticky lg:top-24" data-reveal data-reveal-delay="80">
          {activeNode ? (
            <>
              <span className="stat-label text-accent">
                {SKILL_CATEGORIES[activeNode.catIndex].title}
              </span>
              <h3 className="t-h3 mt-2">{activeNode.label}</h3>
              <p className="t-body mt-3 text-sm">
                {SKILL_CATEGORIES[activeNode.catIndex].description}
              </p>
            </>
          ) : hub !== null ? (
            <>
              <span className="stat-label text-accent">{SKILL_CATEGORIES[hub].code}</span>
              <h3 className="t-h3 mt-2">{SKILL_CATEGORIES[hub].title}</h3>
              <p className="t-body mt-3 text-sm">{SKILL_CATEGORIES[hub].description}</p>
              <div className="node-grid mt-5">
                {SKILL_CATEGORIES[hub].skills.map((s) => (
                  <span key={s} className="node">
                    {s}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="stat-label">How to read this</span>
              <h3 className="t-h3 mt-2">Relationships, not ratings</h3>
              <p className="t-body mt-3 text-sm">
                Every node is a technology already used in the projects and
                research on this site, placed by the discipline it belongs to.
                Hover a category to light its cluster, or a single node to
                isolate it.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-white/[0.06] bg-white/[0.04]">
                <div className="bg-surface px-3 py-2.5">
                  <div className="stat-label">Categories</div>
                  <div className="mt-1 font-display text-lg font-bold text-ink">
                    {SKILL_CATEGORIES.length}
                  </div>
                </div>
                <div className="bg-surface px-3 py-2.5">
                  <div className="stat-label">Technologies</div>
                  <div className="mt-1 font-display text-lg font-bold text-ink">
                    {graph.nodes.length}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};