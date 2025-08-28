import './App.css'
import Header from  './core/templates/Header'
import './index.css'
import Body from './core/templates/Body'
import {BoxProvider} from './core/context/misteryBoxContext'

function App() {
  return (
    <BoxProvider>
      <Header clinicName="Portal Clinica Sana" />
      <Body />      
    </BoxProvider>
  )
}

export default App

