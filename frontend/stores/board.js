var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    BoardConstants = require('../constants/board_constants');

var BoardStore = new Store(AppDispatcher);

var _cells = [],
    _currentBoard;

var reset = function (cells) {
  _cells = cells.slice();
};

BoardStore.all = function () {
  return _cells;
};

BoardStore.currentBoard = function () {
  return _currentBoard;
};

BoardStore.fillCells = function () {
  var cell = {
    board_id: _currentBoard || null,
    row: null,
    col: null,
    status: "null"
  };

  for(var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      cell.row = i;
      cell.col = j;
      _cells.push(cell);
    }
  }
  return _cells;
};

BoardStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case BoardConstants.BOARD_RECEIVED:
      _currentBoard = payload.board;
      BoardStore.__emitChange();
      break;
  }
};


module.exports = BoardStore;
