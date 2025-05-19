
import React, { useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

const BannerSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sectionRef, { threshold: 0.1, freezeOnceVisible: true });

  const renderSkeleton = () => (
    <section className="w-full bg-white pt-6 pb-3 md:pt-8 md:pb-4">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <Skeleton className="w-full h-48 sm:h-64 md:h-80 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg" />
      </div>
    </section>
  );

  if (!isIntersecting) {
    return renderSkeleton();
  }

  return (
    <section ref={sectionRef} className="w-full bg-white pt-6 pb-3 md:pt-8 md:pb-4 animate-fade-in">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <img
          src="/Prosalud_Banner.png"
          alt="Banner ProSalud ¿Quiénes somos?"
          className="w-full h-auto object-contain rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default BannerSection;
