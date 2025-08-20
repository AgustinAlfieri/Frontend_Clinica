
import React from 'react';
import './Header.css';
import UserCard from '../components/userCard'
import Button from '../components/button' 

interface HeaderProps {
  clinicName?: string;
}

const isLogin = false;

const Header: React.FC<HeaderProps> = ({ clinicName = 'NOMBRE_CLINICA' }) => {
  return (
    <header className="header-container">
      <div className="header-logo">
        custom_Logo
      </div>
      <div className="header-title">{clinicName}</div>
      <div className="header-user">
        {isLogin ? <UserCard nombre="John" apellido="Doe" dni="12345678" /> : <Button label="Iniciar Sesión" buttonFunction={() => {}} class_name_button="header-button" />}
      </div>
    </header>
  );
};

export default Header;
