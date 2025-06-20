
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Truck, Plus, Search, Calendar, Package, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import DataPagination from '@/components/ui/data-pagination';
import { usePagination } from '@/hooks/usePagination';

interface Delivery {
  id: string;
  supplierName: string;
  deliveryDate: string;
  totalItems: number;
  status: 'pending' | 'received' | 'completed';
  items: Array<{
    productName: string;
    quantity: number;
    received: number;
  }>;
}

const SupplierDeliveries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockDeliveries: Delivery[] = [
    {
      id: '1',
      supplierName: 'MedSupply S.A.S',
      deliveryDate: '2024-01-15',
      totalItems: 150,
      status: 'completed',
      items: [
        { productName: 'Uniforme Azul - Talla M', quantity: 50, received: 50 },
        { productName: 'Uniforme Verde - Talla L', quantity: 30, received: 30 },
        { productName: 'Bata Blanca - Talla S', quantity: 70, received: 70 }
      ]
    },
    {
      id: '2',
      supplierName: 'Textiles ProSalud',
      deliveryDate: '2024-01-18',
      totalItems: 200,
      status: 'received',
      items: [
        { productName: 'Tapabocas N95', quantity: 200, received: 180 }
      ]
    },
    {
      id: '3',
      supplierName: 'Implementos Médicos',
      deliveryDate: '2024-01-20',
      totalItems: 80,
      status: 'pending',
      items: [
        { productName: 'Kit de Bienvenida', quantity: 50, received: 0 },
        { productName: 'Bata de Laboratorio - Talla M', quantity: 30, received: 0 }
      ]
    }
  ];

  const filteredDeliveries = mockDeliveries.filter(delivery =>
    delivery.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData,
    goToPage,
    setItemsPerPage
  } = usePagination({
    data: filteredDeliveries,
    initialItemsPerPage: 10
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-primary-prosalud text-white';
      case 'received': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'received': return 'Recibido';
      case 'pending': return 'Pendiente';
      default: return status;
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
          <h2 className="text-2xl font-bold text-gray-900">Entregas de Proveedores</h2>
          <p className="text-gray-600">Gestiona las entregas y recepciones de inventario</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Entrega
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Entrega</DialogTitle>
              <DialogDescription>
                Registra una nueva entrega de proveedor al inventario
              </DialogDescription>
            </DialogHeader>
            <div className="p-4">
              <p className="text-gray-600">Formulario de nueva entrega - Por implementar</p>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border shadow-sm">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar entregas por proveedor o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Deliveries Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5" />
              <span>Entregas ({totalItems})</span>
            </CardTitle>
            <CardDescription>
              Historial de entregas de proveedores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>ID</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Fecha de Entrega</TableHead>
                    <TableHead>Total Items</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((delivery) => (
                    <TableRow key={delivery.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <span className="font-mono text-sm">#{delivery.id}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{delivery.supplierName}</p>
                          <p className="text-sm text-gray-600">{delivery.items.length} producto{delivery.items.length !== 1 ? 's' : ''}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(delivery.deliveryDate).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{delivery.totalItems}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(delivery.status)}>
                          {delivery.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {getStatusLabel(delivery.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="hover:bg-primary-prosalud-light/10">
                          Ver Detalles
                        </Button>
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

export default SupplierDeliveries;
