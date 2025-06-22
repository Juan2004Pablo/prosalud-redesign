
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Hospital, Search, Clock, CheckCircle, X, Eye, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface HospitalRequestsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HospitalRequestsDialog: React.FC<HospitalRequestsDialogProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const hospitalRequests = [
    {
      id: 'REQ-001',
      hospital: 'Hospital Marco Fidel Suárez',
      coordinator: 'María González',
      requestDate: '2024-01-18',
      items: [
        { product: 'Uniforme Azul - Talla M', quantity: 15, available: 12 },
        { product: 'Bata Blanca - Talla L', quantity: 10, available: 10 }
      ],
      priority: 'high',
      status: 'pending',
      totalItems: 25,
      justification: 'Nuevos ingresos de personal médico para el área de urgencias'
    },
    {
      id: 'REQ-002',
      hospital: 'Hospital San Juan de Dios',
      coordinator: 'Carlos Pérez',
      requestDate: '2024-01-17',
      items: [
        { product: 'Tapabocas N95', quantity: 50, available: 45 }
      ],
      priority: 'medium',
      status: 'approved',
      totalItems: 50,
      justification: 'Reposición mensual para área de cuidados intensivos'
    },
    {
      id: 'REQ-003',
      hospital: 'Hospital La Merced',
      coordinator: 'Ana Martínez',
      requestDate: '2024-01-16',
      items: [
        { product: 'Kit de Bienvenida', quantity: 8, available: 8 }
      ],
      priority: 'low',
      status: 'delivered',
      totalItems: 8,
      justification: 'Personal nuevo en el área administrativa'
    },
    {
      id: 'REQ-004',
      hospital: 'Hospital Venancio Díaz',
      coordinator: 'Luis Ramírez',
      requestDate: '2024-01-19',
      items: [
        { product: 'Uniforme Verde - Talla S', quantity: 5, available: 1 },
        { product: 'Bata de Laboratorio - Talla M', quantity: 8, available: 8 }
      ],
      priority: 'urgent',
      status: 'pending',
      totalItems: 13,
      justification: 'Urgente para cubrir turno nocturno con personal faltante'
    }
  ];

  const filteredRequests = hospitalRequests.filter(request => {
    const matchesSearch = request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.coordinator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-primary-prosalud text-white';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-primary-prosalud text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobado';
      case 'preparing': return 'Preparando';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregado';
      case 'rejected': return 'Rechazado';
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Urgente';
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return priority;
    }
  };

  const handleApprove = (requestId: string) => {
    console.log(`Aprobando solicitud: ${requestId}`, { notes });
    setSelectedRequest(null);
    setNotes('');
  };

  const handleReject = (requestId: string) => {
    console.log(`Rechazando solicitud: ${requestId}`, { notes });
    setSelectedRequest(null);
    setNotes('');
  };

  const canFulfillRequest = (request: any) => {
    return request.items.every((item: any) => item.available >= item.quantity);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Hospital className="h-6 w-6 text-primary-prosalud" />
            <span>Gestión de Solicitudes de Hospitales</span>
          </DialogTitle>
          <DialogDescription>
            Administra las solicitudes de implementos de los diferentes hospitales
          </DialogDescription>
        </DialogHeader>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por hospital, coordinador o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-[200px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="approved">Aprobado</SelectItem>
              <SelectItem value="preparing">Preparando</SelectItem>
              <SelectItem value="shipped">Enviado</SelectItem>
              <SelectItem value="delivered">Entregado</SelectItem>
              <SelectItem value="rejected">Rechazado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full lg:w-[200px]">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las prioridades</SelectItem>
              <SelectItem value="urgent">Urgente</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="low">Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-yellow-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-800">
                  {filteredRequests.filter(req => req.status === 'pending').length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600">Aprobadas</p>
                <p className="text-2xl font-bold text-blue-800">
                  {filteredRequests.filter(req => req.status === 'approved').length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <Hospital className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-red-600">Urgentes</p>
                <p className="text-2xl font-bold text-red-800">
                  {filteredRequests.filter(req => req.priority === 'urgent').length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-primary-prosalud-light border border-primary-prosalud-light rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-primary-prosalud" />
              <div>
                <p className="text-sm text-primary-prosalud">Entregadas</p>
                <p className="text-2xl font-bold text-primary-prosalud">
                  {filteredRequests.filter(req => req.status === 'delivered').length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Requests Table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Coordinador</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Disponibilidad</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-gray-50">
                  <TableCell>
                    <span className="font-mono text-sm">{request.id}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{request.hospital}</p>
                      <p className="text-sm text-gray-600">{request.coordinator}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{request.coordinator}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{request.totalItems}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(request.priority)}>
                      {getPriorityLabel(request.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusLabel(request.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {canFulfillRequest(request) ? (
                      <Badge className="bg-primary-prosalud text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Disponible
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <X className="h-3 w-3 mr-1" />
                        Parcial
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" className="hover:bg-gray-100 text-gray-700 hover:text-gray-700">
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      {request.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover:bg-green-50 text-green-700 hover:text-green-700"
                            onClick={() => setSelectedRequest(request.id)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Aprobar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover:bg-red-50 text-red-700 hover:text-red-700"
                            onClick={() => setSelectedRequest(request.id)}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Rechazar
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Action Dialog */}
        {selectedRequest && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">
              Procesar Solicitud: {selectedRequest}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas (opcional)
                </label>
                <Textarea
                  placeholder="Agregar comentarios sobre la decisión..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedRequest(null)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleApprove(selectedRequest)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Aprobar
                </Button>
                <Button 
                  variant="outline"
                  className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-700"
                  onClick={() => handleReject(selectedRequest)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Rechazar
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <p className="text-sm text-gray-600">
            Mostrando {filteredRequests.length} solicitudes
          </p>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HospitalRequestsDialog;
