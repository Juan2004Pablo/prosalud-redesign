
import { useState, useEffect } from 'react';
import { mockEvents } from '@/data/eventosMock';

const ITEMS_PER_PAGE = 12;

export const useEventsData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'date-desc' | 'date-asc'>('date-desc');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [processedEvents, setProcessedEvents] = useState<typeof mockEvents>([]);

  // Generar categorías únicas
  const uniqueCategories = ['all', ...Array.from(new Set(mockEvents.map(event => event.category).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b))];

  // Función para procesar y ordenar eventos
  const processEvents = (category: string, order: 'date-desc' | 'date-asc') => {
    console.log('Processing events with category:', category, 'and order:', order);
    
    // Paso 1: Filtrar por categoría
    let filtered = mockEvents.filter(event => 
      category === 'all' || event.category === category
    );
    
    console.log('Filtered events:', filtered.length);
    
    // Paso 2: Ordenar los eventos filtrados
    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      if (order === 'date-desc') {
        return dateB - dateA; // Más recientes primero
      } else {
        return dateA - dateB; // Más antiguos primero
      }
    });
    
    console.log('Sorted events:', sorted.length, 'First event:', sorted[0]?.title, sorted[0]?.date);
    
    return sorted;
  };

  // Efecto para procesar eventos cuando cambian los filtros
  useEffect(() => {
    console.log('Filters changed - Category:', filterCategory, 'Sort:', sortOrder);
    const newProcessedEvents = processEvents(filterCategory, sortOrder);
    setProcessedEvents(newProcessedEvents);
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [filterCategory, sortOrder]);

  // Inicializar eventos al montar el componente
  useEffect(() => {
    console.log('Initializing events...');
    const initialEvents = processEvents('all', 'date-desc');
    setProcessedEvents(initialEvents);
  }, []);

  const totalPages = Math.ceil(processedEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const eventsToDisplay = processedEvents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSortOrderChange = (newOrder: 'date-desc' | 'date-asc') => {
    console.log('Changing sort order from', sortOrder, 'to', newOrder);
    setSortOrder(newOrder);
  };

  const handleCategoryChange = (newCategory: string) => {
    console.log('Changing category from', filterCategory, 'to', newCategory);
    setFilterCategory(newCategory);
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
