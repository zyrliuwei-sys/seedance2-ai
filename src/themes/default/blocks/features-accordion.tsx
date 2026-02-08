'use client';

import { useState, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';

import { LazyImage, SmartIcon } from '@/shared/blocks/common';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { RetroGrid } from '@/shared/components/magicui/retro-grid';
import { AnimatedGridPattern } from '@/shared/components/ui/animated-grid-pattern';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

const THEMES = [
  {
    primary: '#fbbf24',
    secondary: '#f59e0b',
    glow: 'rgba(251,191,36,0.35)',
    tint: 'rgba(251,191,36,0.15)',
    label: 'Technology'
  },
  {
    primary: '#22d3ee',
    secondary: '#06b6d4',
    glow: 'rgba(34,211,238,0.35)',
    tint: 'rgba(34,211,238,0.15)',
    label: 'Flexibility'
  },
  {
    primary: '#f472b6',
    secondary: '#ec4899',
    glow: 'rgba(244,114,182,0.35)',
    tint: 'rgba(244,114,182,0.15)',
    label: 'Experience'
  },
];

export function FeaturesAccordion({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const images: Record<string, { image: string; alt: string; video: any }> = {};
  section.items?.forEach((item, idx) => {
    images[`item-${idx + 1}`] = {
      image: item.image?.src ?? '',
      alt: item.image?.alt || item.title || '',
      video: item.video,
    };
  });

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        'bg-[#0a0a0c] text-white',
        'py-20 md:py-28 lg:py-36',
        section.className,
        className
      )}
    >
      {/* Atmospheric Background - Matching Hero */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_15%_25%,rgba(251,191,36,0.13),transparent_50%),radial-gradient(900px_circle_at_85%_15%,rgba(34,211,238,0.10),transparent_48%),radial-gradient(900px_circle_at_50%_80%,rgba(236,72,153,0.08),transparent_52%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.025),transparent_45%,rgba(255,255,255,0.02))] opacity-60" />

        {/* Animated Grid Pattern */}
        <AnimatedGridPattern
          className="opacity-[0.20] text-amber-300/25"
          maxOpacity={0.16}
          numSquares={42}
          duration={7}
          repeatDelay={1}
        />

        {/* Retro Grid */}
        <RetroGrid
          angle={62}
          opacity={0.08}
          cellSize={80}
          lightLineColor="rgba(251,191,36,0.26)"
          darkLineColor="rgba(34,211,238,0.26)"
        />

        {/* Decorative Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/5 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[180px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[200px]"
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        {/* Header */}
        <ScrollAnimation>
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-3 rounded-full border border-amber-400/30 bg-amber-400/8 px-6 py-3 mb-8 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-amber-300 to-cyan-300" />
              </span>
              <AnimatedGradientText
                speed={1.4}
                colorFrom="#fbbf24"
                colorTo="#22d3ee"
                className="text-[11px] uppercase tracking-[0.35em] font-semibold"
              >
                {section.label || 'Benefits'}
              </AnimatedGradientText>
            </div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {section.title}
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {section.description}
            </motion.p>
          </div>
        </ScrollAnimation>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
          {/* Features list */}
          <div className="flex flex-col gap-3">
            {section.items?.map((item, idx) => {
              const theme = THEMES[idx % THEMES.length];
              const isActive = activeIndex === idx;

              return (
                <motion.button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  className={cn(
                    'group relative w-full text-left rounded-2xl border p-5 transition-all duration-200',
                    'flex items-center gap-4',
                    isActive
                      ? 'border-white/25 bg-white/12'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  )}
                  style={{
                    boxShadow: isActive ? `0 0 0 1px ${theme.primary}40` : undefined,
                  }}
                >
                  {/* Icon */}
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-200"
                    style={{
                      borderColor: isActive ? theme.primary : 'rgba(255,255,255,0.12)',
                      backgroundColor: isActive ? `${theme.primary}18` : 'rgba(255,255,255,0.03)',
                    }}
                  >
                    <SmartIcon
                      name={item.icon as string}
                      size={22}
                      className={cn('transition-colors duration-200', isActive ? 'text-white' : 'text-white/50')}
                    />
                    <div
                      className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0a0c] transition-all duration-200"
                      style={{
                        backgroundColor: theme.primary,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'scale(1)' : 'scale(0.5)',
                      }}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      'text-base font-semibold mb-1 transition-colors duration-200',
                      isActive ? 'text-white' : 'text-white/60'
                    )}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/30 leading-relaxed line-clamp-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className={cn(
                    'flex-shrink-0 transition-transform duration-200',
                    isActive ? 'rotate-90' : 'rotate-0'
                  )}>
                    <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Active indicator */}
                  <div
                    className="absolute left-0 right-0 bottom-0 h-0.5 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: theme.primary,
                      width: isActive ? '100%' : '0%',
                    }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Preview area */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-8">
            {/* Video/Image card */}
            <div className="relative rounded-2xl border border-white/10 bg-[#0c0f12]/95 overflow-hidden">
              {/* Top badges */}
              <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: THEMES[activeIndex % THEMES.length].primary }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                    Live Preview
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">Scene</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold"
                    style={{ color: THEMES[activeIndex % THEMES.length].primary }}
                  >
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Video/Image */}
              <div className="relative aspect-video bg-black">
                <AnimatePresence mode="wait">
                  {(() => {
                    const videoSrc = images[`item-${activeIndex + 1}`]?.video?.src || section.video?.src;
                    const poster = images[`item-${activeIndex + 1}`]?.video?.poster || section.video?.poster;

                    return videoSrc ? (
                      <motion.video
                        key={`video-${activeIndex}`}
                        src={videoSrc}
                        poster={poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <motion.div
                        key={`image-${activeIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                      >
                        <LazyImage
                          src={images[`item-${activeIndex + 1}`]?.image}
                          alt={images[`item-${activeIndex + 1}`]?.alt}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1.5">
                        {THEMES[activeIndex % THEMES.length].label}
                      </p>
                      <p className="text-lg font-semibold text-white">
                        {section.items?.[activeIndex]?.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: THEMES[activeIndex % THEMES.length].primary }}
                      />
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse delay-75"
                        style={{ backgroundColor: THEMES[(activeIndex + 1) % THEMES.length].primary }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature description */}
            <motion.div
              className="p-4 rounded-xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              key={`desc-${activeIndex}`}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-0.5 h-10 rounded-full"
                  style={{ backgroundColor: THEMES[activeIndex % THEMES.length].primary }}
                />
                <p className="text-sm text-white/60 leading-relaxed flex-1">
                  {section.items?.[activeIndex]?.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
