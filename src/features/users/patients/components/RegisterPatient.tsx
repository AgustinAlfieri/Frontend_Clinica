import { useState } from 'react';
import React from 'react';
import Register from '../../components/register';
import type UserType  from "../../UserType";
import {patientService} from '../services/PatientService'



const RegisterPatient: React.FC = () => {
  const [coverage, setCoverage] = useState<string>('');
  const [insuranceNumber, setInsuranceNumber] = useState<string>('');

  const handleCoverageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCoverage(value);
    if (value === 'particular') {
      setInsuranceNumber('');
    }
  };

  const handleInsuranceNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInsuranceNumber(e.target.value);
  };

  const handleRegisterPatient = async(baseData: UserType) => {
    if (!coverage){
      throw new Error('Por favor selecciona una cobertura');
    }
    if (coverage !== 'particular' && !insuranceNumber) {
      throw new Error('Por favor ingresa tu número de obra social');
    }
    const patientData: UserType & { medicalInsurance: string; numberOfMember?: string } = {
      ...baseData,
      medicalInsurance: coverage,
      numberOfMember: coverage !== 'particular' ? insuranceNumber : undefined
    };
    // Llamada al servicio para registrar el paciente
    console.log('Datos completos del paciente a registrar:', patientData);
    await patientService.registerPatient(patientData);
    

  }

  return (
    <Register userType="patient" onSubmit={handleRegisterPatient}>
      <div className="form-group">
        <label className="form-label">Cobertura</label>
        <select
          name="coverage"
          className="form-input"
          value={coverage}
          onChange={handleCoverageChange}
        >
          <option value="">Selecciona una cobertura</option>
          <option value="particular">Particular</option>
          <option value="osde">OSDE</option>
          <option value="swiss_medical">Swiss Medical</option>
          <option value="galeno">Galeno</option>
          <option value="medicus">Medicus</option>
          <option value="omint">OMINT</option>
          <option value="otra">Otra</option>
        </select>
      </div>

      {coverage && coverage !== 'particular' && (
        <div className="form-group">
          <label className="form-label">Número de Obra Social</label>
          <input
            type="text"
            name="insuranceNumber"
            className="form-input"
            placeholder="Ingresa tu número de obra social"
            value={insuranceNumber}
            onChange={handleInsuranceNumberChange}
          />
        </div>
      )}
    </Register>
  );
};

export default RegisterPatient;
