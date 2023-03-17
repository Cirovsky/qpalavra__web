import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Line from './components/Line';
import { checkRiddleGuess} from './logic/guessingLogic';
import Key from './components/Key';

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
      if (letter.charCodeAt() >= 65 && letter.charCodeAt() <= 122 ) {
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
      [newStyles[line],won] = checkRiddleGuess(newWordList[line]);
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

  const keyboard = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l','Backspace'],
    ['z','x','c','v','b','n','m','Enter'],
  ]

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
      <section className='keyboard'>
        <div className='keyboard__line'>{keyboard[0].map( k => <Key value={k} key={k}/>)}</div>
        <div className='keyboard__line'>{keyboard[1].map( k => <Key value={k} key={k}/>)}</div>
        <div className='keyboard__line'>{keyboard[2].map( k => <Key value={k} key={k}/>)}</div>
      </section>
    </>

  );
}

export default App;
