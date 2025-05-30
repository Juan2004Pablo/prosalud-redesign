
import { useState, useMemo, useEffect } from 'react';
import { mockEvents } from '@/data/eventosMock';

const ITEMS_PER_PAGE = 12;

export const useEventsData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'date-desc' | 'date-asc'>('date-desc');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const uniqueCategories = useMemo(() => {
    const categories = new Set(mockEvents.map(event => event.category).filter(Boolean) as string[]);
    return ['all', ...Array.from(categories).sort((a, b) => a.localeCompare(b))];
  }, []);

  // Función de ordenamiento mejorada
  const sortEvents = useMemo(() => {
    return (events: typeof mockEvents, order: 'date-desc' | 'date-asc') => {
      console.log('Sorting events with order:', order);
      console.log('Events to sort:', events.length);
      
      return [...events].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        
        if (order === 'date-desc') {
          return dateB - dateA; // Más recientes primero
        } else {
          return dateA - dateB; // Más antiguos primero
        }
      });
    };
  }, []);

  const processedEvents = useMemo(() => {
    console.log('Processing events - Sort:', sortOrder, 'Filter:', filterCategory);
    
    // Siempre empezar con una copia fresca del array original
    let filteredEvents = [...mockEvents];

    // Aplicar filtro de categoría
    if (filterCategory !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.category === filterCategory);
      console.log('After filtering by category:', filteredEvents.length);
    }

    // Aplicar ordenamiento
    const sortedEvents = sortEvents(filteredEvents, sortOrder);
    console.log('After sorting:', sortedEvents.length, 'First event date:', sortedEvents[0]?.date);
    
    return sortedEvents;
  }, [sortOrder, filterCategory, sortEvents]);

  useEffect(() => {
    console.log('Filters changed, resetting to page 1');
    setCurrentPage(1);
    window.scrollTo(0, 0); 
  }, [sortOrder, filterCategory]);
  
  const totalPages = Math.ceil(processedEvents.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const eventsToDisplay = processedEvents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Función para cambiar el orden con logs para debugging
  const handleSortOrderChange = (newOrder: 'date-desc' | 'date-asc') => {
    console.log('Changing sort order from', sortOrder, 'to', newOrder);
    setSortOrder(newOrder);
  };

  return {
    currentPage,
    sortOrder,
    setSortOrder: handleSortOrderChange,
    filterCategory,
    setFilterCategory,
    uniqueCategories,
    eventsToDisplay,
    totalPages,
    handlePageChange
  };
};
