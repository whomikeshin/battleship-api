var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    PlayerConstants = require('../constants/player_constants');

var PlayerStore = new Store(AppDispatcher),
    _players = [];

var resetPlayers = function(players) {
  _players = players.slice();
};

PlayerStore.all = function () {
  return _players.slice();
};

PlayerStore.find = function (player_id) {
  return _players.find(function (player) {
    return player.id === parseInt(player_id);
  });
};

PlayerStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PlayerConstants.PLAYERS_RECEIVED:
      resetPlayers(payload.players);
      PlayerStore.__emitChange();
      break;
  }
};

module.exports = PlayerStore;
