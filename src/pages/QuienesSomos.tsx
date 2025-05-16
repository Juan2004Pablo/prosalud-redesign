
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Handshake, Shield, Users, Scale, HandHelping, Briefcase, Ban, Library, Megaphone, ClipboardCheck, HeartHandshake, Target, Eye, Flag } from 'lucide-react';

const valoresData = [
  {
    icon: BadgeCheck,
    title: "Ética",
    description: "Capacitación permanente, principios morales y credibilidad alcanzada por cada afiliado."
  },
  {
    icon: Handshake,
    title: "Fe en Dios, Lealtad y Colaboración",
    description: "Con la comunidad y las entidades donde laboremos, como guía para nuestros objetivos."
  }
];

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

const QuienesSomos: React.FC = () => {
  return (
    <MainLayout>
      {/* Encabezado */}
      <section className="bg-gradient-to-br from-primary-prosalud via-primary-prosalud-dark to-slate-900 text-text-light py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            ¿Quiénes somos?
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Conoce la esencia de ProSalud, el Sindicato de Profesionales de la Salud.
          </p>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section className="py-12 md:py-16 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="animate-slide-in-right">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-primary-prosalud text-white rounded-t-lg">
                  <CardTitle className="flex items-center text-2xl">
                    <Flag size={28} className="mr-3" /> Misión
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 text-text-gray">
                  <p className="text-base leading-relaxed">
                    "Representar y fortalecer el oficio de los Profesionales de la Salud generando bienestar laboral y económico a todos sus afiliados partícipes, buscando así el mejoramiento en los estándares de calidad en la prestación de los servicios de las Instituciones contractuales."
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="animate-slide-in-right animation-delay-200">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-secondary-prosaludgreen text-white rounded-t-lg">
                  <CardTitle className="flex items-center text-2xl">
                    <Eye size={28} className="mr-3" /> Visión
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 text-text-gray">
                  <p className="text-base leading-relaxed">
                    "En el 2018 nuestro Sindicato de Oficio será líder en el departamento de Antioquia, reconocida por el fortalecimiento en la modalidad de contrato colectivo laboral en beneficio de los afiliados y las empresas contractuales."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-prosalud mb-3">Nuestros Valores</h2>
            <p className="text-lg text-text-gray max-w-xl mx-auto">
              Los pilares que guían cada una de nuestras acciones y decisiones.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {valoresData.map((valor, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-md border border-prosalud-border hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                <valor.icon size={48} className="text-primary-prosalud mb-4" />
                <h3 className="text-xl font-semibold text-text-dark mb-2">{valor.title}</h3>
                <p className="text-text-gray text-sm leading-relaxed">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Principios Section */}
      <section className="py-12 md:py-16 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-prosalud mb-3">Nuestros Principios</h2>
            <p className="text-lg text-text-gray max-w-xl mx-auto">
              Compromisos fundamentales que rigen nuestra labor sindical.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {principiosData.map((principio, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-b border-prosalud-border animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <AccordionTrigger className="text-left hover:no-underline py-4 text-md font-medium text-text-dark hover:text-primary-prosalud">
                  <div className="flex items-center">
                    <principio.icon size={22} className="mr-3 text-secondary-prosaludgreen shrink-0" />
                    {principio.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-text-gray pt-1 pb-4 text-sm leading-relaxed">
                  {principio.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </MainLayout>
  );
};

export default QuienesSomos;
