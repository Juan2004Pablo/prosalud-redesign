
    import React from 'react';
    import { FileText } from 'lucide-react';

    const SolicitudHeader: React.FC = () => {
      return (
        <header className="mb-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-primary-prosalud-dark" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary-prosalud-dark tracking-tight">
              Solicitud de Certificado de Convenio Sindical
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Complete el siguiente formulario para solicitar su certificado de convenio sindical.
          </p>
        </header>
      );
    };

    export default SolicitudHeader;
    