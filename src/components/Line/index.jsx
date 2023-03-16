import Letter from '../Letter';
import './Line.css';

const Line = (props) =>{
    return (
        <ul className='line'>
            <Letter letter = {props.line[0]}/>
            <Letter letter = {props.line[1]}/>
            <Letter letter = {props.line[2]}/>
            <Letter letter = {props.line[3]}/>
            <Letter letter = {props.line[4]}/>
        </ul>
        
    )
}

export default Line;