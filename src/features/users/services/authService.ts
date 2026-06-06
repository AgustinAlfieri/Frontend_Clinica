import { apiClient } from './api';
// import type UserType from "../UserType";

export interface LoginCredentials {
  dni?: string;
  email?: string;
  password: string;
  role?: string;
}

interface data {
  token: string;
  user: {
    id: string;
    dni: string;
    name: string;
    email: string;
    role: string;
  };
}

export default interface AuthResponse {
  success: boolean;
  data?: data;
  message?: string;
  statusCode?: number;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse, LoginCredentials>('auth/login', {
        dni: credentials.dni,
        email: credentials.email,
        password: credentials.password,
        role: credentials.role // Asegúrate de enviar el role
      });
      if (response.success && response.data?.token) {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
