
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
      return `${product?.name || 'Producto desconocido'}${variant?.size ? ` - ${variant.size}` : ''}`;
    }),
    // Map inventory request status to report status
    status: request.status === 'preparing' || request.status === 'shipped' || request.status === 'rejected' 
      ? 'pending' 
      : request.status as 'pending' | 'approved' | 'delivered',
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
      return `${product?.name || 'Producto desconocido'}${variant?.size ? ` - ${variant.size}` : ''}`;
    }),
    reason: returnItem.reason === 'incorrect' ? 'Talla incorrecta' : 
            returnItem.reason === 'defective' ? 'Producto defectuoso' : 
            returnItem.reason === 'excess' ? 'Exceso de stock' : returnItem.reason,
    // Map return status to report status (remove 'approved')
    status: returnItem.status === 'approved' ? 'processed' : returnItem.status as 'pending' | 'processed'
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
  // Transform products data for the report
  const categories = [
    {
      name: 'Uniformes',
      description: 'Uniformes médicos para personal de salud',
      products: mockProducts
        .filter(p => p.category === 'uniforme')
        .flatMap(product => 
          product.variants?.map(variant => ({
            name: `${product.name} - ${variant.size || 'Único'}`,
            stock: variant.stock,
            min: variant.min_stock,
            max: variant.max_stock,
            status: (variant.stock <= variant.min_stock ? 
              (variant.stock === 0 ? 'critical' : 'low') : 'ok') as 'ok' | 'low' | 'critical',
            value: 45000,
            sku: variant.sku,
            location: `A-${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}`
          })) || []
        )
    },
    {
      name: 'Tapabocas',
      description: 'Equipos de protección respiratoria',
      products: mockProducts
        .filter(p => p.category === 'tapabocas')
        .flatMap(product => 
          product.variants?.map(variant => ({
            name: product.name,
            stock: variant.stock,
            min: variant.min_stock,
            max: variant.max_stock,
            status: (variant.stock <= variant.min_stock ? 
              (variant.stock === 0 ? 'critical' : 'low') : 'ok') as 'ok' | 'low' | 'critical',
            value: product.name.includes('N95') ? 2500 : 800,
            sku: variant.sku,
            location: `B-${Math.floor(Math.random() * 2) + 1}-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}`
          })) || []
        )
    },
    {
      name: 'Batas',
      description: 'Batas médicas y de laboratorio',
      products: mockProducts
        .filter(p => p.category === 'batas')
        .flatMap(product => 
          product.variants?.map(variant => ({
            name: `${product.name} - ${variant.size || 'Único'}`,
            stock: variant.stock,
            min: variant.min_stock,
            max: variant.max_stock,
            status: (variant.stock <= variant.min_stock ? 
              (variant.stock === 0 ? 'critical' : 'low') : 'ok') as 'ok' | 'low' | 'critical',
            value: 35000,
            sku: variant.sku,
            location: `C-${Math.floor(Math.random() * 2) + 1}-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}`
          })) || []
        )
    },
    {
      name: 'Regalos e Implementos',
      description: 'Artículos promocionales, de bienestar e implementos médicos',
      products: mockProducts
        .filter(p => p.category === 'regalo' || p.category === 'implemento')
        .flatMap(product => 
          product.variants?.map(variant => ({
            name: `${product.name}${variant.size ? ` - ${variant.size}` : ''}`,
            stock: variant.stock,
            min: variant.min_stock,
            max: variant.max_stock,
            status: (variant.stock <= variant.min_stock ? 
              (variant.stock === 0 ? 'critical' : 'low') : 'ok') as 'ok' | 'low' | 'critical',
            value: product.category === 'regalo' ? 25000 : 15000,
            sku: variant.sku,
            location: `D-${Math.floor(Math.random() * 2) + 1}-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}`
          })) || []
        )
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
