import React from 'react';
import Board from "./Board";
export default class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      history:[
        {squares:Array(9).fill(null)}
      ],
      step:0,
      xIsNext:true
    }
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0,this.state.step+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();

    if(calculateWinner(squares))
      return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    console.log(squares);
    this.setState({
      history:history.concat([{squares}])
      , xIsNext: !this.state.xIsNext,step:this.state.step+1},()=>{
      console.log(this.state.history);
    });

  }
  jumpTo = (step)=>{
    this.setState({
      step,
      xIsNext:(step%2)===0
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.step];
    console.log(current);
    const winner = calculateWinner(current.squares);
    let status;
    if(winner){
      status = `Winner: ${winner}`;
    }else{
      status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    let moves = history.map((step,index)=>{
      const desc = index?`Go to #${index}`:'game start';
      return (
        <li><button onClick={()=>this.jumpTo(index)}>{desc}</button></li>
      )
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} handleClick={i=>this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{moves}</div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}