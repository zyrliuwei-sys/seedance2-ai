'use client';

import Image from 'next/image';
import { ArrowRight, Play, Sparkles, Video, Zap, Check, Star, Rocket } from 'lucide-react';
import { useRef } from 'react';

import { Link } from '@/core/i18n/navigation';
import { WanVideoGeneratorInline } from '@/shared/blocks/generator/wan-video';
import { Button } from '@/shared/components/ui/button';
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

  const handleScrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id={section.id}
      className={cn(
        'relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950',
        className
      )}
    >
      {/* Enhanced Animated Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Primary gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/10 via-transparent to-pink-950/10" />

        {/* Animated radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_20%,rgba(139,92,246,0.15),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(236,72,153,0.12),transparent_50%)] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_80%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse delay-2000" />

        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Enhanced Announcement */}
      {section.announcement && (
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex justify-center">
            <Link
              href={section.announcement.url || ''}
              target={section.announcement.target || '_self'}
              className="group relative inline-flex items-center gap-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 text-sm font-medium text-white/90 shadow-2xl shadow-purple-500/10 hover:border-white/20 hover:bg-white/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105"
            >
              <div className="relative flex h-2 w-2">
                <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-75"></div>
                <div className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
              </div>
              <span className="font-semibold">{section.announcement.title}</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </div>
        </div>
      )}

      {/* Main Hero Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-10 text-center lg:text-left">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-4 py-2 text-sm">
              <Star className="size-4 text-yellow-400" />
              <span className="text-white/90 font-medium">Powered by Wan 2.6 AI</span>
            </div>

            {/* Enhanced Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                {section.title && (
                  <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent animate-pulse">
                    {section.title}
                  </span>
                )}
              </h1>
              {/* Decorative line */}
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto lg:mx-0"></div>
            </div>

            {/* Enhanced Description */}
            {section.description && (
              <div className="max-w-2xl mx-auto lg:mx-0">
                <p
                  className="text-xl text-gray-300 sm:text-2xl leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.description }}
                />
              </div>
            )}

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <Check className="size-4 text-green-400" />
                <span className="text-sm text-white/90">Text to Video</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <Check className="size-4 text-green-400" />
                <span className="text-sm text-white/90">Image to Video</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <Check className="size-4 text-green-400" />
                <span className="text-sm text-white/90">High Quality</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/80 lg:justify-start">
              <div className="flex items-center gap-3">
                <Video className="size-5 text-purple-400" />
                <div>
                  <span className="text-3xl font-bold text-white">10K+</span>
                  <span className="text-sm text-gray-400 ml-1">Videos</span>
                </div>
              </div>
              <div className="hidden h-8 w-px bg-white/10 sm:block"></div>
              <div className="flex items-center gap-3">
                <Star className="size-5 text-yellow-400" />
                <div>
                  <span className="text-3xl font-bold text-white">4.9</span>
                  <span className="text-sm text-gray-400 ml-1">Rating</span>
                </div>
              </div>
              <div className="hidden h-8 w-px bg-white/10 sm:block"></div>
              <div className="flex items-center gap-3">
                <Rocket className="size-5 text-pink-400" />
                <div>
                  <span className="text-3xl font-bold text-white">2x</span>
                  <span className="text-sm text-gray-400 ml-1">Faster</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            {section.buttons && (
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                {section.buttons.map((button, idx) => (
                  <Button
                    key={idx}
                    asChild
                    size="lg"
                    className={cn(
                      "h-14 px-8 text-base font-semibold rounded-xl shadow-xl shadow-purple-500/20 transition-all duration-300",
                      button.variant === 'outline' || idx === 1
                        ? "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-2xl hover:shadow-purple-500/40"
                    )}
                  >
                    <Link href={button.url ?? ''} target={button.target ?? '_self'} className="flex items-center gap-2">
                      {button.icon && <span>{button.icon}</span>}
                      <span>{button.title}</span>
                      {idx === 0 && <ArrowRight className="size-4" />}
                    </Link>
                  </Button>
                ))}
              </div>
            )}

            {/* Features list */}
            <div className="flex flex-col gap-3 text-left text-gray-400">
              {[
                'Text to Video generation',
                'Image to Video animation',
                'AI-powered editing',
                '4K resolution support'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                    <Check className="size-3.5 text-purple-400" />
                  </div>
                  <span className="text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Video/Preview */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-blue-600/40 blur-3xl opacity-50 rounded-3xl" />

            {/* Main preview card */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] md:aspect-[16/10] relative bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20">
                {/* Video/Image preview */}
                {section.video?.src ? (
                  <video
                    src={section.video.src}
                    poster={section.video.poster}
                    autoPlay={section.video.autoplay ?? true}
                    loop={section.video.loop ?? true}
                    muted={section.video.muted ?? true}
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : section.image?.src ? (
                  <Image
                    src={section.image.src}
                    alt={section.image.alt || 'Video Generation Preview'}
                    fill
                    className="object-cover opacity-80"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-purple-500/20 backdrop-blur-sm">
                        <Video className="size-10 text-purple-400" />
                      </div>
                      <p className="text-white/60 text-lg">Video Preview</p>
                      <p className="text-white/40 text-sm">Your generated videos will appear here</p>
                    </div>
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handleScrollToGenerator}
                  className="group relative flex size-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/20"
                >
                  <Play className="size-8 text-white fill-white ml-1" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 blur-xl group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              {/* Bottom card overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#030014] via-[#030014]/90 to-transparent">
                <div className="flex items-center justify-between gap-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-3 md:p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
                      <Sparkles className="size-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-white">Try AI Video Generation</p>
                      <p className="text-xs text-gray-400">Free to get started</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleScrollToGenerator}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shrink-0"
                  >
                    <span className="hidden sm:inline">Create Now</span>
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by / Logo cloud */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wider">Trusted by creators worldwide</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
          {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Framer'].map((company, idx) => (
            <div key={idx} className="text-lg font-bold text-gray-400">
              {company}
            </div>
          ))}
        </div>
      </div>

      {/* Video Generator Section */}
      <div ref={generatorRef} id="wan-generator" className="relative z-10 mx-auto mt-20 mb-20 max-w-7xl px-4">
        <WanVideoGeneratorInline />
      </div>
    </section>
  );
}
