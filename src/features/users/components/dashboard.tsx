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
          {/* Si es un medico, mostrar botón de filtro de turnos */}
          {userType === 'Medic' ? (
            <a href="/medicshiftfilter">
              <Card title="Filtrar Turnos" subtitle="Busca turnos de tus pacientes" color="#4DB8A8" />
            </a>
          ) : (
            <a href="/appointment">
              <Card title="Nuevo turno" subtitle="Agenda tu cita" color="#4DB8A8" />
            </a>
          )}
          <Card title="Completar Perfil" subtitle="Actualiza tus datos" color="#4DB8A8" />
        </section>

        <section className="dashboard-panels">
          {/* Si es un paciente muestro sus turnos sin importar el estado */}
          {
            userType == 'Patient' &&
            <ShiftPanel onlyCompleted={false} fill={true} name="Turnos" text="" />
          }

          {/* Si es administrativo, muestro el panel de gestion de turnos*/}
          {
            userType == 'Administrative' &&
            <a href="/updateStatus" style={{ textDecoration: 'none' }}>
              <ShiftPanel onlyCompleted={false} fill={true} name="Gestión de Turnos" text="" />
            </a>
          }

          {/* Si es un medico muestro sus turnos pendientes */}
          {
            userType == 'Medic' &&
            <ShiftPanel onlyCompleted={false} fill={true} name="Turnos" text="" />
          }

          {/* Si es un medico muestro sus pacientes */}
          {
            userType == 'Medic' &&
            <ShiftPanel onlyCompleted={false} fill={true} name="Pacientes" text="" />
          }

          {/* Si es un paciente muestro solo los estudios ya completados o canceladosd*/}
          {
            (userType == 'Patient') ?
              <ShiftPanel onlyCompleted={true} fill={true} name="Estudios / Historial (Beta)" text="" /> :
              <ShiftPanel onlyCompleted={false} fill={true} name="Estudios / Historial (Beta)" text="" />
          }
        </section>
      </main>
    </div>
  );
};

export default Dashboard;