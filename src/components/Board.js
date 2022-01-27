import React from 'react';
import { calculateWinner, getPlayerSymbol } from '../helper';
import { Square } from './Square';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.rowSize = 3;
        this.hasWon = null;
        this.state = {
            squares: Array(9).fill(null),
            turn: Boolean(true),
            hasWon: null
        };
    }
    renderSquare(i) {
        return (
            <Square value={this.state.squares[i]}
                onClick={() => this.handleClick(i)} />
        );
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (this.hasWon || squares[i]) {
            return null;
        }
        squares[i] = getPlayerSymbol(this.state.turn);
        this.setState({
            squares: squares,
            turn: !this.state.turn
        });
    }

    render() {
        this.hasWon = calculateWinner(this.state.squares);
        let status;
        if (this.hasWon) {
            status = 'Player ' + (getPlayerSymbol(!this.state.turn)) + ' has won !';
        }
        else {
            status = 'Next Player is ' + (this.state.turn ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
