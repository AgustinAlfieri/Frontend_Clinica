import { useState, useEffect } from 'react';
import { AppointmentService } from '../../appointment/service/appointmentService';
import { authService } from '../services/authService';
import type { AppointmentCardData, AppointmentFromAPI } from '../../appointment/types/appointment.types';

export const usePatientAppointments = (enabled: boolean = true) => {
    const [appointments, setAppointments] = useState<AppointmentCardData[]>([]);
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
                const response = await AppointmentService.findAppointmentsByFilters({
                    dni: user.dni
                });

                // Validar que la respuesta tiene datos
                if (!response || !response.data || !Array.isArray(response.data)) {
                    setAppointments([]);
                    return;
                }

                // Transformar datos
                const transformedAppointments: AppointmentCardData[] = response.data.map(
                    (appointment: AppointmentFromAPI) => ({
                        appointmentId: appointment.id,
                        appointmentDate: appointment.appointmentDate,
                        appointmentStatus: appointment.appointmentsStatus?.[0]?.typeAppointmentStatus?.name || 'Sin estado',
                        patient: {
                            name: appointment.patient?.name || 'Sin paciente',
                            dni: appointment.patient?.dni || ''
                        },
                        medic: {
                            name: appointment.medic?.name || 'Sin medico',
                            specialty: appointment.medic?.medicalSpecialty?.[0]?.name || 'Sin especialidad'
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
