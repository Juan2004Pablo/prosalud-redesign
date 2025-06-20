
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Truck, 
  ClipboardList, 
  RotateCcw, 
  Plus,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import NewDeliveryForm from './NewDeliveryForm';
import NewRequestForm from './NewRequestForm';
import ProcessReturnForm from './ProcessReturnForm';

interface QuickActionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuickActionsDialog: React.FC<QuickActionsDialogProps> = ({ open, onOpenChange }) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<string | null>(null);

  const quickActions = [
    {
      id: 'new-delivery',
      title: 'Nueva Entrega',
      description: 'Registrar productos recibidos del proveedor',
      icon: Truck,
      color: 'text-primary-prosalud',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'create-request',
      title: 'Nueva Solicitud',
      description: 'Crear solicitud de implementos para hospital',
      icon: ClipboardList,
      color: 'text-primary-prosalud',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'process-return',
      title: 'Procesar Devolución',
      description: 'Registrar devolución de implementos',
      icon: RotateCcw,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'add-product',
      title: 'Nuevo Producto',
      description: 'Agregar nuevo producto al catálogo',
      icon: Plus,
      color: 'text-primary-prosalud',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'stock-adjustment',
      title: 'Ajuste de Inventario',
      description: 'Corregir cantidades en el inventario',
      icon: TrendingUp,
      color: 'text-primary-prosalud',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'urgent-alert',
      title: 'Alerta Urgente',
      description: 'Notificar sobre stock crítico o emergencia',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  const handleActionSelect = (actionId: string) => {
    if (actionId === 'new-delivery' || actionId === 'create-request' || actionId === 'process-return') {
      setShowForm(actionId);
    } else {
      setSelectedAction(actionId);
      console.log(`Acción seleccionada: ${actionId}`);
      
      // Simular procesamiento
      setTimeout(() => {
        setSelectedAction(null);
        onOpenChange(false);
      }, 1500);
    }
  };

  const handleFormClose = () => {
    setShowForm(null);
    onOpenChange(false);
  };

  const renderForm = () => {
    switch (showForm) {
      case 'new-delivery':
        return <NewDeliveryForm onClose={handleFormClose} />;
      case 'create-request':
        return <NewRequestForm onClose={handleFormClose} />;
      case 'process-return':
        return <ProcessReturnForm onClose={handleFormClose} />;
      default:
        return null;
    }
  };

  if (showForm) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          {renderForm()}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-primary-prosalud" />
            <span>Acciones Rápidas de Inventario</span>
          </DialogTitle>
          <DialogDescription>
            Selecciona una acción para realizar operaciones rápidas en el inventario
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${action.borderColor} ${
                  selectedAction === action.id ? 'ring-2 ring-primary-prosalud' : ''
                }`}
                onClick={() => handleActionSelect(action.id)}
              >
                <CardContent className="p-6">
                  <div className={`p-3 rounded-lg ${action.bgColor} mb-4 w-fit`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                  
                  {selectedAction === action.id ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Procesando...</span>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full hover:bg-primary-prosalud hover:text-white"
                    >
                      Ejecutar
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Acciones Recientes</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Entrega registrada - MedSupply S.A.S</span>
              <Badge variant="outline" className="text-xs">Hace 2 horas</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Solicitud aprobada - Hospital Bello</span>
              <Badge variant="outline" className="text-xs">Hace 4 horas</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Producto agregado - Uniforme XL Azul</span>
              <Badge variant="outline" className="text-xs">Hace 1 día</Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickActionsDialog;
