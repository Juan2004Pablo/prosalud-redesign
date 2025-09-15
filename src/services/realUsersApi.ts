import axios from 'axios';

// Backend API types
export interface BackendUser {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BackendPaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
  };
}

export interface BackendResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface BackendErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  is_active?: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  is_active?: boolean;
}

export interface UpdateUserStatusRequest {
  is_active: boolean;
}

// Create axios instance for the backend API
const backendApi = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
  withCredentials: false, // Disable credentials to avoid CORS issues in development
});

// Add request interceptor for logging
backendApi.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
      params: config.params,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors consistently
backendApi.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url
    });
    
    // Handle CORS errors
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      throw new Error('Error de conexión: Verifique que el servidor backend esté ejecutándose en http://localhost:8000');
    }
    
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Error en la comunicación con el servidor');
    }
    
    throw new Error('Error de conexión con el servidor');
  }
);

export const realUsersApi = {
  async getUsers(page = 1, search = '', status = ''): Promise<BackendPaginatedResponse<BackendUser>> {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status) params.append('is_active', status === 'active' ? 'true' : 'false');
      params.append('per_page', '15');
      
      const response = await backendApi.get<BackendPaginatedResponse<BackendUser>>(`/users?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async getUserById(id: string): Promise<BackendUser> {
    try {
      const response = await backendApi.get<BackendResponse<BackendUser>>(`/users/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  async createUser(data: { name: string; email: string }): Promise<BackendUser> {
    try {
      const createData: CreateUserRequest = {
        name: data.name,
        email: data.email,
        password: 'ProSalud2024.*',
        password_confirmation: 'ProSalud2024.*',
        is_active: true,
      };
      
      const response = await backendApi.post<BackendResponse<BackendUser>>('/users', createData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<BackendUser> {
    try {
      const response = await backendApi.put<BackendResponse<BackendUser>>(`/users/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  async toggleUserStatus(id: string): Promise<BackendUser> {
    try {
      // First get the current user to know their current status
      const currentUser = await this.getUserById(id);
      
      const updateData: UpdateUserStatusRequest = {
        is_active: !currentUser.is_active,
      };
      
      const response = await backendApi.patch<BackendResponse<BackendUser>>(`/users/${id}/status`, updateData);
      return response.data.data;
    } catch (error) {
      console.error(`Error toggling user ${id} status:`, error);
      throw error;
    }
  },
};