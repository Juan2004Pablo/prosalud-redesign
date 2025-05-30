
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import QuickLinksSection from '@/components/home/QuickLinksSection';
import GaleriaBienestarIntroSection from '@/components/home/GaleriaBienestarIntroSection';
import ComfenalcoSection from '@/components/home/ComfenalcoSection';
import ConveniosSection from '@/components/home/ConveniosSection';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ComfenalcoSection />
      <QuickLinksSection />
      <GaleriaBienestarIntroSection />
      <ConveniosSection />
    </MainLayout>
  );
};

export default Index;
