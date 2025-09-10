import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Clock, AlertTriangle } from 'lucide-react';

const InformacionImportanteIncapacidadesAlert: React.FC = () => {
  return (
    <div className="space-y-4 mb-8">
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Fecha límite de envío:</strong> Debe enviar su incapacidad dentro de los{' '}
          <strong>5 días calendario</strong> siguientes a la fecha de expedición del certificado.
        </AlertDescription>
      </Alert>

      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Documentos válidos:</strong> Solo se procesarán incapacidades expedidas por su respectiva{' '}
          <strong>EPS o ARL</strong>. Los documentos deben ser originales, sin alteraciones ni enmendaduras.
        </AlertDescription>
      </Alert>

      <Alert className="border-gray-200 bg-gray-50">
        <Clock className="h-5 w-5 text-gray-600" />
        <AlertDescription className="text-gray-700">
          <strong>Horario de procesamiento:</strong> Lunes a viernes de 7:00 a.m. a 4:00 p.m. 
          Las solicitudes fuera de horario se procesarán el siguiente día hábil.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default InformacionImportanteIncapacidadesAlert;