import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, FileSpreadsheet, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

interface ExportReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExportReportDialog: React.FC<ExportReportDialogProps> = ({ open, onOpenChange }) => {
  const [format, setFormat<'pdf' | 'excel'>('pdf')>();
  const [reportType, setReportType] = useState('full');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Mock data del inventario
  const inventoryData = {
    categories: [
      {
        name: 'Uniformes',
        products: [
          { name: 'Uniforme Azul - Talla S', stock: 15, min: 10, max: 50, status: 'ok', value: 45000 },
          { name: 'Uniforme Azul - Talla M', stock: 3, min: 10, max: 50, status: 'low', value: 45000 },
          { name: 'Uniforme Azul - Talla L', stock: 25, min: 15, max: 60, status: 'ok', value: 45000 },
          { name: 'Uniforme Verde - Talla S', stock: 1, min: 5, max: 30, status: 'critical', value: 45000 },
          { name: 'Uniforme Verde - Talla M', stock: 18, min: 10, max: 50, status: 'ok', value: 45000 },
          { name: 'Uniforme Verde - Talla L', stock: 22, min: 15, max: 60, status: 'ok', value: 45000 },
          { name: 'Uniforme Blanco - Talla S', stock: 12, min: 8, max: 40, status: 'ok', value: 45000 },
          { name: 'Uniforme Blanco - Talla M', stock: 20, min: 12, max: 50, status: 'ok', value: 45000 },
          { name: 'Uniforme Blanco - Talla L', stock: 18, min: 10, max: 50, status: 'ok', value: 45000 }
        ]
      },
      {
        name: 'Tapabocas',
        products: [
          { name: 'Tapabocas Quirúrgico', stock: 1200, min: 500, max: 2000, status: 'ok', value: 800 },
          { name: 'Tapabocas N95', stock: 45, min: 100, max: 500, status: 'low', value: 2500 },
          { name: 'Tapabocas de Tela', stock: 800, min: 300, max: 1000, status: 'ok', value: 1200 },
          { name: 'Tapabocas Pediátrico', stock: 295, min: 200, max: 800, status: 'ok', value: 900 }
        ]
      },
      {
        name: 'Batas',
        products: [
          { name: 'Bata Blanca - Talla S', stock: 12, min: 8, max: 30, status: 'ok', value: 35000 },
          { name: 'Bata Blanca - Talla M', stock: 18, min: 12, max: 40, status: 'ok', value: 35000 },
          { name: 'Bata Blanca - Talla L', stock: 2, min: 8, max: 30, status: 'critical', value: 35000 },
          { name: 'Bata de Laboratorio - Talla M', stock: 15, min: 10, max: 35, status: 'ok', value: 38000 },
          { name: 'Bata de Laboratorio - Talla L', stock: 20, min: 12, max: 40, status: 'ok', value: 38000 }
        ]
      },
      {
        name: 'Regalos',
        products: [
          { name: 'Kit de Bienvenida', stock: 15, min: 10, max: 50, status: 'ok', value: 25000 },
          { name: 'Termo ProSalud', stock: 8, min: 5, max: 30, status: 'ok', value: 18000 },
          { name: 'Agenda Corporativa', stock: 12, min: 8, max: 40, status: 'ok', value: 12000 },
          { name: 'USB Corporativo', stock: 3, min: 6, max: 25, status: 'low', value: 15000 }
        ]
      }
    ]
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString('es-ES');
    
    // Header con logo y título
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235); // color primary-prosalud
    doc.text('PROSALUD', 20, 20);
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Reporte de Inventario', 20, 35);
    
    doc.setFontSize(10);
    doc.text(`Fecha de generación: ${currentDate}`, 20, 45);
    doc.text('Sistema de Gestión de Inventario ProSalud', 20, 52);

    let yPosition = 65;

    // Resumen general
    const totalProducts = inventoryData.categories.reduce((sum, cat) => sum + cat.products.length, 0);
    const totalStock = inventoryData.categories.reduce((sum, cat) => 
      sum + cat.products.reduce((catSum, prod) => catSum + prod.stock, 0), 0);
    const totalValue = inventoryData.categories.reduce((sum, cat) => 
      sum + cat.products.reduce((catSum, prod) => catSum + (prod.stock * prod.value), 0), 0);
    const lowStockItems = inventoryData.categories.reduce((sum, cat) => 
      sum + cat.products.filter(prod => prod.status === 'low' || prod.status === 'critical').length, 0);

    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text('RESUMEN GENERAL', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total de productos: ${totalProducts.toString()}`, 20, yPosition);
    doc.text(`Stock total: ${totalStock.toLocaleString()}`, 100, yPosition);
    yPosition += 7;
    doc.text(`Valor total inventario: $${totalValue.toLocaleString()}`, 20, yPosition);
    doc.text(`Productos con stock bajo: ${lowStockItems.toString()}`, 100, yPosition);
    yPosition += 15;

    // Detalle por categorías
    inventoryData.categories.forEach((category) => {
      // Verificar si necesitamos una nueva página
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(37, 99, 235);
      doc.text(`CATEGORÍA: ${category.name.toUpperCase()}`, 20, yPosition);
      yPosition += 10;

      // Tabla de productos
      const tableData = category.products.map(product => [
        product.name,
        product.stock.toString(),
        product.min.toString(),
        product.max.toString(),
        product.status === 'ok' ? 'Óptimo' : 
        product.status === 'low' ? 'Bajo' : 'Crítico',
        `$${(product.stock * product.value).toLocaleString()}`
      ]);

      autoTable(doc, {
        startY: yPosition,
        head: [['Producto', 'Stock', 'Mín', 'Máx', 'Estado', 'Valor Total']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235], textColor: 255 },
        alternateRowStyles: { fillColor: [249, 250, 251] },
        styles: { fontSize: 8 },
        columnStyles: {
          0: { cellWidth: 70 },
          1: { cellWidth: 20, halign: 'center' },
          2: { cellWidth: 20, halign: 'center' },
          3: { cellWidth: 20, halign: 'center' },
          4: { cellWidth: 25, halign: 'center' },
          5: { cellWidth: 35, halign: 'right' }
        }
      });

      yPosition = doc.lastAutoTable.finalY + 15;
    });

    // Footer en la última página
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('ProSalud - Sistema de Gestión de Inventario', 20, 285);
      doc.text(`Página ${i.toString()} de ${pageCount.toString()}`, 170, 285);
    }

    return doc;
  };

  const generateExcelReport = () => {
    const wb = XLSX.utils.book_new();
    
    // Hoja de resumen
    const summaryData = [
      ['REPORTE DE INVENTARIO PROSALUD'],
      [`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`],
      [''],
      ['RESUMEN GENERAL'],
      ['Métrica', 'Valor'],
      ['Total de productos', inventoryData.categories.reduce((sum, cat) => sum + cat.products.length, 0)],
      ['Stock total', inventoryData.categories.reduce((sum, cat) => 
        sum + cat.products.reduce((catSum, prod) => catSum + prod.stock, 0), 0)],
      ['Valor total inventario', inventoryData.categories.reduce((sum, cat) => 
        sum + cat.products.reduce((catSum, prod) => catSum + (prod.stock * prod.value), 0), 0)],
      ['Productos con stock bajo', inventoryData.categories.reduce((sum, cat) => 
        sum + cat.products.filter(prod => prod.status === 'low' || prod.status === 'critical').length, 0)]
    ];

    const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Resumen');

    // Hoja detallada
    const detailData = [
      ['Categoría', 'Producto', 'Stock Actual', 'Stock Mínimo', 'Stock Máximo', 'Estado', 'Valor Unitario', 'Valor Total']
    ];

    inventoryData.categories.forEach(category => {
      category.products.forEach(product => {
        detailData.push([
          category.name,
          product.name,
          product.stock,
          product.min,
          product.max,
          product.status === 'ok' ? 'Óptimo' : 
          product.status === 'low' ? 'Bajo' : 'Crítico',
          product.value,
          product.stock * product.value
        ]);
      });
    });

    const detailWs = XLSX.utils.aoa_to_sheet(detailData);
    XLSX.utils.book_append_sheet(wb, detailWs, 'Detalle Inventario');

    // Hoja de productos con stock bajo
    const lowStockData = [
      ['PRODUCTOS CON STOCK BAJO'],
      [''],
      ['Categoría', 'Producto', 'Stock Actual', 'Stock Mínimo', 'Estado', 'Acción Requerida']
    ];

    inventoryData.categories.forEach(category => {
      category.products
        .filter(product => product.status === 'low' || product.status === 'critical')
        .forEach(product => {
          lowStockData.push([
            category.name,
            product.name,
            product.stock,
            product.min,
            product.status === 'low' ? 'Stock Bajo' : 'Stock Crítico',
            product.status === 'critical' ? 'URGENTE - Reposición inmediata' : 'Planificar reposición'
          ]);
        });
    });

    const lowStockWs = XLSX.utils.aoa_to_sheet(lowStockData);
    XLSX.utils.book_append_sheet(wb, lowStockWs, 'Stock Bajo');

    return wb;
  };

  const handleExport = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular procesamiento

      if (format === 'pdf') {
        const doc = generatePDFReport();
        doc.save(`Reporte_Inventario_ProSalud_${new Date().toISOString().split('T')[0]}.pdf`);
        
        toast({
          title: "Reporte PDF Generado",
          description: "El reporte de inventario en PDF se ha descargado exitosamente",
          variant: "default"
        });
      } else {
        const wb = generateExcelReport();
        XLSX.writeFile(wb, `Reporte_Inventario_ProSalud_${new Date().toISOString().split('T')[0]}.xlsx`);
        
        toast({
          title: "Reporte Excel Generado",
          description: "El reporte de inventario en Excel se ha descargado exitosamente",
          variant: "default"
        });
      }

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error al Generar Reporte",
        description: "Hubo un problema al generar el reporte. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary-prosalud" />
            <span>Exportar Reporte de Inventario</span>
          </DialogTitle>
          <DialogDescription>
            Genera un reporte completo del inventario en el formato de tu preferencia
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Formato de Exportación</label>
            <Select value={format} onValueChange={(value: 'pdf' | 'excel') => setFormat(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-red-600" />
                    <span>PDF - Documento</span>
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tipo de Reporte</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Reporte Completo</SelectItem>
                <SelectItem value="summary">Solo Resumen</SelectItem>
                <SelectItem value="lowstock">Solo Stock Bajo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Información del Reporte</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    El reporte incluirá datos actualizados al {new Date().toLocaleDateString('es-ES')} 
                    con información detallada de stock, valores y alertas de reposición.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleExport}
              disabled={isGenerating}
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
