import { useState } from 'react';
import React from 'react';
import Register from '../../components/register';
import type UserType from "../../UserType";
import { medicService } from '../services/MedicService';
import { useSpecialties } from '../../../../core/hooks/useSpecialties';

const RegisterMedic: React.FC = () => {
  const [license, setLicense] = useState<string>('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  
  // Usar el custom hook para obtener especialidades
  const { 
    specialties: medicalSpecialties, 
    isLoading: isLoadingSpecialties,
    error: specialtiesError
  } = useSpecialties(() => medicService.getMedicalSpecialties());

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicense(e.target.value);
  };

  const handleSpecialtyToggle = (specialtyId: string) => {
    setSelectedSpecialties(prev => {
      if (prev.includes(specialtyId)) {
        // Si ya está seleccionada, la quitamos
        return prev.filter(id => id !== specialtyId);
      } else {
        // Si no está seleccionada, la agregamos
        return [...prev, specialtyId];
      }
    });
  };

  const handleRegisterMedic = async (baseData: UserType) => {
    if (!license) {
      throw new Error('Por favor ingresa el número de matrícula');
    }
    if (selectedSpecialties.length === 0) {
      throw new Error('Por favor selecciona al menos una especialidad médica');
    }

    const medicData: UserType & { license: string; medicalSpecialty: string[]; appointment: [] } = {
      ...baseData,
      license: license,
      medicalSpecialty: selectedSpecialties,
      appointment: []
    };

    console.log('Datos completos del médico a registrar:', medicData);
    await medicService.registerMedic(medicData);
  };

  return (
    <Register userType="Medic" onSubmit={handleRegisterMedic}>
      <div className="form-group">
        <label className="form-label">Número de Matrícula</label>
        <input
          type="text"
          name="license"
          className="form-input"
          placeholder="Ingresa tu número de matrícula"
          value={license}
          onChange={handleLicenseChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Especialidades Médicas</label>
        {specialtiesError && (
          <div style={{ padding: '12px', marginBottom: '8px', color: '#c62828', backgroundColor: '#ffebee', borderRadius: '0.5rem' }}>
            {specialtiesError}
          </div>
        )}
        {isLoadingSpecialties ? (
          <div style={{ padding: '12px', color: '#6b7280' }}>
            Cargando especialidades...
          </div>
        ) : (
          <div style={{
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #d1d5db',
            borderRadius: '0.75rem',
            padding: '12px',
            backgroundColor: '#f9fafb'
          }}>
            {medicalSpecialties.map((specialty) => (
              <label
                key={specialty.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  cursor: 'pointer',
                  borderRadius: '0.5rem',
                  transition: 'background-color 0.2s',
                  marginBottom: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <input
                  type="checkbox"
                  value={specialty.id}
                  checked={selectedSpecialties.includes(specialty.id)}
                  onChange={() => handleSpecialtyToggle(specialty.id)}
                  style={{
                    marginRight: '12px',
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ fontSize: '1rem', color: '#374151' }}>
                  {specialty.name}
                </span>
              </label>
            ))}
          </div>
        )}
        <small style={{ display: 'block', marginTop: '8px', color: '#6b7280', fontSize: '0.875rem' }}>
          Selecciona todas las especialidades que apliquen
        </small>
      </div>
    </Register>
  );
};

export default RegisterMedic;
