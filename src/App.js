import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Line from './components/Line';
import Keyboard from './components/Keyboard';
import { checkRiddleGuess } from './logic/guessingLogic';
import { KeyboardContext } from './Contexts/KeyboardContext';
import NoticeScreen from './components/NoticeScreen';

function App() {


  const [status, setStatus] = useState({
    index: 0,
    line: 0,
    won: false,
  });

  const cursor = document.getElementById('letter' + status.line + status.index);
  if (cursor != null) {
    cursor.classList.add('selecionado');
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
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
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
    let remainLives = lives;

    const newWordList = [...wordsList];
    const newStyles = [...styleLetter];
    let line = status.line;
    let index = status.index;
    let missLetters;
    let goodTryLetters;
    let jackpotLetters;

    console.log(cursor);

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
      remainLives--
      setLives(remainLives);

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
          cursor.classList.remove('selecionado');
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
    <main
      className='container__principal'
    >
      <Header />
      <NoticeScreen display={status.won || lives < 0}
        notice={status.won ? "ACERTOU!!" : "ERROU..."} />

      <div className='board'>
        <Line line={wordsList[0]} l={0} style={styleLetter[0]} />
        <Line line={wordsList[1]} l={1} style={styleLetter[1]} />
        <Line line={wordsList[2]} l={2} style={styleLetter[2]} />
        <Line line={wordsList[3]} l={3} style={styleLetter[3]} />
        <Line line={wordsList[4]} l={4} style={styleLetter[4]} />
        <Line line={wordsList[5]} l={5} style={styleLetter[5]} />
      </div>
      <KeyboardContext.Provider value={[showLetter, triedLetters]}>
        <Keyboard show={showLetter} />
      </KeyboardContext.Provider>

    </main>

  );
}

export default App;
