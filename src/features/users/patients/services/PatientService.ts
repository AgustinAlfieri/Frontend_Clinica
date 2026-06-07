import { apiClient } from '../../services/api';
import type UserType from '../../UserType';
import type AuthResponse from '../../services/authService';

export interface RegisterPatientData extends UserType {
  medicalInsurance: string;
  numberOfMember?: string;
}

interface RegisterPatientRequest extends Omit<RegisterPatientData, 'numberOfMember'> {
  insuranceNumber?: string;
}

export default interface MedicalInsurance {
  id: string;
  name: string;
}

export const patientService = {
  async registerPatient(data: RegisterPatientData): Promise<AuthResponse> {
    try {
      console.log('Registering patient with data:', data);
      const response = await apiClient.post<AuthResponse, RegisterPatientRequest>('auth/register', {
        id: data.id,
        dni: data.dni,
        name: data.name,
        email: data.email,
        password: data.password,
        telephone: data.telephone,
        role: 'Patient', // El role siempre será 'patient' al registrar un paciente
        medicalInsurance: data.medicalInsurance,
        insuranceNumber: data.numberOfMember
      });
      if (response.success && response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Patient registration failed');
    }
  },
  async getMedicalInsurances(): Promise<MedicalInsurance[]> {
    try {
      const response = await apiClient.get<{ data: MedicalInsurance[] }>('medicalInsurance/findAllForRegister');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Fetching medical insurances failed');
    }
  }
};
