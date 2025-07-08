
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, User as UserIcon, Mail, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { usersApi } from '@/services/adminApi';
import { User, CreateUserData } from '@/types/admin';
import { nameValidation, emailValidation } from '@/hooks/useFormValidation';

const formSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  isActive: z.boolean().optional(),
});

interface UserFormProps {
  user?: User | null;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onClose }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      isActive: user?.isActive ?? true,
    }
  });

  const createMutation = useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Usuario creado",
        description: "El usuario ha sido creado exitosamente."
      });
      onClose();
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
      onClose();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header mejorado */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-primary-prosalud">
                  {user ? 'Editar Usuario' : 'Nuevo Usuario'}
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {user ? 'Modifica los datos del usuario del sistema' : 'Crea un nuevo usuario para el panel administrativo'}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Personal */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <UserIcon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Información Personal</CardTitle>
                <CardDescription>Datos básicos del usuario del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold">
                      Nombres *
                    </Label>
                    <Input
                      id="firstName"
                      {...form.register('firstName')}
                      className="h-12"
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
                      className="h-12"
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
                    className="h-12"
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
              </CardContent>
            </Card>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="h-12 px-8"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="h-12 px-8 bg-primary-prosalud hover:bg-primary-prosalud-dark"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? 'Guardando...'
                  : user ? 'Actualizar Usuario' : 'Crear Usuario'
                }
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UserForm;
