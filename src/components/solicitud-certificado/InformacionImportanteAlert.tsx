
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const InformacionImportanteAlert: React.FC = () => {
  return (
    <Alert variant="default" className="mb-8 bg-blue-50 border-blue-200 text-blue-800">
      <Info className="h-5 w-5 text-blue-600" />
      <AlertTitle className="font-semibold text-blue-700">Información Importante</AlertTitle>
      <AlertDescription>
        El certificado de convenio convencional se enviará al correo del afiliado en un plazo de cinco (5) días hábiles, salvo los casos que requieran validación adicional por parte de la Entidad. Estos estarán sujetos a dicha verificación para poder ser emitidos.
      </AlertDescription>
    </Alert>
  );
};

export default InformacionImportanteAlert;
