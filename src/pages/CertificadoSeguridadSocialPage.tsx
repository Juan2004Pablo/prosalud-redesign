import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { Home, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';

const CertificadoSeguridadSocialPage: React.FC = () => {
  const arusSuaporteLink = "https://www.suaporte.com.co/Web/faces/pages/comprobantes/consultadirecta/consultaDirectaLogin.xhtml?_gl=1*17d7pkb*_gcl_aw*R0NMLjE2NTQ1NDc3NzcuQ2p3S0NBand5X2FVQmhBQ0Vpd0EySUhIUUZoVHN2YWdqZlZXOWxsQkkxX3RzelFac1lTR2RfOTB0Nk4tdURQbVZBcHp6emxvcVZNb2VCb0MzdGNRQXZEX0J3RQ..*_ga*MTU1MDY3NzU5LjE2NTEyNjYzNDM.*_ga_9F469EXLBS*MTY1NTg0Mzk4Ni4xMDQuMC4xNjU1ODQ0MTgxLjA.&_ga=2.99911518.1148086000.1655827255-155067759.1651266343&_gac=1.158993096.1654547787.CjwKCAjwy_aUBhACEiwA2IHHQFhTsvagjfVW9llBI1_tszQZsYSGd_90t6N-uDPmVApzzzloqVMoeBoC3tcQAvD_BwE";

  return (
    <MainLayout>
      <div className="container mx-auto pt-6 pb-2 px-4 md:px-6 lg:px-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/"><Home className="h-4 w-4 mr-1 inline-block" /> Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <FileText className="h-4 w-4 mr-1 inline-block" /> Certificado de Seguridad Social
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <header className="mb-8 text-center">
            <div className="flex justify-center items-center gap-3 mb-2">
              <ShieldCheck className="h-8 w-8 text-primary-prosalud-dark" />
              <h1 className="text-3xl font-bold text-primary-prosalud-dark">
                Certificado de Aportes a la Seguridad Social
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Autoconsultar tu certificado es un proceso simple.
            </p>
        </header>
        <div className="bg-card p-6 md:p-8 rounded-lg shadow-lg border border-prosalud-border">
          <section className="mb-8">
            <Alert className="bg-blue-50 border-blue-200 text-blue-700">
              <Info className="h-5 w-5 text-blue-600" />
              <AlertTitle className="font-semibold text-blue-800">Instrucciones Importantes</AlertTitle>
              <AlertDescription className="text-blue-700">
                Para obtener tu certificado de aportes a la seguridad social, solo necesitas completar la información personal solicitada en el portal externo.
              </AlertDescription>
            </Alert>
          </section>

          <section className="mb-8 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Paso a Paso:</h2>
            <p className="text-gray-600 mb-4">
              Sigue las instrucciones y diligencia la información solicitada en el portal de ARUS SUAPORTE.
            </p>
            <Button 
              asChild 
              className="w-full md:w-auto bg-secondary-prosaludgreen hover:bg-secondary-prosaludgreen/90 text-white"
              size="lg"
            >
              <a href={arusSuaporteLink} target="_blank" rel="noopener noreferrer">
                Ir al portal de ARUS SUAPORTE
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Serás redirigido a una página externa para completar el proceso.
            </p>
          </section>

          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CertificadoSeguridadSocialPage;
