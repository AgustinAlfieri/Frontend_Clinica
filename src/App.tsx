import './App.css'
import Header from  './core/templates/Header'
import './index.css'
import Body from './core/templates/Body'
import {BoxProvider} from './core/context/misteryBoxContext'
import ClinicaLogin from './features/users/components/login';

function App() {
  return (
    <ClinicaLogin/>
  )
}

export default App

