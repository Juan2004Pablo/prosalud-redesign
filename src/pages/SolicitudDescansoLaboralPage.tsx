
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

import DescansoHeader from '@/components/solicitud-descanso/DescansoHeader';
import InformacionDescansoSection from '@/components/solicitud-descanso/InformacionDescansoSection';
import RequisitosDescansoSection from '@/components/solicitud-descanso/RequisitosDescansoSection';
import DatosPersonalesDescansoSection from '@/components/solicitud-descanso/DatosPersonalesDescansoSection';
import AnexoDescansoSection from '@/components/solicitud-descanso/AnexoDescansoSection';
import InformacionImportanteDescansoAlert from '@/components/solicitud-descanso/InformacionImportanteDescansoAlert';
import ConfirmacionCorreoSection from '@/features/solicitud-certificado/components/ConfirmacionCorreoSection';
import AutorizacionDatosSection from '@/features/solicitud-certificado/components/AutorizacionDatosSection';

const formSchema = z.object({
  tipoId: z.string().nonempty({ message: "Este campo es obligatorio" }),
  numeroId: z.string().nonempty({ message: "Este campo es obligatorio" }),
  primerNombre: z.string().nonempty({ message: "Este campo es obligatorio" }),
  segundoNombre: z.string().optional(),
  primerApellido: z.string().nonempty({ message: "Este campo es obligatorio" }),
  segundoApellido: z.string().optional(),
  email: z.string().email({ message: "Correo electrónico inválido" }).nonempty({ message: "Este campo es obligatorio" }),
  confirmarEmail: z.string().email({ message: "Correo electrónico inválido" }).nonempty({ message: "Este campo es obligatorio" }),
  celular: z.string().nonempty({ message: "Este campo es obligatorio" }),
  cargo: z.string().nonempty({ message: "Este campo es obligatorio" }),
  ips: z.string().nonempty({ message: "Este campo es obligatorio" }),
  fechaInicioContrato: z.date({ required_error: "Este campo es obligatorio" }),
  fechaFinalizacionContrato: z.date({ required_error: "Este campo es obligatorio" }),
  numeroDias: z.string().nonempty({ message: "Este campo es obligatorio" }),
  fechaInicioDescanso: z.date({ required_error: "Este campo es obligatorio" }),
  fechaFinalizacionDescanso: z.date({ required_error: "Este campo es obligatorio" }),
  anexoSoporte: z.instanceof(FileList)
    .refine((files) => files?.length > 0, {
      message: "Este campo es obligatorio",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `El tamaño máximo es ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine(
      (files) => ALLOWED_FILE_TYPES_PDF.includes(files?.[0]?.type),
      "Solo se permiten archivos .pdf"
    ),
  autorizacionDatos: z.boolean().refine((value) => value === true, {
    message: 'Debes aceptar la autorización de tratamiento de datos.',
  }),
  confirmacionCorreo: z.boolean().refine((value) => value === true, {
    message: 'Debes confirmar que tu correo electrónico es correcto.',
  }),
}).refine((data) => data.email === data.confirmarEmail, {
  message: "Los correos electrónicos deben coincidir",
  path: ["confirmarEmail"],
});

export type SolicitudDescansoLaboralFormValues = z.infer<typeof formSchema>;

const SolicitudDescansoLaboralPage: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<SolicitudDescansoLaboralFormValues>({
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
      cargo: "",
      ips: "",
      fechaInicioContrato: undefined,
      fechaFinalizacionContrato: undefined,
      numeroDias: "",
      fechaInicioDescanso: undefined,
      fechaFinalizacionDescanso: undefined,
      anexoSoporte: undefined,
      autorizacionDatos: false,
      confirmacionCorreo: false,
    },
    mode: "onChange",
  });

  function onSubmit(values: SolicitudDescansoLaboralFormValues) {
    console.log("Formulario de Solicitud de Descanso Laboral Enviado");
    console.log(values);
    toast({
      title: "Formulario de Solicitud de Descanso Laboral Enviado",
      description: "Hemos recibido tu solicitud y la estamos procesando.",
    });
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DescansoHeader />
            <InformacionDescansoSection control={form.control} />
            <Separator />
            <RequisitosDescansoSection />
            <Separator />
            <DatosPersonalesDescansoSection control={form.control} idTypes={idTypes} />
            <Separator />
            <ConfirmacionCorreoSection control={form.control} />
            <Separator />
            <AnexoDescansoSection control={form.control} setValue={form.setValue} />
            <Separator />
            <AutorizacionDatosSection control={form.control} />
            <InformacionImportanteDescansoAlert />
            <div>
              <Button type="submit" size="lg" disabled={!form.formState.isValid}>
                Enviar Solicitud
              </Button>
            </div>
          </form>
        </FormProvider>
        {process.env.NODE_ENV === 'development' && <DevTool control={form.control} />}
      </div>
    </MainLayout>
  );
};

export default SolicitudDescansoLaboralPage;
