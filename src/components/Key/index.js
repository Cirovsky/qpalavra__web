import './Key.css';

const Key= (props) =>{
    if (props.value == 'Enter'){
        return <span className='key'>&#x21B3;</span>;
    }
    if (props.value == 'Backspace'){
       return <span className='key'> &#8592;</span>;
    }
        return <span className="key">{props.value}</span>;
}

export default Key;