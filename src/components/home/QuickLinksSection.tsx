import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import ServiceList, { serviceCategories, ServiceCategory } from './ServiceList';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const QuickLinksSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('Todos');
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, freezeOnceVisible: true });

  return (
    <section ref={sectionRef} id="quick-links" className="py-16 md:py-20 bg-background-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isVisible ? (
          <>
            <div className="space-y-3 mb-12 text-center">
              <div className="inline-block rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground">
                Autogestión
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-primary-prosalud sm:text-5xl">
                Gestiona tus trámites
              </h2>
              <p className="max-w-[900px] mx-auto text-center text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Accede rápidamente a los servicios que necesitas sin complicaciones.
              </p>
            </div>

            <div className="max-w-xl mx-auto space-y-6 mb-10">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input 
                  type="text"
                  placeholder="Buscar trámite por nombre o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-base md:text-lg py-3 pl-10 pr-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-md border border-gray-300"
                  aria-label="Buscar trámite"
                />
              </div>

              {/* Category Filter Select */}
              <div>
                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ServiceCategory)}>
                  <SelectTrigger className="w-full text-base md:text-lg py-3 border border-gray-300 rounded-md">
                    <SelectValue placeholder="Filtrar por categoría..." />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ServiceList searchTerm={searchTerm} selectedCategory={selectedCategory} />
          </>
        ) : (
          // Skeleton Loader for QuickLinksSection
          <>
            <div className="space-y-3 mb-12 text-center">
              <Skeleton className="h-7 w-24 mx-auto mb-2" />
              <Skeleton className="h-12 w-3/5 mx-auto mb-2" />
              <Skeleton className="h-6 w-4/5 mx-auto" />
              <Skeleton className="h-6 w-3/5 mx-auto" />
            </div>
            <div className="mb-10 max-w-xl mx-auto space-y-6">
              <Skeleton className="h-12 w-full" /> {/* Skeleton for search */}
              <Skeleton className="h-12 w-full" /> {/* Skeleton for select */}
            </div>
            {/* Skeleton for ServiceList - show 4 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-lg border border-prosalud-border">
                  <Skeleton className="h-12 w-12 mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default QuickLinksSection;
