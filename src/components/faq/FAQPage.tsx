
import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Info, FileText, Users, Gift, Settings, ExternalLink, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqData, faqCategories, FAQItem } from '@/data/faqData';

const iconMap = {
  Info: Info,
  FileText: FileText,
  Users: Users,
  Gift: Gift,
  Settings: Settings
};

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-r from-primary-prosalud to-blue-700 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon and title */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full mr-4 backdrop-blur-sm">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Preguntas Frecuentes
                </h1>
                <div className="flex items-center text-blue-100">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span className="text-lg text-yellow-500">Centro de Ayuda ProSalud</span>
                </div>
              </div>
            </div>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Encuentra respuestas rápidas y precisas a las consultas más comunes sobre ProSalud, 
              nuestros servicios y trámites disponibles
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative mb-8 max-w-2xl mx-auto">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary-prosalud transition-colors" size={22} />
                <Input
                  type="text"
                  placeholder="¿Qué necesitas saber? Busca aquí..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-4 text-lg rounded-2xl border-0 shadow-xl bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>
            </div>

            {/* Enhanced Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'secondary' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={`${
                  selectedCategory === 'all' 
                    ? 'bg-white text-primary-prosalud hover:bg-white/90' 
                    : 'text-xs bg-blue-50 text-blue-700 hover:bg-blue-100'
                } rounded-full px-6 py-2 transition-all font-medium`}
                size="sm"
              >
                Todas las categorías
              </Button>
              {faqCategories.map(category => {
                const IconComponent = iconMap[category.icon as keyof typeof iconMap];
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'secondary' : 'outline'}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${
                      selectedCategory === category.id 
                        ? 'bg-white/90 text-primary-prosalud' 
                        : 'text-xs bg-blue-50 text-blue-700 hover:bg-blue-100'
                    } rounded-full px-4 py-2 transition-all font-medium`}
                    size="sm"
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Results summary */}
          {searchQuery && (
            <div className="mb-8">
              <Card className="border-l-4 border-l-primary-prosalud bg-blue-50/50">
                <CardContent className="p-4">
                  <p className="text-gray-700 font-medium">
                    <Search className="inline h-4 w-4 mr-2" />
                    Se encontraron {filteredFAQs.length} resultado(s) para "{searchQuery}"
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* FAQ Content */}
          {Object.keys(groupedFAQs).length === 0 ? (
            <Card className="text-center py-16 shadow-lg">
              <CardContent>
                <div className="text-gray-500">
                  <Search className="mx-auto h-16 w-16 text-gray-300 mb-6" />
                  <h3 className="text-2xl font-semibold mb-3 text-gray-700">No se encontraron resultados</h3>
                  <p className="text-lg">Intenta con otros términos de búsqueda o selecciona una categoría diferente.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            Object.entries(groupedFAQs).map(([categoryId, items]) => {
              const category = faqCategories.find(cat => cat.id === categoryId);
              if (!category || items.length === 0) return null;

              const IconComponent = iconMap[category.icon as keyof typeof iconMap];

              return (
                <div key={categoryId} className="mb-12">
                  {selectedCategory === 'all' && (
                    <div className="mb-6">
                      <Card className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-0 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-3">
                            <div className="bg-primary-prosalud p-3 rounded-xl mr-4">
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900">
                                {category.name}
                              </h2>
                              <p className="text-gray-600 mt-1">{category.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  <Accordion type="single" collapsible className="space-y-4">
                    {items.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50/50 transition-colors">
                          <div className="flex items-start justify-between w-full">
                            <h3 className="text-lg font-semibold text-gray-900 pr-4 leading-relaxed">
                              {faq.question}
                            </h3>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                              {faq.answer}
                            </p>
                          </div>
                          
                          {/* Redirect button for service-related questions */}
                          {faq.redirectUrl && (
                            <div className="mt-6 pt-4 border-t border-gray-100">
                              <Link to={faq.redirectUrl}>
                                <Button 
                                  className="bg-primary-prosalud hover:bg-primary-prosalud/90 text-white rounded-lg font-medium transition-all hover:scale-105"
                                  size="sm"
                                >
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  {faq.redirectText}
                                  <ExternalLink className="h-3 w-3 ml-2" />
                                </Button>
                              </Link>
                            </div>
                          )}
                          
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              {faq.keywords.slice(0, 5).map((keyword, index) => (
                                <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">
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

          {/* Enhanced Contact Section */}
          <Card className="mt-16 bg-gradient-to-r from-primary-prosalud via-blue-600 to-primary-prosalud text-white shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            <CardHeader className="relative">
              <div className="flex items-center mb-2">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white text-2xl font-bold">¿No encontraste lo que buscabas?</CardTitle>
                  <CardDescription className="text-blue-100 text-lg">
                    Si tienes una consulta específica que no está en nuestras preguntas frecuentes, no dudes en contactarnos.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-6">
                <p className="text-blue-100 text-lg leading-relaxed">
                  Puedes utilizar nuestro chatbot disponible en el sitio web o acceder a los formularios de contacto específicos para cada servicio.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-primary-prosalud hover:bg-gray-100 font-semibold rounded-lg transition-all hover:scale-105"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Usar Chatbot
                  </Button>
                  <Link to="/">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="text-white border-white/50 hover:border-white font-semibold rounded-lg transition-all scale-105"
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      Ver Servicios
                    </Button>
                  </Link>
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
