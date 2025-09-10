import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import { Send, CheckCircle2, AlertCircle, Home, Hospital } from 'lucide-react';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES_ALL } from '@/components/solicitud-certificado/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import DatosPersonalesSection from '@/components/solicitud-certificado/DatosPersonalesSection';
import ConfirmacionCorreoSection from '@/components/solicitud-certificado/ConfirmacionCorreoSection';
import AutorizacionDatosSection from '@/components/solicitud-certificado/AutorizacionDatosSection';

import IncapacidadesHeader from '@/components/incapacidades/IncapacidadesHeader';
import InformacionImportanteIncapacidadesAlert from '@/components/incapacidades/InformacionImportanteIncapacidadesAlert';
import TipoIncapacidadSection from '@/components/incapacidades/TipoIncapacidadSection';
import AnexoIncapacidadSection from '@/components/incapacidades/AnexoIncapacidadSection';

const formSchemaIncapacidades = z.object({
  tipoIdentificacion: z.string().min(1, "Este campo es requerido."),
  numeroIdentificacion: z.string().min(5, "Debe tener al menos 5 dígitos.").regex(/^\d+$/, "Solo se permiten números."),
  nombres: z.string().min(2, "Este campo es requerido."),
  apellidos: z.string().min(2, "Este campo es requerido."),
  correoElectronico: z.string().email("Correo electrónico inválido."),
  numeroCelular: z.string().min(7, "Número de celular inválido.").regex(/^\d+$/, "Solo se permiten números."),
  
  tipoDocumento: z.string().min(1, "Este campo es requerido."),
  entidadExpedidora: z.string().min(2, "Este campo es requerido."),
  fechaExpedicion: z.string().min(1, "La fecha de expedición es requerida."),
  numeroDias: z.string().optional(),
  observaciones: z.string().optional(),
  
  certificadoIncapacidad: z.any()
    .refine(files => files && files.length > 0, "El certificado de incapacidad es requerido.")
    .refine(files => files && files?.[0]?.size <= MAX_FILE_SIZE, `El archivo no debe exceder los ${MAX_FILE_SIZE / (1024*1024)}MB.`)
    .refine(files => files && ALLOWED_FILE_TYPES_ALL.includes(files?.[0]?.type), 'Se permiten archivos PDF, Word o imágenes (JPG, PNG, GIF, WEBP).'),
});

type FormValuesIncapacidades = z.infer<typeof formSchemaIncapacidades>;

const IncapacidadesLicenciasPage: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<FormValuesIncapacidades>({
    resolver: zodResolver(formSchemaIncapacidades),
    defaultValues: {
      tipoIdentificacion: 'CC',
      numeroIdentificacion: '',
      nombres: '',
      apellidos: '',
      correoElectronico: '',
      numeroCelular: '',
      tipoDocumento: '',
      entidadExpedidora: '',
      fechaExpedicion: '',
      numeroDias: '',
      observaciones: '',
      certificadoIncapacidad: undefined,
    },
  });

  const onSubmit = (data: FormValuesIncapacidades) => {
    console.log('Form data Incapacidades:', data);
    toast.success('Solicitud de incapacidad/licencia enviada', {
      description: 'Su solicitud ha sido recibida. Se procesará según los plazos establecidos y recibirá una respuesta en máximo 3 días hábiles.',
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
      description: 'Por favor verifique los datos ingresados e intente nuevamente. Asegúrese de adjuntar el certificado de incapacidad.',
      duration: 5000,
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
    });
  };
  
  const idTypes = [
    { value: "CC", label: "Cédula de Ciudadanía (CC)" },
    { value: "CE", label: "Cédula de Extranjería (CE)" },
    { value: "PP", label: "Pasaporte (PP)" },
    { value: "PT", label: "Permiso por protección temporal (PT)" },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto pt-6 pb-2 px-4 md:px-6 lg:px-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/"><Home className="h-4 w-4 mr-1 inline-block" /> Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Hospital className="h-4 w-4 mr-1 inline-block" /> Incapacidades y Licencias
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <IncapacidadesHeader />
        <InformacionImportanteIncapacidadesAlert />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, handleError)} className="space-y-8">
            <DatosPersonalesSection control={form.control} idTypes={idTypes} />
            <TipoIncapacidadSection control={form.control} />
            <AnexoIncapacidadSection control={form.control} />
            <ConfirmacionCorreoSection />
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

export default IncapacidadesLicenciasPage;