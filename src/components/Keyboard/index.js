import Key from "../Key";
import './Keyboard.css';


const keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',],
    ['Backspace','z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter']
]
const Keyboard = () => {

    return (
        <section className="container__keyboard">
            <ul className='keyboard'>
                <li className='keyboard__line line-top'>{keyboard[0].map(k => <Key value={k} key={k} />)}</li>
                <li className='keyboard__line line-middle'>{keyboard[1].map(k => <Key value={k} key={k} />)}</li>
                <li className='keyboard__line line-bottom'>{keyboard[2].map(k => <Key value={k} key={k}/>)}</li>
            </ul>
            
        </section>
    );
}

export default Keyboard;