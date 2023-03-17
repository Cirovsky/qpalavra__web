import database from "../../database";
    
const sortition = parseInt(Math.random()*(database.length))
const riddle = ['T','E','R','Ç','A'] /* Array.from(database[sortition]); */
const riddleNormalized = normalizeWord(riddle);
console.log(riddleNormalized);
const jackpot = '#228B22'
const goodTry = '#DAA520'
const miss = 'rgba(11, 12, 33, 0.6)'

function normalizeWord (word){
    word = word.join("");
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split("");

}

const checkRiddleGuess = (guess) => {
    let hits = []
    var checkRiddle = riddleNormalized.slice()
    guess = guess.join("").toUpperCase().split("");
    const guessNormalized = normalizeWord(guess);
    for (let index in riddle){
        if (riddleNormalized[index] == guessNormalized[index]) {
            if (index != guessNormalized.indexOf(guessNormalized[index]) && 
            hits[guessNormalized.indexOf(guessNormalized[index])]["backgroundColor"] == goodTry ){
                hits[guessNormalized.indexOf(guessNormalized[index])]["backgroundColor"] = miss
            }          
            hits.push({ backgroundColor: jackpot })
            checkRiddle.splice(checkRiddle.indexOf(guessNormalized[index]),1)
        } else if (checkRiddle.indexOf(guessNormalized[index]) !== -1) {
            checkRiddle.includes(guessNormalized[index])?
            hits.push({ backgroundColor: goodTry })
            : hits.push({backgroundColor: miss})
            checkRiddle.splice(checkRiddle.indexOf(guessNormalized[index]),1)
        } else {
            hits.push({backgroundColor: miss})
        }
    }
    const won = isWon(hits);
    return [hits, won, won? riddle: guess];
}

const isWon = (hits)=>{
    const checkHits = hits.map(e => e["backgroundColor"]==jackpot? true:false)
    .reduce((acc, next)=> acc && next);

    return checkHits;
}

export {
    checkRiddleGuess,
}