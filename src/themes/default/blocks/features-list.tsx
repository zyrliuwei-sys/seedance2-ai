'use client';

import { Link } from '@/core/i18n/navigation';
import { LazyImage, SmartIcon } from '@/shared/blocks/common';
import { Button } from '@/shared/components/ui/button';
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
    // Prevent horizontal scrolling
    <section
      className={cn(
        'relative overflow-x-hidden py-20 md:py-28',
        section.className,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(120,140,255,0.15),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.12),transparent_40%)]" />
      <div className="container relative z-10 overflow-x-hidden">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.1fr_0.9fr] md:items-stretch md:gap-16">
          <ScrollAnimation direction="left">
            <div className="relative mx-auto w-full max-w-[640px] h-full">
              <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-pink-500/20 blur-2xl" />
              <div className="relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(10,15,35,0.45)]">
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
              </div>
            </div>
          </ScrollAnimation>
          <div className="w-full min-w-0 h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_24px_70px_rgba(10,15,35,0.35)] backdrop-blur-sm md:p-10">
            <ScrollAnimation delay={0.1}>
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">
                Overview
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold text-foreground md:text-5xl">
                {section.title}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <p className="mt-5 text-base text-muted-foreground md:text-lg">
                {section.description}
              </p>
            </ScrollAnimation>

            {section.buttons && section.buttons.length > 0 && (
              <ScrollAnimation delay={0.3}>
                <div className="mt-6 flex flex-wrap items-center justify-start gap-3">
                  {section.buttons?.map((button, idx) => (
                    <Button
                      asChild
                      key={idx}
                      variant={button.variant || 'default'}
                      size={button.size || 'default'}
                    >
                      <Link
                        href={button.url ?? ''}
                        target={button.target ?? '_self'}
                        className={cn(
                          'focus-visible:ring-ring inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                          'h-10 px-6',
                          'bg-background ring-foreground/10 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50 border border-transparent shadow-sm ring-1 shadow-black/15 duration-200'
                        )}
                      >
                        {button.icon && (
                          <SmartIcon name={button.icon as string} size={20} />
                        )}
                        {button.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              </ScrollAnimation>
            )}
          </div>
        </div>

        <ScrollAnimation delay={0.1}>
          {/* Prevent horizontal scrolling, min-w-0 and break-words */}
          <div className="relative grid min-w-0 grid-cols-1 gap-4 pt-10 break-words sm:grid-cols-2 lg:grid-cols-4">
            {section.items?.map((item, idx) => (
              <div
                className="min-w-0 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_50px_rgba(10,15,35,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                key={idx}
              >
                <div className="flex min-w-0 items-center gap-2">
                  {item.icon && (
                    <div className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-white">
                      <SmartIcon name={item.icon as string} size={16} />
                    </div>
                  )}
                  <h3 className="min-w-0 text-sm font-semibold break-words text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="min-w-0 text-sm text-white/70 break-words">
                  {item.description ?? ''}
                </p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
