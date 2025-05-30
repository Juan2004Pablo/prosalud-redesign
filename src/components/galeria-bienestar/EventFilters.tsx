
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowDownUp, Filter as FilterIcon } from "lucide-react";

interface EventFiltersProps {
  sortOrder: 'date-desc' | 'date-asc';
  setSortOrder: (value: 'date-desc' | 'date-asc') => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  uniqueCategories: string[];
}

const EventFilters: React.FC<EventFiltersProps> = ({
  sortOrder,
  setSortOrder,
  filterCategory,
  setFilterCategory,
  uniqueCategories
}) => {
  const handleSortChange = (value: string) => {
    console.log('Sort filter changed to:', value);
    setSortOrder(value as 'date-desc' | 'date-asc');
  };

  const handleCategoryChange = (value: string) => {
    console.log('Category filter changed to:', value);
    setFilterCategory(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center sm:justify-start items-center">
      <div className="flex flex-col items-start gap-1.5 w-full sm:w-auto">
        <Label htmlFor="sort-order" className="text-sm font-medium text-muted-foreground flex items-center">
          <ArrowDownUp className="h-4 w-4 mr-2" />
          Ordenar por
        </Label>
        <Select 
          value={sortOrder} 
          onValueChange={handleSortChange}
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
        <Select value={filterCategory} onValueChange={handleCategoryChange}>
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
  );
};

export default EventFilters;
