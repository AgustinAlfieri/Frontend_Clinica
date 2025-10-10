import React from "react";
import "./appointmentCard.css";

interface appointmentCardProps {
  specialty: string;
  professional: string;
  hour: string;
}

const AppointmentCard: React.FC<appointmentCardProps> = ({ specialty, professional, hour }) => {
  return (
    <div className="appointment-card">
      <div className="appointment-item">
        <strong>Especialidad:</strong>
        <span>{specialty}</span>
      </div>
      <div className="appointment-item">
        <strong>Profesional:</strong>
        <span>{professional}</span>
      </div>
      <div className="appointment-item">
        <strong>Horario:</strong>
        <span>{hour}</span>
      </div>
    </div>
  );
};

export default AppointmentCard;
