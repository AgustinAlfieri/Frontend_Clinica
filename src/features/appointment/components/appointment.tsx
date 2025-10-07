import { useState, useEffect } from 'react';
import React from 'react';
import './appointment.css';
import { AppointmentService } from '../service/appointmentService';

interface AppointmentFormData {
    patient_id: string;
    specialty_id: string;
    medic_id: string;
    practice_id: string;
    schedule_id: string;
}

interface Specialty {
    id: string;
    name: string;
}

interface Medic {
    id: string;
    name: string;
}

interface Practice {
    id: string;
    name: string;
}

interface Schedule {
    id: string;
    datetime: string;
}

const AppointmentForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    // Datos del formulario
    const [formData, setFormData] = useState<AppointmentFormData>({
        patient_id: '', // Se obtendrá de la sesión
        specialty_id: '',
        medic_id: '',
        practice_id: '',
        schedule_id: ''
    });

    // Listas para los selects (se llenarán con llamadas a la API)
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [medics, setMedics] = useState<Medic[]>([]);
    const [practices, setPractices] = useState<Practice[]>([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    useEffect(() => {
        // TODO: Aquí irían las llamadas a la API para cargar las listas
        // Ejemplo:
        // fetchSpecialties().then(data => setSpecialties(data));
        // fetchMedics().then(data => setMedics(data));
        // fetchPractices().then(data => setPractices(data));
        // fetchSchedules().then(data => setSchedules(data));
        
        ///// FETCH A SPECIALTIES
        const fetchSpecialties = async () => {
            console.log('Fetching specialties...')
            setIsLoading(true);
            try {
                const specialtiesData = await AppointmentService.getSpecialties();
                console.log('Specialties recibidas:', specialtiesData);
                setSpecialties(specialtiesData);
            }catch (error){
                console.error('Error fetching specialties:', error);
            }finally{
                setIsLoading(false);
            }
        };

        fetchSpecialties();

    }, []);

    // useEffect separado para ver cuando cambian las specialties
    useEffect(() => {
        console.log('Estado specialties actualizado:', specialties);
    }, [specialties]);

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async () => {
        // Validaciones
        if (!formData.specialty_id || !formData.medic_id || !formData.practice_id || !formData.schedule_id) {
            setError('Por favor completa todos los campos');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            // TODO: Aquí iría la llamada a la API para crear el turno
            // const response = await appointmentService.create(formData);
            
            // Simulación de éxito
            setTimeout(() => {
                setSuccess('Turno creado exitosamente');
                setIsLoading(false);
                // Limpiar formulario
                setFormData({
                    patient_id: '',
                    specialty_id: '',
                    medic_id: '',
                    practice_id: '',
                    schedule_id: ''
                });
            }, 1000);
        } catch (err: any) {
            setError(err.message || 'Error al crear el turno');
            console.error('Create appointment error:', err);
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        // TODO: Aquí iría la lógica para cancelar/volver
        console.log('Cancel appointment');
    };

    return (
        <div className="appointment-container">
            <div className="appointment-card">
                {/* Header */}
                <div className="appointment-header">
                    <h1 className="appointment-title">Solicitar Turno</h1>
                    <p className="appointment-subtitle">Complete los datos para agendar su cita</p>
                    <div className="appointment-divider"></div>
                </div>

                {/* Form Section */}
                <div className="appointment-form-section">
                    <h2 className="form-title">Información del Turno</h2>

                    {error && (
                        <div style={{
                            padding: '12px',
                            marginBottom: '15px',
                            backgroundColor: '#ffebee',
                            color: '#c62828',
                            borderRadius: '8px',
                            fontSize: '14px',
                            border: '1px solid #ef5350'
                        }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{
                            padding: '12px',
                            marginBottom: '15px',
                            backgroundColor: '#e8f5e9',
                            color: '#2e7d32',
                            borderRadius: '8px',
                            fontSize: '14px',
                            border: '1px solid #66bb6a'
                        }}>
                            ✓ {success}
                        </div>
                    )}

                    <div className="form-inputs">
                        {/* Specialty Select */}
                        <div className="form-group">
                            <label className="form-label">Especialidad</label>
                            <select
                                name="specialty_id"
                                value={formData.specialty_id}
                                onChange={handleInputChange}
                                className="form-input"
                                disabled={isLoading}
                            >
                                <option value="">Seleccione una especialidad</option>
                                {specialties.map(specialty => (
                                    <option key={specialty.id} value={specialty.id}>
                                        {specialty.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Medic Select */}
                        <div className="form-group">
                            <label className="form-label">Médico</label>
                            <select
                                name="medic_id"
                                value={formData.medic_id}
                                onChange={handleInputChange}
                                className="form-input"
                                disabled={isLoading}
                            >
                                <option value="">Seleccione un médico</option>
                                {medics.map(medic => (
                                    <option key={medic.id} value={medic.id}>
                                        {medic.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Practice Select */}
                        <div className="form-group">
                            <label className="form-label">Práctica</label>
                            <select
                                name="practice_id"
                                value={formData.practice_id}
                                onChange={handleInputChange}
                                className="form-input"
                                disabled={isLoading}
                            >
                                <option value="">Seleccione una práctica</option>
                                {practices.map(practice => (
                                    <option key={practice.id} value={practice.id}>
                                        {practice.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Schedule Select */}
                        <div className="form-group">
                            <label className="form-label">Horario</label>
                            <select
                                name="schedule_id"
                                value={formData.schedule_id}
                                onChange={handleInputChange}
                                className="form-input"
                                disabled={isLoading}
                            >
                                <option value="">Seleccione un horario</option>
                                {schedules.map(schedule => (
                                    <option key={schedule.id} value={schedule.id}>
                                        {schedule.datetime}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="form-buttons">
                            <button
                                onClick={handleSubmit}
                                className="form-button form-button-primary"
                                disabled={isLoading}
                                style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                            >
                                {isLoading ? 'Creando...' : 'Confirmar Turno'}
                                {!isLoading && (
                                    <svg
                                        className="button-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>

                            <button
                                onClick={handleCancel}
                                className="form-button form-button-secondary"
                                disabled={isLoading}
                            >
                                Cancelar
                                <svg
                                    className="button-icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="appointment-footer">
                    <p className="footer-copyright">
                        © 2025 ClinicaSana. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppointmentForm;