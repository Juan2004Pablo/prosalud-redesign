import { User, CreateUserData, UpdateUserData, PaginatedResponse } from '@/types/admin';
import { realUsersApi, BackendUser, BackendPaginatedResponse } from './realUsersApi';
import { usersService } from './usersService'; // Fallback to mock data

// Adapter functions to convert between backend and frontend formats
function adaptBackendUserToFrontend(backendUser: BackendUser): User {
  return {
    id: String(backendUser.id),
    name: backendUser.name,
    email: backendUser.email,
    isActive: backendUser.is_active,
    createdAt: backendUser.created_at.split('T')[0], // Convert to YYYY-MM-DD format
    updatedAt: backendUser.updated_at.split('T')[0], // Convert to YYYY-MM-DD format
  };
}

function adaptBackendPaginationToFrontend<T>(
  backendResponse: BackendPaginatedResponse<BackendUser>
): PaginatedResponse<User> {
  const adaptedData = backendResponse.data.map(adaptBackendUserToFrontend);
  
  return {
    data: adaptedData,
    total: backendResponse.pagination.total,
    page: backendResponse.pagination.current_page,
    pageSize: backendResponse.pagination.per_page,
    totalPages: backendResponse.pagination.last_page,
  };
}

// API adapter that implements the expected interface with fallback to mock data
export const usersApiAdapter = {
  async getUsers(page = 1, pageSize = 10, search = '', status = ''): Promise<PaginatedResponse<User>> {
    try {
      const backendResponse = await realUsersApi.getUsers(page, search, status);
      return adaptBackendPaginationToFrontend(backendResponse);
    } catch (error) {
      console.warn('🔄 Fallback to mock data - Backend not available:', error);
      return usersService.getUsers(page, pageSize, search, status);
    }
  },

  async getUserById(id: string): Promise<User | null> {
    try {
      const backendUser = await realUsersApi.getUserById(id);
      return adaptBackendUserToFrontend(backendUser);
    } catch (error) {
      console.warn('🔄 Fallback to mock data - Backend not available:', error);
      return usersService.getUserById(id);
    }
  },

  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const backendUser = await realUsersApi.createUser(userData);
      return adaptBackendUserToFrontend(backendUser);
    } catch (error) {
      console.warn('🔄 Fallback to mock data - Backend not available:', error);
      return usersService.createUser(userData);
    }
  },

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    try {
      const updateData: { name?: string; email?: string; is_active?: boolean } = {};
      
      if (userData.name !== undefined) updateData.name = userData.name;
      if (userData.email !== undefined) updateData.email = userData.email;
      if (userData.isActive !== undefined) updateData.is_active = userData.isActive;

      const backendUser = await realUsersApi.updateUser(id, updateData);
      return adaptBackendUserToFrontend(backendUser);
    } catch (error) {
      console.warn('🔄 Fallback to mock data - Backend not available:', error);
      return usersService.updateUser(id, userData);
    }
  },

  async toggleUserStatus(id: string): Promise<User> {
    try {
      const backendUser = await realUsersApi.toggleUserStatus(id);
      return adaptBackendUserToFrontend(backendUser);
    } catch (error) {
      console.warn('🔄 Fallback to mock data - Backend not available:', error);
      return usersService.toggleUserStatus(id);
    }
  },
};