import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './components/Board';
import { calculateWinner, getPlayerSymbol } from './helper';

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            turn: Boolean(true),
            stepNumber: 0,
        };

    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            turn: (step % 2) === 0,
        })

    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = getPlayerSymbol(this.state.turn);
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            turn: !this.state.turn,
            stepNumber: history.length
        });


    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const hasWon = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to  move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li >
            );
        });

        let status;
        if (hasWon) {
            status = 'Player ' + (getPlayerSymbol(!this.state.turn)) + ' has won !';
        }
        else {
            status = 'Next Player is ' + (this.state.turn ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div className="history-buttons">

                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
