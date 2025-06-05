
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Star, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { bienestarApi } from '@/services/adminApi';
import { BienestarEvent, CreateBienestarEventData } from '@/types/admin';

const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  date: z.string().min(1, 'La fecha es requerida'),
  category: z.string().min(1, 'La categoría es requerida'),
  description: z.string().optional(),
  location: z.string().optional(),
  attendees: z.number().optional(),
  gift: z.string().optional(),
  provider: z.string().optional(),
});

interface BienestarEventFormProps {
  event?: BienestarEvent | null;
  onClose: () => void;
}

const BienestarEventForm: React.FC<BienestarEventFormProps> = ({ event, onClose }) => {
  const [images, setImages] = useState<File[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title || '',
      date: event?.date || '',
      category: event?.category || '',
      description: event?.description || '',
      location: event?.location || '',
      attendees: event?.attendees || undefined,
      gift: event?.gift || '',
      provider: event?.provider || 'ProSalud',
    }
  });

  useEffect(() => {
    if (event && event.images.length > 0) {
      const previews = event.images.map(img => img.url);
      setImagePreviews(previews);
      setMainImageIndex(event.images.findIndex(img => img.isMain));
    }
  }, [event]);

  const createMutation = useMutation({
    mutationFn: bienestarApi.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bienestar-events'] });
      toast({
        title: "Evento creado",
        description: "El evento de bienestar ha sido creado exitosamente."
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo crear el evento. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<CreateBienestarEventData & { isVisible: boolean }>) => 
      bienestarApi.updateEvent(event!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bienestar-events'] });
      toast({
        title: "Evento actualizado",
        description: "El evento de bienestar ha sido actualizado exitosamente."
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el evento. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 20) {
      toast({
        title: "Límite excedido",
        description: "Máximo 20 imágenes permitidas.",
        variant: "destructive"
      });
      return;
    }

    setImages(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    if (mainImageIndex === index) {
      setMainImageIndex(0);
    } else if (mainImageIndex > index) {
      setMainImageIndex(prev => prev - 1);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!event && images.length === 0) {
      toast({
        title: "Error",
        description: "Debes subir al menos una imagen.",
        variant: "destructive"
      });
      return;
    }

    // Ensure required fields are present and properly typed
    const eventData: CreateBienestarEventData = {
      title: data.title,
      date: data.date,
      category: data.category,
      description: data.description,
      location: data.location,
      attendees: data.attendees,
      gift: data.gift,
      provider: data.provider || 'ProSalud',
      images,
      mainImageIndex
    };

    if (event) {
      updateMutation.mutate(eventData);
    } else {
      createMutation.mutate(eventData);
    }
  };

  const categories = ['Salud', 'Bienestar', 'Capacitación', 'Recreación', 'Cultura', 'Deporte'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-prosalud-light/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 max-w-4xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-prosalud/5 to-secondary-prosaludgreen/5 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-primary-prosalud/10 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-prosalud to-secondary-prosaludgreen bg-clip-text text-transparent">
                {event ? 'Editar Evento' : 'Nuevo Evento'} de Bienestar
              </h1>
            </div>
            <p className="text-lg text-text-gray">
              {event ? 'Modifica los detalles del evento' : 'Crea un nuevo evento para la galería de bienestar'}
            </p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>Datos principales del evento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="date">Fecha *</Label>
                  <Input
                    id="date"
                    type="date"
                    {...form.register('date')}
                    className="mt-1"
                  />
                  {form.formState.errors.date && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.date.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoría *</Label>
                  <select
                    id="category"
                    {...form.register('category')}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-prosalud"
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
                  <Label htmlFor="provider">Proveedor</Label>
                  <Input
                    id="provider"
                    {...form.register('provider')}
                    placeholder="ProSalud"
                    className="mt-1"
                  />
                </div>
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
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Detalles Adicionales</CardTitle>
              <CardDescription>Información complementaria del evento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    {...form.register('location')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="attendees">Asistentes</Label>
                  <Input
                    id="attendees"
                    type="number"
                    {...form.register('attendees', { valueAsNumber: true })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gift">Obsequio</Label>
                  <Input
                    id="gift"
                    {...form.register('gift')}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Imágenes del Evento
              </CardTitle>
              <CardDescription>Sube entre 1 y 20 imágenes. Marca una como principal.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600">Seleccionar imágenes</p>
                    <p className="text-sm text-gray-500">Máximo 20 imágenes, formatos JPG, PNG</p>
                  </label>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant={mainImageIndex === index ? "default" : "outline"}
                            onClick={() => setMainImageIndex(index)}
                            className="h-8 w-8 p-0"
                          >
                            <Star className={`h-4 w-4 ${mainImageIndex === index ? 'fill-current' : ''}`} />
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => removeImage(index)}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {mainImageIndex === index && (
                          <div className="absolute top-2 left-2 bg-primary-prosalud text-white text-xs px-2 py-1 rounded">
                            Principal
                          </div>
                        )}
                      </div>
                    ))}
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
              className="bg-gradient-to-r from-primary-prosalud to-primary-prosalud-dark"
            >
              {createMutation.isPending || updateMutation.isPending
                ? 'Guardando...'
                : event ? 'Actualizar' : 'Crear'
              } Evento
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BienestarEventForm;
