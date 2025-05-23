
import React from 'react';
import { Calendar } from 'lucide-react';

const DescansoHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center gap-3 mb-4">
        <Calendar className="h-8 w-8 text-secondary-prosaludgreen" />
        <h1 className="text-3xl md:text-4xl font-bold text-primary-prosalud-dark">
          Solicitud - Compensación por Descanso
        </h1>
      </div>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Complete el formulario para solicitar su compensación por descanso laboral
      </p>
    </div>
  );
};

export default DescansoHeader;
