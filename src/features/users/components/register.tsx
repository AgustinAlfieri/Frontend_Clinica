import { useState } from 'react';
import './register.css';
import React from 'react';
import { Validator } from '../services/validator.ts';
import type UserType from '../UserType';
import NavBar from '../../homepage/components/navBar';
import Alert from '../../../core/components/alert';

// Interface para los datos básicos del usuario
export interface BaseUserData {
  dni: string;
  name: string;
  email: string;
  password: string;
  telephone: string;
  role: string; // Se asigna automáticamente según userType
}

// Interface para las props del componente Register
interface RegisterProps {
  userType: 'Patient' | 'Administrative' | 'Medic'; // Ahora es obligatorio y tipado
  children?: React.ReactNode; // Solo para campos adicionales específicos
  onSubmit: (data: UserType) => Promise<void>; // Callback para manejar el submit de cada register
}

export const validateBaseUserData = (data: UserType): string | null => {
  if (!data.dni || !data.name || !data.email || !data.password || !data.telephone) {
    return 'Por favor completa todos los campos';
  }

  if (!Validator.validateDNI(data.dni)) {
    return 'Por favor ingresa un DNI válido';
  }

  if (!Validator.validateEmail(data.email)) {
    return 'Por favor ingresa un email válido';
  }

  if (!Validator.validatePassword(data.password)) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }

  return null; // Sin errores
};

const Register: React.FC<RegisterProps> = ({ userType, children,onSubmit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const [formData, setFormData] = useState<UserType>({
    id: '',
    dni: '',
    name: '',
    email: '',
    password: '',
    telephone: '',
    role: userType // Asignación automática del role según userType
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleRegister = async () => {
    const validationError = validateBaseUserData(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // TODO: Implementar servicio de registro
      console.log('Datos a registrar:', formData);
      await onSubmit(formData);
      setSuccess('Registro exitoso');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error en el registro';
      setError(errorMessage);
      console.error('Register error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  const getTitle = () => {
    switch (userType) {
      case 'Patient':
        return 'Registro de Paciente';
      case 'Administrative':
        return 'Registro de Administrativo';
      case 'Medic':
        return 'Registro de Médico';
      default:
        return 'Registro de Usuario';
    }
  };

  return (
    <div className="register-container">
      <NavBar />
      <div className="register-card">
        <div className="register-form-section">
          <h2 className="form-title">{getTitle()}</h2>

          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}

          <div className="form-inputs-grid">
            <div className="form-group">
              <label className="form-label">DNI</label>
              <input
                type="text"
                name="dni"
                className="form-input"
                placeholder="Ingresa tu DNI"
                value={formData.dni}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nombre Completo</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Ingresa tu nombre completo"
                value={formData.name}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                name="telephone"
                className="form-input"
                placeholder="Ingresa tu teléfono"
                value={formData.telephone}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
              />
            </div>

            {children}
          </div>

          <button
            className="form-button"
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrar'}
          </button>

          <div className="form-footer">
            <p className="footer-text">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="footer-link">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
