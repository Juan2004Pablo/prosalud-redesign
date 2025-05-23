
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

import DatosPersonalesDescansoSection from '@/components/solicitud-descanso/DatosPersonalesDescansoSection';
import InformacionDescansoSection from '@/components/solicitud-descanso/InformacionDescansoSection';
import AnexoDescansoSection from '@/components/solicitud-descanso/AnexoDescansoSection';
import DescansoHeader from '@/components/solicitud-descanso/DescansoHeader';
import InformacionImportanteDescansoAlert from '@/components/solicitud-descanso/InformacionImportanteDescansoAlert';
import RequisitosDescansoSection from '@/components/solicitud-descanso/RequisitosDescansoSection';
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
  coordinadorVoBo: z.string().min(2, "Este campo es requerido."),
  fechaInicioDescanso: z.string().min(1, "Este campo es requerido."),
  fechaFinalizacionDescanso: z.string().min(1, "Este campo es requerido."),

  anexoDescanso: z.any().refine(files => {
    return files && files.length > 0;
  }, "Debe adjuntar el archivo con el V°B°.").refine(files => {
    if (!files || files.length === 0) return true;
    const file = files[0];
    return file.size <= MAX_FILE_SIZE;
  }, `El archivo no debe exceder los ${MAX_FILE_SIZE / (1024*1024)}MB.`).refine(files => {
    if (!files || files.length === 0) return true;
    const file = files[0];
    return ALLOWED_FILE_TYPES_GENERAL.includes(file.type);
  }, 'Tipo de archivo no permitido. Use PDF, Excel o imágenes.'),
  
  confirmacionCorreo: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const SolicitudDescansoLaboralPage: React.FC = () => {
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
      coordinadorVoBo: '',
      fechaInicioDescanso: '',
      fechaFinalizacionDescanso: '',
      anexoDescanso: undefined,
      confirmacionCorreo: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Formulario de solicitud de descanso laboral enviado:', data);
    toast.success('Solicitud de descanso enviada con éxito', {
      description: (
        <>
          Su solicitud será revisada y en caso de ser aprobada será incluida junto con la compensación correspondiente.
          <br />
          <strong className="mt-2 block font-semibold">Tenga presente:</strong> Solamente en caso de presentarse alguna inconsistencia nos comunicaremos con usted.
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
              <BreadcrumbPage className="flex items-center gap-1 font-medium text-foreground">
                <FileText className="h-4 w-4" />
                Solicitud de Descanso Laboral
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <DescansoHeader />
        <RequisitosDescansoSection />
        <InformacionImportanteDescansoAlert />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, handleError)} className="space-y-8">
            <DatosPersonalesDescansoSection control={form.control} idTypes={idTypes} />
            <InformacionDescansoSection control={form.control} />
            <AnexoDescansoSection control={form.control} />
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

export default SolicitudDescansoLaboralPage;
