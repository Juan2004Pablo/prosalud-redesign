
import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';
import { conveniosService } from '@/services/conveniosService';

const ConveniosSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, freezeOnceVisible: true });

  const { data: convenios, isLoading } = useQuery({
    queryKey: ['convenios-public'],
    queryFn: conveniosService.getConvenios,
    enabled: isVisible
  });

  const visibleConvenios = convenios?.filter(convenio => convenio.isVisible) || [];

  return (
    <section ref={sectionRef} id="convenios" className="py-16 md:py-20 bg-background-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isVisible ? (
          <>
            <div className="bg-primary-prosalud text-text-light p-8 rounded-lg shadow-lg mb-12 md:mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                A lo largo de nuestra trayectoria hemos tenido convenios con diferentes entidades en Antioquia
              </h2>
            </div>
            {isLoading ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, index) => (
                  <li key={index} className="bg-card p-6 rounded-lg shadow-md border border-prosalud-border flex items-center">
                    <Skeleton className="h-12 w-12 rounded-full mr-4 shrink-0" />
                    <Skeleton className="h-6 w-3/4" />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleConvenios.map((convenio, index) => (
                  <li 
                    key={convenio.id} 
                    className="bg-card p-6 rounded-lg shadow-md border border-prosalud-border flex items-center animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4 shrink-0">
                      <img 
                        src={convenio.image} 
                        alt={convenio.name} 
                        loading="lazy"
                        className="h-full w-full object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                    <p className="text-md font-medium text-text-dark">{convenio.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          // Skeleton Loader for ConveniosSection
          <>
            <div className="p-8 rounded-lg shadow-lg mb-12 md:mb-16 text-center bg-muted">
              <Skeleton className="h-10 w-3/4 mx-auto mb-2" />
              <Skeleton className="h-8 w-1/2 mx-auto" />
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(3)].map((_, index) => (
                <li key={index} className="bg-card p-6 rounded-lg shadow-md border border-prosalud-border flex items-center">
                  <Skeleton className="h-12 w-12 rounded-full mr-4 shrink-0" />
                  <Skeleton className="h-6 w-3/4" />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default ConveniosSection;
