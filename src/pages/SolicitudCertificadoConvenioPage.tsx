import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES_GENERAL, ALLOWED_FILE_TYPES_PDF } from '@/components/solicitud-certificado/utils';

import DatosPersonalesSection from '@/components/solicitud-certificado/DatosPersonalesSection';
import InformacionCertificadoSection from '@/components/solicitud-certificado/InformacionCertificadoSection';
import ArchivoAdicionalSection from '@/components/solicitud-certificado/ArchivoAdicionalSection';
import SolicitudHeader from '@/components/solicitud-certificado/SolicitudHeader';
import InformacionImportanteAlert from '@/components/solicitud-certificado/InformacionImportanteAlert';
import ConfirmacionCorreoSection from '@/components/solicitud-certificado/ConfirmacionCorreoSection';
import AutorizacionDatosSection from '@/components/solicitud-certificado/AutorizacionDatosSection';

const RECAPTCHA_SITE_KEY = "6LclSkArAAAAABXa8SIwimuDgPd8tjQbNzoBSlOZ";

const formSchema = z.object({
  tipoIdentificacion: z.string().min(1, "Este campo es requerido."),
  numeroIdentificacion: z.string().min(5, "Debe tener al menos 5 dígitos.").regex(/^\d+$/, "Solo se permiten números."),
  nombres: z.string().min(2, "Este campo es requerido."),
  apellidos: z.string().min(2, "Este campo es requerido."),
  correoElectronico: z.string().email("Correo electrónico inválido."),
  numeroCelular: z.string().min(7, "Número de celular inválido.").regex(/^\d+$/, "Solo se permiten números."),
  
  infoCertificado: z.object({
    fechaIngresoRetiro: z.boolean().default(false),
    valorCompensaciones: z.boolean().default(false),
    dirigidoAEntidad: z.boolean().default(false),
    paraSubsidioDesempleo: z.boolean().default(false),
    paraSubsidioVivienda: z.boolean().default(false),
    dirigidoFondoPensiones: z.boolean().default(false),
    adicionarActividades: z.boolean().default(false),
    dirigidoTransitoPicoPlaca: z.boolean().default(false),
    dirigidoBancolombia: z.boolean().default(false),
    otros: z.boolean().default(false),
  }).default({}),

  dirigidoAQuien: z.string().optional(),
  actividadesPdf: z.any().optional().refine(files => {
    if (!files || files.length === 0) return true;
    const file = files[0];
    return file.size <= MAX_FILE_SIZE;
  }, `El archivo no debe exceder los ${MAX_FILE_SIZE / (1024*1024)}MB.`).refine(files => {
    if (!files || files.length === 0) return true;
    const file = files[0];
    return ALLOWED_FILE_TYPES_PDF.includes(file.type);
  }, 'Solo se permiten archivos PDF.'),
  
  tipoVehiculo: z.string().optional(),
  placaVehiculo: z.string().optional(),
  otrosDescripcion: z.string().optional(),

  adjuntarArchivoAdicional: z.any().optional().refine(files => {
    if (!files || files.length === 0) return true;
    const file = files[0];
    return file.size <= MAX_FILE_SIZE;
  }, `El archivo no debe exceder los ${MAX_FILE_SIZE / (1024*1024)}MB.`).refine(files => {
    if (!files || files.length === 0) return true;
    const file = files[0];
    return ALLOWED_FILE_TYPES_GENERAL.includes(file.type);
  }, 'Tipo de archivo no permitido. Use PDF, Excel o imágenes.'),
  
  confirmacionCorreo: z.boolean().default(false),
  // recaptchaToken: z.string().min(1, "Por favor, completa el reCAPTCHA."),
}).superRefine((data, ctx) => {
  if (data.infoCertificado.dirigidoAEntidad && !data.dirigidoAQuien?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['dirigidoAQuien'],
      message: 'Este campo es requerido si selecciona "Dirigido a una entidad en particular".',
    });
  }
  if (data.infoCertificado.adicionarActividades) {
    if (!data.actividadesPdf || data.actividadesPdf.length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['actividadesPdf'],
            message: 'Debe adjuntar un archivo PDF con las actividades si selecciona esta opción.',
        });
    } 
  }
  if (data.infoCertificado.dirigidoTransitoPicoPlaca) {
    if (!data.tipoVehiculo?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['tipoVehiculo'], message: 'Este campo es requerido.' });
    }
    if (!data.placaVehiculo?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['placaVehiculo'], message: 'Este campo es requerido.' });
    }
  }
  if (data.infoCertificado.otros && !data.otrosDescripcion?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['otrosDescripcion'],
      message: 'Este campo es requerido si selecciona "Otros".',
    });
  }
});

type FormValues = z.infer<typeof formSchema>;

const SolicitudCertificadoConvenioPage: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoIdentificacion: '',
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
    });
    form.reset();
  };
  
  const handleError = () => {
    toast.error('Error al enviar el formulario', {
      description: 'Por favor verifique los datos ingresados e intente nuevamente.',
      duration: 5000,
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
    });
  };
  
  const idTypes = [
    { value: "CC", label: "Cédula de Ciudadanía (CC)" },
    { value: "CE", label: "Cédula de Extranjería (CE)" },
    { value: "TI", label: "Tarjeta de Identidad (TI)" },
    { value: "PP", label: "Pasaporte (PP)" },
    { value: "RC", label: "Registro Civil (RC)" },
  ];

  return (
    <MainLayout>
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
                      sitekey={RECAPTCHA_SITE_KEY}
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
