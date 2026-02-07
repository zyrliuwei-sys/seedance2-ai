'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { LazyImage, SmartIcon } from '@/shared/blocks/common';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
import { Meteors } from '@/shared/components/magicui/meteors';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { MagicCard } from '@/shared/components/ui/magic-card';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function FeaturesAccordion({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [activeItem, setActiveItem] = useState<string>('item-1');

  const images: any = {};
  section.items?.forEach((item, idx) => {
    images[`item-${idx + 1}`] = {
      image: item.image?.src ?? '',
      alt: item.image?.alt || item.title || '',
      video: item.video,
    };
  });

  return (
    <section
      className={cn(
        'relative overflow-x-hidden py-20 md:py-28 bg-[#050608]',
        section.className,
        className
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[140px]" />
        <Meteors number={14} className="bg-emerald-300" />
      </div>

      <div className="container relative space-y-12">
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl text-center text-balance">
            <AnimatedGradientText
              speed={1.4}
              colorFrom="#34d399"
              colorTo="#38bdf8"
              className="text-xs uppercase tracking-[0.35em]"
            >
              Why Seedance2
            </AnimatedGradientText>
            <h2 className="mt-4 mb-5 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              {section.title}
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid min-w-0 gap-12 md:grid-cols-2 lg:gap-20 items-center">
          <ScrollAnimation delay={0.1} direction="left">
            <div className="space-y-4">
              <Accordion
                type="single"
                value={activeItem}
                onValueChange={(value) => setActiveItem(value as string)}
                className="w-full space-y-4"
              >
                {section.items?.map((item, idx) => (
                  <AccordionItem
                    value={`item-${idx + 1}`}
                    key={idx}
                    className="group rounded-2xl border border-white/10 bg-white/5 px-2 transition duration-300 data-[state=open]:border-emerald-400/30"
                  >
                    <AccordionTrigger className="px-4 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          {item.icon && (
                            <SmartIcon name={item.icon as string} size={20} className="text-emerald-200" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-5">
                      <div className="pl-14">
                        <p className="text-white/60 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.2} direction="right">
            <MagicCard
              className="relative flex min-w-0 flex-shrink overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f12]/80 p-3"
              gradientFrom="#34d399"
              gradientTo="#38bdf8"
              gradientOpacity={0.2}
              gradientSize={220}
            >
              <BorderBeam duration={8} size={220} colorFrom="#34d399" colorTo="#38bdf8" />
              <div className="relative aspect-4/3 w-full min-w-0 rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeItem}-id`}
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="size-full overflow-hidden rounded-2xl"
                  >
                    {(images[activeItem]?.video ?? section.video) ? (
                      <video
                        src={(images[activeItem]?.video ?? section.video)?.src}
                        poster={(images[activeItem]?.video ?? section.video)?.poster}
                        autoPlay={(images[activeItem]?.video ?? section.video)?.autoplay ?? true}
                        loop={(images[activeItem]?.video ?? section.video)?.loop ?? true}
                        muted={(images[activeItem]?.video ?? section.video)?.muted ?? true}
                        playsInline
                        className="size-full object-cover"
                      />
                    ) : (
                      <LazyImage
                        src={images[activeItem].image}
                        className="size-full object-cover"
                        alt={images[activeItem].alt}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </MagicCard>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
