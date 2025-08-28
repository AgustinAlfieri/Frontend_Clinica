interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({label,error,...props}) => {
    return(
        <div className="input-container">
            <label className="input-label">{label}</label>
            <input className="input-field" {...props} />
            {error && <span className="input-error">{error}</span>}
        </div>
    )
}

export default Input;