
    import React from 'react';
    import { LogOut } from 'lucide-react';

    const SolicitudRetiroHeader: React.FC = () => {
      return (
        <header className="mb-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <LogOut className="h-8 w-8 text-primary-prosalud-dark" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary-prosalud-dark tracking-tight">
              Solicitud de Retiro Sindical
            </h1>
          </div>
          <p className="mt-2 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Información y pasos para gestionar su desvinculación como Afiliado Partícipe del sindicato.
          </p>
        </header>
      );
    };

    export default SolicitudRetiroHeader;
    