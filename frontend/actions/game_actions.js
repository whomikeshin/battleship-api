var AppDispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_constants');

module.exports = {
  gameStart: function () {
    AppDispatcher.dispatch({
      actionType: GameConstants.GAME_STARTED,
    });
  },
  nextIndex: function () {
    AppDispatcher.dispatch({
      actionType: GameConstants.NEXT_INDEX,
    });
  },
  prevIndex: function () {
    AppDispatcher.dispatch({
      actionType: GameConstants.NEXT_INDEX,
    });
  },
};
