import { useState } from 'react';
import './login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Validator } from '../services/validator.ts';
import NavBar from '../../homepage/components/navBar';
import logo from '../../../assets/mediviapng.png';
import Alert from '../../../core/components/alert';
import {useAuth} from '../services/useAuth';

interface LoginFormData {
  input: string; 
  dni?: string;
  email?: string;
  password: string;
  role?: string;
}


const ClinicaLogin: React.FC = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const {login} = useAuth();
  const navigate = useNavigate();
  // Estado para manejar mensajes de error
  const [error, setError] = useState<string>('');
  
  // Opcional: Estado para mensajes de éxito
  const [success, setSuccess] = useState<string>('');

  const [formData, setFormData] = useState<LoginFormData>({
    input: '',
    dni: '',
    email: '',
    password: '',
    role: ''
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
    if (!formData.input || !formData.password) {
      setError('Por favor completa todos los campos'); // ← USO DE setError
      return;
    }
    // Validar si el input es email o DNI
    const isEmail = formData.input.includes('@');

    //Es valido el input?
    if (isEmail && !Validator.validateEmail(formData.input)) {
      setError('Por favor ingresa un email válido'); // ← USO DE setError
      return;
    }

    if (!isEmail && !Validator.validateDNI(formData.input)) {
        setError('Por favor ingresa un DNI válido'); // ← USO DE setError
        return;
    }

    //Asigno el input al campo correspondiente para mandar al backend
    if(isEmail) formData.email = formData.input;
    else formData.dni = formData.input;

    if (!Validator.validatePassword(formData.password)) {
      setError('La contraseña debe tener al menos 6 caracteres'); // ← USO DE setError
      return;
    }

    // Si todo es válido, procedo con el login
    setIsLoading(true);
    setError(''); 
    setSuccess('');
    try{
      //Mando al backend
      const response = await login(formData);
      
      // Verificar la respuesta directamente, no isAuthenticated
      if (response && response.success) {
        setSuccess('Inicio de sesión exitoso');
        setTimeout(() => {
          window.location.href = '/dashboard'; // Redirigir al dashboard
        }, 1000);
      } else {
        setError('Error en el inicio de sesión');
      }
    } catch(err: unknown){
      const errorMessage = err instanceof Error ? err.message : 'Error en el inicio de sesión';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally{
      setIsLoading(false); // Siempre desactiva el loading al final
    }
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };


  //Permitir login con Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <NavBar />
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo" />
        </div>

        {/* Login Form */}
        <div className="login-form-section">
          <h2 className="login-form-title">
            Inicio de Sesión
          </h2>

            {error && <Alert type="error" message={error} />}
            {success && <Alert type="success" message={success} />}

          <div className="login-form-inputs">
            {/* ID Input */}

            {/* DNI Input */}
            <div>
              <input
                type="text"
                name="input"
                placeholder="Ingrese su Email o DNI"
                value={formData.input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="login-form-input"
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
                className="login-form-input"
                disabled={isLoading}
                onKeyDown={handleKeyPress}
                autoComplete="current-password"
              />
            </div>

            {/* Action Buttons */}
            <div className="login-form-buttons">
              <button onClick={handleLogin} className="login-form-button" disabled={isLoading} 
              style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}>
                {isLoading? 'Iniciando...' : 'Iniciar Sesión'}
                
                {
                !isLoading && 
                (
                  <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )
                }
              </button>
              
              <button
                onClick={handleCreateAccount}
                className="login-form-button"
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
            © 2025 Medivia. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicaLogin
