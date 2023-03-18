import './Letter.css'

const Letter = (props) =>{
    
    if(props.letter != ""){
        document.querySelector(`#letter${props.line}${props.index}`).classList.remove('selecionado');
    }

    return (
        <li id={'letter'+ props.line + props.index} className='letter' style={props.style}>{props.letter}</li>
    )
}

export default Letter;