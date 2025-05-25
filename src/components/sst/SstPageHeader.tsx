
import React from 'react';

const SstPageHeader: React.FC = () => {
  return (
    <header className="mb-12 text-center animate-fade-in">
      <h1 className="text-4xl font-bold text-primary mb-4 tracking-tight">
        Seguridad y Salud en el Trabajo (SST)
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Información esencial para actuar ante emergencias, accidentes e incidentes laborales.
      </p>
    </header>
  );
};

export default SstPageHeader;
