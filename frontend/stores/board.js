var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    BoardConstants = require('../constants/board_constants'),
    ApiUtil = require('../util/api_util');

var BoardStore = new Store(AppDispatcher);

var _cells = [],
    _currentBoard,
    _targetCell,
    _shipCount = 0,
    _hitCount = 10;

var reset = function (cells) {
  _cells = cells.slice();
};

var convert = function (pos) {
  var index = 0;
  index = (parseInt(pos.row) * 5) + parseInt(pos.col);
  return index;
};

var add = function (cell) {
  _cells.push(cell);
};


BoardStore.addShip = function (pos) {
  var index = convert(pos),
      cell = _cells[index];

  cell.status = "ship";
  _targetCell = cell;
};


BoardStore.checkCell = function (pos) {
  var index = convert(pos),
      cell = _cells[index];

  if (cell.status === "ship") {
    cell.status = "hit";
    _hitCount -= 1;
  } else {
    cell.status = "miss";
  }

  _targetCell = cell;
};

BoardStore.targetCell = function () {
  return _targetCell;
};

BoardStore.shipCount = function () {
  return _shipCount;
};

BoardStore.all = function () {
  return _cells;
};

BoardStore.currentBoard = function () {
  return _currentBoard;
};

BoardStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case BoardConstants.BOARD_RECEIVED:
      _currentBoard = payload.board;
      BoardStore.__emitChange();
      break;
    case BoardConstants.CELL_RECEIVED:
      add(payload.cell);
      BoardStore.__emitChange();
      break;
    case BoardConstants.CELL_UPDATED:
      _shipCount += 1;
      BoardStore.__emitChange();
      break;
    case BoardConstants.CELL_CHECKED:
      BoardStore.__emitChange();
      break;
  }
};

module.exports = BoardStore;
