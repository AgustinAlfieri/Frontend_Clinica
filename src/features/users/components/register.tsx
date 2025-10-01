import {motion} from 'framer-motion'
import {useState} from 'react'
import Input from '../../../core/components/input'
/*
// Interfaz base para todos los tipos de usuario
export interface BaseUserData {
  dni: string;
  name: string;
  email: string;
  password: string;
  telephone: string;
  surname: string;
}

// Handlers para el manejo de estado
export interface RegisterHandlers {
  onDniChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSurnameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTelephoneChange: (value: string) => void;
}

export interface ValidationErrors {
  dni?: string;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  telephone?: string;
}

interface RegisterProps {
  userData: BaseUserData;
  handlers: RegisterHandlers;
  errors?: ValidationErrors;
  isLoading?: boolean;
  children?: React.ReactNode;
}

// Variantes de animación reutilizables
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const Register: React.FC<RegisterProps> = ({ 
  userData, 
  handlers, 
  errors = {},
  isLoading = false,
  children 
}) => {
    // Estados para cada campo
  const [dni, setDni] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");

  // Handlers = funciones que manejan los cambios
  const handleDniChange = (value: string) => {
    setDni(value);
  };

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleSurnameChange = (value: string) => {
    setSurname(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleTelephoneChange = (value: string) => {
    setTelephone(value);
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <section className="register-section">
        <motion.h2 variants={itemVariants}>Register</motion.h2>
        
        <motion.div className="user-info" variants={itemVariants}>
          <Input 
            label="Name" 
            value={userData.name}
            onChange={handlers.onNameChange}
            error={errors.name}
            disabled={isLoading}
            required
          />
          <Input 
            label="Surname" 
            value={userData.surname}
            onChange={handlers.onSurnameChange}
            error={errors.surname}
            disabled={isLoading}
            required
          />
          <Input 
            label="DNI" 
            value={userData.dni}
            onChange={handlers.onDniChange}
            error={errors.dni}
            disabled={isLoading}
            placeholder="12345678"
            maxLength={8}
            required
          />
          <Input 
            label="Telephone" 
            value={userData.telephone}
            onChange={handlers.onTelephoneChange}
            error={errors.telephone}
            disabled={isLoading}
            placeholder="+54 11 1234-5678"
          />
        </motion.div>

        <motion.div className="user-login-info" variants={itemVariants}>
          <Input 
            label="Email" 
            type="email"
            value={userData.email}
            onChange={handlers.onEmailChange}
            error={errors.email}
            disabled={isLoading}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            value={userData.password}
            onChange={handlers.onPasswordChange}
            error={errors.password}
            disabled={isLoading}
            minLength={8}
            required
          />
        </motion.div>

        {children && (
          <motion.div className="children-container" variants={itemVariants}>
            {children}
          </motion.div>
        )}
      </section>
    </motion.div>
  );
};
*/
