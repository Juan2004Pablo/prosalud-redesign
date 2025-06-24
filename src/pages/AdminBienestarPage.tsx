import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Camera, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  MoreHorizontal,
  Image,
  Users,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import DataPagination from '@/components/ui/data-pagination';
import { usePagination } from '@/hooks/usePagination';
import EventFormDialog from '@/components/admin/bienestar/EventFormDialog';
import EventDetailsDialog from '@/components/admin/bienestar/EventDetailsDialog';
import { mockEventos } from '@/data/eventosMock';
import { EventData } from '@/types/eventos';

const AdminBienestarPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [eventFormOpen, setEventFormOpen] = useState(false);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const tabs = [
    { id: 'events', label: 'Eventos', icon: Camera },
    { id: 'stats', label: 'Estadísticas', icon: Users }
  ];

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

  const filteredEvents = mockEventos.filter(event => {
    const searchLower = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower)
    );
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
                      <Heart className="h-8 w-8 text-primary-prosalud" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary-prosalud">
                        Galería de Bienestar
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Administra los eventos y actividades de bienestar de ProSalud
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setEventFormOpen(true)}
                    className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Evento
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <div className="p-6 pb-0">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-50 border p-1">
                      {tabs.map((tab) => (
                        <TabsTrigger
                          key={tab.id}
                          value={tab.id}
                          className="flex items-center space-x-2 data-[state=active]:bg-primary-prosalud data-[state=active]:text-white transition-all duration-200"
                        >
                          <tab.icon className="h-4 w-4" />
                          <span className="hidden sm:inline">{tab.label}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  <div className="p-6 pt-0">
                    <TabsContent value="events" className="space-y-6 mt-0">
                      {/* Filters */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Buscar evento..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <div>
                          {/* Future filter options */}
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={() => {setFilters({}); setSearchTerm('');}}
                          className="w-full"
                        >
                          Limpiar Filtros
                        </Button>
                      </div>

                      {/* Events Table */}
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Evento</TableHead>
                              <TableHead>Fecha</TableHead>
                              <TableHead>Ubicación</TableHead>
                              <TableHead>Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {paginatedEvents.map((event) => (
                              <TableRow key={event.id} className="hover:bg-gray-50">
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={event.mainImage.src}
                                      alt={event.mainImage.alt}
                                      className="h-8 w-8 rounded-full object-cover"
                                    />
                                    <div>
                                      <p className="font-medium">{event.title}</p>
                                      <p className="text-sm text-gray-500">{event.category}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>{formatDate(event.date)}</TableCell>
                                <TableCell>{event.location || 'N/A'}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedEvent(event);
                                        setEventDetailsOpen(true);
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        <DropdownMenuItem>
                                          <Edit className="h-4 w-4 mr-2" />
                                          Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          Eliminar
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
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
                    </TabsContent>

                    <TabsContent value="stats" className="space-y-6 mt-0">
                      <div>
                        <Card>
                          <CardContent>
                            <p>Contenido de Estadísticas</p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dialogs */}
          <EventFormDialog open={eventFormOpen} onOpenChange={setEventFormOpen} />
          <EventDetailsDialog
            open={eventDetailsOpen}
            onOpenChange={setEventDetailsOpen}
            event={selectedEvent}
          />
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminBienestarPage;
