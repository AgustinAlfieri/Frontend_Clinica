import { useState, useEffect } from 'react';
import React from 'react';
import Register from '../../components/register';
import type UserType  from "../../UserType";
import {patientService} from '../services/PatientService'
import type MedicalInsurance from '../services/PatientService';


const RegisterPatient: React.FC = () => {
  const [coverage, setCoverage] = useState<string>('');
  const [insuranceNumber, setInsuranceNumber] = useState<string>('');
  const [medicalInsurances, setMedicalInsurances] = useState<MedicalInsurance[]>([]);
  const [isLoadingInsurances, setIsLoadingInsurances] = useState<boolean>(false);

  useEffect(() => {
    const fetchMedicalInsurances = async () => {
      setIsLoadingInsurances(true);
      try {
        const insurances = await patientService.getMedicalInsurances();
        setMedicalInsurances(insurances);
      } catch (error) {
        console.error('Error al cargar las coberturas médicas:', error);
      } finally {
        setIsLoadingInsurances(false);
      }
    };

    fetchMedicalInsurances();
  }, []);

  const handleCoverageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCoverage(value);

    const selectedInsurance = medicalInsurances.find(ins => ins.id === value);
    const insuranceName = selectedInsurance?.name || '';
    
    if (insuranceName.toLowerCase().includes('particular')) {
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
    
    if (!insuranceNumber) {
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
    <Register userType="Patient" onSubmit={handleRegisterPatient}>
      <div className="form-group">
        <label className="form-label">Cobertura</label>
        <select
          name="coverage"
          className="form-input"
          value={coverage}
          onChange={handleCoverageChange}
          disabled={isLoadingInsurances}
        >
          <option value="" className="form-input-coverage">
            {isLoadingInsurances ? 'Cargando coberturas...' : 'Selecciona una cobertura'}
          </option>
          {medicalInsurances.map((insurance) => (
            <option key={insurance.id} value={insurance.id} className="form-input-coverage">
              {insurance.name}
            </option>
          ))}
        </select>
      </div>

      {coverage && (() => {
        const selectedInsurance = medicalInsurances.find(ins => ins.id === coverage);
        const insuranceName = selectedInsurance?.name || '';
        return !insuranceName.toLowerCase().includes('particular');
      })() && (
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
