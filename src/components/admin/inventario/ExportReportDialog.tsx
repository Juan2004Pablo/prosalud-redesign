
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ReportType, ReportFormat, DateRangeFilter } from './types/reportTypes';
import { getInventoryData, getFilteredData } from './utils/reportData';
import { generatePDFReport } from './utils/pdfReportGenerator';
import { generateExcelReport } from './utils/excelReportGenerator';
import ReportFormatSelector from './components/ReportFormatSelector';
import ReportTypeSelector from './components/ReportTypeSelector';
import ReportInfoCard from './components/ReportInfoCard';
import DateRangeSelector from './components/DateRangeSelector';
import * as XLSX from 'xlsx';

interface ExportReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExportReportDialog: React.FC<ExportReportDialogProps> = ({ open, onOpenChange }) => {
  const [format, setFormat] = useState<ReportFormat>('pdf');
  const [reportType, setReportType] = useState<ReportType>('full');
  const [dateRange, setDateRange] = useState<DateRangeFilter>({
    includeAll: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const baseData = getInventoryData();
      
      // Add date range to metadata if specified
      if (!dateRange.includeAll && dateRange.start && dateRange.end) {
        baseData.metadata.dateRange = {
          start: dateRange.start.toLocaleDateString('es-ES'),
          end: dateRange.end.toLocaleDateString('es-ES')
        };
      }

      const data = getFilteredData(reportType, baseData);

      const reportTypeText = reportType === 'summary' ? 'Ejecutivo' : 
                            reportType === 'lowstock' ? 'Stock_Critico' : 'Completo';

      if (format === 'pdf') {
        const doc = generatePDFReport(data, reportType);
        doc.save(`Reporte_${reportTypeText}_ProSalud_${new Date().toISOString().split('T')[0]}.pdf`);
        
        toast({
          title: "Reporte PDF Generado",
          description: `El reporte ${reportTypeText.toLowerCase()} en PDF se ha descargado exitosamente`,
          duration: 4000,
        });
      } else {
        const wb = generateExcelReport(data, reportType);
        XLSX.writeFile(wb, `Reporte_${reportTypeText}_ProSalud_${new Date().toISOString().split('T')[0]}.xlsx`);
        
        toast({
          title: "Reporte Excel Generado",
          description: `El reporte ${reportTypeText.toLowerCase()} en Excel se ha descargado exitosamente`,
          duration: 4000,
        });
      }

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error al Generar Reporte",
        description: "Hubo un problema al generar el reporte. Inténtalo de nuevo.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Exportar Reporte de Inventario
          </DialogTitle>
          <DialogDescription>
            Genera un reporte profesional del inventario en el formato de tu preferencia
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <ReportFormatSelector value={format} onChange={setFormat} />
          
          <ReportTypeSelector value={reportType} onChange={setReportType} />
          
          <DateRangeSelector value={dateRange} onChange={setDateRange} />
          
          <ReportInfoCard reportType={reportType} />

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleExport}
              disabled={isGenerating || (!dateRange.includeAll && (!dateRange.start || !dateRange.end))}
              className="bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Reporte
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportReportDialog;
