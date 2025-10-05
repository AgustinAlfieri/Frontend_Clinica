import {apiClient} from '../../services/api';
import type UserType  from "../../UserType";
import type AuthResponse  from "../../services/authService";



export interface RegisterPatientData extends UserType {
    medicalInsurance: string;
    numberOfMember?: string;
}

export  const patientService = {
    async registerPatient(data: RegisterPatientData): Promise<AuthResponse> {
        try{
            console.log('Registering patient with data:', data);
            const response = await apiClient.post('auth/register',{
                id: data.id,
                dni: data.dni,
                nombre: data.name,
                email: data.email,
                password: data.password,
                telephone: data.telephone,
                role: 'Patient', // El role siempre será 'patient' al registrar un paciente
                medicalInsurance: data.medicalInsurance,
                numberOfMember: data.numberOfMember
            });
            return response;

            }catch(error: any){
            throw new Error(error.message || 'Patient registration failed');
        }
    }
}