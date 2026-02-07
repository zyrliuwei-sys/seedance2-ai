'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { MagicCard } from '@/shared/components/ui/magic-card';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
import { TextShimmer } from '@/shared/components/magicui/text-shimmer';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { Section } from '@/shared/types/blocks/landing';
import { cn } from '@/shared/lib/utils';

export function Faq({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('relative py-24 md:py-28 bg-[#050608]', className)}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 right-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-sky-500/10 blur-[140px]" />
      </div>

      <div className="container relative">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <ScrollAnimation>
            <MagicCard
              className="relative rounded-3xl border border-white/10 bg-[#0b0f12]/85 p-7 md:p-10"
              gradientFrom="#34d399"
              gradientTo="#38bdf8"
              gradientOpacity={0.18}
              gradientSize={200}
            >
              <BorderBeam size={120} duration={7} colorFrom="#34d399" colorTo="#38bdf8" />
              <AnimatedGradientText
                speed={1.4}
                colorFrom="#34d399"
                colorTo="#fbbf24"
                className="text-xs uppercase tracking-[0.35em]"
              >
                Seedance2 AI
              </AnimatedGradientText>
              <h2 className="mt-6 text-balance text-4xl font-semibold text-white md:text-5xl">
                {section.title}
              </h2>
              <TextShimmer className="mt-4 text-white/60">
                {section.description}
              </TextShimmer>
              {section.tip && (
                <div
                  className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/60"
                  dangerouslySetInnerHTML={{ __html: section.tip }}
                />
              )}
            </MagicCard>
          </ScrollAnimation>

          <ScrollAnimation delay={0.2}>
            <MagicCard
              className="rounded-3xl border border-white/10 bg-[#0b0f12]/85 p-3"
              gradientFrom="#38bdf8"
              gradientTo="#34d399"
              gradientOpacity={0.15}
              gradientSize={200}
            >
              <Accordion type="single" collapsible className="w-full space-y-3">
                {section.items?.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={item.question || item.title || ''}
                    className="group rounded-2xl border border-white/10 px-6 py-2 transition duration-300 data-[state=open]:border-emerald-400/30"
                  >
                    <AccordionTrigger className="cursor-pointer text-left text-base font-medium text-white hover:no-underline md:text-lg">
                      {item.question || item.title || ''}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm leading-relaxed text-white/60 md:text-base">
                        {item.answer || item.description || ''}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </MagicCard>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
