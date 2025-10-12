import React from 'react';
import './alert.css';

type AlertType = 'error' | 'success' | 'warning' | 'info';

interface AlertProps {
    type: AlertType;
    message: string;
    icon?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const Alert: React.FC<AlertProps> = ({ 
    type, 
    message, 
    icon = true,
    className = '',
    style
}) => {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            case 'info':
                return 'ℹ';
            default:
                return '';
        }
    };

    return (
        <div className={`alert alert-${type} ${className}`.trim()} style={style}>
            {icon && <span className="alert-icon">{getIcon()}</span>}
            <span className="alert-message">{message}</span>
        </div>
    );
};

export default Alert;
