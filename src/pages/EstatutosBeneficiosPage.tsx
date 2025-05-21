import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Users, ShieldCheck, ClipboardCheck, Gavel, BadgeDollarSign, Info, Home, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const EstatutosBeneficiosPage: React.FC = () => {
  const capituloIVItems = [
    {
      icon: Users,
      title: "Artículo 11°. OBLIGACIONES DE LOS AFILIADOS PARTICIPES.",
      description: "Conoce las responsabilidades que adquieres como afiliado partícipe del sindicato."
    },
    {
      icon: ShieldCheck,
      title: "Artículo 12°. DERECHOS DE LOS AFILIADOS PARTICIPES.",
      description: "Descubre los derechos y protecciones que te corresponden como miembro."
    },
    {
      icon: ClipboardCheck,
      title: "Artículo 13°. DEBERES DE LOS AFILIADOS PARTICIPES.",
      description: "Infórmate sobre los deberes fundamentales para el buen funcionamiento de nuestra organización."
    }
  ];

  const capituloVItems = [
    {
      icon: Gavel,
      title: "Artículo 32°. SISTEMA DISCIPLINARIO APLICABLE A LOS AFILIADOS PARTICIPES",
      description: "Entiende el proceso y las normativas del sistema disciplinario."
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Home className="h-4 w-4" />
                  Inicio
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/nosotros/quienes-somos" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                   <Users className="h-4 w-4" />
                  Nosotros
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1 font-medium text-foreground">
                <FileText className="h-4 w-4" />
                Estatutos y Beneficios Sindicales
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-prosalud mb-3">
            Estatutos y Beneficios Sindicales
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Información clave sobre los estatutos, derechos, deberes y beneficios para nuestros afiliados partícipes.
          </p>
        </header>

        <Separator className="my-10 bg-primary-prosalud-light" />

        <section className="mb-12 animate-fade-in animation-delay-600">
           <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center mb-2">
                <BadgeDollarSign className="h-8 w-8 mr-3 text-primary-prosalud" />
                <CardTitle className="text-3xl font-semibold text-primary-prosalud">Compensaciones, Auxilios y Beneficios</CardTitle>
              </div>
               <CardDescription className="text-md text-gray-500">
                Información sobre las retribuciones y ayudas disponibles para los afiliados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                El Sindicato, de acuerdo con la asamblea, el reglamento o contrato sindical, establecerá la frecuencia de las compensaciones, de los auxilios y beneficios. Te invitamos a consultar los documentos oficiales para más detalles.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12 space-y-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-scale-in">
            <CardHeader>
              <div className="flex items-center mb-2">
                <BookOpen className="h-8 w-8 mr-3 text-primary-prosalud" />
                <CardTitle className="text-3xl font-semibold text-primary-prosalud">Estatutos - Capítulo IV</CardTitle>
              </div>
              <CardDescription className="text-md text-gray-500">
                Obligaciones, Derechos y Deberes de los Afiliados Partícipes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {capituloIVItems.map((item, index) => (
                <article key={index} className="p-4 border-l-4 border-secondary rounded-r-md bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-start">
                    <item.icon className="h-6 w-6 mr-3 text-secondary-prosaludgreen flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-medium text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-scale-in animation-delay-200">
            <CardHeader>
              <div className="flex items-center mb-2">
                <BookOpen className="h-8 w-8 mr-3 text-primary-prosalud" />
                <CardTitle className="text-3xl font-semibold text-primary-prosalud">Estatutos - Capítulo V</CardTitle>
              </div>
              <CardDescription className="text-md text-gray-500">
                Régimen Disciplinario Interno.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {capituloVItems.map((item, index) => (
                <article key={index} className="p-4 border-l-4 border-secondary rounded-r-md bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-start">
                    <item.icon className="h-6 w-6 mr-3 text-secondary-prosaludgreen flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-medium text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>
        </section>
        
        <div className="my-12 p-6 bg-blue-50 border-l-4 border-primary-prosalud rounded-md shadow-md animate-fade-in animation-delay-400">
          <div className="flex items-start">
            <Info className="h-6 w-6 mr-3 text-primary-prosalud flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-primary-prosalud mb-1">Nota Importante</h3>
              <p className="text-gray-700">
                Dichos ítems están contenidos en los Estatutos Sindicales y Reglamento del Contrato Sindical depositados en el Ministerio de la protección Social y se divulgan en la página web <a href="http://www.sindicatoprosalud.com" target="_blank" rel="noopener noreferrer" className="text-primary-prosalud hover:underline font-medium">www.sindicatoprosalud.com</a>.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-10" />
      </div>
    </MainLayout>
  );
};

export default EstatutosBeneficiosPage;
