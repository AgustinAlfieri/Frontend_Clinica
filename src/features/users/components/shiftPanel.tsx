import React from "react";
import AppointmentCard from "../../appointment/components/AppointmentCard";
import "./shiftPanel.css";
import { useEffect, useState } from "react";
import { AppointmentService } from "../../appointment/service/appointmentService";
import {authService} from "../services/authService";
import { useNavigate } from "react-router-dom";

interface Patient {
    id: string;
    name: string;
    dni: string;
    email: string;
    password: string;
    telephone: string;
    role: string;
    insuranceNumber: string | null;
    medicalInsurance: string | null;
}

interface Medic {
    id: string;
    dni: string;
    name: string;
    email: string;
    password: string;
    telephone: string;
    role: string;
    license: string;
}

interface Practice{
    name: string;
    description?: string;
}

interface AppointmentStatus {
    typeAppointmentStatus: TypeAppointmentStatus,
    observation: string
}

interface TypeAppointmentStatus {
    name: string;
}

// Estructura de cada appointment que viene de la API
interface AppointmentFromAPI {
    id: string;
    appointmentDate: string;
    appointmentsStatus: AppointmentStatus[];
    patient: Patient;
    medic: Medic;
}

interface AppointmentCardProps {
    appointmentId: string; // ID único del appointment
    appointmentDate: string;
    appointmentStatus: string;
    patient: {
        name: string;
        dni: string;
    };
    medic: {
        name: string;
        specialty: string;
    };
    practices: Practice[];
}

interface ShiftPanelProps {
  name: string;
  text: string;
  buttonText?: boolean;
  fill?: boolean;
}

const ShiftPanel: React.FC<ShiftPanelProps> = ({text, name, buttonText, fill}) => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<AppointmentCardProps[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userType = user.role || '';
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
          if (fill) {
            
            const user = authService.getUser();
          
            // Validar que el usuario existe y tiene DNI
            if (!user || !user.dni) {
              return;
            }
            
            // Enviar como objeto con la estructura correcta
            const appointments = await AppointmentService.findAppointmentsByFilters({
              dni: user.dni
            });
            
            // Validar que la respuesta tiene datos
            if (!appointments || !appointments.data || !Array.isArray(appointments.data)) {
              setAppointments([]);
              return;
            }
            
            const appointmentsData = appointments.data;
            
            // Transformar para incluir appointmentId y typeAppointmentStatus
            const transformedAppointments: AppointmentCardProps[] = appointmentsData.map((appointment: AppointmentFromAPI) => {
              return {
                appointmentId: appointment.id,
                appointmentDate: appointment.appointmentDate,
                appointmentStatus: appointment.appointmentsStatus?.[0]?.typeAppointmentStatus?.name || 'Sin estado',
                patient: {
                  name: appointment.patient.name,
                  dni: appointment.patient.dni
                },
                medic: {
                  name: appointment.medic.name,
                  specialty: '' // La API no devuelve specialty en medic
                },
                practices: []
              };
            });
            
            setAppointments(transformedAppointments);
        }
      } catch(error) {
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

  {userType === 'Patient' && (
    <div className="appointments-container">
      {appointments && appointments.length > 0 ? (
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
        <p>Not supported yet</p>
      )}
    </div>
  )}<br />
</div>

  );
};

export default ShiftPanel;
