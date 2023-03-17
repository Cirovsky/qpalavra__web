import './Key.css';
import { UserContext } from '../../UserContext';

const Key= (props) =>{
    return(
    <>
    <UserContext.Consumer>
        { (value) => {if (props.value == 'Enter'){
        return (<span className='key enter' onClick={() =>value[0](props.value)}>
        {<img src='confirm.svg' alt='confirm guess'/>}
        </span>);
    }
    if (props.value == 'Backspace'){
       return (<span className="key backspace" onClick={() =>value[0](props.value)}>
            <img src='backspace.svg' alt='backspace'/>
       </span>);
    }
        return <span className="key" 
                    onClick={() =>{
                        console.log(props.value.toUpperCase());
                        console.log(value[1]);
                        console.log(value[1][0].includes(props.value.toUpperCase()));
                        value[0](props.value)
                    }}
                    style={{backgroundColor: `${value[1][0].includes(props.value.toUpperCase())? 'rgba(11, 12, 33, 0.6)': ''}` }}
                >{props.value}</span>;}}
    </UserContext.Consumer>
    </>)
}

export default Key;