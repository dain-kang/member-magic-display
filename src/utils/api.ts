
// API utility functions for user management

// Base URL for API - replace with your actual API URL
const API_BASE_URL = 'https://api.example.com';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Generic fetch function with error handling
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    const data = await response.json();
    
    return {
      data: response.ok ? data : undefined,
      error: !response.ok ? data.message || 'An error occurred' : undefined,
      status: response.status,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      error: error instanceof Error ? error.message : 'Network error',
      status: 500,
    };
  }
}

// User management API functions
export const userApi = {
  // Get all users with optional pagination
  getUsers: async (page = 1, limit = 10) => {
    return fetchApi<User[]>(`/users?page=${page}&limit=${limit}`);
  },
  
  // Get a single user by ID
  getUserById: async (id: string) => {
    return fetchApi<User>(`/users/${id}`);
  },
  
  // Create a new user
  createUser: async (userData: UserCreateData) => {
    return fetchApi<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  // Update an existing user
  updateUser: async (id: string, userData: UserUpdateData) => {
    return fetchApi<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
  
  // Delete a user
  deleteUser: async (id: string) => {
    return fetchApi<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};
