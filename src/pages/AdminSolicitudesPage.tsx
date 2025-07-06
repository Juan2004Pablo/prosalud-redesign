import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Search,
  FileText,
  Download,
  Filter,
  X,
  User,
  Eye,
  MoreHorizontal,
  Clock,
  CheckCircle,
  TrendingUp,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import DataPagination from '@/components/ui/data-pagination';
import { usePagination } from '@/hooks/usePagination';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ReactJson from 'react-json-view';

interface SolicitudDetallada {
  id: string;
  nombre: string;
  email: string;
  cedula: string;
  tipo: string;
  tipoId: string;
  fechaCreacion: Date;
  estado: 'pendiente' | 'en_proceso' | 'resuelto' | 'rechazada';
  detalles: any;
  observaciones?: string;
  fechaResolucion?: Date;
}

const AdminSolicitudesPage: React.FC = () => {
  const [selectedSolicitud, setSelectedSolicitud] = useState<SolicitudDetallada | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [solicitudes, setSolicitudes] = useState<SolicitudDetallada[]>([
    {
      id: 'req-001',
      nombre: 'María González Rodríguez',
      email: 'maria.gonzalez@hospital.com',
      cedula: '123456789',
      tipo: 'Certificado de Convenio',
      tipoId: 'req-001',
      fechaCreacion: new Date('2024-12-10T03:30:00'),
      estado: 'resuelto',
      detalles: {
        convenio: 'Hospital Marco Fidel Suárez',
        fechaInicio: '2024-01-15',
        fechaFin: '2024-12-31'
      },
      observaciones: 'Certificado generado exitosamente',
      fechaResolucion: new Date('2024-12-10T09:20:00')
    },
    {
      id: 'req-002',
      nombre: 'Carlos Martínez Silva',
      email: 'carlos.martinez@clinica.com',
      cedula: '987654321',
      tipo: 'Compensación Anual Diferida',
      tipoId: 'req-002',
      fechaCreacion: new Date('2024-12-15T04:45:00'),
      estado: 'en_proceso',
      detalles: {
        año: '2024',
        monto: 2500000,
        concepto: 'Vacaciones no disfrutadas'
      }
    },
    {
      id: 'req-003',
      nombre: 'Ana López Herrera',
      email: 'ana.lopez@enfermeria.com',
      cedula: '112233445',
      tipo: 'Verificación de Pagos',
      tipoId: 'req-003',
      fechaCreacion: new Date('2024-12-16T11:20:00'),
      estado: 'pendiente',
      detalles: {
        periodo: 'Noviembre 2024',
        concepto: 'Horas extras',
        valor: 850000
      }
    },
    {
      id: 'req-004',
      nombre: 'Roberto Jiménez Castro',
      email: 'roberto.jimenez@urgencias.com',
      cedula: '556677889',
      tipo: 'Solicitud de Descanso',
      tipoId: 'req-004',
      fechaCreacion: new Date('2024-12-17T06:15:00'),
      estado: 'pendiente',
      detalles: {
        fechaInicio: '2024-12-20',
        fechaFin: '2024-12-27',
        motivo: 'Descanso médico'
      }
    },
    {
      id: 'req-005',
      nombre: 'Elena Ramírez Vega',
      email: 'elena.ramirez@laboratorio.com',
      cedula: '778899001',
      tipo: 'Actualizar Cuenta Bancaria',
      tipoId: 'req-005',
      fechaCreacion: new Date('2024-12-12T09:30:00'),
      estado: 'resuelto',
      detalles: {
        banco: 'Bancolombia',
        tipoCuenta: 'Ahorros',
        numeroCuenta: '****7890'
      },
      fechaResolucion: new Date('2024-12-12T14:15:00')
    },
    {
      id: 'req-006',
      nombre: 'Alejandro Torres Mendoza',
      email: 'alejandro.torres@radiologia.com',
      cedula: '102345679',
      tipo: 'Retiro Sindical',
      tipoId: 'req-006',
      fechaCreacion: new Date('2024-12-14T08:45:00'),
      estado: 'en_proceso',
      detalles: {
        fechaRetiro: '2024-12-31',
        motivo: 'Pensión por vejez'
      }
    },
    {
      id: 'req-007',
      nombre: 'Patricia Sánchez Morales',
      email: 'patricia.sanchez@farmacia.com',
      cedula: '334556677',
      tipo: 'Microcrédito CEII',
      tipoId: 'req-007',
      fechaCreacion: new Date('2024-12-16T05:00:00'),
      estado: 'pendiente',
      detalles: {
        monto: 5000000,
        plazo: '36 meses',
        destino: 'Mejoras en vivienda'
      }
    }
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

  const handleChangeStatus = (id: string, newStatus: 'en_proceso' | 'resuelto' | 'rechazada') => {
    const now = new Date();
    setSolicitudes(solicitudes.map(solicitud =>
      solicitud.id === id ? { 
        ...solicitud, 
        estado: newStatus,
        fechaResolucion: newStatus === 'resuelto' ? now : undefined
      } : solicitud
    ));
    
    const statusLabels = {
      'en_proceso': 'Marcada en Proceso',
      'resuelto': 'Marcada como Resuelta',
      'rechazada': 'Rechazada'
    };
    
    toast({
      title: `Solicitud ${statusLabels[newStatus]}`,
      description: `La solicitud #${id} ha sido ${statusLabels[newStatus].toLowerCase()} exitosamente.`,
    });
    setSelectedSolicitud(null);
  };

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    const matchesSearch = solicitud.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           solicitud.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           solicitud.tipo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || solicitud.estado === selectedStatus;
    const matchesType = selectedType === 'all' || solicitud.tipo === selectedType;
    return matchesSearch && matchesStatus && matchesType;
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
      case 'en_proceso': return 'bg-blue-100 text-blue-700';
      case 'resuelto': return 'bg-green-100 text-green-700';
      case 'rechazada': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendiente': return 'Pendiente';
      case 'en_proceso': return 'En Proceso';
      case 'resuelto': return 'Resuelto';
      case 'rechazada': return 'Rechazado';
      default: return status;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedType('all');
  };

  const uniqueTypes = Array.from(new Set(solicitudes.map(s => s.tipo)));

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
                  <Button 
                    variant="outline"
                    onClick={() => setExportDialogOpen(true)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-blue-500 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Solicitudes</p>
                      <p className="text-3xl font-bold text-blue-600">{solicitudes.length}</p>
                    </div>
                    <div className="p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Pendientes</p>
                      <p className="text-3xl font-bold text-yellow-600">{solicitudes.filter(s => s.estado === 'pendiente').length}</p>
                    </div>
                    <div className="p-3 rounded-full">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Resueltas</p>
                      <p className="text-3xl font-bold text-green-600">{solicitudes.filter(s => s.estado === 'resuelto').length}</p>
                    </div>
                    <div className="p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Este Mes</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {solicitudes.filter(s => {
                          const solicitudMonth = s.fechaCreacion.getMonth();
                          const currentMonth = new Date().getMonth();
                          return solicitudMonth === currentMonth;
                        }).length}
                      </p>
                    </div>
                    <div className="rounded-full">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Filter className="h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Buscar por nombre, email o tipo de solicitud..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Todos los estados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          <span className="flex items-center gap-2">
                            Todos los estados
                          </span>
                        </SelectItem>
                        <SelectItem value="pendiente">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Pendiente
                          </span>
                        </SelectItem>
                        <SelectItem value="en_proceso">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            En Proceso
                          </span>
                        </SelectItem>
                        <SelectItem value="resuelto">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Resuelto
                          </span>
                        </SelectItem>
                        <SelectItem value="rechazada">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            Rechazado
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Todos los tipos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los tipos</SelectItem>
                        <SelectItem value="Certificado de Convenio">Certificado de Convenio</SelectItem>
                        <SelectItem value="Compensación Anual Diferida">Compensación Anual Diferida</SelectItem>
                        <SelectItem value="Verificación de Pagos">Verificación de Pagos</SelectItem>
                        <SelectItem value="Solicitud de Descanso">Solicitud de Descanso</SelectItem>
                        <SelectItem value="Actualizar Cuenta Bancaria">Actualizar Cuenta Bancaria</SelectItem>
                        <SelectItem value="Retiro Sindical">Retiro Sindical</SelectItem>
                        <SelectItem value="Microcrédito CEII">Microcrédito CEII</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="h-10 w-full flex items-center gap-2"
                    >
                      <Brush className="w-4 h-4" />
                      Limpiar Filtros
                    </Button>
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
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Solicitudes ({totalItems})
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Lista completa de solicitudes realizadas por los afiliados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-1/4">Solicitante</TableHead>
                        <TableHead className="w-1/5">Tipo</TableHead>
                        <TableHead className="w-1/6">Estado</TableHead>
                        <TableHead className="w-1/6">Fecha</TableHead>
                        <TableHead className="w-16">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((solicitud) => (
                        <TableRow key={solicitud.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="bg-gray-100 p-2 rounded-full">
                                <User className="h-4 w-4 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{solicitud.nombre}</p>
                                <p className="text-sm text-gray-600">{solicitud.email}</p>
                                <p className="text-xs text-gray-500">CC: {solicitud.cedula}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{solicitud.tipo}</p>
                              <p className="text-sm text-gray-500">ID: {solicitud.tipoId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(solicitud.estado)}>
                              {getStatusLabel(solicitud.estado)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm text-gray-900">
                                {solicitud.fechaCreacion.toLocaleDateString('es-ES', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </p>
                              <p className="text-xs text-gray-500">
                                {solicitud.fechaCreacion.toLocaleTimeString('es-ES', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              {solicitud.estado === 'resuelto' && solicitud.fechaResolucion && (
                                <p className="text-xs text-green-600 font-medium mt-1">
                                  ✓ Resuelto: {solicitud.fechaResolucion.toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  })}, {solicitud.fechaResolucion.toLocaleTimeString('es-ES', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => handleViewDetails(solicitud)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver Detalles
                                </DropdownMenuItem>
                                {solicitud.estado === 'pendiente' && (
                                  <>
                                    <DropdownMenuItem onClick={() => handleChangeStatus(solicitud.id, 'en_proceso')}>
                                      <div className="h-4 w-4 mr-2 bg-blue-600 rounded-full"></div>
                                      Marcar en Proceso
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleChangeStatus(solicitud.id, 'resuelto')}>
                                      <div className="h-4 w-4 mr-2 bg-green-600 rounded-full"></div>
                                      Marcar como Resuelto
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => handleChangeStatus(solicitud.id, 'rechazada')}
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      <div className="h-4 w-4 mr-2 bg-red-600 rounded-full"></div>
                                      Rechazar
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {solicitud.estado === 'en_proceso' && (
                                  <DropdownMenuItem onClick={() => handleChangeStatus(solicitud.id, 'resuelto')}>
                                    <div className="h-4 w-4 mr-2 bg-green-600 rounded-full"></div>
                                    Marcar como Resuelto
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                            <p className="text-gray-900 bg-gray-50 p-2 rounded border">{selectedSolicitud.nombre}</p>
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
                            onClick={() => handleChangeStatus(selectedSolicitud.id, 'resuelto')}
                            className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
                          >
                            Resolver
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
