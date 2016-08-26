var AppDispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_constants'),
    PlayerConstants = require('../constants/player_constants');

module.exports = {
  receiveGame: function (game) {
    AppDispatcher.dispatch({
      actionType: GameConstants.GAME_RECEIVED,
      game: game
    });
  },

  receivePlayers: function (players) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYERS_RECEIVED,
      playesr: players
    });
  }
};
