
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { Paperclip } from 'lucide-react';
import FileUploadField from '../solicitud-certificado/FileUploadField';

interface ArchivoAnexoSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

const ArchivoAnexoSection = <TFieldValues extends FieldValues>({
  control,
}: ArchivoAnexoSectionProps<TFieldValues>) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4 text-primary-prosalud-dark flex items-center">
        <Paperclip className="mr-2 h-6 w-6" /> Anexo (Opcional)
      </h2>
      <FileUploadField
        control={control}
        name={"archivoAnexo" as any}
        label="Seleccione un archivo (PDF, Excel o imagen, máx. 4MB)"
        accept=".pdf,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp"
        description="Si necesita adjuntar algún documento de soporte, puede hacerlo aquí."
      />
    </section>
  );
};

export default ArchivoAnexoSection;
