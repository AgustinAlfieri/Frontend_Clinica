import { useState } from 'react';
import './login.css';
import { authService } from '../services/authService';
import React from 'react';

interface LoginFormData {
  dni: string; // Opcional, dependiendo de si se necesita
  password: string;
  role: string; // Opcional, dependiendo de si se necesita
}

const ClinicaLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Estado para manejar mensajes de error
  // ← AQUÍ CREAS setError
  const [error, setError] = useState<string>('');
  
  // Opcional: Estado para mensajes de éxito
  const [success, setSuccess] = useState<string>('');

  const [formData, setFormData] = useState<LoginFormData>({
    dni: '',
    password: '',
    role: 'Administrative'
  });

// Cambié la firma de lo que puede recibir la función para que acepte otro tipo de enventos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(''); // Limpiar error al cambiar input
  };

  const handleLogin = async () => {
    if (!formData.dni || !formData.password) {
      setError('Por favor completa todos los campos'); // ← USO DE setError
      return;
    }

    if (formData.dni.length < 7) {
      setError('El DNI debe tener al menos 7 dígitos');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    setError(''); // Limpiar errores previos
    setSuccess(''); // Limpiar mensajes de éxito previos
    try{
      const response = await authService.login(formData); // FormData tiene que ser igual a login credentials
      if (response.success){
        setSuccess('Inicio de sesión exitoso');
        setTimeout(() => {
          window.location.href = '/dashboard'; // Redirigir al dashboard
        }, 1000);
      }else{
        setError(response.message || 'Error en el inicio de sesión');
      }
    }catch(err: any){
      setError(err.message || 'Error en el inicio de sesión');
      console.error('Login error:', err);
    }finally{
      setIsLoading(false); // Siempre desactiva el loading al final
    }
  };

  const handleCreateAccount = () => {
    console.log('Navigate to create account');
    // Aquí iría la navegación a crear cuenta
  };


  //Permitir login con Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
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

            {error && (
            <div style={{
              padding: '12px',
              marginBottom: '15px',
              backgroundColor: '#ffebee',
              color: '#c62828',
              borderRadius: '8px',
              fontSize: '14px',
              border: '1px solid #ef5350'
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              padding: '12px',
              marginBottom: '15px',
              backgroundColor: '#e8f5e9',
              color: '#2e7d32',
              borderRadius: '8px',
              fontSize: '14px',
              border: '1px solid #66bb6a'
            }}>
              {success}
            </div>
          )}

          <div className="form-inputs">
            {/* ID Input */}
            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-input"
                disabled={isLoading}
              >
                <option value="Administrative">Administrativo</option>
                <option value="Medic">Médico</option>
                <option value="Patient">Paciente</option>
              </select>
            </div>

            {/* DNI Input */}
            <div>
              <input
                type="text"
                name="dni"
                placeholder="Ingrese su DNI"
                value={formData.dni}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="form-input"
                disabled={isLoading}
                autoComplete="username"
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
                disabled={isLoading}
                onKeyDown={handleKeyPress}
                autoComplete="current-password"
              />
            </div>

            {/* Action Buttons */}
            <div className="form-buttons">
              <button
                onClick={handleLogin}
                className="form-button"
                disabled={isLoading} // Deshabilitar mientras carga
                style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
              >
                {isLoading? 'Iniciando...' : 'Iniciar Sesión'}
                {!isLoading && (
                <svg 
                  className="button-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              </button>
              
              <button
                onClick={handleCreateAccount}
                className="form-button"
                disabled={isLoading}
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

export default ClinicaLogin
