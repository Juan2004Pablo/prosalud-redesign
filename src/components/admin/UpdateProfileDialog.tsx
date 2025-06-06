
import React, { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UpdateProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadUserProfile();
    }
  }, [open]);

  const loadUserProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setProfile({
          firstName: user.user_metadata?.firstName || '',
          lastName: user.user_metadata?.lastName || '',
          email: user.email || ''
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar el perfil del usuario",
        variant: "destructive"
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      toast({
        title: "Error",
        description: "El nombre y apellido son obligatorios",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        email: profile.email,
        data: {
          firstName: profile.firstName.trim(),
          lastName: profile.lastName.trim()
        }
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "¡Éxito!",
          description: "Perfil actualizado correctamente",
          variant: "default",
          className: "border-green-200 bg-green-50 text-green-800"
        });
        onOpenChange(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-primary-prosalud" />
            Actualizar Perfil
          </DialogTitle>
        </DialogHeader>
        
        {isLoadingProfile ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-prosalud"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Nombre
              </Label>
              <Input
                id="firstName"
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                placeholder="Ingresa tu nombre"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Apellido
              </Label>
              <Input
                id="lastName"
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
                placeholder="Ingresa tu apellido"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary-prosalud hover:bg-primary-prosalud-dark"
              >
                {isLoading ? "Actualizando..." : "Actualizar Perfil"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
