import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { DevTool } from '@hookform/devtools';

import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES_PDF } from '@/features/solicitud-certificado/utils'; // Ruta corregida
import { idTypes } from '@/features/solicitud-certificado/config/constants'; // Ruta corregida
import { procesoOptions, ubicacionOptions } from '@/components/actualizar-cuenta/options';

import ActualizarCuentaHeader from '@/components/actualizar-cuenta/ActualizarCuentaHeader';
import DatosPersonalesSection from '@/features/solicitud-certificado/components/DatosPersonalesSection'; // Ruta corregida
import ConfirmacionCorreoSection from '@/features/solicitud-certificado/components/ConfirmacionCorreoSection'; // Ruta corregida
import AutorizacionDatosSection from '@/features/solicitud-certificado/components/AutorizacionDatosSection'; // Ruta corregida
import InformacionProcesoCuentaSection from '@/components/actualizar-cuenta/InformacionProcesoCuentaSection';
import AnexoCertificacionBancariaSection from '@/components/actualizar-cuenta/AnexoCertificacionBancariaSection';
import InformacionImportanteCuentaAlert from '@/components/actualizar-cuenta/InformacionImportanteCuentaAlert';

// Ajustar tipos permitidos para certificación bancaria (PDF e imágenes)
const ALLOWED_FILE_TYPES_CERTIFICADO = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];


const formSchemaActualizarCuenta = z.object({
  tipoIdentificacion: z.string().min(1, "Este campo es requerido."),
  numeroIdentificacion: z.string().min(5, "Debe tener al menos 5 dígitos.").regex(/^\d+$/, "Solo se permiten números."),
  nombres: z.string().min(2, "Este campo es requerido."),
  apellidos: z.string().min(2, "Este campo es requerido."),
  correoElectronico: z.string().email("Correo electrónico inválido."),
  numeroCelular: z.string().min(7, "Número de celular inválido.").regex(/^\d+$/, "Solo se permiten números."),
  
  proceso: z.string().min(1, "Este campo es requerido."),
  dondeRealizaProceso: z.string().min(1, "Este campo es requerido."),
  
  certificacionBancaria: z.any()
    .refine(files => files && files.length > 0, "La certificación bancaria es requerida.")
    .refine(files => files && files?.[0]?.size <= MAX_FILE_SIZE, `El archivo no debe exceder los ${MAX_FILE_SIZE / (1024*1024)}MB.`)
    .refine(files => files && ALLOWED_FILE_TYPES_CERTIFICADO.includes(files?.[0]?.type), 'Tipo de archivo no permitido. Use PDF o imágenes (JPG, PNG, GIF, WEBP).'),
  
  confirmacionCorreo: z.boolean().default(false),
});

type FormValuesActualizarCuenta = z.infer<typeof formSchemaActualizarCuenta>;

const ActualizarCuentaBancariaPage: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<FormValuesActualizarCuenta>({
    resolver: zodResolver(formSchemaActualizarCuenta),
    defaultValues: {
      tipoIdentificacion: 'CC',
      numeroIdentificacion: '',
      nombres: '',
      apellidos: '',
      correoElectronico: '',
      numeroCelular: '',
      proceso: '',
      dondeRealizaProceso: '',
      certificacionBancaria: undefined,
      confirmacionCorreo: false,
    },
  });

  const onSubmit = (data: FormValuesActualizarCuenta) => {
    console.log('Form data Actualizar Cuenta:', data);
    toast.success('Solicitud de cambio de cuenta enviada', {
      description: 'Su solicitud ha sido recibida. Se procesará según los plazos establecidos.',
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
  
  const handleError = (errors: any) => {
    console.error("Errores en el formulario:", errors);
    toast.error('Error al enviar el formulario', {
      description: 'Por favor verifique los datos ingresados e intente nuevamente. Asegúrese de adjuntar la certificación bancaria.',
      duration: 5000,
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
    });
  };
  
  const idTypes = [
    { value: "CC", label: "Cédula de Ciudadanía (CC)" },
    { value: "CE", label: "Cédula de Extranjería (CE)" },
    { value: "TI", label: "Tarjeta de Identidad (TI)" },
    { value: "PP", label: "Pasaporte (PP)" },
    { value: "PT", label: "Permiso por protección temporal (PT)" },
  ];

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
                 <BreadcrumbLink asChild>
                    <Link to="/servicios/actualizar-cuenta" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                        <Landmark className="h-4 w-4" />
                        Servicios
                    </Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1 font-medium text-foreground">
                <FileText className="h-4 w-4" />
                Actualizar Cuenta Bancaria
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <ActualizarCuentaHeader />
        <InformacionImportanteCuentaAlert />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, handleError)} className="space-y-8">
            <DatosPersonalesSection control={form.control} idTypes={idTypes} />
            <InformacionProcesoCuentaSection control={form.control} />
            <AnexoCertificacionBancariaSection control={form.control} />
            <ConfirmacionCorreoSection control={form.control} />
            <AutorizacionDatosSection />
                        
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

export default ActualizarCuentaBancariaPage;
