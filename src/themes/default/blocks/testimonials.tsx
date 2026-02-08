'use client';

import { LazyImage } from '@/shared/blocks/common';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { Marquee } from '@/shared/components/ui/marquee';
import { MagicCard } from '@/shared/components/ui/magic-card';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
import { TextShimmer } from '@/shared/components/magicui/text-shimmer';
import { cn } from '@/shared/lib/utils';
import { Section, SectionItem } from '@/shared/types/blocks/landing';

export function Testimonials({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const items = section.items ?? [];
  const mid = Math.ceil(items.length / 2);
  const firstRow = items.slice(0, mid);
  const secondRow = items.slice(mid);

  const TestimonialCard = ({ item }: { item: SectionItem }) => (
    <MagicCard
      className="w-[320px] rounded-2xl border border-white/10 bg-[#0b0f12]/80 p-5"
      gradientFrom="#34d399"
      gradientTo="#38bdf8"
      gradientOpacity={0.16}
      gradientSize={160}
    >
      <BorderBeam
        size={80}
        duration={6}
        colorFrom="#34d399"
        colorTo="#38bdf8"
        borderWidth={1}
      />
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-3">
          {item.image?.src && (
            <LazyImage
              src={item.image.src}
              alt={item.image.alt || item.name || 'avatar'}
              width={44}
              height={44}
              className="rounded-full border border-white/10"
            />
          )}
          <div>
            <p className="text-sm font-semibold text-white">{item.name}</p>
            <p className="text-xs text-white/55">{item.role || item.title}</p>
          </div>
        </div>
        <p className="text-sm text-white/70 leading-relaxed">
          “{item.quote || item.description}”
        </p>
      </div>
    </MagicCard>
  );

  return (
    <section
      id={section.id}
      className={cn(
        'relative overflow-hidden py-16 md:py-20 bg-[#1a1d20]',
        section.className,
        className
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-sky-500/10 blur-[140px]" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center mb-10">
          <AnimatedGradientText
            speed={1.4}
            colorFrom="#34d399"
            colorTo="#38bdf8"
            className="text-xs uppercase tracking-[0.35em]"
          >
            Voices
          </AnimatedGradientText>
          <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            {section.title}
          </h2>
          <TextShimmer className="mt-3 text-white/60 max-w-2xl mx-auto">
            {section.description}
          </TextShimmer>
        </div>

        <div className="space-y-6">
          <Marquee pauseOnHover className="py-2 [--duration:35s]">
            {firstRow.map((item, idx) => (
              <TestimonialCard key={idx} item={item} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="py-2 [--duration:40s]">
            {secondRow.map((item, idx) => (
              <TestimonialCard key={idx} item={item} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
