'use client';

import { useState } from 'react';
import { VideoCarousel } from '@/shared/components/video-carousel';
import { FunctionTabs, defaultFunctionTabs } from '@/shared/components/function-tabs';
import { IdeaPills, defaultVideoIdeas } from '@/shared/components/idea-pills';
import { VideoInputBox } from '@/shared/components/video-input-box';
import { Meteors } from '@/shared/components/magicui/meteors';
import { Particles } from '@/shared/components/ui/particles';

// Sample video slides for the carousel
const sampleSlides = [
  {
    id: '1',
    title: 'Turn Concepts Into Expressive Motion',
    description: 'AI-powered video generation',
    videoSrc: 'https://videocdn.pollo.ai/web-cdn/pollo/production/cm2l89z02005cohh6cl26c8hn/video/1770365353686-5bfa0cac-2087-4ee6-9425-635c82bda747.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop',
    link: '/ai-video-generator',
  },
  {
    id: '2',
    title: 'Cinematic Scene Creation',
    description: 'Professional video output',
    videoSrc: 'https://videocdn.pollo.ai/web-cdn/pollo/production/cm2l89z02005cohh6cl26c8hn/video/1770362665970-2420c3ab-9557-44a5-9626-2c13dd6b8766.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop',
    link: '/ai-video-generator',
  },
  {
    id: '3',
    title: 'Consistent Visuals & Lighting',
    description: 'High-quality output',
    videoSrc: 'https://videocdn.pollo.ai/web-cdn/pollo/production/cm2l89z02005cohh6cl26c8hn/video/1770356068896-8646b6c1-82fd-4576-ab6b-6c7ee6256711.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop',
    link: '/ai-video-generator',
  },
  {
    id: '4',
    title: 'Video Scenes With Sound',
    description: 'Complete audio-visual experience',
    videoSrc: 'https://videocdn.pollo.ai/web-cdn/pollo/production/cm2l89z02005cohh6cl26c8hn/video/1770344821286-2eb2a0d1-0be3-4fbf-b754-579cebd6f7bd.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop',
    link: '/ai-video-generator',
  },
];

export default function ShowcasePage() {
  const [ideas, setIdeas] = useState(defaultVideoIdeas);

  const handleRefreshIdeas = () => {
    // Shuffle ideas
    const shuffled = [...defaultVideoIdeas].sort(() => Math.random() - 0.5);
    setIdeas(shuffled);
  };

  const handleIdeaSelect = (idea: any) => {
    console.log('Selected idea:', idea);
  };

  const handleVideoSubmit = (prompt: string, options: any) => {
    console.log('Generate video:', { prompt, options });
  };

  return (
    <div className="relative min-h-screen bg-[#050608] overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <Meteors number={15} minDelay={0.5} maxDelay={2} minDuration={4} maxDuration={12} angle={220} />
        <Particles quantity={40} color="#a78bfa" staticity={70} ease={50} size={0.25} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.15),transparent_65%)]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-4">
            Visualize Your Creativity
          </h1>
          <p className="text-xl text-center text-white/60 mb-12">
            What would you like to create today?
          </p>

          {/* Quick Access Cards (Mobile) */}
          <div className="grid grid-cols-2 gap-4 lg:hidden mb-12">
            <a
              href="/ai-video-generator"
              className="relative group flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-[#1e1c2a] p-6 hover:bg-[#2a2a3a] transition-colors"
            >
              <div className="text-5xl">🎬</div>
              <div>
                <h3 className="text-white font-semibold">Generate AI Video</h3>
              </div>
            </a>
            <a
              href="/ai-image-generator"
              className="relative group flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-[#1e1c2a] p-6 hover:bg-[#2a2a3a] transition-colors"
            >
              <div className="text-5xl">🖼️</div>
              <div>
                <h3 className="text-white font-semibold">Generate AI Image</h3>
              </div>
            </a>
          </div>

          {/* Video Carousel */}
          <div className="mb-16">
            <VideoCarousel slides={sampleSlides} />
          </div>

          {/* Function Tabs (Desktop) */}
          <FunctionTabs tabs={defaultFunctionTabs} />

          {/* Video Input Box */}
          <div className="mt-12">
            <VideoInputBox
              onSubmit={handleVideoSubmit}
              credits={100}
            />
          </div>

          {/* Idea Pills */}
          <div className="mt-4">
            <IdeaPills
              ideas={ideas}
              onSelect={handleIdeaSelect}
              onRefresh={handleRefreshIdeas}
              maxDisplay={4}
            />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-white/60">
                Generate videos in seconds with our optimized AI pipeline
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-2">Creative Control</h3>
              <p className="text-white/60">
                Fine-tune every aspect of your video with advanced parameters
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-white mb-2">Professional Quality</h3>
              <p className="text-white/60">
                Output in 4K resolution with cinematic quality
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
