import Letter from '../Letter';
import './Line.css';

const Line = (props) =>{
    return (
        <ul className='line'>
            <Letter letter = {props.line[0]} style={props.style[0]}/>
            <Letter letter = {props.line[1]} style={props.style[1]}/>
            <Letter letter = {props.line[2]} style={props.style[2]}/>
            <Letter letter = {props.line[3]} style={props.style[3]}/>
            <Letter letter = {props.line[4]} style={props.style[4]}/>
        </ul>
        
    )
}

export default Line;