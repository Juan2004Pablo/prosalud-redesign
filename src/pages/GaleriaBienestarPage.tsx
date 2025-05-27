
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import EventCard from '@/components/galeria-bienestar/EventCard';
import { mockEvents } from '@/data/eventosMock'; // Usaremos datos mock por ahora
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react"


const GaleriaBienestarPage: React.FC = () => {
  // Lógica de paginación se añadirá aquí en el futuro
  const eventsToDisplay = mockEvents;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/servicios">Servicios</BreadcrumbLink> {/* Asumiendo que hay una página de servicios */}
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Galería de Bienestar</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-primary-prosalud sm:text-5xl">
            Galería de Bienestar
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
            Explora los momentos y actividades que hemos compartido juntos, fortaleciendo nuestra comunidad ProSalud.
          </p>
        </div>

        {eventsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {eventsToDisplay.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No hay eventos para mostrar en este momento.</p>
          </div>
        )}
        {/* Aquí irá el componente de paginación en el futuro */}
      </div>
    </MainLayout>
  );
};

export default GaleriaBienestarPage;
