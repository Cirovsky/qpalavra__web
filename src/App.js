import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import { checkRiddleGuess } from './logic';
import { KeyboardContext } from './Contexts/KeyboardContext';
import NoticeScreen from './components/NoticeScreen';
import Board from './components/Board';
import { LineContext } from './Contexts/LineContext';
function App() {


  const [status, setStatus] = useState({
    index: 0,
    line: 0,
    won: false,
  });

  const cursor = document.getElementById(`letter${status.line}${status.index}`);
  if (cursor != null) {
    cursor.classList.add('selected');
  }

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
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [lives, setLives] = useState(5);

  const [triedLetters, setTriedLetters] = useState({
    missLetters: [""],
    goodTryLetters: [""],
    jackpotLetters: [""],
  })

  const showLetter = (letter) => {
    if ((status.won) || (lives < 0)) {
      return;
    }
    let won = status.won;
    let remainsLives = lives;

    const newWordList = [...wordsList];
    const newStyles = [...styleLetter];
    let line = status.line;
    let index = status.index;
    let missLetters;
    let goodTryLetters;
    let jackpotLetters;

    if (letter.length === 1) {
      if (letter.charCodeAt() >= 65 && letter.charCodeAt() <= 90 ||
      letter.charCodeAt() >= 97 && letter.charCodeAt() <= 122 ||
      letter.charCodeAt() >= 199 && letter.charCodeAt() <= 254) {
        if (index < 5) {
          newWordList[line].splice(index, 1, letter);
        }
        if (index <= 4) {
          index++;
        }
        setwordsList(newWordList);
        setStatus({ index, line, won });
      }
    }

    if (letter === 'Enter' && index > 4) {
      [newStyles[line], won, newWordList[line], { missLetters, goodTryLetters, jackpotLetters }] = checkRiddleGuess(newWordList[line]);
      setStyleLetter(newStyles);
      updateKeys(missLetters, goodTryLetters, jackpotLetters);
      remainsLives--
      console.log(lives)
      setLives(remainsLives);
      if(won){
        setStatus({index, line, won});
        return;
      }

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
        setwordsList(newWordList);
        if (cursor != null) {
          cursor.classList.remove('selected');
        }
        setStatus({ index, line, won });
      }
    }
  }

  const updateKeys = (missL, goodTryL, jackpotL) => {
    const tLetters = { ...triedLetters };

    const missLetters = missL;
    const goodTryLetters = goodTryL;
    const jackpotLetters = jackpotL;

    missLetters.forEach(letter => tLetters.missLetters.push(letter));
    goodTryLetters.forEach(letter => tLetters.goodTryLetters.push(letter));
    jackpotLetters.forEach(letter => tLetters.jackpotLetters.push(letter));

    setTriedLetters(tLetters);
  }

  document.body.onkeydown = (e) => showLetter(e.key);
  return (
    <>
      <Header />
      <NoticeScreen display={status.won || lives < 0}
        notice={status.won ? "ACERTOU!!" : "ERROU..."} />
      <main>
      <LineContext.Provider value={status.line}>
        <Board wordsList={wordsList} styleLetter={styleLetter}/>
      </LineContext.Provider>
      </main>
      
      <KeyboardContext.Provider value={[showLetter, triedLetters, status.index]}>
        <Keyboard show={showLetter} />
      </KeyboardContext.Provider>

    </>

  );
}

export default App;
