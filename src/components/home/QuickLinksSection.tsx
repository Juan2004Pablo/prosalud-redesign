
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ServiceList, { serviceCategories, ServiceCategory } from '@/components/home/ServiceList';

const QuickLinksSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('Todos');

  const handleCategoryClick = (category: ServiceCategory) => {
    setSelectedCategory(category);
  };

  return (
    <section id="servicios" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gestiona tus trámites
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accede a todos los servicios y trámites que ProSalud tiene disponibles para ti
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <Input
              type="text"
              placeholder="Buscar trámites y servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg rounded-xl border-gray-300 focus:ring-2 focus:ring-primary-prosalud focus:border-transparent"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {serviceCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryClick(category)}
                className={`${
                  selectedCategory === category 
                    ? 'bg-primary-prosalud hover:bg-primary-prosalud/90 text-white' 
                    : 'border-gray-300 text-gray-700 '
                } rounded-full px-4 py-2 transition-all font-medium`}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Service List */}
        <ServiceList searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </div>
    </section>
  );
};

export default QuickLinksSection;
