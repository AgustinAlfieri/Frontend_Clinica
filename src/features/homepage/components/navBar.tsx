import './navBar.css'
import logo from '../../../assets/medivia1.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../users/services/useAuth.ts';
import { useLogout } from '../../users/services/useLogout.ts';
import { USER_ROLES } from '../../users/constants/roles.ts';


export function NavBar() {
  const { user, isAuthenticated } = useAuth();
  const logout = useLogout();

    const navigate = useNavigate();
    function handleLogoClick(){
        navigate('/homepage');
    }

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
                {user?.role === USER_ROLES.ADMINISTRATIVE && (
                <>
                    <a href="/updateStatus">Gestionar Turnos</a>
                    <a href="/manage-users">Gestionar Usuarios</a>
                </>
                )}

                {user?.role === USER_ROLES.MEDIC && (
                <a href="/updateStatus">Reportes</a>
                )}
                
                <a style={{ cursor: 'pointer' }} onClick={logout}>
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
