
import React from 'react';
import CopyToClipboardButton from '@/components/ui/copyToClipboardButton';
import { Mail, AlertTriangle } from 'lucide-react';

const InstruccionesEnvioSection: React.FC = () => {
  const email = "talentohumano@sindicatoprosalud.com";

  return (
    <section className="mb-8 p-6 bg-amber-50 border border-amber-300 rounded-lg shadow">
      <div className="flex items-start">
        <AlertTriangle className="h-10 w-10 text-amber-500 mr-4 mt-1 shrink-0" />
        <div>
          <h2 className="text-xl font-semibold text-amber-700 mb-2">(Proceso Importante) Envío del Formato Diligenciado</h2>
          <p className="text-amber-600 mb-4">
            Una vez haya descargado y diligenciado completamente el formato de retiro, por favor envíelo debidamente firmado al siguiente correo electrónico:
          </p>
          <div className="flex flex-col sm:flex-row items-center bg-white p-3 rounded-md border border-amber-400 shadow-sm mb-3">
            <span className="font-mono text-amber-800 break-all mb-2 sm:mb-0 sm:mr-2">{email}</span>
            <CopyToClipboardButton textToCopy={email} />
          </div>
           <p className="text-xs text-amber-500">
            <strong>Nota:</strong> Asegúrese de adjuntar el formato completo, firmado y legible. Este paso es crucial para procesar su solicitud de retiro de manera efectiva.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstruccionesEnvioSection;
