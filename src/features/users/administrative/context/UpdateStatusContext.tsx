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
    setMedicModeAndStatus: (isMedic: boolean, currentStatus: string) => void;
}

const UpdateStatusContext = createContext<UpdateStatusContextValue | undefined>(undefined);

export const UpdateStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [typeAppointments, setTypeAppointments] = useState<TypeAppointment[]>([]);
    const [loadingTypeAppointments, setLoadingTypeAppointments] = useState<boolean>(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
    const [isMedicMode, setIsMedicMode] = useState<boolean>(false);
    const [currentAppointmentStatus, setCurrentAppointmentStatus] = useState<string>('');

    // Filtrar estados disponibles según rol y estado actual
    const getFilteredTypeAppointments = (types: TypeAppointment[]): TypeAppointment[] => {
        // Si es médico y el turno está en "En_sala_de_espera", solo permitir Completado (3) y Cancelado (4)
        if (isMedicMode && currentAppointmentStatus === 'En_sala_de_espera') {
            return types.filter(type => type.id === '3' || type.id === '4');
        }
        // Para administrativos, permitir todos
        return types;
    };

    // Cargar typeAppointments solo cuando se selecciona un appointment
    useEffect(() => {
        if (selectedAppointmentId) {
            const fetchTypeAppointments = async () => {
                setLoadingTypeAppointments(true);
                try {
                    const response = await AppointmentService.findTypeAppointments();
                    const filtered = getFilteredTypeAppointments(response);
                    setTypeAppointments(filtered);
                } catch (error) {
                } finally {
                    setLoadingTypeAppointments(false);
                }
            };

            fetchTypeAppointments();
        }
    }, [selectedAppointmentId, isMedicMode, currentAppointmentStatus]);

    const value: UpdateStatusContextValue = {
        typeAppointments,
        loadingTypeAppointments,
        selectedAppointmentId,
        setSelectedAppointmentId,
        setMedicModeAndStatus: (isMedic: boolean, currentStatus: string) => {
            setIsMedicMode(isMedic);
            setCurrentAppointmentStatus(currentStatus);
        }
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
