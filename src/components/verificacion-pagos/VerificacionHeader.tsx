
    import React from 'react';
    import { FileSearch } from 'lucide-react';

    const VerificacionHeader: React.FC = () => {
      return (
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileSearch className="h-8 w-8 text-primary-prosalud-dark" />
            <h1 className="text-4xl font-bold text-primary-prosalud-dark">
              Verificación de Pagos
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Por favor diligencie los datos solicitados. La revisión de Pagos será revisada por el área encargada,
            al tener respuesta le será notificado al correo indicado por usted.
          </p>
        </div>
      );
    };

    export default VerificacionHeader;
    