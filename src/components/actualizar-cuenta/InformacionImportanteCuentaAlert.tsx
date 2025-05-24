
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const InformacionImportanteCuentaAlert: React.FC = () => {
  return (
    <Alert variant="destructive" className="my-8 bg-amber-50 border-amber-300">
      <AlertTriangle className="h-5 w-5 text-amber-600" />
      <AlertTitle className="font-semibold text-amber-700">IMPORTANTE</AlertTitle>
      <AlertDescription className="text-amber-600 space-y-2">
        <p>
          Por favor, tenga muy presente al momento de realizar cambios de su cuenta bancaria, hacer llegar la certificación Bancaria <strong>ANTES del día 24 del mes</strong>, esto, con el fin de poder realizar los registros bancarios y contables que den a lugar. Procure realizar el reporte de novedad antes de esta fecha para evitar inconvenientes con SU transferencia.
        </p>
        <p>
          Solo se permite realizar pagos a la cuenta del Afiliado y este debe de figurar como titular de la cuenta.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default InformacionImportanteCuentaAlert;
