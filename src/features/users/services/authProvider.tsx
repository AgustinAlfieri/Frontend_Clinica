import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext, type AuthContextValue, type User } from './authContext';
import { authService, type LoginCredentials } from '../services/authService'; // ajusta la ruta

// Componente Provider: maneja estado y proporciona el contexto a la app
// Envuelve la app y expone user, token y acciones */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(authService.getUser());
  const [token, setToken] = useState<string | null>(authService.getToken());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  // Sincroniza cambios de localStorage entre pestañas
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        setUser(authService.getUser());
        setToken(authService.getToken());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Llamar al servicio para hacer login
  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    setIsAuthenticated(true);
    console.log('isAuthenticated', isAuthenticated)
    setUser(authService.getUser());
    setToken(authService.getToken());
    return response;
  };

  // Logout: limpia almacenamiento y estado local
  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  // Forzar relectura desde localStorage
  const refreshFromStorage = () => {
    setUser(authService.getUser());
    setToken(authService.getToken());
  };

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    refreshFromStorage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}