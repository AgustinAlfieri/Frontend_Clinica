interface buttonProps{
    label: string;
    buttonFunction:() => void;
    class_name_button: string;
}

const Button: React.FC<buttonProps> = ({label,buttonFunction,class_name_button}) => {
    return(
        <button onClick={buttonFunction} className={`button${class_name_button ? class_name_button:''}`}>
            {label}
        </button>
    )
}

export default Button;