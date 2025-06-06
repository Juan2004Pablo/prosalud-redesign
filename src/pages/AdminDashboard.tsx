
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Users, FileText, Calendar, Trophy, BarChart3, Settings, Edit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/components/admin/AdminLayout';
import MetricsCards from '@/components/admin/MetricsCards';
import { configApi } from '@/services/adminApi';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState([
    {
      title: "Usuarios Activos",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-primary-prosalud"
    },
    {
      title: "Convenios Activos",
      value: "7",
      change: "+2",
      icon: Trophy,
      color: "text-secondary-prosaludgreen"
    },
    {
      title: "Eventos de Bienestar",
      value: "45",
      change: "+8",
      icon: Calendar,
      color: "text-accent-prosaludteal"
    },
    {
      title: "Experiencias Comfenalco",
      value: "12",
      change: "+3",
      icon: FileText,
      color: "text-orange-600"
    }
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editChange, setEditChange] = useState("");

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
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-white rounded-xl p-6 sm:p-8 border shadow-sm">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-prosalud mb-4">
                Panel Administrativo
              </h1>
              <p className="text-base sm:text-lg text-text-gray max-w-2xl">
                Gestiona usuarios, contenidos y métricas de la plataforma ProSalud desde un solo lugar.
              </p>
            </div>
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
              <MetricsCards metrics={metrics || { yearsExperience: 0, conventionsCount: 0, affiliatesCount: 0 }} />
            )}
          </motion.div>

          {/* Stats Grid */}
          { /* <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-text-gray">
                        {stat.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg bg-slate-100 ${stat.color}`}>
                          <stat.icon className="h-4 w-4" />
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditStat(index)}
                              className="h-8 w-8 p-0 hover:bg-slate-100"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Editar {stat.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="value">Valor</Label>
                                <Input
                                  id="value"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  placeholder="Ej: 1,234"
                                />
                              </div>
                              <div>
                                <Label htmlFor="change">Cambio</Label>
                                <Input
                                  id="change"
                                  value={editChange}
                                  onChange={(e) => setEditChange(e.target.value)}
                                  placeholder="Ej: +12%"
                                />
                              </div>
                              <Button onClick={handleSaveStat} className="w-full">
                                Guardar
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl sm:text-3xl font-bold text-text-dark">
                        {stat.value}
                      </span>
                      <span className="text-sm font-medium text-secondary-prosaludgreen">
                        {stat.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div> */ }

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
                  {[
                    { title: "Crear Usuario", icon: Users, href: "/admin/usuarios?action=create" },
                    { title: "Nuevo Evento", icon: Calendar, href: "/admin/bienestar?action=create" },
                    { title: "Agregar Convenio", icon: Trophy, href: "/admin/convenios?action=create" }
                  ].map((action) => (
                    <motion.a
                      key={action.title}
                      href={action.href}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-300 border border-slate-200"
                    >
                      <action.icon className="h-8 w-8 text-primary-prosalud flex-shrink-0" />
                      <span className="font-medium text-text-dark">{action.title}</span>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
