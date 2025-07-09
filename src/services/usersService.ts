
import { User, CreateUserData, UpdateUserData, PaginatedResponse } from '@/types/admin';
import { mockUsers } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const usersService = {
  async getUsers(page = 1, pageSize = 10, search = '', status = ''): Promise<PaginatedResponse<User>> {
    await delay(500);
    
    let filteredUsers = [...mockUsers];
    
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (status) {
      const isActive = status === 'active';
      filteredUsers = filteredUsers.filter(user => user.isActive === isActive);
    }
    
    const total = filteredUsers.length;
    const start = (page - 1) * pageSize;
    const data = filteredUsers.slice(start, start + pageSize);
    
    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
  },

  async getUserById(id: string): Promise<User | null> {
    await delay(300);
    return mockUsers.find(user => user.id === id) || null;
  },

  async createUser(userData: CreateUserData): Promise<User> {
    await delay(800);
    const newUser: User = {
      id: String(mockUsers.length + 1),
      ...userData,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockUsers.push(newUser);
    return newUser;
  },

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    await delay(600);
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) throw new Error('Usuario no encontrado');
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
    return mockUsers[userIndex];
  },

  async toggleUserStatus(id: string): Promise<User> {
    await delay(400);
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) throw new Error('Usuario no encontrado');
    
    mockUsers[userIndex].isActive = !mockUsers[userIndex].isActive;
    return mockUsers[userIndex];
  }
};
