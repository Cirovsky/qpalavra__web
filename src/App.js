import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Line from './components/Line';
import { checkRiddleGuess} from './logic/guessingLogic';
import Keyboard from './components/Keyboard';
import { UserContext } from './UserContext';

function App() {


  const [gameStatus, setGameStatus] = useState({
    index: 0,
    line: 0,
    won: false,
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

  const [styleLetter, setStyleLetter] = useState([
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
  ])

  const[lives, setLives] = useState(5);



  const showLetter = (letter) => {

    let won = gameStatus.won;
    let remainLives = lives;

    if (won) {
      alert("você venceu!");
      return;
    }
    if (remainLives < 0) {
      alert("você perdeu!");
      return;
    }
    const newWordList = [...wordsList];
    const newStyles = [...styleLetter];
    let line = gameStatus.line;
    let index = gameStatus.index;


    if (letter.length === 1) {
      if (letter.charCodeAt() >= 65 && letter.charCodeAt() <= 90 ||
      letter.charCodeAt()>=97 && letter.charCodeAt() <=122 ||
      letter.charCodeAt() >=199 && letter.charCodeAt() <= 254){
        if (index < 5) {
          newWordList[line].splice(index, 1, letter);
        }
        if (index <= 4) {
          index++;
        }
        setwordsList(newWordList);
        setGameStatus({ index, line, won});
      }
    }

    if (letter === 'Enter' && index > 4) {
      [newStyles[line],won,newWordList[line]] = checkRiddleGuess(newWordList[line]);
      setStyleLetter(newStyles);
      remainLives--

      if(remainLives < 0){
        alert("você perdeu");
      }

      setLives(remainLives);
      if(won){
        alert("você venceu");
      }
      
      if (line < 5) {
        line++
        index = 0;
        setwordsList(newWordList);
        setGameStatus({ index, line, won});
      }
    }

    if (letter === 'Backspace') {
      if (index !== 0) {
        index--;
        newWordList[line].splice(index, 1, "");
        setwordsList(newWordList);
        setGameStatus({ index, line, won});
      }
    }
  }

  document.body.onkeydown = (e) => showLetter(e.key);

  return (
    <>
      <Header />
      <main className='container'>
        <Line line={wordsList[0]} style={styleLetter[0]} />
        <Line line={wordsList[1]} style={styleLetter[1]} />
        <Line line={wordsList[2]} style={styleLetter[2]} />
        <Line line={wordsList[3]} style={styleLetter[3]} />
        <Line line={wordsList[4]} style={styleLetter[4]} />
        <Line line={wordsList[5]} style={styleLetter[5]} />
      </main>
      <UserContext.Provider value={showLetter}>
      <Keyboard/>
      </UserContext.Provider>
    </>

  );
}

export default App;
