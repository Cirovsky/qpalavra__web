import Letter from '../Letter';
import './Line.css';

const Line = (props) =>{
    return (
        <ul className='line'>
            <Letter letter = {props.line[0]} index={0} line={props.l} style={props.style[0]}/>
            <Letter letter = {props.line[1]} index={1} line={props.l} style={props.style[1]}/>
            <Letter letter = {props.line[2]} index={2} line={props.l} style={props.style[2]}/>
            <Letter letter = {props.line[3]} index={3} line={props.l} style={props.style[3]}/>
            <Letter letter = {props.line[4]} index={4} line={props.l} style={props.style[4]}/>
        </ul>
        
    )
}

export default Line;