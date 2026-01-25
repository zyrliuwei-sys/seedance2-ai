'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { LazyImage, SmartIcon } from '@/shared/blocks/common';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
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
    };
  });

  return (
    // overflow-x-hidden to prevent horizontal scroll
    <section
      className={cn(
        'relative overflow-x-hidden py-20 md:py-32 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900',
        section.className,
        className
      )}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* add overflow-x-hidden to container */}
      <div className="container relative space-y-12 overflow-x-hidden px-2 sm:px-6 md:space-y-20 lg:space-y-24 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl text-center text-balance">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 mb-6 border border-blue-200/20 dark:border-blue-800/20">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Why Choose Us</span>
            </div>
            <h2 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              {section.title}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        {/* grid: clamp min-w-0 and fix px padding/breakpoints */}
        <div className="grid min-w-0 gap-16 sm:px-6 md:grid-cols-2 lg:gap-24 lg:px-0 items-center">
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
                    className="group border border-gray-200/50 dark:border-gray-800/50 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline group-hover:bg-gradient-to-r group-hover:from-blue-50/50 group-hover:to-purple-50/50 dark:group-hover:from-blue-950/50 dark:group-hover:to-purple-950/50 transition-all duration-300">
                      <div className="flex items-center gap-4 text-left">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {item.icon && (
                            <SmartIcon name={item.icon as string} size={20} className="text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5">
                      <div className="pl-16">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
            {/* Enhanced media container */}
            <div className="bg-white/80 dark:bg-slate-800/80 relative flex min-w-0 flex-shrink overflow-hidden rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-3 shadow-2xl backdrop-blur-xl">
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px]">
                <div className="w-full h-full rounded-3xl bg-white/90 dark:bg-slate-800/90"></div>
              </div>

              <div className="bg-white/95 dark:bg-slate-800/95 relative aspect-4/3 w-full min-w-0 rounded-2xl overflow-hidden shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeItem}-id`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="size-full overflow-hidden rounded-2xl"
                  >
                    {section.video ? (
                      <video
                        src={section.video.src}
                        poster={section.video.poster}
                        autoPlay={section.video.autoplay ?? true}
                        loop={section.video.loop ?? true}
                        muted={section.video.muted ?? true}
                        playsInline
                        className="size-full object-cover"
                      />
                    ) : (
                      <LazyImage
                        src={images[activeItem].image}
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={images[activeItem].alt}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Enhanced border beam */}
              <BorderBeam
                duration={8}
                size={250}
                className="from-blue-500 via-purple-500 to-pink-500"
              />

              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce delay-2000"></div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
