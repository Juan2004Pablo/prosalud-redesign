
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import QuickLinksSection from '@/components/home/QuickLinksSection';
import ConveniosSection from '@/components/home/ConveniosSection';
// Eliminar la importación de ChatbotFab de aquí

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <QuickLinksSection />
      <ConveniosSection />
      {/* Eliminar ChatbotFab de aquí */}
    </MainLayout>
  );
};

export default Index;
