
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Package, 
  Truck, 
  Eye,
  ArrowRight,
  X,
  FileText
} from 'lucide-react';
import ProductForm from './ProductForm';
import NewDeliveryForm from './NewDeliveryForm';
import NewRequestForm from './NewRequestForm';
import { motion } from 'framer-motion';

interface QuickActionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuickActionsDialog: React.FC<QuickActionsDialogProps> = ({ open, onOpenChange }) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const actions = [
    {
      id: 'add-product',
      title: 'Agregar Producto',
      description: 'Registrar un nuevo producto en el inventario',
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      id: 'new-delivery',
      title: 'Nueva Entrega',
      description: 'Registrar una nueva entrega de proveedor',
      icon: Truck,
      color: 'bg-green-500',
    },
    {
      id: 'new-request',
      title: 'Nueva Solicitud',
      description: 'Crear una nueva solicitud de productos',
      icon: FileText,
      color: 'bg-purple-500',
    },
    {
      id: 'view-low-stock',
      title: 'Ver Stock Bajo',
      description: 'Revisar productos con stock bajo',
      icon: Eye,
      color: 'bg-orange-500',
    }
  ];

  const handleActionSelect = (actionId: string) => {
    setSelectedAction(actionId);
  };

  const handleClose = () => {
    setSelectedAction(null);
    onOpenChange(false);
  };

  const renderActionForm = () => {
    switch (selectedAction) {
      case 'add-product':
        return <ProductForm onClose={handleClose} />;
      case 'new-delivery':
        return <NewDeliveryForm onClose={handleClose} onSuccess={handleClose} />;
      case 'new-request':
        return <NewRequestForm onClose={handleClose} onSuccess={handleClose} />;
      case 'view-low-stock':
        // This would typically show a low stock component
        return (
          <div className="p-6">
            <div className="text-center py-8">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Productos con Stock Bajo</h3>
              <p className="text-gray-600">Esta funcionalidad se implementará próximamente.</p>
              <Button onClick={handleClose} className="mt-4">
                Cerrar
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (selectedAction) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {renderActionForm()}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary-prosalud">Acciones Rápidas</DialogTitle>
          <DialogDescription>
            Selecciona una acción para realizar rápidamente
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary-prosalud/30"
                  onClick={() => handleActionSelect(action.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${action.color} bg-opacity-10`}>
                          <Icon className={`h-6 w-6 text-${action.color.split('-')[1]}-600`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickActionsDialog;
