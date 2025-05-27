import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';
interface Image {
  src: string;
  alt: string;
}

// Usaremos algunas imágenes de placeholder por ahora
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
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=b00dd65f-4748-4003-bb3f-0e174881b8dc.jpg",
  alt: "Participantes en taller 2"
}, {
  src: "https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=d06ae58a-dc2a-48b0-8b20-45d8de68de57.jpg",
  alt: "Ejercicio de relajación 2"
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

  // Distribución en arco: columnas 0-8 con 2-2-1-1-1-1-1-2-2
  const columns: Image[][] = [images.slice(0, 2), images.slice(2, 4), [images[4]], [images[5]], [images[6]], [images[7]], [images[8]], images.slice(9, 11), images.slice(11, 13)];
  const offsetClasses = ['translate-y-0', '-translate-y-12', '-translate-y-28', '-translate-y-40', '-translate-y-32', '-translate-y-40', '-translate-y-28', '-translate-y-12', 'translate-y-0'];
  return <section ref={sectionRef} id="galeria-bienestar-intro" className="relative shadow-lg p-8 lg:p-16 overflow-hidden m-20 bg-transparent rounded-none">
      {/* Imágenes en arco con espaciado constante entre columnas */}
      <div className="absolute inset-x-0 top-0 flex justify-center items-end gap-x-2 pointer-events-none">
        {columns.map((col, colIdx) => <div key={colIdx} className={`${offsetClasses[colIdx]} transition-transform duration-700 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {col.map((img, imgIdx) => <img key={imgIdx} src={img.src} alt={img.alt} className="w-24 h-28 object-cover rounded-md m-0.5 my-2 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg" />)}
          </div>)}
      </div>

      {/* Contenido central */}
      <div className="relative text-center pt-28 space-y-2">
        <div className="inline-flex items-center rounded-lg bg-secondary-prosalud/10 px-3 py-1.5 text-sm text-secondary-prosalud-dark font-medium mb-4">
                <Sparkles className="h-5 w-5 mr-2" />
                Momentos que Inspiran
              </div>
        <h2 className="text-3xl lg:text-4xl font-bold">Momentos que nos unen</h2>
        <h3 className="text-2xl text-gray-500">Galería de Bienestar ProSalud</h3>
        <p className="max-w-2xl mx-auto text-gray-600">
          En cada encuentro hay una historia, una risa compartida, un recuerdo que permanece. Sumérgete en nuestra galería y revive los espacios donde el bienestar, la cercanía y la alegría fortalecen nuestra comunidad. Porque en ProSalud, cuidarte también es celebrar contigo.
        </p>
        <button className="mt-4 bg-black text-white px-6 py-2 rounded-full transition-opacity duration-300 hover:opacity-80">
          Explorar Galería →
        </button>
      </div>
    </section>;
};
export default GaleriaBienestarIntroSection;