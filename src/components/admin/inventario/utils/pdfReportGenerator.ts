
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportData, ReportType } from '../types/reportTypes';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

export const generatePDFReport = (data: ReportData, reportType: ReportType): jsPDF => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Professional colors
  const primaryColor: [number, number, number] = [31, 41, 55];
  const lightGray: [number, number, number] = [243, 244, 246];
  const mediumGray: [number, number, number] = [107, 114, 128];

  // PROFESSIONAL HEADER
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 50, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('PROSALUD', 20, 25);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Sistema Integral de Gestión de Inventario', 20, 35);
  
  // Report title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  const reportTitle = reportType === 'summary' ? 'REPORTE EJECUTIVO DE INVENTARIO' :
                     reportType === 'lowstock' ? 'REPORTE DE STOCK CRÍTICO' :
                     'REPORTE COMPLETO DE INVENTARIO';
  doc.text(reportTitle, 20, 70);
  
  // Document information
  doc.setFillColor(...lightGray);
  doc.rect(20, 85, 170, 35, 'F');
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.3);
  doc.rect(20, 85, 170, 35, 'S');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('INFORMACIÓN DEL DOCUMENTO', 25, 95);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  
  doc.text(`Fecha: ${currentDate}`, 25, 103);
  doc.text(`ID: ${data.metadata.reportId}`, 25, 109);
  doc.text(`Tipo: ${reportTitle}`, 25, 115);
  
  doc.text(`Versión: ${data.metadata.systemVersion}`, 115, 103);
  doc.text(`Categorías: ${data.categories.length}`, 115, 109);
  doc.text(`Por: ${data.metadata.generatedBy}`, 115, 115);

  // Executive metrics
  const totalProducts = data.categories.reduce((sum, cat) => sum + cat.products.length, 0);
  const totalStock = data.categories.reduce((sum, cat) => 
    sum + cat.products.reduce((catSum, prod) => catSum + prod.stock, 0), 0);
  const totalValue = data.categories.reduce((sum, cat) => 
    sum + cat.products.reduce((catSum, prod) => catSum + (prod.stock * prod.value), 0), 0);
  const criticalItems = data.categories.reduce((sum, cat) => 
    sum + cat.products.filter(prod => prod.status === 'critical').length, 0);
  const lowStockItems = data.categories.reduce((sum, cat) => 
    sum + cat.products.filter(prod => prod.status === 'low').length, 0);

  let yPos = 135;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('RESUMEN EJECUTIVO', 20, yPos);
  
  yPos += 10;
  
  const metricsData = [
    ['Total de Productos', totalProducts.toString()],
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
      fontSize: 9,
      fontStyle: 'bold'
    },
    bodyStyles: { 
      fontSize: 8,
      textColor: [0, 0, 0]
    },
    alternateRowStyles: { fillColor: lightGray },
    columnStyles: {
      0: { cellWidth: 90, fontStyle: 'bold' },
      1: { cellWidth: 80, halign: 'right' }
    },
    margin: { left: 20, right: 20 }
  });

  // CATEGORY DETAILS
  if (reportType !== 'summary') {
    data.categories.forEach((category) => {
      if (category.products.length === 0) return;
      
      doc.addPage();
      
      // Category header
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, 210, 30, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(category.name.toUpperCase(), 20, 18);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(category.description, 20, 25);

      // Category statistics
      const catTotalStock = category.products.reduce((sum, prod) => sum + prod.stock, 0);
      const catTotalValue = category.products.reduce((sum, prod) => sum + (prod.stock * prod.value), 0);
      const catCriticalItems = category.products.filter(prod => prod.status === 'critical').length;
      const catLowItems = category.products.filter(prod => prod.status === 'low').length;

      doc.setTextColor(0, 0, 0);
      let catYPos = 40;
      
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
          fontSize: 8,
          cellPadding: 1.5
        },
        columnStyles: {
          0: { cellWidth: 60, fontStyle: 'bold', textColor: primaryColor },
          1: { cellWidth: 50, halign: 'right' }
        },
        margin: { left: 20 }
      });

      // Products table
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
        startY: doc.lastAutoTable.finalY + 10,
        head: [['SKU', 'Producto', 'Stock', 'Mín', 'Máx', 'Estado', 'Ubicación', 'Valor Total']],
        body: tableData,
        theme: 'striped',
        headStyles: { 
          fillColor: primaryColor, 
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: 'bold'
        },
        alternateRowStyles: { fillColor: lightGray },
        styles: { 
          fontSize: 7,
          cellPadding: 2,
          lineColor: [200, 200, 200],
          lineWidth: 0.1
        },
        columnStyles: {
          0: { cellWidth: 22 },
          1: { cellWidth: 55 },
          2: { cellWidth: 15, halign: 'center' },
          3: { cellWidth: 12, halign: 'center' },
          4: { cellWidth: 12, halign: 'center' },
          5: { cellWidth: 18, halign: 'center' },
          6: { cellWidth: 20, halign: 'center' },
          7: { cellWidth: 26, halign: 'right' }
        },
        didParseCell: function(data) {
          if (data.row.index >= 0 && data.column.index === 5) {
            const cellText = data.cell.raw as string;
            if (cellText === 'Crítico') {
              data.cell.styles.textColor = [220, 38, 38];
              data.cell.styles.fontStyle = 'bold';
            } else if (cellText === 'Bajo') {
              data.cell.styles.textColor = [245, 158, 11];
              data.cell.styles.fontStyle = 'bold';
            } else {
              data.cell.styles.textColor = [34, 197, 94];
            }
          }
        }
      });
    });
  }

  // Professional footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    doc.setDrawColor(...mediumGray);
    doc.setLineWidth(0.3);
    doc.line(20, 280, 190, 280);
    
    doc.setFontSize(7);
    doc.setTextColor(...mediumGray);
    doc.setFont('helvetica', 'normal');
    doc.text('ProSalud - Sistema de Gestión de Inventario', 20, 285);
    doc.text(`Página ${i} de ${pageCount}`, 165, 285);
    
    if (i > 1) {
      doc.text(currentDate, 20, 290);
      doc.text(data.metadata.reportId, 140, 290);
    }
  }

  return doc;
};
