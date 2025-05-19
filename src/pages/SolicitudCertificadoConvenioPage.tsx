import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import { Info, FileText, UploadCloud, AlertTriangle, send as Send } from 'lucide-react';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_FILE_TYPES_GENERAL = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_FILE_TYPES_PDF = ['application/pdf'];

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
  actividadesPdf: z.any().optional(), // FileList or undefined
  tipoVehiculo: z.string().optional(),
  placaVehiculo: z.string().optional(),
  otrosDescripcion: z.string().optional(),

  adjuntarArchivoAdicional: z.any().optional(), // FileList or undefined
  confirmacionCorreo: z.boolean().default(false),
  aceptaTratamientoDatos: z.boolean().refine(val => val === true, {
    message: "Debe aceptar el tratamiento de datos personales para continuar."
  }),
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
    } else {
        const file = data.actividadesPdf[0];
        if (file.size > MAX_FILE_SIZE) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['actividadesPdf'],
                message: `El archivo no debe exceder los ${MAX_FILE_SIZE / (1024*1024)}MB.`,
            });
        }
        if (!ALLOWED_FILE_TYPES_PDF.includes(file.type)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['actividadesPdf'],
                message: 'Solo se permiten archivos PDF.',
            });
        }
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
  if (data.adjuntarArchivoAdicional && data.adjuntarArchivoAdicional.length > 0) {
    const file = data.adjuntarArchivoAdicional[0];
    if (file.size > MAX_FILE_SIZE) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['adjuntarArchivoAdicional'],
            message: `El archivo no debe exceder los ${MAX_FILE_SIZE / (1024*1024)}MB.`,
        });
    }
    if (!ALLOWED_FILE_TYPES_GENERAL.includes(file.type)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['adjuntarArchivoAdicional'],
            message: 'Tipo de archivo no permitido. Use PDF, Excel o imágenes.',
        });
    }
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
      aceptaTratamientoDatos: false,
    },
  });

  const watchInfoCertificado = form.watch('infoCertificado');

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    // Aquí iría la lógica para enviar los datos al backend
    // Por ahora, solo mostramos un toast de éxito
    toast.success('Solicitud enviada con éxito', {
      description: 'Recibirá el certificado en su correo en los próximos días hábiles.',
    });
    form.reset(); // Opcional: resetear el formulario después del envío
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
            <section className="p-6 border rounded-lg shadow-sm bg-white">
              <h2 className="text-xl font-semibold mb-6 text-primary-prosalud-dark">Datos Personales del Solicitante</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="tipoIdentificacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de identificación *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {idTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numeroIdentificacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de identificación *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: 1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nombres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombres *</FormLabel>
                      <FormControl>
                        <Input placeholder="Sus nombres completos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apellidos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos *</FormLabel>
                      <FormControl>
                        <Input placeholder="Sus apellidos completos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="correoElectronico"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ejemplo@correo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numeroCelular"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de celular *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Ej: 3001234567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section className="p-6 border rounded-lg shadow-sm bg-white">
              <h2 className="text-xl font-semibold mb-2 text-primary-prosalud-dark">Información Requerida en el Certificado</h2>
              <p className="text-sm text-muted-foreground mb-6">Lea cuidadosamente y seleccione únicamente la información que necesita incluir en su certificado.</p>
              
              <div className="space-y-4">
                <FormField control={form.control} name="infoCertificado.fechaIngresoRetiro" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="font-normal">Fecha de ingreso y retiro</FormLabel>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="infoCertificado.valorCompensaciones" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="font-normal">Valor de compensaciones</FormLabel>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="infoCertificado.dirigidoAEntidad" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="font-normal">Dirigido a una entidad en particular</FormLabel>
                    </FormItem>
                )}/>
                {watchInfoCertificado.dirigidoAEntidad && (
                    <FormField control={form.control} name="dirigidoAQuien" render={({ field }) => (
                        <FormItem className="ml-7">
                            <FormLabel>Indique a quién va dirigido *</FormLabel>
                            <FormControl><Input placeholder="Nombre de la entidad" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                )}
                <FormField control={form.control} name="infoCertificado.paraSubsidioDesempleo" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="font-normal">Para subsidio de desempleo</FormLabel>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="infoCertificado.paraSubsidioVivienda" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="font-normal">Para subsidio de vivienda</FormLabel>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="infoCertificado.dirigidoFondoPensiones" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="font-normal">Dirigido al Fondo de Pensiones para corrección de historia</FormLabel>
                    </FormItem>
                )}/>
                 <FormField control={form.control} name="infoCertificado.adicionarActividades" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                         <div className="leading-none">
                            <FormLabel className="font-normal">Adicionar actividades</FormLabel>
                            <FormDescription className="text-xs">
                                Requiere validación. Adjuntar archivo en formato PDF con las actividades realizadas. Esta solicitud está sujeta a aprobación por parte de la Entidad.
                            </FormDescription>
                        </div>
                    </FormItem>
                )}/>
                {watchInfoCertificado.adicionarActividades && (
                    <FormField control={form.control} name="actividadesPdf" render={({ field: { onChange, ...props } }) => (
                        <FormItem className="ml-7">
                            <FormLabel>Adjuntar PDF con actividades *</FormLabel>
                            <FormControl>
                                <Input 
                                  type="file" 
                                  accept=".pdf"
                                  onChange={(e) => onChange(e.target.files)} 
                                  {...props}
                                  className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-prosalud file:text-white hover:file:bg-primary-prosalud-dark"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                )}
                <FormField control={form.control} name="infoCertificado.dirigidoTransitoPicoPlaca" render={({ field }) => (
                     <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                         <div className="leading-none">
                            <FormLabel className="font-normal">Dirigido a Secretaría de Tránsito y Movilidad para trámites de Exención de Pico y Placa</FormLabel>
                            <FormDescription className="text-xs">Debe indicar tipo de vehículo y placa.</FormDescription>
                        </div>
                    </FormItem>
                )}/>
                {watchInfoCertificado.dirigidoTransitoPicoPlaca && (
                    <div className="ml-7 space-y-4">
                        <FormField control={form.control} name="tipoVehiculo" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de vehículo *</FormLabel>
                                <FormControl><Input placeholder="Ej: Automóvil, Motocicleta" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="placaVehiculo" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Placa del vehículo *</FormLabel>
                                <FormControl><Input placeholder="Ej: ABC123" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                )}
                <FormField control={form.control} name="infoCertificado.dirigidoBancolombia" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="font-normal">Dirigido a Bancolombia para apertura de cuenta bajo convenio con ProSalud</FormLabel>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="infoCertificado.otros" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="font-normal">Otros</FormLabel>
                    </FormItem>
                )}/>
                {watchInfoCertificado.otros && (
                    <FormField control={form.control} name="otrosDescripcion" render={({ field }) => (
                        <FormItem className="ml-7">
                            <FormLabel>Describa su necesidad *</FormLabel>
                            <FormControl><Textarea placeholder="Especifique aquí su solicitud..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                )}
              </div>
            </section>
            
            <section className="p-6 border rounded-lg shadow-sm bg-white">
              <h2 className="text-xl font-semibold mb-4 text-primary-prosalud-dark flex items-center">
                <UploadCloud className="mr-2 h-6 w-6" /> Adjuntar Archivo Adicional (Opcional)
              </h2>
              <FormField
                control={form.control}
                name="adjuntarArchivoAdicional"
                render={({ field: { onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel>Seleccione un archivo (PDF, Excel o imagen, máx. 4MB)</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept=".pdf,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp"
                        onChange={(e) => onChange(e.target.files)} 
                        {...props}
                        className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-prosalud file:text-white hover:file:bg-primary-prosalud-dark"
                      />
                    </FormControl>
                    <FormDescription>Si necesita adjuntar algún documento adicional, puede hacerlo aquí.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="p-6 border rounded-lg shadow-sm bg-white">
              <FormField
                control={form.control}
                name="confirmacionCorreo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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

            <FormField
              control={form.control}
              name="aceptaTratamientoDatos"
              render={({ field }) => (
                <FormItem className="items-top flex space-x-3 py-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="grid gap-1.5 leading-none">
                    <FormLabel className="font-normal text-sm">
                      Autorización de Tratamiento de Datos Personales *
                    </FormLabel>
                    <FormDescription className="text-xs text-muted-foreground">
                      Conforme al artículo 17, literal b de la Ley 1581 de 2012, al continuar autorizo de forma previa, expresa e informada el tratamiento de mis datos personales.
                    </FormDescription>
                    <FormMessage />
                  </div>
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
