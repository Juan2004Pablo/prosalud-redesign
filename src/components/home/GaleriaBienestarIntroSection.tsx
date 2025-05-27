
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface Image {
  src: string;
  alt: string;
}

// Using 13 images for the new 9-column layout
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
  alt: "Participantes en taller"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=83fa956d-0de5-4bf5-9e1d-3437cad82b14.jpg",
  alt: "Ejercicio de relajación"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=9aff4819-ccff-49a7-a329-5319f594ec97.jpg",
  alt: "Participantes en taller"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=a52b4ad2-f1a7-43ba-86a7-2d09f29c1a20.jpg",
  alt: "Ejercicio de relajación"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=b00dd65f-4748-4003-bb3f-0e174881b8dc.jpg",
  alt: "Participantes en taller"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=d06ae58a-dc2a-48b0-8b20-45d8de68de57.jpg",
  alt: "Ejercicio de relajación"
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

  const imagesToDisplay = images.slice(0, 13); // Use 13 images for the new layout
  
  // New layout: 2-1-1-1-1-1-1-1-2 images per column (9 columns total)
  const columnsLayout: Image[][] = [
    imagesToDisplay.slice(0, 2),    // Column 1: 2 images
    [imagesToDisplay[2]],           // Column 2: 1 image
    [imagesToDisplay[3]],           // Column 3: 1 image
    [imagesToDisplay[4]],           // Column 4: 1 image
    [imagesToDisplay[5]],           // Column 5: 1 image (center)
    [imagesToDisplay[6]],           // Column 6: 1 image
    [imagesToDisplay[7]],           // Column 7: 1 image
    [imagesToDisplay[8]],           // Column 8: 1 image
    imagesToDisplay.slice(9, 11),   // Column 9: 2 images
  ];

  // Use the specified offset classes with responsive adjustments
  const offsetClasses = [
    'translate-y-0 md:translate-y-0',
    '-translate-y-6 md:-translate-y-12',
    '-translate-y-14 md:-translate-y-28',
    '-translate-y-20 md:-translate-y-40',
    '-translate-y-16 md:-translate-y-32',
    '-translate-y-20 md:-translate-y-40',
    '-translate-y-14 md:-translate-y-28',
    '-translate-y-6 md:-translate-y-12',
    'translate-y-0 md:translate-y-0'
  ];

  return (
    <section 
      ref={sectionRef} 
      id="galeria-bienestar-intro" 
      className="relative bg-card shadow-xl p-8 lg:p-12 overflow-hidden my-16 mx-auto max-w-6xl rounded-xl"
    >
      {/* Images in arc */}
      <div className="absolute inset-x-0 top-0 flex justify-center items-start gap-x-1.5 sm:gap-x-2 md:gap-x-3 pointer-events-none pt-8 sm:pt-12">
        {columnsLayout.map((col, colIdx) => (
          <div 
            key={colIdx} 
            className={`${offsetClasses[colIdx]} transition-all duration-700 ease-out ${mounted && isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            {col.map((img, imgIdx) => (
              <img 
                key={imgIdx} 
                src={img.src} 
                alt={img.alt} 
                className="w-8 h-10 sm:w-16 sm:h-20 md:w-24 md:h-28 lg:w-28 lg:h-32 object-cover rounded-lg m-1 my-1.5 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl border-0" 
              />
            ))}
          </div>
        ))}
      </div>

      {/* Contenido central */}
      {/* Adjust padding-top to accommodate the new image arrangement */}
      <div className="relative text-center space-y-3 pt-[220px] sm:pt-[280px] md:pt-[320px] lg:pt-[380px]">
        <div className={`inline-flex items-center rounded-lg bg-primary/10 px-3 py-1.5 text-sm text-primary font-semibold mb-4 transition-opacity duration-500 ease-out ${mounted && isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Sparkles className="h-5 w-5 mr-2 text-primary" />
          Momentos que Inspiran
        </div>
        <h2 className={`text-3xl lg:text-4xl font-bold text-foreground transition-all duration-500 ease-out ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Momentos que nos unen
        </h2>
        <h3 className={`text-xl lg:text-2xl text-muted-foreground mt-1 transition-all duration-500 ease-out delay-100 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Galería de Bienestar ProSalud
        </h3>
        <p className={`max-w-2xl mx-auto text-muted-foreground mt-4 transition-all duration-500 ease-out delay-200 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          En cada encuentro hay una historia, una risa compartida, un recuerdo que permanece. Sumérgete en nuestra galería y revive los espacios donde el bienestar, la cercanía y la alegría fortalecen nuestra comunidad. Porque en ProSalud, cuidarte también es celebrar contigo.
        </p>
        <div className={`pt-5 transition-all duration-500 ease-out delay-300 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link to="/galeria-bienestar" aria-label="Explorar Galería de Bienestar ProSalud">
            <Button size="lg" className="rounded-full group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 shadow-md hover:shadow-lg transform transition-transform hover:-translate-y-0.5">
              Explorar Galería
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GaleriaBienestarIntroSection;
