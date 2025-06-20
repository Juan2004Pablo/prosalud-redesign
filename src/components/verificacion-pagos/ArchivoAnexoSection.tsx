
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
        label="Seleccione un archivo (PDF o Word, máx. 4MB)"
        accept=".pdf,.doc,.docx"
        description="Si necesita adjuntar algún documento de soporte, puede hacerlo aquí. Solo se permiten archivos PDF o Word."
      />
    </section>
  );
};

export default ArchivoAnexoSection;
