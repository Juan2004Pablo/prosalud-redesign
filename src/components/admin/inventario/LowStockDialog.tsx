import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Search, Package, Truck, Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface LowStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface LowStockItem {
  id: string;
  name: string;
  category: string;
  current: number;
  min: number;
  max: number;
  status: 'critical' | 'low';
  lastOrder: string;
  supplier: string;
}

const LowStockDialog: React.FC<LowStockDialogProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreatingMassiveOrder, setIsCreatingMassiveOrder] = useState(false);
  const { toast } = useToast();

  const lowStockItems: LowStockItem[] = [
    { 
      id: '1',
      name: 'Uniforme Azul - Talla M', 
      category: 'Uniformes',
      current: 3, 
      min: 10, 
      max: 50,
      status: 'critical',
      lastOrder: '2024-01-10',
      supplier: 'MedSupply S.A.S'
    },
    { 
      id: '2',
      name: 'Bata Blanca - Talla L', 
      category: 'Batas',
      current: 2, 
      min: 8, 
      max: 30,
      status: 'critical',
      lastOrder: '2024-01-08',
      supplier: 'Textiles ProSalud'
    },
    { 
      id: '3',
      name: 'Tapabocas N95', 
      category: 'Tapabocas',
      current: 45, 
      min: 100, 
      max: 500,
      status: 'low',
      lastOrder: '2024-01-15',
      supplier: 'Implementos Médicos'
    },
    { 
      id: '4',
      name: 'Uniforme Verde - Talla S', 
      category: 'Uniformes',
      current: 1, 
      min: 5, 
      max: 25,
      status: 'critical',
      lastOrder: '2024-01-05',
      supplier: 'MedSupply S.A.S'
    },
    { 
      id: '5',
      name: 'USB Corporativo', 
      category: 'Regalos',
      current: 3, 
      min: 6, 
      max: 20,
      status: 'low',
      lastOrder: '2023-12-20',
      supplier: 'Promocionales ABC'
    }
  ];

  const filteredItems = lowStockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'low': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'critical': return 'Crítico';
      case 'low': return 'Bajo';
      default: return status;
    }
  };

  const getRecommendedOrder = (item: LowStockItem) => {
    return Math.ceil((item.max - item.current) / 10) * 10;
  };

  const handleCreateOrder = async (item: LowStockItem) => {
    try {
      const recommendedQuantity = getRecommendedOrder(item);
      
      // Simulamos la creación de la orden
      console.log(`Creando orden para: ${item.name}`, {
        productId: item.id,
        productName: item.name,
        supplier: item.supplier,
        quantity: recommendedQuantity,
        currentStock: item.current,
        minStock: item.min
      });

      toast({
        title: "Orden creada exitosamente",
        description: `Se ha creado una orden de ${recommendedQuantity} unidades de ${item.name} con el proveedor ${item.supplier}.`,
      });

    } catch (error) {
      toast({
        title: "Error al crear la orden",
        description: "No se pudo crear la orden. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  };

  const handleCreateMassiveOrders = async () => {
    setIsCreatingMassiveOrder(true);
    
    try {
      // Simulamos la creación de órdenes masivas
      const orders = filteredItems.map(item => ({
        productId: item.id,
        productName: item.name,
        supplier: item.supplier,
        quantity: getRecommendedOrder(item),
        currentStock: item.current,
        minStock: item.min
      }));

      console.log('Creando órdenes masivas:', orders);

      // Simular tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Órdenes masivas creadas",
        description: `Se han creado ${orders.length} órdenes de compra exitosamente.`,
      });

      // Opcional: cerrar el diálogo después de crear las órdenes
      // onOpenChange(false);

    } catch (error) {
      toast({
        title: "Error al crear órdenes masivas",
        description: "No se pudieron crear las órdenes. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsCreatingMassiveOrder(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <span>Productos con Stock Bajo</span>
          </DialogTitle>
          <DialogDescription>
            Gestiona los productos que requieren reposición urgente
          </DialogDescription>
        </DialogHeader>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="critical">Crítico</SelectItem>
              <SelectItem value="low">Bajo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-red-600">Stock Crítico</p>
                <p className="text-2xl font-bold text-red-700">
                  {filteredItems.filter(item => item.status === 'critical').length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-amber-50 border border-amber-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-amber-600" />
              <div>
                <p className="text-sm text-amber-600">Stock Bajo</p>
                <p className="text-2xl font-bold text-amber-700">
                  {filteredItems.filter(item => item.status === 'low').length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <Truck className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600">Órdenes Sugeridas</p>
                <p className="text-2xl font-bold text-blue-700">{filteredItems.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Items Table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Stock Actual</TableHead>
                <TableHead>Stock Mínimo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Último Pedido</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">ID: {item.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${item.status === 'critical' ? 'text-red-600' : 'text-amber-600'}`}>
                      {item.current}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{item.min}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusLabel(item.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {new Date(item.lastOrder).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{item.supplier}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        size="sm"
                        className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white shadow-sm"
                        onClick={() => handleCreateOrder(item)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Pedir {getRecommendedOrder(item)}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center pt-4">
          <p className="text-sm text-gray-600">
            Mostrando {filteredItems.length} productos con stock bajo
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cerrar
            </Button>
            <Button 
              className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
              onClick={handleCreateMassiveOrders}
              disabled={isCreatingMassiveOrder || filteredItems.length === 0}
            >
              <Truck className="h-4 w-4 mr-2" />
              {isCreatingMassiveOrder ? 'Creando Órdenes...' : 'Crear Órdenes Masivas'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LowStockDialog;
