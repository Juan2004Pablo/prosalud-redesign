
import * as z from 'zod';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES_GENERAL, ALLOWED_FILE_TYPES_PDF } from '../utils';

export const formSchema = z.object({
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

export type FormValues = z.infer<typeof formSchema>;
