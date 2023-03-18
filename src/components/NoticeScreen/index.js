import './NoticeScreen.css';

const NoticeScreen = (props) =>{
    const displayble = props.display? "flex": "none";
    return(
        <div className="notice-screen" style={{display: `${displayble}`}
        }
            onClick={(e)=> e.target.style.display = 'none'}
        >
            <h2 className="notice">{props.notice}</h2>
        </div>
    )
}

export default NoticeScreen;