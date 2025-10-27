import React from 'react';
import Register from '../../components/register';
import type UserType from "../../UserType";
import { administrativeService } from '../services/AdministrativeService';

const RegisterAdministrative: React.FC = () => {
  const handleRegisterAdministrative = async (baseData: UserType) => {
    const administrativeData: UserType & { appointment: [] } = {
      ...baseData,
      appointment: []
    };

    await administrativeService.registerAdministrative(administrativeData);
  };

  return (
    <Register userType="Administrative" onSubmit={handleRegisterAdministrative}>
      {/* No hay campos adicionales para administrativos, solo se agrega el appointment vacío */}
    </Register>
  );
};

export default RegisterAdministrative;
