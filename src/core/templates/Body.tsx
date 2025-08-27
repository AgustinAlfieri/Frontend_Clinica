import React, { useState } from 'react';
import './Body.css'
import Container from '../components/container'
import { animate, motion } from 'framer-motion';

const Body: React.FC = () => {
    const [showBox,setShowBox] = useState(false)
    const handleSolicitarTurno = () => {
        setShowBox((prev) => !prev);
        if (showBox) {
            console.log("Turno Solicitado");
        }
    }
    
    return (
        <main className="main">
            <motion.div
                className="header-cart"
                initial={{ y: 0, opacity: 1,x : -400 }}
                animate={showBox ? { y: 405, opacity: 1 } : { y: 0, opacity: 1,x : -400 } }
                transition={{ duration: 1 }}
            >
                <p>¿Qué vamos a hacer hoy?</p>
            </motion.div>

            <motion.div
                className="body-mistey-box"
                initial={{ y: -200, opacity: 0 ,x : -400}}
                animate={showBox ? { y: 410, opacity: 1 } : { y: 0, opacity: 1,x : -400 }}
                transition={{ duration: 1 }}
            >
                Hola
            </motion.div>
            <Container stylecontainer='container'
            button='button1'
            buttonlabel="Solicitar Turno" 
            b_function={handleSolicitarTurno}></Container>

            <Container stylecontainer='container'
            button='button2'
            buttonlabel="Modificar Turno" 
            b_function={handleSolicitarTurno}></Container>
            
        </main>
    )
}




export default Body;