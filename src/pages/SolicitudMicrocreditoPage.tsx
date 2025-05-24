import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

import MainLayout from '@/components/layout/MainLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Form } from '@/components/ui/form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert"; // AlertTitle might not be used directly in the "IMPORTANTE" section, but Alert is.
import { Home, CreditCard, Info, Mail, Clock, Send } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

import DatosPersonalesSection from '@/components/solicitud-certificado/DatosPersonalesSection'; // Reutilizamos para datos personales
import ConfirmacionCorreoSection from '@/components/solicitud-certificado/ConfirmacionCorreoSection'; // Reutilizamos para confirmación

const idTypes = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'NIT', label: 'NIT' },
  { value: 'PASAPORTE', label: 'Pasaporte' },
  { value: 'TI', label: 'Tarjeta de Identidad' },
];

const sedesOptions = [
  { value: 'BELLO', label: 'Bello' },
  { value: 'CALDAS', label: 'Caldas' },
  { value: 'LA_MARIA', label: 'La Maria' },
  { value: 'RIONEGRO', label: 'Rionegro' },
  { value: 'GENERAL', label: 'General' },
];

const microcreditoFormSchema = z.object({
  tipoIdentificacion: z.string({ required_error: "Tipo de identificación es requerido." }).min(1, "Tipo de identificación es requerido."),
  numeroIdentificacion: z.string({ required_error: "Número de identificación es requerido." }).min(5, "Número de identificación inválido."),
  nombres: z.string({ required_error: "Nombres son requeridos." }).min(2, "Nombres deben tener al menos 2 caracteres."),
  apellidos: z.string({ required_error: "Apellidos son requeridos." }).min(2, "Apellidos deben tener al menos 2 caracteres."),
  correoElectronico: z.string({ required_error: "Correo electrónico es requerido." }).email("Correo electrónico inválido."),
  numeroCelular: z.string({ required_error: "Número de celular es requerido." }).regex(/^\d{10}$/, "Número de celular debe tener 10 dígitos."),
  sedeProceso: z.string({ required_error: "Sede es requerida." }).min(1, "Sede es requerida."),
  montoSolicitado: z.preprocess(
    (val) => (val === "" ? undefined : Number(String(val).replace(/\./g, ''))),
    z.number({ required_error: "Monto es requerido.", invalid_type_error: "Monto debe ser un número." })
     .min(1, "Monto debe ser mayor a 0.")
  ),
  numeroCuotas: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ required_error: "Número de cuotas es requerido.", invalid_type_error: "Número de cuotas debe ser un número." })
     .min(1, "Mínimo 1 cuota.")
     .max(12, "Máximo 12 cuotas.")
  ),
  confirmacionCorreo: z.boolean().optional(),
});

type MicrocreditoFormValues = z.infer<typeof microcreditoFormSchema>;

const SolicitudMicrocreditoPage: React.FC = () => {
  const form = useForm<MicrocreditoFormValues>({
    resolver: zodResolver(microcreditoFormSchema),
    defaultValues: {
      tipoIdentificacion: '',
      numeroIdentificacion: '',
      nombres: '',
      apellidos: '',
      correoElectronico: '',
      numeroCelular: '',
      sedeProceso: '',
      montoSolicitado: undefined,
      numeroCuotas: undefined,
      confirmacionCorreo: false,
    },
  });

  const onSubmit = (data: MicrocreditoFormValues) => {
    console.log('Formulario de microcrédito enviado:', data);
    toast({
      title: "Solicitud Enviada",
      description: "Su solicitud de microcrédito ha sido enviada para revisión.",
      variant: "default",
    });
    form.reset();
  };

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
               <BreadcrumbLink asChild>
                <Link to="/">Servicios</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <CreditCard className="h-4 w-4 mr-1 inline-block" /> Solicitud de Microcrédito
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
                <CreditCard className="h-10 w-10 text-primary-prosalud" />
                <h1 className="text-3xl font-bold text-primary-prosalud">
                Solicitud - Microcrédito CEII
                </h1>
            </div>
            <p className="mt-2 text-base text-muted-foreground max-w-3xl mx-auto">
              Por favor, complete todos los campos del siguiente formulario para tramitar su solicitud de microcrédito. Verifique que la información ingresada sea correcta.
            </p>
          </header>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DatosPersonalesSection control={form.control} idTypes={idTypes} />

              <section className="p-6 border rounded-lg shadow-sm bg-white">
                <h2 className="text-xl font-semibold mb-6 text-primary-prosalud-dark">Información del Microcrédito</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="sedeProceso"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sede donde realiza el proceso *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione una sede..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sedesOptions.map(sede => (
                              <SelectItem key={sede.value} value={sede.value}>{sede.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="montoSolicitado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monto en COP a solicitar * <span className="text-xs text-muted-foreground">(Sin puntos ni comas)</span></FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ej: 500000" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : e.target.value.replace(/\D/g, ''))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numeroCuotas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de cuotas * <span className="text-xs text-muted-foreground">(Min 1 y Max 12)</span></FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="12" placeholder="Ej: 6" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
              
              <ConfirmacionCorreoSection control={form.control} />

              <section className="mt-10 p-6 border rounded-lg shadow-sm bg-blue-50 border-blue-200">
                <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                  <Info className="mr-3 h-6 w-6 text-blue-700" /> IMPORTANTE
                </h2>
                <div className="space-y-3 text-blue-700">
                  <p>Por favor diligencie los datos solicitados. Los datos enviados son solo de manera informativa. No garantiza o autoriza ningún proceso.</p>
                  
                  <Alert className="border-blue-300 bg-blue-100">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      Para evitar que los correos que se le envíen lleguen a SPAM sugerimos agregar la cuenta de correo <strong className="font-mono bg-blue-200 px-1 rounded">ceiisas@hotmail.com</strong> al correo deseado y a la lista de contactos.
                    </AlertDescription>
                  </Alert>
                  
                  <p>Si la solicitud es aprobada recibirá un correo de continuidad del proceso por parte de Capital & Ideas S.A.S. desde el correo <strong className="font-mono bg-blue-200 px-1 rounded">ceiisas@hotmail.com</strong>.</p>
                  
                  <Alert className="border-amber-300 bg-amber-50">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      <strong>NOTA IMPORTANTE:</strong> El horario de revisión de solicitudes es de lunes a viernes de 8:00 a.m. a 4:00 p.m., cualquier registro vencido el citado horario, se entenderá presentado el siguiente día hábil. Se registran y asigna su revisión por orden de registro.
                    </AlertDescription>
                  </Alert>
                </div>
              </section>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
                <Button type="submit" size="lg" className="w-full sm:w-auto bg-primary-prosalud hover:bg-primary-prosalud/90">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Solicitud
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default SolicitudMicrocreditoPage;
