import React from 'react';
import './userCard.css'

interface userProps{
    nombre?: string;
    apellido?: string;
    dni?: string;
}

const UserCard: React.FC<userProps> = ({ nombre, apellido, dni }) => {
    return (
        <div className="user-card">
        <img 
            src="src/assets/foto-imagen.png" 
            alt="User Avatar" 
        />
        <div className="user-info">
            <h2>{nombre} {apellido}</h2>
            <p>DNI: {dni}</p>
        </div>
        </div>
    );
};

export default UserCard;