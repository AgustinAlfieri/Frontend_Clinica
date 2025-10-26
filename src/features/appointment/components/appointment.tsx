import { useState, useEffect } from 'react';
import React from 'react';
// import './appointment.css'; // ← Comentado para usar Tailwind
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
  date: string; // ISO string - ← Coincide con el backend
  appointmentStatus?: string;
  patientId: string; // patient id - ← Con "Id" al final
  medicId: string; // medic id - ← Con "Id" al final
  administratives: string[]; // array of administrative ids
  practices: string[]; // array of practice ids
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
            console.log(selectedSpecialty);
            if (selectedSpecialty && selectedSpecialty.medics) {
                setAvailableMedics(selectedSpecialty.medics);
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
                date: formData.schedule_id,
                patientId: user ? JSON.parse(user).id : '',
                medicId: formData.medic_id,
                practices: ['17603124302705Zdc2BX-jEIXg6'],
                administratives: ['17571754793588mXr-hsn_5RcQi']
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
        <div className="min-h-[120vh] bg-cover bg-center bg-no-repeat flex items-center justify-center p-8 sm:p-12 md:p-16" 
             style={{backgroundImage: "url('/src/assets/back.jpg')"}}>
            <div className="bg-white w-full max-w-[750px] flex flex-col p-10 sm:p-10 md:p-10 lg:p-12 xl:p-12 2xl:p-16 rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.15)] lg:shadow-[0_25px_50px_rgba(0,0,0,0.2)]"
                 style={{backgroundColor: '#ffffff'}}>
                {/* Header */}
                <div className="text-center mb-6 w-full">
                    <h1 className="text-[1.875rem] sm:text-4xl md:text-[2.25rem] lg:text-[2.5rem] xl:text-5xl 2xl:text-[3.5rem] font-bold text-[#2C5F5D] mb-2 lg:mb-3">
                        Solicitar Turno
                    </h1>
                    <p className="text-[#4b5563] text-sm sm:text-base lg:text-base m-0">
                        Complete los datos para agendar su cita
                    </p>
                    <div className="w-full h-px bg-[#d1d5db] mt-4"></div>
                </div>

                {/* Form Section */}
                <div className="w-full mb-6">
                    <h2 className="text-xl sm:text-[1.25rem] md:text-[1.35rem] lg:text-2xl xl:text-[1.75rem] 2xl:text-[2rem] font-semibold text-[#374151] text-center mb-8 lg:mb-10 2xl:mb-12">
                        Información del Turno
                    </h2>

                    {error && <Alert type="error" message={error} />}
                    {specialtiesError && <Alert type="error" message={specialtiesError} />}
                    {success && <Alert type="success" message={success} />}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 mb-6">{/* Specialty Select */}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 mt-8">
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
                <div className="text-center pt-4 mt-4 border-t border-[#e2e8f0]">
                    <p className="text-[#6b7280] text-[0.85rem] m-0">
                        © 2025 ClinicaSana. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppointmentForm;