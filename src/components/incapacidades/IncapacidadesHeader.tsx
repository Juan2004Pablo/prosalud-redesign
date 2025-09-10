import React from 'react';
import { Hospital } from 'lucide-react';

const IncapacidadesHeader: React.FC = () => {
  return (
    <header className="mb-12 text-center">
      <div className="flex justify-center items-center gap-3 mb-4">
        <Hospital className="h-8 w-8 text-primary-prosalud-dark" />
        <h1 className="text-4xl font-bold text-primary-prosalud-dark">
          Solicitud de Incapacidades y Licencias
        </h1>
      </div>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Complete este formulario para enviar su solicitud de incapacidad o licencia de manera directa. 
        Asegúrese de adjuntar toda la documentación requerida.
      </p>
    </header>
  );
};

export default IncapacidadesHeader;