
import { useState, useMemo } from 'react';
import { mockEvents } from '@/data/eventosMock';

const ITEMS_PER_PAGE = 12;

export const useEventsData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'date-desc' | 'date-asc'>('date-desc');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Generar categorías únicas
  const uniqueCategories = useMemo(() => {
    const categories = new Set(mockEvents.map(event => event.category).filter(Boolean) as string[]);
    return ['all', ...Array.from(categories).sort((a, b) => a.localeCompare(b))];
  }, []);

  // Procesar eventos usando useMemo para evitar cálculos innecesarios
  const processedEvents = useMemo(() => {
    console.log('Processing events - Category:', filterCategory, 'Sort:', sortOrder);
    
    // Crear un Set para asegurar eventos únicos basados en el ID
    const uniqueEventsMap = new Map();
    mockEvents.forEach(event => {
      if (!uniqueEventsMap.has(event.id)) {
        uniqueEventsMap.set(event.id, event);
      }
    });
    
    // Convertir el Map de vuelta a un array
    const uniqueEvents = Array.from(uniqueEventsMap.values());
    
    // Paso 1: Filtrar por categoría
    const filtered = uniqueEvents.filter(event => 
      filterCategory === 'all' || event.category === filterCategory
    );
    
    console.log('Unique events count:', uniqueEvents.length);
    console.log('Filtered events count:', filtered.length);
    
    // Paso 2: Ordenar según el criterio seleccionado
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      if (sortOrder === 'date-desc') {
        return dateB - dateA; // Más recientes primero
      } else {
        return dateA - dateB; // Más antiguos primero
      }
    });
    
    console.log('Sorted events - First event:', sorted[0]?.title, 'Date:', sorted[0]?.date);
    console.log('Sorted events - Last event:', sorted[sorted.length - 1]?.title, 'Date:', sorted[sorted.length - 1]?.date);
    
    return sorted;
  }, [filterCategory, sortOrder]);

  // Calcular eventos para mostrar en la página actual
  const eventsToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageEvents = processedEvents.slice(startIndex, endIndex);
    
    console.log('Events to display on page', currentPage, ':', pageEvents.length);
    return pageEvents;
  }, [processedEvents, currentPage]);

  const totalPages = Math.ceil(processedEvents.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    console.log('Changing to page:', page);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSortOrderChange = (newOrder: 'date-desc' | 'date-asc') => {
    console.log('Changing sort order from', sortOrder, 'to', newOrder);
    setSortOrder(newOrder);
    setCurrentPage(1); // Reset a la primera página
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (newCategory: string) => {
    console.log('Changing category from', filterCategory, 'to', newCategory);
    setFilterCategory(newCategory);
    setCurrentPage(1); // Reset a la primera página
    window.scrollTo(0, 0);
  };

  return {
    currentPage,
    sortOrder,
    setSortOrder: handleSortOrderChange,
    filterCategory,
    setFilterCategory: handleCategoryChange,
    uniqueCategories,
    eventsToDisplay,
    totalPages,
    handlePageChange
  };
};
