import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface Image {
  src: string;
  alt: string;
}

const images: Image[] = [{
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=087e2a05-444f-4afe-afc2-ee6169b1efbc.jpg",
  alt: "Evento de bienestar ProSalud 1"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241121&file=0e0ea685-c576-43a5-99d5-d5d0484a5cda.jpg",
  alt: "Actividad recreativa ProSalud 2"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HSJD_20241025&file=415f8d7d-5833-44ce-88b2-3976df64b0a0.jpg",
  alt: "Celebración comunitaria ProSalud 3"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=38bb889f-a94b-49f8-8b62-43a701b10758.jpg",
  alt: "Participantes en taller"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=58f0c0e1-ed25-43f4-ad1a-05b875508622.jpg",
  alt: "Ejercicio de relajación"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=635aa054-c5bd-4acb-9f10-8b00530843ac.jpg",
  alt: "Participantes en taller de bienestar"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=83fa956d-0de5-4bf5-9e1d-3437cad82b14.jpg",
  alt: "Ejercicio de relajación grupal"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=9aff4819-ccff-49a7-a329-5319f594ec97.jpg",
  alt: "Participantes ProSalud"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=a52b4ad2-f1a7-43ba-86a7-2d09f29c1a20.jpg",
  alt: "Relajación ProSalud"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=b00dd65f-4748-4003-bb3f-0e174881b8dc.jpg",
  alt: "Taller ProSalud"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=d06ae58a-dc2a-48b0-8b20-45d8de68de57.jpg",
  alt: "Dinámica grupal ProSalud"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=87349f8e-4adc-4f63-af2f-6c85b5f23ad4.jpg",
  alt: "Evento grupal ProSalud"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241121&file=97b90aa5-9e14-43eb-bdaa-e5e4e6f12689.jpg",
  alt: "Integración de equipo ProSalud"
}];

const GaleriaBienestarIntroSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
    freezeOnceVisible: true
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const staticDisplayImages = images.slice(0, 5); // Usaremos las primeras 5 imágenes

  // Estilos para cada imagen en el abanico. Podrían definirse aquí o directamente en el JSX.
  const imageStyles = [
    { // Izquierda exterior
      transform: 'rotate(-12deg) translateX(-45%)',
      zIndex: 10,
      widthClass: 'w-32 sm:w-36 md:w-40',
      hoverTransform: 'rotate(-15deg) scale(1.1) translateX(-45%)'
    },
    { // Izquierda interior
      transform: 'rotate(-6deg) translateX(-22%)',
      zIndex: 20,
      widthClass: 'w-36 sm:w-40 md:w-44',
      hoverTransform: 'rotate(-8deg) scale(1.1) translateX(-22%)'
    },
    { // Centro
      transform: 'scale(1.05) translateX(0%)', // translateX(0%) para asegurar que la base del transform está centrada
      zIndex: 30,
      widthClass: 'w-40 sm:w-44 md:w-48',
      hoverTransform: 'scale(1.15) translateX(0%)'
    },
    { // Derecha interior
      transform: 'rotate(6deg) translateX(22%)',
      zIndex: 20,
      widthClass: 'w-36 sm:w-40 md:w-44',
      hoverTransform: 'rotate(8deg) scale(1.1) translateX(22%)'
    },
    { // Derecha exterior
      transform: 'rotate(12deg) translateX(45%)',
      zIndex: 10,
      widthClass: 'w-32 sm:w-36 md:w-40',
      hoverTransform: 'rotate(15deg) scale(1.1) translateX(45%)'
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="galeria-bienestar-intro" 
      className="bg-card shadow-xl p-8 lg:p-12 my-16 mx-auto max-w-6xl rounded-xl text-center"
    >
      <div className={`inline-flex items-center rounded-lg bg-primary/10 px-3 py-1.5 text-sm text-primary font-semibold mb-4 transition-opacity duration-500 ease-out ${mounted && isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Sparkles className="h-5 w-5 mr-2 text-primary" />
        Momentos que Inspiran
      </div>
      <h2 className={`text-3xl lg:text-4xl font-bold text-foreground transition-all duration-500 ease-out ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Momentos que nos unen
      </h2>
      <h3 className={`text-xl lg:text-2xl text-muted-foreground mt-1 mb-4 transition-all duration-500 ease-out delay-100 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Galería de Bienestar ProSalud
      </h3>
      <p className={`max-w-2xl mx-auto text-muted-foreground mt-2 mb-8 transition-all duration-500 ease-out delay-200 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        En cada encuentro hay una historia, una risa compartida, un recuerdo que permanece. Sumérgete en nuestra galería y revive los espacios donde el bienestar, la cercanía y la alegría fortalecen nuestra comunidad. Porque en ProSalud, cuidarte también es celebrar contigo.
      </p>

      {/* Contenedor para las imágenes estáticas en abanico */}
      <div 
        className={`relative flex justify-center items-center py-10 min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px] mb-8 group
                    transition-all duration-500 ease-out delay-300 
                    ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        {staticDisplayImages.map((img, index) => (
          <div
            key={img.src}
            className="absolute transition-all duration-300 ease-in-out origin-bottom"
            style={{ 
              transform: imageStyles[index].transform, 
              zIndex: imageStyles[index].zIndex 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = imageStyles[index].hoverTransform;
              e.currentTarget.style.zIndex = '40';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = imageStyles[index].transform;
              e.currentTarget.style.zIndex = imageStyles[index].zIndex.toString();
            }}
          >
            <img 
              src={img.src} 
              alt={img.alt} 
              className={`${imageStyles[index].widthClass} aspect-[3/4] object-cover rounded-lg shadow-xl border-2 md:border-4 border-white`}
            />
          </div>
        ))}
      </div>

      <div className={`pt-5 transition-all duration-500 ease-out delay-400 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Link to="/galeria-bienestar" aria-label="Explorar Galería de Bienestar ProSalud">
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
