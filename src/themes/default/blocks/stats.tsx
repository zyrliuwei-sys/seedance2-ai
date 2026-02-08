'use client';

import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { MagicCard } from '@/shared/components/ui/magic-card';
import { NumberTicker } from '@/shared/components/ui/number-ticker';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Stats({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const fallbackValues = [2, 4, 2];

  const parseValue = (title: string, idx: number) => {
    const numeric = Number(title.replace(/[^0-9.]/g, ''));
    const hasDigits = /[0-9]/.test(title);
    if (hasDigits && Number.isFinite(numeric)) {
      const unit = title.replace(/[0-9.]/g, '').trim();
      return { value: numeric, unit: unit || '' };
    }
    return { value: fallbackValues[idx] ?? 1, unit: title };
  };

  return (
    <section
      id={section.id}
      className={cn('relative py-16 md:py-24 bg-[#000000]', section.className, className)}
    >
      <div className="container">
        <ScrollAnimation>
          <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
            <AnimatedGradientText
              speed={1.4}
              colorFrom="#34d399"
              colorTo="#fbbf24"
              className="text-xs uppercase tracking-[0.35em]"
            >
              Momentum
            </AnimatedGradientText>
            <h2 className="text-white mb-2 text-3xl font-semibold tracking-tight md:text-4xl">
              {section.title}
            </h2>
            <p className="text-white/60">{section.description}</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {section.items?.map((item, idx) => {
              const { value, unit } = parseValue(item.title ?? '', idx);
              return (
                <MagicCard
                  key={idx}
                  className="relative rounded-2xl border border-white/10 bg-[#0b0f12]/80 p-6"
                  gradientFrom="#38bdf8"
                  gradientTo="#34d399"
                  gradientOpacity={0.22}
                  gradientSize={180}
                >
                  <BorderBeam
                    size={90}
                    duration={6}
                    colorFrom="#38bdf8"
                    colorTo="#34d399"
                    borderWidth={1}
                  />
                  <div className="flex items-baseline gap-2">
                    <div className="text-4xl font-semibold text-white">
                      <NumberTicker value={value} />
                    </div>
                    {unit && <div className="text-sm text-white/60">{unit}</div>}
                  </div>
                  <p className="mt-3 text-sm text-white/55">{item.description}</p>
                </MagicCard>
              );
            })}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
