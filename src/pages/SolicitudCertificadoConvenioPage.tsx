
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import MainLayout from '@/components/layout/MainLayout';
import { Send } from 'lucide-react';
// import { Link } from 'react-router-dom'; // No longer needed here
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"; // Moved

import DatosPersonalesSection from '@/components/solicitud-certificado/DatosPersonalesSection';
import InformacionCertificadoSection from '@/components/solicitud-certificado/InformacionCertificadoSection';
import ArchivoAdicionalSection from '@/components/solicitud-certificado/ArchivoAdicionalSection';
import SolicitudHeader from '@/components/solicitud-certificado/SolicitudHeader';
import InformacionImportanteAlert from '@/components/solicitud-certificado/InformacionImportanteAlert';
import ConfirmacionCorreoSection from '@/components/solicitud-certificado/ConfirmacionCorreoSection';
import AutorizacionDatosSection from '@/components/solicitud-certificado/AutorizacionDatosSection';
import SolicitudBreadcrumb from '@/components/solicitud-certificado/SolicitudBreadcrumb'; // New import
import { useSolicitudCertificadoForm, FormValues } from '@/hooks/useSolicitudCertificadoForm'; // New import

// const RECAPTCHA_SITE_KEY, formSchema, FormValues type, idTypes, useForm, onSubmit, handleError moved to hook

const SolicitudCertificadoConvenioPage: React.FC = () => {
  const { form, onSubmit, handleError, idTypes } = useSolicitudCertificadoForm();

  return (
    <MainLayout>
      <SolicitudBreadcrumb /> {/* Replaced breadcrumb JSX */}
      
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
            
            {/* Campo ReCAPTCHA Comentado Temporalmente - Logic for this would be in the hook if re-enabled */}
            {/*
            <FormField
              control={form.control}
              name="recaptchaToken" // This would be FormValues.recaptchaToken
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_SITE_KEY_FROM_HOOK_OR_ENV} // RECAPTCHA_SITE_KEY would come from hook or env
                      onChange={(token) => field.onChange(token)}
                      onExpired={() => field.onChange('')}
                      onErrored={() => {
                        field.onChange(''); 
                        toast.error("Error con reCAPTCHA. Inténtalo de nuevo."); // Toast can be called directly
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
