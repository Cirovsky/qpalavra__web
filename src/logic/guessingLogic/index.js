import database from "../../database";
import {miss,goodTry,jackpot} from "../colors";

const sortition = parseInt(Math.random() * (database.length))
const riddle = Array.from(database[sortition]);
const riddleNormalized = normalizeWord(riddle);
console.log(riddleNormalized);

function normalizeWord(word) {
    if(typeof word === 'string'){
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }else{
        word = word.join("");
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split("");
    }

}

const checkRiddleGuess = (guessLetter,index) => {
    const gLetter = normalizeWord(guessLetter);
    let hit = {backgroundColor: miss}
    if(riddleNormalized[index] === gLetter){
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