var React = require('react'),
    BoardStore = require('../stores/board'),
    GameStore = require('../stores/game'),
    Input = require('./input'),
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

function _getCurrentBoard () {
  return BoardStore.currentBoard();
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
    var game = _getCurrentGame();

    this.setState({ game_id: game.id })
    ApiUtil.createBoard(this.state)
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

    return (
      <div className="wrapper">
        <ul className="board">
          {cells.map(function (cell) {
            return <div
              key={cell.id}
              className={cell.status}
            />;
          })}
        </ul>

        <Input/>
      </div>
    );
  }
});
