
import React from 'react';
import './Header.css';
import UserCard from '../components/userCard'
import Button from '../components/button' 
import {useState} from 'react' 
import {motion} from 'framer-motion'

interface HeaderProps {
  clinicName?: string;
}

const isLogin = false
;

const Header: React.FC<HeaderProps> = ({ clinicName = 'NOMBRE_CLINICA' }) => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <img src="src/assets/logo-clinica.png" alt="Logo Clínica" />
      </div>
      <div className="header-title"><h1>{clinicName}</h1></div>
      <div className="header-user">
        {isLogin ? <UserCard nombre="John" apellido="Doe" dni="12345678" /> : <Button stylebutton="button" label="Iniciar Sesión" buttonFunction={() => {alert("Hola")}} />}
      </div>
      <div className="header-box-wrapper">
      </div>


    </header>
  );
};

export default Header;
