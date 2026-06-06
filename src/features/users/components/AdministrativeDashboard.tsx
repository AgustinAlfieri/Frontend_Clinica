import Card from './card';
import ShiftPanel from './shiftPanel';

const AdministrativeDashboard = () => {
  return (
    <>
      <section className="dashboard-cards">
        <a href="/appointment">
          <Card title="Nuevo turno" subtitle="Agenda tu cita" color="#4DB8A8" />
        </a>
        <Card title="Completar Perfil" subtitle="Actualiza tus datos" color="#4DB8A8" />
      </section>

      <section className="dashboard-panels">
        <a href="/updateStatus" style={{ textDecoration: 'none' }}>
          <ShiftPanel onlyCompleted={false} fill={true} name="Gestion de Turnos" text="" />
        </a>
        <ShiftPanel onlyCompleted={false} fill={true} name="Estudios / Historial (Beta)" text="" />
      </section>
    </>
  );
};

export default AdministrativeDashboard;
