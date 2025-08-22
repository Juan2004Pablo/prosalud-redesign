
import React from 'react';
import { Control, FieldValues, FieldPath } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Briefcase } from 'lucide-react';

interface InformacionDescansoSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

const InformacionDescansoSection = <TFieldValues extends FieldValues>({
  control,
}: InformacionDescansoSectionProps<TFieldValues>) => {
  const procesos = [
    "Auditor",
    "Auxiliar de enfermeria",
    "Auxiliar de farmacia",
    "Bacteriologo",
    "Conductor",
    "Instrumentador",
    "Jefe de Enfermería",
    "Médico y/o Especialista",
    "Odontologo",
    "Regente",
    "Secretario",
    "Técnico RX",
    "Terapeuta",
    "Otro administrativo",
    "Otro asistencial"
  ];

  const ubicaciones = [
    "Bello",
    "Caldas",
    "La Maria",
    "Rionegro"
  ];

  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-6 text-primary-prosalud-dark flex items-center">
        <Briefcase className="mr-2 h-6 w-6" /> Información del Descanso
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name={"proceso" as FieldPath<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proceso *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione su proceso..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {procesos.map(proceso => (
                    <SelectItem key={proceso} value={proceso}>{proceso}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"dondeRealizaProceso" as FieldPath<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donde realiza el proceso *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione ubicación..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ubicaciones.map(ubicacion => (
                    <SelectItem key={ubicacion} value={ubicacion}>{ubicacion}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"coordinadorVoBo" as FieldPath<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coordinador que da el V°B° *</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del coordinador" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div></div>
        <FormField
          control={control}
          name={"fechaInicioDescanso" as FieldPath<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de inicio descanso *</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                  placeholder="Seleccionar fecha de inicio"
                  minDate={new Date()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"fechaFinalizacionDescanso" as FieldPath<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de finalización descanso *</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                  placeholder="Seleccionar fecha de finalización"
                  minDate={new Date()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
};

export default InformacionDescansoSection;
