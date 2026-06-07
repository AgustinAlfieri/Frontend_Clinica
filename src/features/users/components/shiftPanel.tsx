import React from "react";
import AppointmentCard from "../../appointment/components/AppointmentCard";
import "./shiftPanel.css";
import { usePatientAppointments } from "../hooks/usePatientAppointments";
import { useMedicAppointments } from "../hooks/useMedicAppointments";
import { APPOINTMENT_STATUS } from "../constants/status";
import { USER_ROLES } from "../constants/roles";

interface ShiftPanelProps {
  name: string;
  text: string;
  fill: boolean;
  onlyCompleted: boolean;
}

const ShiftPanel: React.FC<ShiftPanelProps> = ({ text, name, onlyCompleted }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userType = user.role || "";
  const isMedic = userType === USER_ROLES.MEDIC;

  const patientData = usePatientAppointments(userType === USER_ROLES.PATIENT);
  const medicData = useMedicAppointments(isMedic);
  const { appointments, loading, error } = isMedic ? medicData : patientData;

  const visibleAppointments = onlyCompleted
    ? appointments.filter(
        (appointment) =>
          appointment.appointmentStatus === APPOINTMENT_STATUS.COMPLETED ||
          appointment.appointmentStatus === APPOINTMENT_STATUS.CANCELLED
      )
    : appointments.filter(
        (appointment) =>
          isMedic ||
          (appointment.appointmentStatus !== APPOINTMENT_STATUS.COMPLETED &&
            appointment.appointmentStatus !== APPOINTMENT_STATUS.CANCELLED)
      );

  return (
    <div className="shift-panel">
      <h2>{name}</h2>
      <p>{text}</p>

      <div className="appointments-container">
        {loading ? (
          <p>Cargando turnos...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          visibleAppointments.slice(0, 2).map((appointment) => (
            <AppointmentCard
              key={appointment.appointmentId}
              appointmentId={appointment.appointmentId}
              appointmentDate={appointment.appointmentDate}
              appointmentStatus={appointment.appointmentStatus}
              patient={appointment.patient}
              medic={appointment.medic}
              practices={appointment.practices}
              variant={isMedic ? "medic" : "patient"}
            />
          ))
        )}
      </div>
      <br />
    </div>
  );
};

export default ShiftPanel;
