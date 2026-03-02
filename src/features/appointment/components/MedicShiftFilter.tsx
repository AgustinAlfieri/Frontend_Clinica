import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../homepage/components/navBar';
import Sidebar from '../../users/components/sidebar';
import AppointmentCard from './AppointmentCard';
import { AppointmentService } from '../service/appointmentService';
import './MedicShiftFilter.css';

interface AppointmentCardProps {
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
  practices: {
    name: string;
    description?: string;
  }[];
}

interface AppointmentStatus {
  typeAppointmentStatus: {
    name: string;
  };
}

interface AppointmentFromAPI {
  id: string;
  appointmentDate: string;
  appointmentsStatus: AppointmentStatus[];
  patient: {
    name: string;
    dni: string;
  };
  medic: {
    name: string;
    dni: string;
  };
}

const MedicShiftFilter: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Filter state
  const [patientDni, setPatientDni] = useState<string>('');
  // default fecha desde = ahora, hasta = fin del día
  const todayStart = new Date();
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  const isoLocal = (d: Date) => {
    const tzoffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzoffset).toISOString().slice(0, 16);
  };
  const [dateFrom, setDateFrom] = useState<string>(isoLocal(todayStart));
  const [dateTo, setDateTo] = useState<string>(isoLocal(todayEnd));
  const [status, setStatus] = useState<string>('en espera');

  // Results and UI state
  const [appointments, setAppointments] = useState<AppointmentCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is medic
  useEffect(() => {
    if (user.role !== 'Medic') {
      navigate('/dashboard');
    }
  }, [user.role, navigate]);

  // common API call for current filter state
  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!user.dni) {
        setError('Error: No se encontró el DNI del médico. Por favor recarga la página.');
        setAppointments([]);
        setLoading(false);
        return;
      }

      const filters: any = { medicDni: user.dni };
      if (patientDni.trim()) filters.dni = patientDni;
      if (dateFrom) filters.afterDate = new Date(dateFrom);
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        filters.beforeDate = endDate;
      }
      if (status) filters.status = status;

      const response = await AppointmentService.findAppointmentsByFilters(filters);
      if (!response || !response.data || !Array.isArray(response.data)) {
        setAppointments([]);
        return;
      }

      // Determine which appointments to keep on the client side
      // if the user selected a specific status we rely on the backend result,
      // otherwise default to "sala de espera" statuses.
      // Keep whatever the backend returned; status filtering is handled server-side
      const waitingRoomAppointments: AppointmentFromAPI[] = response.data;

      // Transform data
      const transformedAppointments: AppointmentCardProps[] = waitingRoomAppointments.map(
        (appointment: AppointmentFromAPI) => ({
          appointmentId: appointment.id,
          appointmentDate: appointment.appointmentDate,
          appointmentStatus: appointment.appointmentsStatus?.[0]?.typeAppointmentStatus?.name || 'Sin estado',
          patient: {
            name: appointment.patient.name,
            dni: appointment.patient.dni
          },
          medic: {
            name: appointment.medic.name,
            specialty: ''
          },
          practices: []
        })
      );

      setAppointments(transformedAppointments);
    } catch (err) {
      setError('Error al filtrar los turnos. Por favor, intenta nuevamente.');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAppointments();
  };

  const handleReset = () => {
    setPatientDni('');
    setDateFrom(isoLocal(todayStart));
    setDateTo(isoLocal(todayEnd));
    setStatus('en espera');
    setAppointments([]);
    setError(null);
  };

  // execute query when component mounts with defaults
  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="dashboard">
      <NavBar />
      <Sidebar />

      <main className="dashboard-main shift-filter-main">
        <header className="dashboard-header">
          <h1>Filtrar Turnos</h1>
          <p className="subtitle">Registro completo de turnos de tus pacientes</p>
        </header>

        <section className="filter-section">
          <div className="filter-container">
            <h2>Filtros de Búsqueda</h2>
            <form onSubmit={handleFilter} className="filter-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="patientDni">DNI del Paciente</label>
                  <input
                    type="text"
                    id="patientDni"
                    value={patientDni}
                    onChange={(e) => setPatientDni(e.target.value)}
                    placeholder="Ej: 12345678"
                    className="filter-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dateFrom">Fecha Desde</label>
                  <input
                    type="datetime-local"
                    id="dateFrom"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="filter-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dateTo">Fecha Hasta</label>
                  <input
                    type="datetime-local"
                    id="dateTo"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="filter-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Estado</label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="filter-input"
                  >
                    <option value="">Todos los estados</option>
                    <option value="Solicitado">Solicitado</option>
                    <option value="En_sala_de_espera">En sala de espera</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Completado">Completado</option>
                  </select>
                </div>


              </div>

              <div className="filter-buttons">
                <button type="submit" className="btn btn-primary">
                  Buscar Turnos
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleReset}>
                  Limpiar Filtros
                </button>
                <button type="button" className="btn btn-outline" onClick={handleGoBack}>
                  Volver al Dashboard
                </button>
              </div>
            </form>
          </div>
        </section>

        {error && (
          <div className="error-banner">
            <p>{error}</p>
          </div>
        )}

        {appointments.length > 0 && (
          <section className="results-section">
            <h2>Resultados ({appointments.length} turnos)</h2>
            <div className="appointments-grid">
              {appointments.map((appointment) => (
                <div key={appointment.appointmentId} className="card-wrapper">
                  <AppointmentCard
                    appointmentId={appointment.appointmentId}
                    appointmentDate={appointment.appointmentDate}
                    appointmentStatus={appointment.appointmentStatus}
                    patient={appointment.patient}
                    medic={appointment.medic}
                    practices={appointment.practices}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {!loading && appointments.length === 0 && !error && (
          <section className="empty-state">
            <p>No se encontraron turnos que coincidan con los filtros.</p>
            <p className="hint">Completa los filtros y haz clic en "Buscar Turnos"</p>
          </section>
        )}

        {loading && (
          <section className="loading-state">
            <p>Cargando turnos...</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default MedicShiftFilter;
