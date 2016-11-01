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
    _computerScore = 0,
    _playerScore = 0,
    _guesses = [],
    _computerGuesses = [];

var convert = function (pos) {
  var index = (parseInt(pos.row) * 5 + parseInt(pos.col));
  return index;
};

var indexToPos = function (index) {
  var pos = {row: "", col: ""},
      row = Math.floor(index / 5);
      col = Math.floor(index % 5);

  pos.row = row.toString();
  pos.col = col.toString();
  return pos;
};

var addIndex = function () {
  var nums = [],
      randNums = [];
  for (var i = 0; i < 25; i++) { nums.push(i);}

  while (randNums.length < 10) {
     var j = Math.floor(Math.random() * nums.length);
     randNums.push(nums[j]);
     nums.splice(j, 1);
  }
  return randNums;
};

var addGuesses = function () {
  for (var i = 0; i < 25; i++) { _computerGuesses.push(i);}
};

var add = function (cell) {
  _cells.push(cell);
};

var clearCells = function () {
  _computerCells.forEach(function (cell) {
    cell.status = "null";
    ApiUtil.updateComputerCell(cell);
  });
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
  // var index = convert(pos),
      // cell = _cells[index];
  var cell = _cells[pos];
  cell.status = "ship";
  _targetCell = cell;
};

BoardStore.checkPlayerCell = function () {
  var i = Math.floor(Math.random() * _computerGuesses.length),
      index = _computerGuesses[i];
  _computerGuesses.splice(i, 1);

  var cell = _cells[index];
  if (cell.status === "ship") {
    cell.status = "hit";
    _computerScore += 1;
  } else {
    cell.status = "miss";
  }

  _targetCell = cell;
};

BoardStore.checkComputerCell = function (pos) {
  _computerCells.forEach(function(cell) {
    if (cell.row === parseInt(pos.row) &&
          cell.col === parseInt(pos.col)) {
      _targetCell = cell;
    }
  });

  if (_targetCell.status === "ship") {
    _targetCell.status = "hit";
    window.alert("You hit my battleship!");
    _playerScore += 1;
  } else {
    _targetCell.status = "miss";
    window.alert("You missed!");
  }
  _guesses.push(_targetCell);
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

BoardStore.playerScore = function () {
  return _playerScore;
};

BoardStore.computerScore = function () {
  return _computerScore;
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
      clearCells();
      randShip();
      addGuesses();
      break;
    case BoardConstants.COMPUTER_CELL_UPDATED:
      break;
    case BoardConstants.COMPUTER_CELL_CHECKED:
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
