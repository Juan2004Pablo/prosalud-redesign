import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { DevTool } from '@hookform/devtools';

import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES_GENERAL } from '@/features/solicitud-certificado/utils';
import { idTypes } from '@/features/solicitud-certificado/config/constants';
import { tipoNovedadOptions } from '@/components/verificacion-pagos/options';

import VerificacionHeader from '@/components/verificacion-pagos/VerificacionHeader';
import DatosPersonalesVerificacionSection from '@/components/verificacion-pagos/DatosPersonalesVerificacionSection';
import DetalleNovedadSection from '@/components/verificacion-pagos/DetalleNovedadSection';
import ArchivoAnexoSection from '@/components/verificacion-pagos/ArchivoAnexoSection';
import ConfirmacionEnvioSection from '@/components/verificacion-pagos/ConfirmacionEnvioSection';
import InformacionImportanteVerificacionAlert from '@/components/verificacion-pagos/InformacionImportanteVerificacionAlert';
import InformacionProcesoSection from '@/components/verificacion-pagos/InformacionProcesoSection';
import ConfirmacionCorreoSection from '@/features/solicitud-certificado/components/ConfirmacionCorreoSection';
import AutorizacionDatosSection from '@/features/solicitud-certificado/components/AutorizacionDatosSection';

const formSchema = z.object({
  tipoId: z.string().min(1, {
    message: "El tipo de identificación es requerido.",
  }),
  numeroId: z.string().min(1, {
    message: "El número de identificación es requerido.",
  }),
  primerNombre: z.string().min(1, {
    message: "El primer nombre es requerido.",
  }),
  segundoNombre: z.string().optional(),
  primerApellido: z.string().min(1, {
    message: "El primer apellido es requerido.",
  }),
  segundoApellido: z.string().optional(),
  email: z.string().email({
    message: "Por favor, introduce un correo electrónico válido.",
  }),
  confirmarEmail: z.string().email({
    message: "Por favor, introduce un correo electrónico válido.",
  }),
  celular: z.string().min(1, {
    message: "El número de celular es requerido.",
  }),
  tipoNovedad: z.string().min(1, {
    message: "El tipo de novedad es requerido.",
  }),
  detalleNovedad: z.string().min(1, {
    message: "El detalle de la novedad es requerido.",
  }),
  archivoAnexo: z
    .any()
    .refine((files) => {
      if (!files || files.length === 0) {
        return true; 
      }
      const file = files[0];
      return file?.size <= MAX_FILE_SIZE;
    }, `El tamaño máximo del archivo es 4MB.`)
    .refine((files) => {
      if (!files || files.length === 0) {
        return true;
      }
      const file = files[0];
      return ALLOWED_FILE_TYPES_GENERAL.includes(file?.type);
    }, "Solo se permiten archivos PDF, JPEG, PNG o Excel."),
  autorizacionDatos: z.boolean().refine((value) => value === true, {
    message: 'Debes autorizar el tratamiento de datos para continuar.',
  }),
  confirmacionCorreo: z.boolean().refine((value) => value === true, {
    message: 'Debes confirmar que el correo electrónico es correcto.',
  }),
}).refine((data) => data.email === data.confirmarEmail, {
  message: "Los correos electrónicos no coinciden",
  path: ["confirmarEmail"],
});

export interface VerificacionPagosFormValues extends z.infer<typeof formSchema> {}

const VerificacionPagosPage: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<VerificacionPagosFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoId: "",
      numeroId: "",
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      email: "",
      confirmarEmail: "",
      celular: "",
      tipoNovedad: "",
      detalleNovedad: "",
      archivoAnexo: null,
      autorizacionDatos: false,
      confirmacionCorreo: false,
    },
    mode: "onChange",
  });

  const onSubmit = (values: VerificacionPagosFormValues) => {
    console.log("Formulario de Verificación de Pagos Enviado:", values);
    toast({
      title: "¡Formulario enviado!",
      description: "Hemos recibido tu solicitud de verificación de pagos. Te contactaremos pronto.",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <VerificacionHeader />
        <InformacionImportanteVerificacionAlert />
        <InformacionProcesoSection />
        <Separator className="my-6" />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DatosPersonalesVerificacionSection idTypes={idTypes} />
            <ConfirmacionCorreoSection />
            <DetalleNovedadSection tipoNovedadOptions={tipoNovedadOptions} />
            <ArchivoAnexoSection />
            <AutorizacionDatosSection />
            <div>
              <Button type="submit" className="w-full sm:w-auto">
                Enviar Solicitud
              </Button>
            </div>
          </form>
        </FormProvider>
        <DevTool control={form.control} />
      </div>
    </MainLayout>
  );
};

export default VerificacionPagosPage;
