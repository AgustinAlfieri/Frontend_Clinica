import './select.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: Array<{ value: string; label: string }>;
    containerClassName?: string;
    labelClassName?: string;
    selectClassName?: string;
}

const Select: React.FC<SelectProps> = ({ 
    label, 
    error, 
    options,
    containerClassName = '',
    labelClassName = '',
    selectClassName = '',
    className,
    ...props 
}) => {
    return (
        <div className={`select-container ${containerClassName}`.trim()}>
            <label className={`select-label ${labelClassName}`.trim()}>{label}</label>
            <select className={`select-field ${selectClassName || className || ''}`.trim()} {...props}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="select-error">{error}</span>}
        </div>
    );
};

export default Select;
