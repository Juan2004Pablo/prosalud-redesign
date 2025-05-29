
import React from 'react';

const BannerSection: React.FC = () => {
  return (
    <section className="w-full bg-white pt-6 pb-3 md:pt-8 md:pb-4">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <img
          src="/images/Prosalud_Banner.webp"
          alt="Banner ProSalud ¿Quiénes somos?"
          className="w-full h-auto object-contain rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
          width={1200}
          height={400}
        />
      </div>
    </section>
  );
};

export default BannerSection;
