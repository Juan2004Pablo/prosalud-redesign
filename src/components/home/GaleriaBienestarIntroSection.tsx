
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react'; // Se eliminaron Camera y Users
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

// Usaremos algunas imágenes de placeholder por ahora
const images = [
  { src: "/images/collage/image_collage_1.jpg", alt: "Evento de bienestar ProSalud 1" },
  { src: "/images/collage/image_collage_2.jpg", alt: "Actividad recreativa ProSalud 2" },
  { src: "/images/collage/image_collage_3.jpg", alt: "Celebración comunitaria ProSalud 3" },
];

const GaleriaBienestarIntroSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, freezeOnceVisible: true });

  return (
    <section ref={sectionRef} id="galeria-bienestar-intro" className="py-16 md:py-20 bg-gradient-to-br from-primary-prosalud/5 via-background-light to-secondary/5"> {/* Corregido to-secondary-prosalud/5 a to-secondary/5 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isVisible ? (
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Contenido de Texto */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center rounded-lg bg-secondary-prosalud/10 px-3 py-1.5 text-sm text-secondary-prosalud-dark font-medium mb-4">
                <Sparkles className="h-5 w-5 mr-2" />
                Momentos que Inspiran
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-primary-prosalud sm:text-5xl mb-6">
                Revive la Alegría: Nuestra Galería de Bienestar
              </h2>
              <p className="text-lg text-gray-700 md:text-xl/relaxed mb-8 leading-relaxed">
                En ProSalud, valoramos cada sonrisa y cada instante compartido. Explora nuestra galería y descubre cómo fomentamos el bienestar, la unión y la camaradería entre nuestros afiliados a través de eventos, actividades y programas diseñados para ti.
              </p>
              <Link to="/servicios/galeria-bienestar">
                {/* Se cambió el botón para usar la variante 'secondary' y se mantuvo 'group' para la animación del icono */}
                <Button variant="secondary" size="lg" className="group">
                  Explorar Galería Completa
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Collage de Imágenes */}
            <div className="lg:w-1/2 grid grid-cols-2 grid-rows-2 gap-4 h-[400px] md:h-[450px]">
              <div className="col-span-1 row-span-2 relative group overflow-hidden rounded-lg shadow-xl">
                <img src={images[0].src} alt={images[0].alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-lg shadow-xl">
                <img src={images[1].src} alt={images[1].alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-lg shadow-xl">
                <img src={images[2].src} alt={images[2].alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
            </div>
          </div>
        ) : (
          // Skeleton Loader
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <Skeleton className="h-8 w-48 mb-4 mx-auto lg:mx-0" />
              <Skeleton className="h-12 w-4/5 mb-6 mx-auto lg:mx-0" />
              <Skeleton className="h-6 w-full mb-2 mx-auto lg:mx-0" />
              <Skeleton className="h-6 w-full mb-2 mx-auto lg:mx-0" />
              <Skeleton className="h-6 w-3/4 mb-8 mx-auto lg:mx-0" />
              <Skeleton className="h-12 w-64 mx-auto lg:mx-0" />
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 grid-rows-2 gap-4 h-[400px] md:h-[450px]">
              <Skeleton className="col-span-1 row-span-2 w-full h-full rounded-lg" />
              <Skeleton className="col-span-1 row-span-1 w-full h-full rounded-lg" />
              <Skeleton className="col-span-1 row-span-1 w-full h-full rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GaleriaBienestarIntroSection;

