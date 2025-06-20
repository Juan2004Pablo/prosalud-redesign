
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Activity,
  Hospital,
  Shirt,
  Gift,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

const InventoryOverview: React.FC = () => {
  const categoryStats = [
    {
      name: 'Uniformes',
      icon: Shirt,
      total: 156,
      available: 134,
      reserved: 22,
      color: 'bg-blue-100 text-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      name: 'Tapabocas',
      icon: Shield,
      total: 2500,
      available: 2340,
      reserved: 160,
      color: 'bg-green-100 text-green-700',
      iconColor: 'text-green-600'
    },
    {
      name: 'Batas',
      icon: Package,
      total: 89,
      available: 76,
      reserved: 13,
      color: 'bg-purple-100 text-purple-700',
      iconColor: 'text-purple-600'
    },
    {
      name: 'Regalos',
      icon: Gift,
      total: 45,
      available: 38,
      reserved: 7,
      color: 'bg-pink-100 text-pink-700',
      iconColor: 'text-pink-600'
    }
  ];

  const lowStockItems = [
    { name: 'Uniforme Azul - Talla M', current: 3, min: 10, category: 'Uniformes' },
    { name: 'Bata Blanca - Talla L', current: 2, min: 8, category: 'Batas' },
    { name: 'Tapabocas N95', current: 45, min: 100, category: 'Tapabocas' },
    { name: 'Uniforme Verde - Talla S', current: 1, min: 5, category: 'Uniformes' }
  ];

  const recentActivity = [
    { action: 'Entrega recibida', description: 'Uniformes nuevos del proveedor MedSupply', time: '2 horas', type: 'delivery' },
    { action: 'Solicitud aprobada', description: 'Hospital Bello - 15 uniformes', time: '4 horas', type: 'request' },
    { action: 'Devolución procesada', description: 'Hospital Rionegro - 3 batas defectuosas', time: '6 horas', type: 'return' },
    { action: 'Stock actualizado', description: 'Tapabocas - Nueva llegada de 500 unidades', time: '1 día', type: 'update' }
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
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${category.color}`}>
                    <category.icon className={`h-6 w-6 ${category.iconColor}`} />
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
                      <span className="font-medium text-green-600">{category.available}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Reservado</span>
                      <span className="font-medium text-amber-600">{category.reserved}</span>
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
        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-1"
        >
          <Card className="h-full border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
                <span>Stock Bajo</span>
              </CardTitle>
              <CardDescription>
                Productos que requieren reposición
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
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
              <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                Ver Todo el Stock Bajo
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-1"
        >
          <Card className="h-full border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-primary-prosalud">
                <Activity className="h-5 w-5" />
                <span>Actividad Reciente</span>
              </CardTitle>
              <CardDescription>
                Últimas acciones en el inventario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`p-2 rounded-full text-white text-xs ${
                    activity.type === 'delivery' ? 'bg-blue-500' :
                    activity.type === 'request' ? 'bg-green-500' :
                    activity.type === 'return' ? 'bg-purple-500' : 'bg-gray-500'
                  }`}>
                    {activity.type === 'delivery' ? <Package className="h-3 w-3" /> :
                     activity.type === 'request' ? <TrendingUp className="h-3 w-3" /> :
                     <Activity className="h-3 w-3" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">hace {activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Hospital Requests */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="xl:col-span-1"
        >
          <Card className="h-full border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-green-700">
                <Hospital className="h-5 w-5" />
                <span>Solicitudes por Hospital</span>
              </CardTitle>
              <CardDescription>
                Estado de solicitudes pendientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hospitalRequests.map((request, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
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
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                Gestionar Solicitudes
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InventoryOverview;
