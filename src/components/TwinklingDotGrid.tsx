import React, { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  baseAlpha: number;
  maxAlpha: number;
  speed: number;
  phase: number;
  r: number;
  g: number;
  b: number;
  radius: number;
}

export const TwinklingDotGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dots: Dot[] = [];
    const SPACING = 40; // 40px matching existing cyber grid

    const initDots = (width: number, height: number) => {
      const newDots: Dot[] = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Color selection: 50% soft neutral white, 25% cyber cyan (#00f0ff), 25% cyber lime (#a3e635)
          const randColor = Math.random();
          let r = 240;
          let g = 240;
          let b = 246;

          if (randColor < 0.25) {
            // Cyber Cyan #00f0ff
            r = 0;
            g = 240;
            b = 255;
          } else if (randColor < 0.50) {
            // Cyber Lime #a3e635
            r = 163;
            g = 230;
            b = 53;
          }

          newDots.push({
            x: i * SPACING,
            y: j * SPACING,
            radius: 1.0, // Small subtle dot
            baseAlpha: 0.04 + Math.random() * 0.04, // 0.04 - 0.08 resting opacity
            maxAlpha: 0.25 + Math.random() * 0.28,  // 0.25 - 0.53 gentle peak opacity
            speed: 0.0006 + Math.random() * 0.0012, // Slow, calm pulsation
            phase: Math.random() * Math.PI * 2,    // Random phase offset for async blinking
            r,
            g,
            b,
          });
        }
      }
      return newDots;
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      dots = initDots(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        // Organic smooth twinkle pulse
        const sinVal = Math.sin(time * dot.speed + dot.phase);
        // Soft non-linear pulse: stays gentle and peaks softly
        const pulse = Math.pow(Math.max(0, sinVal), 2.5);
        const alpha = dot.baseAlpha + (dot.maxAlpha - dot.baseAlpha) * pulse;

        ctx.fillStyle = `rgba(${dot.r},${dot.g},${dot.b},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  );
};
