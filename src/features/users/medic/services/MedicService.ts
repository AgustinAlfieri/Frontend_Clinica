import { apiClient } from '../../services/api';
import type UserType from "../../UserType";
import type AuthResponse from "../../services/authService";

export interface RegisterMedicData extends UserType {
    license: string;
    medicalSpecialty: string[];
    appointment: [];
}

export default interface MedicalSpecialty {
    id: string;
    name: string;
}

export const medicService = {
    async registerMedic(data: RegisterMedicData): Promise<AuthResponse> {
        try {
            console.log('Registering medic with data:', data);
            const response = await apiClient.post("auth/register", {
                id: data.id,
                dni: data.dni,
                name: data.name,
                email: data.email,
                password: data.password,
                telephone: data.telephone,
                role: "Medic",
                license: data.license,
                medicalSpecialty: data.medicalSpecialty,
                appointment: data.appointment
            });
            if (response.success && response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;

        } catch (error: any) {
            throw new Error(error.message || 'Medic registration failed');
        }
    },
    async getMedicalSpecialties(): Promise<MedicalSpecialty[]> {
        try {
            const response = await apiClient.get('medicalSpecialty/findAll');
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Fetching medical specialties failed');
        }
    }
}
