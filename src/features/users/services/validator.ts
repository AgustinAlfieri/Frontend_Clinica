export class Validator {
  //Para ver si el input es email o DNI
  static validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
  };

  // Quiero ver si es un DNI valido
  static validateDNI = (dni: string): boolean => {
    const dniRegex = /^\d{8}$/;
    return dniRegex.test(dni.trim());
  }

  //La contraseña debe tener al menos 6 caracteres
  static validatePassword = (password: string): boolean => {
    return password.trim().length >= 6;
  }
};


