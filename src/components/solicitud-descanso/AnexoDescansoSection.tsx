
import React from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { SolicitudDescansoLaboralFormValues } from '@/pages/SolicitudDescansoLaboralPage';
import { AlertCircle } from 'lucide-react';
import FileUploadField from '@/features/solicitud-certificado/components/FileUploadField';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AnexoDescansoSectionProps {
  control: Control<SolicitudDescansoLaboralFormValues>;
  setValue?: UseFormSetValue<SolicitudDescansoLaboralFormValues>;
}

const AnexoDescansoSection: React.FC<AnexoDescansoSectionProps> = ({ control, setValue }) => {
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
  const ALLOWED_FILE_TYPES_PDF = ['application/pdf'];

  return (
    <section className="space-y-4">
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Anexos</AlertTitle>
        <AlertDescription>
          Adjunte los documentos requeridos en formato PDF. El tamaño máximo permitido por archivo es de 4MB.
        </AlertDescription>
      </Alert>

      <FileUploadField
        control={control}
        name="anexoSoporte"
        label="Soporte Documental (Carta de solicitud, etc.)"
        accept=".pdf"
        description="Adjunte aquí el soporte documental en formato PDF (Máx. 4MB)."
        setValue={setValue}
      />
    </section>
  );
};

export default AnexoDescansoSection;
