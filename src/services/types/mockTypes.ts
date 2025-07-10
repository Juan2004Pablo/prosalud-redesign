
export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  stock: number;
  min_stock: number;
  max_stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  variants: ProductVariant[];
  createdAt: string;
}

export interface InventoryRequestItem {
  product_id: string;
  variant_id: string;
  quantity: number;
  requested_quantity: number;
}

export interface InventoryRequest {
  id: string;
  hospital_name: string;
  coordinator_name: string;
  request_date: string;
  status: 'pending' | 'approved' | 'preparing' | 'shipped' | 'delivered' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  items: InventoryRequestItem[];
  notes?: string;
}
