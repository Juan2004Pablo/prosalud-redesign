
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import QuickLinksSection from '@/components/home/QuickLinksSection';
import ConveniosSection from '@/components/home/ConveniosSection';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <QuickLinksSection />
      <ConveniosSection />
    </MainLayout>
  );
};

export default Index;
