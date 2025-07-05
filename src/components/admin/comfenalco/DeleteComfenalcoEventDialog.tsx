
import React from 'react';
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
import { ComfenalcoEvent } from '@/types/comfenalco';

interface DeleteComfenalcoEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: ComfenalcoEvent | null;
  onConfirm: () => void;
}

const DeleteComfenalcoEventDialog: React.FC<DeleteComfenalcoEventDialogProps> = ({
  open,
  onOpenChange,
  event,
  onConfirm
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar Experiencia?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente la experiencia{' '}
            <strong>"{event?.title}"</strong> y todos sus datos asociados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Eliminar Experiencia
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteComfenalcoEventDialog;
