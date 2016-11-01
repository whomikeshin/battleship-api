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

function _checkComputerCell (pos) {
  BoardStore.checkComputerCell(pos);
}

module.exports = React.createClass({
  render: function () {
    return (
      <div
        className={this.props.cell.status}
        onClick={console.log(this.props.cell.id)}>

      </div>
    );
  },


  _handleSubmit: function (e) {
    var shipCount = _getShipCount();
    e.preventDefault();

    if (shipCount < 9) {
      _addShip(this.state);
      var targetCell = _getTargetCell();
      ApiUtil.updateCell(targetCell);
    } else if (shipCount === 9) {
      _addShip(this.state)
      var targetCell = _getTargetCell();
      ApiUtil.updateCell(targetCell);
      GameActions.gameStart();
    } else {
      _checkComputerCell(this.state);
      var targetCell = _getTargetCell();
      ApiUtil.updateComputerCell(targetCell);
      GameActions.nextIndex();
    }
  },

  // _updateRow: function (e) {
  //   this.setState({ row: e.currentTarget.value });
  // },
  //
  // _updateCol: function (e) {
  //   this.setState({ col: e.currentTarget.value });
  // },
});


//
// document.addEventListener("mouseover", function (e) {
//   console.log(e.target.id);
// })


// <form id="form-id" onSubmit={this._handleSubmit}>
//   <br></br>
//   <label htmlFor="row">Row</label>
//   <br></br>
//   <input onChange={this._updateRow} type="text" value={this.state.row}/>
//   <br></br>
//   <label htmlFor="col">Col</label>
//   <br></br>
//   <input onChange={this._updateCol} type="text" value={this.state.col}/>
//   <br></br>
//   <button id="button-id"></button>
// </form>
