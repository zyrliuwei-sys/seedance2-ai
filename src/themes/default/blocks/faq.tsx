'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SmartIcon } from '@/shared/blocks/common';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { RetroGrid } from '@/shared/components/magicui/retro-grid';
import { AnimatedGridPattern } from '@/shared/components/ui/animated-grid-pattern';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Faq({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id={section.id}
      className={cn(
        'relative overflow-hidden',
        'bg-[#0a0a0c] text-white',
        'py-20 md:py-28 lg:py-32',
        section.className,
        className
      )}
    >
      {/* Atmospheric Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_20%_20%,rgba(251,191,36,0.12),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(34,211,238,0.10),transparent_52%),radial-gradient(900px_circle_at_50%_80%,rgba(236,72,153,0.08),transparent_56%)]" />
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
        <div className="absolute -top-80 left-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[180px] animate-pulse" />
        <div className="absolute -bottom-96 right-1/4 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[200px] animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
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
                FAQ
              </AnimatedGradientText>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 mb-6">
              {section.title}
            </h2>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        {/* FAQ Items */}
        <ScrollAnimation delay={0.2}>
          <div className="max-w-3xl mx-auto space-y-3">
            {section.items?.map((item, idx) => {
              const isOpen = openIndex === idx;
              const isAmber = idx % 2 === 0;
              const accentColor = isAmber ? '#fbbf24' : '#22d3ee';
              const accentBg = isAmber ? 'rgba(251,191,36,0.15)' : 'rgba(34,211,238,0.15)';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <motion.button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className={cn(
                      'group relative w-full text-left rounded-2xl border p-5 transition-all duration-200',
                      isOpen
                        ? 'border-white/25 bg-white/12'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                    )}
                    style={{
                      boxShadow: isOpen ? `0 0 0 1px ${accentColor}40` : undefined,
                    }}
                  >
                    {/* Question */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Icon */}
                        <div className="relative flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-200"
                          style={{
                            borderColor: isOpen ? accentColor : 'rgba(255,255,255,0.12)',
                            backgroundColor: isOpen ? accentBg : 'rgba(255,255,255,0.03)',
                          }}
                        >
                          <SmartIcon
                            name="RiQuestionLine"
                            size={18}
                            className={cn('transition-colors duration-200', isOpen ? 'text-white' : 'text-white/50')}
                          />
                        </div>

                        {/* Question text */}
                        <h3 className={cn(
                          'text-base font-semibold pr-4 transition-colors duration-200',
                          isOpen ? 'text-white' : 'text-white/70'
                        )}>
                          {item.question || item.title || ''}
                        </h3>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Answer */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-white/10">
                            <p className="text-sm text-white/60 leading-relaxed pl-14">
                              {item.answer || item.description || ''}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Active indicator */}
                    <div
                      className="absolute left-0 right-0 bottom-0 h-0.5 rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: accentColor,
                        width: isOpen ? '100%' : '0%',
                      }}
                    />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </ScrollAnimation>

        {/* Contact Tip */}
        {section.tip && (
          <ScrollAnimation delay={0.4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <p className="text-sm text-white/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.tip }} />
              </div>
            </motion.div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  );
}
