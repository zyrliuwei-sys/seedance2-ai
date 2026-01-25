'use client';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
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
      className={cn(
        'relative overflow-hidden py-20 md:py-28',
        section.className,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(120,140,255,0.18),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_70%,rgba(236,72,153,0.14),transparent_40%)]" />

      <div className="container relative">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-white/[0.02] p-8 shadow-[0_30px_90px_rgba(10,15,35,0.45)] backdrop-blur-sm md:p-12">
          <div className="absolute -left-20 top-0 size-48 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-56 rounded-full bg-pink-500/20 blur-3xl" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <ScrollAnimation>
                <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">
                  Launch
                </p>
                <h2 className="mt-4 text-4xl font-semibold text-balance text-foreground md:text-5xl">
                  {section.title}
                </h2>
              </ScrollAnimation>
              <ScrollAnimation delay={0.15}>
                <p
                  className="mt-5 text-base text-muted-foreground md:text-lg"
                  dangerouslySetInnerHTML={{ __html: section.description ?? '' }}
                />
              </ScrollAnimation>
            </div>

            <ScrollAnimation delay={0.3}>
              <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-stretch">
                {section.buttons?.map((button, idx) => (
                  <Button
                    asChild
                    size={button.size || 'default'}
                    variant={button.variant || 'default'}
                    className={cn(
                      'h-12 px-6 text-sm font-semibold shadow-[0_10px_30px_rgba(10,15,35,0.3)]',
                      idx === 0
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400'
                        : 'border border-white/15 bg-white/5 text-foreground hover:bg-white/10'
                    )}
                    key={idx}
                  >
                    <Link
                      href={button.url || ''}
                      target={button.target || '_self'}
                    >
                      {button.icon && <SmartIcon name={button.icon as string} />}
                      <span>{button.title}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
