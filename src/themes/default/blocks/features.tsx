'use client';

import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { MagicCard } from '@/shared/components/ui/magic-card';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
import { RetroGrid } from '@/shared/components/magicui/retro-grid';
import { AnimatedGridPattern } from '@/shared/components/ui/animated-grid-pattern';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';
import { useState } from 'react';

export function Features({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id={section.id}
      className={cn('relative overflow-hidden py-24 md:py-32 bg-[#0a0a0c]', section.className, className)}
    >
      {/* Atmospheric Background - Matching Hero */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_20%_20%,rgba(251,191,36,0.15),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(34,211,238,0.12),transparent_52%),radial-gradient(900px_circle_at_50%_80%,rgba(236,72,153,0.10),transparent_56%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03),transparent_45%,rgba(255,255,255,0.025))] opacity-60" />

        {/* Animated Grid Pattern */}
        <AnimatedGridPattern
          className="opacity-[0.22] text-amber-300/25"
          maxOpacity={0.18}
          numSquares={48}
          duration={7}
          repeatDelay={1}
        />

        {/* Retro Grid */}
        <RetroGrid
          angle={62}
          opacity={0.10}
          cellSize={80}
          lightLineColor="rgba(251,191,36,0.30)"
          darkLineColor="rgba(34,211,238,0.30)"
        />

        {/* Decorative Gradient Orbs */}
        <div className="absolute -top-80 left-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[180px] animate-pulse" />
        <div className="absolute -bottom-96 right-1/4 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[200px] animate-pulse delay-1000" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl text-center text-balance mb-20">
            <div className="inline-flex items-center gap-3 rounded-full border border-amber-400/30 bg-amber-400/8 px-6 py-3 mb-8 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-70" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-amber-300 to-cyan-300 shadow-[0_0_12px_rgba(251,191,36,0.7)]" />
              </span>
              <AnimatedGradientText
                speed={1.4}
                colorFrom="#fbbf24"
                colorTo="#22d3ee"
                className="text-xs uppercase tracking-[0.4em] font-semibold"
              >
                Features
              </AnimatedGradientText>
            </div>

            <h2 className="text-white mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              {section.title}
            </h2>

            <p className="text-white/65 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        {/* Features Grid */}
        <ScrollAnimation delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items?.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              // Alternate between amber and cyan themes
              const isAmber = idx % 2 === 0;
              const primaryColor = isAmber ? '#fbbf24' : '#22d3ee';
              const secondaryColor = isAmber ? '#f59e0b' : '#06b6d4';

              return (
                <ScrollAnimation key={idx} delay={0.08 * idx}>
                  <div
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative"
                  >
                    {/* Glow Effect on Hover */}
                    {isHovered && (
                      <div
                        className={cn(
                          'absolute -inset-1 rounded-3xl blur-xl transition-opacity duration-500',
                          'bg-gradient-to-r opacity-50',
                          isAmber
                            ? 'from-amber-500/40 via-orange-400/40 to-yellow-400/40'
                            : 'from-cyan-500/40 via-blue-400/40 to-teal-400/40'
                        )}
                      />
                    )}

                    <MagicCard
                      className={cn(
                        'relative h-full rounded-3xl border border-white/10 bg-[#0c0f12]/90 p-8',
                        'transition-all duration-500',
                        'hover:scale-[1.02] hover:border-white/20',
                        'backdrop-blur-sm'
                      )}
                      gradientFrom={primaryColor}
                      gradientTo={secondaryColor}
                      gradientOpacity={0.15}
                      gradientSize={280}
                    >
                      {/* Animated Border */}
                      <BorderBeam
                        size={150}
                        duration={12}
                        colorFrom={primaryColor}
                        colorTo={secondaryColor}
                        borderWidth={1.5}
                        className={cn(
                          'opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                          isHovered ? 'opacity-100' : 'opacity-0'
                        )}
                      />

                      <div className="flex h-full flex-col gap-5 relative z-10">
                        {/* Icon */}
                        <div className="relative">
                          <div
                            className={cn(
                              'inline-flex size-16 items-center justify-center rounded-2xl',
                              'border border-white/10 bg-gradient-to-br from-white/10 to-white/5',
                              'transition-all duration-500',
                              'group-hover:scale-110 group-hover:border-white/20',
                              'group-hover:shadow-lg group-hover:shadow-black/30'
                            )}
                          >
                            <div
                              className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
                              style={{
                                background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
                                opacity: isHovered ? 1 : 0
                              }}
                            />
                            <SmartIcon
                              name={item.icon as string}
                              size={28}
                              className={cn(
                                'transition-all duration-500',
                                isHovered ? 'scale-110' : 'scale-100'
                              )}
                              style={{ color: primaryColor }}
                            />
                          </div>

                          {/* Decorative Elements */}
                          <div className="absolute -top-2 -right-2 flex gap-1">
                            <div
                              className="h-1.5 w-1.5 rounded-full transition-opacity duration-300"
                              style={{
                                backgroundColor: primaryColor,
                                opacity: isHovered ? 0.6 : 0.3
                              }}
                            />
                            <div
                              className="h-1.5 w-1.5 rounded-full transition-opacity duration-300"
                              style={{
                                backgroundColor: secondaryColor,
                                opacity: isHovered ? 0.4 : 0.2
                              }}
                            />
                            <div
                              className="h-1.5 w-1.5 rounded-full transition-opacity duration-300"
                              style={{
                                backgroundColor: primaryColor,
                                opacity: isHovered ? 0.2 : 0.1
                              }}
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3
                            className={cn(
                              'text-xl font-bold text-white mb-3',
                              'transition-all duration-500',
                              'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r',
                              isAmber
                                ? 'group-hover:from-amber-300 group-hover:to-orange-300'
                                : 'group-hover:from-cyan-300 group-hover:to-blue-300'
                            )}
                          >
                            {item.title}
                          </h3>
                          <p className="text-white/60 text-base leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Bottom Accent */}
                        <div className="mt-auto pt-4">
                          <div
                            className={cn(
                              'h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent',
                              'transition-all duration-500'
                            )}
                            style={{
                              background: isHovered
                                ? `linear-gradient(90deg, transparent, ${primaryColor}, ${secondaryColor}, transparent)`
                                : undefined
                            }}
                          />
                        </div>
                      </div>
                    </MagicCard>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </ScrollAnimation>

        {/* Bottom Accent Line */}
        <ScrollAnimation delay={0.5}>
          <div className="mt-20 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1.5 w-1.5 rounded-full transition-opacity duration-300',
                      i === 0 ? 'bg-amber-300/50' : i === 1 ? 'bg-cyan-300/50' : 'bg-pink-300/50',
                      'animate-pulse'
                    )}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
