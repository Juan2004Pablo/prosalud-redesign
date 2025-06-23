
import { ReportData } from '../types/reportTypes';

export const getInventoryData = (): ReportData => {
  return {
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
};

export const getFilteredData = (reportType: string, data: ReportData): ReportData => {
  switch (reportType) {
    case 'summary':
      return {
        ...data,
        categories: data.categories.map(cat => ({
          ...cat,
          products: []
        }))
      };
    case 'lowstock':
      return {
        ...data,
        categories: data.categories.map(cat => ({
          ...cat,
          products: cat.products.filter(product => product.status === 'low' || product.status === 'critical')
        })).filter(cat => cat.products.length > 0)
      };
    default:
      return data;
  }
};
