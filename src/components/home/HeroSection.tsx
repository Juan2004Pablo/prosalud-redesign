import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Zap, Image } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-100 via-white to-blue-100 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Bienestar y Beneficios <br />
              al alcance de tu mano
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Descubre un mundo de posibilidades diseñadas para mejorar tu calidad de vida y la de tu familia.
              ¡ProSalud te cuida!
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#servicios">
                <Button 
                  size="lg" 
                  className="bg-primary-prosalud hover:bg-primary-prosalud/90 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Trámites Rápidos
                </Button>
              </Link>
              <Link to="/servicios/galeria-bienestar">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-prosalud font-semibold px-8 py-3 rounded-xl backdrop-blur-sm transition-all hover:scale-105"
                >
                  <Image className="mr-2 h-5 w-5" />
                  Ver Galería
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="order-first md:order-none">
            <img
              src="/images/hero-image.svg"
              alt="Bienestar y Beneficios ProSalud"
              className="rounded-2xl shadow-2xl mx-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
