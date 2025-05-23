
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface ConfirmacionEnvioSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

const ConfirmacionEnvioSection = <TFieldValues extends FieldValues>({
  control,
}: ConfirmacionEnvioSectionProps<TFieldValues>) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <FormField
        control={control}
        name={"confirmacionEnvio" as any}
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Requiero confirmación de envío de mi solicitud
              </label>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

export default ConfirmacionEnvioSection;
