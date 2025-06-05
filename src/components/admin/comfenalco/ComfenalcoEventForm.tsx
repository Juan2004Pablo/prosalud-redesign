
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { comfenalcoApi } from '@/services/adminApi';
import { ComfenalcoEvent, CreateComfenalcoEventData } from '@/types/admin';

const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  registrationLink: z.string().url('Debe ser una URL válida'),
  formLink: z.string().url('Debe ser una URL válida'),
  category: z.string().min(1, 'La categoría es requerida'),
  displaySize: z.enum(['carousel', 'mosaic']),
  description: z.string().optional(),
  registrationDeadline: z.string().optional(),
  eventDate: z.string().optional(),
});

interface ComfenalcoEventFormProps {
  event?: ComfenalcoEvent | null;
  onClose: () => void;
}

const ComfenalcoEventForm: React.FC<ComfenalcoEventFormProps> = ({ event, onClose }) => {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title || '',
      registrationLink: event?.registrationLink || '',
      formLink: event?.formLink || '',
      category: event?.category || '',
      displaySize: event?.displaySize || 'carousel',
      description: event?.description || '',
      registrationDeadline: event?.registrationDeadline || '',
      eventDate: event?.eventDate || '',
    }
  });

  useEffect(() => {
    if (event && event.bannerImage) {
      setImagePreview(event.bannerImage);
    }
  }, [event]);

  const createMutation = useMutation({
    mutationFn: comfenalcoApi.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comfenalco-events'] });
      toast({
        title: "Experiencia creada",
        description: "La experiencia de Comfenalco ha sido creada exitosamente."
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo crear la experiencia. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<CreateComfenalcoEventData & { isVisible: boolean }>) => 
      comfenalcoApi.updateEvent(event!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comfenalco-events'] });
      toast({
        title: "Experiencia actualizada",
        description: "La experiencia de Comfenalco ha sido actualizada exitosamente."
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar la experiencia. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setBannerImage(null);
    setImagePreview('');
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!event && !bannerImage) {
      toast({
        title: "Error",
        description: "Debes subir una imagen banner.",
        variant: "destructive"
      });
      return;
    }

    const eventData: CreateComfenalcoEventData = {
      title: data.title,
      bannerImage: bannerImage!,
      description: data.description,
      registrationDeadline: data.registrationDeadline,
      eventDate: data.eventDate,
      registrationLink: data.registrationLink,
      formLink: data.formLink,
      category: data.category,
      displaySize: data.displaySize
    };

    if (event) {
      updateMutation.mutate(eventData);
    } else {
      createMutation.mutate(eventData);
    }
  };

  const categories = ['curso', 'experiencia', 'beneficio', 'regalo', 'recreacion'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-500/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 max-w-4xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/10 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {event ? 'Editar Experiencia' : 'Nueva Experiencia'} Comfenalco
              </h1>
            </div>
            <p className="text-lg text-text-gray">
              {event ? 'Modifica los detalles de la experiencia' : 'Crea una nueva experiencia para Comfenalco'}
            </p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>Datos principales de la experiencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  {...form.register('title')}
                  className="mt-1"
                />
                {form.formState.errors.title && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  {...form.register('description')}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoría *</Label>
                  <select
                    id="category"
                    {...form.register('category')}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {form.formState.errors.category && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.category.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="displaySize">Tamaño de visualización *</Label>
                  <select
                    id="displaySize"
                    {...form.register('displaySize')}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="carousel">Carrusel</option>
                    <option value="mosaic">Mosaico</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dates and Links */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Fechas y Enlaces
              </CardTitle>
              <CardDescription>Información de fechas y enlaces relacionados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="registrationDeadline">Fecha límite de registro</Label>
                  <Input
                    id="registrationDeadline"
                    type="date"
                    {...form.register('registrationDeadline')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="eventDate">Fecha del evento</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    {...form.register('eventDate')}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="registrationLink">Enlace de registro *</Label>
                  <Input
                    id="registrationLink"
                    type="url"
                    {...form.register('registrationLink')}
                    placeholder="https://comfenalco.com/registro"
                    className="mt-1"
                  />
                  {form.formState.errors.registrationLink && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.registrationLink.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="formLink">Enlace del formulario *</Label>
                  <Input
                    id="formLink"
                    type="url"
                    {...form.register('formLink')}
                    placeholder="https://forms.comfenalco.com/experiencia"
                    className="mt-1"
                  />
                  {form.formState.errors.formLink && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.formLink.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banner Image */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Imagen Banner</CardTitle>
              <CardDescription>Sube la imagen principal de la experiencia</CardDescription>
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
                      id="banner-upload"
                    />
                    <label htmlFor="banner-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-600">Seleccionar imagen banner</p>
                      <p className="text-sm text-gray-500">JPG, PNG hasta 5MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
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
              className="bg-gradient-to-r from-orange-500 to-red-500"
            >
              {createMutation.isPending || updateMutation.isPending
                ? 'Guardando...'
                : event ? 'Actualizar' : 'Crear'
              } Experiencia
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ComfenalcoEventForm;
