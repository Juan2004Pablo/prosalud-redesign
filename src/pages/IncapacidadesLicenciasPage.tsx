
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Mail, CheckCircle2, AlertTriangle, FileText, Send, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CopyToClipboardButton from '@/components/ui/copyToClipboardButton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const IncapacidadesLicenciasPage: React.FC = () => {
  const proSaludLogoUrl = "/lovable-uploads/2bf2da56-4967-4a17-8849-9efab8759375.png";

  return (
    <MainLayout>
      <div className="container mx-auto pt-6 pb-2 px-4 md:px-6 lg:px-8">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center space-x-2 text-sm">
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
              <BreadcrumbPage className="flex items-center gap-1 font-medium text-foreground">
                <FileText className="h-4 w-4" />
                Incapacidades y Licencias
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 animate-[fadeInUp_0.5s_ease-out]">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Incapacidades y Licencias
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Guía completa para el trámite de incapacidades y licencias. Sigue estos pasos para asegurar un proceso ágil y correcto.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="animate-[fadeInUp_0.7s_ease-out_0.2s_forwards] opacity-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary">
                <Send size={28} className="mr-3 text-secondary" />
                Proceso de Envío de Incapacidades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Mail size={20} className="mr-2 text-primary" /> Correo para envío:
                </h3>
                <div className="flex items-center">
                  <p className="text-secondary font-medium text-lg bg-primary/10 p-3 rounded-md inline-block">
                    incapacidades@sindicatoprosalud.com
                  </p>
                  <CopyToClipboardButton textToCopy="incapacidades@sindicatoprosalud.com" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Este es el único canal para la recepción de incapacidades.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText size={20} className="mr-2 text-primary" /> Asunto del Correo:
                </h3>
                <p>
                  Debe indicar: <strong>Nombre completo y número de cédula del afiliado</strong>.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ej: Asunto: incapacidad Maria Perez CC 123456789
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText size={20} className="mr-2 text-primary" /> Archivos Adjuntos:
                </h3>
                <p>
                  Anexar únicamente archivos en formato <strong>PDF</strong>.
                </p>
                <p>
                  El documento debe ser <strong>legible y completo</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-[fadeInUp_0.7s_ease-out_0.4s_forwards] opacity-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary">
                <Info size={28} className="mr-3 text-secondary" />
                Recomendaciones Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "El afiliado garantiza que las incapacidades son originales, sin alteraciones ni enmendaduras.",
                "Si tiene incapacidades por diferentes diagnósticos, envíe un correo por cada incapacidad.",
                "Fecha límite de envío: dentro de los 5 días calendario siguientes a la fecha de expedición del certificado.",
                "El mero envío de la incapacidad no implica su aprobación o aceptación para pago.",
                "Solo se reciben incapacidades expedidas por su respectiva EPS/ARL."
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 size={20} className="mr-2 text-primary flex-shrink-0 mt-1" />
                  <p>{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12 animate-[fadeInUp_0.7s_ease-out_0.6s_forwards] opacity-0">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <Mail size={28} className="mr-3 text-secondary" />
              Respuesta del Sindicato ProSalud
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              ProSalud enviará una respuesta sobre la información recibida en un plazo de <strong>3 días hábiles</strong>.
            </p>
            <p>
              Esta respuesta se enviará únicamente desde el correo: <strong className="text-secondary">incapacidades@sindicatoprosalud.com</strong> y se remitirá al mismo correo desde donde se recibió la incapacidad.
            </p>
            <p>
              Se entenderá como fecha de recepción de la Incapacidad Temporal (IT) por parte de ProSalud, la fecha en la que el sindicato recibe el email en el buzón mencionado.
            </p>
            <p>
              Las incapacidades temporales remitidas por este buzón no se entienden como aprobadas ni aceptadas para pago hasta su validación.
            </p>
            <p className="font-semibold">
              Este buzón es exclusivo para la recepción de incapacidades por parte de los afiliados.
            </p>
          </CardContent>
        </Card>

        <Alert variant="destructive" className="animate-[fadeInUp_0.7s_ease-out_0.8s_forwards] opacity-0">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">¡Atención!</AlertTitle>
          <AlertDescription className="text-base">
            Solo se procesarán incapacidades expedidas por su respectiva <strong>EPS o ARL</strong>. Asegúrese de que los documentos cumplan con este requisito fundamental.
            <p className="mt-2 text-sm">
              El horario de revisión de solicitudes es de lunes a viernes de 7:00 a.m. a 4:00 p.m. Cualquier registro vencido el citado horario, se entenderá presentado el siguiente día hábil. Se registran y asigna su revisión por orden de registro.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </MainLayout>
  );
};

export default IncapacidadesLicenciasPage;
