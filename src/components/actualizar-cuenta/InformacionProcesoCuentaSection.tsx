
import React from 'react';
import { Control, FieldValues, FieldPath } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, MapPin } from 'lucide-react';

interface InformacionProcesoCuentaSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

const InformacionProcesoCuentaSection = <TFieldValues extends FieldValues>({
  control,
}: InformacionProcesoCuentaSectionProps<TFieldValues>) => {
  const procesos = [
    "Auditor", "Auxiliar de enfermeria", "Auxiliar de farmacia", "Bacteriologo", "Conductor",
    "Instrumentador", "Jefe de Enfermería", "Médico y/o Especialista", "Odontologo", "Regente",
    "Secretario", "Técnico RX", "Terapeuta", "Otro administrativo", "Otro asistencial"
  ];

  const ubicaciones = [
    "Abejorral", "Bello", "Caldas", "C. Bolivar", "Carisma", "Cisneros", "La Maria", "Rionegro", "Sabaneta"
  ];

  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-6 text-primary-prosalud-dark flex items-center">
        <Briefcase className="mr-2 h-6 w-6" /> Información del Proceso
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
              <FormLabel>¿Dónde realiza el proceso? *</FormLabel>
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
      </div>
    </section>
  );
};

export default InformacionProcesoCuentaSection;
