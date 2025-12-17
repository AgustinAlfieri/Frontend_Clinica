import React from 'react';
import './SuccessModal.css';

interface SuccessModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="success-modal-overlay" onClick={onClose}>
            <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="success-icon">✓</div>
                <h3>¡Éxito!</h3>
                <p>{message}</p>
                <button className="success-button" onClick={onClose}>
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
