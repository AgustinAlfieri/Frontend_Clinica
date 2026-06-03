import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return () => {
    logout();
    navigate('/login', { replace: true });
  };
}
