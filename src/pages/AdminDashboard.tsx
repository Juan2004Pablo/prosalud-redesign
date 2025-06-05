
import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Calendar, Trophy, BarChart3, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: "Usuarios Activos",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "from-primary-prosalud to-primary-prosalud-dark"
    },
    {
      title: "Convenios Activos",
      value: "7",
      change: "+2",
      icon: Trophy,
      color: "from-secondary-prosaludgreen to-accent-prosaludteal"
    },
    {
      title: "Eventos de Bienestar",
      value: "45",
      change: "+8",
      icon: Calendar,
      color: "from-prosalud-salud to-prosalud-pro"
    },
    {
      title: "Experiencias Comfenalco",
      value: "12",
      change: "+3",
      icon: FileText,
      color: "from-orange-500 to-red-500"
    }
  ];

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-prosalud-light/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-prosalud/5 to-secondary-prosaludgreen/5 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-primary-prosalud/10 shadow-xl">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-prosalud to-secondary-prosaludgreen bg-clip-text text-transparent mb-4">
                Panel Administrativo
              </h1>
              <p className="text-lg text-text-gray max-w-2xl">
                Gestiona usuarios, contenidos y métricas de la plataforma ProSalud desde un solo lugar.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                  <CardHeader className="relative pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-text-gray">
                        {stat.title}
                      </CardTitle>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                      >
                        <stat.icon className="h-4 w-4 text-white" />
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-text-dark">
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
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl bg-gradient-to-r from-white via-white to-primary-prosalud-light/5">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Crear Usuario", icon: Users, href: "/admin/usuarios/crear" },
                    { title: "Nuevo Evento", icon: Calendar, href: "/admin/bienestar/crear" },
                    { title: "Agregar Convenio", icon: Trophy, href: "/admin/convenios/crear" }
                  ].map((action) => (
                    <motion.a
                      key={action.title}
                      href={action.href}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-primary-prosalud-light/20 to-secondary-prosaludgreen/10 hover:from-primary-prosalud-light/30 hover:to-secondary-prosaludgreen/20 transition-all duration-300 border border-primary-prosalud/10"
                    >
                      <action.icon className="h-8 w-8 text-primary-prosalud" />
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
