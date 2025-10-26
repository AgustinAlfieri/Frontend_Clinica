import { apiClient } from '../../users/services/api';

interface Medic {
  //todos los datos del medico
  id: string;
  name: string;
  specialty: {
    id: string;
    name: string;
  }[];
}

interface Specialty {
  id: string;
  name: string;
  medic: {
    id: string;
    name: string;
  }[];
}


interface Filters {
    dni?: string;
    beforeDate?: Date;
    afterDate?: Date;
    status?: string;
}


interface AppointmentData {
  date: string; // ISO string
  appointmentStatus?: string;
  patientId: string; // patient id - ← Con "Id" al final
  medicId: string; // medic id - ← Con "Id" al final
  administratives: string[]; // array of administrative ids
  practices: string[]; // array of practice ids
}

interface Patient {
  id: string;
  name: string;
  dni: string;
  Appointments: AppointmentData[];
}

interface TimeSlot {
  datetime: string; // ISO string
  available: boolean;
}

interface AvailableSchedule {
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
}

interface AppointmentStatus {
  appointment: string;
  typeAppointmentStatus: string;
  date: string;
}

export const AppointmentService = {
  //get medicos
  //get paciente
  //obras sociales

  async getSpecialties(): Promise<Specialty[]> {
    try {
      const response = await apiClient.get('medicalSpecialty/findAll');
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Fetching specialties failed');
    }
  },
  async getSlotsByMedic(medicId: string): Promise<AvailableSchedule[]> {
    try {
      const response = await apiClient.get(`medic/schedule/${medicId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Fetching slots failed');
    }
  },
  async createAppointment(data: AppointmentData) {
    try {
      const response = await apiClient.post('appointment/create', data);
      if (response.success) {
        return response;
      }
    } catch (error: any) {
      throw new Error(error.message || 'Creating appointment failed');
    }
  },
  //Me traigo las medicos
  async getMedicsBySpecialty(): Promise<Medic[]> {
    const response = await apiClient.get('medics/specialty');
    return response.data;
  },

  async getAppointments() {
    try{
      console.log('Fetching all appointments from AppointmentService');
      const response = await apiClient.get('appointment/findAll')
      return response.data;
    }catch (error: any) {
      throw new Error(error.message || 'Fetching appointments failed');
    }
  },

  async getAppointmentsByDni(id: string) {
    try{
      console.log(`Fetching appointments for DNI: ${id} from AppointmentService`);
      const response = await apiClient.get(`patient/findOne/${id}`);
      return response.data;
    }catch (error: any) {
      throw new Error(error.message || 'Fetching appointments by DNI failed');
    }
  },

  async findAppointmentsByFilters(filters: Filters) {
    try {
      // Construir query params manualmente
      const queryParts: string[] = [];
      
      if (filters.dni) {
        queryParts.push(`patientDni=${encodeURIComponent(filters.dni)}`);
      }
      
      if (filters.beforeDate) {
        // Formato ISO: 2026-01-16T09:30
        const beforeDateStr = filters.beforeDate.toISOString().slice(0, 16);
        queryParts.push(`beforeDate=${encodeURIComponent(beforeDateStr)}`);
      }
      
      if (filters.afterDate) {
        // Formato ISO: 2026-01-12T09:30
        const afterDateStr = filters.afterDate.toISOString().slice(0, 16);
        queryParts.push(`afterDate=${encodeURIComponent(afterDateStr)}`);
      }
      
      if (filters.status) {
        queryParts.push(`typeAppointmentStatus=${encodeURIComponent(filters.status)}`);
      }

      // Construir URL completa con query params
      const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
      const endpoint = `appointment/findAppointmentByFilter${queryString}`;
      
      console.log('Calling endpoint:', endpoint);
      
      const response = await apiClient.get(endpoint);
      
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Fetching appointments by filters failed');
    }
  },

  async findTypeAppointments() {
    try{
      const response = await apiClient.get('typeAppointmentStatus/findAll');
      console.log('Fetched type appointments:', response.data);
      return response.data;
    }catch{
      throw new Error('Fetching type appointments failed');
    }
  },

  async createAppointmentStatus(data: AppointmentStatus) {
    try{
      const response = await apiClient.post('appointmentStatus/create' , data);
      return response.data;
    }catch{
      throw new Error('Creating appointment status failed');
    }
  }
  
};
