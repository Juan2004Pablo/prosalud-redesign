import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { mockEvents } from '@/data/eventosMock';
import { EventData } from '@/types/eventos';
import { CalendarDays, MapPin, Users, Gift, Briefcase, ChevronLeft, Maximize, Home, LayoutGrid, GalleryVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ImagePreviewDialog from '@/components/sst/ImagePreviewDialog';

const EventoDetallePage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = mockEvents.find(e => e.id === eventId);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageAlt, setSelectedImageAlt] = useState<string | undefined>(undefined);

  // Referencia para el plugin de autoplay
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

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

  const allImages = event.additionalImages ? [event.mainImage, ...event.additionalImages] : [event.mainImage];
  const hasMultipleImages = allImages.length > 1;

  const handleImageClick = (imageSrc: string, imageAlt?: string) => {
    setSelectedImage(imageSrc);
    setSelectedImageAlt(imageAlt || event.title);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb className="mb-8">
          <BreadcrumbList className="flex items-center space-x-2 text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Link to="/"><Home size={16} className="mr-1" />Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Link to="/servicios"><LayoutGrid size={16} className="mr-1" />Servicios</Link> 
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Link to="/servicios/galeria-bienestar"><GalleryVertical size={16} className="mr-1" />Galería de Bienestar</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-foreground truncate max-w-xs">{event.title}</BreadcrumbPage>
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
            {/* Columna Izquierda: Imágenes */}
            <div className="md:col-span-2">
              {!hasMultipleImages || allImages.length <= 1 ? (
                <div className="relative group">
                  <img
                    src={event.mainImage.src}
                    alt={event.mainImage.alt}
                    className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleImageClick(event.mainImage.src, event.mainImage.alt)}
                  />
                  <button
                    onClick={() => handleImageClick(event.mainImage.src, event.mainImage.alt)}
                    className="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Ampliar imagen"
                  >
                    <Maximize size={18} />
                  </button>
                </div>
              ) : (
                 <div className="bg-background-light p-0 rounded-lg border-0 mb-6 md:mb-0"> {/* md:mb-0 para que no haya doble margen en desktop */}
                  <Carousel 
                    setApi={setApi}
                    className="w-full relative" 
                    opts={{ loop: true }} 
                    plugins={[autoplayPlugin.current]}
                    onMouseEnter={autoplayPlugin.current.stop}
                    onMouseLeave={autoplayPlugin.current.play}
                  >
                    <CarouselContent className="h-[400px] sm:h-[450px] md:h-[500px]">
                      {allImages.map((image, index) => (
                        <CarouselItem key={index} className="relative group">
                          <div className="p-0 w-full h-full flex items-center justify-center">
                            <img 
                              src={image.src} 
                              alt={image.alt || `${event.title} - Imagen ${index + 1}`} 
                              className="w-auto h-auto max-w-full max-h-full object-contain rounded-md shadow-sm cursor-pointer"
                              onClick={() => handleImageClick(image.src, image.alt || `${event.title} - Imagen ${index + 1}`)}
                            />
                             <button
                                onClick={() => handleImageClick(image.src, image.alt || `${event.title} - Imagen ${index + 1}`)}
                                className="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                                aria-label="Ampliar imagen"
                              >
                                <Maximize size={18} />
                              </button>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {hasMultipleImages && (
                      <>
                        <CarouselPrevious className="absolute left-2 sm:left-3 top-1/2 bg-white/80 text-primary-prosalud disabled:opacity-30 z-10" />
                        <CarouselNext className="absolute right-2 sm:right-3 top-1/2 bg-white/80 text-primary-prosalud disabled:opacity-30 z-10" />
                      </>
                    )}
                  </Carousel>
                   {api && count > 1 && (
                    <div className="text-center text-sm text-muted-foreground mt-2">
                      Imagen {current} de {count}
                    </div>
                  )}
                </div>
      {/* Sección de Miniaturas */}
                  {hasMultipleImages && allImages.length > 1 && (
                    <ScrollArea className="w-full whitespace-nowrap rounded-md border mt-4">
                      <div className="flex space-x-2 p-2">
                        {allImages.map((image, index) => (
                          <button
                            key={`thumb-${index}`}
                            onClick={() => handleThumbnailClick(index)}
                            className={cn(
                              "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-primary-prosalud focus:ring-offset-2 transition-all",
                              index === current ? "border-primary-prosalud shadow-lg" : "border-transparent hover:border-secondary-prosaludgreen/50"
                            )}
                            aria-label={`Ver imagen ${index + 1}`}
                          >
                            <img
                              src={image.src}
                              alt={image.alt || `Miniatura ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  )}
              )}
            </div>

            {/* Columna Derecha: Descripción (movida aquí) y Detalles del Evento */}
            <aside className="md:col-span-1 space-y-6">
              {/* Descripción del Evento (Movida aquí) */}
              <div className="order-first"> {/* Para asegurar que se muestra primero en el flujo normal y en la columna */}
                <h2 className="text-2xl font-semibold text-primary-prosalud-dark mb-3">Descripción del Evento</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.description}</p>
              </div>
              
              {/* Detalles del Evento */}
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
            </aside>
          </div>
        </article>
      </div>
      <ImagePreviewDialog 
        selectedImage={selectedImage} 
        setSelectedImage={setSelectedImage}
        imageAlt={selectedImageAlt}
      />
    </MainLayout>
  );
};

export default EventoDetallePage;
