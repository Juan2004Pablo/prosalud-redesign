
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { UploadCloud } from 'lucide-react';
import FileUploadField from './FileUploadField'; // Updated import path

interface ArchivoAdicionalSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

const ArchivoAdicionalSection = <TFieldValues extends FieldValues>({
  control,
}: ArchivoAdicionalSectionProps<TFieldValues>) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4 text-primary-prosalud-dark flex items-center">
        <UploadCloud className="mr-2 h-6 w-6" /> Adjuntar Archivo Adicional (Opcional)
      </h2>
      <FileUploadField
        control={control}
        name={"adjuntarArchivoAdicional" as any}
        label="Seleccione un archivo (PDF, Excel o imagen, máx. 4MB)"
        accept=".pdf,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp" // .doc, .docx removed as per schema, ALLOWED_FILE_TYPES_GENERAL
        description="Si necesita adjuntar algún documento adicional, puede hacerlo aquí."
      />
    </section>
  );
};

export default ArchivoAdicionalSection;
