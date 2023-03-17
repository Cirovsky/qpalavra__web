import database from "../../database";

const sortition = parseInt(Math.random() * (database.length))
const riddle = Array.from(database[sortition]);
const riddleNormalized = normalizeWord(riddle);
console.log(riddleNormalized);
const jackpot = '#228B22'
const goodTry = '#DAA520'
const miss = 'rgba(11, 12, 33, 0.6)'

function normalizeWord(word) {
    if(typeof word == 'string'){
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }else{
        word = word.join("");
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split("");
    }

}

const checkRiddleGuess = (guessLetter,index) => {
    const gLetter = normalizeWord(guessLetter);
    let hit = {backgroundColor: miss}
    if(riddleNormalized[index]== gLetter){
        hit.backgroundColor = jackpot;
    }else{
        if (riddleNormalized.includes(gLetter)){
            hit.backgroundColor = goodTry;
        }
    }
    return {letter: gLetter, style: hit};
}

export {
    checkRiddleGuess,
}