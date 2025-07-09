
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Heart, BarChart3, Handshake, Settings, Edit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/components/admin/AdminLayout';
import MetricsCards from '@/components/admin/MetricsCards';
import UserFormModal from '@/components/admin/usuarios/UserFormModal';
import ConvenioFormModal from '@/components/admin/convenios/ConvenioFormModal';
import { configApi } from '@/services/adminApi';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState([
    {
      title: "Usuarios Activos",
      value: "1.500",
      change: "+12%",
      icon: Users,
      color: "text-primary-prosalud"
    },
    {
      title: "Convenios Activos",
      value: "7",
      change: "+2",
      icon: Handshake,
      color: "text-secondary-prosaludgreen"
    },
    {
      title: "Eventos de Bienestar",
      value: "72",
      change: "+8",
      icon: Heart,
      color: "text-accent-prosaludteal"
    },
    {
      title: "Experiencias Comfenalco",
      value: "12",
      change: "+3",
      icon: GraduationCap,
      color: "text-orange-600"
    }
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editChange, setEditChange] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showConvenioModal, setShowConvenioModal] = useState(false);

  const { data: metrics, isLoading: loadingMetrics } = useQuery({
    queryKey: ['site-metrics'],
    queryFn: configApi.getMetrics
  });

  const handleEditStat = (index: number) => {
    setEditingIndex(index);
    setEditValue(stats[index].value);
    setEditChange(stats[index].change);
  };

  const handleSaveStat = () => {
    if (editingIndex !== null) {
      const newStats = [...stats];
      newStats[editingIndex] = {
        ...newStats[editingIndex],
        value: editValue,
        change: editChange
      };
      setStats(newStats);
      setEditingIndex(null);
      setEditValue("");
      setEditChange("");
    }
  };

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
          <motion.div variants={itemVariants}>
            <Card className="border shadow-sm">
              <CardHeader className="pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-prosalud/10 p-3 rounded-lg">
                      <BarChart3 className="h-8 w-8 text-primary-prosalud" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary-prosalud">
                        Panel Administrativo
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Gestiona usuarios, contenidos y métricas de la plataforma ProSalud desde un solo lugar.
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Settings className="h-6 w-6 text-primary-prosalud" />
                  <span>Acciones Rápidas</span>
                </CardTitle>
                <CardDescription>
                  Accede a las funciones más utilizadas del panel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <motion.button
                    onClick={() => setShowUserModal(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-300 border border-slate-200"
                  >
                    <Users className="h-8 w-8 text-primary-prosalud flex-shrink-0" />
                    <span className="font-medium text-text-dark">Crear Usuario</span>
                  </motion.button>
                  
                  <motion.a
                    href="/admin/bienestar?action=create"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-300 border border-slate-200"
                  >
                    <Heart className="h-8 w-8 text-primary-prosalud flex-shrink-0" />
                    <span className="font-medium text-text-dark">Nuevo Evento</span>
                  </motion.a>
                  
                  <motion.button
                    onClick={() => setShowConvenioModal(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-300 border border-slate-200"
                  >
                    <Handshake className="h-8 w-8 text-primary-prosalud flex-shrink-0" />
                    <span className="font-medium text-text-dark">Agregar Convenio</span>
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Metrics Section */}
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Métricas Principales</h2>
              <p className="text-gray-600">Estadísticas principales de la organización</p>
            </div>
            {loadingMetrics ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-40 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <MetricsCards metrics={metrics || { yearsExperience: 0, affiliatesCount: 0, conventionsCount: 0 }} />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Modals */}
      <UserFormModal
        open={showUserModal}
        onOpenChange={setShowUserModal}
      />

      <ConvenioFormModal
        open={showConvenioModal}
        onOpenChange={setShowConvenioModal}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;
