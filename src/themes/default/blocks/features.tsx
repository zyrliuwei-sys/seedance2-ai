'use client';

import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { BentoCard, BentoGrid } from '@/shared/components/ui/bento-grid';
import { MagicCard } from '@/shared/components/ui/magic-card';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Features({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('relative overflow-hidden py-20 md:py-28 bg-[#050608]', section.className, className)}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]" />
      </div>

      <div className="container relative">
        <ScrollAnimation>
          <div className="mx-auto max-w-3xl text-center text-balance mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" />
              <AnimatedGradientText
                speed={1.5}
                colorFrom="#34d399"
                colorTo="#38bdf8"
                className="text-xs uppercase tracking-[0.35em]"
              >
                Features
              </AnimatedGradientText>
            </div>
            <h2 className="text-white mb-5 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {section.title}
            </h2>
            <p className="text-white/65 text-lg md:text-xl">{section.description}</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <BentoGrid className="grid-cols-1 md:grid-cols-3 auto-rows-[18rem]">
            {section.items?.map((item, idx) => (
              <BentoCard
                key={idx}
                className={cn(
                  'col-span-1',
                  idx === 0 ? 'md:col-span-2' : '',
                  idx === 3 ? 'md:col-span-2' : ''
                )}
              >
                <MagicCard
                  className="h-full rounded-2xl border border-white/10 bg-[#0b0f12]/80 p-6"
                  gradientFrom="#34d399"
                  gradientTo="#fbbf24"
                  gradientOpacity={0.18}
                  gradientSize={200}
                >
                  <BorderBeam
                    size={100}
                    duration={7}
                    colorFrom="#34d399"
                    colorTo="#38bdf8"
                    borderWidth={1}
                  />
                  <div className="flex h-full flex-col gap-4">
                    <div className="inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <SmartIcon name={item.icon as string} size={24} className="text-emerald-200" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-white/60 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="mt-auto h-px w-full bg-gradient-to-r from-emerald-400/30 via-sky-400/20 to-transparent" />
                  </div>
                </MagicCard>
              </BentoCard>
            ))}
          </BentoGrid>
        </ScrollAnimation>
      </div>
    </section>
  );
}
