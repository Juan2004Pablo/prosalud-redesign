
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Search, Filter, Download, Eye, Clock,
  Users, CheckCircle, AlertCircle, XCircle, Calendar,
  TrendingUp, MoreHorizontal, User, Edit, Trash2,
  MapPin, Phone, Mail, Copy
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/components/admin/AdminLayout';
import DataPagination from '@/components/ui/data-pagination';
import { usePagination } from '@/hooks/usePagination';
import { mockRequests, mockRequestStats, requestTypeLabels, statusLabels, statusColors } from '@/data/requestsMock';
import { Request, RequestFilters } from '@/types/requests';

const AdminSolicitudesPage: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [filters, setFilters] = useState<RequestFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = mockRequests.filter(request => {
    if (filters.status && request.status !== filters.status) return false;
    if (filters.request_type && request.request_type !== filters.request_type) return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        request.name.toLowerCase().includes(searchLower) ||
        request.last_name.toLowerCase().includes(searchLower) ||
        request.email.toLowerCase().includes(searchLower) ||
        request.id_number.includes(searchLower)
      );
    }
    return true;
  });

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedRequests,
    goToPage,
    setItemsPerPage
  } = usePagination({
    data: filteredRequests,
    initialItemsPerPage: 10
  });

  // ... keep existing code (containerVariants, itemVariants, formatDate, getStatusIcon)

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <AlertCircle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusUpdate = (requestId: string, newStatus: string) => {
    console.log(`Actualizando solicitud ${requestId} a estado: ${newStatus}`);
    // Aquí se haría la llamada al API en el futuro
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-gradient-to-r from-primary-prosalud to-primary-prosalud-dark rounded-xl p-6 sm:p-8 text-white shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8" />
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">
                      Gestión de Solicitudes
                    </h1>
                    <p className="text-blue-100 mt-2">
                      Administra y da seguimiento a todas las solicitudes realizadas por los afiliados
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Datos
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-primary-prosalud">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Solicitudes</p>
                    <p className="text-3xl font-bold text-primary-prosalud">{mockRequestStats.total}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary-prosalud" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pendientes</p>
                    <p className="text-3xl font-bold text-yellow-600">{mockRequestStats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resueltas</p>
                    <p className="text-3xl font-bold text-green-600">{mockRequestStats.resolved}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Este Mes</p>
                    <p className="text-3xl font-bold text-blue-600">{mockRequestStats.this_month}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
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
                      placeholder="Buscar por nombre, email o ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={filters.status || "all"} onValueChange={(value) => setFilters({...filters, status: value === "all" ? undefined : value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="in_progress">En Proceso</SelectItem>
                      <SelectItem value="resolved">Resuelto</SelectItem>
                      <SelectItem value="rejected">Rechazado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.request_type || "all"} onValueChange={(value) => setFilters({...filters, request_type: value === "all" ? undefined : value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de Solicitud" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      {Object.entries(requestTypeLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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

          {/* Requests Table */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes ({totalItems})</CardTitle>
                <CardDescription>
                  Lista completa de solicitudes realizadas por los afiliados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Solicitante</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedRequests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="bg-primary-prosalud-light rounded-full p-2">
                                <User className="h-4 w-4 text-primary-prosalud" />
                              </div>
                              <div>
                                <p className="font-medium">{request.name} {request.last_name}</p>
                                <p className="text-sm text-gray-500">{request.email}</p>
                                <p className="text-xs text-gray-400">{request.id_type}: {request.id_number}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium text-sm">{requestTypeLabels[request.request_type]}</p>
                              <p className="text-xs text-gray-500">ID: {request.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${statusColors[request.status]} flex items-center gap-1 w-fit`}>
                              {getStatusIcon(request.status)}
                              {statusLabels[request.status]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm">{formatDate(request.created_at)}</p>
                              {request.resolved_at && (
                                <p className="text-xs text-green-600">
                                  ✓ Resuelto: {formatDate(request.resolved_at)}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedRequest(request)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <DialogTitle className="text-xl font-bold">
                                        Detalles de la Solicitud
                                      </DialogTitle>
                                      <Badge className={`${statusColors[selectedRequest?.status || 'pending']} flex items-center gap-1`}>
                                        {selectedRequest && getStatusIcon(selectedRequest.status)}
                                        {selectedRequest && statusLabels[selectedRequest.status]}
                                      </Badge>
                                    </div>
                                    <Separator />
                                  </DialogHeader>
                                  {selectedRequest && (
                                    <div className="space-y-6">
                                      {/* Personal Information Section */}
                                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                              <User className="h-5 w-5" />
                                              Información Personal
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                              <div>
                                                <label className="text-sm font-medium text-gray-600">Nombre Completo</label>
                                                <div className="flex items-center gap-2 mt-1">
                                                  <p className="text-sm">{selectedRequest.name} {selectedRequest.last_name}</p>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => copyToClipboard(`${selectedRequest.name} ${selectedRequest.last_name}`)}
                                                    className="h-6 w-6 p-0"
                                                  >
                                                    <Copy className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                              <div>
                                                <label className="text-sm font-medium text-gray-600">Documento</label>
                                                <div className="flex items-center gap-2 mt-1">
                                                  <p className="text-sm">{selectedRequest.id_type} {selectedRequest.id_number}</p>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => copyToClipboard(selectedRequest.id_number)}
                                                    className="h-6 w-6 p-0"
                                                  >
                                                    <Copy className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="space-y-3">
                                              <div className="flex items-center gap-3">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm">{selectedRequest.email}</span>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() => copyToClipboard(selectedRequest.email)}
                                                  className="h-6 w-6 p-0"
                                                >
                                                  <Copy className="h-3 w-3" />
                                                </Button>
                                              </div>
                                              <div className="flex items-center gap-3">
                                                <Phone className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm">{selectedRequest.phone_number}</span>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() => copyToClipboard(selectedRequest.phone_number)}
                                                  className="h-6 w-6 p-0"
                                                >
                                                  <Copy className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                              <Calendar className="h-5 w-5" />
                                              Estado de la Solicitud
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-4">
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">Tipo de Solicitud</label>
                                              <p className="text-sm mt-1 font-medium">{requestTypeLabels[selectedRequest.request_type]}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm font-medium text-gray-600">ID de Solicitud</label>
                                              <div className="flex items-center gap-2 mt-1">
                                                <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{selectedRequest.id}</p>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() => copyToClipboard(selectedRequest.id)}
                                                  className="h-6 w-6 p-0"
                                                >
                                                  <Copy className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-3">
                                              <div>
                                                <label className="text-sm font-medium text-gray-600">Fecha de Creación</label>
                                                <p className="text-sm mt-1">{formatDate(selectedRequest.created_at)}</p>
                                              </div>
                                              {selectedRequest.processed_at && (
                                                <div>
                                                  <label className="text-sm font-medium text-gray-600">Fecha de Procesamiento</label>
                                                  <p className="text-sm mt-1">{formatDate(selectedRequest.processed_at)}</p>
                                                </div>
                                              )}
                                              {selectedRequest.resolved_at && (
                                                <div>
                                                  <label className="text-sm font-medium text-gray-600">Fecha de Resolución</label>
                                                  <p className="text-sm mt-1 text-green-600">{formatDate(selectedRequest.resolved_at)}</p>
                                                </div>
                                              )}
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                      
                                      {/* Request Details Section */}
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            Detalles Específicos de la Solicitud
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="bg-gray-50 p-4 rounded-lg border">
                                            <pre className="text-sm whitespace-pre-wrap overflow-x-auto">
                                              {JSON.stringify(selectedRequest.payload, null, 2)}
                                            </pre>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      {/* Action Buttons */}
                                      <div className="flex flex-wrap gap-3 pt-4 border-t">
                                        <Button
                                          onClick={() => handleStatusUpdate(selectedRequest.id, 'in_progress')}
                                          className="bg-blue-600 hover:bg-blue-700"
                                          disabled={selectedRequest.status === 'in_progress'}
                                        >
                                          <Edit className="h-4 w-4 mr-2" />
                                          Marcar en Proceso
                                        </Button>
                                        <Button
                                          onClick={() => handleStatusUpdate(selectedRequest.id, 'resolved')}
                                          className="bg-green-600 hover:bg-green-700"
                                          disabled={selectedRequest.status === 'resolved'}
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Marcar como Resuelto
                                        </Button>
                                        <Button
                                          onClick={() => handleStatusUpdate(selectedRequest.id, 'rejected')}
                                          variant="destructive"
                                          disabled={selectedRequest.status === 'rejected'}
                                        >
                                          <XCircle className="h-4 w-4 mr-2" />
                                          Rechazar
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(request.id, 'in_progress')}>
                                    Marcar en Proceso
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(request.id, 'resolved')}>
                                    Marcar como Resuelto
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(request.id, 'rejected')}>
                                    Rechazar
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
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminSolicitudesPage;
