
import React from 'react';
import { Control, FieldValues, FieldPath } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface ConfirmacionCorreoSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

const ConfirmacionCorreoSection = <TFieldValues extends FieldValues>({ 
  control 
}: ConfirmacionCorreoSectionProps<TFieldValues>) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <FormField
        control={control}
        name={"confirmacionCorreo" as FieldPath<TFieldValues>}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Switch
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
                aria-label="Confirmar recepción de correo"
                className="data-[state=checked]:bg-secondary-prosaludgreen"
              />
            </FormControl>
            <FormLabel className="font-normal text-sm">
              Deseo recibir confirmación de envío de mi solicitud al correo electrónico.
            </FormLabel>
          </FormItem>
        )}
      />
    </section>
  );
};

export default ConfirmacionCorreoSection;
