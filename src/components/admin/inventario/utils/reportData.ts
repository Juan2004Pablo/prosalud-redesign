
import { ReportData, RequestRecord, ReturnRecord, DeliveryRecord } from '../types/reportTypes';
import { mockProducts, mockInventoryRequests, mockReturns, mockSupplierDeliveries } from '@/services/mockData';

const getMockRequests = (): RequestRecord[] => {
  return mockInventoryRequests.map(request => ({
    id: request.id,
    hospital: request.hospital_name,
    coordinator: request.coordinator_name,
    date: request.request_date,
    products: request.items.map(item => {
      const product = mockProducts.find(p => p.id === item.product_id);
      const variant = product?.variants?.find(v => v.id === item.variant_id);
      return `${product?.name || 'Producto desconocido'}${variant?.size ? ` - ${variant.size}` : ''}${variant?.color ? ` - ${variant.color}` : ''}`;
    }),
    status: request.status === 'preparing' || request.status === 'shipped' || request.status === 'rejected' 
      ? 'pending' 
      : request.status === 'delivered'
      ? 'delivered'
      : request.status === 'approved'
      ? 'approved'
      : 'pending',
    priority: request.priority
  }));
};

const getMockReturns = (): ReturnRecord[] => {
  return mockReturns.map(returnItem => ({
    id: returnItem.id,
    hospital: returnItem.hospital_name,
    coordinator: returnItem.coordinator_name,
    date: returnItem.return_date,
    products: returnItem.items.map(item => {
      const product = mockProducts.find(p => p.id === item.product_id);
      const variant = product?.variants?.find(v => v.id === item.variant_id);
      return `${product?.name || 'Producto desconocido'}${variant?.size ? ` - ${variant.size}` : ''}${variant?.color ? ` - ${variant.color}` : ''}`;
    }),
    reason: returnItem.reason === 'incorrect' ? 'Talla incorrecta' : 
            returnItem.reason === 'defective' ? 'Producto defectuoso' : 
            returnItem.reason === 'excess' ? 'Exceso de stock' : 
            returnItem.reason === 'expired' ? 'Producto vencido' : returnItem.reason,
    status: returnItem.status === 'approved' ? 'processed' : 
            returnItem.status === 'processed' ? 'processed' : 'pending'
  }));
};

const getMockDeliveries = (): DeliveryRecord[] => {
  return mockSupplierDeliveries.map(delivery => ({
    id: delivery.id,
    supplier: delivery.supplier_name,
    date: delivery.delivery_date,
    products: delivery.items.map(item => {
      const product = mockProducts.find(p => p.id === item.product_id);
      return product?.name || 'Producto desconocido';
    }),
    status: delivery.status,
    totalItems: delivery.total_items
  }));
};

export const getInventoryData = (): ReportData => {
  // Generar categorías dinámicamente basadas en todos los productos mock
  const categoriesByType = mockProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    
    // Agregar productos con variantes
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach(variant => {
        acc[product.category].push({
          name: `${product.name}${variant.size ? ` - ${variant.size}` : ''}${variant.color ? ` - ${variant.color}` : ''}`,
          stock: variant.stock,
          min: variant.min_stock,
          max: variant.max_stock,
          status: (variant.stock <= variant.min_stock ? 
            (variant.stock === 0 ? 'critical' : 'low') : 'ok') as 'ok' | 'low' | 'critical',
          value: getProductValue(product.name, product.category),
          sku: variant.sku,
          location: generateLocation(product.category)
        });
      });
    } else {
      // Productos sin variantes
      acc[product.category].push({
        name: product.name,
        stock: Math.floor(Math.random() * 100) + 10,
        min: Math.floor(Math.random() * 20) + 5,
        max: Math.floor(Math.random() * 50) + 50,
        status: 'ok' as 'ok' | 'low' | 'critical',
        value: getProductValue(product.name, product.category),
        sku: `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        location: generateLocation(product.category)
      });
    }
    
    return acc;
  }, {} as Record<string, any[]>);

  const categories = [
    {
      name: 'Uniformes',
      description: 'Uniformes médicos para personal de salud',
      products: categoriesByType['uniforme'] || []
    },
    {
      name: 'Tapabocas',
      description: 'Equipos de protección respiratoria',
      products: categoriesByType['tapabocas'] || []
    },
    {
      name: 'Batas',
      description: 'Batas médicas y de laboratorio',
      products: categoriesByType['batas'] || []
    },
    {
      name: 'Regalos',
      description: 'Artículos promocionales y de bienestar',
      products: categoriesByType['regalo'] || []
    },
    {
      name: 'Implementos',
      description: 'Implementos médicos y equipos de protección',
      products: categoriesByType['implemento'] || []
    }
  ];

  return {
    metadata: {
      lastUpdate: new Date().toLocaleDateString('es-ES'),
      totalCategories: categories.length,
      systemVersion: '2.1.0',
      generatedBy: 'Sistema ProSalud',
      reportId: 'RPT-' + Date.now()
    },
    categories,
    requests: getMockRequests(),
    returns: getMockReturns(),
    deliveries: getMockDeliveries()
  };
};

const getProductValue = (productName: string, category: string): number => {
  // Valores más realistas basados en el tipo de producto
  switch (category) {
    case 'uniforme':
      return 45000;
    case 'tapabocas':
      if (productName.includes('N95')) return 2500;
      if (productName.includes('KN95')) return 1800;
      return 800;
    case 'batas':
      if (productName.includes('Laboratorio')) return 42000;
      if (productName.includes('Desechable')) return 3500;
      return 35000;
    case 'implemento':
      if (productName.includes('Estetoscopio')) return 120000;
      if (productName.includes('Tensiómetro')) return 85000;
      if (productName.includes('Termómetro')) return 45000;
      if (productName.includes('Zapatos') || productName.includes('Botas')) return 65000;
      return 15000;
    case 'regalo':
      if (productName.includes('Kit')) return 25000;
      if (productName.includes('Termo')) return 18000;
      if (productName.includes('Chaqueta')) return 35000;
      return 15000;
    default:
      return 10000;
  }
};

const generateLocation = (category: string): string => {
  const locationPrefixes: Record<string, string> = {
    'uniforme': 'A',
    'tapabocas': 'B',
    'batas': 'C',
    'regalo': 'D',
    'implemento': 'E'
  };
  
  const prefix = locationPrefixes[category] || 'X';
  const section = Math.floor(Math.random() * 3) + 1;
  const position = String(Math.floor(Math.random() * 10) + 1).padStart(2, '0');
  
  return `${prefix}-${section}-${position}`;
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
