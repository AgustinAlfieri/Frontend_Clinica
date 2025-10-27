import { useContext } from 'react';
import { AuthContext } from './authContext';

// Hook personalizado para consumir el contexto de auth

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
