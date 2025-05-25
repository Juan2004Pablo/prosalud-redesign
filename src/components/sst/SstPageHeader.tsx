
    import React from 'react';
    import { ShieldCheck } from 'lucide-react';

    const SstPageHeader: React.FC = () => {
      return (
        <header className="mb-12 text-center animate-fade-in">
          <div className="flex justify-center items-center gap-3 mb-4">
            <ShieldCheck className="h-8 w-8 text-primary-prosalud-dark" />
            <h1 className="text-4xl font-bold text-primary-prosalud-dark tracking-tight">
              Seguridad y Salud en el Trabajo (SST)
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Información esencial para actuar ante emergencias, accidentes e incidentes laborales.
          </p>
        </header>
      );
    };

    export default SstPageHeader;
    