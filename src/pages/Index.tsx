
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import QuickLinksSection from '@/components/home/QuickLinksSection';
import ConveniosSection from '@/components/home/ConveniosSection';

const Index = () => {
  // Implementar scroll suave
  useEffect(() => {
    // Manejar el scroll suave cuando se carga la página con hash en la URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }

    // Añadir listener para links internos con scroll suave
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.pathname === window.location.pathname) {
        e.preventDefault();
        const id = link.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Actualiza la URL sin recargar la página
          window.history.pushState(null, '', link.hash);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <MainLayout>
      <HeroSection />
      <QuickLinksSection />
      <ConveniosSection />
    </MainLayout>
  );
};

export default Index;
