import React from "react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  // Funcuión que trae los datos del usuario autenticado
  const user = localStorage.getItem('user'); 
  console.log('User data from localStorage in Sidebar:', user);
  const name = user ? JSON.parse(user).name : 'Usuario';
  const role = user ? JSON.parse(user).role : 'Rol';
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img 
            src="src/assets/foto-imagen.png" 
            alt="User Avatar" 
        />
        <h2>{name} </h2>
        <p>Tipo de Usuario: {role}</p>
      </div>

      <nav className="sidebar-menu">
        <a href="/homepage">🏠 Inicio</a>
        <a href="#">📄 Informes / Estudios</a>
        <a href="/appointment">📅 Turnos</a>
        <a href="#">👤 Mi perfil</a>
        <a href="#">👥 Afiliaciones</a>
        <a href="#">❓ Ayuda</a>
        <a href="#">✉️ Contáctenos</a>
      </nav>

      <div className="sidebar-footer">
        <p>v2.0.3</p>
      </div>
    </aside>
  );
};

export default Sidebar;
