
import React from 'react';
import { Control, ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FileCheck, FileX } from 'lucide-react';
import { formatFileSize } from './utils';

interface FileUploadFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: any; // keyof TFieldValues not working well with nested file paths
  label: string;
  accept: string;
  description?: string;
  isRequired?: boolean;
  className?: string;
  inputClassName?: string;
}

const FileUploadField = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  accept,
  description,
  isRequired = false,
  className,
  inputClassName,
}: FileUploadFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<TFieldValues, any> }) => (
        <FormItem className={className}>
          <FormLabel>{label}{isRequired && " *"}</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept={accept}
              // Modificamos la key para que solo cambie si hay o no un archivo,
              // no por el nombre específico del archivo.
              // Esto permite que el input nativo conserve la visualización del nombre del archivo.
              key={field.value?.[0] ? `file-present-${field.name}` : `no-file-${field.name}`}
              onChange={(e) => field.onChange(e.target.files && e.target.files.length > 0 ? e.target.files : undefined)}
              onBlur={field.onBlur}
              name={field.name} // El 'name' del input HTML es importante para react-hook-form y la accesibilidad
              ref={field.ref} // Aseguramos que la ref de react-hook-form se pase al input
              className={`cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-prosalud file:text-white hover:file:bg-primary-prosalud-dark ${inputClassName || ''}`}
            />
          </FormControl>
          {field.value?.[0] && (
            <div className="mt-2 p-3 border rounded-md bg-slate-50 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileCheck className="h-5 w-5 text-green-600 shrink-0" />
                <div className="truncate">
                  <p className="font-medium text-slate-700 truncate" title={field.value[0].name}>{field.value[0].name}</p>
                  <p className="text-xs text-slate-500">{formatFileSize(field.value[0].size)}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2 shrink-0"
                onClick={() => field.onChange(undefined)} // Esto limpia el valor en react-hook-form
              >
                <FileX className="h-4 w-4" />
              </Button>
            </div>
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileUploadField;
