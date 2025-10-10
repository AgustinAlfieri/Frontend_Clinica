import { useState, useEffect } from 'react';

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

export interface Specialty {
    id: string;
    name: string;
    medicalProfessionals?: Medic[]; // Médicos que ejercen esta especialidad
}

interface UseSpecialtiesReturn {
    specialties: Specialty[];
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Custom hook para obtener las especialidades médicas
 * Reutilizable en cualquier componente que necesite la lista de especialidades
 */
export const useSpecialties = (fetchFunction: () => Promise<Specialty[]>): UseSpecialtiesReturn => {
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSpecialties = async () => {
        console.log('Fetching specialties...');
        setIsLoading(true);
        setError(null);
        
        try {
            const specialtiesData = await fetchFunction();
            console.log('Specialties recibidas:', specialtiesData);
            setSpecialties(specialtiesData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al cargar especialidades';
            console.error('Error fetching specialties:', err);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSpecialties();
    }, []);

    return {
        specialties,
        isLoading,
        error,
        refetch: fetchSpecialties
    };
};
