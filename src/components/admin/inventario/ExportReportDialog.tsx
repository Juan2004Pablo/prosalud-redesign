
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
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf');
  const [reportType, setReportType] = useState('full');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Mock data del inventario expandido
  const inventoryData = {
    metadata: {
      lastUpdate: new Date().toLocaleDateString('es-ES'),
      totalCategories: 4,
      systemVersion: '2.1.0',
      generatedBy: 'Sistema ProSalud',
      reportId: 'RPT-' + Date.now()
    },
    categories: [
      {
        name: 'Uniformes',
        description: 'Uniformes médicos para personal de salud',
        products: [
          { name: 'Uniforme Azul - Talla S', stock: 15, min: 10, max: 50, status: 'ok', value: 45000, sku: 'UNI-AZ-S', location: 'A-1-01' },
          { name: 'Uniforme Azul - Talla M', stock: 3, min: 10, max: 50, status: 'low', value: 45000, sku: 'UNI-AZ-M', location: 'A-1-02' },
          { name: 'Uniforme Azul - Talla L', stock: 25, min: 15, max: 60, status: 'ok', value: 45000, sku: 'UNI-AZ-L', location: 'A-1-03' },
          { name: 'Uniforme Verde - Talla S', stock: 1, min: 5, max: 30, status: 'critical', value: 45000, sku: 'UNI-VE-S', location: 'A-2-01' },
          { name: 'Uniforme Verde - Talla M', stock: 18, min: 10, max: 50, status: 'ok', value: 45000, sku: 'UNI-VE-M', location: 'A-2-02' },
          { name: 'Uniforme Verde - Talla L', stock: 22, min: 15, max: 60, status: 'ok', value: 45000, sku: 'UNI-VE-L', location: 'A-2-03' },
          { name: 'Uniforme Blanco - Talla S', stock: 12, min: 8, max: 40, status: 'ok', value: 45000, sku: 'UNI-BL-S', location: 'A-3-01' },
          { name: 'Uniforme Blanco - Talla M', stock: 20, min: 12, max: 50, status: 'ok', value: 45000, sku: 'UNI-BL-M', location: 'A-3-02' },
          { name: 'Uniforme Blanco - Talla L', stock: 18, min: 10, max: 50, status: 'ok', value: 45000, sku: 'UNI-BL-L', location: 'A-3-03' }
        ]
      },
      {
        name: 'Tapabocas',
        description: 'Equipos de protección respiratoria',
        products: [
          { name: 'Tapabocas Quirúrgico', stock: 1200, min: 500, max: 2000, status: 'ok', value: 800, sku: 'TAP-QUI', location: 'B-1-01' },
          { name: 'Tapabocas N95', stock: 45, min: 100, max: 500, status: 'low', value: 2500, sku: 'TAP-N95', location: 'B-1-02' },
          { name: 'Tapabocas de Tela', stock: 800, min: 300, max: 1000, status: 'ok', value: 1200, sku: 'TAP-TEL', location: 'B-2-01' },
          { name: 'Tapabocas Pediátrico', stock: 295, min: 200, max: 800, status: 'ok', value: 900, sku: 'TAP-PED', location: 'B-2-02' }
        ]
      },
      {
        name: 'Batas',
        description: 'Batas médicas y de laboratorio',
        products: [
          { name: 'Bata Blanca - Talla S', stock: 12, min: 8, max: 30, status: 'ok', value: 35000, sku: 'BAT-BL-S', location: 'C-1-01' },
          { name: 'Bata Blanca - Talla M', stock: 18, min: 12, max: 40, status: 'ok', value: 35000, sku: 'BAT-BL-M', location: 'C-1-02' },
          { name: 'Bata Blanca - Talla L', stock: 2, min: 8, max: 30, status: 'critical', value: 35000, sku: 'BAT-BL-L', location: 'C-1-03' },
          { name: 'Bata de Laboratorio - Talla M', stock: 15, min: 10, max: 35, status: 'ok', value: 38000, sku: 'BAT-LAB-M', location: 'C-2-01' },
          { name: 'Bata de Laboratorio - Talla L', stock: 20, min: 12, max: 40, status: 'ok', value: 38000, sku: 'BAT-LAB-L', location: 'C-2-02' }
        ]
      },
      {
        name: 'Regalos',
        description: 'Artículos promocionales y de bienestar',
        products: [
          { name: 'Kit de Bienvenida', stock: 15, min: 10, max: 50, status: 'ok', value: 25000, sku: 'REG-KIT', location: 'D-1-01' },
          { name: 'Termo ProSalud', stock: 8, min: 5, max: 30, status: 'ok', value: 18000, sku: 'REG-TER', location: 'D-1-02' },
          { name: 'Agenda Corporativa', stock: 12, min: 8, max: 40, status: 'ok', value: 12000, sku: 'REG-AGE', location: 'D-2-01' },
          { name: 'USB Corporativo', stock: 3, min: 6, max: 25, status: 'low', value: 15000, sku: 'REG-USB', location: 'D-2-02' }
        ]
      }
    ]
  };

  const getFilteredData = () => {
    switch (reportType) {
      case 'summary':
        return {
          ...inventoryData,
          categories: inventoryData.categories.map(cat => ({
            ...cat,
            products: [] // Solo resumen, sin productos individuales
          }))
        };
      case 'lowstock':
        return {
          ...inventoryData,
          categories: inventoryData.categories.map(cat => ({
            ...cat,
            products: cat.products.filter(product => product.status === 'low' || product.status === 'critical')
          })).filter(cat => cat.products.length > 0)
        };
      default:
        return inventoryData;
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const data = getFilteredData();
    const currentDate = new Date().toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Colores profesionales
    const primaryColor: [number, number, number] = [31, 41, 55]; // Gris oscuro profesional
    const secondaryColor: [number, number, number] = [243, 244, 246]; // Gris muy claro
    const accentColor: [number, number, number] = [59, 130, 246]; // Azul profesional
    const successColor: [number, number, number] = [34, 197, 94]; // Verde
    const warningColor: [number, number, number] = [249, 115, 22]; // Naranja
    const dangerColor: [number, number, number] = [239, 68, 68]; // Rojo

    // PORTADA PROFESIONAL
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 60, 'F');
    
    // Encabezado corporativo
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('PROSALUD', 20, 30);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Sistema Integral de Gestión de Inventario', 20, 45);
    
    // Título del reporte
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    const reportTitle = reportType === 'summary' ? 'REPORTE EJECUTIVO DE INVENTARIO' :
                       reportType === 'lowstock' ? 'REPORTE DE STOCK CRÍTICO' :
                       'REPORTE COMPLETO DE INVENTARIO';
    doc.text(reportTitle, 20, 85);
    
    // Información del documento
    doc.setFillColor(...secondaryColor);
    doc.rect(20, 100, 170, 50, 'F');
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.rect(20, 100, 170, 50, 'S');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text('INFORMACIÓN DEL DOCUMENTO', 25, 115);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    
    // Distribución en dos columnas
    doc.text(`Fecha de Generación: ${currentDate}`, 25, 125);
    doc.text(`ID del Reporte: ${data.metadata.reportId}`, 25, 133);
    doc.text(`Tipo: ${reportTitle}`, 25, 141);
    
    doc.text(`Versión del Sistema: ${data.metadata.systemVersion}`, 115, 125);
    doc.text(`Categorías: ${data.categories.length.toString()}`, 115, 133);
    doc.text(`Generado por: ${data.metadata.generatedBy}`, 115, 141);

    // Métricas principales
    const totalProducts = data.categories.reduce((sum, cat) => sum + cat.products.length, 0);
    const totalStock = data.categories.reduce((sum, cat) => 
      sum + cat.products.reduce((catSum, prod) => catSum + prod.stock, 0), 0);
    const totalValue = data.categories.reduce((sum, cat) => 
      sum + cat.products.reduce((catSum, prod) => catSum + (prod.stock * prod.value), 0), 0);
    const criticalItems = data.categories.reduce((sum, cat) => 
      sum + cat.products.filter(prod => prod.status === 'critical').length, 0);
    const lowStockItems = data.categories.reduce((sum, cat) => 
      sum + cat.products.filter(prod => prod.status === 'low').length, 0);

    // Tabla de métricas
    let yPos = 170;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text('RESUMEN EJECUTIVO', 20, yPos);
    
    yPos += 15;
    
    const metricsData = [
      ['Total de Productos', totalProducts.toLocaleString()],
      ['Stock Total', totalStock.toLocaleString() + ' unidades'],
      ['Valor Total del Inventario', '$' + totalValue.toLocaleString()],
      ['Productos con Stock Crítico', criticalItems.toString()],
      ['Productos con Stock Bajo', lowStockItems.toString()]
    ];

    autoTable(doc, {
      startY: yPos,
      head: [['Métrica', 'Valor']],
      body: metricsData,
      theme: 'striped',
      headStyles: { 
        fillColor: primaryColor, 
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: { 
        fontSize: 9,
        textColor: [0, 0, 0]
      },
      alternateRowStyles: { fillColor: secondaryColor },
      columnStyles: {
        0: { cellWidth: 80, fontStyle: 'bold' },
        1: { cellWidth: 90, halign: 'right' }
      },
      margin: { left: 20, right: 20 }
    });

    // PÁGINAS DE DETALLE POR CATEGORÍAS
    if (reportType !== 'summary') {
      data.categories.forEach((category, index) => {
        if (category.products.length === 0) return;
        
        doc.addPage();
        
        // Encabezado de categoría
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 35, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text(category.name.toUpperCase(), 20, 22);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(category.description, 20, 30);

        // Estadísticas de la categoría
        const catTotalStock = category.products.reduce((sum, prod) => sum + prod.stock, 0);
        const catTotalValue = category.products.reduce((sum, prod) => sum + (prod.stock * prod.value), 0);
        const catCriticalItems = category.products.filter(prod => prod.status === 'critical').length;
        const catLowItems = category.products.filter(prod => prod.status === 'low').length;

        // Información de la categoría en tabla limpia
        doc.setTextColor(0, 0, 0);
        let catYPos = 50;
        
        const categoryStats = [
          ['Productos en categoría', category.products.length.toString()],
          ['Stock total', catTotalStock.toLocaleString() + ' unidades'],
          ['Valor total', '$' + catTotalValue.toLocaleString()],
          ['Items críticos', catCriticalItems.toString()],
          ['Items con stock bajo', catLowItems.toString()]
        ];

        autoTable(doc, {
          startY: catYPos,
          body: categoryStats,
          theme: 'plain',
          styles: { 
            fontSize: 9,
            cellPadding: 2
          },
          columnStyles: {
            0: { cellWidth: 50, fontStyle: 'bold', textColor: primaryColor },
            1: { cellWidth: 40, halign: 'right' }
          },
          margin: { left: 20 }
        });

        // Tabla de productos con diseño profesional
        const tableData = category.products.map(product => [
          product.sku,
          product.name,
          product.stock.toString(),
          product.min.toString(),
          product.max.toString(),
          product.status === 'ok' ? 'Óptimo' : 
          product.status === 'low' ? 'Bajo' : 'Crítico',
          product.location,
          '$' + (product.stock * product.value).toLocaleString()
        ]);

        autoTable(doc, {
          startY: doc.lastAutoTable.finalY + 15,
          head: [['SKU', 'Producto', 'Stock', 'Mín', 'Máx', 'Estado', 'Ubicación', 'Valor Total']],
          body: tableData,
          theme: 'striped',
          headStyles: { 
            fillColor: primaryColor, 
            textColor: [255, 255, 255],
            fontSize: 9,
            fontStyle: 'bold'
          },
          alternateRowStyles: { fillColor: secondaryColor },
          styles: { 
            fontSize: 8,
            cellPadding: 3,
            lineColor: [200, 200, 200],
            lineWidth: 0.1
          },
          columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 50 },
            2: { cellWidth: 15, halign: 'center' },
            3: { cellWidth: 12, halign: 'center' },
            4: { cellWidth: 12, halign: 'center' },
            5: { cellWidth: 18, halign: 'center' },
            6: { cellWidth: 18, halign: 'center' },
            7: { cellWidth: 25, halign: 'right' }
          },
          didParseCell: function(data) {
            if (data.row.index >= 0 && data.column.index === 5) {
              const cellText = data.cell.raw as string;
              if (cellText === 'Crítico') {
                data.cell.styles.textColor = dangerColor;
                data.cell.styles.fontStyle = 'bold';
              } else if (cellText === 'Bajo') {
                data.cell.styles.textColor = warningColor;
                data.cell.styles.fontStyle = 'bold';
              } else {
                data.cell.styles.textColor = successColor;
              }
            }
          }
        });
      });
    }

    // Página de recomendaciones profesionales
    doc.addPage();
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 25, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('ANÁLISIS Y RECOMENDACIONES', 20, 17);

    doc.setTextColor(0, 0, 0);
    let recY = 45;

    if (criticalItems > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...dangerColor);
      doc.text('ACCIONES URGENTES REQUERIDAS', 20, recY);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${criticalItems.toString()} productos requieren reposición inmediata`, 25, recY + 10);
      doc.text('• Contactar proveedores para pedidos de emergencia', 25, recY + 18);
      doc.text('• Revisar procesos de distribución para evitar desabastecimiento', 25, recY + 26);
      recY += 45;
    }

    if (lowStockItems > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...warningColor);
      doc.text('PLANIFICACIÓN A CORTO PLAZO', 20, recY);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${lowStockItems.toString()} productos necesitan reposición planificada`, 25, recY + 10);
      doc.text('• Evaluar patrones de consumo para optimizar niveles mínimos', 25, recY + 18);
      doc.text('• Coordinar con hospitales para validar demanda proyectada', 25, recY + 26);
      recY += 45;
    }

    // Recomendaciones generales
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...accentColor);
    doc.text('MEJORAS OPERACIONALES', 20, recY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('• Implementar alertas automáticas para productos con stock bajo', 25, recY + 10);
    doc.text('• Establecer reuniones semanales de revisión de inventario', 25, recY + 18);
    doc.text('• Optimizar ubicaciones de almacenamiento según rotación', 25, recY + 26);

    // Footer profesional en todas las páginas
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Línea separadora
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.5);
      doc.line(20, 280, 190, 280);
      
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'normal');
      doc.text('ProSalud - Sistema de Gestión de Inventario', 20, 285);
      doc.text(`Página ${i.toString()} de ${pageCount.toString()}`, 160, 285);
      
      if (i > 1) {
        doc.text(currentDate, 20, 290);
        doc.text(data.metadata.reportId, 160, 290);
      }
    }

    return doc;
  };

  const generateExcelReport = () => {
    const data = getFilteredData();
    const wb = XLSX.utils.book_new();
    
    // Hoja de resumen
    const summaryData = [
      ['REPORTE DE INVENTARIO PROSALUD'],
      [`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`],
      [`ID del Reporte: ${data.metadata.reportId}`],
      [`Tipo de Reporte: ${reportType === 'summary' ? 'Ejecutivo' : reportType === 'lowstock' ? 'Stock Crítico' : 'Completo'}`],
      [''],
      ['RESUMEN GENERAL'],
      ['Métrica', 'Valor'],
      ['Total de productos', data.categories.reduce((sum, cat) => sum + cat.products.length, 0)],
      ['Stock total', data.categories.reduce((sum, cat) => 
        sum + cat.products.reduce((catSum, prod) => catSum + prod.stock, 0), 0)],
      ['Valor total inventario', data.categories.reduce((sum, cat) => 
        sum + cat.products.reduce((catSum, prod) => catSum + (prod.stock * prod.value), 0), 0)],
      ['Productos con stock bajo', data.categories.reduce((sum, cat) => 
        sum + cat.products.filter(prod => prod.status === 'low' || prod.status === 'critical').length, 0)]
    ];

    const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Resumen');

    if (reportType !== 'summary') {
      // Hoja detallada con información expandida
      const detailData = [
        ['Categoría', 'SKU', 'Producto', 'Stock Actual', 'Stock Mínimo', 'Stock Máximo', 'Estado', 'Ubicación', 'Valor Unitario', 'Valor Total']
      ];

      data.categories.forEach(category => {
        category.products.forEach(product => {
          detailData.push([
            category.name,
            product.sku,
            product.name,
            product.stock,
            product.min,
            product.max,
            product.status === 'ok' ? 'Óptimo' : 
            product.status === 'low' ? 'Bajo' : 'Crítico',
            product.location,
            product.value,
            product.stock * product.value
          ]);
        });
      });

      const detailWs = XLSX.utils.aoa_to_sheet(detailData);
      XLSX.utils.book_append_sheet(wb, detailWs, 'Detalle Inventario');
    }

    // Hoja de productos con stock bajo (siempre incluida)
    const lowStockData = [
      ['PRODUCTOS CON STOCK BAJO'],
      [''],
      ['Categoría', 'SKU', 'Producto', 'Stock Actual', 'Stock Mínimo', 'Estado', 'Ubicación', 'Acción Requerida']
    ];

    inventoryData.categories.forEach(category => {
      category.products
        .filter(product => product.status === 'low' || product.status === 'critical')
        .forEach(product => {
          lowStockData.push([
            category.name,
            product.sku,
            product.name,
            product.stock.toString(),
            product.min.toString(),
            product.status === 'low' ? 'Stock Bajo' : 'Stock Crítico',
            product.location,
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
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular procesamiento

      const reportTypeText = reportType === 'summary' ? 'Ejecutivo' : 
                            reportType === 'lowstock' ? 'Stock_Critico' : 'Completo';

      if (format === 'pdf') {
        const doc = generatePDFReport();
        doc.save(`Reporte_${reportTypeText}_ProSalud_${new Date().toISOString().split('T')[0]}.pdf`);
        
        toast({
          title: "Reporte PDF Generado",
          description: `El reporte ${reportTypeText.toLowerCase()} en PDF se ha descargado exitosamente`,
        });
      } else {
        const wb = generateExcelReport();
        XLSX.writeFile(wb, `Reporte_${reportTypeText}_ProSalud_${new Date().toISOString().split('T')[0]}.xlsx`);
        
        toast({
          title: "Reporte Excel Generado",
          description: `El reporte ${reportTypeText.toLowerCase()} en Excel se ha descargado exitosamente`,
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
            Genera un reporte profesional del inventario en el formato de tu preferencia
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tipo de Reporte</label>
            <Select value={reportType} onValueChange={setReportType}>
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

          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Información del Reporte</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    {reportType === 'summary' && 'Reporte ejecutivo con métricas clave y resumen de categorías.'}
                    {reportType === 'lowstock' && 'Reporte enfocado en productos que requieren reposición urgente.'}
                    {reportType === 'full' && 'Reporte completo con información detallada de todos los productos, ubicaciones, SKUs y valores.'}
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
