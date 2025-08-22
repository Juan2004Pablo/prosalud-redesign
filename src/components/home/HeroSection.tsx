
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, FileText } from 'lucide-react';

const HeroSection: React.FC = () => {
  const handleScrollToServices = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('servicios');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-prosalud via-primary-prosalud-dark to-slate-900 text-text-light py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in tracking-tight">
            Bienvenido a{' '}
            <span className="text-secondary-prosaludgreen">ProSalud</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl mb-8 animate-fade-in animation-delay-200 font-light max-w-3xl mx-auto leading-relaxed">
            El Sindicato de Profesionales de la Salud que trabaja por tu bienestar y desarrollo profesional
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in animation-delay-400">
            <Button 
              onClick={handleScrollToServices}
              size="lg" 
              className="bg-secondary-prosaludgreen hover:bg-secondary-prosaludgreen/90 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Trámites Rápidos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-prosalud px-8 py-3 text-lg font-semibold rounded-full transition-all hover:scale-105"
              asChild
            >
              <a href="/quienes-somos">Conoce ProSalud</a>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in animation-delay-600">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="h-8 w-8 text-secondary-prosaludgreen mb-3 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">500+</h3>
              <p className="text-sm opacity-90">Afiliados Activos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Calendar className="h-8 w-8 text-secondary-prosaludgreen mb-3 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">25+</h3>
              <p className="text-sm opacity-90">Años de Experiencia</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <FileText className="h-8 w-8 text-secondary-prosaludgreen mb-3 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">15+</h3>
              <p className="text-sm opacity-90">Servicios Disponibles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-secondary-prosaludgreen/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary-prosaludgreen/30 rounded-full blur-lg animate-pulse animation-delay-500"></div>
    </section>
  );
};

export default HeroSection;
