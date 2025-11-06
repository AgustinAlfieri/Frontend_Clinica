import React from "react";
import AppointmentCard from "../../appointment/components/AppointmentCard";
import "./shiftPanel.css";
import { usePatientAppointments } from "../hooks/usePatientAppointments";
import { useMedicAppointments } from "../hooks/useMedicAppointments";

interface ShiftPanelProps {
  name: string;
  text: string;
  fill?: boolean;
}

const ShiftPanel: React.FC<ShiftPanelProps> = ({text, name}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userType = user.role || '';

  // Usar los hooks condicionalmente según el tipo de usuario
  const patientData = usePatientAppointments(userType === 'Patient');
  const medicData = useMedicAppointments(userType === 'Medic');

  // Seleccionar los datos según el tipo de usuario
  const { appointments, loading, error } = userType === 'Medic' ? medicData : patientData;

  return (
    <div className="shift-panel">
      <h2>{name}</h2>
      <p>{text}</p>

      <div className="appointments-container">
        {loading ? (
          <p>Cargando turnos...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : appointments && appointments.length > 0 ? (
          appointments
            .slice(0, 2) 
            .map((appointment) => (
              <AppointmentCard
                key={appointment.appointmentId}
                appointmentId={appointment.appointmentId}
                appointmentDate={appointment.appointmentDate}
                appointmentStatus={appointment.appointmentStatus}
                patient={appointment.patient}
                medic={appointment.medic}
                practices={appointment.practices}
              />
            ))
        ) : (
          <p>No hay turnos {userType === 'Medic' ? 'en sala de espera' : 'disponibles'}</p>
        )}
      </div>
      <br />
    </div>
  );
};

export default ShiftPanel;
