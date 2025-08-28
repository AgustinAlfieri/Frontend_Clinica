import {motion} from 'framer-motion'
import Input from '../../../core/components/input'

interface RegisterProps {
    dni: string;
    name: string;
    email: string;
    password: string;
    telephone: string;
    surname: string;
}

const Register: React.FC<RegisterProps> = ({ dni, surname, name, email, password, telephone }) => {
    return (
        <div>
            <section className="register-section">
                <h2>Register</h2>
                <div className="user-info">
                    <Input label="Name" value={name} />
                    <Input label="Surname" value={surname} />
                    <Input label="DNI" value={dni} />
                    <Input label="Telephone" value={telephone} />
                </div>
                <div className="user-login-info">
                    <Input label="Email" value={email} />
                    <Input label="Password" type="password" value={password} />
                </div>
            </section>
        </div>
    );
};
