import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { Paperclip } from 'lucide-react';
import FileUploadField from '../solicitud-certificado/FileUploadField';

interface AnexoIncapacidadSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

const AnexoIncapacidadSection = <TFieldValues extends FieldValues>({
  control,
}: AnexoIncapacidadSectionProps<TFieldValues>) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4 text-primary-prosalud-dark flex items-center">
        <Paperclip className="mr-2 h-6 w-6" /> Documentos de Soporte (Requerido)
      </h2>
      <FileUploadField
        control={control}
        name={"certificadoIncapacidad" as any}
        label="Certificado de incapacidad/licencia (PDF, Word o imagen, máx. 4MB)"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp"
        description="Adjunte el certificado original expedido por su EPS o ARL. Se permiten archivos PDF, Word o imágenes (JPG, PNG, GIF, WEBP). Este documento es obligatorio y debe ser legible y completo."
        isRequired={true}
      />
    </section>
  );
};

export default AnexoIncapacidadSection;