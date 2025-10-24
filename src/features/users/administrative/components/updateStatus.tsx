import React from 'react';
import AppointmentCard from '../../../appointment/components/AppointmentCard';
import { useState } from 'react';
import {AppointmentService} from '../../../appointment/service/appointmentService';

// Interfaces que coinciden con la respuesta de la API
interface Patient {
    id: string;
    dni: string;
    name: string;
    email: string;
    password: string;
    telephone: string;
    role: string;
    insuranceNumber: string | null;
    medicalInsurance: string | null;
}

interface filters {
    dni?: string;
    beforeDate?: Date;
    afterDate?: Date;
    status?: string;
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

// Estructura de cada appointment que viene de la API
interface AppointmentFromAPI {
    id: string;
    appointmentDate: string;
    patient: Patient;
    medic: Medic;
}

// Respuesta completa de la API
interface APIResponse {
    success: boolean;
    data: AppointmentFromAPI[];
    message: string;
    statusCode: number;
}

// Interface para el componente AppointmentCard (adaptada)
interface Practice {
    name: string;
    description?: string;
}

export interface AppointmentCardProps {
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


const UpdateStatus: React.FC = () => {
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState('');
    const [success , setSuccess] = useState('');
    const [appointments , setAppointments] = useState<AppointmentCardProps[]>([]);
    
    // Estados para los filtros
    const [filters, setFilters] = useState<filters>({
        dni: '',
        beforeDate: undefined,
        afterDate: undefined,
        status: ''
    });

    // Manejar cambios en los inputs de filtros
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setFilters(prev => ({
            ...prev,
            [name]: value === '' ? undefined : (name.includes('Date') ? new Date(value) : value)
        }));
    };

    const handleSearch = async () => {
        setIsLoading(true);
        setError('');
        try{ 
            // Construir objeto de filtros limpio (sin valores vacíos)
            const cleanFilters: filters = {};
            
            if (filters.dni && filters.dni.trim() !== '') {
                cleanFilters.dni = filters.dni.trim();
            }
            if (filters.beforeDate) {
                cleanFilters.beforeDate = filters.beforeDate;
            }
            if (filters.afterDate) {
                cleanFilters.afterDate = filters.afterDate;
            }
            if (filters.status && filters.status.trim() !== '') {
                cleanFilters.status = filters.status;
            }

            console.log('Sending filters to API:', cleanFilters);
            const response: APIResponse = await AppointmentService.findAppointmentsByFilters(cleanFilters);
            console.log('Appointments fetched in UpdateStatus component:', response);
            
            // Transformar los datos de la API al formato que espera AppointmentCard
            const transformedAppointments: AppointmentCardProps[] = response.data.map((appointment) => ({
                appointmentDate: appointment.appointmentDate,
                appointmentStatus: 'Pendiente', // Por defecto, ya que la API no devuelve status
                patient: {
                    name: appointment.patient.name,
                    dni: appointment.patient.dni
                },
                medic: {
                    name: appointment.medic.name,
                    specialty: '' // La API no devuelve specialty en medic, tendrías que obtenerla de otra forma
                },
                practices: [] // La API no devuelve practices, tendrías que obtenerlas de otra forma
            }));
            console.log('Transformed Appointments:', transformedAppointments);
            setAppointments(transformedAppointments);
        } catch(err) {
            setError('Error al cargar las citas');
            console.error('Error fetching appointments:', err);
        } finally {
            setIsLoading(false);
        }
    };

    

    return(
        <div>
            <h1>Actualizar estados del paciente</h1>
            <div className = "form-container">
                {/*Formulario para actualizar el estado del paciente*/}
                <div className="appointment-select-section">
                    <div className="filter-group">
                        <label htmlFor="status">Estado del Turno</label>
                        <select
                            id="status"
                            name="status"
                            value={filters.status || ''}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos los estados</option>
                            <option value="Solicitado">Solicitado</option>
                            <option value="En_sala_de_espera">En sala de espera</option>
                            <option value="Confirmado">Confirmado</option>
                            <option value="Cancelado">Cancelado</option>
                            <option value="Completado">Completado</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="afterDate">Fecha desde</label>
                        <input
                            type="datetime-local"
                            id="afterDate"
                            name="afterDate"
                            value={filters.afterDate ? new Date(filters.afterDate.getTime() - filters.afterDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="beforeDate">Fecha hasta</label>
                        <input
                            type="datetime-local"
                            id="beforeDate"
                            name="beforeDate"
                            value={filters.beforeDate ? new Date(filters.beforeDate.getTime() - filters.beforeDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="dni">DNI del Paciente</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            placeholder="Ej: 12345678"
                            value={filters.dni || ''}
                            onChange={handleFilterChange}
                        />
                    </div>

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

