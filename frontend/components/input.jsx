var React = require('react'),
    BoardStore = require('../stores/board'),
    GameActions = require('../actions/game_actions'),
    ApiUtil = require('../util/api_util');

function _getCurrentBoard () {
  return BoardStore.currentBoard();
}

function _getTargetCell () {
  return BoardStore.targetCell();
}

function _getShipCount () {
  return BoardStore.shipCount();
}

function _addShip (pos) {
  BoardStore.addShip(pos);
}

function _checkCell (pos) {
  BoardStore.checkCell(pos);
}


module.exports = React.createClass({
  getInitialState: function () {
    return {
      row: "",
      col: "",
    }
  },

  render: function () {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <br></br>
          <label htmlFor="row">Row</label>
          <input onChange={this._updateRow} type="text" value={this.state.row}/>
          <br></br>
          <label htmlFor="col">Col</label>
          <input onChange={this._updateCol} type="text" value={this.state.col}/>
          <br></br>
          <br></br>
          <button className="Enter">Enter</button>
        </form>
      </div>
    );
  },


  _handleSubmit: function (e) {
    var shipCount = _getShipCount();
    e.preventDefault();

    if (shipCount < 2) {
      _addShip(this.state);
      var targetCell = _getTargetCell();
      ApiUtil.updateCell(targetCell);
    } else if (shipCount === 2) {
      _addShip(this.state)
      var targetCell = _getTargetCell();
      ApiUtil.updateCell(targetCell);
      GameActions.gameStart();
    } else {
      _checkCell(this.state);
      var targetCell = _getTargetCell();
      ApiUtil.checkCell(targetCell);
      GameActions.addToIndex();
    }
  },

  _updateRow: function (e) {
    this.setState({ row: e.currentTarget.value });
  },

  _updateCol: function (e) {
    this.setState({ col: e.currentTarget.value });
  },
});
