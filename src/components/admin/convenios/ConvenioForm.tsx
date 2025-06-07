
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Building, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { conveniosApi } from '@/services/adminApi';
import { Convenio, CreateConvenioData } from '@/types/admin';
import { nameValidation } from '@/hooks/useFormValidation';

const formSchema = z.object({
  name: nameValidation.refine(
    val => val.length >= 3, 
    'El nombre debe tener al menos 3 caracteres'
  ),
});

interface ConvenioFormProps {
  convenio?: Convenio | null;
  onClose: () => void;
}

const ConvenioForm: React.FC<ConvenioFormProps> = ({ convenio, onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: convenio?.name || '',
    }
  });

  useEffect(() => {
    if (convenio && convenio.image) {
      setImagePreview(convenio.image);
    }
  }, [convenio]);

  const createMutation = useMutation({
    mutationFn: conveniosApi.createConvenio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['convenios'] });
      toast({
        title: "Convenio creado",
        description: "El convenio ha sido creado exitosamente."
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo crear el convenio. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<CreateConvenioData & { isVisible: boolean }>) => 
      conveniosApi.updateConvenio(convenio!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['convenios'] });
      toast({
        title: "Convenio actualizado",
        description: "El convenio ha sido actualizado exitosamente."
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el convenio. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño del archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo muy grande",
          description: "La imagen debe ser menor a 5MB.",
          variant: "destructive"
        });
        return;
      }

      // Validar tipo de archivo
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast({
          title: "Formato no válido",
          description: "Solo se permiten archivos JPG, PNG o WebP.",
          variant: "destructive"
        });
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!convenio && !image) {
      toast({
        title: "Imagen requerida",
        description: "Debes subir una imagen del convenio.",
        variant: "destructive"
      });
      return;
    }

    const convenioData: CreateConvenioData = {
      name: data.name.trim(),
      image: image!
    };

    if (convenio) {
      updateMutation.mutate(convenioData);
    } else {
      createMutation.mutate(convenioData);
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
              <Button
                variant="ghost"
                onClick={onClose}
                className="rounded-full h-12 w-12"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <div className="flex-1">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary-prosaludgreen to-accent-prosaludteal bg-clip-text text-transparent">
                  {convenio ? 'Editar Convenio' : 'Nuevo Convenio'}
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {convenio ? 'Modifica los detalles del convenio' : 'Crea un nuevo convenio o alianza estratégica'}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Básica */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-secondary-prosaludgreen to-accent-prosaludteal rounded-full flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Información del Convenio</CardTitle>
                <CardDescription>Datos básicos del convenio o alianza estratégica</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">
                    Nombre del Convenio *
                  </Label>
                  <Input
                    id="name"
                    {...form.register('name')}
                    placeholder="Ej: Hospital Marco Fidel Suárez"
                    className="h-12"
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Imagen del Convenio */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Imagen del Convenio</CardTitle>
                <CardDescription>Logo o imagen representativa del convenio (máximo 5MB)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-xl font-medium text-gray-600 mb-2">Seleccionar imagen</p>
                        <p className="text-sm text-gray-500">JPG, PNG o WebP hasta 5MB</p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-contain bg-gray-50 rounded-xl border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeImage}
                        className="absolute top-4 right-4"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
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
                className="h-12 px-8 bg-gradient-to-r from-secondary-prosaludgreen to-accent-prosaludteal"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? 'Guardando...'
                  : convenio ? 'Actualizar Convenio' : 'Crear Convenio'
                }
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ConvenioForm;
