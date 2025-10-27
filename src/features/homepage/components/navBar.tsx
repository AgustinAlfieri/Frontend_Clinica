import './navBar.css'
import logo from '../../../assets/medivia1.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../users/services/useAuth.ts';


export function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();
    function handleLogoClick(){
        navigate('/homepage');
    }

    console.log('NavBar - isAuthenticated:', isAuthenticated);

    return (
    <header className="header">
        <img src={logo} alt="Logo" className="logo" style={{ cursor: 'pointer' }} onClick={handleLogoClick} />
        <nav className="navbar">
        <div>
            {/* Cuando NO está autenticado mostramos Login y Registro */}
            {!isAuthenticated && (
            <>
                {/* Enlace a página de login */}
                <a href="/login">Iniciar Sesión</a>
                {/* Enlace a página de registro */}
                <a href="/register">Registrarse</a>
            </>
            )}

            {/* Cuando el usuario está autenticado mostramos enlaces protegidos */}
            {isAuthenticated && (
            <>
                {/* Enlaces comunes para todos los usuarios autenticados */}
                <a href="/dashboard">Mi Medivia</a>

                {/* Enlaces sólo para administradores
                    Comparar con el valor role que envía el backend en user.role */}
                {user?.role === 'admin' && (
                <>
                    <a href="/admin">Panel Admin</a>
                    <a href="/manage-users">Gestionar Usuarios</a>
                </>
                )}

                {user?.role === 'medic' && (
                <a href="/medic">Reportes</a>
                )}
                
                <a style={{ cursor: 'pointer' }} onClick={() => {
                    logout();
                    }}>
                Cerrar sesión
                </a>
                
            </>
            )}
        </div>
        </nav>
    </header>

  );
}

export default NavBar;