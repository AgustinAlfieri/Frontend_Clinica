import React from 'react';
import './AppointmentCard.css';
import type { AppointmentCardData } from '../types/appointment.types';
import { APPOINTMENT_STATUS } from '../../users/constants/status';

export type AppointmentCardVariant = 'patient' | 'medic';

interface AppointmentCardProps extends AppointmentCardData {
    variant: AppointmentCardVariant;
}

const STATUS_LABELS: Record<string, string> = {
    [APPOINTMENT_STATUS.PENDING]: 'Solicitado',
    [APPOINTMENT_STATUS.AWAITING]: 'En sala de espera',
    [APPOINTMENT_STATUS.COMPLETED]: 'Completado',
    [APPOINTMENT_STATUS.CANCELLED]: 'Cancelado',
};

const STATUS_CLASSES: Record<string, string> = {
    [APPOINTMENT_STATUS.PENDING]: 'status-solicitado',
    [APPOINTMENT_STATUS.AWAITING]: 'status-pending',
    [APPOINTMENT_STATUS.COMPLETED]: 'status-completed',
    [APPOINTMENT_STATUS.CANCELLED]: 'status-cancelled',
};

const formatStatus = (status: string): string => {
    if (!status) {
        return 'Sin estado';
    }

    return STATUS_LABELS[status] || status.replace(/_/g, ' ');
};

const getStatusClass = (status: string): string => {
    return STATUS_CLASSES[status] || `status-${status.toLowerCase().replace(/_/g, '-')}`;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({
    appointmentDate,
    appointmentStatus,
    patient,
    medic,
    variant,
}) => {
    const formattedDate = new Date(appointmentDate).toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="appointment-card-compact">
            <div className="card-header">
                <span className={`status-badge ${getStatusClass(appointmentStatus)}`}>
                    {formatStatus(appointmentStatus)}
                </span>
                <span className="appointment-date">{formattedDate}</span>
            </div>

            <div className="card-body">
                {variant === 'patient' ? (
                    <>
                        <div className="info-row">
                            <span className="label">Medico:</span>
                            <span className="value">{medic.name}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Especialidad:</span>
                            <span className="value">{medic.specialty || 'Sin especialidad'}</span>
                        </div>
                    </>
                ) : (
                    <div className="info-row">
                        <span className="label">Paciente:</span>
                        <span className="value">{patient.name}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentCard;
