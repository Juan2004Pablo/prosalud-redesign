
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Eye, EyeOff, Pencil, Calendar } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { bienestarApi } from '@/services/adminApi';
import { BienestarEvent } from '@/types/admin';
import BienestarEventForm from '@/components/admin/bienestar/BienestarEventForm';

const AdminBienestarPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<BienestarEvent | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['bienestar-events'],
    queryFn: bienestarApi.getEvents
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async (event: BienestarEvent) => {
      return bienestarApi.updateEvent(event.id, { isVisible: !event.isVisible });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bienestar-events'] });
      toast({
        title: "Estado actualizado",
        description: "La visibilidad del evento ha sido actualizada."
      });
    }
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(events.map(event => event.category))];

  const handleEdit = (event: BienestarEvent) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  if (showForm) {
    return (
      <AdminLayout>
        <BienestarEventForm
          event={editingEvent}
          onClose={handleFormClose}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-prosalud-light/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-prosalud/5 to-secondary-prosaludgreen/5 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-primary-prosalud/10 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-prosalud to-secondary-prosaludgreen bg-clip-text text-transparent mb-4">
                    Galería de Bienestar
                  </h1>
                  <p className="text-lg text-text-gray max-w-2xl">
                    Gestiona los eventos de bienestar que se muestran en la galería del sitio web.
                  </p>
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-primary-prosalud to-primary-prosalud-dark hover:from-primary-prosalud-dark hover:to-primary-prosalud shadow-lg"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Nuevo Evento
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-primary-prosalud" />
                  <span>Filtros</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por título o categoría..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-prosalud"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'Todas las categorías' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Events Grid */}
          <motion.div variants={itemVariants}>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredEvents.length === 0 ? (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'No se encontraron eventos con los filtros aplicados'
                      : 'No hay eventos creados aún'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.images.find(img => img.isMain)?.url || event.images[0]?.url || '/placeholder.svg'}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Badge variant={event.isVisible ? "default" : "secondary"}>
                            {event.isVisible ? 'Visible' : 'Oculto'}
                          </Badge>
                          <Badge variant="outline">{event.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg text-text-dark mb-2 line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="space-y-1 text-sm text-text-gray">
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString('es-ES')}
                          </p>
                          {event.location && (
                            <p className="truncate">{event.location}</p>
                          )}
                          {event.attendees && (
                            <p>{event.attendees} asistentes</p>
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(event)}
                            >
                              <Pencil className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleVisibilityMutation.mutate(event)}
                            disabled={toggleVisibilityMutation.isPending}
                          >
                            {event.isVisible ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminBienestarPage;
