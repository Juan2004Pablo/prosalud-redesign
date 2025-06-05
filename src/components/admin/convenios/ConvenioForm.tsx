
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { conveniosApi } from '@/services/adminApi';
import { Convenio, CreateConvenioData } from '@/types/admin';

const formSchema = z.object({
  name: z.string().min(1, 'El nombre del convenio es requerido'),
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
        title: "Error",
        description: "Debes subir una imagen del convenio.",
        variant: "destructive"
      });
      return;
    }

    const convenioData: CreateConvenioData = {
      name: data.name,
      image: image!
    };

    if (convenio) {
      updateMutation.mutate(convenioData);
    } else {
      createMutation.mutate(convenioData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-secondary-prosaludgreen/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 max-w-2xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-prosaludgreen/5 to-accent-prosaludteal/5 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-secondary-prosaludgreen/10 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary-prosaludgreen to-accent-prosaludteal bg-clip-text text-transparent">
                {convenio ? 'Editar Convenio' : 'Nuevo Convenio'}
              </h1>
            </div>
            <p className="text-lg text-text-gray">
              {convenio ? 'Modifica los detalles del convenio' : 'Crea un nuevo convenio o alianza estratégica'}
            </p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Información del Convenio
              </CardTitle>
              <CardDescription>Datos básicos del convenio o alianza</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Convenio *</Label>
                <Input
                  id="name"
                  {...form.register('name')}
                  placeholder="Ej: Hospital Marco Fidel Suárez"
                  className="mt-1"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Image */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Imagen del Convenio</CardTitle>
              <CardDescription>Logo o imagen representativa del convenio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-600">Seleccionar imagen</p>
                      <p className="text-sm text-gray-500">JPG, PNG hasta 5MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-contain bg-gray-50 rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={removeImage}
                      className="absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-gradient-to-r from-secondary-prosaludgreen to-accent-prosaludteal"
            >
              {createMutation.isPending || updateMutation.isPending
                ? 'Guardando...'
                : convenio ? 'Actualizar' : 'Crear'
              } Convenio
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ConvenioForm;
