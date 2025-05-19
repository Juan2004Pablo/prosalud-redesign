import React, { useRef } from 'react';
import { Award, Briefcase, Users } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

const statsData = [
  {
    icon: Award,
    mainText: "+10 años",
    subText: "de experiencia",
    iconColor: "text-primary-prosalud",
    textColor: "text-primary-prosalud",
  },
  {
    icon: Briefcase,
    mainText: "7 convenios",
    subText: "en Antioquia",
    iconColor: "text-secondary-prosaludgreen",
    textColor: "text-secondary-prosaludgreen",
  },
  {
    icon: Users,
    mainText: "Aprox 1500",
    subText: "afiliados",
    iconColor: "text-accent-prosaludteal",
    textColor: "text-accent-prosaludteal",
  },
];

const DescriptionContent: React.FC = () => (
  <section id="descripcion-prosalud" className="py-12 sm:py-16 md:py-24 bg-white animate-fade-in">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-prosalud mb-3 sm:mb-4 tracking-tight">
          Descubre ProSalud
        </h2>
        <p className="text-lg sm:text-xl text-text-gray max-w-3xl mx-auto font-light px-2">
          Una mirada profunda a nuestra identidad y compromiso.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16 text-center">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 sm:p-6"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <stat.icon size={48} className={`${stat.iconColor} mb-3 sm:mb-4`} />
            <h3 className={`text-2xl sm:text-3xl font-bold ${stat.textColor} mb-1 sm:mb-2`}>{stat.mainText}</h3>
            <p className="text-base sm:text-lg text-text-gray">{stat.subText}</p>
          </div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto text-center" style={{ animationDelay: `${statsData.length * 150}ms` }}>
        <p className="text-base sm:text-lg text-text-gray leading-relaxed px-4">
          El Sindicato de Profesionales de la Salud ProSalud, es un Sindicato de gremio que funciona de conformidad con la Constitución Nacional, está orientado al bienestar de los afiliados de manera autogestionaria y autónoma, permitiendo el logro de los objetivos establecidos y la atención de procesos y subprocesos con capital humano capacitado en beneficio de todos los usuarios en las diferentes empresas receptoras del Servicio.
        </p>
      </div>
    </div>
  </section>
);

const DescriptionSkeleton: React.FC = () => (
  <section className="py-12 sm:py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <Skeleton className="h-10 w-3/4 mx-auto mb-3 sm:mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16 text-center">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col items-center p-4 sm:p-6">
            <Skeleton className="h-12 w-12 rounded-full mb-3 sm:mb-4" />
            <Skeleton className="h-8 w-24 mb-1 sm:mb-2" />
            <Skeleton className="h-6 w-32" />
          </div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto text-center">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-4/5 mx-auto" />
      </div>
    </div>
  </section>
);

const DescriptionSection: React.FC = () => {
  const observerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(observerRef, { threshold: 0.1, freezeOnceVisible: true });

  return (
    <div ref={observerRef} className="min-h-[1px]">
      {isVisible ? <DescriptionContent /> : <DescriptionSkeleton />}
    </div>
  );
};

export default DescriptionSection;
