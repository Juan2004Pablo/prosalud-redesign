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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
import { DatePicker } from "@/components/ui/date-picker"

const AdminComfenalcoPage: React.FC = () => {
  const [eventFormOpen, setEventFormOpen] = useState(false);
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
    initialItemsPerPage: 10
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

  const handleSwitchChange = (checked: boolean) => {
    setFormValues(prevValues => ({
      ...prevValues,
      isNew: checked
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
    });
    setIsEditing(true);
    setEventFormOpen(true);
  };

  const handleDelete = (event: ComfenalcoEvent) => {
    // Implement delete logic here
    const eventIndex = comfenalcoEventsMock.findIndex(e => e.id === event.id);
    if (eventIndex > -1) {
      comfenalcoEventsMock.splice(eventIndex, 1);
      toast({
        title: "Evento Eliminado",
        description: "El evento ha sido eliminado exitosamente.",
      });
    }
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
                    onClick={() => setEventFormOpen(true)}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Events Table */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Eventos Comfenalco ({totalItems})</CardTitle>
                <CardDescription>
                  Lista completa de eventos y beneficios de Comfenalco para los afiliados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Fecha de Publicación</TableHead>
                        <TableHead>Tamaño de Visualización</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedEvents.map((event) => (
                        <TableRow key={event.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img src={event.bannerImage} alt={event.title} className="h-8 w-8 rounded-full object-cover" />
                              <div>
                                <p className="font-medium">{event.title}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="w-fit">{event.category}</Badge>
                          </TableCell>
                          <TableCell>{event.publishDate}</TableCell>
                          <TableCell>{event.displaySize}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(event)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDelete(event)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <a href={event.formLink} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="sm">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <DataPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={goToPage}
                  onItemsPerPageChange={setItemsPerPage}
                  className="mt-4"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Event Form Dialog */}
          <Dialog open={eventFormOpen} onOpenChange={setEventFormOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
                <div className="flex items-center space-x-2">
                  <Label htmlFor="isNew">Es Nuevo</Label>
                  <Switch
                    id="isNew"
                    checked={formValues.isNew}
                    onCheckedChange={handleSwitchChange}
                  />
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
              </div>
              <Button onClick={handleSubmit}>
                {isEditing ? 'Actualizar Evento' : 'Crear Evento'}
              </Button>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminComfenalcoPage;
