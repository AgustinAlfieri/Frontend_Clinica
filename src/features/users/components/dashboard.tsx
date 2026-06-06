import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import PatientDashboard from './PatientDashboard';
import MedicDashboard from './MedicDashboard';
import AdministrativeDashboard from './AdministrativeDashboard';
import { useAuth } from '../services/useAuth';
import { USER_ROLES } from '../constants/roles';
import './dashboard.css';
import './sidebar.css';
import './card.css';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboardByRole = () => {
    switch (user?.role) {
      case USER_ROLES.PATIENT:
        return <PatientDashboard />;
      case USER_ROLES.MEDIC:
        return <MedicDashboard />;
      case USER_ROLES.ADMINISTRATIVE:
        return <AdministrativeDashboard />;
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboardByRole()}
    </DashboardLayout>
  );
};

export default Dashboard;
