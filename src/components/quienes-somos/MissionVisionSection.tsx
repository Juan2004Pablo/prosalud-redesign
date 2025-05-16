
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag, Eye } from 'lucide-react';

const MissionVisionSection: React.FC = () => {
  return (
    <section id="mision-vision" className="py-16 md:py-24 bg-background-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-stretch">
          <div className="animate-slide-in-right">
            <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden group transform hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-primary-prosalud to-accent-prosaludteal text-white p-6 rounded-t-xl">
                <CardTitle className="flex items-center text-3xl font-semibold">
                  <Flag size={32} className="mr-4 opacity-80 group-hover:opacity-100 transition-opacity" /> Misión
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 p-6 text-text-gray">
                <p className="text-lg leading-relaxed">
                  "Representar y fortalecer el oficio de los Profesionales de la Salud generando bienestar laboral y económico a todos sus afiliados partícipes, buscando así el mejoramiento en los estándares de calidad en la prestación de los servicios de las Instituciones contractuales."
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="animate-slide-in-right animation-delay-200">
            <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden group transform hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-secondary-prosaludgreen to-green-400 text-white p-6 rounded-t-xl">
                <CardTitle className="flex items-center text-3xl font-semibold">
                  <Eye size={32} className="mr-4 opacity-80 group-hover:opacity-100 transition-opacity" /> Visión
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 p-6 text-text-gray">
                <p className="text-lg leading-relaxed">
                  "En el 2018 nuestro Sindicato de Oficio será líder en el departamento de Antioquia, reconocida por el fortalecimiento en la modalidad de contrato colectivo laboral en beneficio de los afiliados y las empresas contractuales."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
