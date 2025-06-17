
import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  initialItemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
  paginatedData: T[];
  goToPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const usePagination = <T>({
  data,
  initialItemsPerPage = 10,
  initialPage = 1
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const setItemsPerPage = (items: number) => {
    setItemsPerPageState(items);
    // Reset to first page when changing items per page
    setCurrentPage(1);
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData,
    goToPage,
    setItemsPerPage,
    goToFirstPage,
    goToLastPage,
    hasNextPage,
    hasPreviousPage
  };
};
