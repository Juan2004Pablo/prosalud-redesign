
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
import { baseNameValidation, baseTextValidation, baseCategoryValidation, numberValidation } from '@/hooks/useFormValidation';

const formSchema = z.object({
  title: baseNameValidation.min(5, 'El título debe tener al menos 5 caracteres'),
  date: z.string().min(1, 'La fecha es requerida'),
  category: baseCategoryValidation,
  description: baseTextValidation.optional(),
  location: z.string().max(100, 'Máximo 100 caracteres').optional(),
  attendees: numberValidation(1, 10000).optional(),
  gift: z.string().max(100, 'Máximo 100 caracteres').optional(),
  provider: z.string().max(50, 'Máximo 50 caracteres').optional(),
});

type FormData = z.infer<typeof formSchema>;

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

  const form = useForm<FormData>({
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

  const onSubmit = (data: FormData) => {
    if (!event && images.length === 0) {
      toast({
        title: "Imágenes requeridas",
        description: "Debes subir al menos una imagen.",
        variant: "destructive"
      });
      return;
    }

    const eventData: CreateBienestarEventData = {
      title: data.title,
      date: data.date,
      category: data.category,
      description: data.description || undefined,
      location: data.location || undefined,
      attendees: data.attendees || undefined,
      gift: data.gift || undefined,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header compacto */}
          <div className="flex items-center gap-6 mb-8">
            <Button
              variant="ghost"
              onClick={onClose}
              className="rounded-full h-12 w-12 shrink-0"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {event ? 'Editar Evento' : 'Nuevo Evento'} de Bienestar
              </h1>
              <p className="text-slate-600 mt-1">
                {event ? 'Modifica los detalles del evento' : 'Crea un nuevo evento para la galería de bienestar'}
              </p>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna izquierda */}
            <div className="space-y-6">
              {/* Información Básica */}
              <Card className="border shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Star className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Información Básica</CardTitle>
                      <CardDescription>Datos principales del evento</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                      Título del Evento *
                    </Label>
                    <Input
                      id="title"
                      {...form.register('title')}
                      className="h-10"
                      placeholder="Ej: Jornada de Vacunación 2024"
                    />
                    {form.formState.errors.title && (
                      <p className="text-destructive text-sm">{form.formState.errors.title.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm font-medium">
                        Fecha *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        {...form.register('date')}
                        className="h-10"
                      />
                      {form.formState.errors.date && (
                        <p className="text-destructive text-sm">{form.formState.errors.date.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium">
                        Categoría *
                      </Label>
                      <select
                        id="category"
                        {...form.register('category')}
                        className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Seleccionar</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      {form.formState.errors.category && (
                        <p className="text-destructive text-sm">{form.formState.errors.category.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Descripción
                    </Label>
                    <Textarea
                      id="description"
                      {...form.register('description')}
                      rows={3}
                      className="resize-none text-sm"
                      placeholder="Describe los detalles del evento..."
                    />
                    {form.formState.errors.description && (
                      <p className="text-destructive text-sm">{form.formState.errors.description.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Detalles Adicionales */}
              <Card className="border shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Detalles Adicionales</CardTitle>
                      <CardDescription>Información complementaria</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Ubicación
                    </Label>
                    <Input
                      id="location"
                      {...form.register('location')}
                      className="h-10"
                      placeholder="Ej: Sede Principal"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="attendees" className="text-sm font-medium">
                        Asistentes
                      </Label>
                      <Input
                        id="attendees"
                        type="number"
                        min="1"
                        max="10000"
                        {...form.register('attendees', { valueAsNumber: true })}
                        className="h-10"
                        placeholder="150"
                      />
                      {form.formState.errors.attendees && (
                        <p className="text-destructive text-sm">{form.formState.errors.attendees.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider" className="text-sm font-medium">
                        Organizador
                      </Label>
                      <Input
                        id="provider"
                        {...form.register('provider')}
                        placeholder="ProSalud"
                        className="h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gift" className="text-sm font-medium">
                      Obsequio
                    </Label>
                    <Input
                      id="gift"
                      {...form.register('gift')}
                      className="h-10"
                      placeholder="Ej: Kit de bienestar"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Columna derecha */}
            <div className="space-y-6">
              {/* Imágenes */}
              <Card className="border shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Imágenes del Evento</CardTitle>
                      <CardDescription>Sube hasta 20 imágenes (máx. 5MB cada una)</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {!imagePreviews.length ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          multiple
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-lg font-medium text-gray-600 mb-1">Seleccionar imágenes</p>
                          <p className="text-sm text-gray-500">JPG, PNG o WebP</p>
                        </label>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant={mainImageIndex === index ? "default" : "outline"}
                                  onClick={() => setMainImageIndex(index)}
                                  className="h-7 w-7 p-0"
                                >
                                  <Star className={`h-3 w-3 ${mainImageIndex === index ? 'fill-current' : ''}`} />
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removeImage(index)}
                                  className="h-7 w-7 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              {mainImageIndex === index && (
                                <div className="absolute top-1 left-1 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded">
                                  Principal
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <input
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload-more"
                          />
                          <label htmlFor="image-upload-more" className="cursor-pointer">
                            <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Agregar más imágenes</p>
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Botones de acción */}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="h-12 bg-primary-prosalud hover:bg-primary-prosalud-dark"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? 'Guardando...'
                    : event ? 'Actualizar Evento' : 'Crear Evento'
                  }
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="h-12"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BienestarEventForm;
