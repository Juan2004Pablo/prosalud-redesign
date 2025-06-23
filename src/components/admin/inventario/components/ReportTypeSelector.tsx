
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReportType } from '../types/reportTypes';

interface ReportTypeSelectorProps {
  value: ReportType;
  onChange: (value: ReportType) => void;
}

const ReportTypeSelector: React.FC<ReportTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Tipo de Reporte</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="full">
            <div className="flex items-center space-x-2">
              <span>Reporte Completo</span>
            </div>
          </SelectItem>
          <SelectItem value="summary">
            <div className="flex items-center space-x-2">
              <span>Reporte Ejecutivo</span>
            </div>
          </SelectItem>
          <SelectItem value="lowstock">
            <div className="flex items-center space-x-2">
              <span>Solo Stock Crítico</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ReportTypeSelector;
