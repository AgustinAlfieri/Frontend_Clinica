import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClinicaLogin from '../features/users/components/login'
import AppointmentForm from '../features/appointment/components/form'
import RegisterPatient from '../features/users/patients/components/RegisterPatient'
//import ClinicaRegister from '../features/Users/components/register'

const AppRouter = () => {
    return(
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hola mundo</h1>} />
        <Route path="/login" element= {<ClinicaLogin />} />
        <Route path="/appointment" element= {<AppointmentForm />} />
        <Route path="/register" element= {<RegisterPatient/>} />
      </Routes>
    </Router>
    )
}

export default AppRouter;