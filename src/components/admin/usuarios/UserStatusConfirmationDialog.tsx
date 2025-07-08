
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmationModal from '@/components/admin/common/ConfirmationModal';
import { useToast } from '@/hooks/use-toast';
import { usersApi } from '@/services/adminApi';
import { User } from '@/types/admin';

interface UserStatusConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

const UserStatusConfirmationDialog: React.FC<UserStatusConfirmationDialogProps> = ({
  open,
  onOpenChange,
  user
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const toggleStatusMutation = useMutation({
    mutationFn: (userId: string) => usersApi.toggleUserStatus(userId),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      const action = updatedUser.isActive ? 'activado' : 'desactivado';
      toast({
        title: `Usuario ${action}`,
        description: `El usuario ha sido ${action} exitosamente.`
      });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo cambiar el estado del usuario. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const handleConfirm = () => {
    if (!user) return;
    toggleStatusMutation.mutate(user.id);
  };

  if (!user) return null;

  const action = user.isActive ? 'desactivar' : 'activar';
  const actionCapitalized = user.isActive ? 'Desactivar' : 'Activar';

  return (
    <ConfirmationModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${actionCapitalized} Usuario`}
      description={`¿Estás seguro de que deseas ${action} al usuario`}
      confirmText={toggleStatusMutation.isPending ? 'Procesando...' : `${actionCapitalized} Usuario`}
      confirmVariant={user.isActive ? "destructive" : "default"}
      onConfirm={handleConfirm}
      itemName={`${user.firstName} ${user.lastName}`}
      showAssociatedDataWarning={false}
    />
  );
};

export default UserStatusConfirmationDialog;
