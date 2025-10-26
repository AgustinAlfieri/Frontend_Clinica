import React from 'react';
import './AppointmentCard.css';
import { useUpdateStatus } from '../../users/administrative/context/UpdateStatusContext';

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

const AppointmentCard: React.FC<AppointmentCardProps> = (appointment: AppointmentCardProps) => {
    // Usar el contexto
    const { 
        typeAppointments, 
        loadingTypeAppointments, 
        selectedAppointmentId, 
        setSelectedAppointmentId 
    } = useUpdateStatus();
    
    const [selectedType, setSelectedType] = React.useState<string>('');
    
    // Verificar si este appointment está seleccionado
    const isSelected = selectedAppointmentId === appointment.appointmentId;
    
    const formattedDate = new Date(appointment.appointmentDate).toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleSelect = () => {
        // Toggle selección: si ya está seleccionado, deseleccionar; si no, seleccionar
        if (isSelected) {
            setSelectedAppointmentId(null);
            setSelectedType('');
        } else {
            setSelectedAppointmentId(appointment.appointmentId);
        }
        console.log(`Appointment ${appointment.appointmentId} selected: ${!isSelected}`);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    const handleSubmit = () => {
        if (!selectedType) {
            alert('Por favor selecciona un estado');
            return;
        
        
        
        }
        console.log(`Updating appointment ${appointment.appointmentId} to status: ${selectedType}`);
        // Aquí llamarías a la API para actualizar el estado
    };

    return(
        <div className="appointment-card-compact">
            <div className="card-header">
                <span className={'status-badge status-'}>
                    {appointment.appointmentStatus}
                </span>
                <span className="appointment-date">{formattedDate}</span>
            </div>

            <div className="card-body">
                <div className="info-row">
                    <span className="label">Paciente:</span>
                    <span className="value">{appointment.patient.name}</span>
                </div>
                <div className="info-row">
                    <span className="label">DNI:</span>
                    <span className="value">{appointment.patient.dni}</span>
                </div>
                <div className="info-row">
                    <span className="label">Especialidad:</span>
                    <span className="value">{appointment.medic.specialty}</span>
                </div>
                <div className="info-row">
                    <span className="label">Médico:</span>
                    <span className="value">{appointment.medic.name}</span>
                </div>
                <div className="info-row">
                    <span className="label">Práctica:</span>
                    <span className="value">
                        {appointment.practices.length > 0 
                            ? appointment.practices.map(p => p.name).join(', ')
                            : 'No especificada'
                        }
                    </span>
                </div>
                <div>
                    <button className="details-button" onClick={handleSelect}>
                        {isSelected ? 'Seleccionado ✓' : 'Seleccionar'}
                    </button>

                    {isSelected && (
                        <select 
                            name="typeAppointment" 
                            id="typeAppointment"
                            value={selectedType}
                            onChange={handleTypeChange}
                        >
                            <option value="">
                                {loadingTypeAppointments ? 'Cargando...' : 'Seleccione un estado'}
                            </option>
                            {typeAppointments.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                {isSelected && (
                    <div>
                        <button onClick={handleSubmit} disabled={!selectedType}>
                            Enviar
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AppointmentCard;