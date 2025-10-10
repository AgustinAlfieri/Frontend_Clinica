import React from "react";
import AppointmentCard from "./appointmentCard";
import "./shiftPanel.css";

interface ShiftPanelProps {
  name: string
  text: string;
}

const ShiftPanel: React.FC<ShiftPanelProps> = ({text, name}) => {
  const appointments = [
    { specialty: "Cardiología", professional: "Dr. Juan Pérez", hour: "10:00 AM" },
    { specialty: "Cardiología", professional: "Dr. Juan Pérez", hour: "10:00 AM" },
    { specialty: "Cardiología", professional: "Dr. Juan Pérez", hour: "10:00 AM" },
  ];

  return (
    <div className="shift-panel">
      <h2>{name}</h2>
      <p>{text}</p>

      <div className="appointments-container">
        {appointments.map((appointment, index) => (
          <AppointmentCard
            key={index}
            specialty={appointment.specialty}
            professional={appointment.professional}
            hour={appointment.hour}
          />
        ))}
      </div>
    </div>
  );
};

export default ShiftPanel;
