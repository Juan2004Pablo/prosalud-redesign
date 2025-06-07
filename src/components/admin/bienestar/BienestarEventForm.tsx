
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Star, Image as ImageIcon, MapPin, Users, Gift } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { bienestarApi } from '@/services/adminApi';
import { BienestarEvent, CreateBienestarEventData } from '@/types/admin';
import { nameValidation, textValidation, categoryValidation, numberValidation } from '@/hooks/useFormValidation';

const formSchema = z.object({
  title: nameValidation.min(5, 'El título debe tener al menos 5 caracteres'),
  date: z.string().min(1, 'La fecha es requerida'),
  category: categoryValidation,
  description: textValidation.optional(),
  location: z.string().max(100, 'Máximo 100 caracteres').optional(),
  attendees: numberValidation(1, 10000).optional(),
  gift: z.string().max(100, 'Máximo 100 caracteres').optional(),
  provider: z.string().max(50, 'Máximo 50 caracteres').optional(),
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

    // Validar cada archivo
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo muy grande",
          description: `La imagen ${file.name} debe ser menor a 5MB.`,
          variant: "destructive"
        });
        return;
      }

      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast({
          title: "Formato no válido",
          description: `Solo se permiten archivos JPG, PNG o WebP.`,
          variant: "destructive"
        });
        return;
      }
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
        title: "Imágenes requeridas",
        description: "Debes subir al menos una imagen.",
        variant: "destructive"
      });
      return;
    }

    const eventData: CreateBienestarEventData = {
      title: data.title.trim(),
      date: data.date,
      category: data.category,
      description: data.description?.trim(),
      location: data.location?.trim(),
      attendees: data.attendees,
      gift: data.gift?.trim(),
      provider: data.provider?.trim() || 'ProSalud',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-prosalud to-secondary-prosaludgreen bg-clip-text text-transparent">
                  {event ? 'Editar Evento' : 'Nuevo Evento'} de Bienestar
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {event ? 'Modifica los detalles del evento' : 'Crea un nuevo evento para la galería de bienestar'}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Básica */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-prosalud to-secondary-prosaludgreen rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Información Básica</CardTitle>
                <CardDescription>Datos principales del evento de bienestar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold">
                      Título del Evento *
                    </Label>
                    <Input
                      id="title"
                      {...form.register('title')}
                      className="h-12"
                      placeholder="Ej: Jornada de Vacunación 2024"
                    />
                    {form.formState.errors.title && (
                      <p className="text-destructive text-sm">{form.formState.errors.title.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-semibold">
                      Fecha del Evento *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      {...form.register('date')}
                      className="h-12"
                    />
                    {form.formState.errors.date && (
                      <p className="text-destructive text-sm">{form.formState.errors.date.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-semibold">
                      Categoría *
                    </Label>
                    <select
                      id="category"
                      {...form.register('category')}
                      className="w-full h-12 px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {form.formState.errors.category && (
                      <p className="text-destructive text-sm">{form.formState.errors.category.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider" className="text-sm font-semibold">
                      Proveedor/Organizador
                    </Label>
                    <Input
                      id="provider"
                      {...form.register('provider')}
                      placeholder="ProSalud"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold">
                    Descripción del Evento
                  </Label>
                  <Textarea
                    id="description"
                    {...form.register('description')}
                    rows={4}
                    className="resize-none"
                    placeholder="Describe los detalles del evento de bienestar..."
                  />
                  {form.formState.errors.description && (
                    <p className="text-destructive text-sm">{form.formState.errors.description.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detalles Adicionales */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Detalles Adicionales</CardTitle>
                <CardDescription>Información complementaria del evento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Ubicación
                    </Label>
                    <Input
                      id="location"
                      {...form.register('location')}
                      className="h-12"
                      placeholder="Ej: Sede Principal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendees" className="text-sm font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Asistentes
                    </Label>
                    <Input
                      id="attendees"
                      type="number"
                      min="1"
                      max="10000"
                      {...form.register('attendees', { valueAsNumber: true })}
                      className="h-12"
                      placeholder="150"
                    />
                    {form.formState.errors.attendees && (
                      <p className="text-destructive text-sm">{form.formState.errors.attendees.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gift" className="text-sm font-semibold flex items-center gap-2">
                      <Gift className="h-4 w-4" />
                      Obsequio
                    </Label>
                    <Input
                      id="gift"
                      {...form.register('gift')}
                      className="h-12"
                      placeholder="Ej: Kit de bienestar"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Imágenes */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Imágenes del Evento</CardTitle>
                <CardDescription>Sube entre 1 y 20 imágenes. Marca una como principal (máximo 5MB cada una)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-xl font-medium text-gray-600 mb-2">Seleccionar imágenes</p>
                      <p className="text-sm text-gray-500">Máximo 20 imágenes, formatos JPG, PNG o WebP</p>
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
                className="h-12 px-8 bg-gradient-to-r from-primary-prosalud to-primary-prosalud-dark"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? 'Guardando...'
                  : event ? 'Actualizar Evento' : 'Crear Evento'
                }
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BienestarEventForm;
