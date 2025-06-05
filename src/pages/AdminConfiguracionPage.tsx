
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Settings, Save, Info, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import { configApi } from '@/services/adminApi';

const AdminConfiguracionPage: React.FC = () => {
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingMetrics, setIsEditingMetrics] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: aboutUs, isLoading: loadingAbout } = useQuery({
    queryKey: ['about-us'],
    queryFn: configApi.getAboutUs
  });

  const { data: metrics, isLoading: loadingMetrics } = useQuery({
    queryKey: ['site-metrics'],
    queryFn: configApi.getMetrics
  });

  const [aboutFormData, setAboutFormData] = useState({
    mission: '',
    vision: ''
  });

  const [metricsFormData, setMetricsFormData] = useState({
    yearsExperience: 0,
    conventionsCount: 0,
    affiliatesCount: 0
  });

  React.useEffect(() => {
    if (aboutUs) {
      setAboutFormData(aboutUs);
    }
  }, [aboutUs]);

  React.useEffect(() => {
    if (metrics) {
      setMetricsFormData(metrics);
    }
  }, [metrics]);

  const updateAboutMutation = useMutation({
    mutationFn: configApi.updateAboutUs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-us'] });
      toast({
        title: "Información actualizada",
        description: "La información de Quiénes Somos ha sido actualizada exitosamente."
      });
      setIsEditingAbout(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar la información.",
        variant: "destructive"
      });
    }
  });

  const updateMetricsMutation = useMutation({
    mutationFn: configApi.updateMetrics,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-metrics'] });
      toast({
        title: "Métricas actualizadas",
        description: "Las métricas del sitio han sido actualizadas exitosamente."
      });
      setIsEditingMetrics(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudieron actualizar las métricas.",
        variant: "destructive"
      });
    }
  });

  const handleAboutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutMutation.mutate(aboutFormData);
  };

  const handleMetricsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMetricsMutation.mutate(metricsFormData);
  };

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
          className="p-6 space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-white rounded-xl p-8 border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="h-8 w-8 text-primary-prosalud" />
                <h1 className="text-4xl font-bold text-primary-prosalud">
                  Configuración del Sitio
                </h1>
              </div>
              <p className="text-lg text-text-gray">
                Gestiona la información general del sitio web y las métricas principales
              </p>
            </div>
          </motion.div>

          {/* About Us Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white border shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary-prosalud" />
                      Información Institucional
                    </CardTitle>
                    <CardDescription>
                      Misión y visión que se muestran en la página "Quiénes Somos"
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditingAbout ? "secondary" : "outline"}
                    onClick={() => setIsEditingAbout(!isEditingAbout)}
                    disabled={loadingAbout}
                  >
                    {isEditingAbout ? 'Cancelar' : 'Editar'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loadingAbout ? (
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ) : isEditingAbout ? (
                  <form onSubmit={handleAboutSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="mission">Misión</Label>
                      <Textarea
                        id="mission"
                        value={aboutFormData.mission}
                        onChange={(e) => setAboutFormData(prev => ({ ...prev, mission: e.target.value }))}
                        rows={4}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="vision">Visión</Label>
                      <Textarea
                        id="vision"
                        value={aboutFormData.vision}
                        onChange={(e) => setAboutFormData(prev => ({ ...prev, vision: e.target.value }))}
                        rows={4}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={updateAboutMutation.isPending}
                        className="bg-primary-prosalud hover:bg-primary-prosalud-dark"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {updateAboutMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditingAbout(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Misión</h4>
                      <p className="text-gray-700 leading-relaxed">{aboutUs?.mission}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Visión</h4>
                      <p className="text-gray-700 leading-relaxed">{aboutUs?.vision}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Site Metrics Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white border shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary-prosalud" />
                      Métricas del Sitio
                    </CardTitle>
                    <CardDescription>
                      Números que se muestran en la página principal del sitio
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditingMetrics ? "secondary" : "outline"}
                    onClick={() => setIsEditingMetrics(!isEditingMetrics)}
                    disabled={loadingMetrics}
                  >
                    {isEditingMetrics ? 'Cancelar' : 'Editar'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loadingMetrics ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : isEditingMetrics ? (
                  <form onSubmit={handleMetricsSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="yearsExperience">Años de Experiencia</Label>
                        <Input
                          id="yearsExperience"
                          type="number"
                          value={metricsFormData.yearsExperience}
                          onChange={(e) => setMetricsFormData(prev => ({ ...prev, yearsExperience: parseInt(e.target.value) || 0 }))}
                          className="mt-1"
                          required
                          min="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="conventionsCount">Número de Convenios</Label>
                        <Input
                          id="conventionsCount"
                          type="number"
                          value={metricsFormData.conventionsCount}
                          onChange={(e) => setMetricsFormData(prev => ({ ...prev, conventionsCount: parseInt(e.target.value) || 0 }))}
                          className="mt-1"
                          required
                          min="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="affiliatesCount">Número de Afiliados</Label>
                        <Input
                          id="affiliatesCount"
                          type="number"
                          value={metricsFormData.affiliatesCount}
                          onChange={(e) => setMetricsFormData(prev => ({ ...prev, affiliatesCount: parseInt(e.target.value) || 0 }))}
                          className="mt-1"
                          required
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={updateMetricsMutation.isPending}
                        className="bg-primary-prosalud hover:bg-primary-prosalud-dark"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {updateMetricsMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditingMetrics(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-3xl font-bold text-primary-prosalud mb-1">
                        {metrics?.yearsExperience}
                      </div>
                      <div className="text-sm text-gray-600">Años de Experiencia</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-3xl font-bold text-primary-prosalud mb-1">
                        {metrics?.conventionsCount}
                      </div>
                      <div className="text-sm text-gray-600">Convenios Activos</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-3xl font-bold text-primary-prosalud mb-1">
                        {metrics?.affiliatesCount}
                      </div>
                      <div className="text-sm text-gray-600">Afiliados</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminConfiguracionPage;
