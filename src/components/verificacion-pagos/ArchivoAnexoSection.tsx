import React from 'react';
import { Control } from 'react-hook-form';
import { VerificacionPagosFormValues } from '@/pages/VerificacionPagosPage';
import { AlertCircle } from 'lucide-react';
import FileUploadField from '@/features/solicitud-certificado/components/FileUploadField'; // Ruta corregida
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ArchivoAnexoSectionProps {
  control: Control<VerificacionPagosFormValues>;
}

const ArchivoAnexoSection: React.FC<ArchivoAnexoSectionProps> = ({ control }) => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_FILE_TYPES_GENERAL = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/x-zip-compressed',
  ];

  return (
    <section className="space-y-4">
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Archivo Anexo</AlertTitle>
        <AlertDescription>
          Adjunte aquí el archivo o soporte correspondiente a su solicitud.
          <br />
          <strong>Formatos permitidos:</strong> PDF, JPG, PNG, Excel, Word, CSV y ZIP.
          <br />
          <strong>Tamaño máximo:</strong> 10MB.
        </AlertDescription>
      </Alert>

      <FileUploadField
        control={control}
        name="archivoAnexo"
        label="Archivo Anexo"
        accept={ALLOWED_FILE_TYPES_GENERAL.join(',')}
        description="Adjunte el archivo correspondiente (PDF, JPG, PNG, Excel, Word, CSV, ZIP)."
      />
    </section>
  );
};

export default ArchivoAnexoSection;
