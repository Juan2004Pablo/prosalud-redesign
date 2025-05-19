
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

const HeroContent: React.FC = () => {
  const handleScrollToQuickLinks = () => {
    const quickLinksSection = document.getElementById('quick-links');
    if (quickLinksSection) {
      quickLinksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary-prosalud via-primary-prosalud-dark to-slate-900 text-text-light py-16 md:py-20 lg:py-24 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block bg-secondary-prosaludgreen/20 text-secondary-prosaludgreen px-3 py-1 text-sm font-medium rounded-full mb-4">
              Tu Bienestar, Nuestra Prioridad
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              ProSalud: Fortaleciendo a los Profesionales de la Salud
            </h1>
            <p className="text-lg md:text-xl text-primary-prosalud-light/90 mb-10 max-w-2xl mx-auto md:mx-0">
              Somos un sindicato de gremio comprometido con tu desarrollo laboral y personal. Descubre cómo te apoyamos y únete a nuestra comunidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
              <Button 
                size="lg" 
                className="bg-secondary-prosaludgreen hover:bg-secondary-prosaludgreen/90 text-white text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-6"
                onClick={handleScrollToQuickLinks}
              >
                Trámites Rápidos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary-prosalud-light text-primary-prosalud-light hover:bg-primary-prosalud-light/10 hover:text-white text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-6"
                asChild
              >
                <Link to="/nosotros/quienes-somos">Conócenos Más</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative grid grid-cols-2 gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
              {[
                "/images/collage/image_collage_1.jpg",
                "/images/collage/image_collage_2.jpg",
                "/images/collage/image_collage_3.jpg",
                "/images/collage/image_collage_4.png",
              ].map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Collage ProSalud ${index + 1}`}
                  width={250}
                  height={250}
                  className="rounded-lg object-cover w-full h-full aspect-square shadow-md transition-transform duration-300 group-hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroSkeleton: React.FC = () => (
  <section className="bg-gradient-to-br from-primary-prosalud via-primary-prosalud-dark to-slate-900 text-text-light py-16 md:py-20 lg:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Skeleton className="h-8 w-48 mb-4 rounded-full" />
          <Skeleton className="h-16 w-full md:w-5/6 mb-6" />
          <Skeleton className="h-10 w-full md:w-4/5 mb-10" />
          <div className="space-y-3 mb-10">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
            <Skeleton className="h-14 w-48 rounded-md" />
            <Skeleton className="h-14 w-40 rounded-md" />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-4 p-4">
            <Skeleton className="rounded-lg aspect-square w-full h-full" />
            <Skeleton className="rounded-lg aspect-square w-full h-full" />
            <Skeleton className="rounded-lg aspect-square w-full h-full" />
            <Skeleton className="rounded-lg aspect-square w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HeroSection: React.FC = () => {
  const observerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(observerRef, { threshold: 0.1, freezeOnceVisible: true });

  return (
    <div ref={observerRef} className="min-h-[1px]">
      {isVisible ? <HeroContent /> : <HeroSkeleton />}
    </div>
  );
};

export default HeroSection;
