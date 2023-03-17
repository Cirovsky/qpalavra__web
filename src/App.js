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
  ]);

  const [styleLine, setStyleLine] = useState([]);

  const[lives, setLives] = useState(5);
  const [missLetters,setMissLetters] = useState([]);
  const [goodTryLetters,setGoodTryLetters] = useState([]);
  const [jackpotLetters,setJackpotLetters] = useState([]);


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
    let sLine = [...styleLine];

    let miss = [];
    let goodTry = [];
    let jackpot = [];


    if (letter.length === 1) {
      if (letter.charCodeAt() >= 65 && letter.charCodeAt() <= 90 ||
      letter.charCodeAt()>=97 && letter.charCodeAt() <=122 ||
      letter.charCodeAt() >=199 && letter.charCodeAt() <= 254){
        if (index < 5) {
          newWordList[line].splice(index, 1, letter);
          const hit = checkRiddleGuess(letter,index);
          sLine.push(hit);
          setStyleLine(sLine);
        }
        if (index <= 4) {
          index++;
        }
        setwordsList(newWordList);
        setGameStatus({ index, line, won});
      }
    }

    if (letter === 'Enter' && index > 4) {
      newStyles[line] = sLine.map(letter => letter.style);
      setStyleLine([]);
      setStyleLetter(newStyles);
      remainLives--
      setMissLetters(miss);
      setGoodTryLetters(goodTry);
      setJackpotLetters(jackpot);
      updateKeys(miss, goodTry, jackpot);

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
        sLine.pop();
        setStyleLine(sLine);
        setwordsList(newWordList);
        setGameStatus({ index, line, won});
      }
    }
  }

  const updateKeys = (miss,goodTry,jackpot)=>{
    const newMiss = [...missLetters];
    miss.forEach(letter => newMiss.push(letter));
    setMissLetters(newMiss);
    const newGoodTry = [...goodTryLetters];
    goodTry.forEach(letter => newGoodTry.push(letter));
    setGoodTryLetters(newGoodTry);
    const newJackpot = [...jackpotLetters];
    jackpot.forEach(letter => newJackpot.push(letter));
    setJackpotLetters(newJackpot);
  }

  document.body.onkeydown = (e) => showLetter(e.key);


  return (
    <main className='container__principal'>
      <Header />
        <div className='board'>
          <Line line={wordsList[0]} style={styleLetter[0]} />
          <Line line={wordsList[1]} style={styleLetter[1]} />
          <Line line={wordsList[2]} style={styleLetter[2]} />
          <Line line={wordsList[3]} style={styleLetter[3]} />
          <Line line={wordsList[4]} style={styleLetter[4]} />
          <Line line={wordsList[5]} style={styleLetter[5]} />
        </div>
      <UserContext.Provider value={[showLetter,[missLetters,goodTryLetters,jackpotLetters]]}>
        <Keyboard/>
      </UserContext.Provider>
    </main>

  );
}

export default App;
