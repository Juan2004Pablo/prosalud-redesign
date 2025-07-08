
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onConfirm: () => void;
  itemName?: string; // Para destacar el nombre del elemento
  showAssociatedDataWarning?: boolean; // Para controlar si mostrar el texto de datos asociados
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirmar',
  confirmVariant = 'destructive',
  onConfirm,
  itemName,
  showAssociatedDataWarning = true
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`bg-white`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {itemName ? (
              <>
                {description}{' '}
                <strong>"{itemName}"</strong>
                {showAssociatedDataWarning && ' y todos sus datos asociados'}.
              </>
            ) : (
              description
            )}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button 
            onClick={onConfirm}
            variant={confirmVariant}
            className={confirmVariant === 'destructive' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
