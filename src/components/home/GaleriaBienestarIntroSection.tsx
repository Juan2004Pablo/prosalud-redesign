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
      <h2 className={`text-4xl lg:text-5xl font-bold text-foreground transition-all duration-500 ease-out ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Momentos que nos unen
      </h2>
      <h3 className={`text-xl lg:text-2xl text-muted-foreground mt-1 mb-4 transition-all duration-500 ease-out delay-100 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Galería de Bienestar ProSalud
      </h3>
      <p className={`max-w-xl mx-auto text-muted-foreground mt-2 mb-8 transition-all duration-500 ease-out delay-200 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        En cada encuentro hay una historia, una risa compartida, un recuerdo que permanece. Sumérgete en nuestra galería y revive los espacios donde el bienestar, la cercanía y la alegría fortalecen nuestra comunidad. <br> Porque en ProSalud, cuidarte también es celebrar contigo.
      </p>

      {/* Nueva galería de fotografías en estilo 3D */}
      <div 
        className={`relative overflow-hidden mx-auto py-16 transition-all duration-500 ease-out rounded-xl mb-8
                   ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ perspective: '1000px' }}
      >
        <div className="flex justify-center" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(5deg)' }}>
          {galleryImages.map((img, index) => {
            const angleDegrees = -30 + (60 / (galleryImages.length - 1)) * index;
            const angleRadians = angleDegrees * Math.PI / 180;

            const centerBackwardOffset = 70; // Profundidad de la curva hacia atrás para el centro
            const edgeForwardOffset = 20;   // Cuánto avanzan los bordes hacia el frente
            const sideImageScaleBoost = 0.15; // Aumento de escala para imágenes laterales (0.1 = 10%)

            const maxAngleRad = 30 * Math.PI / 180; // Máximo ángulo en radianes (30 grados)
            // Progreso normalizado: 0 en el centro, 1 en los bordes
            const normalizedProgress = Math.abs(angleRadians) / maxAngleRad; 

            // Efecto cóncavo: centro atrás, bordes adelante
            // zPosition negativo empuja hacia atrás, positivo hacia adelante
            // En el centro (normalizedProgress=0): z = edgeForwardOffset - (centerBackwardOffset + edgeForwardOffset) = -centerBackwardOffset
            // En los bordes (normalizedProgress=1): z = edgeForwardOffset
            const zPosition = edgeForwardOffset - (centerBackwardOffset + edgeForwardOffset) * (1 - Math.pow(normalizedProgress, 2));
            
            // Escala: Imágenes laterales más grandes
            // En el centro (normalizedProgress=0): scale = 1
            // En los bordes (normalizedProgress=1): scale = 1 + sideImageScaleBoost
            const scaleFactor = 1 + sideImageScaleBoost * normalizedProgress;
            
            // zIndex: Imágenes laterales (más cercanas) con mayor zIndex
            const zIndexVal = Math.round(1 + normalizedProgress * (galleryImages.length -1)); // Renamed to avoid conflict with CSS zIndex


            return (
              <div
                key={img.src}
                className="relative transition-transform duration-300 hover:translate-y-[-10px] hover:z-20 group"
                style={{
                  transform: `rotateY(${angleDegrees}deg) translateZ(${zPosition}px) scale(${scaleFactor})`,
                  transformStyle: 'preserve-3d',
                  margin: '0 1px', // Espaciado de 1px a cada lado, total 2px entre imágenes
                  zIndex: zIndexVal 
                }}
              >
                <div 
                  className="w-32 sm:w-40 md:w-48 aspect-[3/4] overflow-hidden rounded-lg shadow-xl transition-all duration-300
                           group-hover:shadow-2xl"
                  style={{ 
                    transform: 'rotateX(2deg)', 
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover rounded-md"
                    style={{ transform: 'translateZ(5px)' }} 
                  />
                </div>
                
                <div 
                  className="absolute -bottom-4 left-1/2 w-3/4 h-2 bg-black opacity-10 blur-md rounded-full transition-all duration-300
                           group-hover:opacity-20 group-hover:w-4/5"
                  style={{ transform: 'translateX(-50%) rotateX(80deg)' }}
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
