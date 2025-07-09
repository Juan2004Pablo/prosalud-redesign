
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User as UserIcon, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { usersApi } from '@/services/adminApi';
import { User, CreateUserData } from '@/types/admin';
import { nameValidation, emailValidation } from '@/hooks/useFormValidation';
import AdminModal from '@/components/admin/common/AdminModal';

const formSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  isActive: z.boolean().optional(),
});

interface UserFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ open, onOpenChange, user }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      isActive: true,
    }
  });

  // Update form values when user prop changes
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isActive: user.isActive,
      });
    } else {
      form.reset({
        firstName: '',
        lastName: '',
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
        description: "El usuario ha sido creado exitosamente."
      });
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo crear el usuario. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<CreateUserData & { isActive: boolean }>) => 
      usersApi.updateUser(user!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Usuario actualizado",
        description: "El usuario ha sido actualizado exitosamente."
      });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el usuario. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const userData: CreateUserData & { isActive?: boolean } = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      ...(user && { isActive: data.isActive })
    };

    if (user) {
      updateMutation.mutate(userData);
    } else {
      const { isActive, ...createData } = userData;
      createMutation.mutate(createData);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
    }
    onOpenChange(newOpen);
  };

  return (
    <AdminModal
      open={open}
      onOpenChange={handleOpenChange}
      title={user ? 'Editar Usuario' : 'Nuevo Usuario'}
      description={user ? 'Modifica los datos del usuario del sistema' : 'Crea un nuevo usuario para el panel administrativo'}
      size="lg"
      actions={
        <>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={createMutation.isPending || updateMutation.isPending}
            className="bg-primary-prosalud hover:bg-primary-prosalud-dark"
          >
            {createMutation.isPending || updateMutation.isPending
              ? 'Guardando...'
              : user ? 'Actualizar Usuario' : 'Crear Usuario'
            }
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <UserIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold">Información Personal</h3>
          <p className="text-sm text-muted-foreground">Datos básicos del usuario del sistema</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-semibold">
                Nombres *
              </Label>
              <Input
                id="firstName"
                {...form.register('firstName')}
                placeholder="Ej: Juan Carlos"
              />
              {form.formState.errors.firstName && (
                <p className="text-destructive text-sm">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-semibold">
                Apellidos *
              </Label>
              <Input
                id="lastName"
                {...form.register('lastName')}
                placeholder="Ej: García López"
              />
              {form.formState.errors.lastName && (
                <p className="text-destructive text-sm">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Correo Electrónico *
            </Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              placeholder="ejemplo@prosalud.com"
            />
            {form.formState.errors.email && (
              <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>
            )}
          </div>

          {user && (
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary-prosalud" />
                <div>
                  <Label htmlFor="isActive" className="text-sm font-semibold">
                    Estado del Usuario
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Controla si el usuario puede acceder al sistema
                  </p>
                </div>
              </div>
              <Switch
                id="isActive"
                checked={form.watch('isActive')}
                onCheckedChange={(checked) => form.setValue('isActive', checked)}
              />
            </div>
          )}
        </div>
      </div>
    </AdminModal>
  );
};

export default UserFormModal;
