export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  statusCode?: number;
}

export interface Medic {
  dni?: string;
  email?: string;
  id: string;
  license?: string;
  name: string;
  password?: string;
  role?: string;
  telephone?: string;
  medicalSpecialty?: MedicalSpecialty[];
}

export interface MedicalSpecialty {
  id: string;
  name: string;
}

export interface Specialty {
  id: string;
  name: string;
  medic?: Pick<Medic, 'id' | 'name'>[];
  medics?: Medic[];
}

export interface AppointmentFilters {
  dni?: string;
  medicDni?: string;
  beforeDate?: Date;
  afterDate?: Date;
  status?: string;
}

export interface CreateAppointmentRequest {
  date: string;
  appointmentStatus?: string;
  patient: string;
  medic: string;
  administratives: string[];
  practices: string[];
}

export interface CreatedAppointment {
  id: string;
}

export interface TimeSlot {
  datetime: string;
  available: boolean;
}

export interface AvailableSchedule {
  date: string;
  slots: TimeSlot[];
}

export interface CreateAppointmentStatusRequest {
  appointment: string;
  typeAppointmentStatus: string;
  observations: string;
  date: string;
}

export interface TypeAppointmentStatus {
  id: string;
  name: string;
}

export interface AppointmentStatus {
  typeAppointmentStatus: TypeAppointmentStatus;
  observation?: string;
}

export interface AppointmentFromAPI {
  id: string;
  appointmentDate: string;
  appointmentsStatus: AppointmentStatus[];
  patient: {
    name: string;
    dni: string;
  };
  medic: {
    name: string;
    dni?: string;
    medicalSpecialty: MedicalSpecialty[];
  };
}

export interface Practice {
  name: string;
  description?: string;
}

export interface AppointmentCardData {
  appointmentId: string;
  appointmentDate: string;
  appointmentStatus: string;
  patient: {
    name: string;
    dni: string;
  };
  medic: {
    name: string;
    specialty: string;
  };
  practices: Practice[];
}
