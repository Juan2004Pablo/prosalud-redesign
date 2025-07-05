
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  FileText,
  Download,
  Filter,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import DataPagination from '@/components/ui/data-pagination';
import { usePagination } from '@/hooks/usePagination';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReactJson from 'react-json-view';

interface SolicitudDetallada {
  id: string;
  usuario: string;
  tipo: string;
  fechaCreacion: Date;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  detalles: any;
  observaciones?: string;
}

const AdminSolicitudesPage: React.FC = () => {
  const [selectedSolicitud, setSelectedSolicitud] = useState<SolicitudDetallada | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [solicitudes, setSolicitudes] = useState<SolicitudDetallada[]>([
    {
      id: '1',
      usuario: 'Juan Pérez',
      tipo: 'Insumos Médicos',
      fechaCreacion: new Date(),
      estado: 'pendiente',
      detalles: {
        producto: 'Tapabocas N95',
        cantidad: 100,
        prioridad: 'alta'
      },
      observaciones: 'Solicitud urgente para el área de emergencias'
    },
    {
      id: '2',
      usuario: 'María Gómez',
      tipo: 'Equipamiento',
      fechaCreacion: new Date(),
      estado: 'aprobada',
      detalles: {
        equipo: 'Monitor Multiparámetro',
        modelo: 'XYZ-2000',
        cantidad: 1
      }
    },
    {
      id: '3',
      usuario: 'Carlos Rodríguez',
      tipo: 'Mantenimiento',
      fechaCreacion: new Date(),
      estado: 'rechazada',
      detalles: {
        equipo: 'Resonancia Magnética',
        motivo: 'Falla en el sistema de enfriamiento'
      },
      observaciones: 'No hay presupuesto disponible para la reparación'
    },
  ]);

  const { toast } = useToast();

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

  const handleViewDetails = (solicitud: SolicitudDetallada) => {
    console.log('Ver detalles de solicitud:', solicitud);
    setSelectedSolicitud(solicitud);
  };

  const handleChangeStatus = (id: string, newStatus: 'aprobada' | 'rechazada') => {
    setSolicitudes(solicitudes.map(solicitud =>
      solicitud.id === id ? { ...solicitud, estado: newStatus } : solicitud
    ));
    toast({
      title: `Solicitud ${newStatus === 'aprobada' ? 'Aprobada' : 'Rechazada'}`,
      description: `La solicitud #${id} ha sido ${newStatus === 'aprobada' ? 'aprobada' : 'rechazada'} exitosamente.`,
    });
    setSelectedSolicitud(null);
  };

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    const matchesSearch = solicitud.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           solicitud.tipo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || solicitud.estado === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData,
    goToPage,
    setItemsPerPage
  } = usePagination({
    data: filteredSolicitudes,
    initialItemsPerPage: 10
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-700';
      case 'aprobada': return 'bg-green-100 text-green-700';
      case 'rechazada': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendiente': return 'Pendiente';
      case 'aprobada': return 'Aprobada';
      case 'rechazada': return 'Rechazada';
      default: return status;
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
                      <FileText className="h-8 w-8 text-primary-prosalud" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary-prosalud">
                        Gestión de Solicitudes
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Administra y procesa las solicitudes de los usuarios de ProSalud
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => setExportDialogOpen(true)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                    <Button 
                      onClick={() => setFilterDialogOpen(true)}
                      className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros Avanzados
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Solicitudes Pendientes</CardTitle>
                <CardDescription>Número de solicitudes que requieren atención</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary-prosalud">{solicitudes.filter(s => s.estado === 'pendiente').length}</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Solicitudes Aprobadas</CardTitle>
                <CardDescription>Número de solicitudes que han sido aprobadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-500">{solicitudes.filter(s => s.estado === 'aprobada').length}</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Solicitudes Rechazadas</CardTitle>
                <CardDescription>Número de solicitudes que han sido rechazadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-500">{solicitudes.filter(s => s.estado === 'rechazada').length}</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="search" className="text-sm font-medium text-gray-700">Buscar Solicitud</Label>
                    <Input
                      type="text"
                      id="search"
                      placeholder="Buscar por usuario o tipo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">Filtrar por Estado</Label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="bg-gray-50 border-gray-300">
                        <SelectValue placeholder="Todos los estados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="aprobada">Aprobada</SelectItem>
                        <SelectItem value="rechazada">Rechazada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Requests Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Solicitudes ({totalItems})</span>
                </CardTitle>
                <CardDescription>
                  Lista completa de solicitudes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>ID</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Fecha Creación</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((solicitud) => (
                        <TableRow key={solicitud.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell>
                            <span className="font-mono text-sm">#{solicitud.id}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-gray-900">{solicitud.usuario}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-gray-600">{solicitud.tipo}</span>
                          </TableCell>
                          <TableCell>
                            {new Date(solicitud.fechaCreacion).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(solicitud.estado)}>
                              {getStatusLabel(solicitud.estado)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewDetails(solicitud)}
                                className="hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                              >
                                Ver
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

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

          {/* Export Dialog */}
          <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Exportar Solicitudes</DialogTitle>
                <DialogDescription>
                  Selecciona el formato y rango de fechas para exportar las solicitudes.
                </DialogDescription>
              </DialogHeader>
              {/* Add export options here */}
              <Button>Exportar</Button>
            </DialogContent>
          </Dialog>

          {/* Advanced Filters Dialog */}
          <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Filtros Avanzados</DialogTitle>
                <DialogDescription>
                  Aplica filtros avanzados para refinar la búsqueda de solicitudes.
                </DialogDescription>
              </DialogHeader>
              {/* Add filter options here */}
              <Button>Aplicar Filtros</Button>
            </DialogContent>
          </Dialog>

          {/* Request Details Dialog */}
          {selectedSolicitud && (
            <Dialog open={!!selectedSolicitud} onOpenChange={() => setSelectedSolicitud(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <div className="bg-white min-h-full">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary-prosalud/10 p-2 rounded-lg">
                        <FileText className="h-6 w-6 text-primary-prosalud" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Detalles de Solicitud #{selectedSolicitud.id}
                        </h2>
                        <p className="text-sm text-gray-600">
                          Información completa de la solicitud
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedSolicitud(null)}
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Información Básica */}
                    <Card className="border border-gray-200 shadow-sm">
                      <CardHeader className="bg-gray-50 border-b border-gray-200">
                        <CardTitle className="text-lg font-semibold text-gray-900">Información Básica</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Usuario Solicitante</label>
                            <p className="text-gray-900 bg-gray-50 p-2 rounded border">{selectedSolicitud.usuario}</p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tipo de Solicitud</label>
                            <p className="text-gray-900 bg-gray-50 p-2 rounded border">{selectedSolicitud.tipo}</p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Fecha de Creación</label>
                            <p className="text-gray-900 bg-gray-50 p-2 rounded border">{new Date(selectedSolicitud.fechaCreacion).toLocaleDateString()}</p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Estado Actual</label>
                            <div className="bg-gray-50 p-2 rounded border">
                              <Badge className={getStatusColor(selectedSolicitud.estado)}>
                                {getStatusLabel(selectedSolicitud.estado)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Detalles Específicos */}
                    <Card className="border border-gray-200 shadow-sm">
                      <CardHeader className="bg-gray-50 border-b border-gray-200">
                        <CardTitle className="text-lg font-semibold text-gray-900">Detalles Específicos de la Solicitud</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <ReactJson 
                            src={selectedSolicitud.detalles}
                            theme="bright:inverted"
                            displayDataTypes={false}
                            displayObjectSize={false}
                            enableClipboard={true}
                            collapsed={1}
                            name="detalles"
                            style={{
                              backgroundColor: '#fafafa',
                              padding: '16px',
                              borderRadius: '8px',
                              fontSize: '14px'
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Observaciones */}
                    {selectedSolicitud.observaciones && (
                      <Card className="border border-gray-200 shadow-sm">
                        <CardHeader className="bg-gray-50 border-b border-gray-200">
                          <CardTitle className="text-lg font-semibold text-gray-900">Observaciones</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="bg-gray-50 p-4 rounded border text-gray-900">
                            {selectedSolicitud.observaciones}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Acciones */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedSolicitud(null)}
                      >
                        Cerrar
                      </Button>
                      {selectedSolicitud.estado === 'pendiente' && (
                        <>
                          <Button 
                            variant="outline" 
                            onClick={() => handleChangeStatus(selectedSolicitud.id, 'rechazada')}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Rechazar
                          </Button>
                          <Button 
                            onClick={() => handleChangeStatus(selectedSolicitud.id, 'aprobada')}
                            className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
                          >
                            Aprobar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminSolicitudesPage;
