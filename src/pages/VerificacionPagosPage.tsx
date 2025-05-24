
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import { Send, CheckCircle2, AlertCircle, Home, FileText } from 'lucide-react';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES_GENERAL } from '@/components/solicitud-certificado/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import DatosPersonalesVerificacionSection from '@/components/verificacion-pagos/DatosPersonalesVerificacionSection';
import InformacionProcesoSection from '@/components/verificacion-pagos/InformacionProcesoSection';
import DetalleNovedadSection from '@/components/verificacion-pagos/DetalleNovedadSection';
import ArchivoAnexoSection from '@/components/verificacion-pagos/ArchivoAnexoSection';
import VerificacionHeader from '@/components/verificacion-pagos/VerificacionHeader';
import InformacionImportanteVerificacionAlert from '@/components/verificacion-pagos/InformacionImportanteVerificacionAlert';
import ConfirmacionCorreoSection from '@/components/solicitud-certificado/ConfirmacionCorreoSection';
import AutorizacionDatosSection from '@/components/solicitud-certificado/AutorizacionDatosSection';

const formSchema = z.object({
  tipoIdentificacion: z.string().min(1, "Este campo es requerido."),
  numeroIdentificacion: z.string().min(5, "Debe tener al menos 5 dígitos.").regex(/^\d+$/, "Solo se permiten números."),
  nombres: z.string().min(2, "Este campo es requerido."),
  apellidos: z.string().min(2, "Este campo es requerido."),
  correoElectronico: z.string().email("Correo electrónico inválido."),
  numeroCelular: z.string().min(7, "Número de celular inválido.").regex(/^\d+$/, "Solo se permiten números."),
  
  proceso: z.string().min(1, "Este campo es requerido."),
  dondeRealizaProceso: z.string().min(1, "Este campo es requerido."),
  mesAnoNovedad: z.string().min(1, "Este campo es requerido."),
  solicitudRelacionadaCon: z.string().min(1, "Este campo es requerido."),
  detalleNovedad: z.string().min(10, "Debe proporcionar al menos 10 caracteres.").max(800, "Máximo 800 caracteres."),

  archivoAnexo: z.any().optional().refine(files => {
    if (!files || files.length === 0) return true;
    const file = files[0];
    return file.size <= MAX_FILE_SIZE;
  }, `El archivo no debe exceder los ${MAX_FILE_SIZE / (1024*1024)}MB.`).refine(files => {
    if (!files || files.length === 0) return true;
    const file = files[0];
    return ALLOWED_FILE_TYPES_GENERAL.includes(file.type);
  }, 'Tipo de archivo no permitido. Use PDF, Excel o imágenes.'),
  
  confirmacionEnvio: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const VerificacionPagosPage: React.FC = () => {
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
      proceso: '',
      dondeRealizaProceso: '',
      mesAnoNovedad: '',
      solicitudRelacionadaCon: '',
      detalleNovedad: '',
      archivoAnexo: undefined,
      confirmacionEnvio: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Formulario de verificación de pagos enviado:', data);
    toast.success('Solicitud de verificación enviada con éxito', {
      description: (
        <>
          Su consulta será remitida al área encargada y estaremos dando respuesta a la mayor brevedad.
          <br />
          <strong className="mt-2 block font-semibold">Tiempo estimado:</strong> Hasta 15 días hábiles para revisión de su caso.
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
                <FileText className="h-4 w-4 mr-1 inline-block" /> Verificación de Pagos
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <VerificacionHeader />
        <InformacionImportanteVerificacionAlert />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, handleError)} className="space-y-8">
            <DatosPersonalesVerificacionSection control={form.control} idTypes={idTypes} />
            <InformacionProcesoSection control={form.control} />
            <DetalleNovedadSection control={form.control} />
            <ArchivoAnexoSection control={form.control} />
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

export default VerificacionPagosPage;
