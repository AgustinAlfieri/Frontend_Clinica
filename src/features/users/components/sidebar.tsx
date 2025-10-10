import React from "react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img 
            src="src/assets/foto-imagen.png" 
            alt="User Avatar" 
        />
        <h2>Nombre del Usuario</h2>
        <p>Obra social?</p>
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
