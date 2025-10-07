import { createContext, useContext, useState, type ReactNode } from 'react'

interface BoxContextType {
    // Tipo de dato del contexto
    showBox: boolean;  // Un booleano que indica si la caja se muestra o no
    setShowBox: React.Dispatch<React.SetStateAction<boolean>>;  // Es la función que permite cambiar ese estado (como el setState de useState)

}

const BoxContext = createContext<BoxContextType | undefined>(undefined);  //Significa que el contexto puede ser ese objeto o undefined.

const BoxProvider = ({children}: {children: ReactNode}) => {
    const [showBox, setShowBox] = useState(false);

    return (
        <BoxContext.Provider value={{ showBox, setShowBox }}>
            {children}
        </BoxContext.Provider>
    );
};

const useBoxContext = () => {
    const context = useContext(BoxContext);
    if (!context) {
        throw new Error('useBoxContext must be used within a BoxProvider');
    }
    return context;
}

export { BoxProvider, useBoxContext }