
import React, { useRef } from 'react';
import { comfenalcoEventsMock } from '@/data/comfenalcoEventsMock';
import ComfenalcoEventCard from './ComfenalcoEventCard';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';
import { Gift, Sparkles } from 'lucide-react';

const ComfenalcoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver(sectionRef, { 
    threshold: 0.1, 
    freezeOnceVisible: true 
  });

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-green-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isVisible ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-lg bg-green-100 px-3 py-1.5 text-sm text-green-600 font-semibold mb-4">
                <Gift className="h-4 w-4 mr-2" />
                Beneficios Exclusivos
              </div>
              
              <div className="flex items-center justify-center mb-4">
                <img 
                  src="/lovable-uploads/59189700-681a-411b-9728-2ffdb738c386.png" 
                  alt="Comfenalco Antioquia"
                  className="h-16 md:h-20"
                />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Experiencias que transforman
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubre los beneficios, cursos, experiencias y actividades exclusivas que 
                <strong className="text-green-600"> Comfenalco Antioquia</strong> tiene para ti y tu familia
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {comfenalcoEventsMock.map((event, index) => (
                <div 
                  key={event.id}
                  className="opacity-0 translate-y-8 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ComfenalcoEventCard event={event} />
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                ¡No te pierdas estas oportunidades únicas!
              </div>
            </div>
          </>
        ) : (
          // Skeleton Loader
          <>
            <div className="text-center mb-12">
              <Skeleton className="h-6 w-32 mx-auto mb-4" />
              <Skeleton className="h-16 w-48 mx-auto mb-4" />
              <Skeleton className="h-12 w-96 mx-auto mb-4" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ComfenalcoSection;
