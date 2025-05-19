import React, { useRef } from 'react';
import { BadgeCheck, Handshake } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

const valoresData = [
  {
    icon: BadgeCheck,
    title: "Ética",
    description: "Capacitación permanente, principios morales y credibilidad alcanzada por cada afiliado."
  },
  {
    icon: Handshake,
    title: "Fe en Dios, Lealtad y Colaboración",
    description: "Con la comunidad y las entidades donde laboremos, como guía para nuestros objetivos."
  }
];

const ValuesContent: React.FC = () => (
  <section className="py-12 sm:py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-prosalud mb-3 sm:mb-4 tracking-tight">Nuestros Valores</h2>
        <p className="text-lg sm:text-xl text-text-gray max-w-2xl mx-auto font-light px-2">
          Los pilares que guían cada una de nuestras acciones y decisiones.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {valoresData.map((valor, index) => (
          <div
            key={index}
            className="bg-card p-6 sm:p-8 rounded-xl shadow-lg border border-prosalud-border hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center animate-scale-in group transform hover:scale-105"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="p-3 sm:p-4 bg-primary-prosalud-light rounded-full mb-4 sm:mb-6 group-hover:bg-primary-prosalud transition-colors duration-300">
              <valor.icon size={40} className="text-primary-prosalud group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-text-dark mb-2 sm:mb-3">{valor.title}</h3>
            <p className="text-sm sm:text-base text-text-gray leading-relaxed">{valor.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ValueSkeletonCard: React.FC = () => (
  <div className="bg-card p-6 sm:p-8 rounded-xl shadow-lg border border-prosalud-border flex flex-col items-center text-center">
    <Skeleton className="h-16 w-16 rounded-full mb-4 sm:mb-6" />
    <Skeleton className="h-7 w-32 mb-2 sm:mb-3" />
    <Skeleton className="h-5 w-full mb-1" />
    <Skeleton className="h-5 w-4/5" />
  </div>
);

const ValuesSkeleton: React.FC = () => (
  <section className="py-12 sm:py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16">
        <Skeleton className="h-10 w-3/4 mx-auto mb-3 sm:mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        <ValueSkeletonCard />
        <ValueSkeletonCard />
      </div>
    </div>
  </section>
);

const ValuesSection: React.FC = () => {
  const observerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(observerRef, { threshold: 0.1, freezeOnceVisible: true });

  return (
    <div ref={observerRef} className="min-h-[1px]">
      {isVisible ? <ValuesContent /> : <ValuesSkeleton />}
    </div>
  );
};

export default ValuesSection;
