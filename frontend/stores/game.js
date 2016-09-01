var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_constants');

var GameStore = new Store(AppDispatcher),
    _index = 0,
    _currentGame,
    _gameStatuses = [ "Click Start", "Add Ships", "Enter Position", "Computer Move" ];

var moves = function () {
  var gameEnd = _currentGame.game_end;

  console.log("gameEnd");
};

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
    case GameConstants.GAME_STARTED:
      _index = 2;
      moves();
      GameStore.__emitChange();
      break;
    case GameConstants.ADD_TO_INDEX:
      _index += 1;
      moves();
      GameStore.__emitChange();
      break;
  }
};

module.exports = GameStore;
