import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-secondary-prosaludgreen/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-prosaludgreen/5 to-accent-prosaludteal/5 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-secondary-prosaludgreen/10 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary-prosaludgreen to-accent-prosaludteal bg-clip-text text-transparent">
                  Gestión de Convenios
                </h1>
                <Button
                  onClick={handleCreate}
                  className="bg-gradient-to-r from-secondary-prosaludgreen to-accent-prosaludteal hover:from-secondary-prosaludgreen/90 hover:to-accent-prosaludteal/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Convenio
                </Button>
              </div>
              <p className="text-lg text-text-gray">
                Administra los convenios y alianzas estratégicas de ProSalud
              </p>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConvenios.map((convenio) => (
                  <motion.div
                    key={convenio.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={convenio.image}
                          alt={convenio.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge variant={convenio.isVisible ? "default" : "destructive"}>
                            {convenio.isVisible ? 'Visible' : 'Oculto'}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="font-bold text-lg text-white mb-2">
                            {convenio.name}
                          </h3>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p><strong>Creado:</strong> {convenio.createdAt}</p>
                          <p><strong>Estado:</strong> 
                            <span className={`ml-1 ${convenio.isVisible ? 'text-green-600' : 'text-red-600'}`}>
                              {convenio.isVisible ? 'Activo' : 'Inactivo'}
                            </span>
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(convenio)}
                            className="flex-1"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="px-3"
                          >
                            {convenio.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredConvenios.length === 0 && !isLoading && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
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
