
import * as XLSX from 'xlsx';
import { ReportData, ReportType } from '../types/reportTypes';

export const generateExcelReport = (data: ReportData, reportType: ReportType): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();
  
  // Summary sheet
  const summaryData = [
    ['REPORTE DE INVENTARIO PROSALUD'],
    [`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`],
    [`ID del Reporte: ${data.metadata.reportId}`],
    [`Tipo de Reporte: ${reportType === 'summary' ? 'Ejecutivo' : reportType === 'lowstock' ? 'Stock Crítico' : 'Completo'}`],
    [''],
    ['RESUMEN GENERAL'],
    ['Métrica', 'Valor'],
    ['Total de productos', data.categories.reduce((sum, cat) => sum + cat.products.length, 0).toString()],
    ['Stock total', data.categories.reduce((sum, cat) => 
      sum + cat.products.reduce((catSum, prod) => catSum + prod.stock, 0), 0).toString()],
    ['Valor total inventario', data.categories.reduce((sum, cat) => 
      sum + cat.products.reduce((catSum, prod) => catSum + (prod.stock * prod.value), 0), 0).toString()],
    ['Productos con stock bajo', data.categories.reduce((sum, cat) => 
      sum + cat.products.filter(prod => prod.status === 'low' || prod.status === 'critical').length, 0).toString()]
  ];

  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, 'Resumen');

  if (reportType !== 'summary') {
    // Detailed sheet
    const detailData = [
      ['Categoría', 'SKU', 'Producto', 'Stock Actual', 'Stock Mínimo', 'Stock Máximo', 'Estado', 'Ubicación', 'Valor Unitario', 'Valor Total']
    ];

    data.categories.forEach(category => {
      category.products.forEach(product => {
        detailData.push([
          category.name,
          product.sku,
          product.name,
          product.stock.toString(),
          product.min.toString(),
          product.max.toString(),
          product.status === 'ok' ? 'Óptimo' : 
          product.status === 'low' ? 'Bajo' : 'Crítico',
          product.location,
          product.value.toString(),
          (product.stock * product.value).toString()
        ]);
      });
    });

    const detailWs = XLSX.utils.aoa_to_sheet(detailData);
    XLSX.utils.book_append_sheet(wb, detailWs, 'Detalle Inventario');
  }

  // Low stock sheet
  const lowStockData = [
    ['PRODUCTOS CON STOCK BAJO'],
    [''],
    ['Categoría', 'SKU', 'Producto', 'Stock Actual', 'Stock Mínimo', 'Estado', 'Ubicación', 'Acción Requerida']
  ];

  data.categories.forEach(category => {
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
