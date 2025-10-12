import './button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    buttonFunction?: React.MouseEventHandler<HTMLButtonElement>;
    variant?: 'primary' | 'secondary' | 'danger' | 'none';
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    label,
    buttonFunction,
    variant = 'primary',
    icon,
    className = '',
    style,
    ...props
}) => {
    // Si variant es 'none', solo aplica 'button' base y className personalizado
    const buttonClass = variant === 'none' 
        ? `button ${className}`.trim()
        : `button button-${variant} ${className}`.trim();
    
    return (
        <button onClick={buttonFunction} className={buttonClass} style={style} {...props}>
            {label}
            {icon && <span className="button-icon-wrapper">{icon}</span>}
        </button>
    );
};

export default Button;