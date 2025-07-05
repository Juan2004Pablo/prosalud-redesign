
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trophy, MapPin, Phone, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import AdminModal from '@/components/admin/common/AdminModal';

const convenioSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  location: z.string().min(2, 'La ubicación es requerida'),
  phone: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
});

type ConvenioFormData = z.infer<typeof convenioSchema>;

interface ConvenioFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConvenioFormModal: React.FC<ConvenioFormModalProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();

  const form = useForm<ConvenioFormData>({
    resolver: zodResolver(convenioSchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      phone: '',
      email: '',
      website: '',
    }
  });

  const onSubmit = (data: ConvenioFormData) => {
    // Aquí iría la lógica para crear el convenio
    console.log('Crear convenio:', data);
    toast({
      title: "Convenio creado",
      description: "El convenio ha sido creado exitosamente."
    });
    form.reset();
    onOpenChange(false);
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
      title="Nuevo Convenio"
      description="Crea un nuevo convenio para la organización"
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
            className="bg-primary-prosalud hover:bg-primary-prosalud-dark"
          >
            Crear Convenio
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold">Información del Convenio</h3>
          <p className="text-sm text-muted-foreground">Datos básicos del nuevo convenio</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              Nombre del Convenio *
            </Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Ej: Hospital La Merced"
            />
            {form.formState.errors.name && (
              <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">
              Descripción *
            </Label>
            <Textarea
              id="description"
              {...form.register('description')}
              placeholder="Describe los servicios y beneficios del convenio..."
              rows={3}
            />
            {form.formState.errors.description && (
              <p className="text-destructive text-sm">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Ubicación *
            </Label>
            <Input
              id="location"
              {...form.register('location')}
              placeholder="Ej: Ciudad Bolívar, Antioquia"
            />
            {form.formState.errors.location && (
              <p className="text-destructive text-sm">{form.formState.errors.location.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Teléfono
              </Label>
              <Input
                id="phone"
                {...form.register('phone')}
                placeholder="Ej: (604) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder="contacto@convenio.com"
              />
              {form.formState.errors.email && (
                <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Sitio Web
            </Label>
            <Input
              id="website"
              {...form.register('website')}
              placeholder="https://www.convenio.com"
            />
            {form.formState.errors.website && (
              <p className="text-destructive text-sm">{form.formState.errors.website.message}</p>
            )}
          </div>
        </div>
      </div>
    </AdminModal>
  );
};

export default ConvenioFormModal;
