interface buttonProps{
    label: string;
    buttonFunction: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<buttonProps> = ({label,buttonFunction,}) => {
    return(
        <button onClick={buttonFunction} className="button">
            {label}
        </button>
    )
}

export default Button;