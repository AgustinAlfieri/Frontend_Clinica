import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from  './core/templates/Header'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header clinicName="Clinica XYZ" />
    </>
  )
}

export default App
