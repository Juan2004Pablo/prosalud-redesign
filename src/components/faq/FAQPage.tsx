
import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqData, faqCategories, FAQItem } from '@/data/faqData';

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Filter FAQ items based on search query and category
  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Group FAQs by category for display
  const groupedFAQs = useMemo(() => {
    const groups: { [key: string]: FAQItem[] } = {};
    
    if (selectedCategory === 'all') {
      faqCategories.forEach(category => {
        groups[category.id] = filteredFAQs.filter(item => item.category === category.id);
      });
    } else {
      groups[selectedCategory] = filteredFAQs;
    }

    // Remove empty groups
    Object.keys(groups).forEach(key => {
      if (groups[key].length === 0) {
        delete groups[key];
      }
    });

    return groups;
  }, [filteredFAQs, selectedCategory]);

  const handleAccordionChange = (value: string) => {
    setExpandedItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Encuentra respuestas a las consultas más comunes sobre ProSalud y nuestros servicios
            </p>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                Todas las categorías
              </Button>
              {faqCategories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Results summary */}
          {searchQuery && (
            <div className="mb-6">
              <p className="text-gray-600">
                Se encontraron {filteredFAQs.length} resultado(s) para "{searchQuery}"
              </p>
            </div>
          )}

          {/* FAQ Content */}
          {Object.keys(groupedFAQs).length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-gray-500">
                  <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
                  <p>Intenta con otros términos de búsqueda o selecciona una categoría diferente.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            Object.entries(groupedFAQs).map(([categoryId, items]) => {
              const category = faqCategories.find(cat => cat.id === categoryId);
              if (!category || items.length === 0) return null;

              return (
                <div key={categoryId} className="mb-8">
                  {selectedCategory === 'all' && (
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {category.name}
                      </h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  )}

                  <Accordion type="multiple" className="space-y-4">
                    {items.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border border-gray-200 rounded-lg bg-white shadow-sm"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                          <div className="flex items-start justify-between w-full">
                            <h3 className="text-lg font-medium text-gray-900 pr-4">
                              {faq.question}
                            </h3>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              {faq.keywords.slice(0, 5).map((keyword, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })
          )}

          {/* Contact Section */}
          <Card className="mt-12 bg-primary-prosalud text-white">
            <CardHeader>
              <CardTitle className="text-white">¿No encontraste lo que buscabas?</CardTitle>
              <CardDescription className="text-blue-100">
                Si tienes una consulta específica que no está en nuestras preguntas frecuentes, no dudes en contactarnos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-blue-100">
                  Puedes utilizar nuestro chatbot disponible en el sitio web o acceder a los formularios de contacto específicos para cada servicio.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" size="sm">
                    Usar Chatbot
                  </Button>
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-primary-prosalud">
                    Ver Servicios
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
