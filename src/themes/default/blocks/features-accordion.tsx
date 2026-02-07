'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';

import { LazyImage, SmartIcon } from '@/shared/blocks/common';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
import { Meteors } from '@/shared/components/magicui/meteors';
import { Ripple } from '@/shared/components/magicui/ripple';
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

  // Different colors for each item
  const itemColors = [
    { from: '#34d399', to: '#38bdf8' }, // emerald to sky
    { from: '#fbbf24', to: '#34d399' }, // amber to emerald
    { from: '#38bdf8', to: '#fbbf24' }, // sky to amber
  ];

  return (
    <section
      className={cn(
        'relative overflow-hidden py-20 md:py-28 bg-[#050608]',
        section.className,
        className
      )}
    >
      {/* Enhanced background effects with Magic UI */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ripple effect */}
        <Ripple
          mainCircleSize={160}
          mainCircleOpacity={0.1}
          numCircles={6}
          className="absolute inset-0"
        />

        {/* Meteors */}
        <Meteors
          number={8}
          minDelay={0.8}
          maxDelay={3}
          minDuration={5}
          maxDuration={14}
          angle={215}
        />

        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-10 h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]" />
      </div>

      <div className="container relative space-y-12">
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl text-center text-balance">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-6">
              <Sparkles className="size-3.5 text-emerald-300 animate-pulse" />
              <AnimatedGradientText
                speed={1.4}
                colorFrom="#34d399"
                colorTo="#38bdf8"
                className="text-xs uppercase tracking-[0.35em]"
              >
                Why Seedance2
              </AnimatedGradientText>
            </div>
            <h2 className="mt-4 mb-5 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              {section.title}
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        {/* Content with alternating layout for zigzag effect */}
        <div className="space-y-20 md:space-y-28">
          {section.items?.map((item, idx) => {
            const isActive = activeItem === `item-${idx + 1}`;
            const colors = itemColors[idx % itemColors.length];
            const isEven = idx % 2 === 0;

            return (
              <ScrollAnimation key={idx} delay={idx * 0.1} direction={isEven ? 'left' : 'right'}>
                <div
                  className={cn(
                    'grid gap-8 md:gap-12 items-center',
                    isEven ? 'md:grid-cols-[1fr_1.1fr]' : 'md:grid-cols-[1.1fr_1fr]'
                  )}
                >
                  {/* Feature card - alternates left/right */}
                  <MagicCard
                    className={cn(
                      'rounded-2xl border border-white/10 bg-[#0b0f12]/80 p-6 transition-all duration-300',
                      isActive ? 'border-emerald-400/30' : 'hover:border-white/20'
                    )}
                    gradientFrom={isActive ? colors.from : '#34d399'}
                    gradientTo={isActive ? colors.to : '#38bdf8'}
                    gradientOpacity={isActive ? 0.18 : 0.12}
                    gradientSize={200}
                    onClick={() => setActiveItem(`item-${idx + 1}`)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className={cn(
                          'size-12 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300',
                          isActive ? 'bg-white/10 scale-110' : 'bg-white/5'
                        )}>
                          <SmartIcon
                            name={item.icon as string}
                            size={24}
                            className={isActive ? 'text-emerald-200' : 'text-white/60'}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Active indicator */}
                        {isActive && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
                            <span className="font-medium">Viewing demo</span>
                            <div className="h-1.5 flex-1 rounded-full bg-emerald-400/20 overflow-hidden">
                              <div className="h-full bg-emerald-400 animate-pulse" style={{ width: '100%' }} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Chevron indicator */}
                      <ChevronDay className={cn(
                        'size-5 text-white/40 transition-transform duration-300',
                        isActive ? 'rotate-90 text-emerald-300' : ''
                      )} />
                    </div>
                  </MagicCard>

                  {/* Preview - alternates right/left */}
                  <div className={cn('order-2', isEven ? 'md:order-2' : 'md:order-1')}>
                    <MagicCard
                      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f12]/80 p-2"
                      gradientFrom={colors.from}
                      gradientTo={colors.to}
                      gradientOpacity={0.2}
                      gradientSize={240}
                    >
                      <BorderBeam
                        duration={8}
                        size={200}
                        colorFrom={colors.from}
                        colorTo={colors.to}
                      />
                      <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden">
                        <AnimatePresence mode="wait">
                          {(images[`item-${idx + 1}`]?.video ?? section.video) ? (
                            <video
                              key={`video-${idx}`}
                              src={(images[`item-${idx + 1}`]?.video ?? section.video)?.src}
                              poster={(images[`item-${idx + 1}`]?.video ?? section.video)?.poster}
                              autoPlay={isActive}
                              loop
                              muted
                              playsInline
                              className="size-full object-cover"
                            />
                          ) : (
                            <LazyImage
                              key={`image-${idx}`}
                              src={images[`item-${idx + 1}`].image}
                              className="size-full object-cover"
                              alt={images[`item-${idx + 1}`].alt}
                            />
                          )}
                        </AnimatePresence>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </MagicCard>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Chevron component for the accordion indicator
function ChevronDay({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
