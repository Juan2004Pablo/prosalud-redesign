
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { Paperclip } from 'lucide-react';
import FileUploadField from '../solicitud-certificado/FileUploadField';

interface AnexoDescansoSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

const AnexoDescansoSection = <TFieldValues extends FieldValues>({
  control,
}: AnexoDescansoSectionProps<TFieldValues>) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4 text-primary-prosalud-dark flex items-center">
        <Paperclip className="mr-2 h-6 w-6" /> Anexo (Requerido)
      </h2>
      <FileUploadField
        control={control}
        name={"anexoDescanso" as any}
        label="Seleccione un archivo (PDF, Excel o imagen, máx. 4MB)"
        accept=".pdf,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp"
        description="Debe adjuntar el documento con el V°B° del coordinador. Este archivo es obligatorio."
        isRequired={true}
      />
    </section>
  );
};

export default AnexoDescansoSection;
