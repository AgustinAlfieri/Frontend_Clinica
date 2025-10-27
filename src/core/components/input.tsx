import './input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    containerClassName = '',
    labelClassName = '',
    inputClassName = '',
    className,
    ...props
}) => {
    return (
        <div className={`input-container ${containerClassName}`.trim()}>
            <label className={`input-label ${labelClassName}`.trim()}>{label}</label>
            <input 
                className={`input-field ${inputClassName || className || ''}`.trim()} 
                {...props} 
            />
            {error && <span className="input-error">{error}</span>}
        </div>
    );
};

export default Input;