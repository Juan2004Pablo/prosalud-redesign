import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  SquareX,
  Brush,
  Handshake, 
  Plus, 
  Search, 
  Filter, 
  Image,
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Upload,
  X
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AdminLayout from '@/components/admin/AdminLayout';
import DataPagination from '@/components/ui/data-pagination';
import ConfirmationModal from '@/components/admin/common/ConfirmationModal';
import { usePagination } from '@/hooks/usePagination';
import { useToast } from '@/hooks/use-toast';
import { conveniosService } from '@/services/conveniosService';
import { Convenio } from '@/types/admin';

const AdminConveniosPage: React.FC = () => {
  const [selectedConvenio, setSelectedConvenio] = useState<Convenio | null>(null);
  const [convenioFormOpen, setConvenioFormOpen] = useState(false);
  const [editConvenioOpen, setEditConvenioOpen] = useState(false);
  const [deleteConvenioOpen, setDeleteConvenioOpen] = useState(false);
  const [viewConvenioOpen, setViewConvenioOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();

  // Fetch convenios from service
  const { data: convenios = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-convenios'],
    queryFn: conveniosService.getConvenios
  });

  const [formValues, setFormValues] = useState({
    name: '',
    isVisible: true
  });

  const filteredConvenios = convenios.filter(convenio => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return convenio.name.toLowerCase().includes(searchLower);
    }
    return true;
  });

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData: paginatedConvenios,
    goToPage,
    setItemsPerPage
  } = usePagination({
    data: filteredConvenios,
    initialItemsPerPage: 12
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormValues(prev => ({
      ...prev,
      isVisible: checked
    }));
  };

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

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview('');
  };

  const handleSubmit = () => {
    if (!formValues.name.trim()) {
      toast({
        title: "Nombre requerido",
        description: "Debes ingresar un nombre para el convenio.",
        variant: "destructive"
      });
      return;
    }

    if (!isEditing && !selectedImage) {
      toast({
        title: "Imagen requerida",
        description: "Debes seleccionar una imagen para el convenio.",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && selectedConvenio) {
      const updatedConvenios = convenios.map(convenio =>
        convenio.id === selectedConvenio.id ? { 
          ...convenio, 
          name: formValues.name,
          isVisible: formValues.isVisible,
          // Solo actualizar imageUrl si se seleccionó una nueva imagen
          ...(selectedImage && { image: URL.createObjectURL(selectedImage) })
        } : convenio
      );
      //setConvenios(updatedConvenios);
      refetch();
      toast({
        title: "Convenio Actualizado",
        description: "El convenio ha sido actualizado exitosamente.",
      });
    } else {
      const newConvenio: Convenio = {
        id: `conv-${Date.now()}`,
        name: formValues.name,
        image: selectedImage ? URL.createObjectURL(selectedImage) : '',
        isVisible: formValues.isVisible,
        createdAt: new Date().toISOString()
      };
      //setConvenios([...convenios, newConvenio]);
      refetch();
      toast({
        title: "Convenio Creado",
        description: "El convenio ha sido creado exitosamente.",
      });
    }

    // Resetear formulario
    setConvenioFormOpen(false);
    setEditConvenioOpen(false);
    setSelectedConvenio(null);
    setIsEditing(false);
    setFormValues({ name: '', isVisible: true });
    setSelectedImage(null);
    setImagePreview('');
  };

  const handleEdit = (convenio: Convenio) => {
    setSelectedConvenio(convenio);
    setFormValues({
      name: convenio.name,
      isVisible: convenio.isVisible
    });
    // Cargar la imagen actual como preview
    setImagePreview(convenio.image);
    setSelectedImage(null); // No hay archivo seleccionado inicialmente
    setIsEditing(true);
    setEditConvenioOpen(true);
  };

  const handleDelete = (convenioId: string) => {
    //setConvenios(convenios.filter(convenio => convenio.id !== convenioId));
    refetch();
    setDeleteConvenioOpen(false);
    toast({
      title: "Convenio Eliminado",
      description: "El convenio ha sido eliminado exitosamente.",
    });
  };

  const toggleVisibility = (convenioId: string) => {
    //setConvenios(convenios.map(convenio =>
    //  convenio.id === convenioId ? { ...convenio, isVisible: !convenio.isVisible } : convenio
    //));
    refetch();
    toast({
      title: "Estado Actualizado",
      description: "El estado de visibilidad del convenio ha sido actualizado.",
    });
  };

  const resetForm = () => {
    setFormValues({ name: '', isVisible: true });
    setSelectedImage(null);
    setImagePreview('');
    setIsEditing(false);
    setSelectedConvenio(null);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-sm">
              <CardHeader className="pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-prosalud/10 p-3 rounded-lg">
                      <Handshake className="h-8 w-8 text-primary-prosalud" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary-prosalud">
                        Gestión de Convenios
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Administra los convenios y alianzas estratégicas de ProSalud
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      resetForm();
                      setConvenioFormOpen(true);
                    }}
                    className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Convenio
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar por nombre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                    className="w-full"
                  >
                    <Brush className="w-4 h-4 mr-2" />
                    Limpiar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Convenios Grid */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Convenios ({totalItems})</CardTitle>
                <CardDescription>
                  Lista completa de convenios y alianzas estratégicas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-prosalud"></div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {paginatedConvenios.map((convenio) => (
                        <Card key={convenio.id} className="hover:shadow-lg transition-shadow duration-300">
                          <CardHeader className="p-0">
                            <img
                              src={convenio.image}
                              alt={convenio.name}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant={convenio.isVisible ? "default" : "secondary"} className="text-xs">
                                {convenio.isVisible ? "Visible" : "Oculto"}
                              </Badge>
                              <Switch
                                checked={convenio.isVisible}
                                onCheckedChange={() => toggleVisibility(convenio.id)}
                                className="scale-75"
                              />
                            </div>
                            <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
                              {convenio.name}
                            </CardTitle>
                            <div className="space-y-1 mb-4">
                              <p className="text-xs text-gray-500">
                                Creado: {formatDate(convenio.createdAt)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedConvenio(convenio);
                                  setViewConvenioOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <div className="flex items-center gap-1">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleEdit(convenio)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setSelectedConvenio(convenio); setDeleteConvenioOpen(true); }}>
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Eliminar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Pagination */}
                    <DataPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={totalItems}
                      itemsPerPage={itemsPerPage}
                      onPageChange={goToPage}
                      onItemsPerPageChange={setItemsPerPage}
                      className="mt-6"
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* View Convenio Dialog */}
          <Dialog open={viewConvenioOpen} onOpenChange={setViewConvenioOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-xl font-bold">
                  Detalles del Convenio
                </DialogTitle>
                <Separator />
              </DialogHeader>
              {selectedConvenio && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Handshake className="h-5 w-5" />
                          Información del Convenio
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Nombre</label>
                            <p className="text-sm">{selectedConvenio.name}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Estado</label> <br></br>
                            <Badge variant={selectedConvenio.isVisible ? "default" : "secondary"}>
                              {selectedConvenio.isVisible ? "Visible en web" : "Oculto en web"}
                            </Badge>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Fecha de Creación</label>
                            <p className="text-sm">{formatDate(selectedConvenio.createdAt)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Image className="h-5 w-5" />
                          Imagen del Convenio
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={selectedConvenio.image}
                          alt={selectedConvenio.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* New Convenio Dialog */}
          <Dialog open={convenioFormOpen} onOpenChange={setConvenioFormOpen}>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle>Nuevo Convenio</DialogTitle>
                <DialogDescription>
                  Completa el formulario para agregar un nuevo convenio.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre del Convenio</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    placeholder="Ej. Clínica del Occidente"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Imagen del Convenio</Label>
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-600 mb-2">Seleccionar imagen</p>
                        <p className="text-sm text-gray-500">JPG, PNG o WebP hasta 5MB</p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover bg-gray-50 rounded-lg border"
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

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isVisible"
                    checked={formValues.isVisible}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="isVisible">Visible en la web</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setConvenioFormOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit}>
                  Crear Convenio
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Convenio Dialog */}
          <Dialog open={editConvenioOpen} onOpenChange={setEditConvenioOpen}>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle>Editar Convenio</DialogTitle>
                <DialogDescription>
                  Modifica la información del convenio seleccionado.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nombre del Convenio</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    placeholder="Ej. Clínica del Occidente"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Imagen del Convenio</Label>
                  <div className="space-y-2">
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Imagen actual"
                        className="w-full h-48 object-cover bg-gray-50 rounded-lg border"
                      />
                      {selectedImage && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={removeImage}
                          className="absolute top-2 right-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="edit-image-upload"
                      />
                      <label htmlFor="edit-image-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {selectedImage ? 'Cambiar imagen' : 'Subir nueva imagen (opcional)'}
                        </p>
                        <p className="text-xs text-gray-500">JPG, PNG o WebP hasta 5MB</p>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-isVisible"
                    checked={formValues.isVisible}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="edit-isVisible">Visible en la web</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditConvenioOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit}>
                  Guardar Cambios
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Convenio Modal */}
          <ConfirmationModal
            open={deleteConvenioOpen}
            onOpenChange={setDeleteConvenioOpen}
            title="Eliminar Convenio"
            description="Esta acción no se puede deshacer. Se eliminará permanentemente el convenio"
            confirmText="Eliminar"
            confirmVariant="destructive"
            onConfirm={() => handleDelete(selectedConvenio!.id)}
            itemName={selectedConvenio?.name}
          />
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminConveniosPage;
