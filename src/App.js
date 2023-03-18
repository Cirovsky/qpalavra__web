import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Line from './components/Line';
import Keyboard from './components/Keyboard';
import { checkRiddleGuess } from './logic/guessingLogic';
import { UserContext } from './UserContext';
import { goodTry, jackpot, miss } from './logic/colors';

function App() {


  const [status, setStatus] = useState({
    index: 0,
    line: 0,
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

  const [lives, setLives] = useState(5);

  const [triedLetters, setTriedLetters] = useState({
    missLetters: [],
    goodTryLetters: [],
    jackpotLetters: [],
  })


  const showLetter = (letter) => {

    let won = status.won;
    let remainLives = lives;

    if (won) {
      console.log("você venceu!");
      return;
    }
    if (remainLives < 0) {
      console.log("você perdeu!");
      return;
    }
    const newWordList = [...wordsList];
    const newStyles = [...styleLetter];
    let line = status.line;
    let index = status.index;
    let sLine = [...styleLine];


    if (letter.length === 1) {
      if (letter.charCodeAt() >= 65 && letter.charCodeAt() <= 90 ||
        letter.charCodeAt() >= 97 && letter.charCodeAt() <= 122 ||
        letter.charCodeAt() >= 199 && letter.charCodeAt() <= 254) {
        if (index < 5) {
          newWordList[line].splice(index, 1, letter);
          const hit = checkRiddleGuess(letter, index);
          sLine.push(hit);
          setStyleLine(sLine);
        }
        if (index <= 4) {
          index++;
        }
        setwordsList(newWordList);
        setStatus({ index, line, won });
      }
    }

    if (letter === 'Enter' && index > 4) {
      newStyles[line] = sLine.map(letter => letter.style);
      setStyleLetter(newStyles);
      /* updateKeys(sLine); */
      won = sLine.map(lt => lt.style.backgroundColor == jackpot).reduce((acc, next) => acc && next);
      setStyleLine([]);
      remainLives--
      if (remainLives < 0) {
        console.log("você perdeu");
      }

      setLives(remainLives);

      /* if(won){
        alert("você venceu");
      } */

      if (line < 5) {
        line++
        index = 0;
        setwordsList(newWordList);
        setStatus({ index, line, won });
      }
    }

    if (letter === 'Backspace') {
      if (index !== 0) {
        index--;
        newWordList[line].splice(index, 1, "");
        sLine.pop();
        setStyleLine(sLine);
        setwordsList(newWordList);
        setStatus({ index, line, won });
      }
    }
  }

  const updateKeys = (styleLine) => {
    const tLetters = { ...triedLetters };

    const missLetters = styleLine.filter(letter => letter.style.backgroundColor == miss).map(l => l.letter);
    const goodTryLetters = styleLine.filter(letter => letter.style.backgroundColor == goodTry).map(l => l.letter);
    const jackpotLetters = styleLine.filter(letter => letter.style.backgroundColor == jackpot).map(l => l.letter);

    missLetters.forEach(letter => tLetters.missLetters.push(letter));
    goodTryLetters.forEach(letter => tLetters.goodTryLetters.push(letter));
    jackpotLetters.forEach(letter => tLetters.jackpotLetters.push(letter));

    setTriedLetters(tLetters);
  }
  if(!status.won && lives >=0){
    document.body.onkeydown = (e) => showLetter(e.key);
  }else{
    if(status.won){
      console.log("você venceu!");
    }else{
      console.log("você perdeu!");
    }
  }


  return (
    <main className='container__principal'>
      <Header/>
      <div></div>
      <div className='board'>
        <Line line={wordsList[0]} style={styleLetter[0]} />
        <Line line={wordsList[1]} style={styleLetter[1]} />
        <Line line={wordsList[2]} style={styleLetter[2]} />
        <Line line={wordsList[3]} style={styleLetter[3]} />
        <Line line={wordsList[4]} style={styleLetter[4]} />
        <Line line={wordsList[5]} style={styleLetter[5]} />
      </div>
      <UserContext.Provider value={[showLetter,triedLetters]}>
        <Keyboard show ={showLetter} />
      </UserContext.Provider>

    </main>

  );
}

export default App;
