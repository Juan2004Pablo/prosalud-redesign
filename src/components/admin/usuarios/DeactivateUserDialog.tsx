
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { useToast } from '@/hooks/use-toast';
import { usersApi } from '@/services/adminApi';
import { User } from '@/types/admin';

interface DeactivateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

const DeactivateUserDialog: React.FC<DeactivateUserDialogProps> = ({
  open,
  onOpenChange,
  user
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deactivateMutation = useMutation({
    mutationFn: (userId: string) => 
      usersApi.updateUser(userId, { isActive: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Usuario desactivado",
        description: "El usuario ha sido desactivado exitosamente."
      });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo desactivar el usuario. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const activateMutation = useMutation({
    mutationFn: (userId: string) => 
      usersApi.updateUser(userId, { isActive: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Usuario activado",
        description: "El usuario ha sido activado exitosamente."
      });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo activar el usuario. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const handleConfirm = () => {
    if (!user) return;
    
    if (user.isActive) {
      deactivateMutation.mutate(user.id);
    } else {
      activateMutation.mutate(user.id);
    }
  };

  if (!user) return null;

  const isActive = user.isActive;
  const action = isActive ? 'desactivar' : 'activar';
  const actionCapitalized = isActive ? 'Desactivar' : 'Activar';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {actionCapitalized} Usuario
          </AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas {action} al usuario <strong>{user.firstName} {user.lastName}</strong>?
            {isActive 
              ? ' El usuario no podrá acceder al sistema una vez desactivado.'
              : ' El usuario podrá acceder al sistema una vez activado.'
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deactivateMutation.isPending || activateMutation.isPending}
            className={isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
          >
            {deactivateMutation.isPending || activateMutation.isPending
              ? 'Procesando...'
              : actionCapitalized
            }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeactivateUserDialog;
