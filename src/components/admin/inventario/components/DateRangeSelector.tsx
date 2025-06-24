
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

  const handleStartDateChange = (dateString: string) => {
    const start = dateString ? new Date(dateString) : undefined;
    onChange({
      ...value,
      start
    });
  };

  const handleEndDateChange = (dateString: string) => {
    const end = dateString ? new Date(dateString) : undefined;
    onChange({
      ...value,
      end
    });
  };

  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const today = new Date().toISOString().split('T')[0];

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
              <Input
                type="date"
                value={formatDateForInput(value.start)}
                onChange={(e) => handleStartDateChange(e.target.value)}
                max={value.end ? formatDateForInput(value.end) : today}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Fecha Hasta</label>
              <Input
                type="date"
                value={formatDateForInput(value.end)}
                onChange={(e) => handleEndDateChange(e.target.value)}
                min={value.start ? formatDateForInput(value.start) : undefined}
                max={today}
                className="w-full"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DateRangeSelector;
