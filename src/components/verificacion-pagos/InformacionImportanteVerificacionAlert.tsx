
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Clock, Mail } from 'lucide-react';

const InformacionImportanteVerificacionAlert: React.FC = () => {
  return (
    <div className="space-y-4 mb-8">
      <Alert className="border-blue-200 bg-blue-50">
        <Mail className="h-5 w-5 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Evite que nuestros correos lleguen a SPAM:</strong> Agregue la cuenta 
          <span className="font-mono bg-blue-100 px-1 rounded mx-1">comunicaciones@sindicatoprosalud.com</span>
          a su lista de contactos y correos deseados.
        </AlertDescription>
      </Alert>

      <Alert className="border-amber-200 bg-amber-50">
        <Clock className="h-5 w-5 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Tiempos de respuesta:</strong> Su consulta será remitida al área encargada. 
          Los tiempos estimados pueden ser de <strong>hasta 15 días hábiles</strong> para revisar su caso.
        </AlertDescription>
      </Alert>

      <Alert className="border-gray-200 bg-gray-50">
        <Info className="h-5 w-5 text-gray-600" />
        <AlertDescription className="text-gray-700">
          <strong>Horario de revisión:</strong> Lunes a viernes de 7:00 a.m. a 5:00 p.m. 
          Cualquier registro fuera de este horario se entenderá presentado el día hábil siguiente. 
          Se registran y asignan por orden de llegada.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default InformacionImportanteVerificacionAlert;
