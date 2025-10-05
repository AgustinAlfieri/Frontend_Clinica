import React from 'react';
import './Homepage.css';
import UserCard from '../components/userCard';
import Button from '../components/button';
import Container from '../components/container';

interface HomepageProps {
  clinicName?: string;
  isLogin?: boolean;
  userName?: string;
  userLastName?: string;
  userDni?: string;
}

const Homepage: React.FC<HomepageProps> = ({ 
  clinicName = 'NOMBRE_CLINICA',
  isLogin = false,
  userName = 'John',
  userLastName = 'Doe',
  userDni = '12345678'
}) => {
  const handleSolicitarTurno = () => {
    console.log('Solicitar Turno');
    // Aquí podrías agregar lógica de navegación
  };

  const handleModificarTurno = () => {
    console.log('Modificar Turno');
    // Aquí podrías agregar lógica de navegación
  };

  const handleLogin = () => {
    console.log('Iniciar Sesión');
    // Aquí podrías agregar lógica de navegación al login
  };

  return (
    <div className="homepage-root">
      <header className="homepage-header">
        <div className="homepage-logo">
          <img src="src/assets/logo-clinica.png" alt="Logo Clínica" />
        </div>
        <div className="homepage-title">
          <h1>{clinicName}</h1>
        </div>
        <div className="homepage-user">
          {isLogin ? (
            <UserCard nombre={userName} apellido={userLastName} dni={userDni} />
          ) : (
            <Button stylebutton="homepage-login-btn" label="Iniciar Sesión" buttonFunction={handleLogin} />
          )}
        </div>
      </header>
      <main className="homepage-main">
        <Container
          stylecontainer="homepage-container"
          button="homepage-button1"
          buttonlabel="Solicitar Turno"
          b_function={handleSolicitarTurno}
        />
        <Container
          stylecontainer="homepage-container"
          button="homepage-button2"
          buttonlabel="Modificar Turno"
          b_function={handleModificarTurno}
        />
      </main>
    </div>
  );
};

export default Homepage;
