import React from "react";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import NavBar from "../../homepage/components/navBar";
import "./Dashboard.css";
import "./Sidebar.css";
import turnoImg from "../../../assets/turno.png";
import foto from "../../../assets/foto-imagen.png";
import ShiftPanel from "./shiftPanel";


const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userType = user.role || '';
  return (
    <div className="dashboard">
      <NavBar />
      <Sidebar />
        
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1> Hola, Bienvenido!</h1>
        </header>

        <section className="dashboard-cards">
          <a href ="/appointment">
          <Card title="Nuevo turno" subtitle="Agenda tu cita" color="#28a745" image={turnoImg}/>
          </a>
          <Card title="Completar Perfil" subtitle="Actualiza tus datos" color="#0f5491ff" image={foto}/>

        </section>

        <section className="dashboard-panels">
            {userType == 'Patient'&&<ShiftPanel name="Turnos" text="Aquí podrás consultar y gestionar tus turnos."/>}
            {userType == 'Administrative'&&<ShiftPanel name="Gestión de Turnos" text="Aquí podrás gestionar los turnos de los pacientes." buttonText ={true} />}
            <ShiftPanel name="Estudios / Historial" text="Aquí podrás observar tu historial de turnos."/>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;