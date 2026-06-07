import { useState, useEffect } from 'react';
import { AppointmentService } from '../../appointment/service/appointmentService';
import { authService } from '../services/authService';
import type { AppointmentCardData, AppointmentFromAPI } from '../../appointment/types/appointment.types';

export const useMedicAppointments = (enabled: boolean = true) => {
    const [appointments, setAppointments] = useState<AppointmentCardData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const fetchMedicAppointments = async () => {
            try {
                setLoading(true);
                const user = authService.getUser();

                // Validar que el usuario existe y tiene DNI
                if (!user || !user.dni) {
                    setError('Usuario no autenticado o sin DNI');
                    setAppointments([]);
                    return;
                }

                // Crear fechas para filtrar solo turnos de hoy
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Inicio del día (00:00:00)
                
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1); // Inicio del día siguiente (00:00:00)

                const tomorrow2 = new Date(tomorrow);
                tomorrow2.setDate(tomorrow.getDate() + 1); // Inicio del día siguiente (00:00:00)

                // Obtener turnos del médico solo para hoy
                const response = await AppointmentService.findAppointmentsByFilters({
                    dni: user.dni,
                    afterDate: tomorrow,      // Desde las 00:00:00 de hoy
                    beforeDate: tomorrow2   // Hasta las 00:00:00 de mañana
                });

                // Validar que la respuesta tiene datos
                if (!response || !response.data || !Array.isArray(response.data)) {
                    setAppointments([]);
                    return;
                }

                // Filtrar solo los turnos en "sala de espera" (estado: "En espera", "Confirmado", "Pendiente", etc.)
                // Ajusta los nombres de estados según tu backend
                const waitingRoomAppointments = response.data.filter(
                    (appointment: AppointmentFromAPI) => {
                        const status = appointment.appointmentsStatus?.[0]?.typeAppointmentStatus?.name?.toLowerCase() || '';
                        return status === 'en espera' || 
                               status === 'confirmado' || 
                               status === 'pendiente' ||
                               status === 'solicitado';
                    }
                );

                // Transformar datos
                const transformedAppointments: AppointmentCardData[] = waitingRoomAppointments.map(
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
                setError('Error al cargar los turnos');
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicAppointments();
    }, [enabled]);

    return { appointments, loading, error };
};
