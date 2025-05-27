
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import QuickLinksSection from '@/components/home/QuickLinksSection';
import GaleriaBienestarIntroSection from '@/components/home/GaleriaBienestarIntroSection'; // Importar el nuevo componente
import ConveniosSection from '@/components/home/ConveniosSection';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <QuickLinksSection />
      <GaleriaBienestarIntroSection /> {/* Añadir la nueva sección aquí */}
      <ConveniosSection />
    </MainLayout>
  );
};

export default Index;
