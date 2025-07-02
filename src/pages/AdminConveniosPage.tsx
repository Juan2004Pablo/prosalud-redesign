
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Handshake, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Mail, 
  Phone, 
  MapPin,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/components/admin/AdminLayout';
import DataPagination from '@/components/ui/data-pagination';
import { usePagination } from '@/hooks/usePagination';

interface Convenio {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  website: string;
  createdAt: string;
}

const mockConvenios: Convenio[] = [
  {
    id: 'conv-001',
    title: 'Clínica del Occidente',
    description: 'Descuentos en servicios de salud para afiliados ProSalud',
    imageUrl: '/images/convenios/clinica_occidente.webp',
    contactName: 'Dra. Ana Pérez',
    contactEmail: 'ana.perez@clinicadeloccidente.com',
    contactPhone: '+57 310 123 4567',
    address: 'Calle 5 # 39-12, Cali',
    website: 'https://www.clinicadeloccidente.com',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'conv-002',
    title: 'Óptica CaliVisión',
    description: 'Exámenes de la vista y lentes a precios especiales',
    imageUrl: '/images/convenios/optica_calivision.webp',
    contactName: 'Carlos Gómez',
    contactEmail: 'carlos.gomez@calivision.com',
    contactPhone: '+57 315 987 6543',
    address: 'Carrera 100 # 11-60, Cali',
    website: 'https://www.calivision.com',
    createdAt: '2024-02-20T14:30:00Z'
  },
  {
    id: 'conv-003',
    title: 'Gimnasio FitLife',
    description: 'Planes de entrenamiento personalizados con descuento',
    imageUrl: '/images/convenios/gimnasio_fitlife.webp',
    contactName: 'Sofía Vargas',
    contactEmail: 'sofia.vargas@fitlife.com',
    contactPhone: '+57 320 555 7890',
    address: 'Avenida 6 Norte # 25-100, Cali',
    website: 'https://www.fitlife.com',
    createdAt: '2024-03-10T09:15:00Z'
  },
];

const AdminConveniosPage: React.FC = () => {
  const [convenios, setConvenios] = useState<Convenio[]>(mockConvenios);
  const [selectedConvenio, setSelectedConvenio] = useState<Convenio | null>(null);
  const [convenioFormOpen, setConvenioFormOpen] = useState(false);
  const [editConvenioOpen, setEditConvenioOpen] = useState(false);
  const [deleteConvenioOpen, setDeleteConvenioOpen] = useState(false);
  const [viewConvenioOpen, setViewConvenioOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ category?: string }>({});

  const filteredConvenios = convenios.filter(convenio => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        convenio.title.toLowerCase().includes(searchLower) ||
        convenio.description.toLowerCase().includes(searchLower) ||
        convenio.contactName.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedConvenios,
    goToPage,
    setItemsPerPage
  } = usePagination({
    data: filteredConvenios,
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteConvenio = (convenioId: string) => {
    setConvenios(convenios.filter(convenio => convenio.id !== convenioId));
    setDeleteConvenioOpen(false);
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
                      <Handshake className="h-8 w-8 text-primary-prosalud" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary-prosalud">
                        Gestión de Convenios
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Administra los convenios y alianzas estratégicas de ProSalud
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setConvenioFormOpen(true)}
                    className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Convenio
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
                      placeholder="Buscar por título o contacto..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div></div>

                  <Button 
                    variant="outline" 
                    onClick={() => {setFilters({}); setSearchTerm('');}}
                    className="w-full"
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Convenios Grid */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Convenios ({totalItems})</CardTitle>
                <CardDescription>
                  Lista completa de convenios y alianzas estratégicas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedConvenios.map((convenio) => (
                    <Card key={convenio.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="p-0">
                        <img
                          src={convenio.imageUrl}
                          alt={convenio.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
                          {convenio.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {convenio.description}
                        </p>
                        <div className="space-y-1 mb-4">
                          <p className="text-sm font-medium">{convenio.contactName}</p>
                          <p className="text-xs text-gray-500">{convenio.contactEmail}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-400">
                            {formatDate(convenio.createdAt)}
                          </p>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedConvenio(convenio);
                                setViewConvenioOpen(true);
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
                                <DropdownMenuItem onClick={() => { setSelectedConvenio(convenio); setEditConvenioOpen(true); }}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { setSelectedConvenio(convenio); setDeleteConvenioOpen(true); }}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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

          {/* View Convenio Dialog */}
          <Dialog open={viewConvenioOpen} onOpenChange={setViewConvenioOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-xl font-bold">
                  Detalles del Convenio
                </DialogTitle>
                <Separator />
              </DialogHeader>
              {selectedConvenio && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Handshake className="h-5 w-5" />
                          Información del Convenio
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Título</label>
                            <p className="text-sm">{selectedConvenio.title}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Descripción</label>
                            <p className="text-sm">{selectedConvenio.description}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Sitio Web</label>
                            <a href={selectedConvenio.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                              Visitar <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Información de Contacto
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Nombre de Contacto</label>
                            <p className="text-sm">{selectedConvenio.contactName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <p className="text-sm">{selectedConvenio.contactEmail}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Teléfono</label>
                            <p className="text-sm">{selectedConvenio.contactPhone}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Dirección</label>
                            <p className="text-sm">{selectedConvenio.address}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* New Convenio Dialog */}
          <Dialog open={convenioFormOpen} onOpenChange={setConvenioFormOpen}>
            <DialogContent className="max-w-md bg-white">
              <DialogHeader>
                <DialogTitle>Nuevo Convenio</DialogTitle>
                <DialogDescription>
                  Completa el formulario para agregar un nuevo convenio.
                </DialogDescription>
              </DialogHeader>
              {/* Add form fields here */}
              <Button type="submit">Guardar</Button>
            </DialogContent>
          </Dialog>

          {/* Edit Convenio Dialog */}
          <Dialog open={editConvenioOpen} onOpenChange={setEditConvenioOpen}>
            <DialogContent className="max-w-md bg-white">
              <DialogHeader>
                <DialogTitle>Editar Convenio</DialogTitle>
                <DialogDescription>
                  Modifica la información del convenio seleccionado.
                </DialogDescription>
              </DialogHeader>
              {/* Add form fields here */}
              <Button type="submit">Guardar Cambios</Button>
            </DialogContent>
          </Dialog>

          {/* Delete Convenio Dialog */}
          <Dialog open={deleteConvenioOpen} onOpenChange={setDeleteConvenioOpen}>
            <DialogContent className="max-w-md bg-white">
              <DialogHeader>
                <DialogTitle>Eliminar Convenio</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro de que quieres eliminar este convenio?
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>Esta acción no se puede deshacer.</p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="secondary" onClick={() => setDeleteConvenioOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteConvenio(selectedConvenio!.id)}>
                  Eliminar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminConveniosPage;
