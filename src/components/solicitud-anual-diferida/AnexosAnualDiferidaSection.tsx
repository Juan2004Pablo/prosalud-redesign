
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { Paperclip } from 'lucide-react';
import FileUploadField from '../solicitud-certificado/FileUploadField'; // Reusing the existing component

interface AnexosAnualDiferidaSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

const AnexosAnualDiferidaSection = <TFieldValues extends FieldValues>({
  control,
}: AnexosAnualDiferidaSectionProps<TFieldValues>) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-primary-prosalud-dark flex items-center">
          <Paperclip className="mr-2 h-6 w-6" /> Anexo: Formato Diligenciado (Requerido)
        </h2>
        <FileUploadField
          control={control}
          name={"anexoFormatoDiligenciado" as any}
          label="Seleccione el formato diligenciado (PDF, Excel o imagen, máx. 4MB)"
          accept=".pdf,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp"
          description="Debe adjuntar el formato de solicitud debidamente diligenciado. Este archivo es obligatorio."
          isRequired={true}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-primary-prosalud-dark flex items-center">
          <Paperclip className="mr-2 h-6 w-6" /> Anexo: Evidencia de la Solicitud (Requerido)
        </h2>
        <FileUploadField
          control={control}
          name={"anexoEvidenciaSolicitud" as any}
          label="Seleccione la evidencia de la solicitud (PDF, Excel o imagen, máx. 4MB)"
          accept=".pdf,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp"
          description="Adjunte la evidencia que soporta su solicitud (varía según el motivo, ver requisitos). Este archivo es obligatorio."
          isRequired={true}
        />
      </div>
    </section>
  );
};

export default AnexosAnualDiferidaSection;
