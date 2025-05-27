import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { mockEvents } from '@/data/eventosMock';
import { EventData } from '@/types/eventos';
import { CalendarDays, MapPin, Users, Gift, Briefcase, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Importar componentes del carrusel

// En el futuro, aquí se importaría un componente ImageGallery

const EventoDetallePage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = mockEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h1 className="text-3xl font-bold text-destructive">Evento no encontrado</h1>
          <p className="mt-4 text-muted-foreground">El evento que buscas no existe o fue removido.</p>
          <Link to="/servicios/galeria-bienestar" className="mt-6 inline-block text-primary-prosalud hover:underline">
            Volver a la Galería
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>
            <BreadcrumbItem>
              {/* Asumiendo que hay una página de servicios, si no, quitar este item */}
              <BreadcrumbLink href="/servicios">Servicios</BreadcrumbLink> 
            </BreadcrumbItem>
            <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/servicios/galeria-bienestar">Galería de Bienestar</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate max-w-xs">{event.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <article className="bg-card p-6 sm:p-8 rounded-lg shadow-xl animate-fadeIn">
          <div className="mb-6">
            <Link 
              to="/servicios/galeria-bienestar" 
              className="inline-flex items-center text-sm text-primary-prosalud hover:text-secondary-prosaludgreen mb-4"
            >
              <ChevronLeft size={18} className="mr-1" />
              Volver a la Galería
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-prosalud mb-3">{event.title}</h1>
            {event.category && <Badge variant="secondary" className="text-sm mb-3">{event.category}</Badge>}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <img 
                src={event.mainImage.src} 
                alt={event.mainImage.alt} 
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md mb-6"
              />
              <h2 className="text-2xl font-semibold text-primary-prosalud-dark mb-3">Descripción del Evento</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>

            <aside className="md:col-span-1 space-y-6">
              <div className="bg-background-light p-4 rounded-lg border border-prosalud-border">
                <h3 className="text-lg font-semibold text-primary-prosalud-dark mb-3">Detalles del Evento</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CalendarDays size={18} className="mr-3 mt-0.5 text-secondary-prosaludgreen flex-shrink-0" />
                    <div>
                      <strong>Fecha:</strong> {new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </li>
                  {event.location && (
                    <li className="flex items-start">
                      <MapPin size={18} className="mr-3 mt-0.5 text-secondary-prosaludgreen flex-shrink-0" />
                      <div><strong>Lugar:</strong> {event.location}</div>
                    </li>
                  )}
                  {event.attendees && (
                    <li className="flex items-start">
                      <Users size={18} className="mr-3 mt-0.5 text-secondary-prosaludgreen flex-shrink-0" />
                      <div><strong>Asistentes:</strong> Aprox. {event.attendees}</div>
                    </li>
                  )}
                  {event.gift && (
                    <li className="flex items-start">
                      <Gift size={18} className="mr-3 mt-0.5 text-secondary-prosaludgreen flex-shrink-0" />
                      <div><strong>Obsequio:</strong> {event.gift}</div>
                    </li>
                  )}
                  {event.provider && (
                    <li className="flex items-start">
                      <Briefcase size={18} className="mr-3 mt-0.5 text-secondary-prosaludgreen flex-shrink-0" />
                      <div><strong>Organizador/Proveedor:</strong> {event.provider}</div>
                    </li>
                  )}
                </ul>
              </div>
              
              {event.additionalImages && event.additionalImages.length > 0 && (
                <div className="bg-background-light p-4 rounded-lg border border-prosalud-border">
                  <h3 className="text-lg font-semibold text-primary-prosalud-dark mb-4">Más Imágenes</h3>
                  <Carousel className="w-full max-w-xs mx-auto" opts={{ loop: true }}>
                    <CarouselContent>
                      {event.additionalImages.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <img 
                              src={image.src} 
                              alt={image.alt || `${event.title} - Imagen adicional ${index + 1}`} 
                              className="w-full h-auto aspect-video object-cover rounded-md shadow-sm"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {event.additionalImages.length > 1 && (
                      <>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2  bg-white/80 hover:bg-white text-primary-prosalud disabled:opacity-30" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary-prosalud disabled:opacity-30" />
                      </>
                    )}
                  </Carousel>
                </div>
              )}
            </aside>
          </div>
        </article>
      </div>
    </MainLayout>
  );
};

export default EventoDetallePage;
