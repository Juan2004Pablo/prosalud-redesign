
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Switch } from '@/components/ui/switch';
import { Calendar } from 'lucide-react';
import { DateRangeFilter } from '../types/reportTypes';

interface DateRangeSelectorProps {
  value: DateRangeFilter;
  onChange: (value: DateRangeFilter) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ value, onChange }) => {
  const handleIncludeAllChange = (includeAll: boolean) => {
    onChange({
      ...value,
      includeAll,
      start: includeAll ? undefined : value.start,
      end: includeAll ? undefined : value.end
    });
  };

  const handleStartDateChange = (start: Date | undefined) => {
    onChange({
      ...value,
      start
    });
  };

  const handleEndDateChange = (end: Date | undefined) => {
    onChange({
      ...value,
      end
    });
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-gray-600" />
          <div>
            <h4 className="font-medium text-gray-900">Rango de Fechas</h4>
            <p className="text-sm text-gray-600">
              Filtra la información por período específico
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Incluir toda la información disponible
          </label>
          <Switch
            checked={value.includeAll}
            onCheckedChange={handleIncludeAllChange}
          />
        </div>

        {!value.includeAll && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Fecha Desde</label>
              <DatePicker
                value={value.start}
                onChange={handleStartDateChange}
                placeholder="Seleccionar fecha inicio"
                maxDate={value.end || new Date()}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Fecha Hasta</label>
              <DatePicker
                value={value.end}
                onChange={handleEndDateChange}
                placeholder="Seleccionar fecha fin"
                minDate={value.start}
                maxDate={new Date()}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DateRangeSelector;
