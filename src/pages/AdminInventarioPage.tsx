
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Truck, 
  RotateCcw, 
  ClipboardList, 
  TrendingDown, 
  AlertTriangle,
  Plus,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import InventoryOverview from '@/components/admin/inventario/InventoryOverview';
import ProductManagement from '@/components/admin/inventario/ProductManagement';
import SupplierDeliveries from '@/components/admin/inventario/SupplierDeliveries';
import Returns from '@/components/admin/inventario/Returns';
import Requests from '@/components/admin/inventario/Requests';

const AdminInventarioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const statsCards = [
    {
      title: 'Total Productos',
      value: '247',
      change: '+12',
      changeType: 'positive' as const,
      icon: Package,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'Stock Bajo',
      value: '8',
      change: '+3',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      color: 'bg-gradient-to-br from-amber-500 to-orange-500'
    },
    {
      title: 'Solicitudes Pendientes',
      value: '15',
      change: '-2',
      changeType: 'positive' as const,
      icon: ClipboardList,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      title: 'Devoluciones',
      value: '3',
      change: '+1',
      changeType: 'neutral' as const,
      icon: RotateCcw,
      color: 'bg-gradient-to-br from-purple-500 to-violet-600'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'deliveries', label: 'Entregas', icon: Truck },
    { id: 'requests', label: 'Solicitudes', icon: ClipboardList },
    { id: 'returns', label: 'Devoluciones', icon: RotateCcw }
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-primary-prosalud-light/10 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestión de Inventario
            </h1>
            <p className="text-gray-600">
              Administra productos, entregas, solicitudes y devoluciones del inventario ProSalud
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="hover:bg-primary-prosalud hover:text-white transition-all duration-200">
              <Package className="h-4 w-4 mr-2" />
              Exportar Reporte
            </Button>
            <Button className="bg-gradient-to-r from-primary-prosalud to-primary-prosalud-dark hover:shadow-lg transition-all duration-200">
              <Plus className="h-4 w-4 mr-2" />
              Acción Rápida
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        { /* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="group cursor-pointer"
            >
              <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <div className={`absolute inset-0 ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Badge 
                          variant={stat.changeType === 'positive' ? 'default' : 
                                  stat.changeType === 'negative' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {stat.change}
                        </Badge>
                        <span className="text-xs text-gray-500">vs. mes anterior</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div> */ }

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm shadow-sm border-0 p-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center space-x-2 data-[state=active]:bg-primary-prosalud data-[state=active]:text-white transition-all duration-200"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <InventoryOverview />
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <ProductManagement />
            </TabsContent>

            <TabsContent value="deliveries" className="space-y-6">
              <SupplierDeliveries />
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <Requests />
            </TabsContent>

            <TabsContent value="returns" className="space-y-6">
              <Returns />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminInventarioPage;
