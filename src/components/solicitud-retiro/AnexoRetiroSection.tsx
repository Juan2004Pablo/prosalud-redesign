
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { Paperclip } from 'lucide-react';
import FileUploadField from '../solicitud-certificado/FileUploadField';

interface AnexoRetiroSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

const AnexoRetiroSection = <TFieldValues extends FieldValues>({
  control,
}: AnexoRetiroSectionProps<TFieldValues>) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4 text-primary-prosalud-dark flex items-center">
        <Paperclip className="mr-2 h-6 w-6" /> Formato de Retiro Diligenciado (Requerido)
      </h2>
      <FileUploadField
        control={control}
        name={"formatoRetiroAnexo" as any}
        label="Seleccione el formato diligenciado (PDF o Word, máx. 4MB)"
        accept=".pdf,.doc,.docx"
        description="Debe adjuntar el formato de retiro y liquidación debidamente diligenciado y firmado. Este archivo es obligatorio."
        isRequired={true}
      />
    </section>
  );
};

export default AnexoRetiroSection;
