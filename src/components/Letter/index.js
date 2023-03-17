import './Letter.css'

const Letter = (props) =>{
    return (
        <li className="letter" style={props.style}>{props.letter}</li>
    )
}

export default Letter;