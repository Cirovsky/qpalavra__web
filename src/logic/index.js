import database from "../database";

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
                hits[guessNormalized.indexOf(guessNormalized[index])] === 'class-good-try') {
                hits[guessNormalized.indexOf(guessNormalized[index])] = 'class-miss'
            }
            hits.push('class-jackpot')
            checkRiddle.splice(checkRiddle.indexOf(guessNormalized[index]), 1)
        } else if (checkRiddle.indexOf(guessNormalized[index]) !== -1) {
            checkRiddle.includes(guessNormalized[index]) ?
                hits.push('class-good-try')
                : hits.push('class-miss')
            checkRiddle.splice(checkRiddle.indexOf(guessNormalized[index]), 1)
        } else {
            hits.push('class-miss')
        }
    }

    const won = isWon(hits);
    return [hits, won, won ? riddle : guess, triedLetters(guess, hits)];
}

const triedLetters = (letters, hits) => {
    const missLetters = letters.filter((letter,index) => hits[index] === 'class-miss');
    const goodTryLetters = letters.filter((letter,index) => hits[index] === 'class-good-try');

    const jackpotLetters = letters.filter((letter,index) => hits[index] === 'class-jackpot');



    return {missLetters, goodTryLetters, jackpotLetters};
}

const isWon = (hits) => {
    const checkHits = hits.map(e => e === 'class-jackpot' ? true : false)
        .reduce((acc, next) => acc && next);

    return checkHits;
}

export {
    checkRiddleGuess,
    riddle,
}