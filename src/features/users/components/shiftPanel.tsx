import React from "react";
import AppointmentCard from "../../appointment/components/AppointmentCard";
import "./shiftPanel.css";
import { useEffect, useState } from "react";
import { AppointmentService } from "../../appointment/service/appointmentService";
import {authService} from "../services/authService";
import { useNavigate } from "react-router-dom";

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
    appointmentId: string; // ID único del appointment
    appointmentDate: string;
    appointmentStatus: string;
    patient: Patient;
    medic: Medic;
    practices: Practice[];
}

interface ShiftPanelProps {
  name: string;
  text: string;
  buttonText?: boolean;

}


interface Patient {
    id: string;
    name: string;
    dni: string;    
    Appointments: AppointmentCardProps[];
}

const ShiftPanel: React.FC<ShiftPanelProps> = ({text, name,buttonText}) => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<AppointmentCardProps[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userType = user.role || '';
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = authService.getUser();
        
        // Validar que el usuario existe y tiene DNI
        if (!user || !user.dni) {
          console.log('No user or DNI found, skipping appointment fetch');
          return;
        }
        
        console.log(`Retrieved user from localStorage:`, user);
        
        // Enviar como objeto con la estructura correcta
        const appointments = await AppointmentService.findAppointmentsByFilters({
          dni: user.dni
        });
        
        console.log('API Response:', appointments);
        
        // Validar que la respuesta tiene datos
        if (!appointments || !appointments.data || !Array.isArray(appointments.data)) {
          console.log('No appointments data in response');
          setAppointments([]);
          return;
        }
        
        const appointmentsData = appointments.data;
        console.log('Appointments data array:', appointmentsData);
        
        // Transformar para incluir appointmentId con validación
        const transformedAppointments = appointmentsData.map((apt: any) => {
          console.log('Transforming appointment:', apt);
          return {
            appointmentId: apt.id || apt._id || `temp-${Date.now()}`,
            appointmentDate: apt.appointmentDate || new Date().toISOString(),
            appointmentStatus: apt.appointmentStatus || 'Pendiente',
            patient: apt.patient || { name: 'N/A', dni: 'N/A' },
            medic: apt.medic || { name: 'N/A', specialty: 'N/A' },
            practices: apt.practices || []
          };
        });
        
        console.log('Transformed appointments:', transformedAppointments);
        setAppointments(transformedAppointments);
      } catch(error) {
        console.error('Error fetching appointments in ShiftPanel:', error);
        setAppointments([]); // Establecer array vacío en caso de error
      }
    };
    
    fetchAppointments();
  }, []);

  const handleGestionClick = () => {
    navigate('/updateStatus');
  }

  return (
    <div className="shift-panel">
      <h2>{name}</h2>
      <p>{text}</p>

{     userType === 'Patient' && 
      <div className="appointments-container">
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment) => (
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
          <p>No hay turnos disponibles</p>
        )}
      </div>}
      {
        userType === 'Administrative' && buttonText == true &&
        <div>
          <button className="manage-appointments-button" onClick = {handleGestionClick}>Panel de gestión</button>
        </div>
      }
    </div>
  );
};

export default ShiftPanel;
