import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RotateCcw, Plus, Search, Calendar, Package, AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import DataPagination from '@/components/ui/data-pagination';
import { usePagination } from '@/hooks/usePagination';
import ProcessReturnForm from './ProcessReturnForm';
import { useToast } from '@/hooks/use-toast';

interface Return {
  id: string;
  hospitalName: string;
  returnDate: string;
  reason: string;
  totalItems: number;
  status: 'pending' | 'processed' | 'rejected';
  items: Array<{
    productName: string;
    quantity: number;
  }>;
}

const Returns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showProcessReturnForm, setShowProcessReturnForm] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<Return | null>(null);
  const [returns, setReturns] = useState<Return[]>([
    {
      id: '1',
      hospitalName: 'Hospital Marco Fidel Suárez',
      returnDate: '2024-01-22',
      reason: 'Defectuoso',
      totalItems: 3,
      status: 'pending',
      items: [
        { productName: 'Uniforme Azul - Talla M', quantity: 1 },
        { productName: 'Bata Blanca - Talla L', quantity: 2 }
      ]
    },
    {
      id: '2',
      hospitalName: 'Hospital San Juan de Dios',
      returnDate: '2024-01-21',
      reason: 'No Necesario',
      totalItems: 10,
      status: 'processed',
      items: [
        { productName: 'Tapabocas N95', quantity: 10 }
      ]
    },
    {
      id: '3',
      hospitalName: 'Hospital La Merced',
      returnDate: '2024-01-20',
      reason: 'Dañado',
      totalItems: 5,
      status: 'pending',
      items: [
        { productName: 'Kit de Bienvenida', quantity: 5 }
      ]
    }
  ]);
  
  const { toast } = useToast();

  const filteredReturns = returns.filter(returnItem =>
    returnItem.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    returnItem.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    returnItem.id.toLowerCase().includes(searchTerm.toLowerCase())
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
    data: filteredReturns,
    initialItemsPerPage: 10
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processed': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'processed': return 'Procesado';
      case 'rejected': return 'Rechazado';
      default: return status;
    }
  };

  const handleViewDetails = (returnItem: Return) => {
    setSelectedReturn(returnItem);
    toast({
      title: "Devolución Visualizada",
      description: `Mostrando detalles de la devolución #${returnItem.id}`,
      variant: "default"
    });
  };

  const handleProcessReturn = (returnItem: Return) => {
    setReturns(prevReturns => 
      prevReturns.map(r => 
        r.id === returnItem.id 
          ? { ...r, status: 'processed' as const }
          : r
      )
    );
    
    toast({
      title: "Devolución Procesada",
      description: `La devolución #${returnItem.id} ha sido procesada exitosamente`,
      variant: "success"
    });
  };

  const handleNewReturnSuccess = () => {
    setShowProcessReturnForm(false);
    toast({
      title: "Devolución Registrada",
      description: "La nueva devolución ha sido registrada exitosamente en el sistema",
      variant: "success"
    });
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
          <h2 className="text-2xl font-bold text-gray-900">Gestionar Devoluciones</h2>
          <p className="text-gray-600">Administra las devoluciones de implementos médicos</p>
        </div>
        <Button 
          className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
          onClick={() => setShowProcessReturnForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Devolución
        </Button>
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
                placeholder="Buscar devoluciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
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
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5" />
              <span>Devoluciones ({totalItems})</span>
            </CardTitle>
            <CardDescription>
              Gestión de devoluciones de implementos médicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>ID</TableHead>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Items</TableHead>
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
                        <span className="font-medium text-gray-900">{returnItem.hospitalName}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(returnItem.returnDate).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{returnItem.reason}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{returnItem.totalItems}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(returnItem.status)}>
                          {getStatusLabel(returnItem.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewDetails(returnItem)}
                            className="text-gray-600 hover:text-gray-600 hover:bg-gray-100"
                          >
                            Ver
                          </Button>
                          {returnItem.status === 'pending' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleProcessReturn(returnItem)}
                              className="text-blue-600 hover:text-blue-600 hover:bg-blue-50"
                            >
                              Procesar
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

      {/* Process Return Form Dialog */}
      <Dialog open={showProcessReturnForm} onOpenChange={setShowProcessReturnForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <ProcessReturnForm 
            onClose={() => setShowProcessReturnForm(false)}
            onSuccess={handleNewReturnSuccess}
          />
        </DialogContent>
      </Dialog>

      {/* Return Details Dialog */}
      {selectedReturn && (
        <Dialog open={!!selectedReturn} onOpenChange={() => setSelectedReturn(null)}>
          <DialogContent className="max-w-2xl bg-white">
            <div className="bg-white min-h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-prosalud/10 p-2 rounded-lg">
                    <RotateCcw className="h-6 w-6 text-primary-prosalud" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Detalles de Devolución #{selectedReturn.id}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Información detallada de la devolución
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedReturn(null)}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <CardTitle className="text-lg font-semibold text-gray-900">Información General</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Hospital</label>
                        <p className="text-gray-900 bg-gray-50 p-2 rounded border">{selectedReturn.hospitalName}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Fecha de Devolución</label>
                        <p className="text-gray-900 bg-gray-50 p-2 rounded border">{new Date(selectedReturn.returnDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Motivo de la Devolución</label>
                      <p className="text-gray-900 bg-gray-50 p-2 rounded border">{selectedReturn.reason}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <CardTitle className="text-lg font-semibold text-gray-900">Productos Devueltos</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {selectedReturn.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                          <span className="font-medium text-gray-900">{item.productName}</span>
                          <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded border">
                            Cantidad: {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <Button variant="outline" onClick={() => setSelectedReturn(null)}>
                    Cerrar
                  </Button>
                  {selectedReturn.status === 'pending' && (
                    <Button 
                      onClick={() => {
                        handleProcessReturn(selectedReturn);
                        setSelectedReturn(null);
                      }}
                      className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
                    >
                      Procesar Devolución
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Returns;
