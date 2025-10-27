import React from "react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  // Funcuión que trae los datos del usuario autenticado
  const user = localStorage.getItem('user'); 
  const name = user ? JSON.parse(user).name : 'Usuario';
  let role = user ? JSON.parse(user).role : 'Rol';
  switch(role){
    case 'Patient':
      role = 'Paciente';
      break;
    case 'Administrative':
      role = 'Administrativo';
      break;
    case 'Medic':
      role = 'Médico';
      break;            
  }
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
