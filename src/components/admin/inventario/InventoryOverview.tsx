
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Activity,
  Hospital,
  Shirt,
  Gift,
  Shield,
  Plus,
  Minus,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import QuickActionsDialog from './QuickActionsDialog';
import LowStockDialog from './LowStockDialog';
import HospitalRequestsDialog from './HospitalRequestsDialog';

const InventoryOverview: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | undefined>(undefined);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [lowStockOpen, setLowStockOpen] = useState(false);
  const [hospitalRequestsOpen, setHospitalRequestsOpen] = useState(false);

  const categoryStats = [
    {
      id: 'uniformes',
      name: 'Uniformes',
      icon: Shirt,
      total: 156,
      available: 134,
      reserved: 22,
      products: [
        { name: 'Uniforme Azul - Talla S', stock: 15, min: 10, status: 'ok' },
        { name: 'Uniforme Azul - Talla M', stock: 3, min: 10, status: 'low' },
        { name: 'Uniforme Azul - Talla L', stock: 25, min: 15, status: 'ok' },
        { name: 'Uniforme Verde - Talla S', stock: 1, min: 5, status: 'critical' },
        { name: 'Uniforme Verde - Talla M', stock: 18, min: 10, status: 'ok' },
        { name: 'Uniforme Verde - Talla L', stock: 22, min: 15, status: 'ok' },
        { name: 'Uniforme Blanco - Talla S', stock: 12, min: 8, status: 'ok' },
        { name: 'Uniforme Blanco - Talla M', stock: 20, min: 12, status: 'ok' },
        { name: 'Uniforme Blanco - Talla L', stock: 18, min: 10, status: 'ok' }
      ]
    },
    {
      id: 'tapabocas',
      name: 'Tapabocas',
      icon: Shield,
      total: 2500,
      available: 2340,
      reserved: 160,
      products: [
        { name: 'Tapabocas Quirúrgico', stock: 1200, min: 500, status: 'ok' },
        { name: 'Tapabocas N95', stock: 45, min: 100, status: 'low' },
        { name: 'Tapabocas de Tela', stock: 800, min: 300, status: 'ok' },
        { name: 'Tapabocas Pediátrico', stock: 295, min: 200, status: 'ok' }
      ]
    },
    {
      id: 'batas',
      name: 'Batas',
      icon: Package,
      total: 89,
      available: 76,
      reserved: 13,
      products: [
        { name: 'Bata Blanca - Talla S', stock: 12, min: 8, status: 'ok' },
        { name: 'Bata Blanca - Talla M', stock: 18, min: 12, status: 'ok' },
        { name: 'Bata Blanca - Talla L', stock: 2, min: 8, status: 'critical' },
        { name: 'Bata de Laboratorio - Talla M', stock: 15, min: 10, status: 'ok' },
        { name: 'Bata de Laboratorio - Talla L', stock: 20, min: 12, status: 'ok' }
      ]
    },
    {
      id: 'regalos',
      name: 'Regalos',
      icon: Gift,
      total: 45,
      available: 38,
      reserved: 7,
      products: [
        { name: 'Kit de Bienvenida', stock: 15, min: 10, status: 'ok' },
        { name: 'Termo ProSalud', stock: 8, min: 5, status: 'ok' },
        { name: 'Agenda Corporativa', stock: 12, min: 8, status: 'ok' },
        { name: 'USB Corporativo', stock: 3, min: 6, status: 'low' }
      ]
    }
  ];

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'low': return 'text-amber-600 bg-amber-50';
      case 'ok': return 'text-primary-prosalud bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'low': return 'secondary';
      case 'ok': return 'default';
      default: return 'outline';
    }
  };

  const lowStockItems = [
    { name: 'Uniforme Azul - Talla M', current: 3, min: 10, category: 'Uniformes' },
    { name: 'Bata Blanca - Talla L', current: 2, min: 8, category: 'Batas' },
    { name: 'Tapabocas N95', current: 45, min: 100, category: 'Tapabocas' },
    { name: 'Uniforme Verde - Talla S', current: 1, min: 5, category: 'Uniformes' }
  ];

  const hospitalRequests = [
    { hospital: 'Hospital Marco Fidel Suárez', pending: 3, priority: 'high' },
    { hospital: 'Hospital San Juan de Dios', pending: 2, priority: 'medium' },
    { hospital: 'Hospital La Merced', pending: 1, priority: 'low' }
  ];

  return (
    <div className="space-y-6">
      {/* Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {categoryStats.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary-prosalud-light">
                    <category.icon className="h-6 w-6 text-primary-prosalud" />
                  </div>
                  <Badge variant="outline" className="font-medium">
                    {category.total} total
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Disponible</span>
                      <span className="font-medium text-primary-prosalud">{category.available}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Reservado</span>
                      <span className="font-medium text-gray-600">{category.reserved}</span>
                    </div>
                  </div>
                  <Progress 
                    value={(category.available / category.total) * 100} 
                    className="h-2 mt-3"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Inventory Products Accordion */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2"
        >
          <Card className="h-full border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-primary-prosalud">
                <Package className="h-5 w-5" />
                <span>Inventario por Categoría</span>
              </CardTitle>
              <CardDescription>
                Detalle de productos disponibles por categoría
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible value={expandedCategory} onValueChange={setExpandedCategory}>
                {categoryStats.map((category) => (
                  <AccordionItem key={category.id} value={category.id} className="border-b">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary-prosalud-light">
                          <category.icon className="h-4 w-4 text-primary-prosalud" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{category.name}</p>
                          <p className="text-sm text-gray-600">{category.products.length} productos</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="space-y-2 pl-10">
                        {category.products.map((product, index) => (
                          <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${getStockStatusColor(product.status)}`}>
                            <div className="flex-1">
                              <p className="font-medium text-sm text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-600">Mínimo: {product.min}</p>
                            </div>
                            <div className="text-right flex items-center space-x-2">
                              <span className="font-medium text-lg">{product.stock}</span>
                              <Badge variant={getStockStatusBadge(product.status)} className="text-xs">
                                {product.status === 'critical' ? 'Crítico' : 
                                 product.status === 'low' ? 'Bajo' : 'OK'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-1 space-y-6"
        >
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span>Stock Bajo</span>
              </CardTitle>
              <CardDescription>
                Productos que requieren reposición
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="text-xs">
                      {item.current}/{item.min}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button 
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setLowStockOpen(true)}
              >
                Ver Todo el Stock Bajo
              </Button>
            </CardContent>
          </Card>

          {/* Hospital Requests */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-primary-prosalud">
                <Hospital className="h-5 w-5" />
                <span>Solicitudes por Hospital</span>
              </CardTitle>
              <CardDescription>
                Estado de solicitudes pendientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hospitalRequests.map((request, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{request.hospital}</p>
                    <p className="text-xs text-gray-600">{request.pending} solicitudes pendientes</p>
                  </div>
                  <Badge 
                    variant={request.priority === 'high' ? 'destructive' : 
                            request.priority === 'medium' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {request.priority === 'high' ? 'Alta' : 
                     request.priority === 'medium' ? 'Media' : 'Baja'}
                  </Badge>
                </div>
              ))}
              <Button 
                className="w-full mt-4 bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
                onClick={() => setHospitalRequestsOpen(true)}
              >
                Gestionar Solicitudes
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Dialogs */}
      <QuickActionsDialog open={quickActionsOpen} onOpenChange={setQuickActionsOpen} />
      <LowStockDialog open={lowStockOpen} onOpenChange={setLowStockOpen} />
      <HospitalRequestsDialog open={hospitalRequestsOpen} onOpenChange={setHospitalRequestsOpen} />
    </div>
  );
};

export default InventoryOverview;
