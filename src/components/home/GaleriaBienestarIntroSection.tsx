
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
      <h2 className={`text-5xl lg:text-6xl font-bold text-foreground transition-all duration-500 ease-out ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Momentos que nos unen
      </h2>
      <h3 className={`text-xl lg:text-2xl text-muted-foreground mt-1 mb-4 transition-all duration-500 ease-out delay-100 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Galería de Bienestar ProSalud
      </h3>
      <p className={`max-w-2xl mx-auto text-muted-foreground mt-2 transition-all duration-500 ease-out delay-200 ${mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        En cada encuentro hay una historia, una risa compartida, un recuerdo que permanece. <br /> Sumérgete en nuestra galería y revive los espacios donde el bienestar,<br /> la cercanía y la alegría fortalecen nuestra comunidad. <br /> Porque en ProSalud, cuidarte también es celebrar contigo.
      </p>

      {/* Nueva galería de fotografías en estilo 3D */}
      <div
          className={`relative overflow-visible w-full py-10 transition-all duration-700 ease-out
                     ${mounted && isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex justify-between items-end w-full px-4">
            {images.map((img, index) => {
              // Calcular la posición Y para crear efecto cóncavo
              const centerIndex = (images.length - 1) / 2
              const distanceFromCenter = Math.abs(index - centerIndex)
              const maxDistance = centerIndex

              // Normalizar la distancia (0 en el centro, 1 en los bordes)
              const normalizedDistance = distanceFromCenter / maxDistance

              // Crear curva cóncava: las imágenes del centro están más abajo
              const yOffset = Math.pow(normalizedDistance, 1.5) * 40 // 40px máximo de diferencia

              // Escala para hacer las imágenes de los extremos más grandes
              const scale = 1 + normalizedDistance * 0.3 // Hasta 30% más grandes en los extremos

              return (
                <div
                  key={index}
                  className="relative transition-all duration-500 hover:translate-y-[-15px] group cursor-pointer flex-1 flex justify-center"
                  style={{
                    transform: `translateY(${yOffset}px) scale(${scale})`,
                  }}
                >
                  <div
                    className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 aspect-[3/4] overflow-hidden rounded-xl shadow-2xl 
                             transition-all duration-500 group-hover:shadow-3xl group-hover:scale-105
                             border-2 border-white/20"
                    style={{
                      filter: "brightness(0.95) contrast(1.05)",
                    }}
                  >
                    <img
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-500 
                               group-hover:scale-110"
                      style={{
                        filter: "saturate(1.1)",
                      }}
                    />

                    {/* Overlay sutil para hover */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  {/* Sombra proyectada simple */}
                  <div
                    className="absolute -bottom-6 left-1/2 w-3/4 h-3 bg-black/20 blur-lg rounded-full 
                             transition-all duration-500 group-hover:w-4/5 group-hover:bg-black/30"
                    style={{
                      transform: "translateX(-50%)",
                    }}
                  />
                </div>
              )
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

