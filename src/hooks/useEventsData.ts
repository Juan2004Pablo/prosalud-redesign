
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

  return {
    currentPage,
    sortOrder,
    setSortOrder,
    filterCategory,
    setFilterCategory,
    uniqueCategories,
    eventsToDisplay,
    totalPages,
    handlePageChange
  };
};
