var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_constants');

var GameStore = new Store(AppDispatcher);

GameStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case GameConstants.GAME_RECEIVED:
      console.log(payload.game);
      GameStore.__emitChange();
      break;
  }
};
