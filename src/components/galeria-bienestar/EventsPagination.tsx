
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface EventsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const EventsPagination: React.FC<EventsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
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

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
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
                  onPageChange(page);
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
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default EventsPagination;
