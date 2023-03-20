import './NoticeScreen.css';
import { riddle } from '../../logic';

const NoticeScreen = (props) =>{
    const displayble = props.display? "flex": "none";
    return(
        <div className="notice-screen" style={{display: `${displayble}`}
        }
            onClick={()=> document.querySelector(".notice-screen").style.display = 'none'}
        >
            <div className="notice">
                <h2>{props.notice}</h2>
                <p>a palavra de hoje é <span className='riddle'>{riddle.join("").toLowerCase()}</span></p>
            </div>
        </div>
    )
}

export default NoticeScreen;