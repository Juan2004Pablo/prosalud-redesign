
import React from 'react';
import ConfirmationModal from '@/components/admin/common/ConfirmationModal';
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
    <ConfirmationModal
      open={open}
      onOpenChange={onOpenChange}
      title="¿Eliminar Experiencia?"
      description="Esta acción no se puede deshacer. Se eliminará permanentemente la experiencia"
      confirmText="Eliminar Experiencia"
      confirmVariant="destructive"
      onConfirm={onConfirm}
      itemName={event?.title}
    />
  );
};

export default DeleteComfenalcoEventDialog;
