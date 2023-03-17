import './Key.css';
import { UserContext } from '../../UserContext';

const Key= (props) =>{
    return(
    <>
    <UserContext.Consumer>
        { (value) => {if (props.value == 'Enter'){
        return (<span className='key enter' onClick={() =>value(props.value)}>
        {<img src='confirm.svg' alt='confirm guess'/>}
        </span>);
    }
    if (props.value == 'Backspace'){
       return (<span className="key backspace" onClick={() =>value(props.value)}>
            <img src='backspace.svg' alt='backspace'/>
       </span>);
    }
        return <span className="key" onClick={() =>value(props.value)}>{props.value}</span>;}}
    </UserContext.Consumer>
    </>)
}

export default Key;