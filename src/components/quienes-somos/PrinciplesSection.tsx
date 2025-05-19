import React, { useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Shield, Users, Scale, HandHelping, Briefcase, Ban, Library, Megaphone, ClipboardCheck, HeartHandshake
} from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

const principiosData = [
  { icon: Shield, title: "Defensa de Intereses", content: "Mantener una permanente actitud de defensa de los intereses de sus Afiliados, respetando y haciendo respetar las leyes vigentes, haciéndolas compatibles con el interés general." },
  { icon: Users, title: "Solidaridad y Honradez", content: "Hacer prevalecer en todas las acciones y conductas los principios de solidaridad y honradez para con sus representados." },
  { icon: Scale, title: "No Discriminación", content: "No realizar ni tolerar actos o acciones que signifiquen trato discriminatorio o preferencial para un determinado grupo de Afiliados." },
  { icon: HandHelping, title: "Colaboración y Asistencia", content: "Colaborar con los Afiliados, no solo para el cumplimiento de las normas legales y convencionales del trabajo, sino también asistiéndolos en sus contingencias personales y familiares." },
  { icon: Briefcase, title: "Servicio sin Ventajas", content: "Mantenerse en una actitud permanente de servicio, sin utilizar el cargo o función gremial para obtener ventajas, concesiones o privilegios en beneficio propio." },
  { icon: Ban, title: "Evitar Conducta Abusiva", content: "Evitar toda conducta abusiva que pueda interpretarse como coacción o uso arbitrario de sus funciones sindicales, que pudieran comprometer el prestigio de la Organización ante los trabajadores o la sociedad." },
  { icon: Library, title: "Transparencia Administrativa", content: "Administrar los bienes y fondos sindicales con transparencia, rindiendo debida cuenta de sus actos, respetando las normas legales y/o establecidas en nuestros estatutos." },
  { icon: Megaphone, title: "Promover Acción Sindical", content: "Promover la acción sindical de sus compañeros procurando su afiliación y participación activa en la vida de la organización." },
  { icon: ClipboardCheck, title: "Acatar Directivas", content: "Acatar las directivas emanadas por la conducción gremial a fin de preservar la unidad de criterio y de acción." },
  { icon: HeartHandshake, title: "Vocación de Servicio", content: "Demostrar en todos sus actos la vocación de servicio que impulsa su tarea en representación de los trabajadores." }
];

const PrinciplesContent: React.FC = () => (
  <section className="py-16 md:py-24 bg-gradient-to-b from-background-light to-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-prosalud mb-4 tracking-tight">Nuestros Principios</h2>
        <p className="text-xl text-text-gray max-w-2xl mx-auto font-light">
          Compromisos fundamentales que rigen nuestra labor sindical.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-3">
        {principiosData.map((principio, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={index}
            className="border border-prosalud-border bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <AccordionTrigger className="text-left hover:no-underline py-5 px-6 text-lg font-medium text-text-dark hover:text-primary-prosalud group w-full">
              <div className="flex items-center">
                <principio.icon size={26} className="mr-4 text-secondary-prosaludgreen shrink-0 transition-transform duration-300 group-hover:scale-110" />
                {principio.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-text-gray pt-0 p-6 text-base leading-relaxed bg-slate-50 rounded-b-lg">
              {principio.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

const PrinciplesSkeletonItem: React.FC<{ itemKey: number }> = ({ itemKey }) => (
  <div key={itemKey} className="border border-prosalud-border bg-white rounded-lg shadow-md p-5 px-6">
    <Skeleton className="h-6 w-3/4" />
  </div>
);

const PrinciplesSkeleton: React.FC = () => (
  <section className="py-16 md:py-24 bg-gradient-to-b from-background-light to-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-7 w-1/2 mx-auto" />
      </div>
      <div className="w-full max-w-4xl mx-auto space-y-3">
        {[...Array(5)].map((_, index) => <PrinciplesSkeletonItem key={index} itemKey={index} />)}
      </div>
    </div>
  </section>
);

const PrinciplesSection: React.FC = () => {
  const observerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(observerRef, { threshold: 0.1, freezeOnceVisible: true });

  return (
    <div ref={observerRef} className="min-h-[1px]">
      {isVisible ? <PrinciplesContent /> : <PrinciplesSkeleton />}
    </div>
  );
};

export default PrinciplesSection;
