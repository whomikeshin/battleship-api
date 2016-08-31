var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    BoardConstants = require('../constants/board_constants');

var BoardStore = new Store(AppDispatcher);

var _cells = [];

var reset = function (cells) {
  _cells = cells.slice();
};

BoardStore.all = function () {
  return _cells;
};

BoardStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case BoardConstants.CELLS_RECEIVED:
      reset(payload.cells);
      BoardStore.__emitChange();
      break;
  }
};


module.exports = BoardStore;
