import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
      nrows: 5,
      ncols: 5,
      stOfLight: 0.25
    }
  constructor(props) {
    super(props);

    this.state = {
       hasWon: false, 
       board: this.createBoard()
      };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for(let i = 0; i < this.props.nrows; i++){
      let row = [];
      for(let j = 0; j < this.props.ncols; j++){
        row.push(Math.random() < this.props.stOfLight);
      }
      board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1 , x)
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {
    if(this.state.hasWon){
      return (
        <div className='Board-title'>
          <div className='winner'>
            <span className='neon-orange'>You</span>
            <span className='neon-blue'>Win!</span>
          </div>
      </div>
      )
    }
     let tblBoard = [];
     for(let i = 0; i < this.props.nrows; i++){
       let row = [];
       for(let j = 0; j < this.props.ncols; j++){
         let cords = `${i}-${j}`;
         row.push(<Cell 
          key = {cords} 
          isLit= {this.state.board[i][j]}
          flipCellsAroundMe={() => this.flipCellsAround(cords)}
          />)
       }
       tblBoard.push(<tr key={i}>{row}</tr>)
     }
    return (
      <div>
        <div className='Board-title'>
          <div className='neon-orange'>Lights</div>
          <div className='neon-blue'>Out</div>
        </div>
       <table className="Board">
          <tbody>
            {tblBoard}
          </tbody>
        </table>
      </div>
    
    )
  }
}


export default Board;
