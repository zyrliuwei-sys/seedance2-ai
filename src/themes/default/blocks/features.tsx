'use client';

import { useState } from 'react';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Features({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id={section.id}
      className={cn('relative py-20 md:py-32 overflow-hidden', section.className, className)}
    >
      {/* Animated background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,140,255,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(236,72,153,0.1),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.1),transparent_40%)]" />

      <div className="container relative z-10">
        <ScrollAnimation>
          <div className="mx-auto max-w-3xl text-center text-balance mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              <span className="text-xs uppercase tracking-wider text-foreground/70">Features</span>
            </div>
            <h2 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {section.items?.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Animated gradient border effect */}
                <div
                  className={cn(
                    'absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-0 blur transition duration-500 group-hover:opacity-100',
                    idx % 3 === 0
                      ? 'from-purple-500 to-pink-500'
                      : idx % 3 === 1
                        ? 'from-blue-500 to-purple-500'
                        : 'from-pink-500 to-rose-500'
                  )}
                />
                {/* Card content */}
                <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20">
                  {/* Floating icon container */}
                  <div className="mb-6 inline-flex">
                    <div
                      className={cn(
                        'relative rounded-xl border transition-all duration-300',
                        'bg-gradient-to-br from-white/10 to-white/5',
                        'border-white/10',
                        'group-hover:scale-110 group-hover:shadow-lg',
                        idx % 3 === 0
                          ? 'group-hover:border-purple-500/30 group-hover:shadow-purple-500/20'
                          : idx % 3 === 1
                            ? 'group-hover:border-blue-500/30 group-hover:shadow-blue-500/20'
                            : 'group-hover:border-pink-500/30 group-hover:shadow-pink-500/20'
                      )}
                    >
                      <div
                        className={cn(
                          'flex size-14 items-center justify-center rounded-lg',
                          'bg-gradient-to-br opacity-90',
                          idx % 3 === 0
                            ? 'from-purple-500/20 to-pink-500/20'
                            : idx % 3 === 1
                              ? 'from-blue-500/20 to-purple-500/20'
                              : 'from-pink-500/20 to-rose-500/20'
                        )}
                      >
                        <SmartIcon
                          name={item.icon as string}
                          size={28}
                          className={cn(
                            'transition-transform duration-300',
                            hoveredIndex === idx ? 'scale-110 rotate-6' : ''
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title and description */}
                  <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-foreground group-hover:to-foreground/70">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Subtle glow effect on hover */}
                  <div
                    className={cn(
                      'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 pointer-events-none',
                      idx % 3 === 0
                        ? 'from-purple-500/5 to-pink-500/5'
                        : idx % 3 === 1
                          ? 'from-blue-500/5 to-purple-500/5'
                          : 'from-pink-500/5 to-rose-500/5',
                      hoveredIndex === idx ? 'opacity-100' : ''
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
