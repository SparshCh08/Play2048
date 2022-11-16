import React, { useState, useEffect } from 'react';
import Tile from './tile';
import Cell from './cell';
import { Board } from '../helper';
import useEvent from '../helper/hooks/useEvent';
import GameOverlay from './gameOverlay';

const Boardview = () => {
    const [board, setBoard] = useState(new Board());


    const handleKeyDown = (event) => {
        if (board.hasWon())
            return;

        if (event.keyCode >= 37 && event.keyCode <= 40) {
            let direction = event.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBorad = boardClone.move(direction);
            setBoard(newBorad);
        }
    }
    useEvent('keydown', handleKeyDown);

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                {
                    row.map((col, colIndex) => {
                        return <Cell key={rowIndex * board.size + colIndex} />
                    })
                }
            </div>
        )
    })

    const tiles = board.tiles.filter((tile) => tile.value !== 0).map((tile, index) => {
        return <Tile tile={tile} key={index} />
    })

    const resetGame = () => {
        setBoard(new Board())
    }
    return (
        <div>
            <div className='details-box'>
                <div className='resetButton' onClick={resetGame}>New Game</div>
                <div className='score-box'>
                    <div className='score-header'>Score</div>
                    <div>{board.score}</div>
                </div>
            </div>
            <div className='board'>
                {cells}
                {tiles}
                <GameOverlay onRestart={resetGame} board={board} />
            </div>
        </div>
    )
}

export default Boardview