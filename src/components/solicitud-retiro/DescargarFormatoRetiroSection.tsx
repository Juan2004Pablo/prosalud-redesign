
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const DescargarFormatoRetiroSection: React.FC = () => {
  const formatoUrl = "http://orgs.ddns.net:8091/DocPublicos/Modelo%20de%20Plantillas/Solicitud%20de%20Retiro/Formato%20Retiro%20y%20liquidacion.pdf";

  return (
    <section className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow text-center">
      <h2 className="text-2xl font-semibold text-primary-prosalud mb-4">Descargar Formato de Retiro</h2>
      <p className="text-gray-700 mb-6">
        Haga clic en el botón para descargar el formato oficial de solicitud de retiro y liquidación. Este documento es esencial para formalizar su desvinculación.
      </p>
      <Button
        asChild
        size="lg"
        className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        <a href={formatoUrl} target="_blank" rel="noopener noreferrer">
          <Download className="mr-2 h-5 w-5" />
          Descargar Formato PDF
        </a>
      </Button>
    </section>
  );
};

export default DescargarFormatoRetiroSection;
