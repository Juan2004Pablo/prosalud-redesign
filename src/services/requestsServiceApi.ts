import { requestsApiService, ApiRequest } from './requestsApi';
import { Request, RequestStats } from '@/types/requests';
import { solicitudesService } from './solicitudesService';

// Map API status to frontend status
const mapApiStatusToFrontendStatus = (apiStatus: string): Request['status'] => {
  switch (apiStatus) {
    case 'PENDING':
      return 'pending';
    case 'IN_REVIEW':
      return 'in_progress';
    case 'REJECTED':
      return 'rejected';
    case 'COMPLETED':
      return 'resolved';
    default:
      return 'pending';
  }
};

// Map frontend status to API status
const mapFrontendStatusToApiStatus = (frontendStatus: Request['status']): 'pending' | 'processed' => {
  switch (frontendStatus) {
    case 'pending':
      return 'pending';
    case 'in_progress':
    case 'resolved':
    case 'rejected':
      return 'processed';
    default:
      return 'pending';
  }
};

// Map API request to frontend request
const mapApiRequestToFrontendRequest = (apiRequest: ApiRequest): Request => {
  return {
    id: apiRequest.id.toString(),
    request_type: apiRequest.request_type as Request['request_type'],
    id_type: apiRequest.document_type as Request['id_type'],
    id_number: apiRequest.document_number,
    name: apiRequest.name,
    last_name: apiRequest.last_name,
    email: apiRequest.email,
    phone_number: apiRequest.phone_number,
    payload: apiRequest.payload,
    status: mapApiStatusToFrontendStatus(apiRequest.status),
    created_at: apiRequest.created_at,
    processed_at: apiRequest.processed_at,
    resolved_at: apiRequest.status === 'COMPLETED' ? apiRequest.processed_at : undefined,
  };
};

// Service that handles both real API and fallback to mock data
export const requestsService = {
  async getRequests(): Promise<Request[]> {
    try {
      console.log('🔄 Attempting to fetch requests from API...');
      const apiRequests = await requestsApiService.getAllRequests();
      
      console.log('✅ Successfully fetched from API:', apiRequests.length, 'requests');
      return apiRequests.map(mapApiRequestToFrontendRequest);
    } catch (error) {
      console.warn('⚠️ API failed, falling back to mock data:', error);
      
      // Fallback to mock data when API is not available
      return await solicitudesService.getRequests();
    }
  },

  async getRequestById(id: string): Promise<Request | null> {
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        return await solicitudesService.getRequestById(id);
      }

      const apiRequest = await requestsApiService.getRequestById(numericId);
      return mapApiRequestToFrontendRequest(apiRequest);
    } catch (error) {
      console.warn('⚠️ API failed for getRequestById, falling back to mock data:', error);
      return await solicitudesService.getRequestById(id);
    }
  },

  async updateRequestStatus(id: string, status: Request['status'], notes?: string): Promise<Request> {
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        return await solicitudesService.updateRequestStatus(id, status, notes);
      }

      const apiStatus = mapFrontendStatusToApiStatus(status);
      const updatedApiRequest = await requestsApiService.updateRequestStatus(numericId, apiStatus);
      return mapApiRequestToFrontendRequest(updatedApiRequest);
    } catch (error) {
      console.warn('⚠️ API failed for updateRequestStatus, falling back to mock data:', error);
      return await solicitudesService.updateRequestStatus(id, status, notes);
    }
  },

  async getRequestStats(): Promise<RequestStats> {
    try {
      const requests = await this.getRequests();
      
      const total = requests.length;
      const pending = requests.filter(r => r.status === 'pending').length;
      const in_progress = requests.filter(r => r.status === 'in_progress').length;
      const resolved = requests.filter(r => r.status === 'resolved').length;
      const rejected = requests.filter(r => r.status === 'rejected').length;
      
      const currentMonth = new Date().getMonth();
      const this_month = requests.filter(r => 
        new Date(r.created_at).getMonth() === currentMonth
      ).length;
      
      // Calculate average resolution time
      const resolvedRequests = requests.filter(r => r.status === 'resolved' && r.resolved_at);
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
    } catch (error) {
      console.warn('⚠️ Failed to calculate stats, falling back to mock data:', error);
      return await solicitudesService.getRequestStats();
    }
  }
};