'use client';

import Image from 'next/image';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';

import { Link } from '@/core/i18n/navigation';
import { WanVideoGeneratorInline } from '@/shared/blocks/generator/wan-video';
import { VideoShowcase } from '@/shared/blocks/gallery/video-showcase';
import { AnimatedGradientText } from '@/shared/components/ui/animated-gradient-text';
import { AnimatedGridPattern } from '@/shared/components/ui/animated-grid-pattern';
import { MagicCard } from '@/shared/components/ui/magic-card';
import { Particles } from '@/shared/components/ui/particles';
import { ShimmerButton } from '@/shared/components/ui/shimmer-button';
import { Button } from '@/shared/components/ui/button';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
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
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const handleScrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePlayPreview = () => {
    if (!previewVideoRef.current) return;
    previewVideoRef.current.play();
  };

  return (
    <section
      id={section.id}
      className={cn(
        'relative min-h-screen overflow-hidden bg-[#050608] text-white',
        className
      )}
    >
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_20%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(900px_circle_at_80%_10%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(800px_circle_at_50%_80%,rgba(251,191,36,0.08),transparent_60%)]" />
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        <AnimatedGridPattern
          className="opacity-[0.35] text-emerald-400/40"
          maxOpacity={0.25}
          numSquares={60}
          duration={6}
          repeatDelay={1}
        />
        <RetroGrid
          angle={58}
          opacity={0.15}
          cellSize={70}
          lightLineColor="rgba(16,185,129,0.35)"
          darkLineColor="rgba(56,189,248,0.35)"
        />
        <Particles
          className="absolute inset-0"
          quantity={120}
          color="#9ff3d0"
          staticity={60}
          ease={30}
          size={0.35}
        />
      </div>

      {/* Announcement */}
      {section.announcement && (
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex justify-center">
            <Link
              href={section.announcement.url || ''}
              target={section.announcement.target || '_self'}
              className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-emerald-200"
            >
              <span className="inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
              <span>{section.announcement.title}</span>
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em]">
              <Sparkles className="size-3 text-emerald-300" />
              <AnimatedGradientText
                speed={1.6}
                colorFrom="#34d399"
                colorTo="#38bdf8"
                className="font-semibold"
              >
                Seedance2 AI
              </AnimatedGradientText>
            </div>

            {section.title && (
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block text-white">{section.title}</span>
                {section.highlight_text && (
                  <span className="mt-4 block text-3xl md:text-4xl">
                    <AnimatedGradientText
                      speed={1.2}
                      colorFrom="#fbbf24"
                      colorTo="#34d399"
                      className="font-semibold"
                    >
                      {section.highlight_text}
                    </AnimatedGradientText>
                  </span>
                )}
              </h1>
            )}

            {section.description && (
              <p
                className="text-lg text-white/70 sm:text-xl max-w-2xl mx-auto lg:mx-0"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
            )}

            {section.tip && (
              <TextShimmer className="text-sm text-white/60 max-w-xl mx-auto lg:mx-0">
                {section.tip}
              </TextShimmer>
            )}

            {section.buttons && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                {section.buttons.map((button, idx) =>
                  idx === 0 ? (
                    <Link
                      key={idx}
                      href={button.url ?? ''}
                      target={button.target ?? '_self'}
                      className="inline-flex"
                    >
                      <ShimmerButton
                        className="h-12 px-6 text-sm font-semibold"
                        shimmerColor="#9ff3d0"
                        background="rgba(5, 6, 8, 0.8)"
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
                      className="h-12 px-6 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10"
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

          {/* Preview */}
          <div className="relative mx-auto lg:mx-0 max-w-2xl">
            <MagicCard
              className="relative rounded-[28px] border border-white/10 bg-[#0b0f12]/80 p-2 shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
              gradientFrom="#34d399"
              gradientTo="#38bdf8"
              gradientOpacity={0.25}
              gradientSize={260}
            >
              <BorderBeam
                size={120}
                duration={8}
                colorFrom="#34d399"
                colorTo="#38bdf8"
                borderWidth={1}
              />
              <div className="relative overflow-hidden rounded-2xl bg-black/60">
                <div className="aspect-[16/10] relative">
                  {section.video?.src ? (
                    <video
                      ref={previewVideoRef}
                      src={section.video.src}
                      poster={section.video.poster}
                      autoPlay={section.video.autoplay ?? true}
                      loop={section.video.loop ?? true}
                      muted={section.video.muted ?? true}
                      playsInline
                      onPlay={() => setIsPreviewPlaying(true)}
                      onPause={() => setIsPreviewPlaying(false)}
                      className="h-full w-full object-cover"
                    />
                  ) : section.image?.src ? (
                    <Image
                      src={section.image.src}
                      alt={section.image.alt || 'Preview'}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-950/40 to-slate-950">
                      <div className="text-center">
                        <div className="relative mx-auto mb-6 flex size-20 items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-2xl" />
                          <Sparkles className="relative size-9 text-emerald-200" />
                        </div>
                        <p className="text-lg font-medium text-white/90">Seedance2 AI</p>
                        <p className="text-sm text-white/50 mt-2">Text + Image to Video</p>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  <button
                    onClick={handlePlayPreview}
                    className={cn(
                      'absolute inset-0 flex items-center justify-center group transition-opacity duration-300',
                      isPreviewPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    )}
                  >
                    <div className="relative flex size-20 items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <div className="absolute inset-0 bg-emerald-300/20 rounded-full blur-xl" />
                      <div className="relative flex size-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                        <Play className="size-8 text-white fill-white ml-1 drop-shadow-lg" />
                      </div>
                    </div>
                  </button>
                </div>

                <div className="relative px-6 py-5 bg-gradient-to-b from-transparent to-black/40 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">Start Creating</p>
                      <p className="text-sm text-white/60">Free to try · No credit card</p>
                    </div>
                    <ShimmerButton
                      onClick={handleScrollToGenerator}
                      className="h-11 px-5 text-sm font-semibold"
                      shimmerColor="#fbbf24"
                      background="rgba(8, 10, 12, 0.9)"
                    >
                      Try Now
                    </ShimmerButton>
                  </div>
                </div>
              </div>
            </MagicCard>
          </div>
        </div>
      </div>

      {/* Video Generator */}
      <div ref={generatorRef} id="wan-generator" className="relative z-10 mx-auto max-w-7xl px-4 pb-20">
        <WanVideoGeneratorInline />
      </div>

      {/* Video Showcase */}
      <VideoShowcase />
    </section>
  );
}
