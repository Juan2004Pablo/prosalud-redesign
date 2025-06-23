
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { ReportType } from '../types/reportTypes';

interface ReportInfoCardProps {
  reportType: ReportType;
}

const ReportInfoCard: React.FC<ReportInfoCardProps> = ({ reportType }) => {
  const getReportDescription = () => {
    switch (reportType) {
      case 'summary':
        return 'Reporte ejecutivo con métricas clave y resumen de categorías.';
      case 'lowstock':
        return 'Reporte enfocado en productos que requieren reposición urgente.';
      case 'full':
        return 'Reporte completo con información detallada de todos los productos, ubicaciones, SKUs y valores.';
      default:
        return '';
    }
  };

  return (
    <Card className="border border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Información del Reporte</h4>
            <p className="text-sm text-blue-700 mt-1">
              {getReportDescription()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportInfoCard;
