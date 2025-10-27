import Button from "./button";

interface containerProps{
    stylecontainer?: string;
    button?: string;
    buttonlabel: string;
    b_function: React.MouseEventHandler<HTMLButtonElement>;
        
}

const Container: React.FC<containerProps> = ({stylecontainer,button,buttonlabel,b_function}) => {
    return(
        <div className={stylecontainer}>
            <Button className={button} label= {buttonlabel} buttonFunction={b_function}></Button>
        </div>
    )
}

export default Container;