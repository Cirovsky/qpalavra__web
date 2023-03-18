import './Key.css';
import { UserContext } from '../../UserContext';
import { useContext } from 'react';

const Key = (props) => {

    const [show, triedLetters] = useContext(UserContext);

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
    return <span className="key" onClick={() => show(props.value)}>{props.value}</span>;
}

export default Key;