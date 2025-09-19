import './Body.css'
import Container from '../components/container'
import { motion } from 'framer-motion';
import {useBoxContext} from '../context/misteryBoxContext'

const Body: React.FC = () => {
    const { showBox,setShowBox } = useBoxContext();
    const handleSolicitarTurno = () => {
        setShowBox((prev) => !prev);
    };
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