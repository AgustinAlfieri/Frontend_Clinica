import { createContext } from 'react';
import type { LoginCredentials } from '../services/authService';

/* Tipo del usuario tal como lo devuelve authService.getUser() */
export type User = {
  id: string;
  dni: string;
  name: string;
  email: string;
  role: 'administrative' | 'patient' | 'medic' | string;
} | null;

/* Interfaz que define lo que expondrá el contexto */
export type AuthContextValue = {
  user: User;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshFromStorage: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
