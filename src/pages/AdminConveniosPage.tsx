
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import ConvenioForm from '@/components/admin/convenios/ConvenioForm';
import { conveniosApi } from '@/services/adminApi';
import { Convenio } from '@/types/admin';

const AdminConveniosPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const [selectedConvenio, setSelectedConvenio] = useState<Convenio | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if we should open the create form based on URL params
  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setShowForm(true);
      setSelectedConvenio(null);
      // Remove the action param after opening the form
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const { data: convenios = [], isLoading, refetch } = useQuery({
    queryKey: ['convenios'],
    queryFn: conveniosApi.getConvenios
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async (convenio: Convenio) => {
      return conveniosApi.updateConvenio(convenio.id, { isVisible: !convenio.isVisible });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['convenios'] });
      toast({
        title: "Estado actualizado",
        description: "La visibilidad del convenio ha sido actualizada."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const filteredConvenios = convenios.filter(convenio =>
    convenio.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (convenio: Convenio) => {
    setSelectedConvenio(convenio);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedConvenio(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedConvenio(null);
    refetch();
  };

  if (showForm) {
    return <ConvenioForm convenio={selectedConvenio} onClose={handleCloseForm} />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-white rounded-xl p-6 sm:p-8 border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-prosalud">
                  Gestión de Convenios
                </h1>
                <Button
                  onClick={handleCreate}
                  className="bg-primary-prosalud hover:bg-primary-prosalud-dark w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Convenio
                </Button>
              </div>
              <p className="text-base sm:text-lg text-text-gray">
                Administra los convenios y alianzas estratégicas de ProSalud
              </p>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Buscar Convenios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre del convenio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Convenios Grid */}
          <motion.div variants={itemVariants}>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredConvenios.map((convenio) => (
                  <motion.div
                    key={convenio.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white h-full flex flex-col">
                      <div className="relative h-48">
                        <img
                          src={convenio.image}
                          alt={convenio.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge variant={convenio.isVisible ? "default" : "secondary"}>
                            {convenio.isVisible ? 'Visible' : 'Oculto'}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="font-bold text-lg text-white mb-2">
                            {convenio.name}
                          </h3>
                        </div>
                      </div>
                      
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-1">
                          <p><strong>Creado:</strong> {convenio.createdAt}</p>
                          <p><strong>Estado:</strong> 
                            <span className={`ml-1 ${convenio.isVisible ? 'text-green-600' : 'text-red-600'}`}>
                              {convenio.isVisible ? 'Activo' : 'Inactivo'}
                            </span>
                          </p>
                        </div>

                        <div className="space-y-3 mt-auto">
                          {/* Visibility Toggle */}
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              {convenio.isVisible ? (
                                <Eye className="h-4 w-4 text-green-600" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              )}
                              <span className="text-sm font-medium">
                                {convenio.isVisible ? 'Visible en web' : 'Oculto en web'}
                              </span>
                            </div>
                            <Switch
                              checked={convenio.isVisible}
                              onCheckedChange={() => toggleVisibilityMutation.mutate(convenio)}
                              disabled={toggleVisibilityMutation.isPending}
                            />
                          </div>

                          {/* Edit Button */}
                          <Button
                            variant="outline"
                            onClick={() => handleEdit(convenio)}
                            className="w-full"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar Convenio
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredConvenios.length === 0 && !isLoading && (
              <Card className="bg-white border shadow-sm">
                <CardContent className="p-12 text-center">
                  <p className="text-lg text-gray-500 mb-4">
                    {searchTerm ? 'No se encontraron convenios que coincidan con la búsqueda' : 'No hay convenios registrados'}
                  </p>
                  <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear primer convenio
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminConveniosPage;
