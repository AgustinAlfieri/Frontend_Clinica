import React from "react";
import AppointmentCard from "../../appointment/components/AppointmentCard";
import "./shiftPanel.css";
import { usePatientAppointments } from "../hooks/usePatientAppointments";
import { useMedicAppointments } from "../hooks/useMedicAppointments";

interface ShiftPanelProps {
  name: string;
  text: string;
  fill: boolean;
  onlyCompleted: boolean;
}

const ShiftPanel: React.FC<ShiftPanelProps> = ({text, name, onlyCompleted}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userType = user.role || '';

  // Usar los hooks condicionalmente según el tipo de usuario
  const patientData = usePatientAppointments(userType === 'Patient');
  const medicData = useMedicAppointments(userType === 'Medic');

  // Seleccionar los datos según el tipo de usuario
  const { appointments, loading, error } = userType === 'Medic' ? medicData : patientData;

  let filteredAppointments = appointments;
  if(onlyCompleted){
    // Filtrar los turnos para mostrar solo los completados o cancelados
    filteredAppointments = appointments.filter(appointment => 
      appointment.appointmentStatus === 'Completado' || appointment.appointmentStatus === 'Cancelado'
    );
  }

  return (
    <div className="shift-panel">
      <h2>{name}</h2>
      <p>{text}</p>

      <div className="appointments-container">
        {loading ? (
          <p>Cargando turnos...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) :  userType == 'Medic' ? (
                appointments
                .slice(0, 2) 
                .map((appointment) => 
                (
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
            ) : 
            onlyCompleted ? (
              filteredAppointments
                .slice(0, 2) 
                .map((filteredAppointment) => (
                  <AppointmentCard
                    key={filteredAppointment.appointmentId}
                    appointmentId={filteredAppointment.appointmentId}
                    appointmentDate={filteredAppointment.appointmentDate}
                    appointmentStatus={filteredAppointment.appointmentStatus}
                    patient={filteredAppointment.patient}
                    medic={filteredAppointment.medic}
                    practices={filteredAppointment.practices}
                  />
                ))
            ) : (
              appointments
                .slice(0, 2) 
                .map((appointment) => 
                ( appointment.appointmentStatus !== 'Completado' && appointment.appointmentStatus !== 'Cancelado' &&
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
        )}
      </div>
      <br />
    </div>
  );
};

export default ShiftPanel;
