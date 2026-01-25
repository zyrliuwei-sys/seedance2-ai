'use client';

import { cn } from '@/shared/lib/utils';
import { useEffect, useRef } from 'react';

interface ShineBorderProps {
  className?: string;
  duration?: number;
  shineColor?: string | string[];
  borderWidth?: number;
  style?: React.CSSProperties;
}

export function ShineBorder({
  className,
  duration = 14,
  shineColor = '#000000',
  borderWidth = 1,
  style,
}: ShineBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(parent);

    let position = 0;
    const colors = Array.isArray(shineColor) ? shineColor : [shineColor];

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Create gradient for the shine effect
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      const segment = 1 / (colors.length - 1);

      colors.forEach((color, i) => {
        gradient.addColorStop(i * segment, color);
      });

      ctx.strokeStyle = gradient;
      ctx.lineWidth = borderWidth;
      ctx.lineCap = 'round';

      // Draw animated border path
      ctx.beginPath();

      const totalLength = 2 * (w + h);
      const offset = (position * totalLength) % totalLength;
      const shineLength = Math.min(w * 0.3, 150);

      // Draw top edge
      if (offset < w) {
        ctx.moveTo(offset, 0);
        ctx.lineTo(Math.min(offset + shineLength, w), 0);
      } else if (offset < w + h) {
        ctx.moveTo(w, offset - w);
        ctx.lineTo(w, Math.min(offset - w + shineLength, h));
      } else if (offset < 2 * w + h) {
        const x = w - (offset - w - h);
        ctx.moveTo(x, h);
        ctx.lineTo(Math.max(x - shineLength, 0), h);
      } else {
        const y = h - (offset - 2 * w - h);
        ctx.moveTo(0, y);
        ctx.lineTo(0, Math.max(y - shineLength, 0));
      }

      ctx.stroke();

      position += 1 / (60 * duration);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [duration, shineColor, borderWidth]);

  return (
    <div
      ref={parentRef}
      className={cn('absolute inset-0 overflow-hidden rounded-[inherit]', className)}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
