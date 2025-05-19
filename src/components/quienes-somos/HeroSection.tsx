
import React, { useRef } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

interface HeroSectionProps {
  handleScrollToSection: (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
}

const HeroContent: React.FC<HeroSectionProps> = ({ handleScrollToSection }) => (
  <section className="relative bg-gradient-to-br from-primary-prosalud via-primary-prosalud-dark to-slate-900 text-text-light py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden animate-fade-in">
    <div className="absolute inset-0 opacity-10">
      {/* Background texture */}
    </div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
        ¿Quiénes somos?
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto animation-delay-200 font-light px-2">
        Conoce la esencia de ProSalud, el Sindicato de Profesionales de la Salud.
      </p>
      <a
        href="#descripcion-prosalud"
        onClick={(e) => handleScrollToSection(e, 'descripcion-prosalud')}
        className="mt-8 sm:mt-10 inline-block animation-delay-400"
        aria-label="Ir a Descripción de ProSalud"
      >
        <ArrowDownCircle size={36} className="text-secondary-prosaludgreen hover:text-white transition-colors hover:scale-110" />
      </a>
    </div>
  </section>
);

const HeroSkeleton: React.FC = () => (
  <section className="relative bg-gradient-to-br from-primary-prosalud via-primary-prosalud-dark to-slate-900 text-text-light py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <Skeleton className="h-12 sm:h-14 md:h-16 w-3/4 mx-auto mb-4 sm:mb-6" />
      <Skeleton className="h-6 sm:h-7 md:h-8 w-1/2 mx-auto mb-8 sm:mb-10" />
      <Skeleton className="h-9 w-9 mx-auto rounded-full" />
    </div>
  </section>
);

const HeroSection: React.FC<HeroSectionProps> = ({ handleScrollToSection }) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(observerRef, { threshold: 0.1, freezeOnceVisible: true });

  return (
    <div ref={observerRef} className="min-h-[1px]">
      {isVisible ? <HeroContent handleScrollToSection={handleScrollToSection} /> : <HeroSkeleton />}
    </div>
  );
};

export default HeroSection;
