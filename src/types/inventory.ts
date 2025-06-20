
export interface Product {
  id: string;
  name: string;
  category: 'uniforme' | 'tapabocas' | 'batas' | 'regalo' | 'implemento';
  description?: string;
  image?: string;
  variants?: ProductVariant[];
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size?: string;
  color?: string;
  stock: number;
  min_stock: number;
  max_stock: number;
  sku: string;
}

export interface SupplierDelivery {
  id: string;
  supplier_name: string;
  delivery_date: string;
  items: DeliveryItem[];
  total_items: number;
  status: 'pending' | 'received' | 'completed';
  notes?: string;
  created_at: string;
}

export interface DeliveryItem {
  id: string;
  delivery_id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  unit_cost?: number;
  expiry_date?: string;
}

export interface Return {
  id: string;
  hospital_name: string;
  coordinator_name: string;
  return_date: string;
  items: ReturnItem[];
  reason: 'excess' | 'incorrect' | 'defective' | 'expired' | 'other';
  status: 'pending' | 'approved' | 'processed';
  notes?: string;
  created_at: string;
}

export interface ReturnItem {
  id: string;
  return_id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  condition: 'new' | 'used' | 'damaged';
}

export interface Request {
  id: string;
  hospital_name: string;
  coordinator_name: string;
  coordinator_email: string;
  request_date: string;
  items: RequestItem[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'preparing' | 'shipped' | 'delivered' | 'rejected';
  notes?: string;
  approved_by?: string;
  approved_date?: string;
  created_at: string;
}

export interface RequestItem {
  id: string;
  request_id: string;
  product_id: string;
  variant_id?: string;
  quantity_requested: number;
  quantity_approved?: number;
  justification?: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  coordinator_name: string;
  coordinator_email: string;
  coordinator_phone?: string;
  stock_allocation: HospitalStock[];
}

export interface HospitalStock {
  id: string;
  hospital_id: string;
  product_id: string;
  variant_id?: string;
  allocated_quantity: number;
  current_quantity: number;
  min_threshold: number;
}

export type InventoryFilter = {
  category?: Product['category'];
  lowStock?: boolean;
  search?: string;
  hospital?: string;
};

export type RequestFilter = {
  status?: Request['status'];
  priority?: Request['priority'];
  hospital?: string;
  dateRange?: {
    start: string;
    end: string;
  };
};
