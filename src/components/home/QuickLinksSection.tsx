
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import ServiceList from './ServiceList';
import { Skeleton } from '@/components/ui/skeleton';

const QuickLinksSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simula carga diferida para mejorar la UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="quick-links" className="section-spacing bg-background-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12 text-center">
          <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
            Autogestión
          </div>
          <h2 className="text-3xl font-bold tracking-tighter text-primary-700 sm:text-5xl animate-fade-in">
            Gestiona tus trámites
          </h2>
          <p className="max-w-[900px] mx-auto text-center text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in animation-delay-100">
            Accede rápidamente a los servicios que necesitas sin complicaciones.
          </p>
        </div>

        <div className="mb-10 max-w-xl mx-auto animate-fade-in animation-delay-200">
          <label htmlFor="search-services" className="sr-only">Buscar trámite</label>
          <Input 
            id="search-services"
            type="text"
            placeholder="Buscar trámite por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-base shadow-sm focus:border-primary focus:ring-primary hover-grow"
            aria-label="Buscar trámite"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-prosalud-border">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <ServiceList searchTerm={searchTerm} />
        )}
      </div>
    </section>
  );
};

export default QuickLinksSection;
