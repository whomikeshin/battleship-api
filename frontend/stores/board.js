var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    BoardConstants = require('../constants/board_constants'),
    ApiUtil = require('../util/api_util');

var BoardStore = new Store(AppDispatcher);

var _cells = [],
    _computerCells = [],
    _currentBoard,
    _computerBoard,
    _targetCell,
    _shipCount = 0,
    _hitCount = 10,
    _compShipCount = 10,
    _guesses = [],
    _turn = true;


var reset = function (cells) {
  _cells = cells.slice();
};

var convert = function (pos) {
  var index = 0;
  index = (parseInt(pos.row) * 5) + parseInt(pos.col);
  return index;
};

var addIndex = function () {
  var nums = [],
      randNums = [];
  for (var i = 0; i < 25; i++) { nums.push(i);}

  while (randNums.length < 10) {
     j = Math.floor(Math.random() * nums.length);
     randNums.push(nums[j]);
     nums.splice(j, 1);
  }
  return randNums;
};

var add = function (cell) {
  _cells.push(cell);
};

var randShip = function (pos) {
  var randIndex = addIndex();
  randIndex.forEach(function (index) {
    var cell = _computerCells[index];
    cell.status = "ship";
    ApiUtil.updateComputerCell(cell);
  });

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

  // _guesses.push(cell);
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

BoardStore.guesses = function () {
  return _guesses;
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
    case BoardConstants.COMPUTER_BOARD_RECEIVED:
      _computerBoard = payload.board;
      _computerCells = payload.board.cells;
      randShip();
      // BoardStore.__emitChange();
      break;
    case BoardConstants.COMPUTER_CELL_UPDATED:
      // BoardStore.__emitChange();
      break;
    case BoardConstants.COMPUTER_CELL_CHECKED:
      // BoardStore.__emitChange();
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
