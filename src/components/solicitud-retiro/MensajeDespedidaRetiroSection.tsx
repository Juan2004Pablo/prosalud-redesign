
import React from 'react';
import { PartyPopper } from 'lucide-react';

const MensajeDespedidaRetiroSection: React.FC = () => {
  return (
    <div className="mt-8 mb-6 p-6 border rounded-lg shadow-xl bg-gradient-to-r from-green-400 to-blue-500 text-white animate-fade-in animate-scale-in">
      <div className="flex flex-col items-center text-center">
        <PartyPopper className="h-16 w-16 mb-4 text-yellow-300 animate-pulse" />
        <h2 className="text-2xl font-bold mb-3">¡Gracias por tu tiempo con nosotros!</h2>
        <p className="text-lg mb-2">
          Agradecemos sinceramente tu participación y contribución al sindicato ProSalud.
        </p>
        <p className="text-md">
          Te deseamos mucho éxito en tus futuros proyectos y emprendimientos. ¡Las puertas siempre estarán abiertas!
        </p>
      </div>
    </div>
  );
};

export default MensajeDespedidaRetiroSection;
