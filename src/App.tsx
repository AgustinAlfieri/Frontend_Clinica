import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from  './core/templates/Header'
import './index.css'
import Body from './core/templates/Body'

function App() {
  return (
    <>
      <Header clinicName="Portal Clinica Sana" />
      <Body />
    </>
  )
}

export default App

