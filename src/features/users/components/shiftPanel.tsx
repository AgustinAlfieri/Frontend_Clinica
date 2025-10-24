import React from "react";
import AppointmentCard from "../../appointment/components/AppointmentCard";
import "./shiftPanel.css";
import { useEffect, useState } from "react";
import { AppointmentService } from "../../appointment/service/appointmentService";
import {authService} from "../services/authService";

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


interface Patient {
    id: string;
    name: string;
    dni: string;    
    Appointments: AppointmentCardProps[];
}

const ShiftPanel: React.FC<ShiftPanelProps> = ({text, name}) => {
  const [appointments, setAppointments] = useState<AppointmentCardProps[]>([]);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = authService.getUser();
        console.log(`Retrieved ID from localStorage: ${user.id}`);
        const patient = await AppointmentService.getAppointmentsByDni(user.id);
        console.log('Patient data fetched in ShiftPanel:', patient);
        const appointments = patient.appointments; // Ajusta esto según la estructura real de los datos
        console.log('Appointments fetched in ShiftPanel:', appointments);
        setAppointments(appointments);
      } catch(error) {
        console.error('Error fetching appointments in ShiftPanel:', error);
      }
    };
    
    fetchAppointments();
  }, []);
    const fetchAppointments = async () =>{
    try{
      const appointments : Patient = await AppointmentService.getAppointmentsByDni(localStorage.getItem('id') || '');
      setAppointments(appointments.Appointments);
    }catch(error){
      console.error('Error fetching appointments in ShiftPanel:', error);
    }

  }
     fetchAppointments();
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
