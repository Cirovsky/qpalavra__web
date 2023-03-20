import './Letter.css'
import { LineContext } from '../../Contexts/LineContext.js';
import { useContext } from 'react';

const Letter = (props) => {
    
    const actualLine = useContext(LineContext);

    if(props.letter !== ""){
        document.querySelector(`#letter${props.line}${props.index}`).classList.remove('selected');
    }

    return (
        props.line === 0 && props.index === 0? 
        <li className='letter__li'>
            <p className={`letter ${props.class? props.class : ""} ${props.style} ${actualLine==props.line? 'line_selected': ''}`}>{props.letter}</p>
            <div id={'letter'+ props.line + props.index} className='underline selected'></div>
        </li>:
        <li className='letter__li'>
            <p className={`letter ${props.class? props.class : ""} ${props.style} ${actualLine==props.line? 'line_selected': ''}`}>{props.letter}</p>
            <div id={'letter'+ props.line + props.index} className='underline'></div>
        </li>
    )
}

export default Letter;