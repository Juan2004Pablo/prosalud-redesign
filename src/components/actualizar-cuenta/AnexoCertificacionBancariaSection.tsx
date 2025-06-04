
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { Paperclip } from 'lucide-react';
import FileUploadField from '../solicitud-certificado/FileUploadField'; // Reutilizamos el componente existente

interface AnexoCertificacionBancariaSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

const AnexoCertificacionBancariaSection = <TFieldValues extends FieldValues>({
  control,
}: AnexoCertificacionBancariaSectionProps<TFieldValues>) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-primary-prosalud-dark flex items-center">
          <Paperclip className="mr-2 h-6 w-6" /> Anexo: Certificación Bancaria (Requerido)
        </h2>
        <FileUploadField
          control={control}
          name={"certificacionBancaria" as any}
          label="Seleccione la certificación bancaria (PDF o Word, máx. 4MB)"
          accept=".pdf,.doc,.docx"
          description="Debe adjuntar la certificación bancaria de la nueva cuenta. Esta debe estar a nombre del titular (afiliado) y ser legible. Solo se permiten archivos PDF o Word."
          isRequired={true}
        />
      </div>
    </section>
  );
};

export default AnexoCertificacionBancariaSection;
