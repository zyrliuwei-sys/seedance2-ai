'use client';

import { cn } from '@/shared/lib/utils';
import { useEffect, useRef, useState } from 'react';

type CharacterSet = {
  characters: string[];
  interval: number;
};

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
  animateOnHover?: boolean;
  characterSet?: string[];
}

const defaultCharacterSet: string[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = 'div',
  startOnView = false,
  animateOnHover = true,
  characterSet = defaultCharacterSet,
}: HyperTextProps) {
  const [text, setText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLElement>(null);

  const triggerAnimation = () => {
    if (intervalRef.current || isAnimating) return;

    setIsAnimating(true);
    let iteration = 0;
    const totalTime = duration;
    const charUpdateTime = 50; // Time between character updates
    const steps = totalTime / charUpdateTime;

    intervalRef.current = setInterval(() => {
      if (iteration >= steps) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        intervalRef.current = null;
        setText(children);
        setIsAnimating(false);
        return;
      }

      const shuffledText = children
        .split('')
        .map((letter, index) => {
          if (letter === ' ') return ' ';
          if (iteration < index * (steps / children.length)) return letter;
          return characterSet[Math.floor(Math.random() * characterSet.length)];
        })
        .join('');

      setText(shuffledText);
      iteration++;
    }, charUpdateTime);
  };

  useEffect(() => {
    if (startOnView && !hasAnimated && !isAnimating) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            triggerAnimation();
            setHasAnimated(true);
          }
        },
        { threshold: 0.5 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }
  }, [startOnView, hasAnimated, isAnimating]);

  useEffect(() => {
    if (!startOnView && !hasAnimated && delay > 0) {
      const timeout = setTimeout(() => {
        triggerAnimation();
        setHasAnimated(true);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [delay, startOnView, hasAnimated]);

  const handleMouseEnter = () => {
    if (animateOnHover && !isAnimating) {
      triggerAnimation();
    }
  };

  return (
    <Component
      ref={elementRef as any}
      onMouseEnter={handleMouseEnter}
      className={cn('inline-block', className)}
    >
      {text}
    </Component>
  );
}
