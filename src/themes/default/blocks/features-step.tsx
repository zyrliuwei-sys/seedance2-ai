'use client';

import { SmartIcon } from '@/shared/blocks/common';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { MagicCard } from '@/shared/components/ui/magic-card';
import { Ripple } from '@/shared/components/magicui/ripple';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function FeaturesStep({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('relative py-16 md:py-24 bg-[#050608]', section.className, className)}
    >
      <div className="absolute inset-0 pointer-events-none">
        <Ripple className="opacity-10" mainCircleSize={180} />
        <div className="absolute top-10 left-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="container relative">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <AnimatedGradientText
              speed={1.4}
              colorFrom="#34d399"
              colorTo="#38bdf8"
              className="text-xs uppercase tracking-[0.35em]"
            >
              {section.label || 'Process'}
            </AnimatedGradientText>
            <h2 className="mt-4 text-4xl font-semibold text-white">
              {section.title}
            </h2>
            <p className="mt-4 text-lg text-white/60 text-balance">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
            {section.items?.map((item, idx) => (
              <MagicCard
                key={idx}
                className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#0b0f12]/80 p-6 text-center"
                gradientFrom="#34d399"
                gradientTo="#38bdf8"
                gradientOpacity={0.14}
                gradientSize={160}
              >
                <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-emerald-200">
                  {idx + 1}
                </div>
                <div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  {item.icon && <SmartIcon name={item.icon as string} size={28} className="text-emerald-200" />}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </MagicCard>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
