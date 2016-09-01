var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_constants');

var GameStore = new Store(AppDispatcher),
    _index = 0,
    _currentGame,
    _gameStatuses = [ "Start Game", "Add Ships", "Enter Position", "Computer Move" ];

GameStore.currentGame = function () {
  return _currentGame;
};

GameStore.gameStatus = function () {
  return _gameStatuses[_index];
};

GameStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case GameConstants.GAME_RECEIVED:
      _currentGame = payload.game;
      _index = 1;
      GameStore.__emitChange();
      break;
  }
};

module.exports = GameStore;
