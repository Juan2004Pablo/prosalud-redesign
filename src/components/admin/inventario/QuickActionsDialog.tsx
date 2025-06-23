
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  Truck, 
  RotateCcw, 
  ClipboardList, 
  Plus,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import NewDeliveryForm from './NewDeliveryForm';
import ProcessReturnForm from './ProcessReturnForm';
import NewRequestForm from './NewRequestForm';
import { useToast } from '@/hooks/use-toast';

interface QuickActionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuickActionsDialog: React.FC<QuickActionsDialogProps> = ({ open, onOpenChange }) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const { toast } = useToast();

  const quickActions = [
    {
      id: 'new-delivery',
      title: 'Registrar Entrega',
      description: 'Registrar nueva entrega de proveedor',
      icon: Truck,
      color: 'bg-blue-500'
    },
    {
      id: 'process-return',
      title: 'Procesar Devolución',
      description: 'Procesar devolución de hospital',
      icon: RotateCcw,
      color: 'bg-orange-500'
    },
    {
      id: 'new-request',
      title: 'Nueva Solicitud',
      description: 'Crear nueva solicitud de hospital',
      icon: ClipboardList,
      color: 'bg-green-500'
    },
    {
      id: 'add-product',
      title: 'Agregar Producto',
      description: 'Agregar nuevo producto al inventario',
      icon: Package,
      color: 'bg-purple-500'
    }
  ];

  const handleActionSelect = (actionId: string) => {
    if (actionId === 'add-product') {
      toast({
        title: "Función en Desarrollo",
        description: "La funcionalidad de agregar productos estará disponible próximamente",
        variant: "default"
      });
      return;
    }
    setSelectedAction(actionId);
  };

  const handleSuccess = () => {
    setSelectedAction(null);
    onOpenChange(false);
    toast({
      title: "Acción Completada",
      description: "La operación se ha realizado exitosamente",
      variant: "default"
    });
  };

  const handleClose = () => {
    setSelectedAction(null);
    onOpenChange(false);
  };

  if (selectedAction === 'new-delivery') {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <NewDeliveryForm onClose={handleClose} onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  if (selectedAction === 'process-return') {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <div className="space-y-6">
            <ProcessReturnForm onClose={handleClose} onSuccess={handleSuccess} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (selectedAction === 'new-request') {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <NewRequestForm onClose={handleClose} onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-primary-prosalud" />
            <span>Acciones Rápidas</span>
          </DialogTitle>
          <DialogDescription>
            Selecciona una acción para realizar operaciones rápidas en el inventario
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border hover:border-primary-prosalud group"
                onClick={() => handleActionSelect(action.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.color} bg-opacity-10`}>
                        <action.icon className={`h-5 w-5 ${action.color.replace('bg-', 'text-')}`} />
                      </div>
                      <span className="text-gray-900">{action.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary-prosalud transition-colors" />
                  </CardTitle>
                  <CardDescription>
                    {action.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickActionsDialog;
