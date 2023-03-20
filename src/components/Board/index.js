import Line from "../Line";

const Board = (props) =>{

    const wordsList = props.wordsList;
    const styleLetter = props.styleLetter;
    return(
        <div className='board'>
        <Line line={wordsList[0]} l={0} style={styleLetter[0]} />
        <Line line={wordsList[1]} l={1} style={styleLetter[1]} />
        <Line line={wordsList[2]} l={2} style={styleLetter[2]} />
        <Line line={wordsList[3]} l={3} style={styleLetter[3]} />
        <Line line={wordsList[4]} l={4} style={styleLetter[4]} />
        <Line line={wordsList[5]} l={5} style={styleLetter[5]} />
      </div>
    )
}

export default Board;