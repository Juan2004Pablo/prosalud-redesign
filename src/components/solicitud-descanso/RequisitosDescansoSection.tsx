
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

const RequisitosDescansoSection: React.FC = () => {
  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white mb-8">
      <h2 className="text-xl font-semibold mb-4 text-primary-prosalud-dark flex items-center">
        <FileText className="mr-2 h-6 w-6" /> Documentos de Requisitos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => handleDownload('http://orgs.ddns.net:8091/DocPublicos/Modelo%20de%20Plantillas/Solicitud%20compensacion%20Anual%20de%20Descanso/Procedimiento%20Compensaci%C3%B3n%20Anual%20de%20descanso%20P-A-01.pdf')}
          className="flex items-center gap-2 h-auto p-4 border-secondary-prosaludgreen text-secondary-prosaludgreen hover:bg-secondary-prosaludgreen hover:text-white"
        >
          <Download className="h-5 w-5" />
          <div className="text-left">
            <div className="font-semibold">Requisitos Solicitud de Descanso</div>
            <div className="text-sm opacity-75">Descargar PDF</div>
          </div>
        </Button>
        <Button
          variant="outline"
          onClick={() => handleDownload('http://orgs.ddns.net:8091/DocPublicos/Modelo%20de%20Plantillas/Solicitud%20compensacion%20Anual%20de%20Descanso/Solicitud%20compensacion%20de%20Descanso.pdf')}
          className="flex items-center gap-2 h-auto p-4 border-secondary-prosaludgreen text-secondary-prosaludgreen hover:bg-secondary-prosaludgreen hover:text-white"
        >
          <Download className="h-5 w-5" />
          <div className="text-left">
            <div className="font-semibold">Formato Solicitud de Descanso</div>
            <div className="text-sm opacity-75">Descargar PDF</div>
          </div>
        </Button>
      </div>
    </section>
  );
};

export default RequisitosDescansoSection;
