import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import UserForm from '@/components/admin/usuarios/UserForm';
import { usersApi } from '@/services/adminApi';
import { User } from '@/types/admin';

const AdminUsuariosPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Check if we should open the create form based on URL params
  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setShowForm(true);
      setSelectedUser(null);
      // Remove the action param after opening the form
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getUsers,
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && user.isActive) ||
                         (statusFilter === 'inactive' && !user.isActive);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreate = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  if (showForm) {
    return (
      <UserForm 
        user={selectedUser}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 space-y-8"
        >
          {/* Header */}
          <div className="bg-white rounded-xl p-8 border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary-prosalud" />
                <h1 className="text-3xl font-bold text-primary-prosalud">
                  Gestión de Usuarios
                </h1>
              </div>
              <Button onClick={handleCreate} className="bg-primary-prosalud hover:bg-primary-prosalud-dark">
                <Plus className="h-5 w-5 mr-2" />
                Nuevo Usuario
              </Button>
            </div>
            <p className="text-lg text-text-gray">
              Administra los usuarios del panel administrativo
            </p>
          </div>

          {/* Filters */}
          <Card className="bg-white border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar usuarios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="inactive">Inactivos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card className="bg-white border shadow-sm">
            <CardHeader>
              <CardTitle>Usuarios ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Lista de todos los usuarios registrados en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-prosalud"></div>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-600">
                  Error al cargar los usuarios
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-text-dark">
                            {user.firstName} {user.lastName}
                          </h3>
                          <Badge variant={user.isActive ? "default" : "secondary"}>
                            {user.isActive ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                        <p className="text-text-gray text-sm">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          Creado: {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </Button>
              <span className="flex items-center px-4 py-2 text-sm">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsuariosPage;
