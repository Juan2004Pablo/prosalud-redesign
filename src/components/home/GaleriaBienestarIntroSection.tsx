
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface Image {
  src: string;
  alt: string;
}

const images: Image[] = [{
  src: "/images/galeria_bienestar/image1.webp",
  alt: "Actividad recreativa ProSalud 2"
}, {
  src: "/images/galeria_bienestar/image2.webp",
  alt: "Participantes en taller de bienestar"
}, {
  src: "/images/galeria_bienestar/image3.webp",
  alt: "Ejercicio de relajación"
}, {
  src: "/images/galeria_bienestar/image4.webp",
  alt: "Participantes en taller de bienestar"
}, {
  src: "/images/galeria_bienestar/image5.webp",
  alt: "Celebración comunitaria ProSalud 3"
}, {
  src: "/images/galeria_bienestar/image6.webp",
  alt: "Celebración comunitaria ProSalud 3"
}, {
  src: "/images/galeria_bienestar/image7.webp",
  alt: "Ejercicio de relajación grupal"
}];

const GaleriaBienestarIntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
    freezeOnceVisible: true
  });

  const galleryImages = images.slice(0, 7);

  return (
    <section 
      ref={sectionRef} 
      id="galeria-bienestar-intro" 
      className="py-10 lg:py-12 w-full text-center"
      style={{ backgroundColor: '#e8f2f7' }}
    >
      <div className={`inline-flex items-center rounded-lg bg-yellow-100 px-3 py-1.5 text-sm text-yellow-500 font-semibold mb-4 transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
        Instantes que inspiran
      </div>
      <h2 className={`text-5xl lg:text-6xl font-bold text-foreground transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Momentos que nos unen
      </h2>
      <h3 className={`text-xl lg:text-2xl text-muted-foreground mt-1 mb-4 transition-all duration-500 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Galería de Bienestar ProSalud
      </h3>
      <p className={`max-w-4xl mx-auto text-gray-500 mt-2 mb-8 transition-all duration-500 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Cada encuentro deja una historia, una risa, un recuerdo. Explora nuestra galería y revive los momentos que nos unen. <br /> Porque en ProSalud, cuidarte también es celebrar contigo.
      </p>

      {/* Galería simplificada */}
      <div className={`relative overflow-hidden w-full py-16 transition-all duration-500 ease-out rounded-xl mb-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {galleryImages.map((img, index) => (
            <div
              key={img.src}
              className="relative transition-transform duration-300 hover:scale-105 hover:z-20 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-32 sm:w-40 md:w-48 aspect-[3/4] overflow-hidden rounded-lg shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover rounded-md"
                  width={192}
                  height={256}
                />
              </div>
              <div className="absolute -bottom-1 left-1/2 w-11/12 h-3 bg-black/15 blur-lg rounded-full transition-all duration-300 group-hover:bg-black/25 group-hover:w-full transform -translate-x-1/2" />
            </div>
          ))}
        </div>
      </div>

      <div className={`transition-all duration-500 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Link to="/servicios/galeria-bienestar" aria-label="Explorar Galería de Bienestar ProSalud">
          <Button size="lg" className="rounded-full group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 shadow-md hover:shadow-lg transform transition-transform hover:-translate-y-0.5">
            Explorar Galería
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GaleriaBienestarIntroSection;
