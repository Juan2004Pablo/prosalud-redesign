import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  MoreHorizontal,
  ExternalLink,
  Gift,
  GraduationCap
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import DataPagination from '@/components/ui/data-pagination';
import { usePagination } from '@/hooks/usePagination';
import { comfenalcoEventsMock } from '@/data/comfenalcoEventsMock';
import { ComfenalcoEvent } from '@/types/comfenalco';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DatePicker } from "@/components/ui/date-picker";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import DeleteComfenalcoEventDialog from '@/components/admin/comfenalco/DeleteComfenalcoEventDialog';

const AdminComfenalcoPage: React.FC = () => {
  const [eventFormOpen, setEventFormOpen] = useState(false);
  const [viewEventOpen, setViewEventOpen] = useState(false);
  const [deleteEventOpen, setDeleteEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ComfenalcoEvent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    displaySize: 'all',
  });
  const { toast } = useToast();

  const [formValues, setFormValues] = useState<Omit<ComfenalcoEvent, 'id'>>({
    title: '',
    bannerImage: '',
    description: '',
    publishDate: new Date().toISOString().split('T')[0],
    registrationDeadline: new Date().toISOString().split('T')[0],
    eventDate: new Date().toISOString().split('T')[0],
    registrationLink: '',
    formLink: '',
    isNew: false,
    category: 'curso',
    displaySize: 'carousel',
    isVisible: true,
  });

  const filteredEvents = comfenalcoEventsMock.filter(event => {
    const searchTermLower = searchTerm.toLowerCase();
    const titleLower = event.title.toLowerCase();
  
    const matchesSearchTerm = titleLower.includes(searchTermLower);
    const matchesCategory = filters.category === 'all' || event.category === filters.category;
    const matchesDisplaySize = filters.displaySize === 'all' || event.displaySize === filters.displaySize;
  
    return matchesSearchTerm && matchesCategory && matchesDisplaySize;
  });

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedEvents,
    goToPage,
    setItemsPerPage
  } = usePagination({
    data: filteredEvents,
    initialItemsPerPage: 12
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: checked
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormValues(prevValues => ({
      ...prevValues,
      category: value as ComfenalcoEvent['category']
    }));
  };

  const handleDisplaySizeChange = (value: string) => {
    setFormValues(prevValues => ({
      ...prevValues,
      displaySize: value as ComfenalcoEvent['displaySize']
    }));
  };

  const handlePublishDateChange = (date: Date | undefined) => {
    if (date) {
      setFormValues(prevValues => ({
        ...prevValues,
        publishDate: format(date, 'yyyy-MM-dd', { locale: es }),
      }));
    }
  };

  const handleRegistrationDeadlineChange = (date: Date | undefined) => {
    if (date) {
      setFormValues(prevValues => ({
        ...prevValues,
        registrationDeadline: format(date, 'yyyy-MM-dd', { locale: es }),
      }));
    }
  };

  const handleEventDateChange = (date: Date | undefined) => {
    if (date) {
      setFormValues(prevValues => ({
        ...prevValues,
        eventDate: format(date, 'yyyy-MM-dd', { locale: es }),
      }));
    }
  };

  const handleSubmit = () => {
    if (isEditing && selectedEvent) {
      // Update existing event
      const updatedEvents = comfenalcoEventsMock.map(event =>
        event.id === selectedEvent.id ? { ...selectedEvent, ...formValues } : event
      );
      // Here you would typically call an API to update the event
      toast({
        title: "Evento Actualizado",
        description: "El evento ha sido actualizado exitosamente.",
      });
    } else {
      // Create new event
      const newEvent: ComfenalcoEvent = {
        id: `event-${Date.now()}`,
        ...formValues,
      };
      comfenalcoEventsMock.push(newEvent);
      // Here you would typically call an API to create the event
      toast({
        title: "Evento Creado",
        description: "El evento ha sido creado exitosamente.",
      });
    }

    setEventFormOpen(false);
    setSelectedEvent(null);
    setIsEditing(false);
    resetForm();
  };

  const handleEdit = (event: ComfenalcoEvent) => {
    setSelectedEvent(event);
    setFormValues({
      title: event.title,
      bannerImage: event.bannerImage,
      description: event.description || '',
      publishDate: event.publishDate,
      registrationDeadline: event.registrationDeadline || '',
      eventDate: event.eventDate || '',
      registrationLink: event.registrationLink || '',
      formLink: event.formLink,
      isNew: event.isNew,
      category: event.category,
      displaySize: event.displaySize,
      isVisible: event.isVisible || true,
    });
    setIsEditing(true);
    setEventFormOpen(true);
  };

  const handleDelete = (event: ComfenalcoEvent) => {
    setSelectedEvent(event);
    setDeleteEventOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEvent) {
      const eventIndex = comfenalcoEventsMock.findIndex(e => e.id === selectedEvent.id);
      if (eventIndex > -1) {
        comfenalcoEventsMock.splice(eventIndex, 1);
        toast({
          title: "Evento Eliminado",
          description: "El evento ha sido eliminado exitosamente.",
        });
      }
    }
    setDeleteEventOpen(false);
    setSelectedEvent(null);
  };

  const resetForm = () => {
    setFormValues({
      title: '',
      bannerImage: '',
      description: '',
      publishDate: new Date().toISOString().split('T')[0],
      registrationDeadline: new Date().toISOString().split('T')[0],
      eventDate: new Date().toISOString().split('T')[0],
      registrationLink: '',
      formLink: '',
      isNew: false,
      category: 'curso',
      displaySize: 'carousel',
      isVisible: true,
    });
    setIsEditing(false);
    setSelectedEvent(null);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-sm">
              <CardHeader className="pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-prosalud/10 p-3 rounded-lg">
                      <GraduationCap className="h-8 w-8 text-primary-prosalud" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary-prosalud">
                        Experiencias Comfenalco
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Administra las experiencias y beneficios de Comfenalco para los afiliados
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      resetForm();
                      setEventFormOpen(true);
                    }}
                    className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Experiencia
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros y Búsqueda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar por título..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="curso">Curso</SelectItem>
                      <SelectItem value="experiencia">Experiencia</SelectItem>
                      <SelectItem value="beneficio">Beneficio</SelectItem>
                      <SelectItem value="regalo">Regalo</SelectItem>
                      <SelectItem value="recreacion">Recreación</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.displaySize} onValueChange={(value) => setFilters({...filters, displaySize: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tamaño de Visualización" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los tamaños</SelectItem>
                      <SelectItem value="carousel">Carousel</SelectItem>
                      <SelectItem value="mosaic">Mosaic</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="outline" 
                    onClick={() => {setFilters({category: 'all', displaySize: 'all'}); setSearchTerm('');}}
                    className="w-full"
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Events Grid */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Eventos Comfenalco ({totalItems})</CardTitle>
                <CardDescription>
                  Lista completa de eventos y beneficios de Comfenalco para los afiliados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedEvents.map((event) => (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="p-0">
                        <img
                          src={event.bannerImage}
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                          <div className="flex gap-1">
                            {event.isNew && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Nuevo
                              </Badge>
                            )}
                            <Badge variant={event.isVisible ? "default" : "secondary"} className="text-xs">
                              {event.isVisible ? "Visible" : "Oculto"}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
                          {event.title}
                        </CardTitle>
                        {event.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {event.description}
                          </p>
                        )}
                        <div className="space-y-1 mb-4">
                          <p className="text-xs text-gray-500">
                            Publicado: {event.publishDate}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {event.displaySize}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedEvent(event);
                              setViewEventOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center gap-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleEdit(event)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(event)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <a href={event.formLink} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <DataPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={goToPage}
                  onItemsPerPageChange={setItemsPerPage}
                  className="mt-6"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* View Event Dialog */}
          <Dialog open={viewEventOpen} onOpenChange={setViewEventOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-xl font-bold">
                  Detalles del Evento
                </DialogTitle>
                <Separator />
              </DialogHeader>
              {selectedEvent && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <GraduationCap className="h-5 w-5" />
                          Información del Evento
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Título</label>
                            <p className="text-sm">{selectedEvent.title}</p>
                          </div>
                          {selectedEvent.description && (
                            <div>
                              <label className="text-sm font-medium text-gray-600">Descripción</label>
                              <p className="text-sm">{selectedEvent.description}</p>
                            </div>
                          )}
                          <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Categoría</label>
                            <Badge variant="outline" className="text-xs">{selectedEvent.category}</Badge>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Tamaño de Visualización</label>
                            <Badge variant="secondary" className="text-xs">{selectedEvent.displaySize}</Badge>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Estado</label>
                            <Badge variant={selectedEvent.isVisible ? "default" : "secondary"}>
                              {selectedEvent.isVisible ? "Visible en web" : "Oculto en web"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Fechas y Enlaces
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Fecha de Publicación</label>
                            <p className="text-sm">{selectedEvent.publishDate}</p>
                          </div>
                          {selectedEvent.registrationDeadline && (
                            <div>
                              <label className="text-sm font-medium text-gray-600">Fecha Límite de Registro</label>
                              <p className="text-sm">{selectedEvent.registrationDeadline}</p>
                            </div>
                          )}
                          {selectedEvent.eventDate && (
                            <div>
                              <label className="text-sm font-medium text-gray-600">Fecha del Evento</label>
                              <p className="text-sm">{selectedEvent.eventDate}</p>
                            </div>
                          )}
                          <div>
                            <label className="text-sm font-medium text-gray-600">Enlace del Formulario</label>
                            <a href={selectedEvent.formLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                              Ver formulario <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Event Form Dialog */}
          <Dialog open={eventFormOpen} onOpenChange={setEventFormOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
              <DialogHeader>
                <DialogTitle>{isEditing ? 'Editar Evento' : 'Nuevo Evento'}</DialogTitle>
                <DialogDescription>
                  {isEditing ? 'Edita los detalles del evento.' : 'Crea un nuevo evento para mostrar a los afiliados.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Input
                      type="text"
                      id="title"
                      name="title"
                      value={formValues.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bannerImage">URL de la Imagen del Banner</Label>
                    <Input
                      type="text"
                      id="bannerImage"
                      name="bannerImage"
                      value={formValues.bannerImage}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="publishDate">Fecha de Publicación</Label>
                    <DatePicker
                      value={formValues.publishDate ? new Date(formValues.publishDate) : undefined}
                      onChange={handlePublishDateChange}
                      placeholder="Seleccionar fecha"
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationDeadline">Fecha Límite de Registro</Label>
                    <DatePicker
                      value={formValues.registrationDeadline ? new Date(formValues.registrationDeadline) : undefined}
                      onChange={handleRegistrationDeadlineChange}
                      placeholder="Seleccionar fecha"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventDate">Fecha del Evento</Label>
                    <DatePicker
                      value={formValues.eventDate ? new Date(formValues.eventDate) : undefined}
                      onChange={handleEventDateChange}
                      placeholder="Seleccionar fecha"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="registrationLink">Enlace de Registro</Label>
                    <Input
                      type="text"
                      id="registrationLink"
                      name="registrationLink"
                      value={formValues.registrationLink}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="formLink">Enlace del Formulario</Label>
                    <Input
                      type="text"
                      id="formLink"
                      name="formLink"
                      value={formValues.formLink}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <Select value={formValues.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="curso">Curso</SelectItem>
                        <SelectItem value="experiencia">Experiencia</SelectItem>
                        <SelectItem value="beneficio">Beneficio</SelectItem>
                        <SelectItem value="regalo">Regalo</SelectItem>
                        <SelectItem value="recreacion">Recreación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="displaySize">Tamaño de Visualización</Label>
                    <Select value={formValues.displaySize} onValueChange={handleDisplaySizeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tamaño" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carousel">Carousel</SelectItem>
                        <SelectItem value="mosaic">Mosaic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isNew"
                      checked={formValues.isNew}
                      onCheckedChange={(checked) => handleSwitchChange('isNew', checked)}
                    />
                    <Label htmlFor="isNew">Es Nuevo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isVisible"
                      checked={formValues.isVisible}
                      onCheckedChange={(checked) => handleSwitchChange('isVisible', checked)}
                    />
                    <Label htmlFor="isVisible">Visible en la web</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEventFormOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit}>
                  {isEditing ? 'Actualizar Evento' : 'Crear Evento'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <DeleteComfenalcoEventDialog
            open={deleteEventOpen}
            onOpenChange={setDeleteEventOpen}
            event={selectedEvent}
            onConfirm={confirmDelete}
          />
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminComfenalcoPage;
