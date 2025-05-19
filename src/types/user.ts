
// User types for the application

// Basic user type matching the API response
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'manager';
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'pending';
}

// Type for creating a new user
export interface UserCreateData {
  username: string;
  email: string;
  name: string;
  password: string;
  role?: 'admin' | 'user' | 'manager';
}

// Type for updating an existing user
export interface UserUpdateData {
  username?: string;
  email?: string;
  name?: string;
  password?: string;
  role?: 'admin' | 'user' | 'manager';
  status?: 'active' | 'inactive' | 'pending';
}

// Type for paginated user response
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}
