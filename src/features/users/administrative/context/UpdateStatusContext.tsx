import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppointmentService } from '../../../appointment/service/appointmentService';

interface TypeAppointment {
    id: string;
    name: string;
}

interface UpdateStatusContextValue {
    typeAppointments: TypeAppointment[];
    loadingTypeAppointments: boolean;
    selectedAppointmentId: string | null;
    setSelectedAppointmentId: (id: string | null) => void;
}

const UpdateStatusContext = createContext<UpdateStatusContextValue | undefined>(undefined);

export const UpdateStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [typeAppointments, setTypeAppointments] = useState<TypeAppointment[]>([]);
    const [loadingTypeAppointments, setLoadingTypeAppointments] = useState<boolean>(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

    // Cargar typeAppointments solo cuando se selecciona un appointment
    useEffect(() => {
        if (selectedAppointmentId) {
            const fetchTypeAppointments = async () => {
                setLoadingTypeAppointments(true);
                try {
                    const response = await AppointmentService.findTypeAppointments();
                    setTypeAppointments(response);
                    console.log('Type Appointments loaded:', response);
                } catch (error) {
                    console.error('Error fetching type appointments:', error);
                } finally {
                    setLoadingTypeAppointments(false);
                }
            };

            fetchTypeAppointments();
        }
    }, [selectedAppointmentId]);

    const value: UpdateStatusContextValue = {
        typeAppointments,
        loadingTypeAppointments,
        selectedAppointmentId,
        setSelectedAppointmentId
    };

    return (
        <UpdateStatusContext.Provider value={value}>
            {children}
        </UpdateStatusContext.Provider>
    );
};

export const useUpdateStatus = () => {
    const context = useContext(UpdateStatusContext);
    // Permitir uso fuera del provider retornando undefined
    return context;
};
