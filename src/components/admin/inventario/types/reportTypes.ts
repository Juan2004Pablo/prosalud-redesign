
export interface ReportMetadata {
  lastUpdate: string;
  totalCategories: number;
  systemVersion: string;
  generatedBy: string;
  reportId: string;
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

export interface ReportData {
  metadata: ReportMetadata;
  categories: ReportCategory[];
}

export type ReportType = 'full' | 'summary' | 'lowstock';
export type ReportFormat = 'pdf' | 'excel';
