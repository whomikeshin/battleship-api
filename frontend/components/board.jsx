var React = require('react'),
    BoardStore = require('../stores/board'),
    GameStore = require('../stores/game'),
    ApiUtil = require('../util/api_util');


function _getAllCells () {
  return BoardStore.all();
}

function _fillCells () {
  return BoardStore.fillCells();
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
    var board = _getCurrentBoard() || null;

    var cells = this.state.cells;
    console.log(cells)
    cells = cells.length > 0 ? _getAllCells() : _fillCells()

    console.log(cells)
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
    var cells = this.state.cells;

    return (
      <div className="wrapper">

        <button
          className="update"
          onClick={this._onClick.bind(this, this.state)}>Update
        </button>

        <ul className="board">
          {cells.map(function (cell) {
            return <div key={cell.id} className={cell.status}/>;
          })}
        </ul>
      </div>
    );
  },

  _onClick: function (boardInfo) {
    ApiUtil.updateBoard(boardInfo)
  }
});
