import Card from './card';
import ShiftPanel from './shiftPanel';

const PatientDashboard = () => {
  return (
    <>
      <section className="dashboard-cards">
        <a href="/appointment">
          <Card title="Nuevo turno" subtitle="Agenda tu cita" color="#4DB8A8" />
        </a>
        <Card title="Completar Perfil" subtitle="Actualiza tus datos" color="#4DB8A8" />
      </section>

      <section className="dashboard-panels">
        <ShiftPanel onlyCompleted={false} fill={true} name="Turnos" text="" />
        <ShiftPanel onlyCompleted={true} fill={true} name="Estudios / Historial (Beta)" text="" />
      </section>
    </>
  );
};

export default PatientDashboard;
