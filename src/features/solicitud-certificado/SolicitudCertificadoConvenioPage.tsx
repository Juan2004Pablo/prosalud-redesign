
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import { Send, CheckCircle2, AlertCircle, Home, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import { formSchema, FormValues } from './config/formSchema';
import { idTypes } from './config/constants';
// Removed RECAPTCHA_SITE_KEY import as reCAPTCHA is commented out

import DatosPersonalesSection from './components/DatosPersonalesSection';
import InformacionCertificadoSection from './components/InformacionCertificadoSection';
import ArchivoAdicionalSection from './components/ArchivoAdicionalSection';
import SolicitudHeader from './components/SolicitudHeader';
import InformacionImportanteAlert from './components/InformacionImportanteAlert';
import ConfirmacionCorreoSection from './components/ConfirmacionCorreoSection';
import AutorizacionDatosSection from './components/AutorizacionDatosSection';

const SolicitudCertificadoConvenioPage: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoIdentificacion: 'CC',
      numeroIdentificacion: '',
      nombres: '',
      apellidos: '',
      correoElectronico: '',
      numeroCelular: '',
      infoCertificado: {
        fechaIngresoRetiro: false,
        valorCompensaciones: false,
        dirigidoAEntidad: false,
        paraSubsidioDesempleo: false,
        paraSubsidioVivienda: false,
        dirigidoFondoPensiones: false,
        adicionarActividades: false,
        dirigidoTransitoPicoPlaca: false,
        dirigidoBancolombia: false,
        otros: false,
      },
      dirigidoAQuien: '',
      actividadesPdf: undefined,
      tipoVehiculo: '',
      placaVehiculo: '',
      otrosDescripcion: '',
      adjuntarArchivoAdicional: undefined,
      confirmacionCorreo: false,
      // recaptchaToken: '', 
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data (reCAPTCHA temporalmente desactivado):', data);
    toast.success('Solicitud enviada con éxito', {
      description: (
        <>
          Recibirá el certificado en su correo en los próximos días hábiles.
          <br />
          <strong className="mt-2 block font-semibold">Tenga presente:</strong> Solamente en caso de presentarse alguna inconsistencia nos comunicaremos con usted.
        </>
      ),
      duration: 8000,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
      onAutoClose: () => {
        form.reset();
        navigate('/');
      },
      onDismiss: () => {
        if (form.formState.isSubmitSuccessful) { 
            navigate('/');
        }
      }
    });
  };
  
  const handleError = () => {
    toast.error('Error al enviar el formulario', {
      description: 'Por favor verifique los datos ingresados e intente nuevamente.',
      duration: 5000,
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
    });
  };

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
                Solicitud Certificado Convenio
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <SolicitudHeader />
        <InformacionImportanteAlert />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, handleError)} className="space-y-8">
            <DatosPersonalesSection control={form.control} idTypes={idTypes} />
            <InformacionCertificadoSection control={form.control} watch={form.watch} />
            <ArchivoAdicionalSection control={form.control} />
            <ConfirmacionCorreoSection control={form.control} />
            <AutorizacionDatosSection />
            
            {/* Campo ReCAPTCHA Comentado Temporalmente */}
            {/*
            <FormField
              control={form.control}
              name="recaptchaToken"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_SITE_KEY} // This constant would need to be imported if re-enabled
                      onChange={(token) => field.onChange(token)}
                      onExpired={() => field.onChange('')}
                      onErrored={() => {
                        field.onChange(''); 
                        toast.error("Error con reCAPTCHA. Inténtalo de nuevo.");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            */}
            
            <div className="flex justify-center mt-10">
              <Button type="submit" size="lg" className="w-full md:w-auto bg-secondary-prosaludgreen hover:bg-secondary-prosaludgreen/90 text-white flex items-center gap-2">
                <Send className="h-5 w-5" />
                Enviar Solicitud
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default SolicitudCertificadoConvenioPage;
