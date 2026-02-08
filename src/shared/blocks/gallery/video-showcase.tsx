'use client';

import { useState } from 'react';
import { Play, Sparkles, Volume2 } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface VideoCase {
  id: number;
  title: string;
  prompt: string;
  video: string;
  thumbnail: string;
  category: string;
  duration: string;
  aspectRatio: string;
}

interface VideoShowcaseProps {
  className?: string;
}

// Custom event for using a prompt from gallery
const PROMPT_USE_EVENT = 'gallery-prompt-use';

export function triggerPromptUse(prompt: string) {
  const event = new CustomEvent(PROMPT_USE_EVENT, { detail: { prompt } });
  window.dispatchEvent(event);
}

export function VideoShowcase({ className }: VideoShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleUsePrompt = (prompt: string) => {
    // Scroll to generator
    const generatorElement = document.getElementById('wan-generator');
    if (generatorElement) {
      generatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Trigger prompt use event after scroll
    setTimeout(() => {
      triggerPromptUse(prompt);
    }, 500);
  };

  const cases: VideoCase[] = [
    {
      id: 1,
      title: 'Serene Sunset',
      prompt: 'A cinematic drone shot of a serene sunset over the ocean, golden hour lighting, waves gently crashing on the sandy beach, seagulls flying in the distance...',
      video: '/videos/gallery/sunset-ocean.mp4',
      thumbnail: '/videos/gallery/sunset-ocean-thumb.jpg',
      category: 'Nature',
      duration: '5s',
      aspectRatio: '16:9',
    },
    {
      id: 2,
      title: 'Neon City',
      prompt: 'Futuristic cyberpunk city at night, neon lights reflecting on wet streets, flying cars zooming through holographic billboards...',
      video: '/videos/gallery/neon-city.mp4',
      thumbnail: '/videos/gallery/neon-city-thumb.jpg',
      category: 'Sci-Fi',
      duration: '5s',
      aspectRatio: '16:9',
    },
    {
      id: 3,
      title: 'Dance Motion',
      prompt: 'Professional ballet dancer performing in a spotlight, elegant slow motion pirouette, flowing white dress with sequins sparkling...',
      video: '/videos/gallery/ballet-dance.mp4',
      thumbnail: '/videos/gallery/ballet-dance-thumb.jpg',
      category: 'People',
      duration: '5s',
      aspectRatio: '16:9',
    },
    {
      id: 4,
      title: 'Fluffy Friend',
      prompt: 'Adorable golden retriever puppy playing in autumn leaves, sunlight filtering through trees, slow motion capture...',
      video: '/videos/gallery/puppy-autumn.mp4',
      thumbnail: '/videos/gallery/puppy-autumn-thumb.jpg',
      category: 'Animals',
      duration: '5s',
      aspectRatio: '16:9',
    },
    {
      id: 5,
      title: 'Cosmic Journey',
      prompt: 'Spaceship traveling through a colorful nebula in deep space, vibrant purple and blue cosmic clouds...',
      video: '/videos/gallery/space-nebula.mp4',
      thumbnail: '/videos/gallery/space-nebula-thumb.jpg',
      category: 'Sci-Fi',
      duration: '5s',
      aspectRatio: '16:9',
    },
    {
      id: 6,
      title: 'Flow Art',
      prompt: 'Abstract colorful ink flowing in water, vibrant swirls of blue, pink and gold colors mixing gracefully...',
      video: '/videos/gallery/ink-flow.mp4',
      thumbnail: '/videos/gallery/ink-flow-thumb.jpg',
      category: 'Abstract',
      duration: '5s',
      aspectRatio: '16:9',
    },
  ];

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-[#0b0b10] py-20 md:py-28',
        className
      )}
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_10%_10%,rgba(251,191,36,0.12),transparent_60%),radial-gradient(900px_circle_at_90%_0%,rgba(34,211,238,0.1),transparent_55%),radial-gradient(900px_circle_at_20%_90%,rgba(236,72,153,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_40%,rgba(255,255,255,0.02))]" />
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.35em] text-white/70">
              <Sparkles className="size-3.5 text-amber-300" />
              AI Video Gallery
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Cinematic scenes, full frame
            </h2>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-600 hover:to-cyan-600 text-black"
            onClick={() => {
              document.getElementById('wan-generator')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            <Sparkles className="mr-2 size-5" />
            Start Creating
          </Button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((videoCase) => (
            <div
              key={videoCase.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/0 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
              onMouseEnter={() => {
                setHoveredId(videoCase.id);
                setMounted(true);
              }}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleUsePrompt(videoCase.prompt)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                {hoveredId === videoCase.id && mounted ? (
                  <video
                    key={`playing-${videoCase.id}`}
                    src={videoCase.video}
                    autoPlay
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Video not available, show placeholder
                      (e.target as HTMLVideoElement).style.display = 'none';
                      const placeholder = e.currentTarget?.parentElement?.querySelector('.placeholder-content');
                      if (placeholder) {
                        (placeholder as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : (
                  <>
                    {/* Video Thumbnail (first frame) */}
                    <video
                      key={`thumb-${videoCase.id}`}
                      src={videoCase.video}
                      preload="metadata"
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Video not available, show placeholder
                        (e.target as HTMLVideoElement).style.display = 'none';
                        const placeholder = e.currentTarget?.parentElement?.querySelector('.placeholder-content');
                        if (placeholder) {
                          (placeholder as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors pointer-events-none">
                      <div className="relative flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-transform group-hover:scale-110">
                        <Play className="size-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                    {/* Sound Indicator */}
                    <div className="absolute top-4 right-4 pointer-events-none">
                      <div className="flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 px-2.5 py-1 text-[10px] font-medium text-white">
                        <Volume2 className="size-3" />
                        <span>Sound</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Placeholder (shown when video not available) */}
                <div
                  className="placeholder-content absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900"
                  style={{ display: 'none' }}
                >
                  <div className="text-center p-4">
                    <Play className="mx-auto mb-2 size-10 text-white/30" />
                    <p className="text-sm text-white/40">Video coming soon</p>
                  </div>
                </div>

                {/* Overlay (only when playing) */}
                {hoveredId === videoCase.id && mounted && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                )}
              </div>
              {/* Meta */}
              <div className="space-y-3 px-5 py-4">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-white/50">
                  <span>{videoCase.category}</span>
                  <span>{videoCase.duration}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {videoCase.title}
                </h3>
                <p className="text-sm text-white/60 line-clamp-2">
                  {videoCase.prompt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
