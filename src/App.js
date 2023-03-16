import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Line from './components/Line';

function App() {


  const [gameStatus, setGameStatus] = useState({
    index: 0,
    line: 0,
    won: false,
    lost: false
  });


  const [wordsList, setwordsList] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]

  );




  const showLetter = (letter) => {
    console.log(letter)
    const newWordList = [...wordsList];
    let won = gameStatus.won;
    let lost = gameStatus.lost;
    let line = gameStatus.line;
    let index = gameStatus.index;
    
    if(letter.length === 1){
      if(isNaN(parseInt(letter) + 1)){
        if(index < 5){
          newWordList[line].splice(index, 1, letter);
        }
        if(index <= 4){
          index++;
        }
      }
    }

    if(letter === 'Enter'){   
      if(line < 5){
        if(index >= 4){
          line++
          index = 0;
        }
      }
    }
    
    if(letter === 'Backspace'){
      if(index !== 0){
        console.log(index);
        index--;
        newWordList[line].splice(index, 1, "");
      }
    }
    

    console.log(newWordList[line]);
    console.log(index);
    setwordsList(newWordList);
    setGameStatus({ index, line, won, lost });
  }

  document.body.onkeydown = (e) => showLetter(e.key);

  return (
    <>
      <Header />
      <main className='container'>
        <Line line={wordsList[0]} />
        <Line line={wordsList[1]} />
        <Line line={wordsList[2]} />
        <Line line={wordsList[3]} />
        <Line line={wordsList[4]} />
        <Line line={wordsList[5]} />
      </main>
    </>

  );
}

export default App;
