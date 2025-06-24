
export interface ReportMetadata {
  lastUpdate: string;
  totalCategories: number;
  systemVersion: string;
  generatedBy: string;
  reportId: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ReportProduct {
  name: string;
  stock: number;
  min: number;
  max: number;
  status: 'ok' | 'low' | 'critical';
  value: number;
  sku: string;
  location: string;
}

export interface ReportCategory {
  name: string;
  description: string;
  products: ReportProduct[];
}

export interface RequestRecord {
  id: string;
  hospital: string;
  coordinator: string;
  date: string;
  products: string[];
  status: 'pending' | 'approved' | 'delivered';
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface ReturnRecord {
  id: string;
  hospital: string;
  coordinator: string;
  date: string;
  products: string[];
  reason: string;
  status: 'pending' | 'processed';
}

export interface DeliveryRecord {
  id: string;
  supplier: string;
  date: string;
  products: string[];
  status: 'pending' | 'received' | 'completed';
  totalItems: number;
}

export interface ReportData {
  metadata: ReportMetadata;
  categories: ReportCategory[];
  requests?: RequestRecord[];
  returns?: ReturnRecord[];
  deliveries?: DeliveryRecord[];
}

export type ReportType = 'full' | 'summary' | 'lowstock';
export type ReportFormat = 'pdf' | 'excel';

export interface DateRangeFilter {
  start?: Date;
  end?: Date;
  includeAll: boolean;
}
