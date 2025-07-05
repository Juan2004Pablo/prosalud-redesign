
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Trash2, X } from 'lucide-react';
import ConvenioForm from './ConvenioForm';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface ConvenioFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  convenio?: any | null;
}

const ConvenioFormModal: React.FC<ConvenioFormModalProps> = ({ 
  open, 
  onOpenChange,
  convenio = null 
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSuccess = () => {
    toast({
      title: convenio ? "Convenio Actualizado" : "Convenio Creado",
      description: convenio 
        ? "El convenio ha sido actualizado exitosamente." 
        : "El convenio ha sido creado exitosamente.",
    });
    handleClose();
  };

  const handleDelete = () => {
    // Here you would typically call an API to delete the convenio
    toast({
      title: "Convenio Eliminado",
      description: "El convenio ha sido eliminado exitosamente.",
    });
    setDeleteDialogOpen(false);
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            {convenio && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeleteDialogOpen(true)}
                className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <DialogHeader className="pr-16">
            <DialogTitle className="text-2xl font-bold text-primary-prosalud">
              {convenio ? 'Editar Convenio' : 'Nuevo Convenio'}
            </DialogTitle>
            <DialogDescription>
              {convenio 
                ? 'Modifica los detalles del convenio existente.' 
                : 'Crea un nuevo convenio para mostrar en el sitio web.'
              }
            </DialogDescription>
          </DialogHeader>

          <ConvenioForm 
            onClose={handleClose} 
            onSuccess={handleSuccess}
            convenio={convenio}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar Convenio?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el convenio{' '}
              <strong>"{convenio?.name}"</strong> y todos sus datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar Convenio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConvenioFormModal;
