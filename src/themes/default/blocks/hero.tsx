'use client';

import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';

import { Link } from '@/core/i18n/navigation';
import { WanVideoGeneratorInline } from '@/shared/blocks/generator/wan-video';
import { VideoShowcase } from '@/shared/blocks/gallery/video-showcase';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { AnimatedGridPattern } from '@/shared/components/ui/animated-grid-pattern';
import { Particles } from '@/shared/components/ui/particles';
import { ShimmerButton } from '@/shared/components/ui/shimmer-button';
import { Button } from '@/shared/components/ui/button';
import { RetroGrid } from '@/shared/components/magicui/retro-grid';
import { TextShimmer } from '@/shared/components/magicui/text-shimmer';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Hero({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const generatorRef = useRef<HTMLDivElement | null>(null);
  const backgroundVideo = section.background_video ?? section.video;

  const handleScrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id={section.id}
      className={cn(
        'relative min-h-[70vh] overflow-hidden bg-[#0a0a0c] text-white',
        className
      )}
    >
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_15%_18%,rgba(251,191,36,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_10%,rgba(34,211,238,0.14),transparent_58%),radial-gradient(900px_circle_at_50%_85%,rgba(236,72,153,0.12),transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_45%,rgba(255,255,255,0.03))] opacity-70" />
        {backgroundVideo?.src ? (
          <video
            src={backgroundVideo.src}
            poster={backgroundVideo.poster}
            autoPlay={backgroundVideo.autoplay ?? true}
            loop={backgroundVideo.loop ?? true}
            muted={backgroundVideo.muted ?? true}
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
        ) : section.background_image?.src ? (
          <Image
            src={section.background_image.src}
            alt={section.background_image.alt || 'Hero background'}
            fill
            className="object-cover opacity-30"
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/65 to-black" />
        <AnimatedGridPattern
          className="opacity-[0.26] text-amber-300/30"
          maxOpacity={0.2}
          numSquares={52}
          duration={7}
          repeatDelay={1}
        />
        <RetroGrid
          angle={62}
          opacity={0.12}
          cellSize={80}
          lightLineColor="rgba(251,191,36,0.35)"
          darkLineColor="rgba(34,211,238,0.35)"
        />
        <Particles
          className="absolute inset-0"
          quantity={110}
          color="#f5d48a"
          staticity={55}
          ease={30}
          size={0.4}
        />
      </div>

      {/* Announcement */}
      {section.announcement && (
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex justify-center">
            <Link
              href={section.announcement.url || ''}
              target={section.announcement.target || '_self'}
              className="group inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.35em] text-amber-200"
            >
              <span className="inline-flex size-2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.85)]" />
              <span>{section.announcement.title}</span>
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-10">
        <div className="space-y-5 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.4em]">
            <Sparkles className="size-3 text-amber-200" />
            <AnimatedGradientText
              speed={1.4}
              colorFrom="#fbbf24"
              colorTo="#22d3ee"
              className="font-semibold"
            >
              Seedance2 AI
            </AnimatedGradientText>
          </div>

          {section.title && (
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="block text-white">{section.title}</span>
              </h1>
              {section.highlight_text && (
                <p className="text-xl md:text-2xl text-white/75 tracking-tight">
                  {section.highlight_text}
                </p>
              )}
            </div>
          )}

          {section.description && (
            <div className="max-w-xl mx-auto space-y-2 text-center">
              <p
                className="text-base text-white/70 sm:text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
              <div className="mx-auto h-px w-16 bg-white/20" />
            </div>
          )}



          {section.buttons && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
              {section.buttons.map((button, idx) =>
                idx === 0 ? (
                  <Link
                    key={idx}
                    href={button.url ?? ''}
                    target={button.target ?? '_self'}
                    className="inline-flex"
                  >
                    <ShimmerButton
                      className="h-10 px-5 text-sm font-semibold"
                      shimmerColor="#f5d48a"
                      background="rgba(8, 9, 12, 0.85)"
                    >
                      <span className="flex items-center gap-2">
                        {button.icon && <span>{button.icon}</span>}
                        {button.title}
                        <ArrowRight className="size-4" />
                      </span>
                    </ShimmerButton>
                  </Link>
                ) : (
                  <Button
                    key={idx}
                    asChild
                    size="lg"
                    className="h-10 px-5 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  >
                    <Link
                      href={button.url ?? ''}
                      target={button.target ?? '_self'}
                      className="flex items-center gap-2"
                    >
                      {button.icon && <span>{button.icon}</span>}
                      <span>{button.title}</span>
                    </Link>
                  </Button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Video Generator */}
      <div ref={generatorRef} id="wan-generator" className="relative z-10 mx-auto max-w-7xl px-4 pb-16">
        <WanVideoGeneratorInline />
      </div>

      {/* Video Showcase */}
      <VideoShowcase />
    </section>
  );
}
