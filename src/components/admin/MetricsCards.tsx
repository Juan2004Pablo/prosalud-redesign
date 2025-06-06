
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Building, Calendar, Target, Award, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface MetricsCardsProps {
  metrics: {
    yearsExperience: number;
    conventionsCount: number;
    affiliatesCount: number;
  };
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics }) => {
  // Mock data for charts
  const trendData = [
    { month: 'Ene', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Abr', value: 61 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 67 },
  ];

  const pieData = [
    { name: 'Activos', value: 85, color: '#16a34a' },
    { name: 'Pendientes', value: 15, color: '#f59e0b' },
  ];

  const affiliatesData = [
    { year: '2020', count: 1200 },
    { year: '2021', count: 1450 },
    { year: '2022', count: 1680 },
    { year: '2023', count: 1890 },
    { year: '2024', count: metrics?.affiliatesCount || 2100 },
  ];

  const chartConfig = {
    value: {
      label: "Valor",
      color: "#2563eb",
    },
    count: {
      label: "Cantidad",
      color: "#16a34a",
    },
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {/* Years of Experience Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Años de Experiencia
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 mb-2">
              {metrics?.yearsExperience}+
            </div>
            <ChartContainer config={chartConfig} className="h-[60px] w-full">
              <AreaChart data={trendData}>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  fill="#3b82f6" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ChartContainer>
            <p className="text-xs text-blue-600 mt-2">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Crecimiento constante
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Conventions Count Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">
              Total Afiliados
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 mb-2">
              {metrics?.affiliatesCount?.toLocaleString()}
            </div>
            <ChartContainer config={chartConfig} className="h-[60px] w-full">
              <LineChart data={affiliatesData}>
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#7c3aed" 
                  strokeWidth={2}
                  dot={{ fill: '#7c3aed', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ChartContainer>
            <p className="text-xs text-purple-600 mt-2">
              <Target className="h-3 w-3 inline mr-1" />
              +12% vs año anterior
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Affiliates Count Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Convenios Activos
            </CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 mb-2">
              {metrics?.conventionsCount}
            </div>
            <ChartContainer config={chartConfig} className="h-[80px] w-full">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={35}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex justify-between text-xs text-green-600 mt-2">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                85% Activos
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                15% Pendientes
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Performance Card */}
      <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3">
        <Card className="bg-gradient-to-r from-orange-50 to-red-100 border-orange-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-orange-800 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Crecimiento de Afiliados - Últimos 5 años
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={affiliatesData}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="year" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9a3412' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9a3412' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#f97316"
                    strokeWidth={3}
                    fill="url(#colorGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-800">25%</div>
                <p className="text-sm text-orange-600">Crecimiento anual</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-800">98%</div>
                <p className="text-sm text-orange-600">Satisfacción</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-800">150+</div>
                <p className="text-sm text-orange-600">Nuevos afiliados/mes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default MetricsCards;
