import React from 'react'; 
import './Card.css'; 

const Card = props => {

    let classess = 'Card';
    if (!props.flipped) classess = 'Card cover'; 

    let styles = {
        backgroundColor: props.color, 
        borderColor: props.flipped ? props.color : null, 
    }

    return (
        <div 
            className={classess} 
            style={styles} 
            onClick={props.showCard}             
        >
           <span className='question-mark'> { props.flipped ? null : '?' } </span>
        </div>
    )
}

export default Card; 