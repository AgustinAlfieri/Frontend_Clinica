export default interface UserType {
    id: string;
    name: string;
    dni: string;
    email: string;
    password: string;
    telephone?: string;
    role: string; // 'patient', 'medic', 'admin'
}