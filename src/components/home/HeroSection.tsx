
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, freezeOnceVisible: true });

  const handleScrollToQuickLinks = () => {
    const quickLinksSection = document.getElementById('quick-links');
    if (quickLinksSection) {
      quickLinksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="bg-gradient-to-br from-primary-prosalud via-primary-prosalud-dark to-slate-900 text-text-light py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isVisible ? (
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Textual Content & Buttons */}
            <div className="md:text-left text-center transform transition-all duration-4000 opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_forwards]">
              <h1 className="font-bold mb-8">
                <span className="inline-block bg-secondary-prosaludgreen/20 text-secondary-prosaludgreen px-3 py-1 text-sm font-medium rounded-full mb-4">
                  Tu Bienestar, Nuestra Prioridad
                </span>
                <span className="block text-5xl md:text-6xl lg:text-7xl leading-tight">
                  <span className="text-prosalud-pro">Pro</span><span className="text-prosalud-salud">Salud</span>
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl mt-2 md:mt-3 leading-snug">
                  Cuidamos de ti,<br />
                  como tú cuidas de los demás
                </span>
              </h1>
              <p className="text-lg md:text-xl text-primary-prosalud-light/90 mb-10 max-w-2xl mx-auto md:mx-0">
                Tu portal de autogestión para acceder a servicios, trámites y beneficios de manera ágil y segura. Simplificamos tu día a día.
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
                <Link to="/nosotros/quienes-somos" aria-label="Conocer más sobre ProSalud">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-primary-prosalud border-text-light/70 hover:bg-text-light px-8 py-3 hover:text-primary-prosalud hover:underline w-full sm:w-auto transition-all duration-300 transform hover:scale-105 px-8 py-6"
                  >
                    Conócenos Más
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Image Collage */}
            <div className="hidden md:block transform transition-all duration-1000 opacity-0 translate-y-8 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-800/30 rounded-xl shadow-xl">
                {[
                  "/images/collage/image_collage_1.jpg",
                  "/images/collage/image_collage_4.png",
                  "/images/collage/image_collage_3.jpg",
                  "/images/collage/image_collage_2.jpg"
                ].map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Collage ProSalud imagen ${index + 1}`}
                    loading="lazy"
                    className="rounded-lg aspect-square object-cover border-2 border-slate-700 hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Skeleton Loader for HeroSection
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Skeleton className="h-16 w-3/4 mb-4" />
              <Skeleton className="h-10 w-1/2 mb-8" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4 mb-12" />
              <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4 p-4">
                <Skeleton className="rounded-lg aspect-square" />
                <Skeleton className="rounded-lg aspect-square" />
                <Skeleton className="rounded-lg aspect-square" />
                <Skeleton className="rounded-lg aspect-square" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
