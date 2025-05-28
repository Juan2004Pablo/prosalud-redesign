import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface Image {
  src: string;
  alt: string;
}

const images: Image[] = [
  {
    src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=087e2a05-444f-4afe-afc2-ee6169b1efbc.jpg",
    alt: "Evento de bienestar ProSalud 1"
  },
  {
    src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241121&file=0e0ea685-c576-43a5-99d5-d5d0484a5cda.jpg",
    alt: "Actividad recreativa ProSalud 2"
  },
  {
    src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HSJD_20241025&file=415f8d7d-5833-44ce-88b2-3976df64b0a0.jpg",
    alt: "Celebración comunitaria ProSalud 3"
  },
  {
    src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=38bb889f-a94b-49f8-8b62-43a701b10758.jpg",
    alt: "Participantes en taller"
  },
  {
    src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=58f0c0e1-ed25-43f4-ad1a-05b875508622.jpg",
    alt: "Ejercicio de relajación"
  },
  {
    src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=635aa054-c5bd-4acb-9f10-8b00530843ac.jpg",
    alt: "Participantes en taller de bienestar"
  },
  {
    src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=83fa956d-0de5-4bf5-9e1d-3437cad82b14.jpg",
    alt: "Ejercicio de relajación grupal"
  }
];

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

  const galleryImages = images.slice(0, 7);

  return (
    <section
      ref={sectionRef}
      id="galeria-bienestar-intro"
      className="shadow-xl py-8 lg:py-12 my-16 mx-auto max-w-full rounded-xl text-center"
    >
      <div className={`inline-flex items-center rounded-lg bg-primary/10 px-3 py-1.5 text-sm text-primary font-semibold mb-4 transition-opacity duration-500 ease-out ${mounted && isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Sparkles className="h-5 w-5 mr-2 text-primary" />
        Momentos que Inspiran
      </div>

      <h2 className={`text-5xl lg:text-6xl font-bold text-foreground transition-all duration-500 ease-out ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Momentos que nos unen
      </h2>

      <h3 className={`text-xl lg:text-2xl text-muted-foreground mt-1 mb-4 transition-all duration-500 ease-out delay-100 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Galería de Bienestar ProSalud
      </h3>

      <p className={`max-w-md mx-auto text-muted-foreground mt-2 mb-8 transition-all duration-500 ease-out delay-200 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        En cada encuentro hay una historia, una risa compartida, un recuerdo que permanece. Sumérgete en nuestra galería y revive los espacios donde el bienestar, la cercanía y la alegría fortalecen nuestra comunidad. <br />
        Porque en ProSalud, el bienestar es compartido.
      </p>

      <div className="flex justify-center items-center gap-2 overflow-x-auto px-2">
        {galleryImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`rounded-2xl shadow-lg object-cover w-60 h-40 transition-transform duration-300 hover:scale-105 ${
              index === 0 ? 'ml-2' : index === galleryImages.length - 1 ? 'mr-2' : ''
            }`}
          />
        ))}
      </div>

      <div className="mt-10">
        <Link to="/galeria">
          <Button variant="default" size="lg" className="flex items-center gap-2">
            Ver galería completa
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GaleriaBienestarIntroSection;
