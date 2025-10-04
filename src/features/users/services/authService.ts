import {apiClient} from './api';

export interface LoginCredentials {
  dni?: string;
  email?: string;
  password: string;
  role?: string
}

export interface RegisterData {
  dni: string;
  name: string;
  email: string;
  password: string;
  telephone?: string;
  role: string; // Debe enviarse el role
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    dni: string;
    name: string;
    email: string;
    role: string;
  };
  message?: string;
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try{
        const response = await apiClient.post('auth/login',{
            dni: credentials.dni,
            email: credentials.email,
            password: credentials.password,
            role: credentials.role // Asegúrate de enviar el role
        });

        if(response.success && response.token){
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
    }catch(error: any){
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

}