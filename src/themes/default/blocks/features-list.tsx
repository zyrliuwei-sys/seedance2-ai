'use client';

import { Link } from '@/core/i18n/navigation';
import { LazyImage, SmartIcon } from '@/shared/blocks/common';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { MagicCard } from '@/shared/components/ui/magic-card';
import { ProgressiveBlur } from '@/shared/components/ui/progressive-blur';
import { ShimmerButton } from '@/shared/components/ui/shimmer-button';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
import { Ripple } from '@/shared/components/magicui/ripple';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function FeaturesList({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      className={cn('relative py-20 md:py-28 bg-[#050608]', section.className, className)}
    >
      <div className="absolute inset-0 pointer-events-none">
        <Ripple className="opacity-10" mainCircleSize={220} />
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="container relative">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.1fr_0.9fr] md:items-stretch md:gap-16">
          <ScrollAnimation direction="left">
            <MagicCard
              className="relative mx-auto w-full max-w-[640px] h-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0f12]/80"
              gradientFrom="#34d399"
              gradientTo="#38bdf8"
              gradientOpacity={0.2}
              gradientSize={240}
            >
              <BorderBeam size={120} duration={8} colorFrom="#34d399" colorTo="#38bdf8" />
              <div className="relative h-full overflow-hidden rounded-[24px]">
                {section.video ? (
                  <video
                    src={section.video.src}
                    poster={section.video.poster}
                    autoPlay={section.video.autoplay ?? true}
                    loop={section.video.loop ?? true}
                    muted={section.video.muted ?? true}
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <LazyImage
                    src={section.image?.src ?? ''}
                    alt={section.image?.alt ?? ''}
                    className="h-full w-full object-cover"
                  />
                )}
                <ProgressiveBlur direction="bottom" blurLayers={10} blurIntensity={0.35} />
              </div>
            </MagicCard>
          </ScrollAnimation>

          <MagicCard
            className="w-full min-w-0 h-full rounded-2xl border border-white/10 bg-[#0b0f12]/80 p-7 md:p-10"
            gradientFrom="#34d399"
            gradientTo="#fbbf24"
            gradientOpacity={0.15}
            gradientSize={220}
          >
            <ScrollAnimation delay={0.1}>
              <AnimatedGradientText
                speed={1.4}
                colorFrom="#34d399"
                colorTo="#38bdf8"
                className="text-xs uppercase tracking-[0.35em]"
              >
                Seedance2 AI Overview
              </AnimatedGradientText>
              <h2 className="mt-4 text-balance text-4xl font-semibold text-white md:text-5xl">
                {section.title}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <p className="mt-5 text-base text-white/65 md:text-lg">
                {section.description}
              </p>
            </ScrollAnimation>

            {section.buttons && section.buttons.length > 0 && (
              <ScrollAnimation delay={0.3}>
                <div className="mt-6 flex flex-wrap items-center justify-start gap-3">
                  {section.buttons?.map((button, idx) => (
                    <Link
                      key={idx}
                      href={button.url ?? ''}
                      target={button.target ?? '_self'}
                      className="inline-flex"
                    >
                      <ShimmerButton
                        className="h-10 px-5 text-sm font-semibold"
                        shimmerColor="#9ff3d0"
                        background="rgba(5, 6, 8, 0.9)"
                      >
                        <span className="flex items-center gap-2">
                          {button.icon && (
                            <SmartIcon name={button.icon as string} size={18} />
                          )}
                          {button.title}
                        </span>
                      </ShimmerButton>
                    </Link>
                  ))}
                </div>
              </ScrollAnimation>
            )}
          </MagicCard>
        </div>

        <ScrollAnimation delay={0.1}>
          <div className="relative grid min-w-0 grid-cols-1 gap-4 pt-10 break-words sm:grid-cols-2 lg:grid-cols-4">
            {section.items?.map((item, idx) => (
              <MagicCard
                key={idx}
                className="min-w-0 rounded-2xl border border-white/10 bg-[#0b0f12]/80 p-5"
                gradientFrom="#34d399"
                gradientTo="#38bdf8"
                gradientOpacity={0.12}
                gradientSize={160}
              >
                <div className="flex min-w-0 items-center gap-2">
                  {item.icon && (
                    <div className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <SmartIcon name={item.icon as string} size={16} className="text-emerald-200" />
                    </div>
                  )}
                  <h3 className="min-w-0 text-sm font-semibold break-words text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 min-w-0 text-sm text-white/60 break-words">
                  {item.description ?? ''}
                </p>
              </MagicCard>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
