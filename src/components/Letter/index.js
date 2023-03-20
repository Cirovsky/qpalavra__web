import './Letter.css'

const Letter = (props) => {

    
    if(props.letter !== ""){
        document.querySelector(`#letter${props.line}${props.index}`).classList.remove('selected');
    }

    return (
        props.line == 0 && props.index == 0? 
        <li className='letter__li'>
            <p className='letter' style={props.style}>{props.letter}</p>
            <div id={'letter'+ props.line + props.index} className='underline selected'></div>
        </li>:
        <li className='letter__li'>
            <p className='letter' style={props.style}>{props.letter}</p>
            <div id={'letter'+ props.line + props.index} className='underline'></div>
        </li>
    )
}

export default Letter;