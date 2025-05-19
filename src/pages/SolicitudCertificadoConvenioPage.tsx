
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ReCAPTCHA from 'react-google-recaptcha'; // Importar ReCAPTCHA
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'; // Agregado FormMessage
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import { Info, AlertTriangle, Send } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle'; // Importar Toggle

// Import new components
import DatosPersonalesSection from '@/components/solicitud-certificado/DatosPersonalesSection';
import InformacionCertificadoSection from '@/components/solicitud-certificado/InformacionCertificadoSection';
import ArchivoAdicionalSection from '@/components/solicitud-certificado/ArchivoAdicionalSection';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES_GENERAL, ALLOWED_FILE_TYPES_PDF } from '@/components/solicitud-certificado/utils';

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
  recaptchaToken: z.string().min(1, "Por favor, completa el reCAPTCHA."), // Nuevo campo para reCAPTCHA
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
      recaptchaToken: '', // Valor inicial para recaptchaToken
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data with reCAPTCHA:', data);
    // Aquí iría la lógica para enviar data.recaptchaToken al backend para verificación
    toast.success('Solicitud enviada con éxito', {
      description: 'Recibirá el certificado en su correo en los próximos días hábiles.',
    });
    form.reset();
    // Podríamos necesitar resetear el ReCAPTCHA manualmente si usamos una referencia
    // pero react-hook-form al hacer reset debería limpiar el valor del token también.
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
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-prosalud tracking-tight">
            Solicitud de Certificado de Convenio Sindical
          </h1>
        </header>

        <Alert variant="default" className="mb-8 bg-blue-50 border-blue-200 text-blue-800">
          <Info className="h-5 w-5 text-blue-600" />
          <AlertTitle className="font-semibold text-blue-700">Información Importante</AlertTitle>
          <AlertDescription>
            El certificado de convenio convencional se enviará al correo del afiliado en un plazo de cinco (5) días hábiles, salvo los casos que requieran validación adicional por parte de la Entidad. Estos estarán sujetos a dicha verificación para poder ser emitidos.
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DatosPersonalesSection control={form.control} idTypes={idTypes} />
            <InformacionCertificadoSection control={form.control} watch={form.watch} />
            <ArchivoAdicionalSection control={form.control} />

            <section className="p-6 border rounded-lg shadow-sm bg-white">
              <FormField
                control={form.control}
                name="confirmacionCorreo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Toggle 
                        pressed={field.value} 
                        onPressedChange={field.onChange}
                        aria-label="Confirmar recepción de correo"
                        className="data-[state=on]:bg-secondary-prosaludgreen"
                      >
                        <span className="sr-only">Toggle confirmación</span>
                      </Toggle>
                    </FormControl>
                    <FormLabel className="font-normal text-sm">
                      Deseo recibir confirmación de envío de mi solicitud al correo electrónico.
                    </FormLabel>
                  </FormItem>
                )}
              />
            </section>

            <Alert variant="default" className="mt-8 bg-slate-50 border-slate-200 text-slate-700">
                <AlertTriangle className="h-5 w-5 text-slate-500" />
                <AlertTitle className="font-semibold text-slate-600">Tenga Presente</AlertTitle>
                <AlertDescription>
                    Solamente en caso de presentarse alguna inconsistencia nos comunicaremos con usted.
                </AlertDescription>
            </Alert>

            <div className="py-4 px-6 border rounded-lg shadow-sm bg-white">
                <h3 className="text-md font-semibold text-gray-700 mb-1">
                    Autorización de Tratamiento de Datos Personales
                </h3>
                <p className="text-xs text-muted-foreground">
                    Al hacer clic en "Enviar Solicitud", usted autoriza de forma previa, expresa e informada el tratamiento de sus datos personales conforme al artículo 17, literal b de la Ley 1581 de 2012 y nuestra política de tratamiento de datos.
                </p>
            </div>

            {/* Campo ReCAPTCHA */}
            <FormField
              control={form.control}
              name="recaptchaToken"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center"> {/* Centrar el reCAPTCHA */}
                  <FormControl>
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={(token) => field.onChange(token)}
                      onExpired={() => field.onChange('')} // Limpiar token si expira
                      onErrored={() => {
                        field.onChange(''); // Limpiar token si hay error
                        toast.error("Error con reCAPTCHA. Inténtalo de nuevo.");
                      }}
                    />
                  </FormControl>
                  <FormMessage /> {/* Mostrar mensaje de error para reCAPTCHA */}
                </FormItem>
              )}
            />
            
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
