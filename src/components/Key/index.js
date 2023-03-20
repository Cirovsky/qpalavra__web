import './Key.css';
import { KeyboardContext } from '../../Contexts/KeyboardContext';
import { useContext } from 'react';

const Key = (props) => {

    const [show, triedLetters, index] = useContext(KeyboardContext);
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
        return (<span className={`key enter ${index == 5? 'press-enter': ''}`} onClick={() => show(props.value)}>
            <svg fill="rgb(72, 90, 90)" width="3.5vh" height="3.5vh" viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg">
                <path d="M19,6a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H7.41l1.3-1.29A1,1,0,0,0,7.29,9.29l-3,3a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L7.41,14H17a3,3,0,0,0,3-3V7A1,1,0,0,0,19,6Z"/>
            </svg>
        </span>);
    }
    if (props.value === 'Backspace') {
        return (<span className={`key backspace ${index > 0? 'undo' : ''}`} onClick={() => show(props.value)}>
            <svg fill="rgb(72, 90, 90)" width="3.5vh" height="3.5vh" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19,5H9.83a3,3,0,0,0-2.12.88L2.29,11.29a1,1,0,0,0,0,1.42l5.42,5.41A3,3,0,0,0,9.83,19H19a3,3,0,0,0,3-3V8A3,3,0,0,0,19,5Zm1,11a1,1,0,0,1-1,1H9.83a1.05,1.05,0,0,1-.71-.29L4.41,12,9.12,7.29A1.05,1.05,0,0,1,9.83,7H19a1,1,0,0,1,1,1ZM16.71,9.29a1,1,0,0,0-1.42,0L14,10.59l-1.29-1.3a1,1,0,0,0-1.42,1.42L12.59,12l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L14,13.41l1.29,1.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L15.41,12l1.3-1.29A1,1,0,0,0,16.71,9.29Z" />
            </svg>
        </span>);
    }
    return <span className={`key ${classColor}`} 
        onClick={() => show(props.value)}
        >{props.value}</span>;
}

export default Key;