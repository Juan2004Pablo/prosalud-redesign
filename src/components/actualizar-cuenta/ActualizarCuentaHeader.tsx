
import React from 'react';
import { Landmark } from 'lucide-react';

const ActualizarCuentaHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center gap-3 mb-4">
        <Landmark className="h-8 w-8 text-primary-prosalud-dark" />
        <h1 className="text-3xl md:text-4xl font-bold text-primary-prosalud-dark">
          Solicitud - Cambio de Cuenta Bancaria
        </h1>
      </div>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Complete el formulario para actualizar su información bancaria para el pago de compensaciones.
      </p>
    </div>
  );
};

export default ActualizarCuentaHeader;
