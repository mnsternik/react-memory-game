import React from 'react'; 
import './GameOver.css'; 

const GameOver = props => {
    return (
        <div className='Game-over'>
            <h1> You completed game in {props.time}s. </h1>
            <button 
                className='Replay-btn' 
                onClick={props.replay}   
            > 
                Replay
            </button>
        </div>
    )
}

export default GameOver; 