import {apiClient} from '../../users/services/api';

interface Medic {
    //todos los datos del medico
    id: string;
    name: string;
    specialty:{
        id: string;
        name: string;
    }[];
    };

interface Specialty{
    id: string;
    name: string;
    medic:{
        id: string;
        name: string;
    }[];
}

interface AppointmentData {
    appointmentDate: string; // ISO string
    patientId: string;
    medicId: string;
    practice_id: string[];
    administrativeIds?: string[];
}

interface TimeSlot {
  datetime: string; // ISO string
  available: boolean;
}

interface AvailableSchedule {
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
}

export const AppointmentService = {
    //get medicos
    //get paciente
    //obras sociales
    
    async getSpecialties(): Promise<Specialty[]>{
        try{
            const response = await apiClient.get("medicalSpecialty/findAll");
            return response;
        }catch(error: any){
            throw new Error(error.message || 'Fetching specialties failed');
        }
    },
    async getSlotsByMedic(medicId: string): Promise<AvailableSchedule[]>{
        try{
            const response = await apiClient.get(`medic/schedule/${medicId}`);
            return response.data;
        }catch(error: any){
            throw new Error(error.message || 'Fetching slots failed');
        }
    }
    ,
    async createAppointment(data: AppointmentData){
        try{
            const response = await apiClient.post('appointment/create', data);
            if (response.success){
                return response;
            }
        }catch(error: any){
            throw new Error(error.message || 'Creating appointment failed');
        }
    }
    ,
    //Me traigo las medicos
    async getMedicsBySpecialty() : Promise<Medic[]> {
        const response = await apiClient.get('edics/specialty');
        return response.data;
    }

}