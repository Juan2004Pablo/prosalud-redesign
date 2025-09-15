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
  },
  timeout: 10000,
});

// Add response interceptor to handle errors consistently
backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Error en la comunicación con el servidor');
    }
    throw new Error('Error de conexión con el servidor');
  }
);

export const realUsersApi = {
  async getUsers(page = 1, search = '', status = ''): Promise<BackendPaginatedResponse<BackendUser>> {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status) params.append('is_active', status === 'active' ? 'true' : 'false');
    params.append('per_page', '15');
    
    const response = await backendApi.get<BackendPaginatedResponse<BackendUser>>(`/users?${params}`);
    return response.data;
  },

  async getUserById(id: string): Promise<BackendUser> {
    const response = await backendApi.get<BackendResponse<BackendUser>>(`/users/${id}`);
    return response.data.data;
  },

  async createUser(data: { name: string; email: string }): Promise<BackendUser> {
    const createData: CreateUserRequest = {
      name: data.name,
      email: data.email,
      password: 'ProSalud2024.*',
      password_confirmation: 'ProSalud2024.*',
      is_active: true,
    };
    
    const response = await backendApi.post<BackendResponse<BackendUser>>('/users', createData);
    return response.data.data;
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<BackendUser> {
    const response = await backendApi.put<BackendResponse<BackendUser>>(`/users/${id}`, data);
    return response.data.data;
  },

  async toggleUserStatus(id: string): Promise<BackendUser> {
    // First get the current user to know their current status
    const currentUser = await this.getUserById(id);
    
    const updateData: UpdateUserStatusRequest = {
      is_active: !currentUser.is_active,
    };
    
    const response = await backendApi.patch<BackendResponse<BackendUser>>(`/users/${id}/status`, updateData);
    return response.data.data;
  },
};