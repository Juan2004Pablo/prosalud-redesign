
import React from 'react';
import { Heart, Smile, PartyPopper } from 'lucide-react';

const MensajeAgradecimientoSection: React.FC = () => {
  return (
    <section className="mt-10 mb-8 p-8 bg-gradient-to-br from-primary-prosalud via-secondary-prosaludgreen to-tertiary-prosaludblue text-white rounded-lg shadow-xl animate-fade-in transform transition-all duration-500 hover:shadow-2xl">
      <div className="text-center">
        <div className="flex justify-center items-center mb-6">
          <Heart className="h-10 w-10 text-red-400 animate-pulse mr-3 drop-shadow-lg" />
          <PartyPopper className="h-12 w-12 text-yellow-300 animate-bounce mx-2 drop-shadow-lg" />
          <Smile className="h-10 w-10 text-yellow-400 animate-pulse ml-3 drop-shadow-lg" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">¡Gracias por tu valioso tiempo con nosotros!</h2>
        <p className="text-lg md:text-xl mb-2 opacity-95">
          En Sindicato ProSalud, valoramos profundamente el tiempo, la dedicación y el compromiso que compartiste con nuestra organización.
        </p>
        <p className="text-lg md:text-xl opacity-95">
          Te deseamos el mayor de los éxitos en tus futuros proyectos y emprendimientos. ¡Que todos tus caminos estén llenos de prosperidad!
        </p>
        <p className="mt-6 text-md opacity-90">
          Recuerda que las puertas de ProSalud siempre estarán abiertas para ti. ¡Hasta pronto!
        </p>
      </div>
    </section>
  );
};

export default MensajeAgradecimientoSection;
