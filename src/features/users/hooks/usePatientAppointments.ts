import { useState, useEffect } from 'react';
import { AppointmentService } from '../../appointment/service/appointmentService';
import { authService } from '../services/authService';

interface Patient {
    name: string;
    dni: string;
}

interface Medic {
    name: string;
    specialty: string;
}

interface Practice {
    name: string;
    description?: string;
}

export interface AppointmentCardProps {
    appointmentId: string;
    appointmentDate: string;
    appointmentStatus: string;
    patient: Patient;
    medic: Medic;
    practices: Practice[];
}

interface AppointmentStatus {
    typeAppointmentStatus: TypeAppointmentStatus;
    observation: string;
}

interface TypeAppointmentStatus {
    name: string;
}

interface AppointmentFromAPI {
    id: string;
    appointmentDate: string;
    appointmentsStatus: AppointmentStatus[];
    patient: {
        name: string;
        dni: string;
    };
    medic: {
        name: string;
    };
}

export const usePatientAppointments = (enabled: boolean = true) => {
    const [appointments, setAppointments] = useState<AppointmentCardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const fetchPatientAppointments = async () => {
            try {
                setLoading(true);
                const user = authService.getUser();

                // Validar que el usuario existe y tiene DNI
                if (!user || !user.dni) {
                    setError('Usuario no autenticado o sin DNI');
                    setAppointments([]);
                    return;
                }

                // Obtener turnos del paciente por su DNI
                console.log('🔍 Fetching appointments for patient DNI:', user.dni);
                const response = await AppointmentService.findAppointmentsByFilters({
                    dni: user.dni
                });

                // Validar que la respuesta tiene datos
                if (!response || !response.data || !Array.isArray(response.data)) {
                    setAppointments([]);
                    return;
                }

                // Transformar datos
                const transformedAppointments: AppointmentCardProps[] = response.data.map(
                    (appointment: AppointmentFromAPI) => ({
                        appointmentId: appointment.id,
                        appointmentDate: appointment.appointmentDate,
                        appointmentStatus: appointment.appointmentsStatus?.[0]?.typeAppointmentStatus?.name || 'Sin estado',
                        patient: {
                            name: appointment.patient.name,
                            dni: appointment.patient.dni
                        },
                        medic: {
                            name: appointment.medic.name,
                            specialty: ''
                        },
                        practices: []
                    })
                );

                setAppointments(transformedAppointments);
                setError(null);
            } catch (err) {
                console.log(err);
                setError('Error al cargar los turnos');
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientAppointments();
    }, [enabled]);

    return { appointments, loading, error };
};
