import React, { useEffect, useState } from 'react';

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
    return(
        <div className="appointment-card">
            <h2>Appointment on {appointment.appointmentDate}</h2>
            <p>Status: {appointment.appointmentStatus}</p>
            <div className="patient-info">
                <h3>Patient Information</h3>
                <p>Name: {appointment.patient.name}</p>
                <p>DNI: {appointment.patient.dni}</p>
            </div>
            <div className="medic-info">
                <h3>Medic Information</h3>
                <p>Name: {appointment.medic.name}</p>
                <p>Specialty: {appointment.medic.specialty}</p>
            </div>  
            <div className="practices-info">
                <h3>Practices</h3>

            </div>
        </div>
    )
}

export default AppointmentCard;