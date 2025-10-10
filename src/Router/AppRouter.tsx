import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClinicaLogin from '../features/users/components/login'
import AppointmentForm from '../features/appointment/components/appointment'
import RegisterMedic from '../features/users/medic/components/RegisterMedic'
import RegisterPatient from '../features/users/patients/components/RegisterPatient'
import RegisterAdministrative from '../features/users/administrative/components/RegisterAdministrative'
import Homepage from '../features/homepage/components/homepage'

const AppRouter = () => {
    return(
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/login" element= {<ClinicaLogin />} />
        <Route path="/appointment" element= {<AppointmentForm />} />
        <Route path="/register" element= {<RegisterPatient/>} />
        <Route path="/registermedic" element= {<RegisterMedic/>} />
        <Route path="/registeradministrative" element= {<RegisterAdministrative/>} />
        <Route path="/homepage" element= {<Homepage/>} />
      </Routes>
    </Router>
    )
}

export default AppRouter;