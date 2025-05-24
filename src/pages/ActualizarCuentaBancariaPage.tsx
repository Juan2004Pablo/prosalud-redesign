
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DevTool } from '@hookform/devtools'; // Keep this if you want to use devtools
import { Link, useNavigate } from 'react-router-dom'; // Added Link, useNavigate
import { toast } from 'sonner'; // Using sonner toast
import { CheckCircle2, AlertCircle, Home, Landmark, FileText, Send } from 'lucide-react'; // Added Icons

import MainLayout from '@/components/layout/MainLayout'; // Added MainLayout
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'; // Added Breadcrumb components
import { Form } from '@/components/ui/form'; // Added Form

import { MAX_FILE_SIZE } from '@/features/solicitud-certificado/utils';
// Removed import for options, as they are defined in InformacionProcesoCuentaSection

import ActualizarCuentaHeader from '@/components/actualizar-cuenta/ActualizarCuentaHeader';
import DatosPersonalesSection from '@/features/solicitud-certificado/components/DatosPersonalesSection';
import ConfirmacionCorreoSection from '@/features/solicitud-certificado/components/ConfirmacionCorreoSection';
import AutorizacionDatosSection from '@/features/solicitud-certificado/components/AutorizacionDatosSection';
import InformacionProcesoCuentaSection from '@/components/actualizar-cuenta/InformacionProcesoCuentaSection';
import AnexoCertificacionBancariaSection from '@/components/actualizar-cuenta/AnexoCertificacionBancariaSection';
import InformacionImportanteCuentaAlert from '@/components/actualizar-cuenta/InformacionImportanteCuentaAlert';

const ALLOWED_FILE_TYPES_CERTIFICADO = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const formSchemaActualizarCuenta = z.object({
  tipoIdentificacion: z.string().min(1, "Este campo es requerido."),
  numeroIdentificacion: z.string().min(5, "Debe tener al menos 5 dígitos.").regex(/^\d+$/, "Solo se permiten números."),
  nombres: z.string().min(2, "Este campo es requerido."),
  apellidos: z.string().min(2, "Este campo es requerido."),
  correoElectronico: z.string().email("Correo electrónico inválido."),
  numeroCelular: z.string().min(7, "Número de celular inválido.").regex(/^\d+$/, "Solo se permiten números."),
  fechaNacimiento: z.date({ required_error: "Fecha de nacimiento es requerida" }).optional(), // Added, assuming it comes from DatosPersonalesSection
  
  proceso: z.string().min(1, "Este campo es requerido."),
  dondeRealizaProceso: z.string().min(1, "Este campo es requerido."),
  
  certificacionBancaria: z.any()
    .refine(files => files && files.length > 0 && files[0] !== null && files[0] !== undefined, "La certificación bancaria es requerida.")
    .refine(files => files && files?.[0]?.size <= MAX_FILE_SIZE, `El archivo no debe exceder los ${MAX_FILE_SIZE / (1024*1024)}MB.`)
    .refine(files => files && ALLOWED_FILE_TYPES_CERTIFICADO.includes(files?.[0]?.type), 'Tipo de archivo no permitido. Use PDF o imágenes (JPG, PNG, GIF, WEBP).'),
  
  confirmacionCorreo: z.boolean().default(false),
   aceptoAutorizacion: z.boolean().refine((value) => value === true, { // Added from AutorizacionDatosSection
    message: 'Debes aceptar la autorización de tratamiento de datos.',
  }),
});

export type FormValuesActualizarCuenta = z.infer<typeof formSchemaActualizarCuenta>;

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
      fechaNacimiento: undefined, // Default for optional date
      proceso: '',
      dondeRealizaProceso: '',
      certificacionBancaria: undefined,
      confirmacionCorreo: false,
      aceptoAutorizacion: false,
    },
    mode: "onChange",
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
                    <Link to="/servicios" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"> {/* Assuming /servicios is the parent route for services */}
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

        <FormProvider {...form}> {/* Use FormProvider here */}
          <Form {...form}> {/* Shadcn Form component */}
            <form onSubmit={form.handleSubmit(onSubmit, handleError)} className="space-y-8">
              <DatosPersonalesSection control={form.control} idTypes={idTypes} />
              <Separator className="my-6" />
              <ConfirmacionCorreoSection control={form.control} />
              <Separator className="my-6" />
              <InformacionProcesoCuentaSection control={form.control} />
              <Separator className="my-6" />
              <AnexoCertificacionBancariaSection control={form.control} setValue={form.setValue} />
              <Separator className="my-6" />
              <AutorizacionDatosSection control={form.control} /> {/* Pass control here */}
              <Separator className="my-6" />
                          
              <div className="flex justify-center mt-10">
                <Button type="submit" size="lg" className="w-full md:w-auto bg-primary-prosalud hover:bg-primary-prosalud/90 text-white flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Enviar Solicitud
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </div>
      {process.env.NODE_ENV === 'development' && <DevTool control={form.control} />} {/* Conditionally render DevTool */}
    </MainLayout>
  );
};

export default ActualizarCuentaBancariaPage;
