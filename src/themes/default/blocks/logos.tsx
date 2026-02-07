'use client';

import { LazyImage } from '@/shared/blocks/common';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { Marquee } from '@/shared/components/ui/marquee';
import { MagicCard } from '@/shared/components/ui/magic-card';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Logos({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('relative py-14 md:py-20 bg-[#050608]', section.className, className)}
    >
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedGradientText
            speed={1.2}
            colorFrom="#34d399"
            colorTo="#38bdf8"
            className="text-xs uppercase tracking-[0.35em]"
          >
            {section.title}
          </AnimatedGradientText>
        </div>

        <div className="mt-8">
          <Marquee pauseOnHover className="py-2 [--duration:32s]">
            {section.items?.map((item, idx) => (
              <MagicCard
                key={idx}
                className="flex h-16 w-44 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                gradientFrom="#34d399"
                gradientTo="#38bdf8"
                gradientOpacity={0.12}
                gradientSize={120}
              >
                <LazyImage
                  className="h-7 w-auto opacity-80"
                  src={item.image?.src ?? ''}
                  alt={item.image?.alt ?? ''}
                />
              </MagicCard>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
