import React from 'react';
import Select from '../../../../core/components/select';
import AppointmentCard from '../../../appointment/components/AppointmentCard';
import { useState } from 'react';
import {AppointmentService} from '../../../appointment/service/appointmentService';

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

export interface AppointmentCardProps {
    appointmentDate: string;
    appointmentStatus: string;
    patient: Patient;
    medic: Medic;
    practices: Practice[];
}


const UpdateStatus: React.FC = () => {
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState('');
    const [success , setSuccess] = useState('');
    const [appointments , setAppointments] = useState<AppointmentCardProps[]>([]);

    const handleSearch = async () => {
        setIsLoading(true);
        setError('');
        try{ 
            const appointmentsData : AppointmentCardProps[] = await AppointmentService.getAppointments();
            console.log('Appointments fetched in UpdateStatus component:', appointmentsData);
            setAppointments(appointmentsData);
        } catch(err) {
            setError('Error al cargar las citas');
            console.error('Error fetching appointments:', err);
        } finally {
            setIsLoading(false);
        }
    };

    

    return(
        <div>
            <h1>'Actualizar estados del paciente'</h1>
            <div className = "form-container">
                {/*Formulario para actualizar el estado del paciente*/}
                <div className="appointment-select-section">
                    <Select
                        label="Estado del Paciente"
                        name="Filtro por especialidad"
                        options={[]}
                        />
                    <Select
                        label = "Fecha desde"
                        name="Filtro por fecha"
                        options={[]}
                    />
                    <Select
                        label = "Fecha hasta"
                        name="Filtro por fecha"
                        options={[]}
                    />
                    <Select
                        label = "Paciente"
                        name="Filtro por paciente"
                        options={[]}
                    />
                    <button onClick={handleSearch} disabled={isLoading}>
                        {isLoading ? 'Buscando...' : 'Buscar'}
                    </button>
                </div>
                <div className="Appointment-card-section">
                    {isLoading && <p>Cargando citas...</p>}
                    {error && <p className="error">{error}</p>}
                    {!isLoading && !error && appointments.length === 0 && (
                        <p>No hay citas disponibles</p>
                    )}
                    {!isLoading && appointments.map((appointment, index) => (
                        console.log('Rendering appointment:', appointment),
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
        </div>
    )
}

export default UpdateStatus

