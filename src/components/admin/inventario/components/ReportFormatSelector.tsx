
import React from 'react';
import { FileText, FileSpreadsheet } from 'lucide-react';
import { ReportFormat } from '../types/reportTypes';

interface ReportFormatSelectorProps {
  value: ReportFormat;
  onChange: (value: ReportFormat) => void;
}

const ReportFormatSelector: React.FC<ReportFormatSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-gray-600" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Formato del Reporte</h3>
          <p className="text-sm text-gray-600">Selecciona el formato en el que deseas exportar el reporte</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* PDF Card */}
        <div
          onClick={() => onChange('pdf')}
          className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-200 hover:shadow-md ${
            value === 'pdf'
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex flex-col items-center space-y-3">
            <FileText 
              className={`h-6 w-6 ${
                value === 'pdf' ? 'text-red-600' : 'text-gray-400'
              }`} 
            />
            <div>
              <h4 className={`font-semibold text-gray-700`}>
                PDF
              </h4>
              <p className={`text-sm text-gray-500`}>
                Documento optimizado
              </p>
            </div>
          </div>
        </div>

        {/* Excel Card */}
        <div
          onClick={() => onChange('excel')}
          className={`cursor-pointer rounded-lg border-2 p-6 text-center transition-all duration-200 hover:shadow-md ${
            value === 'excel'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex flex-col items-center space-y-3">
            <FileSpreadsheet 
              className={`h-6 w-6 ${
                value === 'excel' ? 'text-green-600' : 'text-gray-400'
              }`} 
            />
            <div>
              <h4 className={`font-semibold text-gray-700`}>
                Excel
              </h4>
              <p className={`text-sm text-gray-500`}>
                Hoja de cálculo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFormatSelector;
