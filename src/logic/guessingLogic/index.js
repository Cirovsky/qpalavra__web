import database from "../../database";
import {miss,goodTry,jackpot} from "../colors";

const sortition = parseInt(Math.random() * (database.length))
const riddle = Array.from(database[sortition]);
const riddleNormalized = normalizeWord(riddle);
console.log(riddle);


function normalizeWord(word) {
    if(typeof word === 'string'){
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }else{
        word = word.join("");
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split("");
    }

}

const checkRiddleGuess = (guess) => {
    let hits = []
    var checkRiddle = riddleNormalized.slice()
    guess = guess.join("").toUpperCase().split("");
    const guessNormalized = normalizeWord(guess);
    for (let index in riddle) {
        if (riddleNormalized[index] == guessNormalized[index]) {
            if (index != guessNormalized.indexOf(guessNormalized[index]) &&
                hits[guessNormalized.indexOf(guessNormalized[index])]["backgroundColor"] == goodTry) {
                hits[guessNormalized.indexOf(guessNormalized[index])]["backgroundColor"] = miss
            }
            hits.push({ backgroundColor: jackpot })
            checkRiddle.splice(checkRiddle.indexOf(guessNormalized[index]), 1)
        } else if (checkRiddle.indexOf(guessNormalized[index]) !== -1) {
            checkRiddle.includes(guessNormalized[index]) ?
                hits.push({ backgroundColor: goodTry })
                : hits.push({ backgroundColor: miss })
            checkRiddle.splice(checkRiddle.indexOf(guessNormalized[index]), 1)
        } else {
            hits.push({ backgroundColor: miss })
        }
    }

    const won = isWon(hits);
    return [hits, won, won ? riddle : guess, triedLetters(guess, hits)];
}

const triedLetters = (letters, hits) => {
    const missLetters = letters.filter((letter,index) => hits[index]["backgroundColor"] == miss);
    const goodTryLetters = letters.filter((letter,index) => hits[index]["backgroundColor"] == goodTry);

    const jackpotLetters = letters.filter((letter,index) => hits[index]["backgroundColor"] == jackpot);



    return {missLetters, goodTryLetters, jackpotLetters};
}

const isWon = (hits) => {
    const checkHits = hits.map(e => e["backgroundColor"] == jackpot ? true : false)
        .reduce((acc, next) => acc && next);

    return checkHits;
}

export {
    checkRiddleGuess,
    riddle,
}