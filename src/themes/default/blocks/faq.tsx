'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { Section } from '@/shared/types/blocks/landing';

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
      className={`relative overflow-hidden py-24 md:py-32 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(59,130,246,0.22),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_72%,rgba(168,85,247,0.2),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_12%,transparent_88%,rgba(255,255,255,0.04))]" />

      <div className="container relative">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <ScrollAnimation>
            <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-7 shadow-[0_30px_80px_rgba(10,15,35,0.45)] backdrop-blur-sm md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-foreground/60">
                Signal
              </div>
              <h2 className="mt-6 text-balance text-4xl font-semibold text-foreground md:text-5xl">
                {section.title}
              </h2>
              <p className="mt-5 text-base text-muted-foreground md:text-lg">
                {section.description}
              </p>
              {section.tip && (
                <div
                  className="mt-8 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: section.tip }}
                />
              )}
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.2}>
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-white/[0.02] p-2 shadow-[0_36px_110px_rgba(10,15,35,0.5)] backdrop-blur-sm md:p-3">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {section.items?.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={item.question || item.title || ''}
                    className="group rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-2 transition duration-300 data-[state=open]:border-cyan-300/40 data-[state=open]:bg-white/[0.08] data-[state=open]:shadow-[0_0_0_1px_rgba(34,211,238,0.2)]"
                  >
                    <AccordionTrigger className="cursor-pointer text-left text-base font-medium text-foreground hover:no-underline md:text-lg">
                      {item.question || item.title || ''}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {item.answer || item.description || ''}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
