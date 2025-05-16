
import React from 'react';

const BannerSection: React.FC = () => {
  return (
    <section className="w-full bg-white pt-8 pb-4 md:pt-12 md:pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <img
          src="/Prosalud_Banner.png"
          alt="Banner ProSalud ¿Quiénes somos?"
          className="w-full h-auto object-contain rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default BannerSection;
