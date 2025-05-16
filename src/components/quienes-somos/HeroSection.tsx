
import React from 'react';
import { ArrowDownCircle } from 'lucide-react';

interface HeroSectionProps {
  handleScrollToSection: (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleScrollToSection }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary-prosalud via-primary-prosalud-dark to-slate-900 text-text-light py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* Background texture */}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in tracking-tight">
          ¿Quiénes somos?
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in animation-delay-200 font-light px-2">
          Conoce la esencia de ProSalud, el Sindicato de Profesionales de la Salud.
        </p>
        <a
          href="#descripcion-prosalud"
          onClick={(e) => handleScrollToSection(e, 'descripcion-prosalud')}
          className="mt-8 sm:mt-10 inline-block animate-fade-in animation-delay-400"
          aria-label="Ir a Descripción de ProSalud"
        >
          <ArrowDownCircle size={36} className="text-secondary-prosaludgreen hover:text-white transition-colors hover:scale-110" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
