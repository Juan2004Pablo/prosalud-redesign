
import { Request, RequestFilters, RequestStats } from '@/types/requests';
import { mockSolicitudesRequests } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const solicitudesService = {
  async getRequests(filters?: RequestFilters): Promise<Request[]> {
    await delay(500);
    
    let filteredRequests = [...mockSolicitudesRequests];
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredRequests = filteredRequests.filter(request => 
        request.name.toLowerCase().includes(searchTerm) ||
        request.last_name.toLowerCase().includes(searchTerm) ||
        request.email.toLowerCase().includes(searchTerm) ||
        request.request_type.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters?.status && filters.status !== 'all') {
      filteredRequests = filteredRequests.filter(request => request.status === filters.status);
    }
    
    if (filters?.request_type && filters.request_type !== 'all') {
      filteredRequests = filteredRequests.filter(request => request.request_type === filters.request_type);
    }
    
    if (filters?.date_from) {
      filteredRequests = filteredRequests.filter(request => 
        new Date(request.created_at) >= new Date(filters.date_from!)
      );
    }
    
    if (filters?.date_to) {
      filteredRequests = filteredRequests.filter(request => 
        new Date(request.created_at) <= new Date(filters.date_to!)
      );
    }
    
    return filteredRequests;
  },

  async getRequestById(id: string): Promise<Request | null> {
    await delay(300);
    return mockSolicitudesRequests.find(request => request.id === id) || null;
  },

  async updateRequestStatus(id: string, status: Request['status'], notes?: string): Promise<Request> {
    await delay(600);
    const requestIndex = mockSolicitudesRequests.findIndex(request => request.id === id);
    if (requestIndex === -1) throw new Error('Solicitud no encontrada');
    
    const now = new Date().toISOString();
    const updates: Partial<Request> = { status };
    
    if (status === 'in_progress' && !mockSolicitudesRequests[requestIndex].processed_at) {
      updates.processed_at = now;
    } else if (status === 'resolved') {
      updates.resolved_at = now;
      if (!mockSolicitudesRequests[requestIndex].processed_at) {
        updates.processed_at = now;
      }
    }
    
    mockSolicitudesRequests[requestIndex] = { 
      ...mockSolicitudesRequests[requestIndex], 
      ...updates 
    };
    
    return mockSolicitudesRequests[requestIndex];
  },

  async getRequestStats(): Promise<RequestStats> {
    await delay(300);
    
    const total = mockSolicitudesRequests.length;
    const pending = mockSolicitudesRequests.filter(r => r.status === 'pending').length;
    const in_progress = mockSolicitudesRequests.filter(r => r.status === 'in_progress').length;
    const resolved = mockSolicitudesRequests.filter(r => r.status === 'resolved').length;
    const rejected = mockSolicitudesRequests.filter(r => r.status === 'rejected').length;
    
    const currentMonth = new Date().getMonth();
    const this_month = mockSolicitudesRequests.filter(r => 
      new Date(r.created_at).getMonth() === currentMonth
    ).length;
    
    // Calculate average resolution time (mock calculation)
    const resolvedRequests = mockSolicitudesRequests.filter(r => r.status === 'resolved' && r.resolved_at);
    let avg_resolution_time = 0;
    
    if (resolvedRequests.length > 0) {
      const totalTime = resolvedRequests.reduce((acc, request) => {
        const created = new Date(request.created_at).getTime();
        const resolved = new Date(request.resolved_at!).getTime();
        return acc + (resolved - created);
      }, 0);
      
      // Convert to hours
      avg_resolution_time = Math.round(totalTime / (resolvedRequests.length * 1000 * 60 * 60));
    }
    
    return {
      total,
      pending,
      in_progress,
      resolved,
      rejected,
      this_month,
      avg_resolution_time
    };
  }
};
