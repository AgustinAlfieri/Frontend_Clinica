import React from 'react';
import './Body.css'
import Container from '../components/container'
// 
const Body: React.FC = () => {
    return (
        <main className="main">
            <Container stylecontainer='container'
            button='button1'
            buttonlabel="Solicitar Turno" 
            b_function={() => alert("Turno Solicitado")}></Container>

            <Container stylecontainer='container'
            button='button2'
            buttonlabel="Modificar Turno" 
            b_function={() => alert("Turno Modificado")}></Container>
        </main>
    )
}




export default Body;