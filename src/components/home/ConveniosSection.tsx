
import React, { useState, useEffect } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';

const conveniosData = [
  { 
    name: "E.S.E. HOSPITAL MARCO FIDEL SUÁREZ - BELLO",
    imageUrl: "/hospital-marco-fidel-suarez.jpg",
    description: "Convenio con el principal hospital de Bello para servicios de atención especializada."
  },
  { 
    name: "E.S.E. HOSPITAL SAN JUAN DE DIOS - RIONEGRO",
    imageUrl: "/hospital-san-juan-de-dios-rionegro.jpg",
    description: "Colaboración con el Hospital San Juan de Dios para atención en el Oriente Antioqueño."
  },
  { 
    name: "PROMOTORA MÉDICA Y ODONTOLÓGICA S.A.",
    imageUrl: "/promotora-medica-odontologica.jpg",
    description: "Servicios odontológicos y médicos especializados para afiliados."
  },
  { 
    name: "SOCIEDAD MÉDICA RIONEGRO SOMER S.A.",
    imageUrl: "/somer-sa.jpg",
    description: "Convenio con centro médico especializado de Rionegro."
  },
  { 
    name: "E.S.E. HOSPITAL VENANCIO DÍAZ DÍAZ",
    imageUrl: "/hospital-venancio-diaz.webp",
    description: "Atención médica y servicios de salud en el área metropolitana."
  },
  { 
    name: "E.S.E. HOSPITAL LA MERCED - CIUDAD BOLÍVAR",
    imageUrl: "/la-merced-ciudad-bolivar.jpeg",
    description: "Cobertura de servicios médicos en Ciudad Bolívar y alrededores."
  },
  { 
    name: "E.S.E. HOSPITAL SANTA ELENA - FREDONIA",
    imageUrl: "/hospital-santa-elena-fredonia.jpg",
    description: "Atención médica especializada en la región de Fredonia."
  },
];

const ConveniosSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simula carga diferida
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="convenios" className="section-spacing bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 content-spacing">
        <div className="bg-primary-prosalud text-text-light p-6 md:p-8 rounded-lg shadow-lg mb-10 md:mb-12 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-semibold">
            A lo largo de nuestra trayectoria hemos tenido convenios con diferentes entidades en Antioquia
          </h2>
        </div>
        
        {isLoading ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, index) => (
              <li key={index} className="bg-card p-6 rounded-lg shadow-md border border-prosalud-border">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full mr-4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {conveniosData.map((convenio, index) => (
              <li 
                key={index} 
                className="bg-card p-6 rounded-lg shadow-md border border-prosalud-border hover:shadow-xl hover:border-primary-prosalud transition-all duration-300 flex items-center animate-fade-in card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
                tabIndex={0}
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button className="flex items-center w-full text-left" aria-label={`Más información sobre ${convenio.name}`}>
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-4 shrink-0 border border-primary-prosalud">
                        <img 
                          src={convenio.imageUrl} 
                          alt={`Logo de ${convenio.name}`} 
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-md font-medium text-text-dark">{convenio.name}</p>
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-4">
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold">{convenio.name}</h4>
                      <p className="text-sm text-muted-foreground">{convenio.description}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ConveniosSection;
