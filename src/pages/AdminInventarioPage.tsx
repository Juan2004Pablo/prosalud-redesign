
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

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'deliveries', label: 'Entregas', icon: Truck },
    { id: 'requests', label: 'Solicitudes', icon: ClipboardList },
    { id: 'returns', label: 'Devoluciones', icon: RotateCcw }
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
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
            <Button className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white">
              <Plus className="h-4 w-4 mr-2" />
              Acción Rápida
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm border p-1">
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
