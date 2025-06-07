
import React from 'react';
import { Button } from '@/components/ui/button';
import { DownloadCloud } from 'lucide-react';

const RequisitosAnualDiferidaSection: React.FC = () => {
  const formatoRequisitoUrl = 'http://orgs.ddns.net:8091/DocPublicos/Modelo%20de%20Plantillas/Solicitud%20compensacion%20Anual%20%20Diferida/Procedimiento%20Compensaci%C3%B3n%20Anual%20Diferida.pdf';
  const formatoSolicitudUrl = 'http://orgs.ddns.net:8091/DocPublicos/Modelo%20de%20Plantillas/Solicitud%20compensacion%20Anual%20%20Diferida/Solicitud%20compensacion%20Anual%20%20Diferida.pdf';

  const handleDownload = (url: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevenir el envío del formulario
    window.open(url, '_blank');
  };

  return (
    <div className="mb-6 p-6 border-2 border-primary-prosalud rounded-lg shadow-lg bg-primary-prosalud/5 text-center">
      <h2 className="text-xl font-semibold text-primary-prosalud mb-4">Descargar Formatos de Solicitud</h2>
      <p className="text-gray-700 mb-4">
        Descargue los formatos oficiales necesarios para su solicitud de compensación anual diferida.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          type="button"
          onClick={handleDownload(formatoRequisitoUrl)}
          size="lg"
          className="bg-primary-prosalud hover:bg-primary-prosalud/90 text-white"
        >
          <DownloadCloud className="mr-2 h-5 w-5" />
          Requisitos - PDF
        </Button>
        <Button
          type="button"
          onClick={handleDownload(formatoSolicitudUrl)}
          size="lg"
          className="bg-primary-prosalud hover:bg-primary-prosalud/90 text-white"
        >
          <DownloadCloud className="mr-2 h-5 w-5" />
          Formato Solicitud - PDF
        </Button>
      </div>
    </div>
  );
};

export default RequisitosAnualDiferidaSection;
