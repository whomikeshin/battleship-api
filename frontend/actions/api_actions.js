var AppDispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_constants'),
    PlayerConstants = require('../constants/player_constants');
    BoardConstants = require('../constants/board_constants');

module.exports = {
  receiveBoard: function (board) {
    AppDispatcher.dispatch({
      actionType: BoardConstants.BOARD_RECEIVED,
      board: board
    });
  },

  receiveGame: function (game) {
    AppDispatcher.dispatch({
      actionType: GameConstants.GAME_RECEIVED,
      game: game
    });
  },

  receivePlayers: function (players) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYERS_RECEIVED,
      players: players
    });
  },

  currentPlayerReceived: function(currentPlayer) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.CURRENT_PLAYER_RECEIVED,
      currentPlayer: currentPlayer
    });
  }
};
