import React from "react";
import AppointmentCard from "../../appointment/components/AppointmentCard";
import "./shiftPanel.css";
import { useEffect, useState } from "react";
import { AppointmentService } from "../../appointment/service/appointmentService";

interface Patient {
    name: string;
    dni: string;
}

interface Medic {
    name: string;
    specialty: string;
}

interface Practice{
    name: string;
    description?: string;
}

interface AppointmentCardProps {
    appointmentDate: string;
    appointmentStatus: string;
    patient: Patient;
    medic: Medic;
    practices: Practice[];
}

interface ShiftPanelProps {
  name: string
  text: string;
}

const ShiftPanel: React.FC<ShiftPanelProps> = ({text, name}) => {
  const [appointments, setAppointments] = useState<AppointmentCardProps[]>([]);
  useEffect(() => {
    const fetchAppointments = async () =>{
    try{
      const appointments = await AppointmentService.getAppointmentsByDni(localStorage.getItem('dni') || '');
      setAppointments(appointments);
    }catch(error){
      console.error('Error fetching appointments in ShiftPanel:', error);
    }
    fetchAppointments();
  }
}, []);

  return (
    <div className="shift-panel">
      <h2>{name}</h2>
      <p>{text}</p>

      <div className="appointments-container">
        {appointments.map((appointment, index) => (
          <AppointmentCard
            key={index}
            appointmentDate={appointment.appointmentDate}
            appointmentStatus={appointment.appointmentStatus}
            patient={appointment.patient}
            medic={appointment.medic}
            practices={appointment.practices}
          />
        ))}
      </div>
    </div>
  );
};

export default ShiftPanel;
