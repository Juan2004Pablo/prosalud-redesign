
import React from 'react';

const SolicitudHeader: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-primary-prosalud tracking-tight mb-4">
        Solicitud de Certificado de Convenio Sindical
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
        Complete el siguiente formulario para solicitar su certificado de convenio sindical.
      </p>
    </header>
  );
};

export default SolicitudHeader;
