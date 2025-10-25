import React from 'react';
import './AppointmentCard.css';

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
    appointmentDate: string;
    appointmentStatus: string;
    patient: Patient;
    medic: Medic;
    practices: Practice[];
}

const AppointmentCard: React.FC<AppointmentCardProps> = (appointment: AppointmentCardProps) => {
    const [selected, setSelected] = React.useState<boolean>(false);
    const formattedDate = new Date(appointment.appointmentDate).toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleSelect = () => {
        setSelected(!selected);
        console.log(`Appointment on ${appointment.appointmentDate} selected: ${!selected}`);
    }

    console.log('Rendering AppointmentCard with props:', appointment);


    return(
        <div className="appointment-card-compact">
            <div className="card-header">
                <span className={'status-badge status-'}>
                    {appointment.appointmentStatus}
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
                    <span className="label">Especialidad:</span>
                    <span className="value">{appointment.medic.specialty}</span>
                </div>
                <div className="info-row">
                    <span className="label">Médico:</span>
                    <span className="value">{appointment.medic.name}</span>
                </div>
                <div className="info-row">
                    <span className="label">Práctica:</span>
                    <span className="value">
                        {appointment.practices.length > 0 
                            ? appointment.practices.map(p => p.name).join(', ')
                            : 'No especificada'
                        }
                    </span>
                </div>
                <div>
                    <button className="details-button" onClick={handleSelect}>
                        {selected?'seleccionado':'seleccionar'}
                    </button>

                    {selected && <input placeholder = 'Ingrese el estado'/>}
                </div>
                {selected &&
                    <div>
                        <button>Enviar</button>
                    </div>
                    }
            </div>
        </div>
    )
}

export default AppointmentCard;