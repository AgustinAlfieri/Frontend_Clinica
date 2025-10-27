import React from "react";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import NavBar from "../../homepage/components/navBar";
import "./dashboard.css";
import "./sidebar.css";
import "./card.css";
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
            <Card title="Nuevo turno" subtitle="Agenda tu cita" color="#4DB8A8"/>
          </a>
          <Card title="Completar Perfil" subtitle="Actualiza tus datos" color="#4DB8A8"/>
        </section>

        <section className="dashboard-panels">
            {userType == 'Patient'&&<ShiftPanel fill={true} name="Turnos" text="Aquí podrás consultar y gestionar tus turnos."/>}
            {userType == 'Administrative' && 
                  <a href = "/updateStatus" style={{ textDecoration: 'none' }}>
                    <ShiftPanel fill= {true} name="Gestión de Turnos" text="Aquí podrás gestionar los turnos de los pacientes." buttonText ={true} />
                  </a>
            }
            <ShiftPanel name="Estudios / Historial (Beta)" text="Aquí podrás observar tu historial de turnos." fill={false}/>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;