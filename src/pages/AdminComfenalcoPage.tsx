
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import ComfenalcoEventForm from '@/components/admin/comfenalco/ComfenalcoEventForm';
import { comfenalcoApi } from '@/services/adminApi';
import { ComfenalcoEvent } from '@/types/admin';

const AdminComfenalcoPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ComfenalcoEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ['comfenalco-events'],
    queryFn: comfenalcoApi.getEvents
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async (event: ComfenalcoEvent) => {
      return comfenalcoApi.updateEvent(event.id, { isVisible: !event.isVisible });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comfenalco-events'] });
      toast({
        title: "Estado actualizado",
        description: "La visibilidad de la experiencia ha sido actualizada."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(events.map(event => event.category))];

  const handleEdit = (event: ComfenalcoEvent) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    refetch();
  };

  if (showForm) {
    return <ComfenalcoEventForm event={editingEvent} onClose={handleCloseForm} />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-white rounded-xl p-6 sm:p-8 border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-prosalud">
                  Experiencias Comfenalco
                </h1>
                <Button
                  onClick={handleCreate}
                  className="bg-primary-prosalud hover:bg-primary-prosalud-dark w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Experiencia
                </Button>
              </div>
              <p className="text-base sm:text-lg text-text-gray">
                Gestiona las experiencias y servicios de Comfenalco disponibles para los afiliados
              </p>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar experiencias..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-prosalud w-full sm:w-auto"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Events Grid */}
          <motion.div variants={itemVariants}>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white h-full flex flex-col">
                      <div className="relative h-48">
                        <img
                          src={event.bannerImage}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge variant={event.isVisible ? "default" : "secondary"}>
                            {event.isVisible ? 'Visible' : 'Oculto'}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          {event.isNew && (
                            <Badge className="bg-orange-500">Nuevo</Badge>
                          )}
                          <Badge variant="outline" className="bg-white/80">
                            {event.displaySize}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg mb-2 text-text-dark">
                          {event.title}
                        </h3>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-1">
                          <p><strong>Categoría:</strong> {event.category}</p>
                          <p><strong>Publicado:</strong> {event.publishDate}</p>
                          {event.registrationDeadline && (
                            <p><strong>Fecha límite:</strong> {event.registrationDeadline}</p>
                          )}
                        </div>

                        <div className="space-y-3 mt-auto">
                          {/* Visibility Toggle */}
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              {event.isVisible ? (
                                <Eye className="h-4 w-4 text-green-600" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              )}
                              <span className="text-sm font-medium">
                                {event.isVisible ? 'Visible en web' : 'Oculto en web'}
                              </span>
                            </div>
                            <Switch
                              checked={event.isVisible}
                              onCheckedChange={() => toggleVisibilityMutation.mutate(event)}
                              disabled={toggleVisibilityMutation.isPending}
                            />
                          </div>

                          {/* Edit Button */}
                          <Button
                            variant="outline"
                            onClick={() => handleEdit(event)}
                            className="w-full"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar Experiencia
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredEvents.length === 0 && !isLoading && (
              <Card className="bg-white border shadow-sm">
                <CardContent className="p-12 text-center">
                  <p className="text-lg text-gray-500 mb-4">No se encontraron experiencias</p>
                  <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear primera experiencia
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminComfenalcoPage;
