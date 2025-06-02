import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ExternalLink, Sparkles, Info, FileText, Users, Gift, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqData, faqCategories, FAQItem } from '@/data/faqData';
import { Link } from 'react-router-dom';

const categoryIcons = {
  Info,
  FileText,
  Users,
  Gift,
  Settings
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary-prosalud via-blue-600 to-indigo-600 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-white font-medium">Centro de Ayuda</span>
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Encuentra respuestas a las consultas más comunes sobre ProSalud y nuestros servicios
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <Input
                  type="text"
                  placeholder="Buscar en preguntas frecuentes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>

            {/* Enhanced Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'secondary' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={`rounded-full px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === 'all' 
                    ? 'bg-white text-primary-prosalud shadow-lg hover:shadow-xl' 
                    : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                }`}
              >
                Todas las categorías
              </Button>
              {faqCategories.map(category => {
                const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons];
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'secondary' : 'outline'}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-full px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category.id 
                        ? 'bg-white text-primary-prosalud shadow-lg hover:shadow-xl' 
                        : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Results summary */}
          {searchQuery && (
            <div className="mb-8">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-blue-800 font-medium">
                    Se encontraron <span className="font-bold">{filteredFAQs.length}</span> resultado(s) para "<span className="font-bold">{searchQuery}</span>"
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* FAQ Content */}
          {Object.keys(groupedFAQs).length === 0 ? (
            <Card className="text-center py-16 bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardContent>
                <div className="text-gray-500">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-700">No se encontraron resultados</h3>
                  <p className="text-lg">Intenta con otros términos de búsqueda o selecciona una categoría diferente.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedFAQs).map(([categoryId, items]) => {
                const category = faqCategories.find(cat => cat.id === categoryId);
                if (!category || items.length === 0) return null;

                const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons];

                return (
                  <div key={categoryId} className="animate-fade-in">
                    {selectedCategory === 'all' && (
                      <div className="mb-8">
                        <Card className="bg-gradient-to-r from-white via-blue-50 to-indigo-50 border-0 shadow-xl overflow-hidden">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-gradient-to-br from-primary-prosalud to-blue-600 rounded-2xl shadow-lg">
                                <IconComponent className="w-8 h-8 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                                  {category.name}
                                </CardTitle>
                                <CardDescription className="text-gray-600 text-lg">
                                  {category.description}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      </div>
                    )}

                    <Accordion type="single" collapsible className="space-y-6">
                      {items.map((faq, index) => (
                        <AccordionItem
                          key={faq.id}
                          value={faq.id}
                          className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <AccordionTrigger className="px-8 py-6 text-left hover:no-underline group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300">
                            <h3 className="text-lg font-semibold text-gray-800 pr-4 leading-relaxed">
                              {faq.question}
                            </h3>
                          </AccordionTrigger>
                          <AccordionContent className="px-8 pb-6">
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-6">
                              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                                {faq.answer}
                              </p>
                            </div>

                            {/* Redirect Link */}
                            {faq.redirectLink && (
                              <div className="mb-6">
                                <Link
                                  to={faq.redirectLink.url}
                                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-prosalud to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  {faq.redirectLink.text}
                                </Link>
                              </div>
                            )}

                            <div className="pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-500 mb-3 font-medium">Palabras clave:</p>
                              <div className="flex flex-wrap gap-2">
                                {faq.keywords.slice(0, 5).map((keyword, index) => (
                                  <Badge 
                                    key={index} 
                                    variant="secondary" 
                                    className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200 hover:from-blue-200 hover:to-indigo-200 transition-all duration-300"
                                  >
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
              })}
            </div>
          )}

          {/* Enhanced Contact Section */}
          <Card className="mt-16 bg-gradient-to-r from-primary-prosalud via-blue-600 to-indigo-600 text-white border-0 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardHeader className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Sparkles className="w-8 h-8 text-yellow-300" />
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
                    className="bg-white text-primary-prosalud hover:bg-gray-100 font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Usar Chatbot
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-white border-white/50 hover:bg-white/20 font-medium px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-white"
                    asChild
                  >
                    <Link to="/">
                      <FileText className="w-4 h-4 mr-2" />
                      Ver Servicios
                    </Link>
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
