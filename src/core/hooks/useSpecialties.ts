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
  medics?: Medic[]; // Médicos que ejercen esta especialidad
}

interface ApiResponse {
  success: boolean;
  data: Specialty[];
  message: string;
  statusCode: number;
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
export const useSpecialties = (fetchFunction: () => Promise<Specialty[] | ApiResponse>): UseSpecialtiesReturn => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSpecialties = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchFunction();

      // Verificar si la respuesta tiene la estructura de ApiResponse
      if (response && typeof response === 'object' && 'data' in response) {
        const apiResponse = response as ApiResponse;
        if (apiResponse.success && Array.isArray(apiResponse.data)) {
          setSpecialties(apiResponse.data);
        } else {
          throw new Error(apiResponse.message || 'Error al cargar especialidades');
        }
      } else if (Array.isArray(response)) {
        // Si la respuesta es directamente un array
        setSpecialties(response);
      } else {
        throw new Error('Formato de respuesta inválido');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar especialidades';
      setError(errorMessage);
      setSpecialties([]); // Asegurar que sea un array vacío en caso de error
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
