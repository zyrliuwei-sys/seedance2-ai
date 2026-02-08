'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

import { SmartIcon } from '@/shared/blocks/common';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { RetroGrid } from '@/shared/components/magicui/retro-grid';
import { AnimatedGridPattern } from '@/shared/components/ui/animated-grid-pattern';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

const PALETTES = [
  {
    accent: '#fbbf24',
    glow: 'rgba(251,191,36,0.5)',
    tint: 'rgba(251,191,36,0.25)',
    label: 'Text',
  },
  {
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.5)',
    tint: 'rgba(34,211,238,0.25)',
    label: 'Image',
  },
  {
    accent: '#f472b6',
    glow: 'rgba(244,114,182,0.5)',
    tint: 'rgba(244,114,182,0.25)',
    label: 'Speed',
  },
  {
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    tint: 'rgba(167,139,250,0.25)',
    label: 'Model',
  },
];

export function FeaturesList({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        'bg-[#0a0a0c] text-white',
        'py-20 md:py-24 lg:py-28',
        section.className,
        className
      )}
    >
      {/* Atmospheric Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_25%_20%,rgba(251,191,36,0.16),transparent_50%),radial-gradient(950px_circle_at_75%_30%,rgba(34,211,238,0.12),transparent_48%),radial-gradient(850px_circle_at_50%_80%,rgba(236,72,153,0.10),transparent_52%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_55%,rgba(255,255,255,0.025))] opacity-70" />

        <AnimatedGridPattern
          className="opacity-[0.22] text-amber-300/25"
          maxOpacity={0.16}
          numSquares={45}
          duration={7}
          repeatDelay={1}
        />

        <RetroGrid
          angle={62}
          opacity={0.10}
          cellSize={80}
          lightLineColor="rgba(251,191,36,0.32)"
          darkLineColor="rgba(34,211,238,0.32)"
        />

        <motion.div
          className="absolute top-1/5 left-1/5 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-amber-500/12 to-orange-500/12 blur-[250px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/5 right-1/5 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-500/12 to-blue-500/12 blur-[280px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimation>
          <div className="mb-16 md:mb-20">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 rounded-full border border-amber-400/30 bg-amber-400/8 px-6 py-3 mb-8 backdrop-blur-sm"
              >
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
                  {section.label || 'Introduce'}
                </AnimatedGradientText>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 mb-6"
              >
                {section.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto"
              >
                {section.description}
              </motion.p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {section.items?.map((item, idx) => {
                const palette = PALETTES[idx % PALETTES.length];
                const isHovered = hoveredIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group relative"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Glow Background */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute -inset-6 rounded-[32px] blur-2xl"
                        style={{ backgroundColor: palette.glow }}
                      />
                    )}

                    {/* Card */}
                    <motion.div
                      className={cn(
                        'relative rounded-3xl backdrop-blur-sm overflow-hidden',
                        'transition-all duration-500',
                        'border',
                        isHovered
                          ? 'border-white/25 bg-[#0c0f12]/95 p-6 shadow-2xl'
                          : 'border-white/10 bg-[#0c0f12]/80 p-5 shadow-xl'
                      )}
                      style={{
                        backgroundImage: isHovered
                          ? `linear-gradient(135deg, ${palette.tint}, transparent 60%)`
                          : undefined,
                      }}
                      whileHover={{ y: -4 }}
                    >
                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                          className="relative w-12 h-12 mx-auto mb-4"
                          animate={{ scale: isHovered ? 1.05 : 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          {isHovered && (
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              style={{ border: `2px solid ${palette.accent}40` }}
                              animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}

                          <div
                            className={cn(
                              'relative w-full h-full rounded-xl flex items-center justify-center',
                              'border transition-all duration-500',
                              isHovered
                                ? 'border-white/25 bg-white/12'
                                : 'border-white/10 bg-white/6'
                            )}
                            style={{
                              boxShadow: isHovered
                                ? `0 0 30px ${palette.glow}`
                                : `0 0 15px ${palette.glow}50`,
                            }}
                          >
                            <SmartIcon
                              name={item.icon as string}
                              className={cn(
                                'transition-all duration-400',
                                isHovered ? 'h-7 w-7' : 'h-6 w-6'
                              )}
                              style={{ color: palette.accent }}
                            />
                          </div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="text-center">
                          <motion.h3
                            className={cn(
                              'font-bold mb-2 transition-all duration-400',
                              isHovered
                                ? 'text-xl text-white'
                                : 'text-lg text-white/85'
                            )}
                            animate={{ y: isHovered ? 0 : 4 }}
                            transition={{ duration: 0.4 }}
                          >
                            {item.title}
                          </motion.h3>

                          <motion.p
                            className={cn(
                              'text-sm leading-relaxed transition-colors duration-400 mb-4',
                              isHovered ? 'text-white/70' : 'text-white/50'
                            )}
                            animate={{ opacity: isHovered ? 1 : 0.85 }}
                            transition={{ duration: 0.4 }}
                          >
                            {item.description}
                          </motion.p>

                          {/* Label Badge */}
                          <motion.div
                            className="inline-flex"
                            animate={{ y: isHovered ? 0 : 4 }}
                            transition={{ duration: 0.4 }}
                          >
                            <span
                              className={cn(
                                'px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap',
                                'transition-all duration-400',
                                isHovered
                                  ? 'bg-white/15 border-white/25 text-white'
                                  : 'bg-white/8 border-white/15 text-white/60'
                              )}
                              style={{
                                color: isHovered ? palette.accent : undefined,
                              }}
                            >
                              {palette.label}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </ScrollAnimation>

          {/* Helper Text */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 mb-4">
              Hover to explore features
            </p>
            <div className="flex items-center justify-center gap-3">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: PALETTES[i].accent }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
