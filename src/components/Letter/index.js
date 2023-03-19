import './Letter.css'

const Letter = (props) =>{
    
    /* if(props.line == 0 && props.index ==0){
        return <li id='letter00' className='letter selecionado' style={props.style}>{props.letter}</li>
    } */

    if(props.letter !== ""){
        document.querySelector(`#letter${props.line}${props.index}`).classList.remove('selecionado');
    }

    return (
        <li className='letter__li'>
            <p className='letter' style={props.style}>{props.letter}</p>
            <div id={'letter'+ props.line + props.index} className='underline'></div>
        </li>
    )
}

export default Letter;