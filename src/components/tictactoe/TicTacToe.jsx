import React, { useRef, useState } from 'react'
import './tic-tac-toe.css'
import circle_icon from '../assets/circle.png'
import cross_icon from '../assets/cross.png'

const TicTacToe = () => {

  let [count, setCount] = useState(0)
  let [lock, setLock] = useState(false)
  let titleRef = useRef(null)

  const [board, setBoard] = useState(Array(9).fill(""));
  
  const toggle = (num) => {
    if (lock || board[num] !== "") return;
    const newBoard = [...board];
    newBoard[num] = count % 2 === 0 ? "x" : "o";
    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);
  };

  const checkWin = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        won(newBoard[a]);
        break;
      }
    }
  };

  const won = (winner) => {
    setLock(true)
    if(winner === "x"){
      titleRef.current.innerHTML = `Winner:  <img src=${cross_icon}>`
    }else{
      titleRef.current.innerHTML = `Winner:  <img src=${circle_icon}>`
    }
  }

  const reset = () => {
    setBoard(Array(9).fill(""));
    setLock(false);
    setCount(0);
    titleRef.current.innerHTML = 'Tic Tac Toe';
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe</h1>
      <div className="board">
        {board.map((value, index) => (
          <div key={index} className="boxes" onClick={() => toggle(index)}>
            {value && <img src={value === "x" ? cross_icon : circle_icon} alt={value} />}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  )
}

export default TicTacToe