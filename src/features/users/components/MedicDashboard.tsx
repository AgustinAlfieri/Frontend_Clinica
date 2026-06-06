import Card from './card';
import ShiftPanel from './shiftPanel';

const MedicDashboard = () => {
  return (
    <>
      <section className="dashboard-cards">
        <a href="/updateStatus">
          <Card title="Filtrar Turnos" subtitle="Busca turnos de tus pacientes" color="#4DB8A8" />
        </a>
        <Card title="Completar Perfil" subtitle="Actualiza tus datos" color="#4DB8A8" />
      </section>

      <section className="dashboard-panels">
        <ShiftPanel onlyCompleted={false} fill={true} name="Turnos" text="" />
        <ShiftPanel onlyCompleted={false} fill={true} name="Pacientes" text="" />
        <ShiftPanel onlyCompleted={false} fill={true} name="Estudios / Historial (Beta)" text="" />
      </section>
    </>
  );
};

export default MedicDashboard;
