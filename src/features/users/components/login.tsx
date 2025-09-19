import React, { useState } from 'react';
import './login.css';

interface LoginFormData {
  id: string;
  password: string;
}

const ClinicaLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    id: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = () => {
    console.log('Login attempt:', formData);
    // Aquí iría la lógica de autenticación
  };

  const handleCreateAccount = () => {
    console.log('Navigate to create account');
    // Aquí iría la navegación a crear cuenta
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h1 className="login-title">Portal Clinica Sana</h1>
          <p className="login-subtitle">Bienvenido a la página de Portal Clinica Sana</p>
          <div className="login-divider"></div>
        </div>

        {/* Login Form */}
        <div className="login-form-section">
          <h2 className="form-title">
            Inicio de Sesión
          </h2>

          <div className="form-inputs">
            {/* ID Input */}
            <div>
              <input
                type="text"
                name="id"
                placeholder="Ingrese su Id"
                value={formData.id}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Action Buttons */}
            <div className="form-buttons">
              <button
                onClick={handleLogin}
                className="form-button"
              >
                Iniciar Sesion
                <svg 
                  className="button-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button
                onClick={handleCreateAccount}
                className="form-button"
              >
                Crear Cuenta
                <svg 
                  className="button-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p className="footer-copyright">
            © 2025 ClinicaSana. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicaLogin;
