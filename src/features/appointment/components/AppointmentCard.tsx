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

interface AppointmentStatus {
  appointment: string;
  typeAppointmentStatus: string;
  observations: string;
  date: string;
}


const AppointmentCard: React.FC<AppointmentCardProps> = (appointment: AppointmentCardProps) => {
    // Usar el contexto (puede ser undefined si no está en UpdateStatusProvider)
    const context = useUpdateStatus();
    
    const [selectedType, setSelectedType] = React.useState<string>('');
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    
    // Solo usar el contexto si está disponible
    const typeAppointments = context?.typeAppointments || [];
    const loadingTypeAppointments = context?.loadingTypeAppointments || false;
    const setSelectedAppointmentId = context?.setSelectedAppointmentId;
    
    const [observations, setObservations] = React.useState<Record<string, string>>({});


    const formattedDate = new Date(appointment.appointmentDate).toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleObservations = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target
        setObservations(prev => ({
            ...prev,
            [name]:value
        }))


    }



    const handleSelect = () => {
        // Solo permitir selección si el contexto está disponible
        if (!setSelectedAppointmentId) {
            return;
        }
        
        // Abrir el modal y seleccionar el appointment
        setSelectedAppointmentId(appointment.appointmentId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAppointmentId?.(null);
        setSelectedType('');
        setObservations({});
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedType) {
            alert('Por favor selecciona un estado');
            return;
        }
        
        const statusData: AppointmentStatus = {
            appointment: appointment.appointmentId,
            typeAppointmentStatus: selectedType,
            observations: observations.observations ||'',
            date: new Date().toISOString()     
        };
        
        try {
            await AppointmentService.createAppointmentStatus(statusData);
            alert('Estado actualizado correctamente');
            handleCloseModal();
        } catch (error) {
            alert('Error al actualizar el estado');
        }
    };

    return(
        <>
            <div className="appointment-card-compact">
                <div className="card-header">
                    <span className={'status-badge status-'}>
                        {appointment.appointmentStatus == '' ? 'Sin estado' : appointment.appointmentStatus}
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
                        <span className="label">Médico:</span>
                        <span className="value">{appointment.medic.name}</span>
                    </div>
                    
                    {/* Solo mostrar controles si está dentro del contexto (UpdateStatusProvider) */}
                    {context && (
                        <button className="details-button" onClick={handleSelect}>
                            Seleccionar
                        </button>
                    )}
                </div>
            </div>

            {/* Modal para actualizar estado */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Actualizar Estado del Turno</h2>
                            <button className="modal-close" onClick={handleCloseModal}>×</button>
                        </div>

                        <div className="modal-body">
                            <div className="info-row">
                                <span className="label">Paciente:</span>
                                <span className="value">{appointment.patient.name}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">DNI:</span>
                                <span className="value">{appointment.patient.dni}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Médico:</span>
                                <span className="value">{appointment.medic.name}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Fecha:</span>
                                <span className="value">{formattedDate}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="typeAppointment">Estado del Turno:</label>
                                <select 
                                    name="typeAppointment" 
                                    id="typeAppointment"
                                    value={selectedType}
                                    onChange={handleTypeChange}
                                    className="modal-select"
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
                            </div>

                            <div className="form-group">
                                <label htmlFor="observations">Observaciones:</label>
                                <input 
                                    type="text" 
                                    name="observations" 
                                    id="observations" 
                                    placeholder='Ingrese observaciones (opcional)'
                                    onChange={handleObservations}
                                    value={observations.observations || ''}
                                    className="modal-input"
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="modal-button cancel" onClick={handleCloseModal}>
                                Cancelar
                            </button>
                            <button 
                                className="modal-button submit" 
                                onClick={handleSubmit} 
                                disabled={!selectedType}
                            >
                                Actualizar Estado
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AppointmentCard;