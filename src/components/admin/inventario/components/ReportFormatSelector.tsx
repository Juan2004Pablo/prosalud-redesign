
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, FileSpreadsheet } from 'lucide-react';
import { ReportFormat } from '../types/reportTypes';

interface ReportFormatSelectorProps {
  value: ReportFormat;
  onChange: (value: ReportFormat) => void;
}

const ReportFormatSelector: React.FC<ReportFormatSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Formato de Exportación</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar formato" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pdf">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-red-600" />
              <span>PDF - Documento Profesional</span>
            </div>
          </SelectItem>
          <SelectItem value="excel">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="h-4 w-4 text-green-600" />
              <span>Excel - Hoja de Cálculo</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ReportFormatSelector;
