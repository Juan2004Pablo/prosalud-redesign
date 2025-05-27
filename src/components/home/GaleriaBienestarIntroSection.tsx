
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

// Usaremos algunas imágenes de placeholder por ahora
const images = [
  { src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=087e2a05-444f-4afe-afc2-ee6169b1efbc.jpg", alt: "Evento de bienestar ProSalud 1" },
  { src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241121&file=0e0ea685-c576-43a5-99d5-d5d0484a5cda.jpg", alt: "Actividad recreativa ProSalud 2" },
  { src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HSJD_20241025&file=415f8d7d-5833-44ce-88b2-3976df64b0a0.jpg", alt: "Celebración comunitaria ProSalud 3" },
];

const GaleriaBienestarIntroSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, freezeOnceVisible: true });

  return (
    <section ref={sectionRef} id="galeria-bienestar-intro" className="py-16 md:py-20 bg-gradient-to-br from-primary-prosalud/5 via-background-light to-secondary/5">
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
                Momentos que nos unen: Galería de Bienestar ProSalud
              </h2>
              <p className="text-lg text-gray-700 md:text-xl/relaxed mb-8 leading-relaxed">
                En cada encuentro hay una historia, una risa compartida, un recuerdo que permanece. Sumérgete en nuestra galería y revive los espacios donde el bienestar, la cercanía y la alegría fortalecen nuestra comunidad. Porque en ProSalud, cuidarte también es celebrar contigo.
              </p>
              <Link to="/servicios/galeria-bienestar">
                <Button variant="secondary" size="lg" className="group">
                  Explorar Galería
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Collage de Imágenes */}
            <div className="lg:w-1/2 grid grid-cols-2 grid-rows-2 gap-4 h-[400px] md:h-[450px]">
              <div className="col-span-1 row-span-2 relative group overflow-hidden rounded-lg shadow-xl">
                <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 border-0" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-lg shadow-xl">
                <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 border-0" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-lg shadow-xl">
                <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 border-0" />
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
