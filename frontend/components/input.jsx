var React = require('react'),
    BoardStore = require('../stores/board'),
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
          <label htmlFor="row">Row</label>
          <input onChange={this._updateRow} type="text" value={this.state.row}/>

          <label htmlFor="col">Col</label>
          <input onChange={this._updateCol} type="text" value={this.state.col}/>

          <button className="Enter">Enter</button>
        </form>
      </div>
    );
  },


  _handleSubmit: function (e) {
    var shipCount = _getShipCount();
    e.preventDefault();

    if (shipCount < 3) {
      _addShip(this.state);
      var targetCell = _getTargetCell();
      ApiUtil.updateCell(targetCell);
    } else {
      _checkCell(this.state);
      var targetCell = _getTargetCell();
      ApiUtil.checkCell(targetCell);
    }
  },

  _updateRow: function (e) {
    this.setState({ row: e.currentTarget.value });
  },

  _updateCol: function (e) {
    this.setState({ col: e.currentTarget.value });
  },
});
