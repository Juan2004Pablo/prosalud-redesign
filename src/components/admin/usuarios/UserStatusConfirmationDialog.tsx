
import React from 'react';
import ConfirmationModal from '@/components/admin/common/ConfirmationModal';
import { User } from '@/types/admin';

interface UserStatusConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  newStatus: boolean;
  onConfirm: () => void;
}

const UserStatusConfirmationDialog: React.FC<UserStatusConfirmationDialogProps> = ({
  open,
  onOpenChange,
  user,
  newStatus,
  onConfirm
}) => {
  if (!user) return null;

  const action = newStatus ? 'activar' : 'inactivar';
  const actionPast = newStatus ? 'activado' : 'inactivado';

  return (
    <ConfirmationModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${action.charAt(0).toUpperCase() + action.slice(1)} Usuario`}
      description={`¿Estás seguro de que deseas ${action} al usuario`}
      confirmText={`${action.charAt(0).toUpperCase() + action.slice(1)} Usuario`}
      confirmVariant="default"
      onConfirm={onConfirm}
      itemName={`${user.firstName} ${user.lastName}`}
    />
  );
};

export default UserStatusConfirmationDialog;
