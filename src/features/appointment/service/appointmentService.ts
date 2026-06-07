import { apiClient } from '../../users/services/api';
import type {
  ApiResponse,
  AppointmentFilters,
  AppointmentFromAPI,
  AvailableSchedule,
  CreatedAppointment,
  CreateAppointmentRequest,
  CreateAppointmentStatusRequest,
  Medic,
  Specialty,
  TypeAppointmentStatus,
} from '../types/appointment.types';

export const AppointmentService = {
  async getSpecialties(): Promise<Specialty[]> {
    try {
      const response = await apiClient.get<ApiResponse<Specialty[]> | Specialty[]>('medicalSpecialty/findAll');
      return Array.isArray(response) ? response : response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Fetching specialties failed');
    }
  },

  async getSlotsByMedic(medicId: string): Promise<AvailableSchedule[]> {
    try {
      const response = await apiClient.get<ApiResponse<AvailableSchedule[]>>(`medic/schedule/${medicId}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Fetching slots failed');
    }
  },

  async createAppointment(data: CreateAppointmentRequest): Promise<ApiResponse<CreatedAppointment>> {
    try {
      const response = await apiClient.post<ApiResponse<CreatedAppointment>, CreateAppointmentRequest>(
        'appointment/create',
        data
      );

      if (!response.success) {
        throw new Error(response.message || 'Creating appointment failed');
      }

      return response;
    } catch (error) {
      throw new Error((error as Error).message || 'Creating appointment failed');
    }
  },

  async getMedicsBySpecialty(): Promise<Medic[]> {
    const response = await apiClient.get<ApiResponse<Medic[]>>('medics/specialty');
    return response.data;
  },

  async getAppointments(): Promise<AppointmentFromAPI[]> {
    try {
      const response = await apiClient.get<ApiResponse<AppointmentFromAPI[]>>('appointment/findAll');
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Fetching appointments failed');
    }
  },

  async getAppointmentsByDni(id: string): Promise<AppointmentFromAPI[]> {
    try {
      const response = await apiClient.get<ApiResponse<AppointmentFromAPI[]>>(`patient/findOne/${id}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Fetching appointments by DNI failed');
    }
  },

  async findAppointmentsByFilters(filters: AppointmentFilters): Promise<ApiResponse<AppointmentFromAPI[]>> {
    try {
      const queryParts: string[] = [];

      if (filters.dni) {
        queryParts.push(`patientDni=${encodeURIComponent(filters.dni)}`);
      }

      if (filters.medicDni) {
        queryParts.push(`medicDni=${encodeURIComponent(filters.medicDni)}`);
      }

      if (filters.beforeDate) {
        const beforeDateStr = filters.beforeDate.toISOString().slice(0, 16);
        queryParts.push(`beforeDate=${encodeURIComponent(beforeDateStr)}`);
      }

      if (filters.afterDate) {
        const afterDateStr = filters.afterDate.toISOString().slice(0, 16);
        queryParts.push(`afterDate=${encodeURIComponent(afterDateStr)}`);
      }

      if (filters.status) {
        queryParts.push(`typeAppointmentStatus=${encodeURIComponent(filters.status)}`);
      }

      const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
      const endpoint = `appointment/findAppointmentByFilter${queryString}`;

      return apiClient.get<ApiResponse<AppointmentFromAPI[]>>(endpoint);
    } catch (error) {
      throw new Error((error as Error).message || 'Fetching appointments by filters failed');
    }
  },

  async findTypeAppointments(): Promise<TypeAppointmentStatus[]> {
    try {
      const response = await apiClient.get<ApiResponse<TypeAppointmentStatus[]>>('typeAppointmentStatus/findAll');
      return response.data;
    } catch {
      throw new Error('Fetching type appointments failed');
    }
  },

  async createAppointmentStatus(data: CreateAppointmentStatusRequest): Promise<unknown> {
    try {
      const response = await apiClient.post<ApiResponse<unknown>, CreateAppointmentStatusRequest>(
        'appointmentStatus/create',
        data
      );
      return response.data;
    } catch {
      throw new Error('Creating appointment status failed');
    }
  },
};
