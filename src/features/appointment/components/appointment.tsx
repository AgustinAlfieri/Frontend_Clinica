import { useState, useEffect } from 'react';
import React from 'react';
import './appointment.css';
import { AppointmentService } from '../service/appointmentService';
import { useSpecialties } from '../../../core/hooks/useSpecialties';
import Alert from '../../../core/components/alert';
import Select from '../../../core/components/select';
import Button from '../../../core/components/button';

interface AppointmentFormData {
    patient_id: string;
    specialty_id: string;
    medic_id: string;
    practice_id: string;
    day_id: string;
    schedule_id: string;
}

interface Medic {
    dni: string;
    email: string;
    id: string;
    license: string;
    name: string;
    password: string;
    role: string;
    telephone: string;
}

interface Practice {
    id: string;
    name: string;
}

interface TimeSlot {
  datetime: string;
  available: boolean;
}

interface AvailableSchedule {
  date: string;
  slots: TimeSlot[];
}

interface AppointmentData {
    appointmentDate: string; // ISO string
    patientId: string;
    medicId: string;
    practice_id: string[];
    administrativeIds?: string[];
}


const AppointmentForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    
    // Estados para schedule completo
    const [fullSchedule, setFullSchedule] = useState<AvailableSchedule[]>([]);
    const [availableDays, setAvailableDays] = useState<string[]>([]);
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    
    // Datos del formulario
    const [formData, setFormData] = useState<AppointmentFormData>({
        patient_id: localStorage.getItem('userId') || '',
        specialty_id: '',
        medic_id: '',
        practice_id: 'Consulta',
        day_id: '',
        schedule_id: ''
    });


    // Usar el custom hook para obtener especialidades
    const { 
        specialties, 
        isLoading: isLoadingSpecialties, 
        error: specialtiesError 
    } = useSpecialties(AppointmentService.getSpecialties);

    // Listas para los selects
    const [availableMedics, setAvailableMedics] = useState<Medic[]>([]);
    const [practices, setPractices] = useState<Practice[]>([]);

    // Efecto para actualizar los médicos disponibles cuando cambia la especialidad
    useEffect(() => {
        if (formData.specialty_id && Array.isArray(specialties)) {
            const selectedSpecialty = specialties.find(s => s.id === formData.specialty_id);
            if (selectedSpecialty && selectedSpecialty.medicalProfessionals) {
                setAvailableMedics(selectedSpecialty.medicalProfessionals);
            } else {
                setAvailableMedics([]);
            }
            // Limpiar selecciones dependientes
            setFormData(prev => ({
                ...prev,
                medic_id: '',
                practice_id: '',
                day_id: '',
                schedule_id: ''
            }));
        } else {
            setAvailableMedics([]);
        }
    }, [formData.specialty_id, specialties]);

    // Efecto para cargar el schedule completo cuando cambia el médico
    useEffect(() => {
        if (!formData.medic_id) {
            setFullSchedule([]);
            setAvailableDays([]);
            setAvailableSlots([]);
            return;
        }

        const fetchScheduleData = async () => {
            try {
                const scheduleData = await AppointmentService.getSlotsByMedic(formData.medic_id);
                
                // Guardar el schedule completo
                setFullSchedule(scheduleData);
                
                // Extraer solo los días disponibles
                const days = scheduleData.map(day => day.date);
                setAvailableDays(days);
                
                console.log('Schedule loaded:', scheduleData);
                console.log('Available days:', days);
                
            } catch(err) {
                console.error('Error fetching schedule:', err);
                setError('Error al cargar los horarios disponibles');
            }
        };

        fetchScheduleData();
        
        // Limpiar día y horario seleccionados cuando cambia el médico
        setFormData(prev => ({
            ...prev,
            day_id: '',
            schedule_id: ''
        }));
        
    }, [formData.medic_id]);

    // Efecto para filtrar slots cuando cambia el día seleccionado
    useEffect(() => {
        if (!formData.day_id || fullSchedule.length === 0) {
            setAvailableSlots([]);
            return;
        }

        // Buscar el día seleccionado en el schedule completo
        const selectedDay = fullSchedule.find(day => day.date === formData.day_id);
        
        if (selectedDay) {
            // Filtrar solo slots disponibles
            const availableSlotsForDay = selectedDay.slots.filter(slot => slot.available);
            setAvailableSlots(availableSlotsForDay);
            
            console.log('Slots for selected day:', availableSlotsForDay);
        } else {
            setAvailableSlots([]);
        }
        
        // Limpiar horario seleccionado cuando cambia el día
        setFormData(prev => ({
            ...prev,
            schedule_id: ''
        }));
        
    }, [formData.day_id, fullSchedule]);

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
        if (!formData.specialty_id || !formData.medic_id || !formData.schedule_id) {
            setError('Por favor completa todos los campos');
            return;
        }
        // Validaciones antes de enviar

        // Validaciones antes de enviar

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const user = localStorage.getItem('user');
            const appointmentData: AppointmentData = {
                appointmentDate: formData.schedule_id,
                patientId: user ? JSON.parse(user).id : '',
                medicId: formData.medic_id,
                practice_id: ['17603124302705Zdc2BX-jEIXg6'],
                administrativeIds: ['17571754793588mXr-hsn_5RcQi']
            }
            console.log('Creating appointment with data:', appointmentData);
            const responseAppointment = await AppointmentService.createAppointment(appointmentData);
            
      //      const statusData: StatusData = {
      //          "appointment": responseAppointment.id,
      //          "observations": "Solicitud",
      //          "idTypeAppointmentStatus":"1760303705587yWcdh02HlZ2kPs"
      //      }
      //      const responseStatus = await AppointmentService.createAppointmentStatus(

       //     );

            setTimeout(() => {
                setSuccess('Turno creado exitosamente');
                setIsLoading(false);
                // Limpiar formulario
                setFormData({
                    patient_id: '',
                    specialty_id: '',
                    medic_id: '',
                    practice_id: '',
                    day_id: '',
                    schedule_id: ''
                });
                setAvailableMedics([]);
                setFullSchedule([]);
                setAvailableDays([]);
                setAvailableSlots([]);
            }, 1000);
        } catch (err: any) {
            setError(err.message || 'Error al crear el turno');
            console.error('Create appointment error:', err);
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        console.log('Cancel appointment');
        // Limpiar el formulario
        setFormData({
            patient_id: '',
            specialty_id: '',
            medic_id: '',
            practice_id: 'Consulta',
            day_id: '',
            schedule_id: ''
        });
        setAvailableMedics([]);
        setFullSchedule([]);
        setAvailableDays([]);
        setAvailableSlots([]);
        setError('');
        setSuccess('');
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

                    {error && <Alert type="error" message={error} />}
                    {specialtiesError && <Alert type="error" message={specialtiesError} />}
                    {success && <Alert type="success" message={success} />}

                    <div className="form-inputs">
                        {/* Specialty Select */}
                        <Select
                            label="Especialidad"
                            name="specialty_id"
                            value={formData.specialty_id}
                            onChange={handleInputChange}
                            disabled={isLoading || isLoadingSpecialties}
                            options={[
                                { 
                                    value: '', 
                                    label: isLoadingSpecialties 
                                        ? 'Cargando especialidades...' 
                                        : 'Seleccione una especialidad' 
                                },
                                ...(Array.isArray(specialties) ? specialties.map(specialty => ({
                                    value: specialty.id,
                                    label: specialty.name
                                })) : [])
                            ]}
                        />

                        {/* Medic Select */}
                        <Select
                            label="Médico"
                            name="medic_id"
                            value={formData.medic_id}
                            onChange={handleInputChange}
                            disabled={isLoading || !formData.specialty_id}
                            options={[
                                {
                                    value: '',
                                    label: !formData.specialty_id 
                                        ? 'Primero selecciona una especialidad' 
                                        : availableMedics.length === 0 
                                            ? 'No hay médicos disponibles' 
                                            : 'Seleccione un médico'
                                },
                                ...availableMedics.map(medic => ({
                                    value: medic.id,
                                    label: medic.name
                                }))
                            ]}
                        />


                        {/* Day Select */}
                        <Select
                            label="Día"
                            name="day_id"
                            value={formData.day_id}
                            onChange={handleInputChange}
                            disabled={isLoading || !formData.medic_id}
                            options={[
                                {
                                    value: '',
                                    label: !formData.medic_id
                                        ? 'Primero selecciona un médico'
                                        : availableDays.length === 0
                                            ? 'No hay días disponibles'
                                            : 'Seleccione un día'
                                },
                                ...availableDays.map(day => ({
                                    value: day,
                                    label: new Date(day).toLocaleDateString('es-AR', { 
                                        weekday: 'long',
                                        year: 'numeric', 
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                }))
                            ]}
                        />

                        {/* Schedule/Time Select */}
                        <Select
                            label="Horario"
                            name="schedule_id"
                            value={formData.schedule_id}
                            onChange={handleInputChange}
                            disabled={isLoading || !formData.day_id}
                            options={[
                                {
                                    value: '',
                                    label: !formData.day_id
                                        ? 'Primero selecciona un día'
                                        : availableSlots.length === 0
                                            ? 'No hay horarios disponibles para este día'
                                            : 'Seleccione un horario'
                                },
                                ...availableSlots.map(slot => ({
                                    value: slot.datetime,
                                    label: new Date(slot.datetime).toLocaleTimeString('es-AR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    })
                                }))
                            ]}
                        />
                    </div>

                    <div className="form-buttons">
                        <Button
                            label={isLoading ? 'Creando...' : 'Confirmar Turno'}
                            buttonFunction={handleSubmit}
                            variant="primary"
                            disabled={isLoading}
                            icon={!isLoading ? (
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : undefined}
                        />

                        <Button
                            label="Cancelar"
                            buttonFunction={handleCancel}
                            variant="danger"
                            disabled={isLoading}
                            icon={
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            }
                        />
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