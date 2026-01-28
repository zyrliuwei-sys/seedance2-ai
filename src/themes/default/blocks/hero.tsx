'use client';

import Image from 'next/image';
import { ArrowRight, Play, Sparkles, Video, Zap } from 'lucide-react';
import { useRef, useState } from 'react';

import { Link } from '@/core/i18n/navigation';
import { WanVideoGeneratorInline } from '@/shared/blocks/generator/wan-video';
import { VideoShowcase } from '@/shared/blocks/gallery/video-showcase';
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
  const backgroundVideo = section.background_video ?? section.video;

  // 3D card effect
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleScrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const transformStyle = {
    transform: isHovering
      ? `perspective(1000px) rotateX(${-mousePosition.y * 8}deg) rotateY(${mousePosition.x * 8}deg) translateZ(20px)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
  };

  const shadowStyle = {
    boxShadow: isHovering
      ? `${-mousePosition.x * 30}px ${-mousePosition.y * 30 + 20}px 60px -10px rgba(168,85,247,0.4),${mousePosition.x * 20}px ${mousePosition.y * 20}px 60px -10px rgba(236,72,153,0.3)`
      : '0 40px 80px -20px rgba(168,85,247,0.3)',
    transition: 'box-shadow 0.3s ease-out',
  };

  return (
    <section
      id={section.id}
      className={cn(
        'relative min-h-screen overflow-hidden bg-slate-950 mt-16',
        className
      )}
    >
      {/* Background Media */}
      <div className="pointer-events-none absolute inset-0">
        {backgroundVideo?.src ? (
          <video
            src={backgroundVideo.src}
            poster={backgroundVideo.poster}
            autoPlay={backgroundVideo.autoplay ?? true}
            loop={backgroundVideo.loop ?? true}
            muted={backgroundVideo.muted ?? true}
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : section.background_image?.src ? (
          <Image
            src={section.background_image.src}
            alt={section.background_image.alt || 'Hero background'}
            fill
            className="object-cover"
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-slate-950/70" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Announcement */}
      {section.announcement && (
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex justify-center">
            <Link
              href={section.announcement.url || ''}
              target={section.announcement.target || '_self'}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Zap className="size-3.5 text-yellow-500" />
              <span>{section.announcement.title}</span>
              <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 px-4 py-1.5 text-sm">
              <Sparkles className="size-3.5 text-purple-400" />
              <span className="text-purple-300 font-medium">AI Video Generator</span>
            </div>

            {/* Headline */}
            {section.title && (
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-br from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  {section.title}
                </span>
              </h1>
            )}

            {/* Description */}
            {section.description && (
              <p
                className="text-lg text-gray-400 sm:text-xl max-w-2xl mx-auto lg:mx-0"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
            )}

            {/* Buttons */}
            {section.buttons && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                {section.buttons.map((button, idx) => (
                  <Button
                    key={idx}
                    asChild
                    size="lg"
                    className={cn(
                      'h-12 px-6 rounded-lg font-medium transition-all',
                      idx === 0
                        ? 'bg-white text-slate-950 hover:bg-gray-100 shadow-lg shadow-white/10'
                        : 'border border-white/10 text-white'
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

            {/* Trust indicators */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Video className="size-4" />
                <span>10K+ videos created</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} className="size-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>4.9 rating</span>
              </div>
            </div>
          </div>

          {/* Right - Preview */}
          <div className="relative mx-auto lg:mx-0 max-w-2xl">
            {/* Glow effect behind */}
            <div
              className="absolute -inset-8 bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-blue-500/30 blur-3xl rounded-full opacity-60 transition-opacity duration-300"
              style={{
                opacity: isHovering ? '0.8' : '0.6',
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                transition: 'opacity 0.3s ease-out, transform 0.1s ease-out',
              }}
            />

            {/* Preview card with 3D effect */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-3xl overflow-hidden"
              style={{
                ...transformStyle,
                ...shadowStyle,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Animated gradient overlay */}
              <div
                className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, rgba(168,85,247,0.15), transparent 50%)`,
                  transition: 'background 0.1s ease-out',
                }}
              />

              {/* Video/Image area */}
              <div className="aspect-[16/10] relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden">
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
                    alt={section.image.alt || 'Preview'}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-slate-900">
                    <div className="text-center">
                      <div className="relative mx-auto mb-6 flex size-20 items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50" />
                        <Video className="relative size-10 text-white/80" />
                      </div>
                      <p className="text-lg font-medium text-white/90">AI Video Generator</p>
                      <p className="text-sm text-white/50 mt-2">Create stunning videos in seconds</p>
                    </div>
                  </div>
                )}

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Play button */}
                <button
                  onClick={handleScrollToGenerator}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="relative flex size-20 items-center justify-center transition-all duration-300 group-hover:scale-110">
                    {/* Outer glow */}
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all" />
                    {/* Main button */}
                    <div className="relative flex size-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                      <Play className="size-8 text-white fill-white ml-1 drop-shadow-lg" />
                    </div>
                  </div>
                </button>
              </div>

              {/* Bottom bar - elevated design */}
              <div className="relative px-6 py-5 bg-gradient-to-b from-transparent to-black/20 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Icon with glow */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-lg opacity-60" />
                      <div className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                        <Sparkles className="size-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white">Start Creating</p>
                      <p className="text-sm text-white/60">Free to try · No credit card</p>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    onClick={handleScrollToGenerator}
                    className="h-12 px-6 bg-white text-slate-950 hover:bg-gray-50 font-semibold rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.4)] transition-all"
                  >
                    Try Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo cloud */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-6">Trusted by leading companies</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40">
            {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Framer'].map((company, idx) => (
              <span key={idx} className="text-sm font-semibold text-gray-500">
                {company}
              </span>
            ))}
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
