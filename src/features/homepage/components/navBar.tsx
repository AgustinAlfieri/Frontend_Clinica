import './navBar.css'
import logo from '../../../assets/medivia1.jpg';
import { useNavigate } from 'react-router-dom';




const NavBar = () => {
    
    const navigate = useNavigate();
    function handleLogoClick(){
        navigate('/homepage');
    }

    return (
        <header className="header">
            <img src={logo} alt="Logo" className="logo" style={{ cursor: 'pointer' }} onClick={handleLogoClick} />
            <nav className="navbar">
                <div>
                    <a href="/login">Iniciar Sesión</a>
                    <a href="/appointment">Solicitar Turno</a>
                    <a href="/about">Nosotros</a>
                </div>
            </nav>
            <div>
                <a className='register-link' href="/register">Crear cuenta</a>
            </div>
        </header>
    );
}

export default NavBar;