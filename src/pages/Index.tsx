
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import QuickLinksSection from '@/components/home/QuickLinksSection';
import ConveniosSection from '@/components/home/ConveniosSection';
import ChatbotFab from '@/components/home/ChatbotFab'; // Importar el nuevo componente

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <QuickLinksSection />
      <ConveniosSection />
      <ChatbotFab /> {/* Agregar el botón flotante del chatbot */}
    </MainLayout>
  );
};

export default Index;
