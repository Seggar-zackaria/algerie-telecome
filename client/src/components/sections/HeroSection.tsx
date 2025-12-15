import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useSyncExternalStore, useCallback } from 'react';
import { useHeroSlides } from '@/hooks/useHeroSlide';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { getLocalizedContent } from '@/lib/i18n-utils';

export const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi>()
  const { data: slides = [], isLoading } = useHeroSlides();
  const { i18n } = useTranslation();

  const subscribeToCarousel = useCallback((callback: () => void) => {
    if (!api) return () => {}
    api.on("select", callback)
    api.on("reInit", callback)
    return () => {
      api.off("select", callback)
      api.off("reInit", callback)
    }
  }, [api])

  const current = useSyncExternalStore(
    subscribeToCarousel,
    () => api?.selectedScrollSnap() ? api.selectedScrollSnap() + 1 : 1,
    () => 1
  )

  const count = api ? api.scrollSnapList().length : 0

  if (isLoading) {
    return (
      <section className="relative h-[95vh] w-full bg-gray-100 flex items-center justify-center">
        <Skeleton className="h-full w-full" />
      </section>
    );
  }

  if (!slides.length) {
     return null;
  }

  return (
    <section id="home" className="relative h-[95vh] w-full overflow-hidden">
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent className="h-full -ml-0">
          {slides.filter(s => s.isActive).map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 relative h-full w-full group">
              <div className="absolute inset-0">
                <img 
                  src={slide.imageUrl} 
                  alt={getLocalizedContent(slide.title, i18n.language)}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

              <div className="absolute inset-0 flex items-center justify-center p-4">
                 <div className="bg-black/30 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl max-w-4xl text-center space-y-6 shadow-2xl animate-in fade-in zoom-in duration-700 slide-in-from-bottom-8">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
                      {getLocalizedContent(slide.title, i18n.language)}
                    </h1>
                     <div className="h-2 w-32 mx-auto rounded-full bg-gradient-to-r from-primary to-blue-600" />
                    
                    {slide.description && (
                      <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto drop-shadow-md">
                        {getLocalizedContent(slide.description, i18n.language)}
                      </p>
                    )}
                 </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-8 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md h-12 w-12 hidden md:flex" />
        <CarouselNext className="right-8 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md h-12 w-12 hidden md:flex" />

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index + 1 === current 
                  ? "w-8 bg-white" 
                  : "w-2.5 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};
