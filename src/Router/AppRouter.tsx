import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClinicaLogin from '../features/users/components/login'
//import ClinicaRegister from '../features/Users/components/register'

const AppRouter = () => {
    return(
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hola mundo</h1>} />
        <Route path="/login" element= {<ClinicaLogin />} />
      </Routes>
    </Router>
    )
}

export default AppRouter;