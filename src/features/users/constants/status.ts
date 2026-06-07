export const APPOINTMENT_STATUS = {
    PENDING: 'Solicitado',
    AWAITING: 'En_sala_de_espera',
    COMPLETED: 'Completado',
    CANCELLED: 'Cancelado',
} as const;

export type AppointmentStatus = typeof APPOINTMENT_STATUS[keyof typeof APPOINTMENT_STATUS];
