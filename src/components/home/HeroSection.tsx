
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const handleScrollToQuickLinks = () => {
    const quickLinksSection = document.getElementById('quick-links');
    if (quickLinksSection) {
      quickLinksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary-prosalud via-primary-prosalud-dark to-slate-900 text-text-light py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Textual Content & Buttons */}
          <div className="md:text-left text-center">
            <h1 className="font-bold mb-6 animate-fade-in">
              <span className="block text-5xl md:text-6xl lg:text-7xl leading-tight">
                <span className="text-prosalud-pro">Pro</span><span className="text-prosalud-salud">Salud</span>
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl mt-1 md:mt-2 leading-snug">
                Cuidamos de ti,<br />
                como tú cuidas de los demás
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 animate-fade-in animation-delay-100">
              Tu portal de autogestión para acceder a servicios, trámites y beneficios de manera ágil y segura. Simplificamos tu día a día.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center animate-fade-in animation-delay-200">
              <Button
                size="lg"
                className="bg-secondary-prosaludgreen hover:bg-secondary-prosaludgreen-dark text-text-light px-8 py-3"
                onClick={handleScrollToQuickLinks}
              >
                <span>Nuestros Servicios</span>
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Link to="/nosotros/quienes-somos">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-text-light border-text-light/70 hover:bg-text-light hover:text-primary-prosalud px-8 py-3 w-full sm:w-auto"
                >
                  Conócenos Más
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Image Collage */}
          <div className="animate-fade-in animation-delay-300 hidden md:block">
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-800/30 rounded-xl shadow-xl">
              {[
                "/images/collage/image_collage_1.jpg",
                "/images/collage/image_collage_4.png",
                "/images/collage/image_collage_2.jpg",
                "/images/collage/image_collage_3.jpg"
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Collage image ${index + 1}`}
                  className="rounded-lg aspect-square object-cover border-2 border-slate-700 hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
