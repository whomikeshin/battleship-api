var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_constants');

var GameStore = new Store(AppDispatcher),
    _currentGame;

GameStore.currentGame = function () {
  return _currentGame;
};

GameStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case GameConstants.GAME_RECEIVED:
      _currentGame = payload.game;
      GameStore.__emitChange();
      break;
  }
};

module.exports = GameStore;
