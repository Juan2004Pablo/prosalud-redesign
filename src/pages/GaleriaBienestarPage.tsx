import React, { useState, useMemo, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import EventCard from '@/components/galeria-bienestar/EventCard';
import { mockEvents } from '@/data/eventosMock'; // Usaremos datos mock por ahora
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Slash, Image, GalleryVertical, Home, ArrowDownUp, Filter as FilterIcon } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ITEMS_PER_PAGE = 12; // Mostrar 12 eventos por página

const GaleriaBienestarPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'date-desc' | 'date-asc'>('date-desc');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const uniqueCategories = useMemo(() => {
    const categories = new Set(mockEvents.map(event => event.category).filter(Boolean) as string[]);
    // Ordenar categorías alfabéticamente para el selector
    return ['all', ...Array.from(categories).sort((a, b) => a.localeCompare(b))];
  }, []);

  const processedEvents = useMemo(() => {
    // Crear una copia del array original para evitar mutaciones
    let events = [...mockEvents];

    // Filtrar por categoría
    if (filterCategory !== 'all') {
      events = events.filter(event => event.category === filterCategory);
    }

    // Ordenar - crear una nueva copia para el ordenamiento
    const sortedEvents = [...events];
    if (sortOrder === 'date-desc') {
      sortedEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortOrder === 'date-asc') {
      sortedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    
    return sortedEvents;
  }, [sortOrder, filterCategory]);

  useEffect(() => {
    setCurrentPage(1); // Resetear a la primera página cuando cambia el orden o filtro
    window.scrollTo(0, 0); 
  }, [sortOrder, filterCategory]);
  
  const totalPages = Math.ceil(processedEvents.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const eventsToDisplay = processedEvents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll al inicio de la página al cambiar de página
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Máximo de números de página directos a mostrar
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= halfPagesToShow + 1) {
        for (let i = 1; i <= maxPagesToShow - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis-end');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - halfPagesToShow) {
        pageNumbers.push(1);
        pageNumbers.push('ellipsis-start');
        for (let i = totalPages - maxPagesToShow + 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('ellipsis-start');
        for (let i = currentPage - halfPagesToShow + 1; i <= currentPage + halfPagesToShow -1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis-end');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <MainLayout>
      <div className="container mx-auto pt-6 pb-2 px-4 md:px-6 lg:px-8 py-10">
          <Breadcrumb>
            <BreadcrumbList className="flex items-center space-x-2 text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                    Inicio
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1 font-medium text-foreground">
                  <GalleryVertical className="h-4 w-4" />
                  Galería de Bienestar
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
      <div className="container mx-auto pt-6 pb-2 px-4 md:px-6 lg:px-8 py-10">  
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
              <Image className="h-8 w-8 text-primary-prosalud-dark" />
              <h1 className="text-3xl md:text-4xl font-bold text-primary-prosalud-dark tracking-tight">
                Galería de Bienestar
              </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 mb-4">
            Explora los momentos y actividades que hemos compartido juntos, fortaleciendo nuestra comunidad ProSalud.
          </p>
        </div>

        {/* Controles de Ordenamiento y Filtrado */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center sm:justify-start items-center">
          <div className="flex flex-col items-start gap-1.5 w-full sm:w-auto">
            <Label htmlFor="sort-order" className="text-sm font-medium text-muted-foreground flex items-center">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Ordenar por
            </Label>
            <Select 
              value={sortOrder} 
              onValueChange={(value) => setSortOrder(value as 'date-desc' | 'date-asc')}
            >
              <SelectTrigger id="sort-order" className="w-full sm:w-[180px] bg-background">
                <SelectValue placeholder="Seleccionar orden..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Más recientes</SelectItem>
                <SelectItem value="date-asc">Más antiguos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start gap-1.5 w-full sm:w-auto">
            <Label htmlFor="filter-category" className="text-sm font-medium text-muted-foreground flex items-center">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filtrar por categoría
            </Label>
            <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value)}>
              <SelectTrigger id="filter-category" className="w-full sm:w-[220px] bg-background">
                <SelectValue placeholder="Seleccionar categoría..." />
              </SelectTrigger>
              <SelectContent>
                {uniqueCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'Todas las categorías' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {eventsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {eventsToDisplay.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No hay eventos para mostrar con los filtros seleccionados.</p>
          </div>
        )}
        
        {totalPages > 1 && (
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {typeof page === 'number' ? (
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  ) : (
                    <PaginationEllipsis />
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </MainLayout>
  );
};

export default GaleriaBienestarPage;
