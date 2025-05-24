
import React from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { SolicitudAnualDiferidaFormValues } from '@/pages/SolicitudAnualDiferidaPage';
import { AlertCircle } from 'lucide-react';
import FileUploadField from '@/features/solicitud-certificado/components/FileUploadField';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AnexosAnualDiferidaSectionProps {
  control: Control<SolicitudAnualDiferidaFormValues>;
  setValue: UseFormSetValue<SolicitudAnualDiferidaFormValues>;
}

const AnexosAnualDiferidaSection: React.FC<AnexosAnualDiferidaSectionProps> = ({ control, setValue }) => {
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
  const ALLOWED_FILE_TYPES_PDF = ['application/pdf'];

  return (
    <section className="space-y-4">
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Anexos Requeridos</AlertTitle>
        <AlertDescription>
          Por favor, adjunte los siguientes documentos en formato PDF. El tamaño máximo permitido por archivo es de 4MB.
        </AlertDescription>
      </Alert>

      <FileUploadField
        control={control}
        name="cartaSolicitud"
        label="Carta de Solicitud"
        accept=".pdf"
        description="Adjunte la carta de solicitud firmada."
        isRequired
        setValue={setValue}
      />

      <FileUploadField
        control={control}
        name="copiaCedula"
        label="Copia de Cédula"
        accept=".pdf"
        description="Adjunte una copia legible de su cédula de identidad."
        isRequired
        setValue={setValue}
      />

      <FileUploadField
        control={control}
        name="certificadoLaboral"
        label="Certificado Laboral"
        accept=".pdf"
        description="Adjunte su certificado laboral actualizado."
        isRequired
        setValue={setValue}
      />
    </section>
  );
};

export default AnexosAnualDiferidaSection;
