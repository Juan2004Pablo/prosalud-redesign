
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Package, 
  Truck, 
  RotateCcw, 
  ClipboardList, 
  Plus,
  BarChart3,
  FileText,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import InventoryOverview from '@/components/admin/inventario/InventoryOverview';
import ProductManagement from '@/components/admin/inventario/ProductManagement';
import SupplierDeliveries from '@/components/admin/inventario/SupplierDeliveries';
import Returns from '@/components/admin/inventario/Returns';
import Requests from '@/components/admin/inventario/Requests';
import QuickActionsDialog from '@/components/admin/inventario/QuickActionsDialog';
import ExportReportDialog from '@/components/admin/inventario/ExportReportDialog';
import NewRequestForm from '@/components/admin/inventario/NewRequestForm';

const AdminInventarioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [exportReportOpen, setExportReportOpen] = useState(false);
  const [newRequestOpen, setNewRequestOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'deliveries', label: 'Entregas', icon: Truck },
    { id: 'requests', label: 'Solicitudes', icon: ClipboardList },
    { id: 'returns', label: 'Devoluciones', icon: RotateCcw }
  ];

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

  const handleNewRequestSuccess = () => {
    setNewRequestOpen(false);
    setActiveTab('requests');
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
          <motion.div variants={itemVariants}>
            <Card className="border shadow-sm">
              <CardHeader className="pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-prosalud/10 p-3 rounded-lg">
                      <Package className="h-8 w-8 text-primary-prosalud" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary-prosalud">
                        Gestión de Inventario
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Administra productos, entregas, solicitudes y devoluciones del inventario ProSalud
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => setExportReportOpen(true)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Exportar Reporte
                    </Button>
                    <Button 
                      onClick={() => setQuickActionsOpen(true)}
                      className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Acción Rápida
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Nueva Solicitud - Sección más sutil */}
          <motion.div variants={itemVariants}>
            <Card className="border border-primary-prosalud/20 bg-primary-prosalud/5 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="h-5 w-5 text-primary-prosalud" />
                    <div>
                      <h3 className="font-semibold text-primary-prosalud">Solicitar Productos</h3>
                      <p className="text-sm text-gray-600 mt-0.5">Crea una nueva solicitud de productos para hospitales</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setNewRequestOpen(true)}
                      className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva Solicitud
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setActiveTab('requests')}
                      className="border-primary-prosalud text-primary-prosalud hover:bg-primary-prosalud hover:text-white"
                    >
                      Ver Solicitudes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <div className="p-6 pb-0">
                    <TabsList className="grid w-full grid-cols-5 bg-gray-50 border p-1">
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
                  </div>

                  <div className="p-6 pt-0">
                    <TabsContent value="overview" className="space-y-6 mt-0">
                      <InventoryOverview />
                    </TabsContent>

                    <TabsContent value="products" className="space-y-6 mt-0">
                      <ProductManagement />
                    </TabsContent>

                    <TabsContent value="deliveries" className="space-y-6 mt-0">
                      <SupplierDeliveries />
                    </TabsContent>

                    <TabsContent value="requests" className="space-y-6 mt-0">
                      <Requests />
                    </TabsContent>

                    <TabsContent value="returns" className="space-y-6 mt-0">
                      <Returns />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dialogs */}
          <QuickActionsDialog open={quickActionsOpen} onOpenChange={setQuickActionsOpen} />
          <ExportReportDialog open={exportReportOpen} onOpenChange={setExportReportOpen} />
          
          {/* Dialog para Nueva Solicitud */}
          {newRequestOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNewRequestOpen(false)}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-6">
                  <NewRequestForm 
                    onClose={() => setNewRequestOpen(false)} 
                    onSuccess={handleNewRequestSuccess}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminInventarioPage;
