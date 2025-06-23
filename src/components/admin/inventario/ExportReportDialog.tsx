
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
        icon: '👔',
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
        icon: '😷',
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
        icon: '🥼',
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
        icon: '🎁',
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
    
    // Colores ProSalud (properly typed as tuples)
    const primaryColor: [number, number, number] = [37, 99, 235]; // Azul ProSalud
    const secondaryColor: [number, number, number] = [249, 250, 251]; // Gris claro
    const accentColor: [number, number, number] = [16, 185, 129]; // Verde
    const warningColor: [number, number, number] = [245, 158, 11]; // Amarillo
    const dangerColor: [number, number, number] = [239, 68, 68]; // Rojo

    // PÁGINA 1: PORTADA PROFESIONAL
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 80, 'F');
    
    // Logo y título principal
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('PROSALUD', 20, 35);
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text('Sistema de Gestión de Inventario', 20, 50);
    
    // Información del reporte
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    const reportTitle = reportType === 'summary' ? 'REPORTE EJECUTIVO DE INVENTARIO' :
                       reportType === 'lowstock' ? 'REPORTE DE STOCK CRÍTICO' :
                       'REPORTE COMPLETO DE INVENTARIO';
    doc.text(reportTitle, 20, 110);
    
    // Metadatos en formato profesional
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(20, 130, 170, 60, 'F');
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(20, 130, 170, 60, 'S');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('INFORMACIÓN DEL REPORTE', 25, 145);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`📅 Fecha de Generación: ${currentDate}`, 25, 160);
    doc.text(`🆔 ID del Reporte: ${data.metadata.reportId}`, 25, 170);
    doc.text(`📊 Tipo de Reporte: ${reportTitle}`, 25, 180);
    doc.text(`⚙️ Versión del Sistema: ${data.metadata.systemVersion}`, 110, 160);
    doc.text(`📁 Categorías Incluidas: ${data.categories.length.toString()}`, 110, 170);
    doc.text(`👤 Generado por: ${data.metadata.generatedBy}`, 110, 180);

    // Resumen ejecutivo
    const totalProducts = data.categories.reduce((sum, cat) => sum + cat.products.length, 0);
    const totalStock = data.categories.reduce((sum, cat) => 
      sum + cat.products.reduce((catSum, prod) => catSum + prod.stock, 0), 0);
    const totalValue = data.categories.reduce((sum, cat) => 
      sum + cat.products.reduce((catSum, prod) => catSum + (prod.stock * prod.value), 0), 0);
    const lowStockItems = data.categories.reduce((sum, cat) => 
      sum + cat.products.filter(prod => prod.status === 'low' || prod.status === 'critical').length, 0);
    const criticalItems = data.categories.reduce((sum, cat) => 
      sum + cat.products.filter(prod => prod.status === 'critical').length, 0);

    // Tarjetas de métricas
    let yPos = 210;
    const cardWidth = 80;
    const cardHeight = 35;
    const margin = 10;

    // Tarjeta 1: Total Productos
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(20, yPos, cardWidth, cardHeight, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(totalProducts.toString(), 35, yPos + 15);
    doc.setFontSize(9);
    doc.text('📦 Total Productos', 25, yPos + 28);

    // Tarjeta 2: Stock Total
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(20 + cardWidth + margin, yPos, cardWidth, cardHeight, 'F');
    doc.text(totalStock.toLocaleString(), 35 + cardWidth + margin, yPos + 15);
    doc.text('📊 Stock Total', 25 + cardWidth + margin, yPos + 28);

    // Tarjeta 3: Valor Total
    if (reportType !== 'lowstock') {
      yPos += cardHeight + margin;
      doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.rect(20, yPos, cardWidth, cardHeight, 'F');
      doc.text(`$${(totalValue / 1000000).toFixed(1)}M`, 30, yPos + 15);
      doc.text('💰 Valor Total', 25, yPos + 28);
    }

    // Tarjeta 4: Items Críticos
    doc.setFillColor(dangerColor[0], dangerColor[1], dangerColor[2]);
    doc.rect(20 + cardWidth + margin, yPos, cardWidth, cardHeight, 'F');
    doc.text(criticalItems.toString(), 35 + cardWidth + margin, yPos + 15);
    doc.text('🚨 Stock Crítico', 25 + cardWidth + margin, yPos + 28);

    // PÁGINA 2+: DETALLE POR CATEGORÍAS
    if (reportType !== 'summary') {
      data.categories.forEach((category, index) => {
        if (category.products.length === 0) return;
        
        doc.addPage();
        
        // Header de categoría
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text(`${category.icon} ${category.name.toUpperCase()}`, 20, 25);
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(category.description, 20, 35);

        // Estadísticas de la categoría
        const catTotalStock = category.products.reduce((sum, prod) => sum + prod.stock, 0);
        const catTotalValue = category.products.reduce((sum, prod) => sum + (prod.stock * prod.value), 0);
        const catLowStock = category.products.filter(prod => prod.status === 'low' || prod.status === 'critical').length;

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        let statsY = 55;
        doc.text(`📦 Productos en categoría: ${category.products.length.toString()}`, 20, statsY);
        doc.text(`📊 Stock total: ${catTotalStock.toLocaleString()}`, 80, statsY);
        doc.text(`💰 Valor: $${catTotalValue.toLocaleString()}`, 140, statsY);
        if (catLowStock > 0) {
          doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2]);
          doc.text(`⚠️ Requieren atención: ${catLowStock.toString()}`, 20, statsY + 10);
        }

        // Tabla de productos con diseño mejorado
        const tableData = category.products.map(product => [
          product.sku,
          product.name,
          product.stock.toString(),
          product.min.toString(),
          product.max.toString(),
          product.status === 'ok' ? '✅ Óptimo' : 
          product.status === 'low' ? '⚠️ Bajo' : '🚨 Crítico',
          product.location,
          `$${(product.stock * product.value).toLocaleString()}`
        ]);

        autoTable(doc, {
          startY: statsY + 20,
          head: [['SKU', 'Producto', 'Stock', 'Mín', 'Máx', 'Estado', 'Ubicación', 'Valor Total']],
          body: tableData,
          theme: 'grid',
          headStyles: { 
            fillColor: primaryColor, 
            textColor: 255,
            fontSize: 9,
            fontStyle: 'bold'
          },
          alternateRowStyles: { fillColor: secondaryColor },
          styles: { 
            fontSize: 8,
            cellPadding: 3
          },
          columnStyles: {
            0: { cellWidth: 18 },
            1: { cellWidth: 45 },
            2: { cellWidth: 15, halign: 'center' },
            3: { cellWidth: 12, halign: 'center' },
            4: { cellWidth: 12, halign: 'center' },
            5: { cellWidth: 20, halign: 'center' },
            6: { cellWidth: 18, halign: 'center' },
            7: { cellWidth: 25, halign: 'right' }
          },
          didParseCell: function(data) {
            if (data.row.index >= 0 && data.column.index === 5) {
              const cellText = data.cell.raw?.toString() || '';
              if (cellText.includes('🚨')) {
                data.cell.styles.textColor = dangerColor;
              } else if (cellText.includes('⚠️')) {
                data.cell.styles.textColor = warningColor;
              } else {
                data.cell.styles.textColor = accentColor;
              }
            }
          }
        });
      });
    }

    // Página final: Recomendaciones
    doc.addPage();
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('🎯 RECOMENDACIONES Y ACCIONES', 20, 20);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    let recY = 50;

    if (criticalItems > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2]);
      doc.text('🚨 ACCIONES URGENTES:', 20, recY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${criticalItems.toString()} productos requieren reposición inmediata`, 25, recY + 10);
      doc.text('• Contactar proveedores para pedidos de emergencia', 25, recY + 20);
      recY += 35;
    }

    if (lowStockItems > criticalItems) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(warningColor[0], warningColor[1], warningColor[2]);
      doc.text('⚠️ PLANIFICACIÓN A CORTO PLAZO:', 20, recY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${(lowStockItems - criticalItems).toString()} productos necesitan reposición planificada`, 25, recY + 10);
      doc.text('• Revisar patrones de consumo para optimizar niveles mínimos', 25, recY + 20);
      recY += 35;
    }

    // Footer en todas las páginas
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('ProSalud - Sistema de Gestión de Inventario', 20, 285);
      doc.text(`Página ${i.toString()} de ${pageCount.toString()}`, 170, 285);
      if (i > 1) {
        doc.text(`📅 ${currentDate}`, 20, 290);
        doc.text(`🆔 ${data.metadata.reportId}`, 170, 290);
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
            product.stock,
            product.min,
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
          variant: "default"
        });
      } else {
        const wb = generateExcelReport();
        XLSX.writeFile(wb, `Reporte_${reportTypeText}_ProSalud_${new Date().toISOString().split('T')[0]}.xlsx`);
        
        toast({
          title: "Reporte Excel Generado",
          description: `El reporte ${reportTypeText.toLowerCase()} en Excel se ha descargado exitosamente`,
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
                    <span>📊</span>
                    <span>Reporte Completo</span>
                  </div>
                </SelectItem>
                <SelectItem value="summary">
                  <div className="flex items-center space-x-2">
                    <span>📈</span>
                    <span>Reporte Ejecutivo</span>
                  </div>
                </SelectItem>
                <SelectItem value="lowstock">
                  <div className="flex items-center space-x-2">
                    <span>⚠️</span>
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
