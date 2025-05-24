import React from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { ActualizarCuentaBancariaFormValues } from '@/pages/ActualizarCuentaBancariaPage';
import { AlertCircle } from 'lucide-react';
import FileUploadField from '@/features/solicitud-certificado/components/FileUploadField'; // Ruta corregida
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AnexoCertificacionBancariaSectionProps {
  control: Control<ActualizarCuentaBancariaFormValues>;
  setValue: UseFormSetValue<ActualizarCuentaBancariaFormValues>;
}

const AnexoCertificacionBancariaSection: React.FC<AnexoCertificacionBancariaSectionProps> = ({ control, setValue }) => {
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
  const ALLOWED_FILE_TYPES_PDF = ['application/pdf'];

  return (
    <section className="space-y-4">
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Anexo de Certificación Bancaria</AlertTitle>
        <AlertDescription>
          Adjunte una copia de su certificación bancaria en formato PDF. Asegúrese de que el documento sea legible y contenga la información necesaria para verificar su cuenta.
        </AlertDescription>
      </Alert>

      <FileUploadField
        control={control}
        name="anexoCertificacionBancaria"
        label="Certificación Bancaria (PDF)"
        accept=".pdf"
        description="Adjunte su certificación bancaria en formato PDF. Tamaño máximo: 4MB."
      />
    </section>
  );
};

export default AnexoCertificacionBancariaSection;
