
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { Home, Download, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SolicitudPermisosCambioTurnosPage: React.FC = () => {
  const formatoPermisosUrl = "http://orgs.ddns.net:8091/DocPublicos/Modelo%20de%20Plantillas/Formato%20Solicitud%20Permisos/Formato%20Solicitud%20Permisos.pdf";
  const formatoCambioTurnosUrl = "http://orgs.ddns.net:8091/DocPublicos/Modelo%20de%20Plantillas/Formato%20cambio%20de%20turnos/Formato%20cambio%20de%20turnos%20ProSalud.pdf";

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
                <FileText className="h-4 w-4 mr-1 inline-block" /> Solicitud de Permisos y Cambio de Turnos
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="bg-card p-6 md:p-8 rounded-lg shadow-lg border border-prosalud-border">
          <header className="mb-8 text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
                <FileText className="h-10 w-10 text-primary-prosalud" />
                <h1 className="text-3xl font-bold text-primary-prosalud">
                Solicitud de Permisos y Cambio de Turnos
                </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Encuentra aquí los formatos necesarios y la información importante para gestionar tus solicitudes de permisos o cambios de turno.
            </p>
          </header>

          <section className="mb-10 p-6 border rounded-lg bg-gray-50 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <Download className="mr-3 h-6 w-6 text-primary-prosalud" /> Descarga de Formatos
            </h2>
            <p className="text-gray-600 mb-6">
              Descarga los formatos oficiales para tu solicitud. Asegúrate de diligenciarlos completamente y obtener las firmas requeridas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                asChild 
                className="w-full bg-secondary-prosaludgreen hover:bg-secondary-prosaludgreen/90 text-white py-6 text-base"
                size="lg"
              >
                <a href={formatoPermisosUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" /> Formato de Solicitud de Permisos
                </a>
              </Button>
              <Button 
                asChild 
                className="w-full bg-secondary-prosaludgreen hover:bg-secondary-prosaludgreen/90 text-white py-6 text-base"
                size="lg"
              >
                <a href={formatoCambioTurnosUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" /> Formato de Cambio de Turnos
                </a>
              </Button>
            </div>
          </section>

          <section className="mb-8">
            <Alert className="border-amber-400 bg-amber-50 text-amber-700">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <AlertTitle className="font-semibold text-amber-800">Notas Importantes</AlertTitle>
              <AlertDescription className="text-amber-700">
                <ul className="list-disc list-inside space-y-1.5 mt-2 pl-2">
                  <li>Tener presente los requisitos de su solicitud.</li>
                  <li>Es muy importante que la solicitud cuente con el V°B° del Coordinador o la persona encargada en la Sede de la programación de turnos. <strong>Requerido.</strong></li>
                  <li>El envío del documento debidamente firmado es de carácter <strong>obligatorio</strong>.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </section>
          
          <div className="text-center mt-12">
            <Button variant="outline" asChild size="lg">
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

export default SolicitudPermisosCambioTurnosPage;
