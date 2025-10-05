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


    

    
    
    //Me traigo las medicos
    async getMedicsBySpecialty() : Promise<Medic[]> {
        const response = await apiClient.get('edics/specialty');
        return response.data;
    }

}