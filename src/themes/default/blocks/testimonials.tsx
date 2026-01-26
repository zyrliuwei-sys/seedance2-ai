'use client';

import { LazyImage } from '@/shared/blocks/common';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section, SectionItem } from '@/shared/types/blocks/landing';

export function Testimonials({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const TestimonialCard = ({ item, index }: { item: SectionItem; index: number }) => {
    return (
      <ScrollAnimation delay={index * 0.1}>
        <div className="group relative h-full">
          {/* Card background with glass effect */}
          <div className="bg-white/80 dark:bg-slate-800/80 relative h-full rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            {/* Decorative gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-full rounded-3xl bg-white/95 dark:bg-slate-800/95"></div>
            </div>

            <div className="relative h-full flex flex-col">
              {/* Quote icon */}
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
              </div>

              {/* Quote text */}
              <blockquote className="flex-1 mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium">
                  "{item.quote || item.description}"
                </p>
              </blockquote>

              {/* User info */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h4 className="text-gray-900 dark:text-white font-semibold text-lg">
                    {item.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.role || item.title}
                  </p>
                  {/* Rating stars */}
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    );
  };

  return (
    <section
      id={section.id}
      className={cn(
        'relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800',
        section.className,
        className
      )}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl text-center text-balance mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 mb-6 border border-blue-200/20 dark:border-blue-800/20">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">User Reviews</span>
            </div>
            <h2 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              {section.title}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        {/* Testimonials grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {section.items?.map((item, index) => (
            <TestimonialCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* Bottom stats */}
        <ScrollAnimation delay={0.4}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-6 bg-white/80 dark:bg-slate-800/80 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Videos Created</div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">5K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Users</div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">99%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
