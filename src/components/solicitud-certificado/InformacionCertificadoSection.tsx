
import React from 'react';
import { Control, UseFormWatch, FieldValues } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FileUploadField from './FileUploadField'; // Assuming FormValues type is defined elsewhere or passed

interface InformacionCertificadoSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  watch: UseFormWatch<TFieldValues>;
}

const InformacionCertificadoSection = <TFieldValues extends FieldValues>({
  control,
  watch,
}: InformacionCertificadoSectionProps<TFieldValues>) => {
  const watchInfoCertificado = watch("infoCertificado" as any); // Use 'as any' if type inference is tricky

  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-2 text-primary-prosalud-dark">Información Requerida en el Certificado</h2>
      <p className="text-sm text-muted-foreground mb-6">Lea cuidadosamente y seleccione únicamente la información que necesita incluir en su certificado.</p>
      
      <div className="space-y-4">
        <FormField control={control} name={"infoCertificado.fechaIngresoRetiro" as any} render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <FormLabel className="font-normal">Fecha de ingreso y retiro</FormLabel>
            </FormItem>
        )}/>
        <FormField control={control} name={"infoCertificado.valorCompensaciones" as any} render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <FormLabel className="font-normal">Valor de compensaciones</FormLabel>
            </FormItem>
        )}/>
        <FormField control={control} name={"infoCertificado.dirigidoAEntidad" as any} render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <FormLabel className="font-normal">Dirigido a una entidad en particular</FormLabel>
            </FormItem>
        )}/>
        {watchInfoCertificado?.dirigidoAEntidad && (
            <FormField control={control} name={"dirigidoAQuien" as any} render={({ field }) => (
                <FormItem className="ml-7">
                    <FormLabel>Indique a quién va dirigido *</FormLabel>
                    <FormControl><Input placeholder="Nombre de la entidad" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
        )}
        <FormField control={control} name={"infoCertificado.paraSubsidioDesempleo" as any} render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <FormLabel className="font-normal">Para subsidio de desempleo</FormLabel>
            </FormItem>
        )}/>
        <FormField control={control} name={"infoCertificado.paraSubsidioVivienda" as any} render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <FormLabel className="font-normal">Para subsidio de vivienda</FormLabel>
            </FormItem>
        )}/>
        <FormField control={control} name={"infoCertificado.dirigidoFondoPensiones" as any} render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <FormLabel className="font-normal">Dirigido al Fondo de Pensiones para corrección de historia</FormLabel>
            </FormItem>
        )}/>
         <FormField control={control} name={"infoCertificado.adicionarActividades" as any} render={({ field }) => (
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
        {watchInfoCertificado?.adicionarActividades && (
          <FileUploadField
            control={control}
            name={"actividadesPdf" as any}
            label="Adjuntar PDF con actividades"
            accept=".pdf"
            isRequired={true}
            className="ml-7"
          />
        )}
        <FormField control={control} name={"infoCertificado.dirigidoTransitoPicoPlaca" as any} render={({ field }) => (
             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                 <div className="leading-none">
                    <FormLabel className="font-normal">Dirigido a Secretaría de Tránsito y Movilidad para trámites de Exención de Pico y Placa</FormLabel>
                    <FormDescription className="text-xs">Debe indicar tipo de vehículo y placa.</FormDescription>
                </div>
            </FormItem>
        )}/>
        {watchInfoCertificado?.dirigidoTransitoPicoPlaca && (
            <div className="ml-7 space-y-4">
                <FormField control={control} name={"tipoVehiculo" as any} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tipo de vehículo *</FormLabel>
                        <FormControl><Input placeholder="Ej: Automóvil, Motocicleta" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={control} name={"placaVehiculo" as any} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Placa del vehículo *</FormLabel>
                        <FormControl><Input placeholder="Ej: ABC123" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
        )}
        <FormField control={control} name={"infoCertificado.dirigidoBancolombia" as any} render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <FormLabel className="font-normal">Dirigido a Bancolombia para apertura de cuenta bajo convenio con ProSalud</FormLabel>
            </FormItem>
        )}/>
        <FormField control={control} name={"infoCertificado.otros" as any} render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <FormLabel className="font-normal">Otros</FormLabel>
            </FormItem>
        )}/>
        {watchInfoCertificado?.otros && (
            <FormField control={control} name={"otrosDescripcion" as any} render={({ field }) => (
                <FormItem className="ml-7">
                    <FormLabel>Describa su necesidad *</FormLabel>
                    <FormControl><Textarea placeholder="Especifique aquí su solicitud..." {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
        )}
      </div>
    </section>
  );
};

export default InformacionCertificadoSection;
