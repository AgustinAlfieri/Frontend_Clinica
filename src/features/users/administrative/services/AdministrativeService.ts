import { apiClient } from '../../services/api';
import type UserType from "../../UserType";
import type AuthResponse from "../../services/authService";

export interface RegisterAdministrativeData extends UserType {
    appointment: [];
}


export const administrativeService = {
    async registerAdministrative(data: RegisterAdministrativeData): Promise<AuthResponse> {
        try {
            const response = await apiClient.post("auth/register", {
                id: data.id,
                dni: data.dni,
                name: data.name,
                email: data.email,
                password: data.password,
                telephone: data.telephone,
                role: "Administrative",
                appointment: data.appointment
            });
            if (response.success && response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;

        } catch (error: any) {
            throw new Error(error.message || 'Administrative registration failed');
        }
    },
}
