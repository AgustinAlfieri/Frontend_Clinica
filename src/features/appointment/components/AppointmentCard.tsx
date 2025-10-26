import React from 'react';
import './AppointmentCard.css';
import { useUpdateStatus } from '../../users/administrative/context/UpdateStatusContext';
import { AppointmentService } from '../service/appointmentService';

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
    console.log('AppointmentCard recibió estos props:', appointment);
    console.log('appointmentId:', appointment.appointmentId);
    console.log('appointmentDate:', appointment.appointmentDate);
    
    // Usar el contexto (puede ser undefined si no está en UpdateStatusProvider)
    const context = useUpdateStatus();
    
    const [selectedType, setSelectedType] = React.useState<string>('');
    
    // Solo usar el contexto si está disponible
    const typeAppointments = context?.typeAppointments || [];
    const loadingTypeAppointments = context?.loadingTypeAppointments || false;
    const selectedAppointmentId = context?.selectedAppointmentId;
    const setSelectedAppointmentId = context?.setSelectedAppointmentId;
    
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
        // Solo permitir selección si el contexto está disponible
        if (!setSelectedAppointmentId) {
            console.log('Context not available, selection disabled');
            return;
        }
        
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

    const handleSubmit = async () => {
        if (!selectedType) {
            alert('Por favor selecciona un estado');
            return;
        }
        
        const statusData = {
            appointment: appointment.appointmentId,
            typeAppointmentStatus: selectedType,
            date: new Date().toISOString()     
        };
        
        console.log('Datos que se envían al backend:', statusData);
        
        try {
            await AppointmentService.createAppointmentStatus(statusData);
            console.log(`Appointment ${appointment.appointmentId} updated to status: ${selectedType}`);
            alert('Estado actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            alert('Error al actualizar el estado');
        }
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
                
                {/* Solo mostrar controles si está dentro del contexto (UpdateStatusProvider) */}
                {context && (
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
                        
                        {isSelected && (
                            <div>
                                <button onClick={handleSubmit} disabled={!selectedType}>
                                    Enviar
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AppointmentCard;