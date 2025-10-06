import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClinicaLogin from '../features/users/components/login'
import AppointmentForm from '../features/appointment/components/appointment'
import RegisterMedic from '../features/users/medic/components/RegisterMedic'
import RegisterPatient from '../features/users/patients/components/RegisterPatient'
import RegisterAdministrative from '../features/users/administrative/components/RegisterAdministrative'
import Homepage from '../features/homePage/Homepage';

const AppRouter = () => {
    return(
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hola mundo</h1>} />
        <Route path="/login" element= {<ClinicaLogin />} />
        <Route path="/appointment" element= {<AppointmentForm />} />
        <Route path="/register" element= {<RegisterPatient/>} />
        <Route path="/registermedic" element= {<RegisterMedic/>} />
        <Route path="/registeradministrative" element= {<RegisterAdministrative/>} />
        <Route path="/homepage" element= {<Homepage clinicName="ClinicaSana"/>} />
      </Routes>
    </Router>
    )
}

export default AppRouter;