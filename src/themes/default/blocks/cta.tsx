'use client';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { ShimmerButton } from '@/shared/components/ui/shimmer-button';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { Button } from '@/shared/components/ui/button';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Cta({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('relative py-20 md:py-28 bg-[#050608]', section.className, className)}
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0f12]/90 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.55)] md:p-12">
          <BorderBeam
            size={140}
            duration={8}
            colorFrom="#34d399"
            colorTo="#38bdf8"
            borderWidth={1}
          />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(800px_circle_at_10%_20%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(700px_circle_at_80%_80%,rgba(56,189,248,0.12),transparent_60%)]" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <AnimatedGradientText
                speed={1.4}
                colorFrom="#34d399"
                colorTo="#fbbf24"
                className="text-xs uppercase tracking-[0.35em]"
              >
                Launch
              </AnimatedGradientText>
              <h2 className="mt-4 text-4xl font-semibold text-balance text-white md:text-5xl">
                {section.title}
              </h2>
              <p
                className="mt-5 text-base text-white/65 md:text-lg"
                dangerouslySetInnerHTML={{ __html: section.description ?? '' }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-stretch">
              {section.buttons?.map((button, idx) =>
                idx === 0 ? (
                  <Link
                    key={idx}
                    href={button.url || ''}
                    target={button.target || '_self'}
                    className="inline-flex"
                  >
                    <ShimmerButton
                      className="h-12 px-6 text-sm font-semibold"
                      shimmerColor="#9ff3d0"
                      background="rgba(5, 6, 8, 0.9)"
                    >
                      <span className="flex items-center gap-2">
                        {button.icon && <SmartIcon name={button.icon as string} />}
                        {button.title}
                      </span>
                    </ShimmerButton>
                  </Link>
                ) : (
                  <Button
                    key={idx}
                    asChild
                    size={button.size || 'default'}
                    variant={button.variant || 'outline'}
                    className="h-12 px-6 text-sm font-semibold border border-white/15 text-white bg-white/5 hover:bg-white/10"
                  >
                    <Link href={button.url || ''} target={button.target || '_self'}>
                      {button.icon && <SmartIcon name={button.icon as string} />}
                      <span>{button.title}</span>
                    </Link>
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
