import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { DevTool } from '@hookform/devtools';

import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES_PDF } from '@/features/solicitud-certificado/utils';
import { idTypes } from '@/features/solicitud-certificado/config/constants';

import AnualDiferidaHeader from '@/components/solicitud-anual-diferida/AnualDiferidaHeader';
import InformacionAnualDiferidaSection from '@/components/solicitud-anual-diferida/InformacionAnualDiferidaSection';
import RequisitosAnualDiferidaSection from '@/components/solicitud-anual-diferida/RequisitosAnualDiferidaSection';
import AnexosAnualDiferidaSection from '@/components/solicitud-anual-diferida/AnexosAnualDiferidaSection';
import InformacionImportanteAnualDiferidaAlert from '@/components/solicitud-anual-diferida/InformacionImportanteAnualDiferidaAlert';
import DatosPersonalesSection from '@/features/solicitud-certificado/components/DatosPersonalesSection';
import ConfirmacionCorreoSection from '@/features/solicitud-certificado/components/ConfirmacionCorreoSection';
import AutorizacionDatosSection from '@/features/solicitud-certificado/components/AutorizacionDatosSection';

const formSchema = z.object({
  tipoId: z.string().min(1, { message: "Selecciona un tipo de documento" }),
  numeroId: z.string().min(1, { message: "Número de documento es requerido" }),
  primerNombre: z.string().min(1, { message: "Primer nombre es requerido" }),
  segundoNombre: z.string().optional(),
  primerApellido: z.string().min(1, { message: "Primer apellido es requerido" }),
  segundoApellido: z.string().optional(),
  fechaNacimiento: z.date({ required_error: "Fecha de nacimiento es requerida" }),
  numeroCelular: z.string().min(1, { message: "Número de celular es requerido" }),
  correoElectronico: z.string().email({ message: "Correo electrónico inválido" }),
  confirmarCorreoElectronico: z.string().email({ message: "Correo electrónico inválido" }),
  aceptoAutorizacion: z.boolean().refine((value) => value === true, {
    message: 'Debes aceptar la autorización de tratamiento de datos.',
  }),
  //Campos propios del formulario
  nombreBanco: z.string().min(1, { message: "Nombre del banco es requerido" }),
  tipoCuenta: z.string().min(1, { message: "Tipo de cuenta es requerido" }),
  numeroCuenta: z.string().min(1, { message: "Número de cuenta es requerido" }),
  cedulaGerencia: z.string().min(1, { message: "Cédula de gerencia es requerida" }),
  cartaSolicitud: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Tamaño máximo 4MB.`)
    .refine(
      (files) => ALLOWED_FILE_TYPES_PDF.includes(files?.[0]?.type),
      "Solo se permiten archivos PDF."
    , {message: "Carta de solicitud es requerida"}),
});

export type SolicitudAnualDiferidaFormValues = z.infer<typeof formSchema>;

const SolicitudAnualDiferidaPage: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<SolicitudAnualDiferidaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoId: '',
      numeroId: '',
      primerNombre: '',
      segundoNombre: undefined,
      primerApellido: '',
      segundoApellido: undefined,
      fechaNacimiento: new Date(),
      numeroCelular: '',
      correoElectronico: '',
      confirmarCorreoElectronico: '',
      aceptoAutorizacion: false,
      nombreBanco: '',
      tipoCuenta: '',
      numeroCuenta: '',
      cedulaGerencia: undefined,
      cartaSolicitud: undefined,
    },
    mode: "onChange",
  });

  function onSubmit(values: SolicitudAnualDiferidaFormValues) {
    console.log("Values", values);
    toast({
      title: "¡Formulario enviado!",
      description: "Hemos recibido tu solicitud y la estamos procesando.",
    })
  }

  return (
    <MainLayout>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="container py-12">
          <AnualDiferidaHeader />
          <InformacionImportanteAnualDiferidaAlert />
          <Separator className="my-6" />

          <DatosPersonalesSection idTypes={idTypes} />
          <Separator className="my-6" />

          <ConfirmacionCorreoSection />
          <Separator className="my-6" />

          <InformacionAnualDiferidaSection />
          <Separator className="my-6" />

          <RequisitosAnualDiferidaSection />
          <Separator className="my-6" />

          <AnexosAnualDiferidaSection control={form.control} />
          <Separator className="my-6" />

          <AutorizacionDatosSection />
          <Separator className="my-6" />

          <div className="flex justify-center mt-8">
            <Button type="submit" size="lg">
              Enviar Solicitud
            </Button>
          </div>
          <DevTool control={form.control} />
        </form>
      </FormProvider>
    </MainLayout>
  );
};

export default SolicitudAnualDiferidaPage;
