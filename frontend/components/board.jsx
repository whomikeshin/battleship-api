var React = require('react'),
    BoardStore = require('../stores/board'),
    GameStore = require('../stores/game'),
    Cell = require('./cell'),
    ApiUtil = require('../util/api_util');

function _getAllCells () {
  return BoardStore.all();
}

function _createCells () {
  var board = _getCurrentBoard();

  for(var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      var cell = {
        board_id: board.id,
        row: i,
        col: j,
        status: "null"
      };
      ApiUtil.createCell(cell);
    }
  }
}

function _getCurrentGame () {
  return GameStore.currentGame();
}

function _getGameIndex () {
  return GameStore.currentIndex();
}

function _getCurrentBoard () {
  return BoardStore.currentBoard();
}

function _getGuesses () {
  return BoardStore.guesses();
}

function _getPlayerScore () {
  return BoardStore.playerScore();
}

module.exports = React.createClass({
  getInitialState: function () {
    var cells = _getAllCells();

    return {
      board_id: null,
      game_id: null,
      player_id: this.props.playerId,
      cells: cells
    };
  },

  _onBoardChange: function () {
    var board = _getCurrentBoard();

    var cells = this.state.cells

    if (cells.length === 0 ) {
      _createCells()
    } else {
      cells = _getAllCells();
    }

    this.setState({
      board_id: board.id,
      cells: cells
    });
  },

  _onGameChange: function () {
    var game = _getCurrentGame(),
        index = _getGameIndex();

    this.setState({ game_id: game.id })

    if (index === 1) {
      ApiUtil.createBoard(this.state)
      ApiUtil.fetchComputerBoard(1);
    }
  },

  componentDidMount: function () {
    this.onBoardChangeToken = BoardStore.addListener(this._onBoardChange);
    this.onGameChangeToken = GameStore.addListener(this._onGameChange);
  },

  componentWillUnmount: function () {
    this.onBoardChangeToken.remove();
    this.onGameChangeToken.remove();
  },

  render: function () {
    var cells = this.state.cells || [];
        guesses = _getGuesses(),
        score = _getPlayerScore();

    return (
      <div>
        <h3>Color Key</h3>
        <ul className="key">
          <li>Gray: Ship</li>
          <li>Red: Hit</li>
          <li>White: Miss</li>
        </ul>

        <div className="wrapper">
          <ul className="board">
            {cells.map(function (cell) {
              return <div
                id={"cell-" + parseInt((cell.id - 1) % 25)}
                key={cell.id}
                className={cell.status}>
                  <form onSubmit={console.log("clicked!")}></form>
                </div>;
            })}
          </ul>
          <ul className="guess">Player Guesses
            {guesses.map(function (guess) {
              return <li key={guess.id}>
                {guess.row + ", " + guess.col + ": " + guess.status}
              </li>
            })}
          </ul>
        </div>
      </div>

    );
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   var cells = document.querySelectorAll('div[id^="cell-"]')
//
//   console.log(cells);
//   if (cells.length > 0) {
//     cells.forEach(function (cell) {
//       cell.addEventListener("mouseover", function(e) {
//         console.log(e.target.id);
//       })
//     })
//   }
// });
