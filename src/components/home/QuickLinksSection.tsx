
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import ServiceList from './ServiceList'; // Importamos el nuevo componente

const QuickLinksSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section id="quick-links" className="py-12 md:py-16 bg-background-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 mb-10 text-center">
          <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
            Autogestión
          </div>
          <h2 className="text-3xl font-bold tracking-tighter text-primary-700 sm:text-5xl">
            Gestiona tus trámites
          </h2>
          <p className="max-w-[900px] mx-auto text-center text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Accede rápidamente a los servicios que necesitas sin complicaciones.
          </p>
        </div>

        <div className="mb-8 max-w-xl mx-auto">
          <Input 
            type="text"
            placeholder="Buscar trámite por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-base md:text-sm"
          />
        </div>

        <ServiceList searchTerm={searchTerm} /> {/* Usamos el nuevo componente */}
        
      </div>
    </section>
  );
};

export default QuickLinksSection;
