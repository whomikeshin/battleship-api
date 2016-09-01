var AppDispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_constants');

module.exports = {
  gameStart: function () {
    AppDispatcher.dispatch({
      actionType: GameConstants.GAME_STARTED,
      board: board
    });
  },
};
