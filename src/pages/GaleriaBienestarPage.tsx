
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import GaleriaBienestarHeader from '@/components/galeria-bienestar/GaleriaBienestarHeader';
import EventFilters from '@/components/galeria-bienestar/EventFilters';
import EventsGrid from '@/components/galeria-bienestar/EventsGrid';
import EventsPagination from '@/components/galeria-bienestar/EventsPagination';
import { useEventsData } from '@/hooks/useEventsData';

const GaleriaBienestarPage: React.FC = () => {
  const {
    currentPage,
    sortOrder,
    setSortOrder,
    filterCategory,
    setFilterCategory,
    uniqueCategories,
    eventsToDisplay,
    totalPages,
    handlePageChange
  } = useEventsData();

  return (
    <MainLayout>
      <GaleriaBienestarHeader />
      <div className="container mx-auto pt-6 pb-2 px-4 md:px-6 lg:px-8 py-10">
        <EventFilters
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          uniqueCategories={uniqueCategories}
        />
        
        <EventsGrid events={eventsToDisplay} />
        
        <EventsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </MainLayout>
  );
};

export default GaleriaBienestarPage;
