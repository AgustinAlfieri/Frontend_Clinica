interface buttonProps{
    stylebutton?: string
    label: string;
    buttonFunction: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<buttonProps> = ({stylebutton,label,buttonFunction}) => {
    return(
        <button onClick={buttonFunction} className={stylebutton}>
            {label}
        </button>
    )
}

export default Button;