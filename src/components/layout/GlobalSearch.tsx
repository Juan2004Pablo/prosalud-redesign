
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { searchData, SearchItem } from '@/data/searchData';

interface GlobalSearchProps {
  className?: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchItem[]>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter results based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = searchData.filter(item => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
        item.category.toLowerCase().includes(query)
      );
    });

    setFilteredResults(results.slice(0, 8)); // Limit to 8 results
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (item: SearchItem) => {
    navigate(item.path);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Trigger Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-64 justify-start text-muted-foreground border-prosalud-border hover:bg-primary-prosalud-light"
      >
        <Search size={16} className="mr-2" />
        <span className="hidden sm:inline">Buscar en el sitio...</span>
        <span className="sm:hidden">Buscar...</span>
        <kbd className="hidden sm:inline-flex ml-auto pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-[10vh]">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[70vh] overflow-hidden">
            <Command shouldFilter={false} className="rounded-lg border shadow-md">
              <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandInput
                  placeholder="Buscar páginas, servicios o información..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="ml-2 h-8 w-8 p-0"
                >
                  <X size={16} />
                </Button>
              </div>
              <CommandList className="max-h-[50vh] overflow-y-auto">
                {searchQuery.trim() === '' ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    Escribe para buscar páginas y servicios...
                  </div>
                ) : filteredResults.length === 0 ? (
                  <CommandEmpty className="py-6 text-center text-sm">
                    No se encontraron resultados para "{searchQuery}"
                  </CommandEmpty>
                ) : (
                  <CommandGroup heading="Resultados">
                    {filteredResults.map((item) => (
                      <CommandItem
                        key={item.id}
                        onSelect={() => handleSelect(item)}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <span className="font-medium">{item.title}</span>
                            <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              {item.category}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
