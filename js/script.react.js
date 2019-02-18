// JSX Document
const container = document.getElementById('react-container');

function Square(props) {
  
    
      return (
        <button 
         className="square"
         onClick={() => { props.onClick()} }>
         
        <p className={props.calass}>{props.value}</p>
        </button>
      );
   
  }


  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        player: 'X'
      };
    }


    renderSquare(i) {
      return <Square 
      value={this.state.squares[i]}
      calass={this.state.squares[i]+'player'}
      onClick={() => {this.handleClick(i)}}
      />;
    }

    handleClick(i){
      const squares = this.state.squares.slice();

      if (calculateWinner(squares) || squares[i]) {
        return;
      }
  

      const player = this.state.player;
      if(squares[i] === null && player === 'X'){
        squares[i] = 'X';
        this.setState({player:'O'});
      }
      
      else if(squares[i] === null && player === 'O'){
        squares[i] = 'O';
        this.setState({player:'X'});
      }

      this.setState({squares: squares});

    }

    resetGame(){
      this.setState({squares: Array(9).fill(null),
        player: 'X',
      });
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      const tie = calculateTie(this.state.squares);
      let status;
      if(winner){
        status = 'Winner: ' + winner
      } else if(!winner && tie){
        status = 'Tie'
      }
       else {
      status = 'Next player: ' + this.state.player;
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

          <button className='btn btn-primary mt-3' onClick={() => {this.resetGame()} }>reset game</button>
          <br></br>
          
        </div>
        

      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>

          

        </div>
        
      );
    }
  }

function renderApp(){
    ReactDOM.render(<Game/>,container)
}

renderApp()

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
  ];

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    } 
  }

  return null;
}

function calculateTie(squares){

  for(let j = 0; j < squares.length; j++){
    if(squares[j] === null){
      return false;
      console.log('tie');
    }
  }

  return true;
  console.log('no');

}










