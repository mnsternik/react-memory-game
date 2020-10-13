import React, {Component} from 'react'; 
import "./Board.css"; 
import Card from '../Card/Card';
import Start from '../Start/Start';
import GameOver from '../GameOver/GameOver'; 

class Board extends Component {

    // 'clicked' is array of indexes of 'cards' and can have max 2 elements
    // if 2 diffrent indexes in 'clicked' has the same color they go to 'guessed'
    state = {
        isGameStarted: false,
        isGameOver: false, 
        clicked: [], 
        guessed: [], 
        startTime: null,
        endTime: null, 
        cards: [
            { color: 'rgb(15, 158, 15)', flipped: true }, 
            { color: 'rgb(15, 158, 15)', flipped: true }, 
            { color: 'rgb(236, 41, 41)', flipped: true }, 
            { color: 'rgb(236, 41, 41)',  flipped: true }, 
            { color: 'rgb(59, 59, 206)', flipped: true }, 
            { color: 'rgb(59, 59, 206)', flipped: true }, 
            { color: 'rgb(224, 224, 59)', flipped: true }, 
            { color: 'rgb(224, 224, 59)', flipped: true }, 
            { color: 'rgb(129, 46, 129)', flipped: true }, 
            { color: 'rgb(129, 46, 129)', flipped: true }, 
            { color: 'rgb(236, 240, 241)', flipped: true }, 
            { color: 'rgb(236, 240, 241)', flipped: true }, 
        ] 
    }

    startGame = () => {
        this.setState({ isGameStarted: !this.isGameStarted, startTime: new Date() })
        this.createPairs(); 
        this.hideCards(); 
    }

    shuffle = arr => {
        for (let i = arr.length - 1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        } return arr;
    }

    createPairs = () => {
        const cards = this.shuffle(this.state.cards.slice()); 
        this.setState({ cards: cards })
    }
         
    hideCards = () => {
        setTimeout(() => {
            const cards = this.state.cards.map((card, index) => {
                if (this.state.guessed.indexOf(index) === -1) return card = { ...card, flipped: false } 
                else return card = { ...card, flipped: true } 
            });

            this.setState({ cards: cards, clicked: [] })
        }, 500);
    }

    showCard = index => {
        const cards = this.state.cards.slice(); 
        const clicked = this.state.clicked.slice(); 

        // check if there are not 2 cards clicked already and if the second card isn't first one clicked twice
        if (clicked.length < 2 && clicked[0] !== index) {
            clicked.push(index); 
            cards[index].flipped = true;
            this.setState({ cards: cards, clicked: clicked })

            if (clicked.length === 2) this.compareCards(clicked);  
        }
    }

    compareCards = clicked => {
        let guessed = this.state.guessed.slice(); 
        const cards = this.state.cards.slice(); 

        // check if cards in 'clicked' array have the same color and are not the same card
        if (cards[clicked[0]].color === cards[clicked[1]].color && clicked[0] !== clicked[1]) {
            guessed = guessed.concat(clicked); 
            this.setState({guessed: guessed, clicked: [] })
            this.isGameOver(guessed); 
        } else  {
            this.hideCards(); 
        }
    }

    isGameOver = guessed => {
        const startTime = this.state.startTime;
        if (this.state.cards.length === guessed.length) {
            this.setState({ 
                endTime: Math.floor(( new Date() - startTime ) / 1000), 
                isGameOver: !this.state.isGameOver, 
                guessed: [], 
            })
        }
    }

    replay = () => {
        this.setState({ isGameOver: !this.state.isGameOver })
        this.startGame(); 
    }

    render() {

        let cards = null; 
        let endScreen = null; 
        let startScreen = <Start startGame={this.startGame}/>; 

        if (this.state.isGameStarted) {
            cards = this.state.cards.map((card, index) => {
                return (
                    <Card
                        key={index} 
                        flipped={this.state.cards[index].flipped}
                        color={this.state.cards[index].flipped ? this.state.cards[index].color : 'rgb(17, 17, 17)'} 
                        showCard={this.state.clicked.length <= 2 ? () => this.showCard(index) : undefined}
                    />
                ) 
            })
        startScreen = null; 
        }

        if (this.state.isGameOver) {
            cards = null
            endScreen = <GameOver replay={this.replay} time={this.state.endTime}/>
        }

        return (
            <div className='Board'>
                {startScreen}
                {cards} 
                {endScreen}
            </div>
        )
    }
}

export default Board; 