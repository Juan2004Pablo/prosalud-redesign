
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Search, Hospital, Calendar, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import DataPagination from '@/components/ui/data-pagination';
import { usePagination } from '@/hooks/usePagination';

interface Return {
  id: string;
  hospitalName: string;
  coordinatorName: string;
  returnDate: string;
  totalItems: number;
  reason: 'excess' | 'incorrect' | 'defective' | 'expired' | 'other';
  status: 'pending' | 'approved' | 'processed';
  items: Array<{
    productName: string;
    quantity: number;
    condition: 'new' | 'used' | 'damaged';
  }>;
}

const Returns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [reasonFilter, setReasonFilter] = useState('all');

  const mockReturns: Return[] = [
    {
      id: '1',
      hospitalName: 'Hospital Marco Fidel Suárez',
      coordinatorName: 'María González',
      returnDate: '2024-01-18',
      totalItems: 5,
      reason: 'excess',
      status: 'pending',
      items: [
        { productName: 'Uniforme Azul - Talla S', quantity: 3, condition: 'new' },
        { productName: 'Bata Blanca - Talla M', quantity: 2, condition: 'new' }
      ]
    },
    {
      id: '2',
      hospitalName: 'Hospital San Juan de Dios',
      coordinatorName: 'Carlos Pérez',
      returnDate: '2024-01-17',
      totalItems: 3,
      reason: 'defective',
      status: 'approved',
      items: [
        { productName: 'Bata de Laboratorio - Talla L', quantity: 3, condition: 'damaged' }
      ]
    },
    {
      id: '3',
      hospitalName: 'Hospital La Merced',
      coordinatorName: 'Ana Martínez',
      returnDate: '2024-01-15',
      totalItems: 2,
      reason: 'incorrect',
      status: 'processed',
      items: [
        { productName: 'Uniforme Verde - Talla XL', quantity: 2, condition: 'new' }
      ]
    }
  ];

  const filteredReturns = mockReturns.filter(returnItem => {
    const matchesSearch = returnItem.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.coordinatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || returnItem.status === statusFilter;
    const matchesReason = reasonFilter === 'all' || returnItem.reason === reasonFilter;
    
    return matchesSearch && matchesStatus && matchesReason;
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
    data: filteredReturns,
    initialItemsPerPage: 10
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-blue-100 text-blue-700';
      case 'processed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'excess': return 'bg-blue-100 text-blue-700';
      case 'incorrect': return 'bg-orange-100 text-orange-700';
      case 'defective': return 'bg-red-100 text-red-700';
      case 'expired': return 'bg-purple-100 text-purple-700';
      case 'other': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobado';
      case 'processed': return 'Procesado';
      default: return status;
    }
  };

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case 'excess': return 'Exceso';
      case 'incorrect': return 'Incorrecto';
      case 'defective': return 'Defectuoso';
      case 'expired': return 'Vencido';
      case 'other': return 'Otro';
      default: return reason;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Devoluciones</h2>
          <p className="text-gray-600">Gestiona las devoluciones de implementos de los hospitales</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar devoluciones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="approved">Aprobado</SelectItem>
                  <SelectItem value="processed">Procesado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={reasonFilter} onValueChange={setReasonFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los motivos</SelectItem>
                  <SelectItem value="excess">Exceso</SelectItem>
                  <SelectItem value="incorrect">Incorrecto</SelectItem>
                  <SelectItem value="defective">Defectuoso</SelectItem>
                  <SelectItem value="expired">Vencido</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Returns Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5" />
              <span>Devoluciones ({totalItems})</span>
            </CardTitle>
            <CardDescription>
              Lista de devoluciones de implementos de los hospitales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>ID</TableHead>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Coordinador</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((returnItem) => (
                    <TableRow key={returnItem.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <span className="font-mono text-sm">#{returnItem.id}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Hospital className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{returnItem.hospitalName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{returnItem.coordinatorName}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(returnItem.returnDate).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{returnItem.totalItems}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getReasonColor(returnItem.reason)}>
                          {returnItem.reason === 'defective' && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {getReasonLabel(returnItem.reason)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(returnItem.status)}>
                          {getStatusLabel(returnItem.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" className="hover:bg-primary-prosalud-light/10">
                            Ver
                          </Button>
                          {returnItem.status === 'pending' && (
                            <Button variant="ghost" size="sm" className="hover:bg-green-100 text-green-700">
                              Aprobar
                            </Button>
                          )}
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
    </div>
  );
};

export default Returns;
