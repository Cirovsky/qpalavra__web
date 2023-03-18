import './Key.css';
import { KeyboardContext } from '../../Contexts/KeyboardContext';
import { useContext } from 'react';

const Key = (props) => {

    const [show, triedLetters] = useContext(KeyboardContext);
    let classColor = "";
    if(triedLetters.missLetters.includes(props.value.toUpperCase())){
        classColor = "miss";
    };
    if(triedLetters.goodTryLetters.indexOf(props.value.toUpperCase()) != -1 ){
        classColor = "goodtry";
    }
    if(triedLetters.jackpotLetters.includes(props.value.toUpperCase())){
        classColor = "jackpot";
    };


    if (props.value === 'Enter') {
        return (<span className='key enter' onClick={() => show(props.value)}>
            {<img src='confirm.svg' alt='confirm guess' />}
        </span>);
    }
    if (props.value === 'Backspace') {
        return (<span className="key backspace" onClick={() => show(props.value)}>
            <img src='backspace.svg' alt='backspace' />
        </span>);
    }
    return <span className={`key ${classColor}`} 
        onClick={() => show(props.value)}
        >{props.value}</span>;
}

export default Key;