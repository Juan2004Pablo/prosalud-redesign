
import React from 'react';
import { Info } from 'lucide-react';

const ConfirmacionCorreoSection = () => {
  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <div className="flex flex-row items-center space-x-3">
        <Info className="h-5 w-5 text-sky-600 flex-shrink-0" aria-label="Información" />
        <p className="font-normal text-sm text-gray-700">
          Recibirá una confirmación automática del envío de esta solicitud al correo electrónico que indicó en sus datos personales.
        </p>
      </div>
    </section>
  );
};

export default ConfirmacionCorreoSection;
