import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/admin';
import { usersApi } from '@/services/adminApi';
import { nameValidation, emailValidation } from '@/hooks/useFormValidation';
import AdminModal from '@/components/admin/common/AdminModal';

const formSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  isActive: z.boolean().optional(),
});

interface UserFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  open,
  onOpenChange,
  user
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      isActive: true,
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

  // Update form values when user prop changes
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      });
    } else {
      form.reset({
        name: '',
        email: '',
        isActive: true,
      });
    }
  }, [user, form]);

  const createMutation = useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Usuario creado",
        description: "El usuario ha sido creado exitosamente.",
      });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo crear el usuario. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => usersApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Usuario actualizado",
        description: "El usuario ha sido actualizado exitosamente.",
      });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el usuario. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const userData: any = {
      name: data.name,
      email: data.email,
      ...(user && { isActive: data.isActive })
    };

    if (user) {
      updateMutation.mutate({ id: user.id, data: userData });
    } else {
      createMutation.mutate(userData);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset();
    }
    onOpenChange(newOpen);
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminModal
      open={open}
      onOpenChange={handleOpenChange}
      title={user ? "Editar Usuario" : "Crear Usuario"}
      description={user ? "Modifica la información del usuario" : "Completa el formulario para crear un nuevo usuario"}
      actions={
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="user-form"
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? "Procesando..." : user ? "Actualizar Usuario" : "Crear Usuario"}
          </Button>
        </div>
      }
    >
      <motion.form
        id="user-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="grid gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Ingrese el nombre completo"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="ejemplo@prosalud.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {user && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  {...register('isActive')}
                />
                <Label htmlFor="isActive">Usuario activo</Label>
              </div>
            )}
          </div>
        </div>
      </motion.form>
    </AdminModal>
  );
};

export default UserFormModal;