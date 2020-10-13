import React from 'react'; 
import './Start.css'; 

const Start = props => {
    return (
        <div className='Start'>
            <button 
                className='Start-btn' 
                onClick={props.startGame}   
            > 
                Start game!
            </button>
        </div>
    )
}

export default Start; 