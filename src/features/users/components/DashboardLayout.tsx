import type { ReactNode } from 'react';
import NavBar from '../../homepage/components/navBar';
import Sidebar from './sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="dashboard">
      <NavBar />
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1> Hola, Bienvenido!</h1>
        </header>

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
