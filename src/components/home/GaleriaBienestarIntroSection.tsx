
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
  src: "https://prosalud.org.co/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HSJD_20241025&file=c19b7ce3-1128-4c3f-b756-ad5c180e91f3.jpg",
  alt: "Celebración comunitaria ProSalud 3"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=38bb8889f-a94b-49f8-8b62-43a701b10758.jpg",
  alt: "Participantes en taller"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=58f0c0e1-ed25-43f4-ad1a-05b875508622.jpg",
  alt: "Ejercicio de relajación"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=635aa054-c5bd-4acb-9f10-8b00530843ac.jpg",
  alt: "Participantes en taller de bienestar"
}, {
  src: "https://prosalud.org.co/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241203_2&file=5fac6112-6971-4ba4-b082-9a5d99984788.jpg",
  alt: "Ejercicio de relajación grupal"
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

  const galleryImages = images.slice(0, 7); // Usar exactamente 7 imágenes

  const Z_CENTER = 100; // Más alejado (atrás)
  const Z_EDGE = -50;   // Más cercano (adelante)
  const SCALE_CENTER = 0.9; // Ligeramente más grande
  const SCALE_EDGE = 1.3; // El más grande en los bordes

  return (
    <section 
      ref={sectionRef} 
      id="galeria-bienestar-intro" 
      className="shadow-xl py-8 lg:py-12 my-16 w-full text-center" // MODIFIED: Removed mx-auto, rounded-xl. Added w-full.
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
        En cada encuentro hay una historia, una risa compartida, un recuerdo que permanece. Sumérgete en nuestra galería y revive los espacios donde el bienestar, la cercanía y la alegría fortalecen nuestra comunidad. <br /> Porque en ProSalud, cuidarte también es celebrar contigo.
      </p>

      {/* Galería de fotografías */}
      <div 
        className={`relative overflow-hidden w-full py-16 transition-all duration-500 ease-out rounded-xl mb-8
                   ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ perspective: '1000px' }}
      >
        <div 
          className="flex justify-center items-center gap-2"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(0deg)' }}
        >
          {galleryImages.map((img, index) => {
            const totalImages = galleryImages.length;
            const angleSpread = 60; 
            const anglePerImage = totalImages > 1 ? angleSpread / (totalImages -1) : 0;
            const angleDegrees = -angleSpread / 2 + anglePerImage * index;

            const angleRadians = angleDegrees * Math.PI / 180;
            const maxAngleRad = (angleSpread / 2) * Math.PI / 180; 
            const normalizedProgress = totalImages > 1 ? Math.abs(angleRadians) / maxAngleRad : 0;
            
            const zPosition = Z_CENTER + (Z_EDGE - Z_CENTER) * normalizedProgress;
            const scaleFactor = SCALE_CENTER + (SCALE_EDGE - SCALE_CENTER) * normalizedProgress;
            
            const zIndexVal = Math.round(1 + normalizedProgress * (totalImages -1)); 
            const rotationYDegrees = -angleDegrees; // MODIFIED: Inverted angle for inward rotation

            // MODIFIED: Removed conditional margins (mr-4, ml-4)
            const itemClasses = "relative transition-transform duration-300 hover:translate-y-[-10px] hover:z-20 group";

            return (
              <div
                key={img.src}
                className={itemClasses}
                style={{
                  transform: `rotateY(${rotationYDegrees}deg) translateZ(${zPosition}px) scale(${scaleFactor})`,
                  transformStyle: 'preserve-3d',
                  zIndex: zIndexVal 
                }}
              >
                <div 
                  className="w-32 sm:w-40 md:w-48 aspect-[3/4] overflow-hidden rounded-lg shadow-xl transition-all duration-300
                           group-hover:shadow-2xl"
                  style={{ 
                    transform: 'rotateX(0deg)', 
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover rounded-md"
                    style={{ transform: 'translateZ(1px)' }} 
                  />
                </div>
                
                <div 
                  className="absolute -bottom-1 left-1/2 w-11/12 h-3 bg-black/15 blur-lg rounded-full transition-all duration-300
                           group-hover:bg-black/25 group-hover:w-full"
                  style={{ transform: 'translateX(-50%)' }}
                />
              </div>
            );
          })}
        </div>
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

