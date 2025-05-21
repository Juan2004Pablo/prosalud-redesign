
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, FileText, Gavel, Briefcase, Info, BadgeCheck, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ContentSectionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string | React.ReactNode;
  iconColor?: string;
  bgColor?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ icon: Icon, title, description, details, iconColor = "text-primary-prosalud", bgColor = "bg-white" }) => (
  <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${bgColor} animate-fade-in`}>
    <CardHeader>
      <div className="flex items-center mb-3">
        <Icon className={`h-10 w-10 mr-4 ${iconColor}`} />
        <div>
          <CardTitle className={`text-2xl font-semibold ${iconColor}`}>{title}</CardTitle>
          <CardDescription className="text-md text-gray-500">{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      {typeof details === 'string' ? <p className="text-gray-700 leading-relaxed">{details}</p> : details}
    </CardContent>
  </Card>
);

const ContratoSindicalPage: React.FC = () => {
  const sections = [
    {
      icon: Users,
      title: "Calidad del Afiliado Partícipe",
      description: "Entiende tu rol y los beneficios económicos como afiliado partícipe.",
      details: "El afiliado que participa en el desarrollo de un Contrato Sindical tendrá la calidad de afiliado partícipe y por esa condición tendrá derecho a un reconocimiento económico denominado compensación.",
      iconColor: "text-secondary-prosaludgreen",
    },
    {
      icon: AlertTriangle,
      title: "Diferencias Clave: Contrato Sindical vs. Contrato Laboral",
      description: "Comprende la distinción fundamental en la relación y la ausencia de subordinación.",
      details: (
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>El afiliado partícipe en la ejecución del contrato sindical <strong>no es trabajador del sindicato</strong> porque este lo componen los mismos afiliados y ejecutan dicho contrato sindical en el desarrollo del contrato colectivo, no encontrándose el elemento esencial de la subordinación.</p>
          <p>Esta relación se rige por principios democráticos, de autogestión y colaboración y de autorregulación donde los afiliados actúan en un plano de igualdad.</p>
          <p className="font-semibold text-primary-prosalud">Entre el afiliado partícipe y la organización sindical no existe una relación laboral y en consecuencia NO HAY CONTRATO DE TRABAJO.</p>
        </div>
      ),
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Gavel,
      title: "Naturaleza Jurídica del Contrato Sindical",
      description: "Conoce el marco legal y las normativas que rigen el contrato sindical.",
      details: (
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>Según el Decreto Reglamentario 1429 del 28 de abril 2010, art 1: “El contrato sindical como un acuerdo de voluntades, es de naturaleza colectivo [...]"</p>
          <p>En el artículo 482 del C.S.T. se afirma en la parte final que la duración, la revisión y la extinción del contrato sindical se rige por las normas del contrato individual de trabajo.</p>
          <p className="font-medium">Por lo tanto, se concluye que la naturaleza jurídica del contrato sindical es de estirpe laboral en la modalidad colectiva.</p>
        </div>
      ),
    },
    {
      icon: FileText,
      title: "Definición de Contrato Sindical",
      description: "El concepto fundamental según la legislación.",
      details: "Se entiende por contrato sindical el que celebren uno o varios Sindicatos de trabajadores con uno o varios empleadores para la prestación de servicios o la ejecución de una obra por medio de sus afiliados.",
      iconColor: "text-accent-prosaludteal",
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center bg-primary-prosalud text-white p-3 rounded-full mb-4 shadow-lg">
            <Briefcase size={40} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-prosalud mb-3">
            Contrato Sindical
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Información esencial sobre la naturaleza, implicaciones y marco legal del contrato sindical en ProSalud.
          </p>
        </header>

        <Separator className="my-12 bg-primary-prosalud-light" />

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {sections.map((section, index) => (
            <ContentSection
              key={index}
              icon={section.icon}
              title={section.title}
              description={section.description}
              details={section.details}
              iconColor={section.iconColor}
              bgColor={section.bgColor}
            />
          ))}
        </div>
        
        <div className="my-12 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-md shadow-md animate-fade-in animation-delay-400">
          <div className="flex items-start">
            <Info className="h-6 w-6 mr-3 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-700 mb-1">Punto Clave</h3>
              <p className="text-gray-700">
                La relación bajo un contrato sindical es de colaboración y autogestión, diferenciándose significativamente de una relación laboral tradicional. Es fundamental comprender esta distinción para entender los derechos y responsabilidades de los afiliados partícipes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default ContratoSindicalPage;
