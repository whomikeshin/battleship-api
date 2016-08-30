var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    PlayerConstants = require('../constants/player_constants');

var PlayerStore = new Store(AppDispatcher),
    _currentPlayer,
    _currentPlayerHasBeenFetched = false;

var reset = function (players) {
  _players = players.slice();
};

PlayerStore.computerPlayer = function () {
  return _players[0];
};

PlayerStore.currentPlayer = function () {
  return _currentPlayer;
};

PlayerStore.currentPlayerHasBeenFetched = function () {
  return _currentPlayerHasBeenFetched;
};

PlayerStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PlayerConstants.CURRENT_PLAYER_RECEIVED:
      _currentPlayer = payload.currentPlayer;
      _currentPlayerHasBeenFetched = true;
      PlayerStore.__emitChange();
      break;
    case PlayerConstants.PLAYERS_RECEIVED:
      reset(payload.players);
      PlayerStore.__emitChange();
  }
};

module.exports = PlayerStore;
